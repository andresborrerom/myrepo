'use client';

import { useState } from 'react';

const SCHEMA_SQL = `create extension if not exists "pgcrypto";

create table if not exists aportes (
  id uuid primary key default gen_random_uuid(),
  from_id text not null,
  on_behalf_of_id text not null,
  kind text not null check (kind in ('texto', 'foto', 'audio', 'video', 'carta')),
  year int default null,
  title text default null,
  body text default null,
  media_url text default null,
  status text not null default 'pending'
    check (status in ('pending', 'published', 'flagged', 'rejected')),
  flag_reason text default null,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists aportes_status_idx on aportes(status);
create index if not exists aportes_created_at_idx on aportes(created_at desc);

alter table aportes enable row level security;

drop policy if exists "Anyone reads published" on aportes;
create policy "Anyone reads published" on aportes
  for select using (status = 'published');

drop policy if exists "Anyone inserts pending" on aportes;
create policy "Anyone inserts pending" on aportes
  for insert with check (status = 'pending');`;

export default function SetupClient() {
  const [running, setRunning] = useState(false);
  const [result, setResult] = useState<{ steps: Record<string, string> } | null>(null);
  const [copied, setCopied] = useState(false);

  async function runSetup() {
    setRunning(true);
    setResult(null);
    const res = await fetch('/api/setup', { method: 'POST' });
    const data = await res.json();
    setRunning(false);
    setResult(data);
  }

  async function copySchema() {
    await navigator.clipboard.writeText(SCHEMA_SQL);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="space-y-6 pb-10">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-ink-900">Setup de la casa</h1>
        <p className="text-base text-ink-800/80">
          Una sola vez: crear bucket de fotos/audios y verificar la tabla.
        </p>
      </header>

      <button
        onClick={runSetup}
        disabled={running}
        className="w-full rounded-2xl bg-clay-500 px-5 py-4 text-base font-bold text-cream-50 shadow-warm disabled:opacity-50"
      >
        {running ? 'Corriendo...' : 'Correr setup ahora'}
      </button>

      {result && (
        <section className="space-y-2 rounded-2xl bg-cream-100 p-4 shadow-warm">
          <p className="font-display text-lg text-ink-900">Resultado</p>
          <dl className="space-y-1 text-sm">
            {Object.entries(result.steps || {}).map(([k, v]) => (
              <div key={k} className="flex gap-2">
                <dt className="font-bold capitalize text-ink-900 min-w-[80px]">{k}:</dt>
                <dd className={String(v).startsWith('error') ? 'text-clay-700' : 'text-olive-700'}>
                  {String(v)}
                </dd>
              </div>
            ))}
          </dl>
        </section>
      )}

      <section className="space-y-3 rounded-2xl bg-cream-50 border border-cream-200 p-4">
        <h2 className="font-display text-lg text-ink-900">
          Si la tabla todavía no existe
        </h2>
        <p className="text-sm text-ink-800/80">
          Tienes que pegar este SQL en el editor SQL de Supabase y darle Run.
          Es una sola vez.
        </p>
        <button
          onClick={copySchema}
          className="rounded-full bg-ink-900 px-4 py-2 text-sm font-bold text-cream-50"
        >
          {copied ? '✓ Copiado' : 'Copiar SQL al portapapeles'}
        </button>
        <details className="text-xs">
          <summary className="cursor-pointer text-ink-800/70">Ver el SQL</summary>
          <pre className="mt-2 overflow-x-auto rounded-xl bg-ink-900 p-3 text-cream-50">
            {SCHEMA_SQL}
          </pre>
        </details>
      </section>

      <div className="rounded-2xl bg-cream-100 p-4 text-sm text-ink-800/80 shadow-warm">
        <p className="font-bold text-ink-900">Cómo usar</p>
        <ol className="mt-2 list-decimal space-y-1 pl-5">
          <li>Toca "Correr setup". Crea el bucket de Storage automáticamente.</li>
          <li>Si la tabla no existe, copia el SQL y pégalo en Supabase → SQL Editor → Run.</li>
          <li>Vuelve aquí y toca "Correr setup" otra vez para confirmar.</li>
          <li>Ya: /aporta abierto al mundo familiar.</li>
        </ol>
      </div>
    </div>
  );
}
