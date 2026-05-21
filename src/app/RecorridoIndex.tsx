'use client';

import Link from 'next/link';
import { useState } from 'react';

type Item = { n: string; href: string; label: string; tag: string };

// Altura aprox de cada establo en px (incluye gap). Sirve para posicionar
// el caballo de papa al centro vertical del establo activo.
const ROW_HEIGHT = 116;

export default function RecorridoIndex({ items }: { items: Item[] }) {
  const [activeIdx, setActiveIdx] = useState(0);

  return (
    <section aria-label="Recorrido" className="space-y-1">
      <div className="mb-4 flex items-center gap-2 text-oro">
        <span className="h-px w-6 bg-oro" aria-hidden />
        <span className="font-mono text-[10px] tracking-[0.3em]">RECORRIDO · ESTABLO</span>
      </div>

      <div className="relative">
        {/* Caballo de papa galopa por el pasillo del establo */}
        <CaballoPapaMarker activeIdx={activeIdx} />

        {/* Fila de establos */}
        <ul className="space-y-3 pl-[88px] sm:pl-[100px]">
          {items.map((it, i) => (
            <li key={it.href}>
              <Establo
                item={it}
                isActive={activeIdx === i}
                onActivate={() => setActiveIdx(i)}
              />
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function CaballoPapaMarker({ activeIdx }: { activeIdx: number }) {
  // Centro vertical del establo activo (medio de la fila menos la mitad del caballo)
  const HORSE_H = 70;
  const top = activeIdx * ROW_HEIGHT + (ROW_HEIGHT - HORSE_H) / 2;

  return (
    <div
      aria-hidden
      className="pointer-events-none absolute left-0 top-0 z-20 transition-all duration-700 ease-out"
      style={{ transform: `translateY(${top}px)` }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/images/papa-caballo.png"
        alt=""
        width={80}
        height={70}
        className="block drop-shadow-[0_4px_8px_rgba(43,32,24,0.35)]"
      />
      {/* Pasto bajo el caballo */}
      <div className="mt-1 ml-2 h-0.5 w-16 rounded-full bg-musgo/40" aria-hidden />
    </div>
  );
}

function Establo({
  item,
  isActive,
  onActivate
}: {
  item: Item;
  isActive: boolean;
  onActivate: () => void;
}) {
  return (
    <Link
      href={item.href}
      onMouseEnter={onActivate}
      onFocus={onActivate}
      onTouchStart={onActivate}
      aria-current={isActive ? 'true' : undefined}
      className={`group relative block overflow-hidden rounded-md transition-all duration-300 ${
        isActive ? 'scale-[1.015] shadow-[0_8px_24px_-8px_rgba(43,32,24,0.4)]' : 'shadow-[0_2px_8px_-2px_rgba(43,32,24,0.2)]'
      }`}
      style={{ minHeight: ROW_HEIGHT - 12 }}
    >
      {/* Fondo: madera de roble suave (gradiente vertical + grano sutil) */}
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          background: 'linear-gradient(180deg, #D4B896 0%, #C4A57F 50%, #B89669 100%)',
          backgroundImage:
            'repeating-linear-gradient(90deg, rgba(58,40,24,0.06) 0px, rgba(58,40,24,0.06) 1px, transparent 1px, transparent 24px), linear-gradient(180deg, #D4B896 0%, #C4A57F 50%, #B89669 100%)'
        }}
      />

      {/* Bordes superior e inferior tipo barandilla del stall */}
      <div
        aria-hidden
        className="absolute left-0 right-0 top-0 h-1"
        style={{ background: 'linear-gradient(180deg, #5C3A1F 0%, #8B5E34 100%)' }}
      />
      <div
        aria-hidden
        className="absolute left-0 right-0 bottom-0 h-1"
        style={{ background: 'linear-gradient(0deg, #5C3A1F 0%, #8B5E34 100%)' }}
      />

      {/* Bisagras a la izquierda (dos puntos pequeños) */}
      <div aria-hidden className="absolute left-2 top-3 h-1.5 w-1.5 rounded-full bg-tinta2/40" />
      <div aria-hidden className="absolute left-2 bottom-3 h-1.5 w-1.5 rounded-full bg-tinta2/40" />

      {/* Contenido — placa de bronce + tag */}
      <div className="relative flex h-full flex-col justify-center gap-2 px-5 py-5 sm:px-7">
        {/* Placa de bronce */}
        <div
          className="relative inline-flex w-fit items-baseline gap-3 rounded-sm border border-amber-900/40 px-3 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.4),inset_0_-1px_0_rgba(0,0,0,0.15)]"
          style={{
            background:
              'linear-gradient(135deg, #D6B66E 0%, #E8D08A 35%, #C9A14A 70%, #B8924A 100%)'
          }}
        >
          <span className="font-mono text-[10px] font-bold tracking-widest text-amber-950">
            {item.n}
          </span>
          <span className="font-display text-lg font-light italic leading-none text-amber-950 sm:text-xl">
            {item.label}
          </span>
        </div>

        {/* Tag — escrito con tiza/marcador sobre la madera */}
        <p className="font-serif text-[12px] italic text-tinta2/70 sm:text-sm">
          {item.tag}
        </p>
      </div>

      {/* Brillo sutil cuando está activo (puerta entreabierta) */}
      {isActive && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse at center, rgba(255,255,255,0.18) 0%, transparent 70%)'
          }}
        />
      )}
    </Link>
  );
}
