// glossary-detailed.ts — STUB (Sub-sprint 1 scaffold)
//
// Páginas de glossary con contenido extendido (no solo definición corta)
// se generan en Sub-sprint 3.

export interface GlossaryDetailedSection {
  heading: string;
  body: string;
}

export interface GlossaryDetailedExample {
  asin: string;
  note: string;
}

export interface GlossaryDetailedFaq {
  q: string;
  a: string;
}

export interface GlossaryDetailedPage {
  slug: string;
  h1: string;
  sections: GlossaryDetailedSection[];
  examples: GlossaryDetailedExample[];
  faqs: GlossaryDetailedFaq[];
  relatedTermSlugs: string[];
  relatedBestSlugs?: string[];
  relatedHowToSlugs?: string[];
  relatedTroubleshootSlugs?: string[];
}

export const GLOSSARY_DETAILED: GlossaryDetailedPage[] = [];

export function findGlossaryDetailed(slug: string): GlossaryDetailedPage | undefined {
  return GLOSSARY_DETAILED.find((p) => p.slug === slug);
}

export function detailedSlugSet(): Set<string> {
  return new Set(GLOSSARY_DETAILED.map((p) => p.slug));
}
