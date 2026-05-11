// Unifica aportes desde DB + seed estático del Buzón. Si la DB no está
// configurada, devuelve solo el seed. Si hay DB, los aportes nuevos
// quedan arriba en el feed (ya ordenados por created_at desc desde DB).

import type { Update, UpdateKind } from '@/data/updates';
import { getUpdatesOrdenados } from '@/data/updates';
import { fetchPublishedAportes } from './aportes-fetch';
import type { Aporte, AporteKind } from '@/data/aportes-types';

function aporteToUpdate(a: Aporte): Update {
  return {
    id: a.id,
    fromId: a.from_id,
    kind: a.kind as Exclude<AporteKind, 'carta'> as UpdateKind,
    title: a.title || undefined,
    text: a.body || undefined,
    mediaUrl: a.media_url || undefined,
    createdAt: a.created_at
  };
}

export async function getCombinedFeed(): Promise<Update[]> {
  const aportes = await fetchPublishedAportes({
    kinds: ['texto', 'foto', 'audio', 'video']
  });
  const fromDb = aportes.map(aporteToUpdate);
  const seed = getUpdatesOrdenados();

  return [...fromDb, ...seed].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}
