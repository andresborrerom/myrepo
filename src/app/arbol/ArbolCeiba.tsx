import Link from 'next/link';
import Avatar from '@/components/Avatar';
import type { Person } from '@/data/family';

type Props = {
  alejandro: Person;
  ramas: { hijo: Person; nietos: Person[] }[];
};

// Posiciones aproximadas sobre la foto de la ceiba (1500×1000, aspect 3:2).
// Order esperado en `ramas`: Luis Fernando, Alexandra, Carolina, Andrés, Camilo
// (de mayor a menor — coincide con HIJOS de family.ts).
//
// Cada hijo se ubica en una rama visible del árbol; los nietos cuelgan
// como hojas pequeñas cerca de su padre.
const POSICIONES_HIJO: { left: string; top: string }[] = [
  { left: '15%', top: '52%' },  // Luis Fernando — rama larga izquierda
  { left: '32%', top: '32%' },  // Alexandra     — rama superior izquierda
  { left: '50%', top: '20%' },  // Carolina      — copa central
  { left: '64%', top: '30%' },  // Andrés        — rama superior derecha
  { left: '83%', top: '50%' }   // Camilo        — rama larga derecha
];

// Nietos: posicionados como hojas en torno a su padre.
// Indexado por id del padre → array de offsets respecto al padre.
const POSICIONES_NIETO: Record<string, { left: string; top: string }[]> = {
  'luis-fernando': [
    { left: '10%', top: '64%' }, // Alejo
    { left: '22%', top: '62%' }  // Valentina
  ],
  'alexandra': [
    { left: '36%', top: '45%' }  // Miranda
  ],
  'carolina': [
    { left: '44%', top: '32%' }, // Aleria
    { left: '56%', top: '32%' }  // Carlota
  ],
  'andres': [
    { left: '60%', top: '43%' }, // Lucía
    { left: '70%', top: '43%' }  // Pedro Pablo
  ],
  'camilo': [
    { left: '87%', top: '63%' }  // Martín
  ]
};

export default function ArbolCeiba({ alejandro, ramas }: Props) {
  return (
    <div className="relative mx-auto aspect-[3/2] w-full overflow-hidden rounded-3xl shadow-warm">
      {/* Foto de la ceiba */}
      <img
        src="/images/arbol-ceiba.jpg"
        alt="Ceiba en Villeta, Colombia"
        className="absolute inset-0 h-full w-full object-cover"
      />

      {/* Velo muy sutil para mejorar legibilidad de los nodos */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/15"
      />

      {/* Overlay con nodos familiares */}
      <div className="absolute inset-0">
        {/* Papá = raíz, en la base del tronco */}
        <NodoArbol
          href={`/arbol/${alejandro.id}`}
          person={alejandro}
          style={{ left: '50%', top: '88%' }}
          variant="raiz"
          label={`${alejandro.shortName} · 75`}
        />

        {/* 5 hijos en las ramas mayores */}
        {ramas.map(({ hijo }, i) => (
          <NodoArbol
            key={hijo.id}
            href={`/arbol/${hijo.id}`}
            person={hijo}
            style={POSICIONES_HIJO[i]}
            variant="rama"
            label={hijo.shortName || hijo.name}
          />
        ))}

        {/* Nietos como hojas */}
        {ramas.flatMap(({ hijo, nietos }) => {
          const positions = POSICIONES_NIETO[hijo.id] || [];
          return nietos.map((n, j) => (
            <NodoArbol
              key={n.id}
              href={`/arbol/${n.id}`}
              person={n}
              style={positions[j] || { left: '50%', top: '50%' }}
              variant="hoja"
              label={n.shortName || n.name}
            />
          ));
        })}
      </div>
    </div>
  );
}

function NodoArbol({
  href,
  person,
  style,
  variant,
  label
}: {
  href: string;
  person: Person;
  style: { left: string; top: string };
  variant: 'raiz' | 'rama' | 'hoja';
  label: string;
}) {
  const size = variant === 'raiz' ? 'md' : variant === 'rama' ? 'sm' : 'sm';
  const ring =
    variant === 'raiz'
      ? 'ring-4 ring-clay-500/90'
      : variant === 'rama'
        ? 'ring-2 ring-cream-50/90'
        : 'ring-2 ring-cream-50/80';
  const labelClass =
    variant === 'raiz'
      ? 'mt-1 rounded-full bg-clay-500/95 px-3 py-1 font-display text-xs font-bold text-cream-50'
      : variant === 'rama'
        ? 'mt-1 rounded-full bg-cream-50/95 px-2 py-0.5 font-display text-[10px] font-bold text-ink-900'
        : 'mt-1 rounded-full bg-cream-50/85 px-1.5 py-0.5 font-display text-[9px] font-bold text-ink-900';

  return (
    <Link
      href={href}
      style={{ left: style.left, top: style.top }}
      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center transition active:scale-95"
      aria-label={`Ver perfil de ${person.shortName || person.name}`}
    >
      <span className={`rounded-full shadow-warm ${ring}`}>
        <Avatar person={person} size={size as 'sm' | 'md'} />
      </span>
      <span className={`whitespace-nowrap shadow-sm ${labelClass}`}>{label}</span>
    </Link>
  );
}
