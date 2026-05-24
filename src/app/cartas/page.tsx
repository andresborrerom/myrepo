import Link from 'next/link';
import { CARTAS } from '@/data/cartas';
import {
  fetchAlejandroStateServer,
  getDayIndex,
  getReleasedYears,
  isPlaceholderBody
} from '@/lib/cartas-fetch';
import { isInsider } from '@/lib/auth';

export const metadata = { title: 'Cartas' };
export const dynamic = 'force-dynamic';

export default async function CartasPage() {
  const insider = isInsider();
  const now = new Date();
  const dayIdx = getDayIndex(now);

  // Pool real: años con carta no-placeholder.
  const released = getReleasedYears(now);

  // Estado de papá: qué años abrió.
  const { revealedYears } = insider
    ? { revealedYears: released } // insider ve todo abierto
    : await fetchAlejandroStateServer();

  // Para el grid, mostramos un sobre por cada año con carta real (no placeholders).
  // El año queda visible si: lo abrieron O tiene carta real lista.
  const years = released; // ya ordenados

  return (
    <div className="bg-sabana text-tinta2 min-h-dvh -mt-6 -mx-5 px-6 pt-10 pb-32 sm:px-10">
      <header className="space-y-3">
        <div className="flex items-center gap-2 text-oro">
          <span className="h-px w-6 bg-oro" aria-hidden />
          <span className="font-mono text-[10px] tracking-[0.3em]">TUS CARTAS</span>
        </div>
        <h1 className="font-display text-3xl font-light italic text-tinta2 sm:text-4xl">
          Setenta y cinco años, una carta a la vez.
        </h1>
        <p className="font-serif text-sm italic text-grafito">
          {revealedYears.length} {revealedYears.length === 1 ? 'abierta' : 'abiertas'} de {years.length}.
          {dayIdx === null && ' La primera llega el 21 de mayo.'}
        </p>
      </header>

      <div className="my-8 flex items-center gap-3" aria-hidden>
        <span className="h-px flex-1 bg-hueso" />
        <span className="text-[10px] text-oro/70">◆</span>
        <span className="h-px flex-1 bg-hueso" />
      </div>

      {/* Grid de sobres */}
      <section aria-label="Mis cartas" className="space-y-3">
        <ul className="grid grid-cols-3 gap-3 sm:grid-cols-4">
          {years.map((year) => {
            const opened = revealedYears.includes(year);
            return (
              <li key={year}>
                <Sobre year={year} opened={opened} />
              </li>
            );
          })}
        </ul>

        <p className="pt-4 font-serif text-xs italic text-grafito text-center">
          Los sobres se abren al azar, uno por día. Toca un sobre abierto para releerlo.
        </p>
      </section>
    </div>
  );
}

function Sobre({ year, opened }: { year: number; opened: boolean }) {
  const className = opened
    ? 'group block aspect-[4/3] rounded-lg border border-cuero/50 bg-papel shadow-warm transition active:scale-95'
    : 'block aspect-[4/3] rounded-lg border border-hueso bg-papel/60 opacity-70';

  const inner = (
    <div className="relative flex h-full flex-col items-center justify-center gap-1 p-2">
      {opened ? <SobreAbierto /> : <SobreCerrado />}
      <span
        className={`font-display text-sm font-light italic ${
          opened ? 'text-cuero' : 'text-tinta2/60'
        }`}
      >
        {year}
      </span>
    </div>
  );

  if (opened) {
    return (
      <Link href={`/cartas/${year}`} className={className} aria-label={`Releer carta del año ${year}`}>
        {inner}
      </Link>
    );
  }

  return (
    <div className={className} aria-label={`Sobre cerrado — año ${year}`}>
      {inner}
    </div>
  );
}

function SobreCerrado() {
  return (
    <svg
      viewBox="0 0 40 30"
      width="36"
      height="27"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      className="text-tinta2/40"
      aria-hidden
    >
      {/* Cuerpo */}
      <rect x="3" y="6" width="34" height="22" rx="1.5" fill="#F5EFE2" />
      {/* Solapa cerrada hacia abajo */}
      <path d="M3 6 L20 18 L37 6" fill="#EDE6D8" />
      {/* Sello de cera */}
      <circle cx="20" cy="22" r="2.5" fill="#A8412C" stroke="#A8412C" />
    </svg>
  );
}

function SobreAbierto() {
  return (
    <svg
      viewBox="0 0 40 30"
      width="36"
      height="27"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinejoin="round"
      className="text-cuero"
      aria-hidden
    >
      {/* Cuerpo */}
      <rect x="3" y="11" width="34" height="17" rx="1.5" fill="#F5EFE2" />
      {/* Solapa abierta hacia arriba (atrás) */}
      <path d="M3 11 L20 0 L37 11" strokeDasharray="2 2" opacity="0.6" />
      {/* V interna (la solapa frontal abierta) */}
      <path d="M3 11 L20 21 L37 11" />
      {/* Linea pequeña que sugiere papel adentro */}
      <path d="M9 18 L31 18" strokeWidth="1" opacity="0.4" />
      <path d="M9 22 L25 22" strokeWidth="1" opacity="0.4" />
    </svg>
  );
}
