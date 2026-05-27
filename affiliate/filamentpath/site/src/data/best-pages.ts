// best-pages.ts — STUB (Sub-sprint 1 scaffold)
//
// Best-of pages para filamentpath se generan en Sub-sprint 3 después de
// KGR validations verdes. Por ahora dejamos un stub vacío con la misma
// export shape que el template baristapath original, así Sub-sprint 3
// puede expandir sin tocar consumidores.
//
// Nota: el `filter` recibe un product `data` (frontmatter del .mdx) — el
// shape exacto dependerá del schema final en src/content/config.ts.

export interface BestPage {
  slug: string;
  title: string;
  description: string;
  intro: string;
  filter: (productData: Record<string, unknown>) => boolean;
  sort?: (a: Record<string, unknown>, b: Record<string, unknown>) => number;
}

export const bestPages: BestPage[] = [];
