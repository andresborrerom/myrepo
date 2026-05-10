/**
 * Cálculo de intereses moratorios para PH (Ley 675 art. 30 par.).
 *
 * Convención adoptada (ajustable por reglamento de cada copropiedad):
 *
 *   - Liquidación **diaria** sobre saldo vencido.
 *   - Tasa diaria efectiva derivada de la tasa pactada anual (E.A.),
 *     que a su vez no excede 1,5×IBC (validado en `rates.ts`).
 *   - Si la tasa cambia (la Superfinanciera certifica nuevos IBC),
 *     se segmenta el periodo y se aplica la tasa vigente en cada segmento.
 *   - Sin capitalización (anatocismo): la mora se acumula sobre el capital
 *     vencido, no sobre intereses ya causados — más conservador y alineado
 *     con la práctica del sector.
 */

import { Money, mulRate, ZERO, add } from "./money.js";
import { EAnual, eaADiariaEfectiva } from "./rates.js";

export interface SegmentoTasa {
  /** Inicio del segmento, inclusive (00:00 hora Bogotá). */
  readonly desde: Date;
  /** Fin del segmento, exclusive (00:00 del día siguiente). */
  readonly hasta: Date;
  /** Tasa anual efectiva aplicable (ya validada contra tope). */
  readonly tasaEA: EAnual;
}

export interface CalculoMoraInput {
  readonly saldoVencido: Money;
  /** Día en que la cuota venció. La mora arranca el día siguiente. */
  readonly fechaVencimiento: Date;
  /** Día de corte / cálculo / pago. Inclusive. */
  readonly fechaCorte: Date;
  /** Segmentos cubriendo todo el rango (vencimiento, corte]. */
  readonly segmentos: readonly SegmentoTasa[];
}

export interface CalculoMoraResultado {
  readonly intereses: Money;
  readonly diasEnMora: number;
  readonly desglose: readonly {
    readonly desde: Date;
    readonly hasta: Date;
    readonly dias: number;
    readonly tasaEA: EAnual;
    readonly intereses: Money;
  }[];
}

const MS_DIA = 24 * 60 * 60 * 1000;

function diasEntre(a: Date, b: Date): number {
  return Math.floor((b.getTime() - a.getTime()) / MS_DIA);
}

function startOfDayUTC(d: Date): Date {
  return new Date(Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()));
}

/**
 * Calcula los intereses moratorios para un saldo entre fechaVencimiento (excl.)
 * y fechaCorte (incl.), aplicando la tasa de cada segmento.
 *
 * Errores:
 *   - Si los segmentos no cubren todo el rango.
 *   - Si fechaCorte <= fechaVencimiento (no hay mora).
 *   - Si saldoVencido es negativo.
 */
export function calcularMora(input: CalculoMoraInput): CalculoMoraResultado {
  const { saldoVencido, fechaVencimiento, fechaCorte, segmentos } = input;

  if (saldoVencido < 0n) {
    throw new RangeError("saldoVencido no puede ser negativo");
  }

  const venc = startOfDayUTC(fechaVencimiento);
  const corte = startOfDayUTC(fechaCorte);

  if (corte <= venc) {
    return { intereses: ZERO, diasEnMora: 0, desglose: [] };
  }

  // Mora arranca el día siguiente al vencimiento.
  const inicioMora = new Date(venc.getTime() + MS_DIA);
  const finMora = corte; // inclusive

  // Validar cobertura
  const ordenados = [...segmentos].sort((a, b) => a.desde.getTime() - b.desde.getTime());
  if (ordenados.length === 0) {
    throw new Error("Se requiere al menos un segmento de tasa");
  }
  if (startOfDayUTC(ordenados[0]!.desde) > inicioMora) {
    throw new Error(
      `Segmentos de tasa no cubren el inicio de la mora (${inicioMora.toISOString()})`,
    );
  }
  if (startOfDayUTC(ordenados[ordenados.length - 1]!.hasta) <= finMora) {
    throw new Error(
      `Segmentos de tasa no cubren la fecha de corte (${finMora.toISOString()})`,
    );
  }

  const desglose: Array<{
    desde: Date;
    hasta: Date;
    dias: number;
    tasaEA: EAnual;
    intereses: Money;
  }> = [];
  let interesesTotales: Money = ZERO;
  let diasTotales = 0;

  for (const seg of ordenados) {
    const segDesde = startOfDayUTC(seg.desde);
    const segHasta = startOfDayUTC(seg.hasta); // exclusive
    const tramoDesde = segDesde > inicioMora ? segDesde : inicioMora;
    const tramoHastaExcl = segHasta < new Date(finMora.getTime() + MS_DIA)
      ? segHasta
      : new Date(finMora.getTime() + MS_DIA);
    const dias = Math.max(0, diasEntre(tramoDesde, tramoHastaExcl));
    if (dias === 0) continue;

    const tasaDiaria = eaADiariaEfectiva(seg.tasaEA);
    // Interés simple diario sobre saldo vencido (no se capitaliza dentro del periodo).
    const interesesTramo = mulRate(saldoVencido, tasaDiaria * dias);

    desglose.push({
      desde: tramoDesde,
      hasta: new Date(tramoHastaExcl.getTime() - MS_DIA),
      dias,
      tasaEA: seg.tasaEA,
      intereses: interesesTramo,
    });
    interesesTotales = add(interesesTotales, interesesTramo);
    diasTotales += dias;
  }

  return { intereses: interesesTotales, diasEnMora: diasTotales, desglose };
}
