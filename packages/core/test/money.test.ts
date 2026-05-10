import { describe, it, expect } from "vitest";
import fc from "fast-check";
import { pesos, add, sub, mulRate, format, ZERO } from "../src/money.js";

describe("money", () => {
  it("pesos() acepta enteros, bigint y string numérico", () => {
    expect(pesos(100)).toBe(100n);
    expect(pesos(100n)).toBe(100n);
    expect(pesos("100")).toBe(100n);
  });

  it("pesos() rechaza no enteros", () => {
    expect(() => pesos(1.5)).toThrow();
    expect(() => pesos(NaN)).toThrow();
    expect(() => pesos(Infinity)).toThrow();
  });

  it("add y sub son consistentes (a + b - b == a)", () => {
    fc.assert(
      fc.property(fc.bigInt(), fc.bigInt(), (a, b) => {
        return sub(add(a, b), b) === a;
      }),
    );
  });

  it("mulRate redondea a peso", () => {
    expect(mulRate(pesos(1000), 0.1)).toBe(100n);
    expect(mulRate(pesos(1000), 0.005)).toBe(5n);
    expect(mulRate(pesos(999), 0.1)).toBe(100n); // 99.9 → 100
  });

  it("mulRate rechaza tasas inválidas", () => {
    expect(() => mulRate(pesos(100), -0.1)).toThrow();
    expect(() => mulRate(pesos(100), NaN)).toThrow();
  });

  it("mulRate por 0 da 0", () => {
    expect(mulRate(pesos(99999), 0)).toBe(ZERO);
  });

  it("format pone separadores de miles y signo $", () => {
    expect(format(pesos(0))).toBe("$0");
    expect(format(pesos(1000))).toBe("$1.000");
    expect(format(pesos(1234567))).toBe("$1.234.567");
    expect(format(pesos(-50000))).toBe("-$50.000");
  });
});
