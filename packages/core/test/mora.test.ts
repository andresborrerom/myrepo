import { describe, it, expect } from "vitest";
import { calcularMora, SegmentoTasa } from "../src/mora.js";
import { pesos } from "../src/money.js";

const dia = (iso: string): Date => new Date(`${iso}T00:00:00Z`);

const segmentoUnico = (ea: number): SegmentoTasa => ({
  desde: dia("2020-01-01"),
  hasta: dia("2030-01-01"),
  tasaEA: ea,
});

describe("calcularMora", () => {
  it("sin días en mora cuando corte = vencimiento", () => {
    const r = calcularMora({
      saldoVencido: pesos(1_000_000),
      fechaVencimiento: dia("2026-05-10"),
      fechaCorte: dia("2026-05-10"),
      segmentos: [segmentoUnico(0.18)],
    });
    expect(r.intereses).toBe(0n);
    expect(r.diasEnMora).toBe(0);
  });

  it("sin días en mora cuando corte < vencimiento", () => {
    const r = calcularMora({
      saldoVencido: pesos(1_000_000),
      fechaVencimiento: dia("2026-05-10"),
      fechaCorte: dia("2026-05-01"),
      segmentos: [segmentoUnico(0.18)],
    });
    expect(r.intereses).toBe(0n);
  });

  it("calcula 30 días al 18% E.A. dentro del orden de magnitud esperado", () => {
    // 30 días aprox = 1 mes; mensual efectiva ≈ 1.388%
    // Esperamos ~$13.880 sobre $1.000.000
    const r = calcularMora({
      saldoVencido: pesos(1_000_000),
      fechaVencimiento: dia("2026-05-10"),
      fechaCorte: dia("2026-06-09"),
      segmentos: [segmentoUnico(0.18)],
    });
    expect(r.diasEnMora).toBe(30);
    expect(Number(r.intereses)).toBeGreaterThan(13_500);
    expect(Number(r.intereses)).toBeLessThan(14_500);
  });

  it("se segmenta al cambiar la tasa SF a mitad de periodo", () => {
    const segs: SegmentoTasa[] = [
      { desde: dia("2026-05-01"), hasta: dia("2026-05-25"), tasaEA: 0.18 },
      { desde: dia("2026-05-25"), hasta: dia("2026-07-01"), tasaEA: 0.20 },
    ];
    const r = calcularMora({
      saldoVencido: pesos(1_000_000),
      fechaVencimiento: dia("2026-05-10"),
      fechaCorte: dia("2026-06-09"),
      segmentos: segs,
    });
    expect(r.diasEnMora).toBe(30);
    expect(r.desglose.length).toBe(2);
    // Tramos: 11→24 (14 días @ 18%) + 25→9 (15 días @ 20%) = 29 días, no 30 — revisemos.
    // En realidad: mora arranca el día siguiente (11), corte = 9 jun (incl).
    // Tramo 1: 11..24 mayo = 14 días @ 18%
    // Tramo 2: 25..9 jun = 16 días @ 20%
    expect(r.desglose[0]!.dias).toBe(14);
    expect(r.desglose[1]!.dias).toBe(16);
  });

  it("rechaza saldo negativo", () => {
    expect(() =>
      calcularMora({
        saldoVencido: pesos(-100) as unknown as bigint,
        fechaVencimiento: dia("2026-05-10"),
        fechaCorte: dia("2026-06-10"),
        segmentos: [segmentoUnico(0.18)],
      }),
    ).toThrow();
  });

  it("falla si los segmentos no cubren el rango", () => {
    const segs: SegmentoTasa[] = [
      { desde: dia("2026-06-01"), hasta: dia("2027-01-01"), tasaEA: 0.18 },
    ];
    expect(() =>
      calcularMora({
        saldoVencido: pesos(1_000_000),
        fechaVencimiento: dia("2026-05-10"),
        fechaCorte: dia("2026-06-09"),
        segmentos: segs,
      }),
    ).toThrow(/no cubren/);
  });

  it("invariante: mora ≥ 0 siempre", () => {
    const r = calcularMora({
      saldoVencido: pesos(1),
      fechaVencimiento: dia("2026-01-01"),
      fechaCorte: dia("2026-12-31"),
      segmentos: [segmentoUnico(0.18)],
    });
    expect(r.intereses >= 0n).toBe(true);
  });

  it("invariante: la suma de intereses por tramo = total", () => {
    const r = calcularMora({
      saldoVencido: pesos(5_000_000),
      fechaVencimiento: dia("2026-01-15"),
      fechaCorte: dia("2026-08-15"),
      segmentos: [
        { desde: dia("2026-01-01"), hasta: dia("2026-04-01"), tasaEA: 0.18 },
        { desde: dia("2026-04-01"), hasta: dia("2026-07-01"), tasaEA: 0.20 },
        { desde: dia("2026-07-01"), hasta: dia("2026-10-01"), tasaEA: 0.22 },
      ],
    });
    const sumaTramos = r.desglose.reduce((acc, d) => acc + d.intereses, 0n);
    expect(sumaTramos).toBe(r.intereses);
  });
});
