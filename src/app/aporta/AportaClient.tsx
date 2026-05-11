'use client';

import { useState, useMemo } from 'react';
import { createClient } from '@supabase/supabase-js';
import { FAMILY, HIJOS, NIETOS, getPerson } from '@/data/family';
import {
  type AporteKind,
  type Aporte,
  APORTE_KIND_LABEL,
  APORTE_KIND_ICON
} from '@/data/aportes-types';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const SUPABASE_ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

// Cliente de Storage anónimo. Sube archivos directo al bucket público.
const storage = SUPABASE_URL && SUPABASE_ANON
  ? createClient(SUPABASE_URL, SUPABASE_ANON, { auth: { persistSession: false } }).storage
  : null;

export default function AportaClient({
  initialTotal,
  initialUltimos
}: {
  initialTotal: number;
  initialUltimos: Aporte[];
}) {
  const [fromId, setFromId] = useState('andres');
  const [onBehalfOf, setOnBehalfOf] = useState('andres');
  const [kind, setKind] = useState<AporteKind>('texto');
  const [year, setYear] = useState<number>(2026);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(initialTotal);
  const [ultimos] = useState(initialUltimos);

  const needsFile = kind === 'foto' || kind === 'audio' || kind === 'video';
  const needsBody = kind === 'texto' || kind === 'carta';

  const todos = useMemo(
    () => FAMILY.filter((p) => p.role !== 'patriarca'),
    []
  );

  async function uploadFile(): Promise<string | null> {
    if (!file || !storage) return null;
    const ext = file.name.split('.').pop() || 'bin';
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { data, error } = await storage
      .from('aportes-media')
      .upload(filename, file, { contentType: file.type, upsert: false });
    if (error) throw new Error(`Subida fallida: ${error.message}`);
    const { data: pub } = storage.from('aportes-media').getPublicUrl(data.path);
    return pub.publicUrl;
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setUploading(true);

    try {
      let mediaUrl: string | null = null;
      if (file) {
        mediaUrl = await uploadFile();
      }

      const res = await fetch('/api/aporta', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          from_id: onBehalfOf,
          on_behalf_of_id: fromId,
          kind,
          year: kind === 'carta' ? year : null,
          title: title || null,
          body: body || null,
          media_url: mediaUrl
        })
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || 'No se pudo guardar');
      }

      setSubmitted(true);
      setTotal((t) => t + 1);
      // limpiar formulario para próximo aporte
      setTitle('');
      setBody('');
      setFile(null);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setUploading(false);
    }
  }

  if (submitted) {
    const persona = getPerson(onBehalfOf);
    return (
      <div className="space-y-6">
        <div className="rounded-3xl bg-clay-500 p-8 text-center text-cream-50 shadow-warm">
          <p className="text-5xl">💛</p>
          <h1 className="mt-4 font-display text-2xl font-bold">Te llegó al corazón</h1>
          <p className="mt-3 text-base/relaxed">
            Gracias, {persona?.shortName || persona?.name}. Tu aporte ya está
            en la casa de papá. Va número <strong>{total}</strong> de toda la
            familia.
          </p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setSubmitted(false)}
            className="flex-1 rounded-2xl bg-cream-100 px-5 py-4 text-base font-bold text-ink-900 shadow-warm"
          >
            Aportar otro
          </button>
          <a
            href="/"
            className="flex-1 rounded-2xl bg-olive-700 px-5 py-4 text-center text-base font-bold text-cream-50 shadow-warm"
          >
            Ver la casa
          </a>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-10">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-ink-900">Aporta algo a la casa</h1>
        <p className="text-base text-ink-800/80">
          Foto, audio, video, texto o una carta para un año específico. Sale en vivo.
        </p>
      </header>

      <div className="rounded-2xl bg-cream-100 p-4 shadow-warm">
        <p className="text-xs uppercase tracking-wide text-ink-800/60">Hasta ahora</p>
        <p className="font-display text-3xl font-bold text-clay-600">
          {total} <span className="text-base font-normal text-ink-800/70">aportes de la familia</span>
        </p>
      </div>

      <form onSubmit={submit} className="space-y-4">
        <Field label="Soy">
          <PersonSelect value={fromId} onChange={setFromId} options={todos} />
        </Field>

        <Field label="Lo subo en nombre de">
          <PersonSelect value={onBehalfOf} onChange={setOnBehalfOf} options={todos} />
          <p className="mt-1 text-xs text-ink-800/60">
            Si subes algo tuyo, déjalo igual a "Soy". Si subes en nombre de un nieto chiquito, cámbialo.
          </p>
        </Field>

        <Field label="¿Qué tipo?">
          <select
            value={kind}
            onChange={(e) => setKind(e.target.value as AporteKind)}
            className="w-full rounded-2xl border border-cream-200 bg-cream-50 px-4 py-3 text-base"
          >
            {(Object.keys(APORTE_KIND_LABEL) as AporteKind[]).map((k) => (
              <option key={k} value={k}>
                {APORTE_KIND_ICON[k]} {APORTE_KIND_LABEL[k]}
              </option>
            ))}
          </select>
          <p className="mt-1 text-xs text-ink-800/60">
            <strong>Carta</strong>: atada a un año específico de su vida (1951-2026). Se le revela día por día después del cumpleaños.
            <br />
            <strong>Texto / Foto / Audio / Video</strong>: mensaje libre, sin año. Va al Buzón.
          </p>
        </Field>

        {kind === 'carta' && (
          <Field label="¿Para qué año?">
            <input
              type="number"
              min={1951}
              max={2026}
              value={year}
              onChange={(e) => setYear(Number(e.target.value))}
              className="w-full rounded-2xl border border-cream-200 bg-cream-50 px-4 py-3 text-base"
            />
            <p className="mt-1 text-xs text-ink-800/60">
              Entre 1951 (su nacimiento) y 2026 (hoy).
            </p>
          </Field>
        )}

        <Field label="Título (opcional)">
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Algo corto, una frase"
            className="w-full rounded-2xl border border-cream-200 bg-cream-50 px-4 py-3 text-base"
          />
        </Field>

        {needsFile && (
          <Field label={`Archivo (${kind})`}>
            <input
              type="file"
              accept={
                kind === 'foto' ? 'image/*'
                : kind === 'audio' ? 'audio/*'
                : 'video/*'
              }
              onChange={(e) => setFile(e.target.files?.[0] || null)}
              className="w-full text-base"
            />
            {file && (
              <p className="mt-1 text-xs text-ink-800/60">
                Archivo listo: {file.name} · {Math.round(file.size / 1024)} KB
              </p>
            )}
          </Field>
        )}

        <Field label={needsBody ? 'Texto' : 'Mensaje o caption (opcional)'}>
          <textarea
            value={body}
            onChange={(e) => setBody(e.target.value)}
            rows={6}
            placeholder={
              needsBody
                ? 'Escribe lo que quieras decirle...'
                : 'Acompaña tu archivo con unas palabras (opcional)...'
            }
            className="w-full rounded-2xl border border-cream-200 bg-cream-50 px-4 py-3 text-base"
          />
        </Field>

        {error && (
          <p className="rounded-xl bg-clay-500/10 px-4 py-3 text-sm text-clay-700">
            {error}
          </p>
        )}

        <button
          type="submit"
          disabled={uploading || (needsFile && !file) || (needsBody && !body)}
          className="w-full rounded-2xl bg-clay-500 px-5 py-4 text-base font-bold text-cream-50 shadow-warm disabled:opacity-50"
        >
          {uploading ? 'Enviando...' : 'Mandar a la casa'}
        </button>
      </form>

      {ultimos.length > 0 && (
        <section aria-label="Últimos aportes" className="space-y-3">
          <h2 className="font-display text-xl text-ink-900">Los últimos aportes</h2>
          <ul className="space-y-2">
            {ultimos.map((u) => {
              const author = getPerson(u.from_id);
              return (
                <li key={u.id} className="rounded-2xl bg-cream-100 p-3 shadow-warm">
                  <p className="text-sm">
                    <span aria-hidden>{APORTE_KIND_ICON[u.kind]}</span>{' '}
                    <strong>{author?.shortName || u.from_id}</strong>
                    {' · '}
                    <span className="text-ink-800/70">
                      {APORTE_KIND_LABEL[u.kind]}
                      {u.year ? ` · año ${u.year}` : ''}
                    </span>
                  </p>
                  {u.title && (
                    <p className="mt-1 truncate text-sm font-bold text-ink-900">{u.title}</p>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block space-y-1">
      <span className="text-sm font-bold text-ink-800">{label}</span>
      {children}
    </label>
  );
}

function PersonSelect({
  value, onChange, options
}: {
  value: string;
  onChange: (v: string) => void;
  options: typeof HIJOS | typeof NIETOS;
}) {
  return (
    <select
      value={value}
      onChange={(e) => onChange(e.target.value)}
      className="w-full rounded-2xl border border-cream-200 bg-cream-50 px-4 py-3 text-base"
    >
      <optgroup label="Hijos">
        {options.filter((p) => p.role === 'hijo').map((p) => (
          <option key={p.id} value={p.id}>{p.shortName || p.name}</option>
        ))}
      </optgroup>
      <optgroup label="Nietos">
        {options.filter((p) => p.role === 'nieto').map((p) => (
          <option key={p.id} value={p.id}>{p.shortName || p.name}</option>
        ))}
      </optgroup>
    </select>
  );
}
