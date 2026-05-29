// Diagnóstico read-only: ¿hay textos que la familia subió como 'texto' o
// como mensajes libres (carta sin año) que en realidad estaban pensados
// para ser cartas ancladas a un año? No escribe nada — solo SELECT.

import PasswordGate from '@/components/PasswordGate';
import { isAdminAuth } from '@/lib/auth';
import { fetchAllAportesAdmin } from '@/lib/aportes-fetch';
import { fetchAlejandroStateServer, isPlaceholderBody, getCobertura } from '@/lib/cartas-fetch';
import { BIRTH_YEAR, TURNS_75_YEAR } from '@/data/cartas';
import { getPerson } from '@/data/family';
import type { Aporte } from '@/data/aportes-types';

export const metadata = { title: 'Diagnóstico cartas vs textos' };
export const dynamic = 'force-dynamic';

const SOSPECHOSO_MIN_CHARS = 400;

function authorLabel(id: string): string {
  const p = getPerson(id);
  return p?.shortName || p?.name || id;
}

function preview(body: string | null, max = 220): string {
  if (!body) return '';
  const trimmed = body.trim().replace(/\s+/g, ' ');
  return trimmed.length <= max ? trimmed : trimmed.slice(0, max) + '…';
}

export default async function CartasVsTextosPage() {
  if (!isAdminAuth()) {
    return (
      <PasswordGate
        title="Diagnóstico cartas vs textos"
        subtitle="Solo Andrés. Solo lectura — no toca nada."
        endpoint="/api/admin/auth"
      />
    );
  }

  const [aportes, state, cobertura] = await Promise.all([
    fetchAllAportesAdmin(),
    fetchAlejandroStateServer(),
    getCobertura()
  ]);

  const revealed = new Set(state.revealedYears);
  const published = aportes.filter((a) => a.status === 'published');

  // ── Bucket A — Años con carta seed placeholder (sin DB override real)
  const yearsConSoloPlaceholder = cobertura.filter(
    (y) => y.items.length >= 1 && y.items.every((it) => it.isPlaceholder)
  );
  const yearsVacios = cobertura.filter((y) => y.items.length === 0);

  // ── Bucket B — Aportes kind='texto' ordenados por longitud
  const textos = published
    .filter((a) => a.kind === 'texto')
    .map((a) => ({ a, len: (a.body || '').trim().length }))
    .sort((x, y) => y.len - x.len);

  // ── Bucket C — Cartas DB sin año (mensajes libres) — info, no bug
  const cartasSinYear = published.filter(
    (a) => a.kind === 'carta' && a.year === null
  );

  // ── Bucket D — Cartas DB con año fuera de rango (1951-2026)
  const cartasYearRaro = published.filter(
    (a) =>
      a.kind === 'carta' &&
      a.year !== null &&
      (a.year < BIRTH_YEAR || a.year > TURNS_75_YEAR)
  );

  // ── Bucket E — Cartas DB con body placeholder (raro pero posible)
  const cartasBodyPlaceholder = published.filter(
    (a) => a.kind === 'carta' && isPlaceholderBody(a.body)
  );

  return (
    <div className="space-y-6 px-4 pb-10 pt-4">
      <header className="space-y-1">
        <h1 className="font-display text-2xl text-ink-900">
          Diagnóstico: cartas vs textos
        </h1>
        <p className="text-sm text-ink-800/70">
          Solo lectura. Nada se escribe. Total publicados: {published.length} ·
          revelados a papá: {revealed.size}.
        </p>
        <p className="text-xs text-ink-800/60">
          Umbral "texto largo sospechoso de ser carta": {SOSPECHOSO_MIN_CHARS}+ caracteres.
        </p>
      </header>

      {/* ── A — años huérfanos (placeholder o vacío) ───────────────── */}
      <Section
        title={`A. Años sin carta real (${yearsConSoloPlaceholder.length} placeholder + ${yearsVacios.length} vacíos)`}
        hint="Estos años están en pool excluido (vacíos / placeholders). Si alguno coincide con un texto de Bucket B, candidato a promover."
      >
        {yearsConSoloPlaceholder.length === 0 && yearsVacios.length === 0 ? (
          <Empty>No hay años huérfanos.</Empty>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {yearsConSoloPlaceholder.map((y) => {
              const revStr = revealed.has(y.year) ? ' · REVELADO' : '';
              return (
                <Card key={`ph-${y.year}`} tone="warn">
                  <div className="font-display text-lg text-ink-900">
                    {y.year}
                  </div>
                  <div className="text-xs text-ink-800/70">
                    placeholder de{' '}
                    {y.items
                      .map((it) => authorLabel(it.authorId))
                      .join(', ')}
                    {revStr}
                  </div>
                </Card>
              );
            })}
            {yearsVacios.map((y) => {
              const revStr = revealed.has(y.year) ? ' · REVELADO' : '';
              return (
                <Card key={`empty-${y.year}`} tone="muted">
                  <div className="font-display text-lg text-ink-900">
                    {y.year}
                  </div>
                  <div className="text-xs text-ink-800/70">sin carta{revStr}</div>
                </Card>
              );
            })}
          </div>
        )}
      </Section>

      {/* ── B — textos largos sospechosos ──────────────────────────── */}
      <Section
        title={`B. Aportes 'texto' por longitud (${textos.length})`}
        hint="Si el body es largo y narrativo, probablemente estaba pensado como carta. 🟡 = sobre el umbral."
      >
        {textos.length === 0 ? (
          <Empty>No hay textos publicados.</Empty>
        ) : (
          <ul className="space-y-2">
            {textos.map(({ a, len }) => {
              const sospechoso = len >= SOSPECHOSO_MIN_CHARS;
              return (
                <li
                  key={a.id}
                  className={`rounded-xl p-3 ${
                    sospechoso
                      ? 'bg-yellow-50 ring-1 ring-yellow-200'
                      : 'bg-cream-50'
                  }`}
                >
                  <div className="flex items-baseline justify-between gap-2">
                    <div className="font-display text-sm text-ink-900">
                      {sospechoso && '🟡 '}
                      <span className="font-bold">{authorLabel(a.from_id)}</span>
                      {a.title && (
                        <span className="italic text-ink-800/80">
                          {' '}
                          · {a.title}
                        </span>
                      )}
                    </div>
                    <div className="font-mono text-[10px] text-ink-800/60">
                      {len} chars
                    </div>
                  </div>
                  <p className="mt-1 text-xs leading-relaxed text-ink-800/80">
                    {preview(a.body)}
                  </p>
                  <div className="mt-1 font-mono text-[10px] text-ink-800/50">
                    id={a.id.slice(0, 8)} · creado{' '}
                    {a.created_at.slice(0, 10)}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </Section>

      {/* ── C — cartas DB sin año (mensajes libres) ───────────────── */}
      <Section
        title={`C. Cartas DB sin año asignado (${cartasSinYear.length})`}
        hint="Son los 'mensajes libres'. Ya entran al ritual como tape a días vacíos. Info — no es bug. Revisar si alguno parecía carta de un año específico."
      >
        {cartasSinYear.length === 0 ? (
          <Empty>No hay cartas sin año.</Empty>
        ) : (
          <ul className="space-y-2">
            {cartasSinYear.map((a) => (
              <li key={a.id} className="rounded-xl bg-cream-50 p-3">
                <div className="font-display text-sm">
                  <span className="font-bold">{authorLabel(a.from_id)}</span>
                  {a.title && (
                    <span className="italic text-ink-800/80"> · {a.title}</span>
                  )}
                  <span className="ml-2 font-mono text-[10px] text-ink-800/50">
                    {(a.body || '').trim().length} chars
                  </span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-ink-800/80">
                  {preview(a.body)}
                </p>
                <div className="mt-1 font-mono text-[10px] text-ink-800/50">
                  id={a.id.slice(0, 8)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* ── D — cartas DB con año raro ─────────────────────────────── */}
      <Section
        title={`D. Cartas DB con año fuera de rango ${BIRTH_YEAR}–${TURNS_75_YEAR} (${cartasYearRaro.length})`}
        hint="Errores de tipeo posibles (ej. año 195 en vez de 1951)."
      >
        {cartasYearRaro.length === 0 ? (
          <Empty>Cero años raros.</Empty>
        ) : (
          <ul className="space-y-2">
            {cartasYearRaro.map((a) => (
              <li
                key={a.id}
                className="rounded-xl bg-red-50 p-3 ring-1 ring-red-200"
              >
                <div className="font-display text-sm">
                  <span className="font-bold">{authorLabel(a.from_id)}</span>
                  {' · '}
                  <span className="font-mono">year={String(a.year)}</span>
                </div>
                <p className="mt-1 text-xs leading-relaxed text-ink-800/80">
                  {preview(a.body)}
                </p>
                <div className="mt-1 font-mono text-[10px] text-ink-800/50">
                  id={a.id.slice(0, 8)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>

      {/* ── E — cartas DB con body placeholder ─────────────────────── */}
      <Section
        title={`E. Cartas DB con body placeholder/vacío (${cartasBodyPlaceholder.length})`}
        hint="Cartas en DB sin contenido real — quizá se subió shell sin texto."
      >
        {cartasBodyPlaceholder.length === 0 ? (
          <Empty>Nada.</Empty>
        ) : (
          <ul className="space-y-2">
            {cartasBodyPlaceholder.map((a) => (
              <li key={a.id} className="rounded-xl bg-cream-50 p-3">
                <div className="font-display text-sm">
                  <span className="font-bold">{authorLabel(a.from_id)}</span>
                  {' · '}
                  <span className="font-mono">year={String(a.year)}</span>
                  {a.year !== null && revealed.has(a.year) && (
                    <span className="ml-2 font-mono text-[10px] text-red-700">
                      REVELADO
                    </span>
                  )}
                </div>
                <p className="mt-1 text-xs text-ink-800/60">
                  body: {a.body ? `"${preview(a.body, 80)}"` : '(vacío)'}
                </p>
                <div className="mt-1 font-mono text-[10px] text-ink-800/50">
                  id={a.id.slice(0, 8)}
                </div>
              </li>
            ))}
          </ul>
        )}
      </Section>

      <footer className="rounded-xl bg-cream-100 p-4 text-xs text-ink-800/70">
        <p className="font-bold">¿Qué hago con esto?</p>
        <ol className="ml-4 mt-1 list-decimal space-y-1">
          <li>
            Revisa Bucket B (textos largos). Si encuentras uno que era carta,
            anota el id y el año al que pertenece.
          </li>
          <li>
            Mira si ese año aparece en Bucket A (placeholder / vacío) y NO está
            marcado como REVELADO.
          </li>
          <li>
            Pásame la lista de pares <code>(texto_id → año)</code> y armo el
            paso 3 (promoción con guards server-side: no toca lo revelado, no
            borra el original, reversible).
          </li>
        </ol>
      </footer>
    </div>
  );
}

function Section({
  title,
  hint,
  children
}: {
  title: string;
  hint: string;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-3 rounded-2xl bg-cream-100 p-4 shadow-warm">
      <header className="space-y-0.5">
        <h2 className="font-display text-lg text-ink-900">{title}</h2>
        <p className="text-xs text-ink-800/60">{hint}</p>
      </header>
      {children}
    </section>
  );
}

function Card({
  children,
  tone
}: {
  children: React.ReactNode;
  tone: 'warn' | 'muted';
}) {
  const cls =
    tone === 'warn'
      ? 'bg-yellow-50 ring-1 ring-yellow-200'
      : 'bg-cream-50 ring-1 ring-ink-900/5';
  return <div className={`rounded-xl p-3 ${cls}`}>{children}</div>;
}

function Empty({ children }: { children: React.ReactNode }) {
  return <p className="text-xs italic text-ink-800/60">{children}</p>;
}
