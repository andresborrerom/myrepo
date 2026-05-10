/**
 * Tasas de interés y conversiones.
 *
 * En Colombia la Superintendencia Financiera certifica el Interés Bancario
 * Corriente (IBC) como **Tasa Efectiva Anual (E.A.)** por modalidad
 * (consumo y ordinario, microcrédito, etc.).
 *
 * Para PH (Ley 675 art. 30 par.) el interés moratorio máximo legal es
 * **1,5 veces el IBC** (tope C. Co. art. 884). Por encima se considera usura
 * y la pérdida de los intereses + sanciones.
 *
 * Las tasas se expresan como decimal fraccionario:
 *   18% E.A. → 0.18
 */

export type EAnual = number;

export interface TasaIBCVigencia {
  /** Inclusive */
  readonly desde: Date;
  /** Inclusive */
  readonly hasta: Date;
  /** Tasa Efectiva Anual del IBC certificada por SF, modalidad consumo/ordinario. */
  readonly ibcEA: EAnual;
}

export const FACTOR_TOPE_MORA = 1.5;

export function topeMoraEA(ibcEA: EAnual): EAnual {
  if (!Number.isFinite(ibcEA) || ibcEA < 0) {
    throw new RangeError(`ibcEA inválido: ${ibcEA}`);
  }
  return ibcEA * FACTOR_TOPE_MORA;
}

/**
 * Verifica que una tasa pactada en el reglamento no exceda el tope legal.
 * @returns la tasa misma si es válida; lanza si excede.
 */
export function validarTasaMora(tasaConfigurada: EAnual, ibcEA: EAnual): EAnual {
  if (!Number.isFinite(tasaConfigurada) || tasaConfigurada < 0) {
    throw new RangeError(`tasa inválida: ${tasaConfigurada}`);
  }
  const tope = topeMoraEA(ibcEA);
  if (tasaConfigurada > tope) {
    throw new RangeError(
      `Tasa de mora ${(tasaConfigurada * 100).toFixed(4)}% E.A. excede el tope legal ` +
        `${(tope * 100).toFixed(4)}% E.A. (1.5×IBC=${(ibcEA * 100).toFixed(4)}%). ` +
        `Ley 675 art. 30 par. + C. Co. art. 884.`,
    );
  }
  return tasaConfigurada;
}

/**
 * Convierte E.A. a tasa diaria efectiva: (1 + EA)^(1/365) - 1.
 * Usamos 365 días (no 360) — convención bancaria moderna en CO.
 */
export function eaADiariaEfectiva(ea: EAnual): number {
  if (!Number.isFinite(ea) || ea < 0) {
    throw new RangeError(`ea inválida: ${ea}`);
  }
  return Math.pow(1 + ea, 1 / 365) - 1;
}

/**
 * Convierte E.A. a tasa mensual efectiva: (1 + EA)^(1/12) - 1.
 */
export function eaAMensualEfectiva(ea: EAnual): number {
  if (!Number.isFinite(ea) || ea < 0) {
    throw new RangeError(`ea inválida: ${ea}`);
  }
  return Math.pow(1 + ea, 1 / 12) - 1;
}
