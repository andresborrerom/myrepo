/**
 * Imputación de pagos.
 *
 * Regla legal por defecto (Código Civil + Ley 675):
 *   1. Primero a intereses moratorios (más antiguos primero).
 *   2. Luego a capital (más antiguo primero).
 *   3. Excedente → anticipo / saldo a favor.
 *
 * El reglamento de la copropiedad puede pactar otra regla; el motor recibe
 * la lista ordenada y la aplica en orden, sin asumir.
 */

import { Money, ZERO, isZero, min, sub, isPositive } from "./money.js";

export type DeudaTipo = "mora" | "capital" | "otro";

export interface DeudaItem {
  readonly id: string;
  readonly tipo: DeudaTipo;
  /** Para ordenamiento secundario (más antiguo paga primero). */
  readonly fechaOrigen: Date;
  /** Saldo pendiente al momento de imputar. */
  readonly saldoPendiente: Money;
}

export interface ImputacionInput {
  readonly montoPago: Money;
  /**
   * Lista de deudas. Se imputa en el orden dado.
   * Si quieres aplicar la regla legal por defecto, llama
   * `ordenarPorReglaLegal` primero.
   */
  readonly deudas: readonly DeudaItem[];
}

export interface AplicacionPago {
  readonly deudaId: string;
  readonly monto: Money;
}

export interface ImputacionResultado {
  readonly aplicaciones: readonly AplicacionPago[];
  /** Lo que sobró tras pagar todas las deudas, queda como anticipo. */
  readonly anticipo: Money;
}

/**
 * Ordena deudas según la regla legal por defecto:
 *   - mora antes que capital, capital antes que "otro";
 *   - dentro de cada grupo, más antigua primero.
 *
 * No muta la entrada.
 */
export function ordenarPorReglaLegal(deudas: readonly DeudaItem[]): DeudaItem[] {
  const peso: Record<DeudaTipo, number> = { mora: 0, capital: 1, otro: 2 };
  return [...deudas].sort((a, b) => {
    const dp = peso[a.tipo] - peso[b.tipo];
    if (dp !== 0) return dp;
    return a.fechaOrigen.getTime() - b.fechaOrigen.getTime();
  });
}

export function imputarPago(input: ImputacionInput): ImputacionResultado {
  if (input.montoPago < 0n) {
    throw new RangeError("montoPago no puede ser negativo");
  }
  let restante: Money = input.montoPago;
  const aplicaciones: AplicacionPago[] = [];

  for (const deuda of input.deudas) {
    if (isZero(restante)) break;
    if (deuda.saldoPendiente <= 0n) continue;
    const aplicado = min(deuda.saldoPendiente, restante);
    aplicaciones.push({ deudaId: deuda.id, monto: aplicado });
    restante = sub(restante, aplicado);
  }

  return { aplicaciones, anticipo: isPositive(restante) ? restante : ZERO };
}
