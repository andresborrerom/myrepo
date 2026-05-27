// glossary.ts — STUB (Sub-sprint 1 scaffold)
//
// Glossary breve. Los términos full-detail viven en docs/glosario.md mientras
// no haya una página /glossary/ pública (Sub-sprint 3).
//
// Mantenemos el shape para que el autolink-glossary.mjs post-build no rompa
// — corre sobre dist/, lee este archivo, y si no encuentra términos no hace
// nada (idempotente).

export type GlossaryCategory =
  | 'machine'
  | 'process'
  | 'material'
  | 'workflow'
  | 'other';

export interface GlossaryTerm {
  slug: string;
  term: string;
  aliases?: string[];
  category: GlossaryCategory;
  shortDef: string;
}

export const CATEGORY_ORDER: GlossaryCategory[] = [
  'machine',
  'process',
  'material',
  'workflow',
  'other',
];

export const CATEGORY_LABELS: Record<GlossaryCategory, string> = {
  machine: 'Machine',
  process: 'Process',
  material: 'Material',
  workflow: 'Workflow',
  other: 'Other',
};

export const CATEGORY_DESCRIPTIONS: Record<GlossaryCategory, string> = {
  machine: 'Hardware components and printer mechanics.',
  process: 'Concepts that describe how a print is produced.',
  material: 'Filaments and consumables.',
  workflow: 'Slicing settings and printing workflow.',
  other: 'Miscellaneous 3D printing terms.',
};

export const GLOSSARY: GlossaryTerm[] = [];

export function findTerm(slug: string): GlossaryTerm | undefined {
  return GLOSSARY.find((t) => t.slug === slug);
}

export function termsByCategory(): Map<GlossaryCategory, GlossaryTerm[]> {
  const map = new Map<GlossaryCategory, GlossaryTerm[]>();
  for (const cat of CATEGORY_ORDER) map.set(cat, []);
  for (const t of GLOSSARY) {
    const arr = map.get(t.category) ?? [];
    arr.push(t);
    map.set(t.category, arr);
  }
  return map;
}
