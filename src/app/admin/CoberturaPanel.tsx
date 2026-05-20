import Link from 'next/link';
import { getPerson } from '@/data/family';
import type { CoberturaYear } from '@/lib/cartas-fetch';

function authorLabel(authorId: string): string {
  const p = getPerson(authorId);
  return p?.shortName || p?.name || authorId;
}

export default function CoberturaPanel({ data }: { data: CoberturaYear[] }) {
  const multiples = data.filter((y) => y.items.length >= 2);
  const placeholders = data.filter(
    (y) => y.items.length >= 1 && y.items.every((it) => it.isPlaceholder)
  );
  const vacios = data.filter((y) => y.items.length === 0);
  const conContenido = data.filter(
    (y) => y.items.length >= 1 && y.items.some((it) => !it.isPlaceholder)
  );

  return (
    <section className="space-y-4 rounded-2xl bg-cream-100 p-4 shadow-warm">
      <header className="space-y-1">
        <h2 className="font-display text-xl text-ink-900">Cobertura de cartas</h2>
        <p className="text-xs text-ink-800/70">
          {conContenido.length} con contenido · {placeholders.length} solo placeholder · {vacios.length} sin carta · {multiples.length} con 2+
        </p>
      </header>

      {multiples.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-mono text-[10px] tracking-widest text-ink-800/60">AÑOS CON 2+ CARTAS</h3>
          <ul className="space-y-2">
            {multiples.map((y) => (
              <li key={y.year} className="rounded-xl bg-cream-50 p-3">
                <Link
                  href={`/cartas/${y.year}`}
                  className="block font-display text-sm font-bold text-ink-900 hover:text-clay-600"
                >
                  {y.year} →
                </Link>
                <ul className="mt-1 space-y-0.5">
                  {y.items.map((it, i) => (
                    <li key={i} className="text-xs text-ink-800/80">
                      <span className="font-bold">{authorLabel(it.authorId)}</span>
                      {it.title && <span className="italic"> · {it.title}</span>}
                      <span className="ml-2 font-mono text-[10px] text-ink-800/50">
                        {it.source === 'db' ? '[DB]' : '[seed]'}
                        {it.isPlaceholder && ' · placeholder'}
                      </span>
                    </li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="space-y-2">
        <h3 className="font-mono text-[10px] tracking-widest text-ink-800/60">
          AÑOS CON CARTA ({conContenido.length + placeholders.length})
        </h3>
        <ul className="grid grid-cols-2 gap-x-3 gap-y-1 sm:grid-cols-3">
          {data
            .filter((y) => y.items.length >= 1)
            .map((y) => {
              const allPlaceholder = y.items.every((it) => it.isPlaceholder);
              const names = y.items.map((it) => authorLabel(it.authorId)).join(', ');
              return (
                <li key={y.year} className="text-xs">
                  <Link
                    href={`/cartas/${y.year}`}
                    className="hover:underline"
                  >
                    <span className={`font-mono ${allPlaceholder ? 'text-clay-700' : 'text-ink-900'}`}>
                      {y.year}
                    </span>
                    <span className="text-ink-800/70"> · {names}</span>
                    {allPlaceholder && <span className="text-clay-700"> ⚠</span>}
                  </Link>
                </li>
              );
            })}
        </ul>
      </div>

      {vacios.length > 0 && (
        <div className="space-y-2">
          <h3 className="font-mono text-[10px] tracking-widest text-ink-800/60">
            AÑOS SIN CARTA ({vacios.length})
          </h3>
          <p className="font-mono text-xs leading-relaxed text-ink-800/70">
            {vacios.map((y) => y.year).join(', ')}
          </p>
        </div>
      )}
    </section>
  );
}
