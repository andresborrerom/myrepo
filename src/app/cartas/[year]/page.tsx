import Link from 'next/link';
import { notFound } from 'next/navigation';
import Avatar from '@/components/Avatar';
import { BIRTH_YEAR, CARTAS, getAuthor, getCarta } from '@/data/cartas';

export function generateStaticParams() {
  return CARTAS.map((c) => ({ year: String(c.year) }));
}

export default function CartaPage({ params }: { params: { year: string } }) {
  const year = Number(params.year);
  const carta = getCarta(year);
  if (!carta) notFound();

  const author = getAuthor(carta);
  const age = year - BIRTH_YEAR;

  return (
    <article className="space-y-6">
      <Link href="/cartas" className="inline-flex items-center gap-1 text-clay-600">
        ‹ Volver a las cartas
      </Link>

      <header className="space-y-2">
        <p className="font-display text-clay-600 text-xl">
          {year} · {age} {age === 1 ? 'año' : 'años'}
        </p>
        {carta.title && (
          <h1 className="font-display text-3xl leading-tight text-ink-900">
            {carta.title}
          </h1>
        )}
      </header>

      {author && (
        <div className="flex items-center gap-3 rounded-2xl bg-cream-100 p-3 shadow-warm">
          <Avatar person={author} size="sm" />
          <div>
            <p className="text-xs uppercase tracking-wide text-ink-800/60">de</p>
            <p className="font-display text-base font-bold text-ink-900">
              {author.shortName || author.name}
            </p>
          </div>
        </div>
      )}

      {carta.audioUrl && (
        <audio controls preload="none" className="w-full">
          <source src={carta.audioUrl} />
        </audio>
      )}

      <div className="space-y-4 text-lg leading-relaxed text-ink-900">
        {carta.body.split(/\n\s*\n/).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
    </article>
  );
}
