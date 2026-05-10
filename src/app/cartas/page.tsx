import Link from 'next/link';
import {
  BIRTH_YEAR,
  TURNS_75_YEAR,
  CARTAS,
  getYearsCoverage
} from '@/data/cartas';

export const metadata = { title: 'Cartas' };

export default function CartasPage() {
  const cobertura = getYearsCoverage();
  const totalSembradas = CARTAS.length;

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-ink-900">Setenta y cinco cartas</h1>
        <p className="text-base text-ink-800/80">
          Una por cada año de tu vida. La familia las va escribiendo. Llegarán
          a tu buzón una al día durante los 75 días después del cumpleaños.
        </p>
        <p className="text-sm text-ink-800/60">
          {totalSembradas} de 75 sembradas hasta hoy.
        </p>
      </header>

      <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5">
        {cobertura.map(({ year, hasCarta }) => {
          const age = year - BIRTH_YEAR;
          return (
            <li key={year}>
              {hasCarta ? (
                <Link
                  href={`/cartas/${year}`}
                  className="flex h-full flex-col items-center justify-center rounded-xl bg-clay-500 p-3 text-cream-50 shadow-warm"
                >
                  <span className="font-display text-xl font-bold leading-none">{year}</span>
                  <span className="mt-1 text-xs opacity-90">{age} {age === 1 ? 'año' : 'años'}</span>
                </Link>
              ) : (
                <div
                  aria-label={`Año ${year}, sin carta`}
                  className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-cream-200 bg-cream-50 p-3 text-ink-800/40"
                >
                  <span className="font-display text-xl leading-none">{year}</span>
                  <span className="mt-1 text-xs">vacío</span>
                </div>
              )}
            </li>
          );
        })}
      </ul>

      <p className="pt-2 text-center text-sm text-ink-800/60">
        Año de nacimiento: {BIRTH_YEAR} · Cumple 75: {TURNS_75_YEAR}
      </p>
    </div>
  );
}
