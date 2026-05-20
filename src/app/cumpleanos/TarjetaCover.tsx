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

  if (t.coverImage) {
    return (
      <div className="relative aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-warm sm:aspect-[4/5]">
        {/* Cinta superior */}
        <div className={`absolute left-0 top-0 z-20 h-1.5 w-full ${ribbon}`} aria-hidden />

        {/* Foto */}
        <img
          src={t.coverImage.src}
          alt={t.coverImage.alt}
          className="absolute inset-0 h-full w-full object-cover"
          style={{ objectPosition: t.coverImage.objectPosition || 'center' }}
        />
        {/* Gradiente */}
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30"
        />

        {/* Contenido */}
        <div className="relative flex h-full flex-col justify-between p-6 sm:p-10">
          <div className="space-y-1">
            <p className="font-mono text-[10px] tracking-[0.3em] text-cream-50/90">
              PARA ALEJANDRO
            </p>
            <p className="font-mono text-[10px] tracking-[0.3em] text-cream-50/70">
              21 DE MAYO DE 2026
            </p>
          </div>

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
              <p className="mt-1 font-script text-5xl font-semibold text-cream-50 leading-none sm:text-6xl">
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

  // Fallback: portada sin foto
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
          <p className="font-script text-5xl font-semibold text-tinta leading-none sm:text-6xl">
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
