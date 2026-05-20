import type { TarjetaCumple } from '@/data/cumpleanos';

export default function TarjetaCover({
  t,
  showOpenCue = true
}: {
  t: TarjetaCumple;
  showOpenCue?: boolean;
}) {
  const from = t.fromShortName || t.fromName;
  const ribbon = t.branchColor || 'bg-clay-500';
  const layout = t.coverImage?.layout || 'overlay';

  // STACKED: foto a su aspect natural arriba, panel cream con texto + "75" abajo.
  // No hay riesgo de tapar caras porque el texto vive aparte del fondo.
  if (t.coverImage && layout === 'stacked') {
    return (
      <div className="relative overflow-hidden rounded-3xl bg-cream-50 shadow-warm">
        <div className={`absolute left-0 top-0 z-20 h-1.5 w-full ${ribbon}`} aria-hidden />

        {/* Encabezado mono arriba de la foto */}
        <div className="px-5 pb-3 pt-6 sm:px-8 sm:pb-4 sm:pt-7">
          <p className="font-mono text-[10px] tracking-[0.3em] text-grafito">
            PARA ALEJANDRO · 21 DE MAYO DE 2026
          </p>
        </div>

        {/* Foto al aspect natural */}
        <img
          src={t.coverImage.src}
          alt={t.coverImage.alt}
          className="block h-auto w-full"
        />

        {/* Panel inferior con "75" grande y firma */}
        <div className="relative px-5 pb-7 pt-5 sm:px-8 sm:pb-8 sm:pt-6">
          <div
            aria-hidden
            className="pointer-events-none absolute -bottom-6 -right-2 select-none font-display text-[180px] font-extralight italic leading-none text-clay-500/15 sm:text-[220px]"
          >
            75
          </div>
          <div className="relative space-y-3">
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] text-grafito">DE</p>
              <p className="mt-1 font-script text-5xl font-semibold leading-none text-tinta sm:text-6xl">
                {from}
              </p>
              {t.fromRelation && (
                <p className="mt-1 font-serif text-sm italic text-grafito">{t.fromRelation}</p>
              )}
            </div>
            {showOpenCue && (
              <p className="font-mono text-[11px] tracking-[0.25em] text-tomate animate-pulse">
                TÓCAME PARA ABRIR →
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // OVERLAY: foto fullbleed con texto encima. "75" en esquina sup-derecha
  // chico para no tapar a las personas.
  if (t.coverImage) {
    return (
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-warm sm:aspect-[4/5]">
        <div className={`absolute left-0 top-0 z-20 h-1.5 w-full ${ribbon}`} aria-hidden />

        <img
          src={t.coverImage.src}
          alt={t.coverImage.alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: t.coverImage.objectPosition || 'center' }}
        />
        {/* Gradiente más suave para no oscurecer las caras */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/65"
        />

        <div className="relative flex h-full flex-col justify-between p-6 sm:p-10">
          {/* Top: fecha izq + "75" esquina derecha */}
          <div className="flex items-start justify-between gap-4">
            <div className="space-y-1">
              <p className="font-mono text-[10px] tracking-[0.3em] text-cream-50/90">
                PARA ALEJANDRO
              </p>
              <p className="font-mono text-[10px] tracking-[0.3em] text-cream-50/70">
                21 DE MAYO DE 2026
              </p>
            </div>
            <span
              aria-hidden
              className="font-display text-5xl font-extralight italic leading-none text-cream-50/85 drop-shadow-md sm:text-6xl"
            >
              75
            </span>
          </div>

          {/* Bottom: firma */}
          <div className="space-y-3">
            <div>
              <p className="font-mono text-[10px] tracking-[0.3em] text-cream-50/80">DE</p>
              <p className="mt-1 font-script text-5xl font-semibold leading-none text-cream-50 sm:text-6xl">
                {from}
              </p>
              {t.fromRelation && (
                <p className="mt-1 font-serif text-sm italic text-cream-50/80">
                  {t.fromRelation}
                </p>
              )}
            </div>
            {showOpenCue && (
              <p className="font-mono text-[11px] tracking-[0.25em] text-cream-50 animate-pulse">
                TÓCAME PARA ABRIR →
              </p>
            )}
          </div>
        </div>
      </div>
    );
  }

  // Fallback sin foto: cream card con "75" como decoración detrás
  return (
    <div className="relative overflow-hidden rounded-3xl bg-cream-50 px-6 py-16 text-center shadow-warm sm:px-10 sm:py-20">
      <div className={`absolute left-0 top-0 h-1.5 w-full ${ribbon}`} aria-hidden />
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
          <p className="font-script text-5xl font-semibold leading-none text-tinta sm:text-6xl">
            {from}
          </p>
          {t.fromRelation && (
            <p className="font-serif text-sm italic text-grafito">{t.fromRelation}</p>
          )}
        </div>
        {showOpenCue && (
          <p className="font-mono text-[11px] tracking-[0.25em] text-tomate animate-pulse">
            TÓCAME PARA ABRIR →
          </p>
        )}
      </div>
    </div>
  );
}
