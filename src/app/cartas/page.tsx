import Link from 'next/link';
import {
  fetchAlejandroStateServer,
  getDayIndex,
  getReleasedYears
} from '@/lib/cartas-fetch';

export const metadata = { title: 'Cartas' };
export const dynamic = 'force-dynamic';

// Textura de grano de papel — SVG noise como data-URI.
const GRANO_PAPEL =
  "url(\"data:image/svg+xml;utf8,<svg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0.16  0 0 0 0 0.13  0 0 0 0 0.09  0 0 0 0.08 0'/></filter><rect width='100%25' height='100%25' filter='url(%23n)'/></svg>\")";

export default async function CartasPage() {
  const now = new Date();
  const dayIdx = getDayIndex(now);

  const released = getReleasedYears(now);
  const { revealedYears } = await fetchAlejandroStateServer();

  return (
    <div className="bg-sabana text-tinta2 min-h-dvh -mt-6 -mx-5 px-6 pt-10 pb-32 sm:px-10">
      <header className="space-y-3">
        <div className="flex items-center gap-2 text-oro">
          <span className="h-px w-6 bg-oro" aria-hidden />
          <span className="font-mono text-[10px] tracking-[0.3em]">TUS CARTAS</span>
        </div>
        <h1 className="font-display text-3xl font-light italic text-tinta2 sm:text-4xl">
          Setenta y cinco años, una carta a la vez.
        </h1>
        <p className="font-serif text-sm italic text-grafito">
          {revealedYears.length} {revealedYears.length === 1 ? 'abierta' : 'abiertas'} de {released.length}.
          {dayIdx === null && ' La primera llega el 21 de mayo.'}
        </p>
      </header>

      <div className="my-8 flex items-center gap-3" aria-hidden>
        <span className="h-px flex-1 bg-hueso" />
        <span className="text-[10px] text-oro/70">◆</span>
        <span className="h-px flex-1 bg-hueso" />
      </div>

      <section aria-label="Mis cartas">
        <ul className="grid grid-cols-2 gap-4 sm:grid-cols-3">
          {released.map((year) => {
            const opened = revealedYears.includes(year);
            return (
              <li key={year}>
                <Sobre year={year} opened={opened} />
              </li>
            );
          })}
        </ul>

        <p className="pt-8 text-center font-serif text-xs italic text-grafito">
          Los sobres se abren al azar, uno por día. Toca un sobre abierto para releerlo.
        </p>
      </section>
    </div>
  );
}

function Sobre({ year, opened }: { year: number; opened: boolean }) {
  const cardBase =
    'group relative block aspect-[4/3] overflow-hidden rounded-lg border transition';
  const cardOpened =
    'border-cuero/40 bg-papel shadow-[0_2px_4px_rgba(42,32,24,0.08),0_12px_28px_-10px_rgba(42,32,24,0.25)] hover:shadow-[0_2px_4px_rgba(42,32,24,0.12),0_18px_36px_-10px_rgba(42,32,24,0.35)] active:scale-[0.98]';
  const cardClosed =
    'border-hueso bg-papel shadow-[0_2px_4px_rgba(42,32,24,0.1),0_10px_24px_-10px_rgba(42,32,24,0.22)]';

  const className = `${cardBase} ${opened ? cardOpened : cardClosed}`;

  const inner = (
    <>
      {/* Textura de grano sobre el papel */}
      <span
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-60 mix-blend-multiply"
        style={{ backgroundImage: GRANO_PAPEL }}
      />

      <div className="relative flex h-full flex-col items-center justify-center gap-1.5 px-3 pt-3 pb-2">
        {opened ? <SobreAbiertoIcon /> : <SobreCerradoIcon />}
        <span
          className={`font-display text-xl font-light italic leading-none ${
            opened ? 'text-cuero' : 'text-tinta2/55'
          }`}
        >
          {year}
        </span>
        <span
          className={`font-mono text-[8px] tracking-[0.25em] ${
            opened ? 'text-oro' : 'text-tinta2/35'
          }`}
        >
          {opened ? 'LEÍDA' : 'POR ABRIR'}
        </span>
      </div>
    </>
  );

  if (opened) {
    return (
      <Link
        href={`/cartas/${year}`}
        className={className}
        aria-label={`Releer carta del año ${year}`}
      >
        {inner}
      </Link>
    );
  }

  return (
    <div className={className} aria-label={`Sobre cerrado — año ${year}`}>
      {inner}
    </div>
  );
}

// Sobre cerrado: rectángulo + V triangular hacia abajo (solapa frontal) +
// sello circular de cera en oro sobre el centro.
function SobreCerradoIcon() {
  return (
    <span className="relative inline-block" aria-hidden>
      <svg
        viewBox="0 0 48 36"
        width="56"
        height="42"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinejoin="round"
        className="text-tinta2/55"
      >
        {/* Cuerpo */}
        <rect x="3" y="6" width="42" height="26" rx="2" fill="#FBF7F0" />
        {/* Solapa cerrada hacia el centro (líneas que bajan desde las
            esquinas superiores hasta el centro del rectángulo) */}
        <path d="M3 6 L24 22 L45 6" fill="#F0E8D2" />
        {/* Borde inferior de la solapa */}
        <path d="M3 6 L24 22 L45 6" />
      </svg>
      {/* Sello de cera en oro */}
      <span
        aria-hidden
        className="absolute left-1/2 top-[55%] -translate-x-1/2 -translate-y-1/2 h-3.5 w-3.5 rounded-full"
        style={{
          background:
            'radial-gradient(circle at 35% 35%, #D6B66E 0%, #B8924A 50%, #8B6E2E 100%)',
          boxShadow:
            'inset 0 1px 2px rgba(255,255,255,0.35), inset 0 -1px 2px rgba(0,0,0,0.25), 0 1px 1px rgba(42,32,24,0.4)',
          transform: 'translate(-50%, -50%) rotate(-8deg)'
        }}
      />
    </span>
  );
}

// Sobre abierto: cuerpo con solapa hacia atrás (líneas suaves) +
// una "carta" asomando por dentro con algunas rayas tipográficas.
function SobreAbiertoIcon() {
  return (
    <svg
      viewBox="0 0 48 36"
      width="56"
      height="42"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.4"
      strokeLinejoin="round"
      strokeLinecap="round"
      className="text-cuero"
      aria-hidden
    >
      {/* Cuerpo del sobre (parte trasera baja) */}
      <rect x="3" y="11" width="42" height="21" rx="2" fill="#F5EFE2" />
      {/* Solapa abierta hacia atrás (más arriba), trazo punteado para
          sugerir profundidad */}
      <path d="M3 11 L24 0 L45 11" strokeDasharray="2 2" opacity="0.65" />
      {/* "Carta" que asoma — rectángulo más pequeño desplazado hacia arriba */}
      <rect x="9" y="5" width="30" height="20" rx="1" fill="#FBF7F0" />
      {/* Líneas tipográficas en la carta */}
      <path d="M12 11 L36 11" strokeWidth="1" opacity="0.55" />
      <path d="M12 15 L32 15" strokeWidth="1" opacity="0.55" />
      <path d="M12 19 L34 19" strokeWidth="1" opacity="0.55" />
      {/* V interna del sobre (solapa frontal) */}
      <path d="M3 11 L24 24 L45 11" />
    </svg>
  );
}
