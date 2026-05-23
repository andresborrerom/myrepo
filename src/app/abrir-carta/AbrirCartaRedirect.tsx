'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { fetchState, isTodayInBogota } from '@/lib/reveal-state';

type Estado = 'cargando' | 'antes' | 'sin-cartas' | 'ya-hoy' | 'todas-abiertas';

export default function AbrirCartaRedirect({
  releasedYears,
  antesDelCumple
}: {
  releasedYears: number[];
  antesDelCumple: boolean;
}) {
  const router = useRouter();
  const [estado, setEstado] = useState<Estado>('cargando');

  useEffect(() => {
    if (antesDelCumple) {
      setEstado('antes');
      return;
    }
    (async () => {
      const { revealedYears, lastRevealDate } = await fetchState();
      const restantes = releasedYears.filter((y) => !revealedYears.includes(y));

      if (releasedYears.length === 0) {
        setEstado('sin-cartas');
        return;
      }
      if (isTodayInBogota(lastRevealDate)) {
        setEstado('ya-hoy');
        return;
      }
      if (restantes.length === 0) {
        setEstado('todas-abiertas');
        return;
      }
      // Escoge al azar y redirige — el gate de /cartas/[year] registra
      // el reveal del día.
      const y = restantes[Math.floor(Math.random() * restantes.length)];
      router.replace(`/cartas/${y}`);
    })();
  }, [releasedYears, antesDelCumple, router]);

  return (
    <div className="bg-sabana text-tinta2 min-h-dvh -mt-6 -mx-5 flex flex-col items-center justify-center px-8 text-center">
      {estado === 'cargando' && (
        <>
          <p className="font-display text-3xl font-light italic text-tinta2">
            Buscando tu carta…
          </p>
          <p className="mt-2 font-mono text-[10px] tracking-[0.3em] text-oro">
            UN MOMENTO
          </p>
        </>
      )}

      {estado === 'antes' && (
        <>
          <p className="font-display text-3xl font-light italic text-tinta2">
            Todavía no, papá.
          </p>
          <p className="mt-3 font-serif text-base italic text-grafito">
            La primera carta se abre el día de tu cumpleaños — 21 de mayo de 2026.
          </p>
        </>
      )}

      {estado === 'ya-hoy' && (
        <>
          <p className="font-display text-3xl font-light italic text-tinta2">
            Ya abriste tu carta de hoy.
          </p>
          <p className="mt-3 font-serif text-base italic text-grafito">
            Mañana te espera otra. Una por día.
          </p>
          <Link
            href="/cartas"
            className="mt-6 inline-flex rounded-full bg-cuero px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] text-papel"
          >
            VER MIS CARTAS
          </Link>
        </>
      )}

      {estado === 'todas-abiertas' && (
        <>
          <p className="font-display text-3xl font-light italic text-tinta2">
            Las abriste todas.
          </p>
          <p className="mt-3 font-serif text-base italic text-grafito">
            Cada año de tu vida, leído. Puedes releer las que quieras.
          </p>
          <Link
            href="/cartas"
            className="mt-6 inline-flex rounded-full bg-cuero px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] text-papel"
          >
            VER MIS CARTAS
          </Link>
        </>
      )}

      {estado === 'sin-cartas' && (
        <>
          <p className="font-display text-3xl font-light italic text-tinta2">
            Pronto.
          </p>
          <p className="mt-3 font-serif text-base italic text-grafito">
            Todavía no hay cartas disponibles para abrir.
          </p>
        </>
      )}
    </div>
  );
}
