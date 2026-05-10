import Link from 'next/link';
import { notFound } from 'next/navigation';
import Avatar from '@/components/Avatar';
import PersonCard from '@/components/PersonCard';
import { FAMILY, getChildren, getPerson } from '@/data/family';

export function generateStaticParams() {
  return FAMILY.map((p) => ({ id: p.id }));
}

export default function PersonPage({ params }: { params: { id: string } }) {
  const person = getPerson(params.id);
  if (!person) notFound();

  const parent = person.parentId ? getPerson(person.parentId) : null;
  const children = getChildren(person.id);

  const roleLabel =
    person.role === 'patriarca' ? 'Patriarca'
    : person.role === 'hijo'    ? 'Hijo de Alejandro'
                                : `Nieto de Alejandro`;

  return (
    <div className="space-y-6">
      <Link href="/arbol" className="inline-flex items-center gap-1 text-clay-600">
        ‹ Volver al árbol
      </Link>

      <header className="flex flex-col items-center gap-3 text-center">
        <Avatar person={person} size="xl" />
        <h1 className="font-display text-3xl text-ink-900">{person.name}</h1>
        <p className="text-sm text-ink-800/70">
          {person.age !== undefined && <>{person.age} años · </>}{roleLabel}
        </p>
        {person.bio && (
          <p className="mt-2 max-w-md text-base text-ink-800">{person.bio}</p>
        )}
      </header>

      {parent && (
        <section className="space-y-2">
          <h2 className="font-display text-lg text-ink-900">Su rama empieza con</h2>
          <Link href={`/arbol/${parent.id}`} className="block">
            <PersonCard person={parent} />
          </Link>
        </section>
      )}

      {children.length > 0 && (
        <section className="space-y-2">
          <h2 className="font-display text-lg text-ink-900">
            {person.role === 'patriarca' ? 'Sus hijos' : 'Sus hijos'}
          </h2>
          <ul className="grid grid-cols-2 gap-2">
            {children.map((c) => (
              <li key={c.id}>
                <Link href={`/arbol/${c.id}`} className="block">
                  <PersonCard person={c} size="sm" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}

      <section className="rounded-2xl border border-dashed border-cream-200 bg-cream-50 p-5 text-center text-ink-800/70">
        Próximamente: foto, audio de saludo y novedades de su rama.
      </section>
    </div>
  );
}
