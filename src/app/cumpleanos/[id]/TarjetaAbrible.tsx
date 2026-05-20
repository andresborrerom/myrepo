'use client';

import { useState } from 'react';
import type { TarjetaCumple } from '@/data/cumpleanos';

export default function TarjetaAbrible({ t }: { t: TarjetaCumple }) {
  const [open, setOpen] = useState(false);
  const paragraphs = t.body.split(/\n\s*\n/);
  const from = t.fromShortName || t.fromName;
  const ribbon = t.branchColor || 'bg-clay-500';

  return (
    <article className="relative mt-6 overflow-hidden rounded-3xl bg-cream-50 shadow-warm">
      {/* Cinta superior con color de rama (siempre visible) */}
      <div className={`absolute left-0 top-0 z-20 h-1.5 w-full ${ribbon}`} aria-hidden />

      {/* CARÁTULA (carta cerrada) */}
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="relative block w-full text-center"
          aria-label={`Abrir la tarjeta de ${from}`}
        >
          {t.coverImage ? (
            <div className="relative aspect-[3/4] w-full overflow-hidden sm:aspect-[4/5]">
              {/* Foto de fondo */}
              <img
                src={t.coverImage.src}
                alt={t.coverImage.alt}
                className="absolute inset-0 h-full w-full object-cover"
                style={{ objectPosition: t.coverImage.objectPosition || 'center' }}
              />
              {/* Gradiente para legibilidad */}
              <div
                aria-hidden
                className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30"
              />

              {/* Contenido sobre la foto */}
              <div className="relative flex h-full flex-col justify-between p-6 sm:p-10">
                <div className="space-y-1">
                  <p className="font-mono text-[10px] tracking-[0.3em] text-cream-50/90">
                    PARA ALEJANDRO
                  </p>
                  <p className="font-mono text-[10px] tracking-[0.3em] text-cream-50/70">
                    21 DE MAYO DE 2026
                  </p>
                </div>

                {/* "75" gigante centrado */}
                <div className="flex flex-1 items-center justify-center">
                  <span
                    aria-hidden
                    className="font-display text-[180px] font-extralight italic leading-none text-cream-50/95 drop-shadow-lg sm:text-[240px]"
                  >
                    75
                  </span>
                </div>

                <div className="space-y-3">
                  <div>
                    <p className="font-mono text-[10px] tracking-[0.3em] text-cream-50/80">DE</p>
                    <p className="mt-1 font-display text-3xl font-light italic text-cream-50 sm:text-4xl">
                      {from}
                    </p>
                    {t.fromRelation && (
                      <p className="font-serif text-sm italic text-cream-50/80">
                        {t.fromRelation}
                      </p>
                    )}
                  </div>
                  <p className="font-mono text-[11px] tracking-[0.25em] text-cream-50 animate-pulse">
                    TÓCAME PARA ABRIR →
                  </p>
                </div>
              </div>
            </div>
          ) : (
            // Fallback: carátula sin foto
            <div className="relative px-6 py-16 sm:px-10 sm:py-20">
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 flex items-center justify-center select-none"
              >
                <span className="font-display text-[260px] font-extralight italic leading-none text-clay-500/10 sm:text-[340px]">
                  75
                </span>
              </div>
              <div className="relative space-y-6">
                <p className="font-mono text-[10px] tracking-[0.3em] text-grafito">
                  PARA ALEJANDRO · 21 DE MAYO DE 2026
                </p>
                <div className="space-y-2">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-grafito">DE</p>
                  <p className="font-display text-4xl font-light italic text-tinta sm:text-5xl">
                    {from}
                  </p>
                  {t.fromRelation && (
                    <p className="font-serif text-sm italic text-grafito">{t.fromRelation}</p>
                  )}
                </div>
                <p className="font-mono text-[11px] tracking-[0.25em] text-tomate animate-pulse">
                  TÓCAME PARA ABRIR →
                </p>
              </div>
            </div>
          )}
        </button>
      )}

      {/* CARTA ABIERTA */}
      {open && (
        <div className="carta-enter relative px-6 py-10 sm:px-10 sm:py-14">
          {/* Watermark "75" */}
          <div
            aria-hidden
            className="pointer-events-none absolute -right-6 -top-4 select-none font-display text-[180px] font-extralight italic leading-none text-clay-500/10 sm:-right-2 sm:-top-2 sm:text-[220px]"
          >
            75
          </div>

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
            {t.song && (
              <p className="font-mono text-[10px] tracking-[0.2em] text-grafito">
                ♪ {t.song.title.toUpperCase()} — {t.song.artist.toUpperCase()}
              </p>
            )}
          </header>

          {/* Iframe de YouTube invisible — autoplay activado por el click humano de "abrir" */}
          {t.song && (
            <iframe
              aria-hidden
              tabIndex={-1}
              title="audio"
              src={`https://www.youtube.com/embed/${t.song.youtubeVideoId}?autoplay=1&playsinline=1&rel=0&modestbranding=1&controls=0`}
              width="1"
              height="1"
              frameBorder={0}
              allow="autoplay; encrypted-media"
              style={{
                position: 'absolute',
                left: '-9999px',
                top: 0,
                width: 1,
                height: 1,
                opacity: 0,
                pointerEvents: 'none',
                border: 0
              }}
            />
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

          <div className="relative mt-12 flex items-center gap-3" aria-hidden>
            <span className="h-px flex-1 bg-regla" />
            <span className="font-mono text-[9px] tracking-[0.3em] text-grafito">75</span>
            <span className="h-px flex-1 bg-regla" />
          </div>
        </div>
      )}
    </article>
  );
}
