// Buzón de novedades. En v1 lo edita Andrés a mano. En v2 conectamos
// Supabase y cada miembro de la familia podrá publicar desde su iPhone.
//
// Para sembrar una entrada nueva: copia el último item, cambia id, fromId,
// fecha y contenido. Las fotos van en /public/buzon/yyyy-mm-dd-xxx.jpg.

import { FAMILY } from './family';

export type UpdateKind = 'texto' | 'foto' | 'audio' | 'video';

export type Update = {
  id: string;            // único, ej: "2026-05-21-bienvenida"
  fromId: string;        // id en FAMILY
  kind: UpdateKind;
  title?: string;
  text?: string;
  mediaUrl?: string;     // ruta en /public/buzon/... o URL pública
  createdAt: string;     // ISO
};

export const UPDATES: Update[] = [
  {
    id: '2026-05-21-bienvenida',
    fromId: 'andres',
    kind: 'texto',
    title: '¡Feliz cumpleaños, papá!',
    text:
      'Esta es La Casa de Alejandro. La hicimos entre todos para tus 75 años. ' +
      'Tendrás aquí el árbol de la familia, tu obra y un buzón al que todos te ' +
      'iremos mandando cariño. Con todo nuestro amor, tus hijos y nietos.',
    createdAt: '2026-05-21T07:00:00-05:00'
  }
];

export function getUpdatesOrdenados(): Update[] {
  return [...UPDATES].sort(
    (a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
  );
}

export function getAuthor(u: Update) {
  return FAMILY.find((p) => p.id === u.fromId);
}

export function formatRelative(iso: string, now: Date = new Date()): string {
  const t = new Date(iso).getTime();
  const diff = now.getTime() - t;
  if (diff < 0) return 'pronto';
  const min = Math.floor(diff / 60_000);
  if (min < 1) return 'ahora';
  if (min < 60) return `hace ${min} min`;
  const h = Math.floor(min / 60);
  if (h < 24) return `hace ${h} h`;
  const d = Math.floor(h / 24);
  if (d < 7) return `hace ${d} ${d === 1 ? 'día' : 'días'}`;
  return new Date(iso).toLocaleDateString('es-CO', {
    day: 'numeric', month: 'short', year: 'numeric'
  });
}
