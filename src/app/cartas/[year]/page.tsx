import Link from 'next/link';
import { notFound } from 'next/navigation';
import Avatar from '@/components/Avatar';
import HeartButton from '@/components/HeartButton';
import ShareButton from '@/components/ShareButton';
import SpeakButton from '@/components/SpeakButton';
import { BIRTH_YEAR } from '@/data/cartas';
import { getCartaAudioUrl } from '@/data/audios';
import { getColorRama, getPerson } from '@/data/family';
import { getCartasForYear, getDayIndex, type CartaFinal } from '@/lib/cartas-fetch';
import { isInsider } from '@/lib/auth';

export const dynamic = 'force-dynamic';

export default async function CartaPage({ params }: { params: { year: string } }) {
  const year = Number(params.year);
  if (!year || year < 1900 || year > 2100) notFound();

  const cartas = await getCartasForYear(year);
  if (cartas.length === 0) notFound();

  // Bloqueo para Alejandro si el año todavía no toca.
  const insider = isInsider();
  const dayIdx = getDayIndex();
  const dayOfYear = year - BIRTH_YEAR;
  const isReleased = dayIdx !== null && dayOfYear <= dayIdx;

  if (!insider && !isReleased) {
    return (
      <div className="space-y-6 text-center">
        <Link href="/cartas" className="inline-flex items-center gap-1 text-clay-600">
          ‹ Volver a las cartas
        </Link>
        <div className="rounded-3xl bg-cream-100 p-8 shadow-warm">
          <p className="text-5xl">🔒</p>
          <h1 className="mt-4 font-display text-2xl text-ink-900">
            Esta carta llega después
          </h1>
          <p className="mt-3 text-base text-ink-800">
            La carta del año {year} todavía no toca. Te llegará el día {dayOfYear + 1} desde tu cumpleaños.
          </p>
        </div>
      </div>
    );
  }

  return (
    <article className="carta-enter space-y-6">
      <Link href="/cartas" className="inline-flex items-center gap-1 text-clay-600">
        ‹ Volver a las cartas
      </Link>

      <header className="space-y-2">
        <p className="font-display text-clay-600 text-xl">
          {year} · {year - BIRTH_YEAR} {year - BIRTH_YEAR === 1 ? 'año' : 'años'}
        </p>
        {cartas.length > 1 && (
          <p className="text-sm text-ink-800/60">
            {cartas.length} cartas para este año
          </p>
        )}
      </header>

      <ul className="space-y-8">
        {cartas.map((carta, i) => (
          <li key={`${carta.fromId}-${i}`}>
            <CartaItem carta={carta} year={year} />
          </li>
        ))}
      </ul>
    </article>
  );
}

function CartaItem({ carta, year }: { carta: CartaFinal; year: number }) {
  const author = getPerson(carta.fromId);
  const ramaColor = getColorRama(carta.fromId);
  const audioUrl = carta.audioUrl || getCartaAudioUrl(year);

  const spokenText = [
    author ? `Carta de ${author.shortName || author.name}.` : '',
    carta.title ? `${carta.title}.` : '',
    carta.body
  ].filter(Boolean).join(' ');

  return (
    <div className="space-y-4">
      {carta.title && (
        <h2 className="font-display text-2xl leading-tight text-ink-900">
          {carta.title}
        </h2>
      )}

      {author && (
        <div className="overflow-hidden rounded-2xl bg-cream-100 shadow-warm">
          <div aria-hidden className={`h-1.5 w-full ${ramaColor}`} />
          <div className="flex items-center gap-3 p-3">
            <Avatar person={author} size="sm" />
            <div>
              <p className="text-xs uppercase tracking-wide text-ink-800/60">de</p>
              <p className="font-display text-base font-bold text-ink-900">
                {author.shortName || author.name}
              </p>
            </div>
          </div>
        </div>
      )}

      {audioUrl ? (
        <audio controls preload="none" className="w-full">
          <source src={audioUrl} />
        </audio>
      ) : (
        <div className="flex">
          <SpeakButton text={spokenText} />
        </div>
      )}

      <div className="space-y-4 text-lg leading-relaxed text-ink-900">
        {carta.body.split(/\n\s*\n/).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <div className="flex flex-wrap gap-2 pt-2">
        <HeartButton itemId={`carta:${year}:${carta.fromId}:${carta._id || 'seed'}`} />
        <ShareButton title={carta.title} text={`Carta del año ${year}`} />
      </div>
    </div>
  );
}
