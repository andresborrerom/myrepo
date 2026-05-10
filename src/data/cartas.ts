// Una carta por cada año de vida de Alejandro: 1951 → 2026 (75 cartas).
// La idea: el día del cumpleaños se revelan las primeras y luego una al día
// durante 75 días. La familia las llena en este archivo.
//
// Para sembrar nuevas cartas, agrega una entrada con `year` único.
// El campo `fromId` debe coincidir con un id en src/data/family.ts.

import { FAMILY } from './family';

export type Carta = {
  year: number;             // 1951..2026, único
  fromId: string;           // id en FAMILY
  title?: string;           // opcional, ej: "El año que naciste"
  body: string;             // texto en español. Saltos de línea = párrafos.
  audioUrl?: string;        // ruta a /public/cartas/xxxx.m4a si hay audio
  publishOn?: string;       // ISO; si está vacío, visible desde el cumpleaños
};

export const BIRTH_YEAR = 1951;
export const TURNS_75_YEAR = 2026;

// Cartas sembradas (placeholders editables — Andrés y la familia las van
// reemplazando). Mientras estén con `body` vacío se muestran como "por venir".
export const CARTAS: Carta[] = [
  {
    year: 1951,
    fromId: 'andres',
    title: 'El año que naciste',
    body:
      'En 1951 llegabas al mundo en Bogotá. Setenta y cinco años después seguimos ' +
      'celebrando que naciste. Esta casa digital es nuestro abrazo.\n\n' +
      'Con amor, todos.'
  },
  {
    year: 1974,
    fromId: 'luis-fernando',
    title: 'El año que me hiciste papá tuyo',
    body: '[Luis Fernando llenará esta carta]'
  },
  {
    year: 1976,
    fromId: 'alexandra',
    title: 'Cuando llegué yo',
    body: '[Alexandra llenará esta carta]'
  },
  {
    year: 1978,
    fromId: 'carolina',
    title: 'La hija del medio',
    body: '[Carolina llenará esta carta]'
  },
  {
    year: 1980,
    fromId: 'andres',
    title: 'Cuando me trajiste a casa',
    body: '[Andrés llenará esta carta]'
  },
  {
    year: 1992,
    fromId: 'camilo',
    title: 'El benjamín',
    body: '[Camilo llenará esta carta]'
  }
];

export function getCarta(year: number): Carta | undefined {
  return CARTAS.find((c) => c.year === year);
}

export function getCartasReveladas(now: Date = new Date()): Carta[] {
  return CARTAS.filter((c) => {
    if (c.publishOn) return new Date(c.publishOn) <= now;
    return true;
  }).sort((a, b) => a.year - b.year);
}

export function getAuthor(carta: Carta) {
  return FAMILY.find((p) => p.id === carta.fromId);
}

// Lista completa de los 75 años, marcando cuáles ya tienen carta sembrada.
// Útil para mostrar el "calendario" de progreso a la familia.
export function getYearsCoverage() {
  const years: { year: number; hasCarta: boolean }[] = [];
  for (let y = BIRTH_YEAR; y <= TURNS_75_YEAR; y++) {
    years.push({ year: y, hasCarta: CARTAS.some((c) => c.year === y) });
  }
  return years;
}
