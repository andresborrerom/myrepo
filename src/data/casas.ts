// Las 5 casas que Alejandro construyó para sus hijos. Una por hijo.
// Editar con dirección/barrio aproximado, año, anécdota corta. Foto opcional.

import { HIJOS } from './family';

export type Casa = {
  hijoId: string;
  apodo?: string;          // ej: "La casa del patio"
  barrio?: string;         // ej: "Cedritos, Bogotá"
  yearBuilt?: number;      // año aproximado de construcción
  story?: string;          // anécdota corta
  photo?: string;          // ruta en /public/casas/xxx.jpg
};

// Sembradas vacías por hijo: cada uno llena la suya.
export const CASAS: Casa[] = HIJOS.map((h) => ({
  hijoId: h.id,
  apodo: undefined,
  barrio: undefined,
  yearBuilt: undefined,
  story: undefined,
  photo: undefined
}));

export function getCasaDe(hijoId: string): Casa | undefined {
  return CASAS.find((c) => c.hijoId === hijoId);
}
