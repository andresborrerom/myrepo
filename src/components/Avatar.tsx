import type { Person } from '@/data/family';

const SIZES = {
  sm: 'h-12 w-12 text-base',
  md: 'h-16 w-16 text-xl',
  lg: 'h-24 w-24 text-3xl',
  xl: 'h-32 w-32 text-4xl'
} as const;

export default function Avatar({
  person,
  size = 'md'
}: {
  person: Person;
  size?: keyof typeof SIZES;
}) {
  const initial = (person.shortName || person.name).charAt(0).toUpperCase();

  if (person.photo) {
    return (
      // Foto plana, sin next/image todavía: en Fase 0 las fotos viven en /public
      // y usar <img> evita la config de remotePatterns.
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={person.photo}
        alt={person.name}
        className={`${SIZES[size]} rounded-full object-cover shadow-warm`}
      />
    );
  }

  return (
    <div
      role="img"
      aria-label={person.name}
      className={`${SIZES[size]} flex items-center justify-center rounded-full bg-clay-500 font-display font-bold text-cream-50 shadow-warm`}
    >
      {initial}
    </div>
  );
}
