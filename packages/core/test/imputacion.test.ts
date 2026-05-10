import { describe, it, expect } from "vitest";
import fc from "fast-check";
import {
  imputarPago,
  ordenarPorReglaLegal,
  DeudaItem,
} from "../src/imputacion.js";
import { pesos } from "../src/money.js";

const d = (iso: string): Date => new Date(`${iso}T00:00:00Z`);

describe("ordenarPorReglaLegal", () => {
  it("mora antes que capital", () => {
    const items: DeudaItem[] = [
      { id: "cap", tipo: "capital", fechaOrigen: d("2025-01-01"), saldoPendiente: pesos(100) },
      { id: "mora", tipo: "mora", fechaOrigen: d("2026-01-01"), saldoPendiente: pesos(10) },
    ];
    expect(ordenarPorReglaLegal(items)[0]!.id).toBe("mora");
  });

  it("dentro del mismo tipo, más antiguo primero", () => {
    const items: DeudaItem[] = [
      { id: "b", tipo: "capital", fechaOrigen: d("2026-03-01"), saldoPendiente: pesos(100) },
      { id: "a", tipo: "capital", fechaOrigen: d("2026-01-01"), saldoPendiente: pesos(100) },
    ];
    const sorted = ordenarPorReglaLegal(items);
    expect(sorted[0]!.id).toBe("a");
    expect(sorted[1]!.id).toBe("b");
  });

  it("no muta la entrada", () => {
    const items: DeudaItem[] = [
      { id: "cap", tipo: "capital", fechaOrigen: d("2025-01-01"), saldoPendiente: pesos(100) },
    ];
    ordenarPorReglaLegal(items);
    expect(items[0]!.id).toBe("cap");
  });
});

describe("imputarPago", () => {
  it("paga primero la mora más antigua, luego capital antiguo", () => {
    const deudas: DeudaItem[] = ordenarPorReglaLegal([
      { id: "mora-mar", tipo: "mora", fechaOrigen: d("2026-03-01"), saldoPendiente: pesos(5_000) },
      { id: "mora-abr", tipo: "mora", fechaOrigen: d("2026-04-01"), saldoPendiente: pesos(8_000) },
      { id: "cap-mar", tipo: "capital", fechaOrigen: d("2026-03-01"), saldoPendiente: pesos(400_000) },
      { id: "cap-abr", tipo: "capital", fechaOrigen: d("2026-04-01"), saldoPendiente: pesos(400_000) },
    ]);
    const r = imputarPago({ montoPago: pesos(420_000), deudas });
    expect(r.aplicaciones).toEqual([
      { deudaId: "mora-mar", monto: 5_000n },
      { deudaId: "mora-abr", monto: 8_000n },
      { deudaId: "cap-mar", monto: 400_000n },
      { deudaId: "cap-abr", monto: 7_000n },
    ]);
    expect(r.anticipo).toBe(0n);
  });

  it("excedente queda como anticipo", () => {
    const deudas: DeudaItem[] = [
      { id: "x", tipo: "capital", fechaOrigen: d("2026-01-01"), saldoPendiente: pesos(100_000) },
    ];
    const r = imputarPago({ montoPago: pesos(150_000), deudas });
    expect(r.aplicaciones).toEqual([{ deudaId: "x", monto: 100_000n }]);
    expect(r.anticipo).toBe(50_000n);
  });

  it("pago de cero no aplica nada", () => {
    const deudas: DeudaItem[] = [
      { id: "x", tipo: "capital", fechaOrigen: d("2026-01-01"), saldoPendiente: pesos(100) },
    ];
    const r = imputarPago({ montoPago: 0n, deudas });
    expect(r.aplicaciones.length).toBe(0);
    expect(r.anticipo).toBe(0n);
  });

  it("ignora deudas con saldo cero o negativo", () => {
    const deudas: DeudaItem[] = [
      { id: "saldada", tipo: "capital", fechaOrigen: d("2026-01-01"), saldoPendiente: 0n },
      { id: "viva", tipo: "capital", fechaOrigen: d("2026-02-01"), saldoPendiente: pesos(50_000) },
    ];
    const r = imputarPago({ montoPago: pesos(30_000), deudas });
    expect(r.aplicaciones).toEqual([{ deudaId: "viva", monto: 30_000n }]);
  });

  it("rechaza monto negativo", () => {
    expect(() => imputarPago({ montoPago: -1n, deudas: [] })).toThrow();
  });

  it("invariante: Σ aplicaciones + anticipo == montoPago", () => {
    fc.assert(
      fc.property(
        fc.bigInt({ min: 0n, max: 10_000_000_000n }),
        fc.array(
          fc.record({
            id: fc.string({ minLength: 1 }),
            tipo: fc.constantFrom("mora", "capital", "otro"),
            fechaOrigen: fc.date({ min: new Date("2020-01-01"), max: new Date("2030-01-01") }),
            saldoPendiente: fc.bigInt({ min: 0n, max: 5_000_000n }),
          }),
          { maxLength: 20 },
        ),
        (montoPago, deudasRaw) => {
          const deudas = ordenarPorReglaLegal(deudasRaw as DeudaItem[]);
          const r = imputarPago({ montoPago, deudas });
          const sumaAplicado = r.aplicaciones.reduce((s, a) => s + a.monto, 0n);
          return sumaAplicado + r.anticipo === montoPago;
        },
      ),
      { numRuns: 200 },
    );
  });

  it("invariante: nunca aplica más de lo que se debe en cada deuda", () => {
    fc.assert(
      fc.property(
        fc.bigInt({ min: 0n, max: 100_000_000n }),
        fc.array(
          fc.record({
            id: fc.string({ minLength: 1 }),
            tipo: fc.constantFrom("mora", "capital", "otro"),
            fechaOrigen: fc.date({ min: new Date("2020-01-01"), max: new Date("2030-01-01") }),
            saldoPendiente: fc.bigInt({ min: 0n, max: 5_000_000n }),
          }),
          { maxLength: 10 },
        ),
        (montoPago, deudasRaw) => {
          const deudas = deudasRaw as DeudaItem[];
          const r = imputarPago({ montoPago, deudas });
          for (const a of r.aplicaciones) {
            const deuda = deudas.find((x) => x.id === a.deudaId);
            if (!deuda) return false;
            if (a.monto > deuda.saldoPendiente) return false;
          }
          return true;
        },
      ),
      { numRuns: 200 },
    );
  });
});
