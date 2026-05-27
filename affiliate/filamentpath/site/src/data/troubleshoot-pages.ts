// troubleshoot-pages.ts — STUB (Sub-sprint 1 scaffold)
//
// Troubleshoot pages se generan en Sub-sprint 3 (e.g. "stringing", "warping",
// "first layer not sticking").

export interface TroubleshootCause {
  cause: string;
  fix: string;
}

export interface TroubleshootReplacementPart {
  asin: string;
  name: string;
  note?: string;
}

export interface TroubleshootFaq {
  q: string;
  a: string;
}

export type TroubleshootCategory =
  | 'first-layer'
  | 'extrusion'
  | 'mechanical'
  | 'quality'
  | 'electrical'
  | 'other';

export interface TroubleshootPage {
  slug: string;
  title: string;
  category: TroubleshootCategory;
  productAsin?: string;
  productType?: string;
  symptom?: string;
  causes?: TroubleshootCause[];
  replacementParts?: TroubleshootReplacementPart[];
  faqs?: TroubleshootFaq[];
  relatedHowToSlugs?: string[];
}

export const troubleshootPages: TroubleshootPage[] = [];

export const TROUBLESHOOT_CATEGORIES: Record<TroubleshootCategory, string> = {
  'first-layer': 'First layer',
  extrusion: 'Extrusion',
  mechanical: 'Mechanical',
  quality: 'Print quality',
  electrical: 'Electrical',
  other: 'Other',
};

export function troubleshootBySlug(slug: string): TroubleshootPage | undefined {
  return troubleshootPages.find((p) => p.slug === slug);
}

export function troubleshootsForProduct(_asin: string): TroubleshootPage[] {
  return [];
}

export function genericTroubleshootsForType(_type: string): TroubleshootPage[] {
  return [];
}
