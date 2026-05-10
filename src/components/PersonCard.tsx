import Avatar from '@/components/Avatar';
import type { Person } from '@/data/family';

export default function PersonCard({
  person,
  size = 'md'
}: {
  person: Person;
  size?: 'sm' | 'md' | 'lg';
}) {
  const avatarSize = size === 'sm' ? 'sm' : size === 'lg' ? 'lg' : 'md';
  return (
    <div className="flex items-center gap-3 rounded-2xl bg-cream-100 p-3 shadow-warm">
      <Avatar person={person} size={avatarSize} />
      <div className="flex-1 min-w-0">
        <p className="truncate font-display text-lg font-bold text-ink-900">
          {person.shortName || person.name}
        </p>
        {person.age !== undefined && (
          <p className="text-sm text-ink-800/80">{person.age} años</p>
        )}
      </div>
    </div>
  );
}
