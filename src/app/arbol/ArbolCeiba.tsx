import Link from 'next/link';
import type { Person } from '@/data/family';

type Props = {
  alejandro: Person;
  ramas: { hijo: Person; nietos: Person[] }[];
};

// Posiciones sobre la foto (aspect 3:2). Diseñadas para que:
// 1) Los hijos queden CERCA del papá (en la parte baja del follaje)
// 2) Los nietos queden MÁS LEJOS (arriba en el follaje), agrupados cerca de su padre
// 3) Ninguno se tape con otro.
//
// Orden esperado en `ramas`: Luis Fernando, Alexandra, Carolina, Andrés, Camilo.
const POSICIONES_HIJO: { left: string; top: string }[] = [
  { left: '20%', top: '67%' },  // Luis Fernando — más bajo, izquierda
  { left: '35%', top: '57%' },  // Alexandra
  { left: '50%', top: '52%' },  // Carolina — centro, sobre el tronco
  { left: '65%', top: '57%' },  // Andrés
  { left: '80%', top: '67%' }   // Camilo — más bajo, derecha
];

const POSICIONES_NIETO: Record<string, { left: string; top: string }[]> = {
  'luis-fernando': [
    { left: '12%', top: '48%' }, // Alejo
    { left: '24%', top: '36%' }  // Valentina
  ],
  'alexandra': [
    { left: '36%', top: '36%' }  // Miranda
  ],
  'carolina': [
    { left: '46%', top: '26%' }, // Aleria
    { left: '54%', top: '26%' }  // Carlota
  ],
  'andres': [
    { left: '64%', top: '36%' }, // Lucía
    { left: '76%', top: '38%' }  // Pedro Pablo
  ],
  'camilo': [
    { left: '88%', top: '48%' }  // Martín
  ]
};

export default function ArbolCeiba({ alejandro, ramas }: Props) {
  return (
    <div className="relative mx-auto aspect-[3/2] w-full overflow-hidden rounded-3xl shadow-warm">
      <img
        src="/images/arbol-ceiba.jpg"
        alt="Ceiba en Villeta, Colombia"
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/15"
      />

      <div className="absolute inset-0">
        {/* Papá: raíz, base del tronco. Nodo más grande. */}
        <NodoArbol
          href={`/arbol/${alejandro.id}`}
          person={alejandro}
          style={{ left: '50%', top: '88%' }}
          sizePx={56}
          ringClass="ring-4 ring-clay-500"
          labelClass="bg-clay-500 text-cream-50"
          labelTextClass="text-xs"
          label={`${alejandro.shortName} · 75`}
        />

        {/* Hijos: ramas mayores, alrededor del tronco. Tamaño medio. */}
        {ramas.map(({ hijo }, i) => (
          <NodoArbol
            key={hijo.id}
            href={`/arbol/${hijo.id}`}
            person={hijo}
            style={POSICIONES_HIJO[i]}
            sizePx={42}
            ringClass="ring-[3px] ring-cream-50"
            labelClass="bg-cream-50 text-ink-900"
            labelTextClass="text-[11px]"
            label={hijo.shortName || hijo.name}
          />
        ))}

        {/* Nietos: hojas/sub-ramas, más arriba en el follaje. Tamaño pequeño. */}
        {ramas.flatMap(({ hijo, nietos }) => {
          const positions = POSICIONES_NIETO[hijo.id] || [];
          return nietos.map((n, j) => (
            <NodoArbol
              key={n.id}
              href={`/arbol/${n.id}`}
              person={n}
              style={positions[j] || { left: '50%', top: '50%' }}
              sizePx={28}
              ringClass="ring-2 ring-cream-50/90"
              labelClass="bg-cream-50/95 text-ink-900"
              labelTextClass="text-[9px]"
              label={firstName(n.shortName || n.name)}
            />
          ));
        })}
      </div>
    </div>
  );
}

function firstName(name: string): string {
  return name.split(' ')[0];
}

function NodoArbol({
  href,
  person,
  style,
  sizePx,
  ringClass,
  labelClass,
  labelTextClass,
  label
}: {
  href: string;
  person: Person;
  style: { left: string; top: string };
  sizePx: number;
  ringClass: string;
  labelClass: string;
  labelTextClass: string;
  label: string;
}) {
  const initial = (person.shortName || person.name).charAt(0).toUpperCase();

  return (
    <Link
      href={href}
      style={{ left: style.left, top: style.top }}
      className="absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center transition active:scale-95"
      aria-label={`Ver perfil de ${person.shortName || person.name}`}
    >
      {person.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={person.photo}
          alt={person.name}
          style={{ width: sizePx, height: sizePx }}
          className={`rounded-full object-cover shadow-warm ${ringClass}`}
        />
      ) : (
        <div
          style={{ width: sizePx, height: sizePx, fontSize: sizePx * 0.42 }}
          className={`flex items-center justify-center rounded-full bg-clay-500 font-display font-bold text-cream-50 shadow-warm ${ringClass}`}
          aria-hidden
        >
          {initial}
        </div>
      )}
      <span
        className={`mt-1 whitespace-nowrap rounded-full px-2 py-0.5 font-display font-bold shadow-sm ${labelClass} ${labelTextClass}`}
      >
        {label}
      </span>
    </Link>
  );
}
