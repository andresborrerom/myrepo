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

  const ramas = HIJOS.map((h) => ({
    hijo: withPhoto(h, photos),
    nietos: getChildren(h.id).map((n) => withPhoto(n, photos))
  }));

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-ink-900">El árbol</h1>
        <p className="text-base text-ink-800/80">
          Eres la raíz. Toca cualquier rama para ver más.
        </p>
      </header>

      {/* Árbol visual: papá arriba, hijos en fila horizontal, nietos
          colgando bajo su respectivo padre. Permitimos scroll horizontal
          en pantallas chicas. */}
      <div className="-mx-5 overflow-x-auto px-5 pb-4">
        <div className="mx-auto inline-flex min-w-full flex-col items-center">
          {/* Raíz */}
          <Link
            href={`/arbol/${alejandro.id}`}
            className="flex flex-col items-center gap-2 rounded-3xl bg-clay-500 px-6 py-4 text-cream-50 shadow-warm"
          >
            <Avatar person={alejandro} size="lg" />
            <span className="font-display text-base font-bold leading-none">
              {alejandro.shortName}
            </span>
            <span className="font-mono text-[10px] tracking-widest opacity-90">75</span>
          </Link>

          {/* Tronco: línea vertical de papá hacia el spine */}
          <div className="h-8 w-px bg-clay-500/50" aria-hidden />

          {/* Spine horizontal + ramas */}
          <div className="relative flex items-start justify-center gap-3 px-3">
            {/* Spine horizontal entre el primer y último hijo */}
            <div
              aria-hidden
              className="absolute left-[10%] right-[10%] top-0 h-px bg-clay-500/40"
            />
            {ramas.map(({ hijo, nietos }) => (
              <div
                key={hijo.id}
                className="flex w-20 flex-col items-center gap-2 sm:w-24"
              >
                {/* Conector vertical desde spine hasta el nodo */}
                <div className="h-3 w-px bg-clay-500/40" aria-hidden />

                <Link
                  href={`/arbol/${hijo.id}`}
                  className="flex flex-col items-center gap-1 rounded-2xl bg-cream-100 px-2 py-2 shadow-warm transition active:scale-95"
                >
                  <Avatar person={hijo} size="md" />
                  <span className="text-center font-display text-xs font-bold leading-tight text-ink-900">
                    {hijo.shortName}
                  </span>
                </Link>

                {nietos.length > 0 && (
                  <>
                    {/* Conector del padre hacia los nietos */}
                    <div className="h-3 w-px bg-clay-500/30" aria-hidden />
                    <ul className="flex flex-col items-center gap-2">
                      {nietos.map((n, idx) => (
                        <li key={n.id} className="flex flex-col items-center">
                          {idx > 0 && (
                            <div className="h-2 w-px bg-clay-500/20" aria-hidden />
                          )}
                          <Link
                            href={`/arbol/${n.id}`}
                            className="flex flex-col items-center gap-1 rounded-xl bg-cream-50 px-1.5 py-1.5 transition active:scale-95"
                          >
                            <Avatar person={n} size="sm" />
                            <span className="text-center font-display text-[11px] font-bold leading-tight text-ink-900">
                              {n.shortName}
                            </span>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>

      <p className="pt-2 text-center text-sm text-ink-800/60">
        {FAMILY.length} personas en el árbol.
      </p>
    </div>
  );
}
