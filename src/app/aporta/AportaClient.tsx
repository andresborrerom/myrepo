'use client';

import { useState, useMemo, useEffect, useCallback } from 'react';
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
const MINE_KEY = 'casa-aporta:mios';

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
  const [year, setYear] = useState<number | ''>('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState(initialTotal);
  const [ultimos] = useState(initialUltimos);

  // "Mis aportes" desde localStorage: lista de aportes que esta persona
  // subió desde este dispositivo. Se mantiene sincronizada con DB.
  const [mineList, setMineList] = useState<Aporte[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editTitle, setEditTitle] = useState('');
  const [editBody, setEditBody] = useState('');
  const [editYear, setEditYear] = useState<number | null>(null);
  const [editFile, setEditFile] = useState<File | null>(null);
  const [editSaving, setEditSaving] = useState(false);

  const needsFile = kind === 'foto' || kind === 'audio' || kind === 'video';
  const needsBody = kind === 'texto' || kind === 'carta';

  const todos = useMemo(
    () => FAMILY.filter((p) => p.role !== 'patriarca'),
    []
  );

  const mineIds = useMemo(() => new Set(mineList.map((m) => m.id)), [mineList]);

  function claimAporte(id: string) {
    pushToMine(id);
    refreshMine();
  }

  const refreshMine = useCallback(async () => {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem(MINE_KEY);
    if (!raw) {
      setMineList([]);
      return;
    }
    let ids: string[] = [];
    try { ids = JSON.parse(raw); } catch { ids = []; }
    if (!Array.isArray(ids) || ids.length === 0) {
      setMineList([]);
      return;
    }
    const res = await fetch('/api/aporta/mine', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ids })
    });
    if (!res.ok) return;
    const { aportes } = await res.json();
    setMineList(aportes as Aporte[]);
  }, []);

  useEffect(() => {
    refreshMine();
  }, [refreshMine]);

  function pushToMine(id: string) {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem(MINE_KEY);
    let ids: string[] = [];
    try { ids = raw ? JSON.parse(raw) : []; } catch { ids = []; }
    if (!Array.isArray(ids)) ids = [];
    if (!ids.includes(id)) ids.unshift(id);
    localStorage.setItem(MINE_KEY, JSON.stringify(ids.slice(0, 100)));
  }

  function removeFromMine(id: string) {
    if (typeof window === 'undefined') return;
    const raw = localStorage.getItem(MINE_KEY);
    let ids: string[] = [];
    try { ids = raw ? JSON.parse(raw) : []; } catch { ids = []; }
    ids = ids.filter((i) => i !== id);
    localStorage.setItem(MINE_KEY, JSON.stringify(ids));
  }

  async function uploadToStorage(f: File): Promise<string | null> {
    if (!f || !storage) return null;
    const ext = f.name.split('.').pop() || 'bin';
    const filename = `${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
    const { data, error } = await storage
      .from('aportes-media')
      .upload(filename, f, { contentType: f.type, upsert: false });
    if (error) throw new Error(`Subida fallida: ${error.message}`);
    const { data: pub } = storage.from('aportes-media').getPublicUrl(data.path);
    return pub.publicUrl;
  }

  async function uploadFile(): Promise<string | null> {
    return file ? uploadToStorage(file) : null;
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
          year: kind === 'carta' && year !== '' ? Number(year) : null,
          title: title || null,
          body: body || null,
          media_url: mediaUrl
        })
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        throw new Error(j.error || 'No se pudo guardar');
      }

      const { aporte } = await res.json();
      if (aporte?.id) pushToMine(aporte.id);

      setSubmitted(true);
      setTotal((t) => t + 1);
      setTitle('');
      setBody('');
      setFile(null);
      refreshMine();
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setUploading(false);
    }
  }

  function startEdit(a: Aporte) {
    setEditingId(a.id);
    setEditTitle(a.title || '');
    setEditBody(a.body || '');
    setEditYear(a.year);
    setEditFile(null);
  }

  function cancelEdit() {
    setEditingId(null);
    setEditTitle('');
    setEditBody('');
    setEditYear(null);
    setEditFile(null);
  }

  async function saveEdit(id: string) {
    setEditSaving(true);
    try {
      let newMediaUrl: string | undefined;
      if (editFile) {
        const url = await uploadToStorage(editFile);
        if (url) newMediaUrl = url;
      }
      const res = await fetch(`/api/aporta/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          title: editTitle,
          body: editBody,
          ...(editYear !== null ? { year: editYear } : {}),
          ...(newMediaUrl ? { media_url: newMediaUrl } : {})
        })
      });
      if (res.ok) {
        cancelEdit();
        refreshMine();
      }
    } finally {
      setEditSaving(false);
    }
  }

  async function deleteMine(id: string) {
    if (!confirm('¿Borrar este aporte? No se puede deshacer.')) return;
    const res = await fetch(`/api/aporta/${id}`, { method: 'DELETE' });
    if (res.ok) {
      removeFromMine(id);
      refreshMine();
      setTotal((t) => Math.max(0, t - 1));
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
          <Field label="¿Para qué año? (opcional)">
            <input
              type="number"
              min={1951}
              max={2026}
              value={year}
              onChange={(e) => setYear(e.target.value === '' ? '' : Number(e.target.value))}
              placeholder="Déjalo vacío si no es para un año específico"
              className="w-full rounded-2xl border border-cream-200 bg-cream-50 px-4 py-3 text-base"
            />
            <p className="mt-1 text-xs text-ink-800/60">
              <strong>Con año</strong> (1951-2026): atado a un año icónico de su vida (nacimiento, grado, viaje, casa, etc.). Va al calendario de las 75 cartas.
              <br />
              <strong>Sin año</strong>: mensaje libre, atemporal. Aparece en "Mensajes" — un feed de cariño sin agenda.
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

      {mineList.length > 0 && (
        <section aria-label="Mis aportes" className="space-y-3">
          <h2 className="font-display text-xl text-ink-900">Mis aportes</h2>
          <p className="text-sm text-ink-800/60">
            Los que subiste desde este celular. Puedes editarlos o borrarlos.
          </p>
          <ul className="space-y-2">
            {mineList.map((a) => (
              <li
                key={a.id}
                className="overflow-hidden rounded-2xl bg-cream-100 shadow-warm"
              >
                <header className="flex items-center justify-between px-3 pt-3">
                  <div className="text-sm">
                    <span aria-hidden>{APORTE_KIND_ICON[a.kind]}</span>{' '}
                    <strong>{getPerson(a.from_id)?.shortName || a.from_id}</strong>
                    <span className="ml-1 text-xs text-ink-800/60">
                      {APORTE_KIND_LABEL[a.kind]}
                      {a.year ? ` · año ${a.year}` : ''}
                    </span>
                  </div>
                  <span className={`rounded-full px-2 py-0.5 text-xs ${
                    a.status === 'published' ? 'bg-olive-700 text-cream-50'
                    : a.status === 'flagged' ? 'bg-clay-500 text-cream-50'
                    : 'bg-cream-200 text-ink-900'
                  }`}>
                    {a.status === 'published' ? 'Visible' :
                     a.status === 'flagged'   ? 'Oculto' :
                     a.status === 'pending'   ? 'Pendiente' : 'Rechazado'}
                  </span>
                </header>

                {editingId === a.id ? (
                  <div className="space-y-2 p-3">
                    {a.kind === 'carta' && (
                      <input
                        type="number"
                        min={1951}
                        max={2026}
                        value={editYear ?? ''}
                        onChange={(e) => setEditYear(Number(e.target.value))}
                        className="w-full rounded-xl border border-cream-200 bg-cream-50 px-3 py-2 text-sm"
                        placeholder="Año"
                      />
                    )}
                    <input
                      type="text"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                      placeholder="Título"
                      className="w-full rounded-xl border border-cream-200 bg-cream-50 px-3 py-2 text-sm"
                    />
                    <textarea
                      value={editBody}
                      onChange={(e) => setEditBody(e.target.value)}
                      rows={4}
                      placeholder="Cuerpo"
                      className="w-full rounded-xl border border-cream-200 bg-cream-50 px-3 py-2 text-sm"
                    />
                    {(a.kind === 'foto' || a.kind === 'audio' || a.kind === 'video') && (
                      <div className="rounded-xl border border-dashed border-cream-200 p-2">
                        <p className="text-xs text-ink-800/70">
                          Reemplazar {a.kind} (opcional — deja vacío para mantener el actual)
                        </p>
                        <input
                          type="file"
                          accept={
                            a.kind === 'foto' ? 'image/*'
                            : a.kind === 'audio' ? 'audio/*'
                            : 'video/*'
                          }
                          onChange={(e) => setEditFile(e.target.files?.[0] || null)}
                          className="mt-1 w-full text-sm"
                        />
                        {editFile && (
                          <p className="mt-1 text-xs text-clay-600">
                            Nuevo: {editFile.name} · {Math.round(editFile.size / 1024)} KB
                          </p>
                        )}
                      </div>
                    )}
                    <div className="flex gap-2">
                      <button
                        onClick={() => saveEdit(a.id)}
                        disabled={editSaving}
                        className="rounded-full bg-olive-700 px-3 py-1.5 text-xs font-bold text-cream-50 disabled:opacity-50"
                      >
                        {editSaving ? 'Guardando...' : 'Guardar'}
                      </button>
                      <button
                        onClick={cancelEdit}
                        disabled={editSaving}
                        className="rounded-full bg-cream-200 px-3 py-1.5 text-xs font-bold text-ink-900"
                      >
                        Cancelar
                      </button>
                    </div>
                  </div>
                ) : (
                  <>
                    <div className="space-y-1 px-3 pb-2">
                      {a.title && (
                        <p className="font-display text-base font-bold text-ink-900">{a.title}</p>
                      )}
                      {a.body && (
                        <p className="text-sm text-ink-800 whitespace-pre-wrap line-clamp-3">{a.body}</p>
                      )}
                      {a.media_url && (
                        <p className="text-xs text-ink-800/60">📎 archivo adjunto</p>
                      )}
                    </div>
                    <footer className="flex gap-2 border-t border-cream-200 bg-cream-50 px-3 py-2">
                      <button
                        onClick={() => startEdit(a)}
                        className="rounded-full bg-clay-500 px-3 py-1.5 text-xs font-bold text-cream-50"
                      >
                        Editar
                      </button>
                      <button
                        onClick={() => deleteMine(a.id)}
                        className="ml-auto rounded-full bg-clay-700 px-3 py-1.5 text-xs font-bold text-cream-50"
                      >
                        Borrar
                      </button>
                    </footer>
                  </>
                )}
              </li>
            ))}
          </ul>
        </section>
      )}

      {ultimos.length > 0 && (
        <section aria-label="Últimos aportes" className="space-y-3">
          <h2 className="font-display text-xl text-ink-900">Los últimos aportes de la familia</h2>
          <p className="text-sm text-ink-800/60">
            Si alguno es tuyo y quieres editarlo, tócalo "Es mío" — se mueve a tu lista de arriba.
          </p>
          <ul className="space-y-2">
            {ultimos.map((u) => {
              const author = getPerson(u.from_id);
              const yaEsMio = mineIds.has(u.id);
              return (
                <li key={u.id} className="rounded-2xl bg-cream-100 p-3 shadow-warm">
                  <p className="text-sm">
                    <span aria-hidden>{APORTE_KIND_ICON[u.kind]}</span>{' '}
                    <strong>{author?.shortName || author?.name || u.from_id}</strong>
                    {' · '}
                    <span className="text-ink-800/70">
                      {APORTE_KIND_LABEL[u.kind]}
                      {u.year ? ` · año ${u.year}` : ''}
                    </span>
                  </p>
                  {u.title && (
                    <p className="mt-1 truncate text-sm font-bold text-ink-900">{u.title}</p>
                  )}
                  {!yaEsMio && (
                    <button
                      type="button"
                      onClick={() => claimAporte(u.id)}
                      className="mt-2 rounded-full bg-clay-500/10 px-3 py-1 text-xs font-bold text-clay-700"
                    >
                      Es mío — déjame editarlo
                    </button>
                  )}
                  {yaEsMio && (
                    <p className="mt-2 text-xs text-olive-700">
                      ✓ Ya está en tu lista de arriba
                    </p>
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
