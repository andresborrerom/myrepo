/**
 * Coeficientes de copropiedad (Ley 675 arts. 25-31).
 *
 * Restricción fundamental: la suma de coeficientes activos de una copropiedad
 * debe ser exactamente 1.0 (con tolerancia numérica).
 *
 * Internamente representamos coeficientes como enteros en una escala fija
 * (10_000_000) para evitar errores de coma flotante. La suma exacta es
 * verificable comparando enteros.
 */

import { Money, mulRate } from "./money.js";

/** Escala: 7 decimales (1.0 = 10_000_000). */
export const COEFICIENTE_ESCALA = 10_000_000;

export type CoeficienteEntero = number;

export interface UnidadCoef {
  readonly id: string;
  readonly coeficiente: CoeficienteEntero;
}

export function coefDesdeFraccion(fraccion: number): CoeficienteEntero {
  if (!Number.isFinite(fraccion) || fraccion < 0 || fraccion > 1) {
    throw new RangeError(`coeficiente debe estar en [0,1]: ${fraccion}`);
  }
  return Math.round(fraccion * COEFICIENTE_ESCALA);
}

export function coefAFraccion(c: CoeficienteEntero): number {
  return c / COEFICIENTE_ESCALA;
}

/**
 * Suma exacta de coeficientes. Devuelve un entero en escala COEFICIENTE_ESCALA.
 * Para una copropiedad bien formada, debe ser igual a COEFICIENTE_ESCALA.
 */
export function sumaCoeficientes(unidades: readonly UnidadCoef[]): CoeficienteEntero {
  let s = 0;
  for (const u of unidades) {
    if (!Number.isInteger(u.coeficiente) || u.coeficiente < 0) {
      throw new RangeError(`coeficiente inválido en unidad ${u.id}: ${u.coeficiente}`);
    }
    s += u.coeficiente;
  }
  return s;
}

export interface ValidacionCoeficientes {
  readonly valido: boolean;
  readonly suma: CoeficienteEntero;
  readonly diferencia: CoeficienteEntero;
}

export function validarSumaCoeficientes(
  unidades: readonly UnidadCoef[],
): ValidacionCoeficientes {
  const suma = sumaCoeficientes(unidades);
  const diferencia = suma - COEFICIENTE_ESCALA;
  return { valido: diferencia === 0, suma, diferencia };
}

/**
 * Calcula la cuota ordinaria de una unidad dado el presupuesto mensual común.
 * cuota = presupuesto × coeficiente.
 */
export function cuotaPorCoeficiente(
  presupuestoMensual: Money,
  coeficiente: CoeficienteEntero,
): Money {
  return mulRate(presupuestoMensual, coefAFraccion(coeficiente));
}
