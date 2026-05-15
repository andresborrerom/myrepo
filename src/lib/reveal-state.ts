'use client';

// Estado client-side de "una carta al día".
// localStorage:
//   casa-cartas:reveladas  → JSON array de years que el usuario ya abrió
//   casa-cartas:lastReveal → 'YYYY-MM-DD' del último día en que reveló una

const REVEALED_KEY = 'casa-cartas:reveladas';
const LAST_KEY = 'casa-cartas:lastReveal';

function todayISO(): string {
  return new Date().toISOString().slice(0, 10);
}

export function getRevealedYears(): number[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(REVEALED_KEY);
    if (!raw) return [];
    const arr = JSON.parse(raw);
    return Array.isArray(arr) ? arr.filter((y) => typeof y === 'number') : [];
  } catch {
    return [];
  }
}

export function getLastRevealDate(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(LAST_KEY) || '';
}

export function canRevealMoreToday(): boolean {
  return getLastRevealDate() !== todayISO();
}

// Devuelve true si se pudo registrar (year nuevo Y aún no se gastó el cupo del día).
// Devuelve false si: ya estaba revelado (no consume cupo, pero tampoco "nueva apertura")
// o si ya se usó el cupo del día con otro año.
export type RevealResult =
  | { kind: 'already-revealed' }
  | { kind: 'first-reveal' }
  | { kind: 'blocked-today' };

export function tryReveal(year: number): RevealResult {
  if (typeof window === 'undefined') return { kind: 'blocked-today' };
  const revealed = getRevealedYears();
  if (revealed.includes(year)) return { kind: 'already-revealed' };
  if (!canRevealMoreToday()) return { kind: 'blocked-today' };
  const updated = [...revealed, year];
  localStorage.setItem(REVEALED_KEY, JSON.stringify(updated));
  localStorage.setItem(LAST_KEY, todayISO());
  return { kind: 'first-reveal' };
}
