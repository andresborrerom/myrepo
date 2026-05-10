import { describe, it, expect } from "vitest";
import {
  topeMoraEA,
  validarTasaMora,
  eaADiariaEfectiva,
  eaAMensualEfectiva,
  FACTOR_TOPE_MORA,
} from "../src/rates.js";

describe("rates", () => {
  it("topeMoraEA = 1.5 × IBC", () => {
    expect(topeMoraEA(0.18)).toBeCloseTo(0.27, 10);
    expect(FACTOR_TOPE_MORA).toBe(1.5);
  });

  it("validarTasaMora pasa si tasa <= tope", () => {
    expect(validarTasaMora(0.27, 0.18)).toBe(0.27);
    expect(validarTasaMora(0.2, 0.18)).toBe(0.2);
  });

  it("validarTasaMora lanza si excede el tope (anti-usura)", () => {
    expect(() => validarTasaMora(0.28, 0.18)).toThrow(/excede el tope legal/);
  });

  it("eaADiariaEfectiva: (1 + d)^365 ≈ 1 + EA", () => {
    const ea = 0.18;
    const d = eaADiariaEfectiva(ea);
    expect(Math.pow(1 + d, 365)).toBeCloseTo(1 + ea, 8);
  });

  it("eaAMensualEfectiva: (1 + m)^12 ≈ 1 + EA", () => {
    const ea = 0.18;
    const m = eaAMensualEfectiva(ea);
    expect(Math.pow(1 + m, 12)).toBeCloseTo(1 + ea, 8);
  });

  it("rechaza tasas inválidas", () => {
    expect(() => topeMoraEA(-0.1)).toThrow();
    expect(() => eaADiariaEfectiva(-0.1)).toThrow();
    expect(() => validarTasaMora(NaN, 0.1)).toThrow();
  });
});
