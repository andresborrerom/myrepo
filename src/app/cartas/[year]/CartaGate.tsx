'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { tryReveal, type AlejandroState } from '@/lib/reveal-state';

type GateState =
  | { kind: 'loading' }
  | { kind: 'allowed' }
  | { kind: 'locked-pre' }
  | { kind: 'locked-today'; revealedToday: number | null };

export default function CartaGate({
  year,
  insider,
  dayIdx,
  children
}: {
  year: number;
  insider: boolean;
  dayIdx: number | null; // null = pre-cumpleaños
  children: React.ReactNode;
}) {
  const [state, setState] = useState<GateState>({ kind: 'loading' });

  useEffect(() => {
    // Insiders pasan derecho — no consumen cupo del día.
    if (insider) {
      setState({ kind: 'allowed' });
      return;
    }
    // Pre-cumpleaños: nada se abre.
    if (dayIdx === null) {
      setState({ kind: 'locked-pre' });
      return;
    }
    // Toda otra decisión la toma el servidor: si ya está revelada deja
    // pasar (relectura), si no está y hay cupo de hoy la revela, si el
    // cupo está consumido la bloquea con info de cuál abrió hoy.
    // YA NO bloqueamos por "año futuro en el calendario" — eso era el
    // viejo modelo de slicing por día.
    (async () => {
      const result = await tryReveal(year);
      if (result.kind === 'first-reveal' || result.kind === 'already-revealed') {
        setState({ kind: 'allowed' });
        return;
      }
      if (result.kind === 'blocked-today') {
        const revealed = (result.state as AlejandroState).revealedYears;
        const lastRevealed = revealed.length > 0 ? revealed[revealed.length - 1] : null;
        setState({ kind: 'locked-today', revealedToday: lastRevealed });
        return;
      }
      // 'no-backend' o 'error': graceful — dejamos pasar.
      setState({ kind: 'allowed' });
    })();
  }, [insider, year, dayIdx]);

  if (state.kind === 'loading') return null;

  if (state.kind === 'allowed') {
    return <>{children}</>;
  }

  if (state.kind === 'locked-pre') {
    return (
      <div className="bg-lino text-tinta min-h-dvh -mt-6 -mx-5 px-6 pt-12 pb-32">
        <Link href="/cartas" className="font-mono text-[10px] tracking-widest text-grafito hover:text-tomate">
          ← VOLVER AL ÍNDICE
        </Link>
        <div className="mt-12 text-center">
          <p className="font-mono text-[10px] tracking-widest text-grafito">CARTA SELLADA</p>
          <h1 className="mt-6 font-display text-3xl font-light italic text-tinta">
            Las cartas empiezan el día de tu cumpleaños.
          </h1>
          <p className="mt-4 font-serif text-base italic text-grafito">21 de mayo de 2026.</p>
        </div>
      </div>
    );
  }

  // locked-today
  return (
    <div className="bg-lino text-tinta min-h-dvh -mt-6 -mx-5 px-6 pt-12 pb-32">
      <Link href="/cartas" className="font-mono text-[10px] tracking-widest text-grafito hover:text-tomate">
        ← VOLVER AL ÍNDICE
      </Link>
      <div className="mt-12 text-center">
        <p className="font-mono text-[10px] tracking-widest text-grafito">UNA CARTA AL DÍA</p>
        <h1 className="mt-6 font-display text-3xl font-light italic text-tinta">
          Ya abriste tu carta de hoy.
        </h1>
        {state.revealedToday && (
          <p className="mt-4 font-serif text-base italic text-grafito">
            Hoy abriste la del año {state.revealedToday}.
          </p>
        )}
        <div className="mt-6 space-y-3">
          {state.revealedToday && (
            <Link
              href={`/cartas/${state.revealedToday}`}
              className="block font-serif text-base italic text-tomate hover:underline"
            >
              Volver a leer la del {state.revealedToday}
            </Link>
          )}
          <p className="font-serif text-sm italic text-grafito">
            Mañana podrás abrir otra. Una por día.
          </p>
        </div>
      </div>
    </div>
  );
}
