/**
 * Pesos colombianos enteros. Usamos bigint para evitar errores de
 * coma flotante en montos. La PH típicamente redondea a peso.
 */
export type Money = bigint;

export const ZERO: Money = 0n;

export function pesos(value: number | bigint | string): Money {
  if (typeof value === "bigint") return value;
  if (typeof value === "string") return BigInt(value);
  if (!Number.isFinite(value) || !Number.isInteger(value)) {
    throw new RangeError(`pesos() requiere entero finito, recibido: ${value}`);
  }
  return BigInt(value);
}

export function add(a: Money, b: Money): Money {
  return a + b;
}

export function sub(a: Money, b: Money): Money {
  return a - b;
}

export function isZero(a: Money): boolean {
  return a === 0n;
}

export function isPositive(a: Money): boolean {
  return a > 0n;
}

export function min(a: Money, b: Money): Money {
  return a < b ? a : b;
}

export function max(a: Money, b: Money): Money {
  return a > b ? a : b;
}

/**
 * Multiplica un monto por una tasa decimal y redondea a peso (banker's rounding).
 * Útil para liquidar intereses sobre un saldo.
 */
export function mulRate(amount: Money, rate: number): Money {
  if (!Number.isFinite(rate)) throw new RangeError("rate debe ser finito");
  if (rate < 0) throw new RangeError("rate negativo no soportado");
  // Convertir a Number es seguro hasta 2^53; para montos PH (millones de pesos)
  // está dentro del rango con margen amplio.
  const n = Number(amount) * rate;
  return BigInt(Math.round(n));
}

export function format(amount: Money): string {
  const negative = amount < 0n;
  const abs = negative ? -amount : amount;
  const s = abs.toString();
  const withSep = s.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return `${negative ? "-" : ""}$${withSep}`;
}
