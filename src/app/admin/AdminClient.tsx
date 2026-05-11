'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { getPerson } from '@/data/family';
import {
  type Aporte,
  type AporteStatus,
  APORTE_KIND_LABEL,
  APORTE_KIND_ICON
} from '@/data/aportes-types';

const STATUS_COLOR: Record<AporteStatus, string> = {
  published: 'bg-olive-700 text-cream-50',
  flagged:   'bg-clay-500 text-cream-50',
  pending:   'bg-cream-200 text-ink-900',
  rejected:  'bg-ink-800 text-cream-50'
};

const STATUS_LABEL: Record<AporteStatus, string> = {
  published: 'Visible',
  flagged:   'Marcado',
  pending:   'Pendiente',
  rejected:  'Rechazado'
};

export default function AdminClient({ initialAportes }: { initialAportes: Aporte[] }) {
  const [aportes, setAportes] = useState(initialAportes);
  const [filter, setFilter] = useState<AporteStatus | 'all'>('all');
  const router = useRouter();

  const visibles = filter === 'all' ? aportes : aportes.filter((a) => a.status === filter);

  async function changeStatus(id: string, status: AporteStatus) {
    const res = await fetch(`/api/admin/aporte/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status })
    });
    if (res.ok) {
      setAportes((all) => all.map((a) => (a.id === id ? { ...a, status } : a)));
    }
  }

  async function remove(id: string) {
    if (!confirm('¿Borrar este aporte definitivamente?')) return;
    const res = await fetch(`/api/admin/aporte/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setAportes((all) => all.filter((a) => a.id !== id));
    }
  }

  return (
    <div className="space-y-6 pb-10">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-ink-900">Admin</h1>
        <p className="text-base text-ink-800/80">
          {aportes.length} aportes en la casa. Total visibles: {aportes.filter((a) => a.status === 'published').length}.
        </p>
      </header>

      <div className="flex gap-2 overflow-x-auto pb-1">
        {(['all', 'published', 'flagged', 'pending', 'rejected'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`whitespace-nowrap rounded-full px-4 py-2 text-sm ${
              filter === s
                ? 'bg-clay-500 text-cream-50'
                : 'bg-cream-100 text-ink-900'
            }`}
          >
            {s === 'all' ? 'Todos' : STATUS_LABEL[s]}
          </button>
        ))}
      </div>

      {visibles.length === 0 && (
        <div className="rounded-2xl border border-dashed border-cream-200 p-6 text-center text-ink-800/70">
          Nada por acá.
        </div>
      )}

      <ul className="space-y-3">
        {visibles.map((a) => {
          const author = getPerson(a.from_id);
          const onBehalf = a.on_behalf_of_id !== a.from_id ? getPerson(a.on_behalf_of_id) : null;
          return (
            <li key={a.id} className="overflow-hidden rounded-2xl bg-cream-100 shadow-warm">
              <header className="flex items-center justify-between p-3">
                <div className="flex items-center gap-2">
                  <span aria-hidden className="text-xl">{APORTE_KIND_ICON[a.kind]}</span>
                  <div>
                    <p className="font-display text-sm font-bold text-ink-900">
                      {author?.shortName || author?.name || a.from_id}
                    </p>
                    <p className="text-xs text-ink-800/60">
                      {APORTE_KIND_LABEL[a.kind]}
                      {a.year ? ` · año ${a.year}` : ''}
                      {onBehalf && ` · subido por ${onBehalf.shortName || onBehalf.name}`}
                    </p>
                  </div>
                </div>
                <span className={`rounded-full px-2 py-1 text-xs font-bold ${STATUS_COLOR[a.status]}`}>
                  {STATUS_LABEL[a.status]}
                </span>
              </header>

              <div className="space-y-2 px-3 pb-3">
                {a.title && (
                  <p className="font-display text-base font-bold text-ink-900">{a.title}</p>
                )}
                {a.body && (
                  <p className="text-sm text-ink-800 whitespace-pre-wrap">{a.body}</p>
                )}
                {a.media_url && (
                  <a href={a.media_url} target="_blank" rel="noreferrer" className="block">
                    {a.kind === 'foto' ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={a.media_url} alt="" className="w-full rounded-xl" />
                    ) : (
                      <p className="text-sm text-clay-600 underline">Ver archivo</p>
                    )}
                  </a>
                )}
                {a.flag_reason && (
                  <p className="rounded-lg bg-clay-500/10 px-3 py-2 text-xs italic text-clay-700">
                    Marcado: {a.flag_reason}
                  </p>
                )}
              </div>

              <footer className="flex gap-2 border-t border-cream-200 bg-cream-50 p-3">
                {a.status !== 'published' && (
                  <button
                    onClick={() => changeStatus(a.id, 'published')}
                    className="rounded-full bg-olive-700 px-3 py-1.5 text-xs font-bold text-cream-50"
                  >
                    Publicar
                  </button>
                )}
                {a.status === 'published' && (
                  <button
                    onClick={() => changeStatus(a.id, 'flagged')}
                    className="rounded-full bg-cream-200 px-3 py-1.5 text-xs font-bold text-ink-900"
                  >
                    Ocultar
                  </button>
                )}
                <button
                  onClick={() => remove(a.id)}
                  className="ml-auto rounded-full bg-clay-700 px-3 py-1.5 text-xs font-bold text-cream-50"
                >
                  Borrar
                </button>
              </footer>
            </li>
          );
        })}
      </ul>

      <div className="pt-4">
        <a href="/setup" className="text-sm text-clay-600 underline">
          → Ir a /setup (crear bucket si falta)
        </a>
      </div>
    </div>
  );
}
