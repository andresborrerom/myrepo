'use client';

import { useEffect, useRef, useState } from 'react';
import type { TarjetaCumple } from '@/data/cumpleanos';
import TarjetaCover from '../TarjetaCover';

export default function TarjetaAbrible({ t }: { t: TarjetaCumple }) {
  const [open, setOpen] = useState(false);
  const [needsManualPlay, setNeedsManualPlay] = useState(false);
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const paragraphs = (t.body || '').split(/\n\s*\n/).filter(Boolean);
  const from = t.fromShortName || t.fromName;
  const ribbon = t.branchColor || 'bg-clay-500';

  // Manda playVideo vía postMessage al iframe pre-cargado.
  // El click viene del usuario → el browser permite el play.
  function startSong() {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    const msg = JSON.stringify({ event: 'command', func: 'playVideo', args: [] });
    // Mandamos varias veces porque el iframe puede no estar listo aún.
    win.postMessage(msg, '*');
    setTimeout(() => win.postMessage(msg, '*'), 200);
    setTimeout(() => win.postMessage(msg, '*'), 800);
    setTimeout(() => win.postMessage(msg, '*'), 1800);
  }

  // Cuando arranca el video del body, pausamos la canción de fondo
  // para evitar mezcla de audios.
  function pauseSong() {
    const win = iframeRef.current?.contentWindow;
    if (!win) return;
    win.postMessage(
      JSON.stringify({ event: 'command', func: 'pauseVideo', args: [] }),
      '*'
    );
  }

  function handleOpen() {
    setOpen(true);
    if (t.song) startSong();
    // Si después de 3s no escucha nada, ofrecemos play manual
    if (t.song) setTimeout(() => setNeedsManualPlay(true), 3000);
  }

  function handleManualPlay() {
    setNeedsManualPlay(false);
    startSong();
  }

  return (
    <>
      {/* IFRAME PRE-CARGADO desde el inicio. Hidden pero no offscreen
          (iOS Safari rechaza autoplay si está fuera del viewport con left:-9999). */}
      {t.song && (
        <iframe
          ref={iframeRef}
          src={`https://www.youtube.com/embed/${t.song.youtubeVideoId}?enablejsapi=1&playsinline=1&controls=0&rel=0&modestbranding=1&origin=${typeof window !== 'undefined' ? window.location.origin : ''}`}
          title="audio"
          aria-hidden
          tabIndex={-1}
          allow="autoplay; encrypted-media"
          style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            width: 1,
            height: 1,
            opacity: 0,
            pointerEvents: 'none',
            border: 0,
            zIndex: -1
          }}
        />
      )}

      {/* CARÁTULA (estado cerrado) */}
      {!open && (
        <div className="mt-6">
          <button
            type="button"
            onClick={handleOpen}
            className="block w-full transition active:scale-[0.99]"
            aria-label={`Abrir la tarjeta de ${from}`}
          >
            <TarjetaCover t={t} />
          </button>
        </div>
      )}

      {/* CARTA ABIERTA */}
      {open && (
        <article className="carta-enter relative mt-6 overflow-hidden rounded-3xl bg-cream-50 px-6 py-10 shadow-warm sm:px-10 sm:py-14">
          <div className={`absolute left-0 top-0 h-1.5 w-full ${ribbon}`} aria-hidden />

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

          {/* Fallback de play manual si autoplay falló */}
          {needsManualPlay && t.song && (
            <button
              type="button"
              onClick={handleManualPlay}
              className="relative mt-4 inline-flex items-center gap-2 rounded-full bg-tomate px-4 py-2 font-mono text-[11px] tracking-[0.2em] text-cream-50 shadow-warm hover:bg-clay-600"
            >
              ▶ TOCA PARA ESCUCHAR LA CANCIÓN
            </button>
          )}

          {/* Cuerpo: si hay alguna imagen (bodyImage / bodyImagesExtra) o
              texto post-imágenes, va modo "tarjeta-imagen". Si no, modo
              "carta" con greeting/body/signature. */}
          {(t.bodyImage || (t.bodyImagesExtra && t.bodyImagesExtra.length > 0) || t.bodyAfterImagesText) ? (
            <div className="relative mt-8 space-y-3">
              {t.bodyImage && (
                <div className="overflow-hidden rounded-2xl">
                  <img
                    src={t.bodyImage.src}
                    alt={t.bodyImage.alt}
                    className="block h-auto w-full"
                  />
                </div>
              )}
              {t.bodyImagesExtra && t.bodyImagesExtra.length > 0 && (
                <div className={
                  t.bodyImagesExtra.length === 2
                    ? 'grid grid-cols-2 gap-3'
                    : 'space-y-3'
                }>
                  {t.bodyImagesExtra.map((img) => (
                    <div key={img.src} className="overflow-hidden rounded-2xl">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.src}
                        alt={img.alt}
                        className="block h-auto w-full"
                      />
                    </div>
                  ))}
                </div>
              )}
              {t.bodyAfterImagesText && (
                <ul className="space-y-2 pt-2">
                  {t.bodyAfterImagesText.split('\n').filter(Boolean).map((line, i) => (
                    <li
                      key={i}
                      className="font-serif text-base leading-relaxed text-tinta/90 sm:text-[17px]"
                    >
                      {line}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ) : (
            <>
              {t.greeting && (
                <p className="relative mt-8 font-script text-5xl text-tinta leading-tight sm:text-6xl">
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
                <p className="relative mt-10 font-script text-3xl text-tinta/90 sm:text-4xl">
                  {t.signoff}
                </p>
              )}

              {t.signature && (
                <p className="relative mt-1 font-script text-6xl font-bold text-tomate leading-none sm:text-7xl">
                  {t.signature}
                </p>
              )}
            </>
          )}

          {/* Video al final, después del cierre. Al darle play se pausa
              automáticamente la canción de fondo. */}
          {t.bodyVideo && (
            <div className="relative mt-10">
              <p className="mb-3 font-mono text-[10px] tracking-[0.2em] text-grafito">
                {(t.bodyVideo.label || 'VIDEO').toUpperCase()}
              </p>
              <video
                src={t.bodyVideo.src}
                poster={t.bodyVideo.poster}
                controls
                playsInline
                preload="metadata"
                onPlay={pauseSong}
                className="block w-full rounded-2xl bg-black/5 shadow-warm"
              />
            </div>
          )}

          <div className="relative mt-12 flex items-center gap-3" aria-hidden>
            <span className="h-px flex-1 bg-regla" />
            <span className="font-mono text-[9px] tracking-[0.3em] text-grafito">75</span>
            <span className="h-px flex-1 bg-regla" />
          </div>
        </article>
      )}
    </>
  );
}
