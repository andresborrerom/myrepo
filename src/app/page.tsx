import Link from 'next/link';
import ReadingMode from '@/components/ReadingMode';
import { getCartaDelDia, BIRTH_YEAR, CARTAS, getAuthor as getCartaAuthor } from '@/data/cartas';
import { getCombinedFeed } from '@/lib/feed';
import { getAuthor as getUpdateAuthor, formatRelative } from '@/data/updates';
import { getBirthdayDate } from '@/lib/config';

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
  const cartaHoy = getCartaDelDia();
  const feed = await getCombinedFeed();
  const updates = feed.slice(0, 3);
  const sembradas = CARTAS.length;
  const dias = daysToBirthday();
  const author = cartaHoy ? getCartaAuthor(cartaHoy) : null;
  const teaser = cartaHoy?.body.split(/\n\s*\n/)[0]?.slice(0, 200);

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
        {/* Carta del día */}
        {cartaHoy ? (
          <section aria-label="Carta del día" className="space-y-3">
            <div className="flex items-center gap-2 text-oro">
              <span className="h-px w-6 bg-oro" aria-hidden />
              <span className="font-mono text-[10px] tracking-[0.3em]">CARTA DEL DÍA</span>
            </div>
            <Link href={`/cartas/${cartaHoy.year}`} className="block group">
              <h2 className="font-display text-3xl font-light italic leading-tight text-tinta2 group-hover:text-cuero">
                {cartaHoy.title || `El año ${cartaHoy.year}`}
              </h2>
              <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-grafito">
                {author && `DE ${(author.shortName || author.name).toUpperCase()}`} · AÑO {cartaHoy.year}
              </p>
              {teaser && (
                <p className="mt-4 font-serif text-base leading-relaxed text-tinta2/85">
                  {teaser}{teaser.length >= 200 && '…'}
                </p>
              )}
              <p className="mt-4 font-mono text-[11px] tracking-wider text-cuero">
                LEER →
              </p>
            </Link>
          </section>
        ) : (
          <section aria-label="Pronto" className="space-y-2">
            <span className="font-mono text-[10px] tracking-[0.3em] text-oro">CARTA DEL DÍA</span>
            <p className="font-display text-2xl font-light italic text-tinta2">
              La primera llega el día del cumpleaños.
            </p>
            <p className="font-serif text-sm italic text-grafito">21 de mayo de 2026.</p>
          </section>
        )}

        <Rule />

        {/* Índice tipo carta de hacienda — numeración romana */}
        <section aria-label="Índice" className="space-y-1">
          <div className="mb-4 flex items-center gap-2 text-oro">
            <span className="h-px w-6 bg-oro" aria-hidden />
            <span className="font-mono text-[10px] tracking-[0.3em]">RECORRIDO</span>
          </div>
          <SectionRow n="I"   href="/arbol"      label="El árbol"      tag="14 personas en pie" />
          <SectionRow n="II"  href="/cartas"     label="Las cartas"    tag={`${sembradas} ventanas sembradas`} />
          <SectionRow n="III" href="/cumpleanos" label="Las tarjetas"  tag="Para los 75" />
          <SectionRow n="IV"  href="/calendario" label="El calendario" tag="Cumpleaños de la familia" />
          <SectionRow n="V"   href="/buzon"      label="El buzón"      tag={updates.length > 0 ? `${updates.length} novedades` : 'Vacío por ahora'} />
        </section>

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

function SectionRow({
  n, href, label, tag
}: { n: string; href: string; label: string; tag: string }) {
  return (
    <Link
      href={href}
      className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-3 border-b border-hueso py-3.5 last:border-b-0 group"
    >
      <span className="font-mono text-[11px] tracking-widest text-oro">{n}</span>
      <span className="font-display text-xl font-light italic text-tinta2 group-hover:text-cuero">
        {label}
      </span>
      <span className="font-serif text-xs italic text-grafito">{tag}</span>
    </Link>
  );
}
