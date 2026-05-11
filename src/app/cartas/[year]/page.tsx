import Link from 'next/link';
import { notFound } from 'next/navigation';
import Avatar from '@/components/Avatar';
import HeartButton from '@/components/HeartButton';
import ShareButton from '@/components/ShareButton';
import SpeakButton from '@/components/SpeakButton';
import { BIRTH_YEAR } from '@/data/cartas';
import { getCartaAudioUrl } from '@/data/audios';
import { getColorRama, getPerson } from '@/data/family';
import { getCartaFinal } from '@/lib/cartas-fetch';

export const dynamic = 'force-dynamic';

export default async function CartaPage({ params }: { params: { year: string } }) {
  const year = Number(params.year);
  if (!year || year < 1900 || year > 2100) notFound();

  const carta = await getCartaFinal(year);
  if (!carta) notFound();

  const author = getPerson(carta.fromId);
  const age = year - BIRTH_YEAR;
  const ramaColor = getColorRama(carta.fromId);

  // Audio: prioriza el explícito (carta.audioUrl — DB media o seed manual),
  // luego el generado por el script de clonado, y si nada existe cae al
  // TTS del navegador.
  const audioUrl = carta.audioUrl || getCartaAudioUrl(year);

  // Texto narrado: autor + título + cuerpo. Pausas con punto para naturalidad.
  const spokenText = [
    author ? `Carta de ${author.shortName || author.name}.` : '',
    carta.title ? `${carta.title}.` : '',
    carta.body
  ].filter(Boolean).join(' ');

  return (
    <article className="carta-enter space-y-6">
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
        <HeartButton itemId={`carta:${year}`} />
        <ShareButton title={carta.title} text={`Carta del año ${year}`} />
      </div>
    </article>
  );
}
