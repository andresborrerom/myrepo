import Link from 'next/link';
import Avatar from '@/components/Avatar';
import {
  BIRTH_YEAR,
  TURNS_75_YEAR,
  CARTAS,
  getCartaDelDia,
  getCartasReveladas,
  getRevealDate,
  getCarta,
  getAuthor
} from '@/data/cartas';
import { getColorRama } from '@/data/family';
import { getYearsCoverageWithDb } from '@/lib/cartas-fetch';

export const metadata = { title: 'Cartas' };
export const dynamic = 'force-dynamic';

export default async function CartasPage() {
  const cobertura = await getYearsCoverageWithDb();
  const totalSembradas = cobertura.filter((c) => c.hasCarta).length;
  const cartaHoy = getCartaDelDia();
  const reveladas = getCartasReveladas();
  const yaRecibidas = reveladas.filter((c) => c.year !== cartaHoy?.year);
  const proxima = CARTAS
    .filter((c) => getRevealDate(c) > new Date())
    .sort((a, b) => getRevealDate(a).getTime() - getRevealDate(b).getTime())[0];
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

      {cartaHoy && <CartaDeHoyCard carta={cartaHoy} />}

      {yaRecibidas.length > 0 && (
        <section aria-label="Cartas recibidas" className="space-y-3">
          <h2 className="font-display text-xl text-ink-900">Las que ya recibiste</h2>
          <ul className="space-y-2">
            {yaRecibidas.slice().reverse().map((c) => (
              <li key={c.year}>
                <FeedCartaItem year={c.year} title={c.title} fromId={c.fromId} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {!cartaHoy && proxima && (
        <section
          aria-label="Próxima carta"
          className="rounded-2xl border border-dashed border-clay-500/40 bg-cream-50 p-5 text-center"
        >
          <p className="text-xs uppercase tracking-wide text-clay-600">Pronto</p>
          <p className="mt-1 font-display text-lg text-ink-900">
            La siguiente carta es del año {proxima.year}
          </p>
          <p className="text-sm text-ink-800/70">
            Llega el {formatFecha(getRevealDate(proxima))}.
          </p>
        </section>
      )}

      <section aria-label="Todas las cartas" className="space-y-3">
        <h2 className="font-display text-xl text-ink-900">Las setenta y cinco</h2>
        <p className="text-sm text-ink-800/60">
          Un cuadro por cada año de tu vida.
        </p>
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {cobertura.map(({ year, hasCarta }) => {
            const c = hasCarta ? getCarta(year) : undefined;
            const revealed = c ? getRevealDate(c) <= now : false;
            const isToday = cartaHoy?.year === year;

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
      </section>

      <p className="pt-2 text-center text-sm text-ink-800/60">
        Año de nacimiento: {BIRTH_YEAR} · Cumple 75: {TURNS_75_YEAR}
      </p>
    </div>
  );
}

function CartaDeHoyCard({ carta }: { carta: NonNullable<ReturnType<typeof getCartaDelDia>> }) {
  const author = getAuthor(carta);
  return (
    <Link
      href={`/cartas/${carta.year}`}
      aria-label={`Carta de hoy: año ${carta.year}`}
      className="block overflow-hidden rounded-3xl bg-clay-500 text-cream-50 shadow-warm"
    >
      <div className="p-6">
        <p className="text-xs uppercase tracking-wide opacity-80">Tu carta de hoy</p>
        <p className="mt-2 font-display text-2xl font-bold">
          {carta.title || `Año ${carta.year}`}
        </p>
        <p className="mt-1 text-sm opacity-90">
          Año {carta.year} · {carta.year - BIRTH_YEAR} años
        </p>
        {author && (
          <p className="mt-3 text-sm opacity-90">
            De {author.shortName || author.name}
          </p>
        )}
        <p className="mt-4 inline-flex items-center gap-1 text-sm">
          Ábrela <span aria-hidden>→</span>
        </p>
      </div>
    </Link>
  );
}

function FeedCartaItem({
  year, title, fromId
}: { year: number; title?: string; fromId: string }) {
  const author = getAuthor({ year, fromId, body: '' });
  const ramaColor = getColorRama(fromId);
  return (
    <Link
      href={`/cartas/${year}`}
      className="flex items-stretch gap-3 overflow-hidden rounded-2xl bg-cream-100 shadow-warm"
    >
      <span aria-hidden className={`w-1.5 ${ramaColor}`} />
      <div className="flex flex-1 items-center gap-3 py-3 pr-4">
        {author && <Avatar person={author} size="sm" />}
        <div className="min-w-0 flex-1">
          <p className="font-display text-xs uppercase tracking-wide text-clay-600">
            {year}
          </p>
          <p className="truncate font-display text-base font-bold text-ink-900">
            {title || `Año ${year}`}
          </p>
          {author && (
            <p className="text-xs text-ink-800/60">
              De {author.shortName || author.name}
            </p>
          )}
        </div>
        <span aria-hidden className="text-2xl text-clay-500">›</span>
      </div>
    </Link>
  );
}

function formatFecha(d: Date): string {
  return d.toLocaleDateString('es-CO', {
    day: 'numeric', month: 'long', year: 'numeric'
  });
}
