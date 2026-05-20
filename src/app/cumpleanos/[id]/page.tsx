import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TARJETAS_CUMPLE, getTarjetaCumple } from '@/data/cumpleanos';

export function generateStaticParams() {
  return TARJETAS_CUMPLE.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = getTarjetaCumple(id);
  if (!t) return { title: 'Tarjeta no encontrada' };
  return { title: `Tarjeta de ${t.fromShortName || t.fromName} · 75 años` };
}

export default async function TarjetaCumplePage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = getTarjetaCumple(id);
  if (!t) notFound();

  const paragraphs = t.body.split(/\n\s*\n/);
  const from = t.fromShortName || t.fromName;

  return (
    <div className="bg-lino text-tinta min-h-dvh -mt-6 -mx-5 px-6 pt-6 pb-32">
      <div className="pt-2">
        <Link
          href="/cumpleanos"
          className="font-mono text-[10px] tracking-[0.2em] text-grafito hover:text-tomate"
        >
          ← TARJETAS
        </Link>
      </div>

      <article className="relative mt-6 overflow-hidden rounded-3xl bg-cream-50 px-6 py-10 shadow-warm sm:px-10 sm:py-14">
        {/* Watermark "75" */}
        <div
          aria-hidden
          className="pointer-events-none absolute -right-6 -top-4 select-none font-display text-[180px] font-extralight italic leading-none text-clay-500/10 sm:-right-2 sm:-top-2 sm:text-[220px]"
        >
          75
        </div>

        {/* Top ribbon */}
        <div className={`absolute left-0 top-0 h-1.5 w-full ${t.branchColor || 'bg-clay-500'}`} aria-hidden />

        <header className="relative space-y-2">
          <p className="font-mono text-[10px] tracking-[0.2em] text-grafito">
            TARJETA DE CUMPLEAÑOS · 21 DE MAYO DE 2026
          </p>
          <p className="font-mono text-[10px] tracking-[0.2em] text-tomate">
            DE {from.toUpperCase()}
            {t.fromRelation && (
              <span className="text-grafito"> · {t.fromRelation.toUpperCase()}</span>
            )}
          </p>
        </header>

        {t.song && (
          <div className="relative mt-6">
            <p className="font-mono text-[10px] tracking-[0.2em] text-grafito">
              ♪ LA CANCIÓN DE {from.toUpperCase()} PARA TI
            </p>
            <p className="mt-1 font-serif text-sm italic text-tinta/80">
              {t.song.title} — {t.song.artist}
            </p>
            <div className="mt-3 overflow-hidden rounded-xl">
              <iframe
                title={`${t.song.title} — ${t.song.artist}`}
                src={`https://open.spotify.com/embed/track/${t.song.spotifyTrackId}?utm_source=generator`}
                width="100%"
                height="152"
                frameBorder={0}
                allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                loading="lazy"
              />
            </div>
          </div>
        )}

        {t.greeting && (
          <p className="relative mt-8 font-display text-3xl font-light italic leading-tight text-tinta sm:text-4xl">
            {t.greeting}
          </p>
        )}

        <div className="relative mt-6 space-y-5">
          {paragraphs.map((p, i) => (
            <p
              key={i}
              className="font-serif text-base leading-relaxed text-tinta/90 sm:text-[17px] sm:leading-[1.75]"
            >
              {p}
            </p>
          ))}
        </div>

        {t.signoff && (
          <p className="relative mt-10 font-serif text-base italic text-tinta/90">
            {t.signoff}
          </p>
        )}

        <p className="relative mt-2 font-display text-3xl font-light italic text-tomate">
          {t.signature}
        </p>

        {/* Decorative bottom flourish */}
        <div className="relative mt-12 flex items-center gap-3" aria-hidden>
          <span className="h-px flex-1 bg-regla" />
          <span className="font-mono text-[9px] tracking-[0.3em] text-grafito">75</span>
          <span className="h-px flex-1 bg-regla" />
        </div>
      </article>

      <div className="mt-10 text-center">
        <Link
          href="/cumpleanos"
          className="font-serif text-sm italic text-grafito hover:text-tomate"
        >
          ← Volver a todas las tarjetas
        </Link>
      </div>
    </div>
  );
}
