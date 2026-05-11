'use client';

import { useMemo, useState } from 'react';
import Avatar from '@/components/Avatar';
import HeartButton from '@/components/HeartButton';
import { HIJOS } from '@/data/family';
import {
  type Update,
  formatRelative,
  getAuthor
} from '@/data/updates';
import { getRama } from '@/data/family';

// Buzón con filtro por rama. Cliente para mantener el estado del filtro.
// Recibe el feed combinado (DB + seed) ya ordenado desde el server component.
export default function BuzonClient({ initialUpdates }: { initialUpdates: Update[] }) {
  const all = useMemo(() => initialUpdates, [initialUpdates]);
  const [filter, setFilter] = useState<string | null>(null);

  const updates = filter
    ? all.filter((u) => getRama(u.fromId)?.id === filter)
    : all;

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-ink-900">El Buzón</h1>
        <p className="text-base text-ink-800/80">
          Novedades que la familia te va dejando.
        </p>
      </header>

      <div className="-mx-5 overflow-x-auto px-5">
        <ul className="flex w-max gap-2 pb-1">
          <li>
            <Chip active={filter === null} onClick={() => setFilter(null)}>
              Todos
            </Chip>
          </li>
          {HIJOS.map((h) => (
            <li key={h.id}>
              <Chip
                active={filter === h.id}
                color={h.color}
                onClick={() => setFilter(h.id)}
              >
                {h.shortName}
              </Chip>
            </li>
          ))}
        </ul>
      </div>

      {updates.length === 0 ? (
        <div className="rounded-3xl border border-dashed border-cream-200 bg-cream-50 p-6 text-center text-ink-800/70">
          Sin novedades en esta rama.
        </div>
      ) : (
        <ul className="space-y-3">
          {updates.map((u) => (
            <UpdateCard key={u.id} update={u} />
          ))}
        </ul>
      )}
    </div>
  );
}

function Chip({
  children,
  active,
  color,
  onClick
}: {
  children: React.ReactNode;
  active: boolean;
  color?: string;
  onClick: () => void;
}) {
  const base = 'whitespace-nowrap rounded-full px-4 py-2 text-sm';
  if (active) {
    return (
      <button onClick={onClick} className={`${base} ${color || 'bg-clay-500'} text-cream-50`}>
        {children}
      </button>
    );
  }
  return (
    <button onClick={onClick} className={`${base} bg-cream-100 text-ink-900`}>
      {children}
    </button>
  );
}

function UpdateCard({ update: u }: { update: Update }) {
  const author = getAuthor(u);
  const rama = getRama(u.fromId);
  return (
    <li className="overflow-hidden rounded-2xl bg-cream-100 shadow-warm">
      <div
        aria-hidden
        className={`h-1.5 w-full ${rama?.color || 'bg-clay-500'}`}
      />
      <div className="p-4">
        <header className="flex items-center gap-3">
          {author && <Avatar person={author} size="sm" />}
          <div className="flex-1 min-w-0">
            <p className="font-display text-base font-bold text-ink-900">
              {author?.shortName || author?.name || 'Familia'}
            </p>
            <p className="text-xs text-ink-800/60">{formatRelative(u.createdAt)}</p>
          </div>
        </header>

        {u.title && (
          <h2 className="mt-3 font-display text-lg text-ink-900">{u.title}</h2>
        )}

        {u.kind === 'foto' && u.mediaUrl && (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={u.mediaUrl} alt={u.title || ''} className="mt-3 w-full rounded-xl" />
        )}
        {u.kind === 'audio' && u.mediaUrl && (
          <audio controls preload="none" className="mt-3 w-full">
            <source src={u.mediaUrl} />
          </audio>
        )}
        {u.kind === 'video' && u.mediaUrl && (
          <video controls preload="none" className="mt-3 w-full rounded-xl">
            <source src={u.mediaUrl} />
          </video>
        )}
        {u.text && (
          <p className="mt-3 text-base leading-relaxed text-ink-900">{u.text}</p>
        )}

        <div className="mt-4 flex">
          <HeartButton itemId={`update:${u.id}`} />
        </div>
      </div>
    </li>
  );
}
