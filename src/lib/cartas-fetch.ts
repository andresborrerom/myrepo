// Hybrid carta lookup: DB first (lo que la familia subió), seed como fallback.
// Si Supabase no está configurado, todo cae al seed.

import { CARTAS, BIRTH_YEAR, TURNS_75_YEAR } from '@/data/cartas';
import type { Carta } from '@/data/cartas';
import {
  fetchCartaForYear,
  fetchPublishedAportes,
  fetchMensajesLibres
} from './aportes-fetch';
import type { Aporte } from '@/data/aportes-types';

export type CartaFinal = Carta & {
  _source: 'db' | 'seed';
  _id?: string;
};

const BIRTHDAY = new Date('2026-05-21T07:00:00-05:00');
const TOTAL_DAYS = TURNS_75_YEAR - BIRTH_YEAR + 1; // 76 días: 1951..2026

function startOfDay(d: Date): Date {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

// Día N post-cumpleaños (0 = día del cumpleaños). null = pre-cumpleaños.
export function getDayIndex(now: Date = new Date()): number | null {
  const start = startOfDay(BIRTHDAY).getTime();
  const today = startOfDay(now).getTime();
  if (today < start) return null;
  return Math.floor((today - start) / 86_400_000);
}

// Años con carta ya desbloqueados — una CARTA nueva por día desde el
// cumpleaños, en orden cronológico. Día 0 → la primera carta; día N → las
// primeras (N+1) cartas. Esto evita que años sin carta "consuman" días
// del calendario.
export function getReleasedYears(now: Date = new Date()): number[] {
  const dayIdx = getDayIndex(now);
  if (dayIdx === null) return [];
  const sorted = CARTAS.map((c) => c.year).sort((a, b) => a - b);
  return sorted.slice(0, dayIdx + 1);
}

function aporteToCartaFinal(a: Aporte): CartaFinal {
  return {
    year: a.year!,
    fromId: a.from_id,
    title: a.title || undefined,
    body: a.body || '',
    audioUrl: a.media_url || undefined,
    _source: 'db',
    _id: a.id
  };
}

// Todas las cartas ancladas para un año (DB + seed combinados). Si el año
// tiene múltiples cartas, las devuelve todas en orden cronológico de creación.
export async function getCartasForYear(year: number): Promise<CartaFinal[]> {
  const all: CartaFinal[] = [];

  const dbAportes = await fetchPublishedAportes({ kinds: ['carta'] });
  for (const a of dbAportes) {
    if (a.year === year) all.push(aporteToCartaFinal(a));
  }
  for (const seed of CARTAS) {
    if (seed.year === year) {
      // Evita duplicar si la DB ya tiene una para este año + fromId.
      const dup = all.some(
        (c) => c._source === 'db' && c.fromId === seed.fromId
      );
      if (!dup) all.push({ ...seed, _source: 'seed' });
    }
  }
  return all;
}

// Una sola carta para un año (la primera que se encuentre). Útil cuando
// solo necesitas una. Para múltiples usa getCartasForYear.
export async function getCartaFinal(year: number): Promise<CartaFinal | null> {
  const all = await getCartasForYear(year);
  return all[0] || null;
}

export type DaySlot =
  | { day: number; year: number; type: 'anchored'; cartas: CartaFinal[] }
  | { day: number; year: number; type: 'libre'; mensaje: Aporte }
  | { day: number; year: number; type: 'empty' };

// Construye los 76 slots de la entrega. Cada día tiene anchored (cartas
// con año) o libre (mensaje libre asignado a un día vacío) o empty.
// Los libres se asignan a los días sin anchored en orden cronológico.
export async function buildSlots(): Promise<DaySlot[]> {
  const slots: DaySlot[] = [];
  const dbAportes = await fetchPublishedAportes({ kinds: ['carta'] });
  const libres = await fetchMensajesLibres();
  // libres viene ordenado desc por created_at; volvemos a asc para asignar
  // los más antiguos a los primeros días vacíos.
  const libresAsc = libres.slice().reverse();
  let libreIdx = 0;

  for (let d = 0; d < TOTAL_DAYS; d++) {
    const year = BIRTH_YEAR + d;
    const anchored: CartaFinal[] = [];

    for (const a of dbAportes) {
      if (a.year === year) anchored.push(aporteToCartaFinal(a));
    }
    for (const seed of CARTAS) {
      if (seed.year === year) {
        const dup = anchored.some(
          (c) => c._source === 'db' && c.fromId === seed.fromId
        );
        if (!dup) anchored.push({ ...seed, _source: 'seed' });
      }
    }

    if (anchored.length > 0) {
      slots.push({ day: d, year, type: 'anchored', cartas: anchored });
    } else if (libresAsc[libreIdx]) {
      slots.push({ day: d, year, type: 'libre', mensaje: libresAsc[libreIdx] });
      libreIdx++;
    } else {
      slots.push({ day: d, year, type: 'empty' });
    }
  }
  return slots;
}

// Devuelve los slots revelados a una fecha dada. Si insider=true, devuelve
// todos (modo preview). Si insider=false (Alejandro), devuelve solo los que
// ya tocaron su día.
export function filterSlotsForViewer(
  slots: DaySlot[],
  insider: boolean,
  now: Date = new Date()
): DaySlot[] {
  if (insider) return slots;
  const dayIdx = getDayIndex(now);
  if (dayIdx === null) return []; // pre-cumpleaños, Alejandro no ve nada
  return slots.filter((s) => s.day <= dayIdx);
}

export async function getYearsCoverageWithDb() {
  const dbAportes = await fetchPublishedAportes({ kinds: ['carta'] });
  const dbYears = new Set(
    dbAportes
      .map((a) => a.year)
      .filter((y): y is number => typeof y === 'number')
  );

  const years: {
    year: number;
    hasCarta: boolean;
    source: 'db' | 'seed' | null;
  }[] = [];
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

// Cobertura detallada año por año: cada año lista qué cartas existen
// (DB + seed combinados, sin duplicar same year+author), con su autor,
// fuente y si todavía es placeholder vacío.
export type CoberturaItem = {
  authorId: string;
  source: 'db' | 'seed';
  isPlaceholder: boolean;
  title?: string;
};

export type CoberturaYear = {
  year: number;
  items: CoberturaItem[];
};

function isPlaceholderBody(body: string | null | undefined): boolean {
  if (!body) return true;
  const trimmed = body.trim();
  if (trimmed === '') return true;
  // Convención de seeds: '[Nombre llenará esta carta]'
  if (/^\[.*llenará esta carta\]$/i.test(trimmed)) return true;
  return false;
}

export async function getCobertura(): Promise<CoberturaYear[]> {
  const dbAportes = await fetchPublishedAportes({ kinds: ['carta'] });
  const out: CoberturaYear[] = [];

  for (let y = BIRTH_YEAR; y <= TURNS_75_YEAR; y++) {
    const items: CoberturaItem[] = [];

    for (const a of dbAportes) {
      if (a.year !== y) continue;
      items.push({
        authorId: a.from_id,
        source: 'db',
        isPlaceholder: isPlaceholderBody(a.body),
        title: a.title || undefined
      });
    }
    for (const seed of CARTAS) {
      if (seed.year !== y) continue;
      const dup = items.some(
        (it) => it.source === 'db' && it.authorId === seed.fromId
      );
      if (dup) continue;
      items.push({
        authorId: seed.fromId,
        source: 'seed',
        isPlaceholder: isPlaceholderBody(seed.body),
        title: seed.title
      });
    }

    out.push({ year: y, items });
  }
  return out;
}
