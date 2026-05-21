'use client';

import Link from 'next/link';
import { useState } from 'react';

type Item = { n: string; href: string; label: string; tag: string };

export default function RecorridoIndex({ items }: { items: Item[] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section aria-label="Recorrido" className="space-y-1">
      <div className="mb-4 flex items-center gap-2 text-oro">
        <span className="h-px w-6 bg-oro" aria-hidden />
        <span className="font-mono text-[10px] tracking-[0.3em]">RECORRIDO</span>
      </div>

      <div className="relative">
        {/* Caballito que se mueve al establo que vas a tocar */}
        <CaballoMarker activeIdx={activeIdx} total={items.length} />

        <ul className="pl-12">
          {items.map((it, i) => (
            <li key={it.href}>
              <Link
                href={it.href}
                onMouseEnter={() => setActiveIdx(i)}
                onFocus={() => setActiveIdx(i)}
                onTouchStart={() => setActiveIdx(i)}
                className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-3 border-b border-hueso py-3.5 last:border-b-0 group transition-colors"
                aria-current={activeIdx === i ? 'true' : undefined}
              >
                <span
                  className={`font-mono text-[11px] tracking-widest transition-colors ${
                    activeIdx === i ? 'text-cuero' : 'text-oro'
                  }`}
                >
                  {it.n}
                </span>
                <span
                  className={`font-display text-xl font-light italic transition-colors ${
                    activeIdx === i ? 'text-cuero' : 'text-tinta2'
                  }`}
                >
                  {it.label}
                </span>
                <span className="font-serif text-xs italic text-grafito">{it.tag}</span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CaballoMarker({ activeIdx, total }: { activeIdx: number; total: number }) {
  // Cada fila mide ~57px (py-3.5 = 14px + text ~28px + border). Calculamos
  // posición central de la fila activa. Se usa transform en vez de top para
  // animación más fluida.
  const rowHeight = 57;
  const verticalCenter = activeIdx * rowHeight + rowHeight / 2 - 22;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-0 z-10 transition-transform duration-500 ease-out"
      style={{ transform: `translateY(${verticalCenter}px)` }}
    >
      <CaballoSVG />
    </div>
  );
}

// Silueta de caballo en perfil (mira a la derecha, hacia el label).
// Line-art estilo grabado/Hermès simplificado. Color: cuero.
function CaballoSVG() {
  return (
    <svg
      viewBox="0 0 64 48"
      width="44"
      height="33"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="text-cuero"
    >
      {/* Cuerpo */}
      <path d="M10 26 C 12 22, 18 20, 24 21 L 38 22 C 44 22, 48 25, 50 28 L 50 32 L 48 32" />
      {/* Cuello + cabeza */}
      <path d="M50 28 C 52 22, 54 18, 56 16 L 60 14 L 62 16 L 60 19 L 56 22 L 54 26" />
      {/* Crin (3 trazos) */}
      <path d="M52 19 L 49 15" />
      <path d="M55 18 L 54 13" />
      <path d="M58 17 L 60 11" />
      {/* Patas delanteras */}
      <path d="M44 31 L 44 42" />
      <path d="M47 31 L 47 42" />
      {/* Patas traseras */}
      <path d="M14 27 L 13 42" />
      <path d="M17 27 L 17 42" />
      {/* Cola */}
      <path d="M10 25 C 6 27, 4 32, 6 36" />
      {/* Ojo */}
      <circle cx="58" cy="17" r="0.6" fill="currentColor" />
    </svg>
  );
}
