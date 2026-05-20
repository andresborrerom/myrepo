import Link from 'next/link';
import Avatar from '@/components/Avatar';
import type { Person } from '@/data/family';

type Props = {
  alejandro: Person;
  ramas: { hijo: Person; nietos: Person[] }[];
};

// Posiciones (en %) dentro del SVG 800×1000. Estos %s se aplican también al
// overlay HTML porque comparten el mismo aspect-ratio.
const HIJO_X = ['12%', '30%', '50%', '70%', '88%'];
const HIJO_Y = '45%';

// Posiciones X para nietos por padre.
// Se calculan agrupados alrededor del padre, espaciados ~6% entre hermanos.
function nietoXs(hijoIndex: number, n: number): string[] {
  const baseX = parseFloat(HIJO_X[hijoIndex]);
  if (n === 1) return [`${baseX}%`];
  if (n === 2) return [`${baseX - 4}%`, `${baseX + 4}%`];
  // 3+: distribuir simétricamente
  const half = (n - 1) / 2;
  return Array.from({ length: n }, (_, i) => `${baseX + (i - half) * 5}%`);
}
const NIETO_Y = '76%';

export default function ArbolCeiba({ alejandro, ramas }: Props) {
  return (
    <div className="relative mx-auto aspect-[3/4] w-full max-w-md overflow-hidden rounded-3xl shadow-warm">
      {/* SVG: paisaje + ceiba */}
      <svg
        viewBox="0 0 300 400"
        preserveAspectRatio="xMidYMid slice"
        className="absolute inset-0 h-full w-full"
        aria-hidden
      >
        <defs>
          {/* Cielo: amanecer/atardecer cálido tipo Villeta */}
          <linearGradient id="cielo" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5D9A6" />
            <stop offset="40%" stopColor="#E8C384" />
            <stop offset="70%" stopColor="#C9D7C7" />
            <stop offset="100%" stopColor="#A8C0B8" />
          </linearGradient>

          {/* Neblina sobre las montañas */}
          <linearGradient id="neblina" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#F5E8D0" stopOpacity="0.6" />
            <stop offset="100%" stopColor="#F5E8D0" stopOpacity="0" />
          </linearGradient>

          {/* Tronco con leve degradado para volumen */}
          <linearGradient id="tronco" x1="0" y1="0" x2="1" y2="0">
            <stop offset="0%" stopColor="#3F2D24" />
            <stop offset="50%" stopColor="#5D4037" />
            <stop offset="100%" stopColor="#3F2D24" />
          </linearGradient>
        </defs>

        {/* Cielo */}
        <rect width="300" height="400" fill="url(#cielo)" />

        {/* Sol/luz al fondo */}
        <circle cx="220" cy="120" r="28" fill="#F5E8D0" opacity="0.55" />

        {/* Cordillera lejana (más clara, atrás) */}
        <path
          d="M0,200 Q40,160 70,180 Q110,150 150,175 Q190,160 230,180 Q270,165 300,185 L300,260 L0,260 Z"
          fill="#8FA086"
          opacity="0.55"
        />
        {/* Cordillera media */}
        <path
          d="M0,230 Q50,195 100,215 Q150,195 200,225 Q250,205 300,225 L300,280 L0,280 Z"
          fill="#6E8166"
          opacity="0.75"
        />
        {/* Cordillera cercana */}
        <path
          d="M0,260 Q60,235 130,255 Q200,235 270,260 Q290,265 300,260 L300,300 L0,300 Z"
          fill="#536045"
          opacity="0.9"
        />

        {/* Neblina sobre cordilleras */}
        <rect y="180" width="300" height="80" fill="url(#neblina)" />

        {/* Río Villeta serpenteando por el valle */}
        <path
          d="M-10,295 Q60,288 110,300 Q160,310 210,300 Q260,292 310,300"
          stroke="#A4C4D8"
          strokeWidth="8"
          fill="none"
          opacity="0.85"
          strokeLinecap="round"
        />
        <path
          d="M-10,297 Q60,290 110,302 Q160,312 210,302 Q260,294 310,302"
          stroke="#D4E5EE"
          strokeWidth="3"
          fill="none"
          opacity="0.7"
          strokeLinecap="round"
        />

        {/* Suelo (vega del río) */}
        <path
          d="M0,300 L300,300 L300,400 L0,400 Z"
          fill="#4F5E3D"
          opacity="0.55"
        />
        {/* Caña/sombras de pasto */}
        <path d="M20,360 L25,335 M40,365 L45,340 M70,355 L75,330 M250,360 L255,335 M275,365 L280,340" stroke="#6B7A3A" strokeWidth="1.5" opacity="0.6" />

        {/* === CEIBA === */}

        {/* Contrafuertes (aletones triangulares) */}
        <path d="M110,400 L150,320 L150,400 Z" fill="#3F2D24" opacity="0.95" />
        <path d="M150,320 L150,400 L190,400 Z" fill="#5D4037" opacity="0.95" />
        <path d="M95,400 L150,335 L150,360 Z" fill="#3F2D24" opacity="0.85" />
        <path d="M205,400 L150,335 L150,360 Z" fill="#3F2D24" opacity="0.85" />

        {/* Tronco principal */}
        <rect x="142" y="80" width="16" height="240" fill="url(#tronco)" />

        {/* Textura espinas en tronco (puntos sutiles) */}
        <g fill="#2A1F18" opacity="0.6">
          <circle cx="146" cy="120" r="1" />
          <circle cx="154" cy="150" r="1" />
          <circle cx="146" cy="180" r="1" />
          <circle cx="154" cy="210" r="1" />
          <circle cx="146" cy="240" r="1" />
          <circle cx="154" cy="270" r="1" />
          <circle cx="146" cy="300" r="1" />
        </g>

        {/* Ramas principales — nivel 1 (alto, hacia las hojas de papá) */}
        <path
          d="M150,90 Q120,80 90,75 M150,90 Q180,80 210,75 M150,90 Q150,70 150,55"
          stroke="#5D4037"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
        />

        {/* Ramas pagoda nivel medio (donde van los hijos) */}
        <path
          d="M150,180 Q90,175 36,180 M150,180 Q200,175 240,180 M150,180 L150,180"
          stroke="#5D4037"
          strokeWidth="5"
          fill="none"
          strokeLinecap="round"
        />
        {/* Ramas secundarias verticales hacia los nietos */}
        <path
          d="M36,180 L36,290 M90,180 L90,290 M150,180 L150,290 M210,180 L210,290 M264,180 L264,290"
          stroke="#5D4037"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          opacity="0.8"
        />

        {/* Foliaje en pagoda: nubes aplanadas estratificadas */}
        {/* Pagoda nivel inferior (más ancha) */}
        <ellipse cx="36" cy="180" rx="32" ry="14" fill="#3F4A21" opacity="0.85" />
        <ellipse cx="90" cy="178" rx="36" ry="16" fill="#3F4A21" opacity="0.85" />
        <ellipse cx="150" cy="175" rx="40" ry="18" fill="#3F4A21" opacity="0.85" />
        <ellipse cx="210" cy="178" rx="36" ry="16" fill="#3F4A21" opacity="0.85" />
        <ellipse cx="264" cy="180" rx="32" ry="14" fill="#3F4A21" opacity="0.85" />
        {/* Pagoda nivel medio */}
        <ellipse cx="100" cy="140" rx="40" ry="14" fill="#54622D" opacity="0.8" />
        <ellipse cx="200" cy="140" rx="40" ry="14" fill="#54622D" opacity="0.8" />
        <ellipse cx="150" cy="125" rx="55" ry="18" fill="#54622D" opacity="0.85" />
        {/* Pagoda nivel superior (corona) */}
        <ellipse cx="150" cy="75" rx="65" ry="25" fill="#6B7A3A" opacity="0.9" />
        <ellipse cx="120" cy="55" rx="35" ry="15" fill="#6B7A3A" opacity="0.85" />
        <ellipse cx="180" cy="55" rx="35" ry="15" fill="#6B7A3A" opacity="0.85" />
      </svg>

      {/* Overlay con nodos familiares */}
      <div className="absolute inset-0">
        {/* Papá en la corona */}
        <PositionedNode
          href={`/arbol/${alejandro.id}`}
          style={{ left: '50%', top: '10%' }}
          variant="root"
        >
          <Avatar person={alejandro} size="md" />
          <span className="font-display text-xs font-bold leading-none text-cream-50 drop-shadow">
            {alejandro.shortName}
          </span>
          <span className="font-mono text-[9px] tracking-widest text-cream-50/90 drop-shadow">
            75
          </span>
        </PositionedNode>

        {/* 5 hijos en la pagoda media */}
        {ramas.map(({ hijo }, i) => (
          <PositionedNode
            key={hijo.id}
            href={`/arbol/${hijo.id}`}
            style={{ left: HIJO_X[i], top: HIJO_Y }}
            variant="md"
          >
            <Avatar person={hijo} size="sm" />
            <span className="text-center font-display text-[10px] font-bold leading-tight text-ink-900">
              {hijo.shortName}
            </span>
          </PositionedNode>
        ))}

        {/* Nietos colgando de las ramas inferiores */}
        {ramas.map(({ hijo, nietos }, hijoIdx) => {
          const xs = nietoXs(hijoIdx, nietos.length);
          return nietos.map((n, j) => (
            <PositionedNode
              key={n.id}
              href={`/arbol/${n.id}`}
              style={{ left: xs[j], top: NIETO_Y }}
              variant="sm"
            >
              <Avatar person={n} size="sm" />
              <span className="text-center font-display text-[9px] font-bold leading-tight text-ink-900">
                {n.shortName}
              </span>
            </PositionedNode>
          ));
        })}
      </div>
    </div>
  );
}

function PositionedNode({
  href,
  style,
  variant,
  children
}: {
  href: string;
  style: React.CSSProperties;
  variant: 'root' | 'md' | 'sm';
  children: React.ReactNode;
}) {
  const base =
    'absolute -translate-x-1/2 -translate-y-1/2 flex flex-col items-center gap-1 transition active:scale-95';
  const styles =
    variant === 'root'
      ? 'rounded-full'
      : variant === 'md'
        ? 'rounded-xl bg-cream-50/95 backdrop-blur-sm px-1.5 py-1 shadow-warm'
        : 'rounded-xl bg-cream-50/90 backdrop-blur-sm px-1 py-1 shadow-sm';
  return (
    <Link href={href} className={`${base} ${styles}`} style={style}>
      {children}
    </Link>
  );
}
