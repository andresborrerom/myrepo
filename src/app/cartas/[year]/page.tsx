import Link from 'next/link';
import { notFound } from 'next/navigation';
import HeartButton from '@/components/HeartButton';
import ShareButton from '@/components/ShareButton';
import SpeakButton from '@/components/SpeakButton';
import { BIRTH_YEAR, CARTAS } from '@/data/cartas';
import { getCartaAudioUrl } from '@/data/audios';
import { getPerson } from '@/data/family';
import { getCartasForYear, getDayIndex, type CartaFinal } from '@/lib/cartas-fetch';
import { isInsider } from '@/lib/auth';
import CartaGate from './CartaGate';

export const dynamic = 'force-dynamic';

export default async function CartaPage({ params }: { params: { year: string } }) {
  const year = Number(params.year);
  if (!year || year < 1900 || year > 2100) notFound();

  const cartas = await getCartasForYear(year);
  if (cartas.length === 0) notFound();

  const insider = isInsider();
  const dayIdx = getDayIndex();
  const dayOfYear = year - BIRTH_YEAR;

  // Posición en la rejilla — para "Carta 38 / 75"
  const sembradas = CARTAS.map((c) => c.year).sort((a, b) => a - b);
  const indexInSembradas = sembradas.indexOf(year);
  const ordinal = indexInSembradas >= 0 ? indexInSembradas + 1 : null;
  const total = sembradas.length;

  // Año anterior / posterior con carta — para navegación libro
  const prevYear = sembradas.filter((y) => y < year).pop();
  const nextYear = sembradas.find((y) => y > year);

  const content = (
    <article className="carta-enter bg-lino text-tinta min-h-dvh -mt-6 -mx-5 px-6 pt-10 pb-32">
      {/* Cabecera tipo monografía */}
      <header className="space-y-1">
        <Link href="/cartas" className="inline-block font-mono text-[10px] tracking-widest text-grafito hover:text-tomate">
          ← VOLVER AL ÍNDICE
        </Link>
        <p className="pt-6 font-mono text-[10px] tracking-[0.2em] text-grafito">
          {ordinal !== null ? `CARTA ${String(ordinal).padStart(2, '0')} / ${total}` : 'CARTA'} · AÑO {year} · {year - BIRTH_YEAR} {year - BIRTH_YEAR === 1 ? 'AÑO' : 'AÑOS'}
        </p>
      </header>

      <Rule className="my-6" />

      {/* Lista de cartas (puede haber varias por año) */}
      <ul className="space-y-12">
        {cartas.map((carta, i) => (
          <li key={`${carta.fromId}-${i}`}>
            <CartaItem carta={carta} year={year} />
            {i < cartas.length - 1 && <Rule className="mt-12" />}
          </li>
        ))}
      </ul>

      <Rule className="my-10" />

      {/* Pie de página tipo libro */}
      <footer className="flex items-center justify-between font-mono text-[11px] tracking-widest text-grafito">
        {prevYear ? (
          <Link href={`/cartas/${prevYear}`} className="hover:text-tomate">
            ← {prevYear}
          </Link>
        ) : <span />}
        <span className="text-center">
          {ordinal !== null && `${String(ordinal).padStart(2, '0')} / ${total}`}
        </span>
        {nextYear ? (
          <Link href={`/cartas/${nextYear}`} className="hover:text-tomate">
            {nextYear} →
          </Link>
        ) : <span />}
      </footer>
    </article>
  );

  return (
    <CartaGate
      year={year}
      insider={insider}
      dayIdx={dayIdx}
    >
      {content}
    </CartaGate>
  );
}

function CartaItem({ carta, year }: { carta: CartaFinal; year: number }) {
  const author = getPerson(carta.fromId);
  const audioUrl = carta.audioUrl || getCartaAudioUrl(year);

  const spokenText = [
    author ? `Carta de ${author.shortName || author.name}.` : '',
    carta.title ? `${carta.title}.` : '',
    carta.body
  ].filter(Boolean).join(' ');

  return (
    <div>
      {/* Título */}
      {carta.title && (
        <h1 className="font-display text-4xl font-extralight italic leading-[1.1] text-tinta">
          {carta.title}
        </h1>
      )}

      {/* Byline */}
      {author && (
        <p className="mt-4 font-mono text-[10px] tracking-[0.2em] text-grafito">
          DE {(author.shortName || author.name).toUpperCase()}
        </p>
      )}

      {/* Audio o TTS */}
      <div className="mt-6">
        {audioUrl ? (
          <audio controls preload="none" className="w-full">
            <source src={audioUrl} />
          </audio>
        ) : (
          <SpeakButton text={spokenText} />
        )}
      </div>

      {/* Cuerpo — Source Serif 4, columna estrecha, leading generoso */}
      <div className="mt-8 max-w-prose space-y-5 font-serif text-[18px] leading-[1.75] text-tinta">
        {carta.body.split(/\n\s*\n/).map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      {/* Acciones */}
      <div className="mt-8 flex flex-wrap gap-2">
        <HeartButton itemId={`carta:${year}:${carta.fromId}:${carta._id || 'seed'}`} />
        <ShareButton title={carta.title} text={`Carta del año ${year}`} />
      </div>
    </div>
  );
}

function Rule({ className = '' }: { className?: string }) {
  return <div className={`h-px w-full bg-regla ${className}`} aria-hidden />;
}
