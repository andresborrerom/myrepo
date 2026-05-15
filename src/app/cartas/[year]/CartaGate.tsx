'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { getRevealedYears, tryReveal, getLastRevealDate } from '@/lib/reveal-state';
import { BIRTH_YEAR } from '@/data/cartas';

type GateState =
  | { kind: 'loading' }
  | { kind: 'allowed' }
  | { kind: 'locked-future' }
  | { kind: 'locked-today'; revealedToday: number | null };

export default function CartaGate({
  year,
  insider,
  dayIdx,
  dayOfYear,
  children
}: {
  year: number;
  insider: boolean;
  dayIdx: number | null; // null = pre-cumpleaños
  dayOfYear: number; // year - BIRTH_YEAR
  children: React.ReactNode;
}) {
  const [state, setState] = useState<GateState>({ kind: 'loading' });

  useEffect(() => {
    // Insider: acceso total, sin contar contra el cupo diario.
    if (insider) {
      setState({ kind: 'allowed' });
      return;
    }
    // Pre-cumpleaños: nada visible.
    if (dayIdx === null || dayOfYear > dayIdx) {
      setState({ kind: 'locked-future' });
      return;
    }
    // Post-cumpleaños: año liberado.
    const result = tryReveal(year);
    if (result.kind === 'already-revealed' || result.kind === 'first-reveal') {
      setState({ kind: 'allowed' });
      return;
    }
    // blocked-today: se usó el cupo con otro año.
    // Para informar cuál, buscamos el último año en revealed.
    const revealed = getRevealedYears();
    const lastRevealed = revealed[revealed.length - 1] ?? null;
    setState({ kind: 'locked-today', revealedToday: lastRevealed });
  }, [insider, year, dayIdx, dayOfYear]);

  if (state.kind === 'loading') {
    return null;
  }

  if (state.kind === 'allowed') {
    return <>{children}</>;
  }

  if (state.kind === 'locked-future') {
    return (
      <div className="bg-lino text-tinta min-h-dvh -mt-6 -mx-5 px-6 pt-12 pb-32">
        <Link href="/cartas" className="font-mono text-[10px] tracking-widest text-grafito hover:text-tomate">
          ← VOLVER AL ÍNDICE
        </Link>
        <div className="mt-12 text-center">
          <p className="font-mono text-[10px] tracking-widest text-grafito">
            CARTA SELLADA · AÑO {year}
          </p>
          <h1 className="mt-6 font-display text-3xl font-light italic text-tinta">
            Esta carta llega después.
          </h1>
          <p className="mt-4 font-serif text-base italic text-grafito">
            Te llegará el día {dayOfYear + 1} desde tu cumpleaños.
          </p>
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
        <p className="font-mono text-[10px] tracking-widest text-grafito">
          UNA CARTA AL DÍA
        </p>
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
