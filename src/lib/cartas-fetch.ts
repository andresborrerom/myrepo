// Hybrid carta lookup: DB first (lo que la familia subió), seed como fallback.
// Si Supabase no está configurado, todo cae al seed.

import { CARTAS, BIRTH_YEAR, TURNS_75_YEAR } from '@/data/cartas';
import type { Carta } from '@/data/cartas';
import { fetchCartaForYear, fetchPublishedAportes } from './aportes-fetch';

export type CartaFinal = Carta & {
  _source: 'db' | 'seed';
};

export async function getCartaFinal(year: number): Promise<CartaFinal | null> {
  const db = await fetchCartaForYear(year);
  if (db) {
    return {
      year: db.year!,
      fromId: db.from_id,
      title: db.title || undefined,
      body: db.body || '',
      audioUrl: db.media_url || undefined,
      _source: 'db'
    };
  }
  const seed = CARTAS.find((c) => c.year === year);
  if (seed) return { ...seed, _source: 'seed' };
  return null;
}

export async function getYearsCoverageWithDb() {
  const dbAportes = await fetchPublishedAportes({ kinds: ['carta'] });
  const dbYears = new Set(
    dbAportes.map((a) => a.year).filter((y): y is number => typeof y === 'number')
  );

  const years: { year: number; hasCarta: boolean; source: 'db' | 'seed' | null }[] = [];
  for (let y = BIRTH_YEAR; y <= TURNS_75_YEAR; y++) {
    const inDb = dbYears.has(y);
    const inSeed = CARTAS.some((c) => c.year === y);
    years.push({
      year: y,
      hasCarta: inDb || inSeed,
      source: inDb ? 'db' : inSeed ? 'seed' : null
    });
  }
  return years;
}
