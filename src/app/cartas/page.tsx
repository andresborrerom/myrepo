import Link from 'next/link';
import Avatar from '@/components/Avatar';
import {
  BIRTH_YEAR,
  TURNS_75_YEAR,
  CARTAS
} from '@/data/cartas';
import { getColorRama, getPerson } from '@/data/family';
import {
  buildSlots,
  filterSlotsForViewer,
  getDayIndex,
  type DaySlot
} from '@/lib/cartas-fetch';
import { isInsider } from '@/lib/auth';
import RandomPickButton from './RandomPickButton';

type FilledSlot = Extract<DaySlot, { type: 'anchored' } | { type: 'libre' }>;

export const metadata = { title: 'Cartas' };
export const dynamic = 'force-dynamic';

const TOTAL_DAYS = TURNS_75_YEAR - BIRTH_YEAR + 1;

export default async function CartasPage() {
  const insider = isInsider();
  const now = new Date();
  const dayIdx = getDayIndex(now);
  const allSlots = await buildSlots();
  const visibleSlots = filterSlotsForViewer(allSlots, insider, now);

  const todaySlot = dayIdx !== null && dayIdx < TOTAL_DAYS
    ? allSlots.find((s) => s.day === dayIdx)
    : null;

  // "Las que ya recibiste": slots pasados visibles para el viewer.
  const yaRecibidas = visibleSlots.filter(
    (s) => dayIdx !== null && s.day < dayIdx && s.type !== 'empty'
  );

  const totalAncladas = allSlots.filter((s) => s.type === 'anchored').length;
  const totalLibres = allSlots.filter((s) => s.type === 'libre').length;

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-ink-900">Setenta y cinco cartas</h1>
        <p className="text-base text-ink-800/80">
          {insider
            ? 'Vista de familia. Ves todo en modo preview. Para tu papá la rejilla está bloqueada para el futuro.'
            : 'Una por cada año de tu vida. Te llega una al día durante los 75 días después del cumpleaños.'}
        </p>
        {insider && (
          <p className="text-sm text-ink-800/60">
            {totalAncladas} con año · {totalLibres} mensajes libres distribuidos en días vacíos
          </p>
        )}
      </header>

      {!insider && dayIdx !== null && (
        <RandomPickButton
          releasedYears={CARTAS
            .map((c) => c.year)
            .filter((y) => y - BIRTH_YEAR <= dayIdx)
            .sort((a, b) => a - b)}
        />
      )}

      {todaySlot && todaySlot.type !== 'empty' && insider && (
        <CartaDeHoyCard slot={todaySlot as FilledSlot} />
      )}

      {yaRecibidas.length > 0 && (
        <section aria-label="Cartas recibidas" className="space-y-3">
          <h2 className="font-display text-xl text-ink-900">Las que ya recibiste</h2>
          <ul className="space-y-2">
            {yaRecibidas.slice().reverse().map((slot) => (
              <li key={slot.day}>
                <FeedSlotItem slot={slot as FilledSlot} />
              </li>
            ))}
          </ul>
        </section>
      )}

      {!todaySlot && dayIdx === null && (
        <section
          aria-label="Próxima carta"
          className="rounded-2xl border border-dashed border-clay-500/40 bg-cream-50 p-5 text-center"
        >
          <p className="text-xs uppercase tracking-wide text-clay-600">Pronto</p>
          <p className="mt-1 font-display text-lg text-ink-900">
            La primera carta llega el día del cumpleaños
          </p>
          <p className="text-sm text-ink-800/70">21 de mayo de 2026</p>
        </section>
      )}

      <section aria-label="Rejilla de cartas" className="space-y-3">
        <h2 className="font-display text-xl text-ink-900">
          {insider ? 'La rejilla completa (modo familia)' : 'Tu calendario de 75 días'}
        </h2>
        <p className="text-sm text-ink-800/60">
          {insider
            ? 'Cada cuadro es un día. Verde claro = ya tocó, gris = aún no.'
            : 'Cada cuadro es un día. Lo que ya te llegó está en color. Lo que falta aparece bloqueado.'}
        </p>
        <ul className="grid grid-cols-3 gap-2 sm:grid-cols-5">
          {allSlots.map((slot) => {
            const isToday = slot.day === dayIdx;
            const isPast = dayIdx !== null && slot.day < dayIdx;
            const isFuture = dayIdx === null || slot.day > dayIdx;
            const canClick = insider || !isFuture;
            const showLock = !insider && isFuture;
            return (
              <li key={slot.day}>
                <SlotCell
                  slot={slot}
                  isToday={isToday}
                  isPast={isPast}
                  isFuture={isFuture}
                  canClick={canClick}
                  showLock={showLock}
                />
              </li>
            );
          })}
        </ul>
      </section>

      <p className="pt-2 text-center text-sm text-ink-800/60">
        Año de nacimiento: {BIRTH_YEAR} · Cumple 75: {TURNS_75_YEAR}
      </p>
    </div>
  );
}

function CartaDeHoyCard({ slot }: { slot: FilledSlot }) {
  if (slot.type === 'anchored') {
    const c = slot.cartas[0];
    const author = c ? getPerson(c.fromId) : null;
    return (
      <Link
        href={`/cartas/${slot.year}`}
        className="block overflow-hidden rounded-3xl bg-clay-500 text-cream-50 shadow-warm"
      >
        <div className="p-6">
          <p className="text-xs uppercase tracking-wide opacity-80">Tu carta de hoy</p>
          <p className="mt-2 font-display text-2xl font-bold">
            {c?.title || `Año ${slot.year}`}
          </p>
          <p className="mt-1 text-sm opacity-90">
            Año {slot.year} · {slot.year - BIRTH_YEAR} años
            {slot.cartas.length > 1 && ` · ${slot.cartas.length} cartas`}
          </p>
          {author && (
            <p className="mt-3 text-sm opacity-90">
              De {author.shortName || author.name}
              {slot.cartas.length > 1 && ' y otros'}
            </p>
          )}
          <p className="mt-4 inline-flex items-center gap-1 text-sm">
            Ábrela <span aria-hidden>→</span>
          </p>
        </div>
      </Link>
    );
  }
  // type === 'libre'
  const author = getPerson(slot.mensaje.from_id);
  return (
    <div className="overflow-hidden rounded-3xl bg-olive-700 text-cream-50 shadow-warm">
      <div className="p-6">
        <p className="text-xs uppercase tracking-wide opacity-80">Tu mensaje de hoy</p>
        {slot.mensaje.title && (
          <p className="mt-2 font-display text-2xl font-bold">{slot.mensaje.title}</p>
        )}
        {author && (
          <p className="mt-3 text-sm opacity-90">De {author.shortName || author.name}</p>
        )}
        {slot.mensaje.body && (
          <p className="mt-4 whitespace-pre-wrap text-base/relaxed">{slot.mensaje.body}</p>
        )}
      </div>
    </div>
  );
}

function FeedSlotItem({ slot }: { slot: FilledSlot }) {
  if (slot.type === 'anchored') {
    const c = slot.cartas[0];
    const author = c ? getPerson(c.fromId) : null;
    const ramaColor = c ? getColorRama(c.fromId) : 'bg-clay-500';
    return (
      <Link
        href={`/cartas/${slot.year}`}
        className="flex items-stretch gap-3 overflow-hidden rounded-2xl bg-cream-100 shadow-warm"
      >
        <span aria-hidden className={`w-1.5 ${ramaColor}`} />
        <div className="flex flex-1 items-center gap-3 py-3 pr-4">
          {author && <Avatar person={author} size="sm" />}
          <div className="min-w-0 flex-1">
            <p className="font-display text-xs uppercase tracking-wide text-clay-600">
              {slot.year}
              {slot.cartas.length > 1 && ` · ${slot.cartas.length}`}
            </p>
            <p className="truncate font-display text-base font-bold text-ink-900">
              {c?.title || `Año ${slot.year}`}
            </p>
            {author && (
              <p className="text-xs text-ink-800/60">
                De {author.shortName || author.name}
                {slot.cartas.length > 1 && ' y otros'}
              </p>
            )}
          </div>
          <span aria-hidden className="text-2xl text-clay-500">›</span>
        </div>
      </Link>
    );
  }
  // libre
  const author = getPerson(slot.mensaje.from_id);
  const ramaColor = getColorRama(slot.mensaje.from_id);
  return (
    <div className="flex items-stretch gap-3 overflow-hidden rounded-2xl bg-cream-100 shadow-warm">
      <span aria-hidden className={`w-1.5 ${ramaColor}`} />
      <div className="flex-1 py-3 pr-4">
        <div className="flex items-center gap-3">
          {author && <Avatar person={author} size="sm" />}
          <p className="font-display text-xs uppercase tracking-wide text-olive-700">Mensaje</p>
        </div>
        {slot.mensaje.title && (
          <p className="mt-2 font-display text-base font-bold text-ink-900">{slot.mensaje.title}</p>
        )}
        {slot.mensaje.body && (
          <p className="mt-1 whitespace-pre-wrap text-sm text-ink-800">{slot.mensaje.body}</p>
        )}
      </div>
    </div>
  );
}

function SlotCell({
  slot, isToday, isPast, isFuture, canClick, showLock
}: {
  slot: DaySlot;
  isToday: boolean;
  isPast: boolean;
  isFuture: boolean;
  canClick: boolean;
  showLock: boolean;
}) {
  const baseClass = 'flex h-full flex-col items-center justify-center rounded-xl p-3 shadow-warm text-center';
  const stateClass = isToday
    ? 'bg-clay-500 text-cream-50 ring-2 ring-clay-700'
    : isPast
    ? 'bg-clay-500 text-cream-50'
    : showLock
    ? 'bg-cream-200 text-ink-800/40'
    : slot.type === 'empty'
    ? 'border border-dashed border-cream-200 bg-cream-50 text-ink-800/40'
    : 'bg-cream-100 text-ink-800';

  const content = (
    <>
      {slot.type === 'libre' ? (
        <>
          <span className="font-display text-base font-bold leading-none">Mensaje</span>
          <span className="mt-1 text-xs opacity-80">día {slot.day + 1}</span>
        </>
      ) : (
        <>
          <span className="font-display text-xl font-bold leading-none">{slot.year}</span>
          <span className="mt-1 text-xs opacity-90">
            {slot.type === 'empty' ? 'vacío' : `${slot.year - BIRTH_YEAR} ${slot.year - BIRTH_YEAR === 1 ? 'año' : 'años'}`}
          </span>
          {slot.type === 'anchored' && slot.cartas.length > 1 && (
            <span className="mt-0.5 text-[10px] opacity-80">+{slot.cartas.length - 1}</span>
          )}
        </>
      )}
      {showLock && <span aria-hidden className="mt-1 text-base">🔒</span>}
    </>
  );

  if (canClick && slot.type === 'anchored') {
    return (
      <Link href={`/cartas/${slot.year}`} className={`${baseClass} ${stateClass}`}>
        {content}
      </Link>
    );
  }
  return (
    <div
      aria-label={showLock ? `Día ${slot.day + 1}, bloqueado` : undefined}
      className={baseClass + ' ' + stateClass}
    >
      {content}
    </div>
  );
}
