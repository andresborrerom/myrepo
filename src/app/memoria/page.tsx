import Link from 'next/link';
import { getTimeline, type Hito } from '@/data/timeline';
import { CARTAS } from '@/data/cartas';

export const metadata = { title: 'Memoria' };

const SCOPE_STYLE: Record<Hito['scope'], { label: string; bg: string }> = {
  familia: { label: 'Familia', bg: 'bg-clay-500 text-cream-50' },
  obra:    { label: 'Obra',    bg: 'bg-olive-700 text-cream-50' },
  pais:    { label: 'Colombia', bg: 'bg-cream-200 text-ink-900' },
  mundo:   { label: 'Mundo',   bg: 'bg-cream-100 text-ink-800' }
};

export default function MemoriaPage() {
  const hitos = getTimeline();

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-ink-900">La Memoria</h1>
        <p className="text-base text-ink-800/80">
          Una línea de tiempo de tus 75 años. Hitos tuyos, nuestros y del mundo.
        </p>
      </header>

      <Link
        href="/cartas"
        className="block rounded-2xl bg-cream-100 p-4 shadow-warm"
      >
        <p className="font-display text-lg font-bold text-ink-900">✍️ Setenta y cinco cartas</p>
        <p className="mt-1 text-sm text-ink-800/70">
          {CARTAS.length} de 75 sembradas. Llegarán una al día después del cumpleaños.
        </p>
      </Link>

      <Link
        href="/calendario"
        className="block rounded-2xl bg-cream-100 p-4 shadow-warm"
      >
        <p className="font-display text-lg font-bold text-ink-900">📅 Calendario familiar</p>
        <p className="mt-1 text-sm text-ink-800/70">
          Los cumpleaños de toda la familia, ordenados por proximidad.
        </p>
      </Link>

      <ol className="relative space-y-3 border-l-2 border-cream-200 pl-4">
        {hitos.map((h, i) => {
          const style = SCOPE_STYLE[h.scope];
          return (
            <li key={`${h.year}-${i}`} className="relative">
              <span
                aria-hidden
                className="absolute -left-[1.4rem] top-2 h-3 w-3 rounded-full bg-clay-500"
              />
              <div className="rounded-2xl bg-cream-100 p-3 shadow-warm">
                <div className="flex items-baseline justify-between gap-2">
                  <p className="font-display text-lg font-bold text-clay-600">
                    {h.year}
                  </p>
                  <span className={`rounded-full px-2 py-0.5 text-xs ${style.bg}`}>
                    {style.label}
                  </span>
                </div>
                <p className="mt-1 text-base text-ink-900">{h.title}</p>
                {h.description && (
                  <p className="mt-1 text-sm text-ink-800/70">{h.description}</p>
                )}
              </div>
            </li>
          );
        })}
      </ol>

      <p className="pt-2 text-center text-sm text-ink-800/60">
        Editar hitos en <code className="rounded bg-cream-100 px-1">src/data/timeline.ts</code>.
      </p>
    </div>
  );
}
