'use client';

// Estado de "una carta al día" — sincronizado server-side vía Supabase
// para que cruce iPhone / iPad / PC.
//
// Fallback graceful: si el API falla (sin Supabase configurado o sin red),
// el gate deja pasar al usuario sin romper la experiencia.

export type RevealResult =
  | { kind: 'first-reveal'; state: AlejandroState }
  | { kind: 'already-revealed'; state: AlejandroState }
  | { kind: 'blocked-today'; state: AlejandroState }
  | { kind: 'no-backend' }
  | { kind: 'error' };

export type AlejandroState = {
  revealedYears: number[];
  lastRevealDate: string | null;
};

export async function fetchState(): Promise<AlejandroState> {
  try {
    const res = await fetch('/api/alejandro/state', { cache: 'no-store' });
    if (!res.ok) return { revealedYears: [], lastRevealDate: null };
    const data = await res.json();
    return {
      revealedYears: Array.isArray(data.revealedYears) ? data.revealedYears : [],
      lastRevealDate: data.lastRevealDate || null
    };
  } catch {
    return { revealedYears: [], lastRevealDate: null };
  }
}

export async function tryReveal(year: number): Promise<RevealResult> {
  try {
    const res = await fetch('/api/alejandro/reveal', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ year })
    });
    if (!res.ok) return { kind: 'error' };
    const data = await res.json();
    return data;
  } catch {
    return { kind: 'error' };
  }
}

// Compara una fecha (YYYY-MM-DD) con "hoy en Bogotá".
export function isTodayInBogota(date: string | null): boolean {
  if (!date) return false;
  const bog = new Date(Date.now() - 5 * 3_600_000);
  return bog.toISOString().slice(0, 10) === date;
}
