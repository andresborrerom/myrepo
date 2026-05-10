import Link from 'next/link';
import {
  BIRTH_YEAR,
  TURNS_75_YEAR,
  CARTAS,
  getYearsCoverage,
  getCartaDelDia,
  getRevealDate,
  getCarta
} from '@/data/cartas';

export const metadata = { title: 'Cartas' };
export const revalidate = 60;

export default function CartasPage() {
  const cobertura = getYearsCoverage();
  const totalSembradas = CARTAS.length;
  const cartaHoy = getCartaDelDia();
  const now = new Date();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-ink-900">Setenta y cinco cartas</h1>
        <p className="text-base text-ink-800/80">
          Una por cada año de tu vida. La familia las va escribiendo. Te llega
          una al día durante los 75 días después del cumpleaños.
        </p>
        <p className="text-sm text-ink-800/60">
          {totalSembradas} de 75 sembradas hasta hoy.
        </p>
      </header>

      {cartaHoy && (
        <Link
          href={`/cartas/${cartaHoy.year}`}
          className="block rounded-3xl bg-clay-500 p-5 text-cream-50 shadow-warm"
        >
          <p className="text-xs uppercase tracking-wide opacity-80">Tu carta de hoy</p>
          <p className="mt-1 font-display text-xl font-bold">
            {cartaHoy.title || `Año ${cartaHoy.year}`}
          </p>
          <p className="text-sm opacity-90">Año {cartaHoy.year}</p>
        </Link>
      )}

      <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5">
        {cobertura.map(({ year, hasCarta }) => {
          const c = hasCarta ? getCarta(year) : undefined;
          const revealed = c ? getRevealDate(c) <= now : false;
          const isToday = cartaHoy?.year === year;

          // Cartas sembradas: si ya está su día, links normales; si todavía
          // no es su día, mostradas en gris pero clickables (modo preview
          // para la familia mientras prepara).
          if (hasCarta) {
            return (
              <li key={year}>
                <Link
                  href={`/cartas/${year}`}
                  className={`flex h-full flex-col items-center justify-center rounded-xl p-3 shadow-warm ${
                    isToday
                      ? 'bg-clay-500 text-cream-50 ring-2 ring-clay-700'
                      : revealed
                      ? 'bg-clay-500 text-cream-50'
                      : 'bg-cream-100 text-ink-800'
                  }`}
                >
                  <span className="font-display text-xl font-bold leading-none">{year}</span>
                  <span className="mt-1 text-xs opacity-90">
                    {year - BIRTH_YEAR} {year - BIRTH_YEAR === 1 ? 'año' : 'años'}
                  </span>
                </Link>
              </li>
            );
          }

          return (
            <li key={year}>
              <div
                aria-label={`Año ${year}, sin carta`}
                className="flex h-full flex-col items-center justify-center rounded-xl border border-dashed border-cream-200 bg-cream-50 p-3 text-ink-800/40"
              >
                <span className="font-display text-xl leading-none">{year}</span>
                <span className="mt-1 text-xs">vacío</span>
              </div>
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
