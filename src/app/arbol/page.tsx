import Link from 'next/link';
import Avatar from '@/components/Avatar';
import {
  FAMILY,
  HIJOS,
  PATRIARCH_ID,
  getChildren,
  getPerson,
  type Person
} from '@/data/family';
import { fetchProfilePhotos } from '@/lib/aportes-fetch';

export const metadata = { title: 'Árbol' };
export const dynamic = 'force-dynamic';

function withPhoto(p: Person, photos: Record<string, string>): Person {
  return photos[p.id] ? { ...p, photo: photos[p.id] } : p;
}

export default async function ArbolPage() {
  const photos = await fetchProfilePhotos();
  const alejandro = withPhoto(getPerson(PATRIARCH_ID)!, photos);

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-ink-900">El árbol</h1>
        <p className="text-base text-ink-800/80">
          Eres la raíz. Toca cualquier rama para ver más.
        </p>
      </header>

      {/* Raíz */}
      <Link
        href={`/arbol/${alejandro.id}`}
        className="mx-auto flex w-fit flex-col items-center gap-2 rounded-3xl bg-clay-500 px-8 py-6 text-cream-50 shadow-warm"
      >
        <Avatar person={alejandro} size="lg" />
        <span className="font-display text-xl font-bold">{alejandro.shortName}</span>
        <span className="text-sm opacity-90">75 años · Patriarca</span>
      </Link>

      {/* Ramas: hijos con nietos debajo */}
      <ul className="space-y-4">
        {HIJOS.map((hijoBase) => {
          const hijo = withPhoto(hijoBase, photos);
          const nietos = getChildren(hijo.id).map((n) => withPhoto(n, photos));
          return (
            <li key={hijo.id} className="rounded-2xl bg-cream-100 p-4 shadow-warm">
              <Link
                href={`/arbol/${hijo.id}`}
                className="flex items-center gap-4"
              >
                <Avatar person={hijo} size="md" />
                <div className="flex-1">
                  <p className="font-display text-lg font-bold text-ink-900">
                    {hijo.shortName}
                  </p>
                  <p className="text-sm text-ink-800/70">
                    {hijo.age} años · {nietos.length === 0
                      ? 'sin hijos registrados'
                      : nietos.length === 1
                        ? '1 hijo'
                        : `${nietos.length} hijos`}
                  </p>
                </div>
                <span aria-hidden className="text-2xl text-clay-500">›</span>
              </Link>

              {nietos.length > 0 && (
                <ul className="mt-3 ml-2 grid grid-cols-2 gap-2 border-l-2 border-cream-200 pl-3">
                  {nietos.map((n) => (
                    <li key={n.id}>
                      <Link
                        href={`/arbol/${n.id}`}
                        className="flex items-center gap-2 rounded-xl bg-cream-50 p-2"
                      >
                        <Avatar person={n} size="sm" />
                        <div className="min-w-0">
                          <p className="truncate text-sm font-bold text-ink-900">
                            {n.shortName}
                          </p>
                          <p className="text-xs text-ink-800/60">{n.age} años</p>
                        </div>
                      </Link>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          );
        })}
      </ul>

      <p className="pt-2 text-center text-sm text-ink-800/60">
        {FAMILY.length} personas en el árbol.
      </p>
    </div>
  );
}
