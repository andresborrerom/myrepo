import {
  FAMILY,
  HIJOS,
  PATRIARCH_ID,
  getChildren,
  getPerson,
  type Person
} from '@/data/family';
import { fetchProfilePhotos } from '@/lib/aportes-fetch';
import ArbolCeiba from './ArbolCeiba';

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
          Una ceiba sembrada en Villeta. Eres la corona. Toca cualquier rama para ver más.
        </p>
      </header>

      <ArbolCeiba alejandro={alejandro} ramas={ramas} />

      <p className="pt-2 text-center text-sm text-ink-800/60">
        {FAMILY.length} personas en el árbol.
      </p>
    </div>
  );
}
