import { describe, it, expect } from "vitest";
import fc from "fast-check";
import {
  COEFICIENTE_ESCALA,
  coefDesdeFraccion,
  coefAFraccion,
  validarSumaCoeficientes,
  cuotaPorCoeficiente,
  UnidadCoef,
} from "../src/coeficientes.js";
import { pesos } from "../src/money.js";

describe("coeficientes", () => {
  it("coefDesdeFraccion mapea a entero en escala", () => {
    expect(coefDesdeFraccion(0.5)).toBe(5_000_000);
    expect(coefDesdeFraccion(0)).toBe(0);
    expect(coefDesdeFraccion(1)).toBe(COEFICIENTE_ESCALA);
  });

  it("coefDesdeFraccion rechaza fuera de [0,1]", () => {
    expect(() => coefDesdeFraccion(-0.1)).toThrow();
    expect(() => coefDesdeFraccion(1.0001)).toThrow();
    expect(() => coefDesdeFraccion(NaN)).toThrow();
  });

  it("coefAFraccion es inverso aproximado", () => {
    expect(coefAFraccion(5_000_000)).toBeCloseTo(0.5, 7);
  });

  it("validarSumaCoeficientes detecta suma exacta", () => {
    const us: UnidadCoef[] = [
      { id: "a", coeficiente: 3_000_000 },
      { id: "b", coeficiente: 3_000_000 },
      { id: "c", coeficiente: 4_000_000 },
    ];
    const r = validarSumaCoeficientes(us);
    expect(r.valido).toBe(true);
    expect(r.suma).toBe(COEFICIENTE_ESCALA);
    expect(r.diferencia).toBe(0);
  });

  it("validarSumaCoeficientes detecta diferencia", () => {
    const us: UnidadCoef[] = [
      { id: "a", coeficiente: 5_000_000 },
      { id: "b", coeficiente: 4_999_999 },
    ];
    const r = validarSumaCoeficientes(us);
    expect(r.valido).toBe(false);
    expect(r.diferencia).toBe(-1);
  });

  it("rechaza coeficientes negativos", () => {
    const us: UnidadCoef[] = [{ id: "x", coeficiente: -1 }];
    expect(() => validarSumaCoeficientes(us)).toThrow();
  });

  it("cuotaPorCoeficiente: presupuesto × coef redondeado", () => {
    expect(cuotaPorCoeficiente(pesos(100_000_000), 100_000)).toBe(1_000_000n);
    expect(cuotaPorCoeficiente(pesos(0), 100_000)).toBe(0n);
  });

  it("invariante: Σ cuotas = presupuesto, salvo rounding ≤ N pesos", () => {
    fc.assert(
      fc.property(
        fc.bigInt({ min: 1_000_000n, max: 500_000_000n }),
        fc.array(fc.integer({ min: 1, max: 1_000_000 }), { minLength: 2, maxLength: 100 }),
        (presupuesto, raws) => {
          // normalizar para que sumen exactamente COEFICIENTE_ESCALA
          const sumaRaw = raws.reduce((s, x) => s + x, 0);
          const us: UnidadCoef[] = raws.map((r, i) => ({
            id: String(i),
            coeficiente: Math.round((r / sumaRaw) * COEFICIENTE_ESCALA),
          }));
          // ajustar la última para que cuadre
          const dif = COEFICIENTE_ESCALA - us.reduce((s, u) => s + u.coeficiente, 0);
          us[us.length - 1] = {
            id: us[us.length - 1]!.id,
            coeficiente: us[us.length - 1]!.coeficiente + dif,
          };
          const sumaCuotas = us.reduce((s, u) => s + cuotaPorCoeficiente(presupuesto, u.coeficiente), 0n);
          const dispar = (presupuesto - sumaCuotas) < 0n
            ? -(presupuesto - sumaCuotas)
            : (presupuesto - sumaCuotas);
          // Tolerancia: hasta 1 peso por unidad por rounding
          return dispar <= BigInt(us.length);
        },
      ),
      { numRuns: 50 },
    );
  });
});
