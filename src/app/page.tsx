import Link from 'next/link';
import Avatar from '@/components/Avatar';
import Countdown from '@/components/Countdown';
import ReadingMode from '@/components/ReadingMode';
import { APP_TAGLINE } from '@/lib/config';
import { getPerson, getColorRama, PATRIARCH_ID } from '@/data/family';
import { getCartaDelDia, BIRTH_YEAR } from '@/data/cartas';
import {
  getAuthor as getUpdateAuthor,
  formatRelative
} from '@/data/updates';
import { getCombinedFeed } from '@/lib/feed';

export const dynamic = 'force-dynamic';

export default async function VestibuloPage() {
  const alejandro = getPerson(PATRIARCH_ID)!;
  const cartaHoy = getCartaDelDia();
  const feed = await getCombinedFeed();
  const updates = feed.slice(0, 3);

  return (
    <div className="space-y-8">
      <div className="flex justify-end">
        <ReadingMode />
      </div>

      <header className="flex flex-col items-center gap-4 text-center">
        <Avatar person={alejandro} size="xl" />
        <div>
          <h1 className="font-display text-3xl text-ink-900">Bienvenido a casa, papá</h1>
          <p className="mt-1 text-base text-ink-800/80">{APP_TAGLINE}</p>
        </div>
      </header>

      <section
        aria-label="Conteo regresivo"
        className="rounded-3xl bg-cream-100 p-6 text-center shadow-warm"
      >
        <Countdown />
      </section>

      {cartaHoy && (
        <Link
          href={`/cartas/${cartaHoy.year}`}
          aria-label={`Carta de hoy: año ${cartaHoy.year}`}
          className="block overflow-hidden rounded-3xl bg-clay-500 text-cream-50 shadow-warm"
        >
          <div className="p-6">
            <p className="text-sm uppercase tracking-wide opacity-80">
              Tu carta de hoy
            </p>
            <p className="mt-2 font-display text-2xl font-bold">
              {cartaHoy.title || `El año ${cartaHoy.year}`}
            </p>
            <p className="mt-1 text-sm opacity-90">
              Año {cartaHoy.year} · {cartaHoy.year - BIRTH_YEAR} años
            </p>
            <p className="mt-4 inline-flex items-center gap-1 text-sm">
              Ábrela <span aria-hidden>→</span>
            </p>
          </div>
        </Link>
      )}

      <section aria-label="Novedades" className="space-y-3">
        <h2 className="font-display text-xl text-ink-900">Novedades de la familia</h2>
        {updates.length === 0 ? (
          <div className="rounded-2xl border border-dashed border-cream-200 bg-cream-50 p-6 text-center text-ink-800/70">
            Aún no hay novedades. La familia las irá llenando.
          </div>
        ) : (
          <ul className="space-y-2">
            {updates.map((u) => {
              const author = getUpdateAuthor(u);
              const ramaColor = getColorRama(u.fromId);
              return (
                <li key={u.id}>
                  <Link
                    href="/buzon"
                    className="flex items-center gap-3 overflow-hidden rounded-2xl bg-cream-100 shadow-warm"
                  >
                    <span aria-hidden className={`h-full w-1.5 self-stretch ${ramaColor}`} />
                    <div className="flex flex-1 items-center gap-3 py-3 pr-4">
                      {author && <Avatar person={author} size="sm" />}
                      <div className="min-w-0 flex-1">
                        <p className="font-display text-base font-bold text-ink-900">
                          {author?.shortName || 'Familia'}
                        </p>
                        <p className="truncate text-sm text-ink-800/70">
                          {u.title || u.text || 'Nueva entrada'}
                        </p>
                        <p className="mt-0.5 text-xs text-ink-800/50">
                          {formatRelative(u.createdAt)}
                        </p>
                      </div>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </section>

      <section aria-label="Atajos" className="grid grid-cols-2 gap-3">
        <ShortcutCard href="/arbol"   icon="🌳" title="Tu árbol"   sub="14 personas" />
        <ShortcutCard href="/estudio" icon="✏️" title="Tu obra"    sub="Casas y flores" />
        <ShortcutCard href="/cartas"  icon="✍️" title="Cartas"     sub="Una por año" />
        <ShortcutCard href="/memoria" icon="📖" title="La memoria" sub="75 años" />
      </section>

      <Link
        href="/como-instalar"
        className="block rounded-2xl border border-cream-200 bg-cream-50 p-4 text-center text-sm text-ink-800/80"
      >
        ¿Cómo poner esta app en tu iPhone? →
      </Link>
    </div>
  );
}

function ShortcutCard({
  href, icon, title, sub
}: { href: string; icon: string; title: string; sub: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-1 rounded-2xl bg-cream-100 p-4 shadow-warm active:scale-[0.98]"
    >
      <span aria-hidden className="text-3xl">{icon}</span>
      <span className="font-display text-lg font-bold text-ink-900">{title}</span>
      <span className="text-sm text-ink-800/70">{sub}</span>
    </Link>
  );
}
