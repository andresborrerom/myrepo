import Link from 'next/link';
import { notFound } from 'next/navigation';
import Avatar from '@/components/Avatar';
import PersonCard from '@/components/PersonCard';
import {
  FAMILY,
  getChildren,
  getPerson,
  getColorRama,
  getRama
} from '@/data/family';
import { fetchAportesByPerson, fetchProfilePhotos } from '@/lib/aportes-fetch';
import AportesListSortable from './AportesListSortable';

export const dynamic = 'force-dynamic';

export default async function PersonPage({ params }: { params: { id: string } }) {
  const basePerson = getPerson(params.id);
  if (!basePerson) notFound();

  const photos = await fetchProfilePhotos();
  const person = photos[basePerson.id]
    ? { ...basePerson, photo: photos[basePerson.id] }
    : basePerson;

  const enrich = <T extends { id: string; photo?: string }>(p: T): T =>
    photos[p.id] ? { ...p, photo: photos[p.id] } : p;

  const parent = person.parentId ? getPerson(person.parentId) : null;
  const parentEnriched = parent ? enrich(parent) : null;
  const children = getChildren(person.id).map(enrich);
  const rama = getRama(person.id);
  const ramaColor = getColorRama(person.id);

  // Hermanos del mismo padre, excluyendo a uno mismo.
  const siblings = (person.parentId
    ? getChildren(person.parentId).filter((p) => p.id !== person.id)
    : []
  ).map(enrich);

  // Aportes firmados por esta persona (DB). Para el patriarca no traemos
  // — su feed es la app entera; el árbol queda como índice de los demás.
  const aportes = person.role === 'patriarca'
    ? []
    : await fetchAportesByPerson(person.id, 12);

  const roleLabel =
    person.role === 'patriarca' ? 'Patriarca'
    : person.role === 'hijo'    ? 'Hijo de Alejandro'
                                : `Nieto de Alejandro`;

  return (
    <div className="space-y-6">
      <Link href="/arbol" className="inline-flex items-center gap-1 text-clay-600">
        ‹ Volver al árbol
      </Link>

      <header
        className={`overflow-hidden rounded-3xl shadow-warm ${
          person.role === 'patriarca' ? 'bg-clay-500 text-cream-50' : 'bg-cream-100'
        }`}
      >
        {person.role !== 'patriarca' && (
          <span aria-hidden className={`block h-1.5 w-full ${ramaColor}`} />
        )}
        <div className="flex flex-col items-center gap-3 p-6 text-center">
          <Avatar person={person} size="xl" />
          <h1 className={`font-display text-3xl ${
            person.role === 'patriarca' ? 'text-cream-50' : 'text-ink-900'
          }`}>
            {person.name}
          </h1>
          <p className={`text-sm ${
            person.role === 'patriarca' ? 'text-cream-50/80' : 'text-ink-800/70'
          }`}>
            {person.age !== undefined && <>{person.age} años · </>}{roleLabel}
            {rama && person.role === 'nieto' && <> · Rama de {rama.shortName}</>}
          </p>
          {person.bio && (
            <p className={`mt-2 max-w-md text-base ${
              person.role === 'patriarca' ? 'text-cream-50' : 'text-ink-800'
            }`}>
              {person.bio}
            </p>
          )}
        </div>
      </header>

      {person.role !== 'patriarca' && (
        <section className="space-y-2">
          <div className="flex items-baseline justify-between">
            <h2 className="font-display text-lg text-ink-900">
              Lo que {person.shortName || person.name} te ha dejado
            </h2>
            {aportes.length > 0 && (
              <Link href="/buzon" className="text-sm text-clay-600">
                Ver todo
              </Link>
            )}
          </div>
          {aportes.length === 0 ? (
            <div className="rounded-2xl border border-dashed border-cream-200 bg-cream-50 p-5 text-center text-sm text-ink-800/60">
              Todavía no te ha dejado nada. Llegará.
            </div>
          ) : (
            <AportesListSortable initial={aportes} ramaColor={ramaColor} />
          )}
        </section>
      )}

      {parent && (
        <section className="space-y-2">
          <h2 className="font-display text-lg text-ink-900">
            {person.role === 'hijo' ? 'Tu padre' : 'Tu papá'}
          </h2>
          <Link href={`/arbol/${parent.id}`} className="block">
            <PersonCard person={parentEnriched!} />
          </Link>
        </section>
      )}

      {children.length > 0 && (
        <section className="space-y-2">
          <h2 className="font-display text-lg text-ink-900">
            {person.role === 'patriarca' ? 'Tus hijos' : 'Tus hijos'}
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

      {siblings.length > 0 && (
        <section className="space-y-2">
          <h2 className="font-display text-lg text-ink-900">
            {person.role === 'hijo' ? 'Tus hermanos' : 'Sus hermanos'}
          </h2>
          <ul className="grid grid-cols-2 gap-2">
            {siblings.map((s) => (
              <li key={s.id}>
                <Link href={`/arbol/${s.id}`} className="block">
                  <PersonCard person={s} size="sm" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      )}
    </div>
  );
}
