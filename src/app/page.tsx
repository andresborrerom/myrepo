import Link from 'next/link';
import ReadingMode from '@/components/ReadingMode';
import { CARTAS } from '@/data/cartas';
import { getCombinedFeed } from '@/lib/feed';
import { getAuthor as getUpdateAuthor, formatRelative } from '@/data/updates';
import { getBirthdayDate } from '@/lib/config';
import RecorridoIndex from './RecorridoIndex';
import PushOptIn from '@/components/PushOptIn';

export const dynamic = 'force-dynamic';

function todayLabel(): string {
  return new Date().toLocaleDateString('es-CO', {
    day: 'numeric', month: 'long', year: 'numeric'
  }).toUpperCase();
}

function daysToBirthday(): number | null {
  const now = Date.now();
  const ms = getBirthdayDate().getTime() - now;
  if (ms <= 0) return null;
  return Math.ceil(ms / 86_400_000);
}

export default async function VestibuloPage() {
  const feed = await getCombinedFeed();
  const updates = feed.slice(0, 3);
  const sembradas = CARTAS.length;
  const dias = daysToBirthday();

  return (
    <div className="bg-sabana text-tinta2 min-h-dvh -mt-6 -mx-5 pb-32">
      {/* HERO — el corredor de la hacienda al amanecer */}
      <section
        aria-label="Hero"
        className="relative h-[75vh] min-h-[520px] w-full overflow-hidden"
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/arbol-ceiba.jpg"
          alt="Hacienda al amanecer"
          className="absolute inset-0 h-full w-full object-cover"
        />
        <div
          aria-hidden
          className="absolute inset-0 bg-gradient-to-b from-tinta2/40 via-tinta2/20 to-tinta2/70"
        />

        <div className="relative z-10 flex items-start justify-between px-6 pt-6 sm:px-10">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-oro">
              <span className="h-px w-8 bg-oro" aria-hidden />
              <span className="font-mono text-[10px] tracking-[0.3em]">
                HACIENDA · EST. 1951
              </span>
            </div>
            <p className="font-mono text-[10px] tracking-[0.3em] text-papel/80">
              {todayLabel()}
            </p>
          </div>
          <ReadingMode />
        </div>

        <div className="absolute bottom-8 left-6 right-6 z-10 sm:bottom-12 sm:left-10 sm:right-10">
          <p
            aria-hidden
            className="font-display font-extralight italic leading-none text-papel"
            style={{ fontSize: 'clamp(110px, 28vw, 200px)', letterSpacing: '-0.02em' }}
          >
            AB
            <span className="text-oro">·</span>
            <span style={{ fontSize: '0.6em', verticalAlign: '0.15em' }}>75</span>
          </p>
          <p className="mt-4 font-display text-2xl font-light italic text-papel sm:text-3xl">
            Buenos días, papá.
          </p>
          {dias !== null ? (
            <p className="mt-1 font-serif text-base italic text-papel/85">
              Faltan {dias} {dias === 1 ? 'día' : 'días'} para los setenta y cinco.
            </p>
          ) : (
            <p className="mt-1 font-serif text-base italic text-oro">
              Hoy cumples setenta y cinco.
            </p>
          )}
        </div>
      </section>

      {/* Cuerpo */}
      <div className="px-6 pt-10 sm:px-10">
        {/* Tu carta de hoy — acción unificada al azar */}
        {dias === null ? (
          <section aria-label="Tu carta de hoy" className="space-y-3">
            <div className="flex items-center gap-2 text-oro">
              <span className="h-px w-6 bg-oro" aria-hidden />
              <span className="font-mono text-[10px] tracking-[0.3em]">TU CARTA DE HOY</span>
            </div>
            <h2 className="font-display text-3xl font-light italic leading-tight text-tinta2">
              Una carta te espera.
            </h2>
            <p className="font-serif text-base leading-relaxed text-tinta2/85">
              Cada día se abre una, al azar, entre los años de tu vida — escrita
              por quien te quiere. Una por día.
            </p>
            <Link
              href="/abrir-carta"
              className="mt-2 inline-flex items-center gap-2 rounded-full bg-cuero px-6 py-3 font-mono text-[11px] tracking-[0.2em] text-papel shadow-warm transition active:scale-95"
            >
              ABRIR MI CARTA DE HOY →
            </Link>
          </section>
        ) : (
          <section aria-label="Pronto" className="space-y-2">
            <span className="font-mono text-[10px] tracking-[0.3em] text-oro">TU CARTA DE HOY</span>
            <p className="font-display text-2xl font-light italic text-tinta2">
              La primera llega el día del cumpleaños.
            </p>
            <p className="font-serif text-sm italic text-grafito">21 de mayo de 2026.</p>
          </section>
        )}

        {/* Recordatorio diario push */}
        <div className="mt-5">
          <PushOptIn />
        </div>

        <Rule />

        {/* Recorrido — índice con caballito que se mueve al establo activo */}
        <RecorridoIndex
          items={[
            { n: 'I',   href: '/arbol',      label: 'El árbol',      tag: '14 personas en pie' },
            { n: 'II',  href: '/cartas',     label: 'Las cartas',    tag: `${sembradas} ventanas sembradas` },
            { n: 'III', href: '/cumpleanos', label: 'Las tarjetas',  tag: 'Para los 75' },
            { n: 'IV',  href: '/calendario', label: 'El calendario', tag: 'Cumpleaños de la familia' },
            { n: 'V',   href: '/buzon',      label: 'El buzón',      tag: updates.length > 0 ? `${updates.length} novedades` : 'Vacío por ahora' }
          ]}
        />

        <Rule />

        {/* Novedades */}
        {updates.length > 0 && (
          <>
            <section aria-label="Novedades" className="space-y-3">
              <div className="flex items-center gap-2 text-oro">
                <span className="h-px w-6 bg-oro" aria-hidden />
                <span className="font-mono text-[10px] tracking-[0.3em]">CORREO RECIENTE</span>
              </div>
              <ul className="space-y-3">
                {updates.map((u) => {
                  const a = getUpdateAuthor(u);
                  return (
                    <li key={u.id}>
                      <Link href="/buzon" className="block group">
                        <p className="font-mono text-[10px] tracking-[0.2em] text-grafito">
                          {a ? (a.shortName || a.name).toUpperCase() : 'FAMILIA'} · {formatRelative(u.createdAt).toUpperCase()}
                        </p>
                        <p className="font-serif text-base italic text-tinta2 group-hover:text-cuero">
                          {u.title || u.text?.slice(0, 100) || 'Nueva entrada'}
                        </p>
                      </Link>
                    </li>
                  );
                })}
              </ul>
            </section>
            <Rule />
          </>
        )}

        {/* Pie */}
        <footer className="pt-2">
          <div className="flex items-center justify-center gap-3" aria-hidden>
            <span className="h-px flex-1 bg-oro/50" />
            <span className="font-mono text-[9px] tracking-[0.3em] text-oro">AB · 75</span>
            <span className="h-px flex-1 bg-oro/50" />
          </div>
          <p className="mt-4 text-center font-mono text-[10px] tracking-[0.2em] text-grafito">
            CASA BORRERO OSPINA · MARBELLA · BOGOTÁ · 2026
          </p>
          <p className="mt-4 text-center">
            <Link href="/como-instalar" className="font-serif text-sm italic text-grafito hover:text-cuero">
              Cómo poner esta casa en tu iPhone →
            </Link>
          </p>
        </footer>
      </div>
    </div>
  );
}

function Rule() {
  return (
    <div className="my-8 flex items-center gap-3" aria-hidden>
      <span className="h-px flex-1 bg-hueso" />
      <span className="text-[10px] text-oro/70">◆</span>
      <span className="h-px flex-1 bg-hueso" />
    </div>
  );
}

