import Link from 'next/link';
import ReadingMode from '@/components/ReadingMode';
import { getCartaDelDia, BIRTH_YEAR, CARTAS, getAuthor as getCartaAuthor } from '@/data/cartas';
import { getPerson } from '@/data/family';
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
    <div className="bg-lino text-tinta min-h-dvh -mt-6 -mx-5 px-6 pt-8 pb-32">
      {/* Encabezado editorial */}
      <header className="space-y-3 pt-2">
        <div className="flex items-start justify-between">
          <p className="font-mono text-[10px] tracking-[0.2em] text-grafito">
            CASA BORRERO OSPINA
          </p>
          <ReadingMode />
        </div>
        <p className="font-mono text-[10px] tracking-[0.2em] text-grafito">
          HOY · {todayLabel()}
        </p>
        <h1 className="font-display text-5xl font-extralight italic leading-[1.05] text-tinta">
          Buenos días, papá.
        </h1>
        {dias !== null ? (
          <p className="font-serif text-base italic text-grafito">
            Faltan {dias} {dias === 1 ? 'día' : 'días'} para los setenta y cinco.
          </p>
        ) : (
          <p className="font-serif text-base italic text-tomate">
            Hoy cumples setenta y cinco.
          </p>
        )}
      </header>

      <Rule />

      {/* Carta del día como pieza editorial */}
      {cartaHoy ? (
        <section aria-label="Carta del día" className="space-y-3">
          <p className="font-mono text-[10px] tracking-[0.2em] text-grafito">
            01 — CARTA DEL DÍA
          </p>
          <Link href={`/cartas/${cartaHoy.year}`} className="block group">
            <h2 className="font-display text-3xl font-light italic leading-tight text-tinta group-hover:text-tomate">
              {cartaHoy.title || `El año ${cartaHoy.year}`}
            </h2>
            <p className="mt-2 font-mono text-[10px] tracking-[0.2em] text-grafito">
              {author && `DE ${(author.shortName || author.name).toUpperCase()}`} · AÑO {cartaHoy.year}
            </p>
            {teaser && (
              <p className="mt-4 font-serif text-base leading-relaxed text-tinta/85">
                {teaser}{teaser.length >= 200 && '…'}
              </p>
            )}
            <p className="mt-4 font-mono text-[11px] tracking-wider text-tomate">
              LEER →
            </p>
          </Link>
        </section>
      ) : (
        <section aria-label="Pronto" className="space-y-2">
          <p className="font-mono text-[10px] tracking-[0.2em] text-grafito">
            CARTA DEL DÍA
          </p>
          <p className="font-display text-2xl font-light italic text-tinta">
            La primera llega el día del cumpleaños.
          </p>
          <p className="font-serif text-sm italic text-grafito">
            21 de mayo de 2026.
          </p>
        </section>
      )}

      <Rule />

      {/* Índice numerado de secciones */}
      <section aria-label="Índice" className="space-y-1">
        <p className="font-mono text-[10px] tracking-[0.2em] text-grafito mb-3">
          ÍNDICE
        </p>
        <SectionRow n="02" href="/arbol"      label="Tu árbol"      tag="14 personas en pie" />
        <SectionRow n="03" href="/cartas"     label="Tus cartas"    tag={`${sembradas} ventanas sembradas`} />
        <SectionRow n="04" href="/cumpleanos" label="Tus tarjetas"  tag="Para los 75" />
        <SectionRow n="05" href="/calendario" label="Calendario"    tag="Cumpleaños de la familia" />
        <SectionRow n="06" href="/buzon"      label="El buzón"      tag={updates.length > 0 ? `${updates.length} novedades` : 'Vacío por ahora'} />
      </section>

      <Rule />

      {/* Novedades */}
      {updates.length > 0 && (
        <>
          <section aria-label="Novedades" className="space-y-3">
            <p className="font-mono text-[10px] tracking-[0.2em] text-grafito">
              RECIENTES
            </p>
            <ul className="space-y-3">
              {updates.map((u) => {
                const a = getUpdateAuthor(u);
                return (
                  <li key={u.id}>
                    <Link href="/buzon" className="block group">
                      <p className="font-mono text-[10px] tracking-[0.2em] text-grafito">
                        {a ? (a.shortName || a.name).toUpperCase() : 'FAMILIA'} · {formatRelative(u.createdAt).toUpperCase()}
                      </p>
                      <p className="font-serif text-base italic text-tinta group-hover:text-tomate">
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
        <p className="font-mono text-[10px] tracking-[0.2em] text-grafito text-center">
          CASA BORRERO OSPINA · MARBELLA · BOGOTÁ · 2026
        </p>
        <p className="mt-4 text-center">
          <Link href="/como-instalar" className="font-serif text-sm italic text-grafito hover:text-tomate">
            Cómo poner esta casa en tu iPhone →
          </Link>
        </p>
      </footer>
    </div>
  );
}

function Rule() {
  return <div className="my-8 h-px w-full bg-regla" aria-hidden />;
}

function SectionRow({
  n, href, label, tag
}: { n: string; href: string; label: string; tag: string }) {
  return (
    <Link
      href={href}
      className="grid grid-cols-[2.5rem_1fr_auto] items-baseline gap-3 py-3 border-b border-regla/60 last:border-b-0 group"
    >
      <span className="font-mono text-[11px] tracking-widest text-grafito">{n}</span>
      <span className="font-display text-xl font-light italic text-tinta group-hover:text-tomate">
        {label}
      </span>
      <span className="font-serif text-xs italic text-grafito">{tag}</span>
    </Link>
  );
}
