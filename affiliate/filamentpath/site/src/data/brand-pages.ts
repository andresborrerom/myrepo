// brand-pages.ts — STUB (Sub-sprint 1 scaffold)
//
// Brand hub pages para filamentpath se generan en Sub-sprint 3. Por ahora
// stub vacío + helpers que devuelven `null` para no romper consumidores
// futuros.

export interface BrandFaq {
  q: string;
  a: string;
}

export interface BrandMeta {
  slug: string;
  name: string;
  description: string;
  intro?: string;
  faqs?: BrandFaq[];
}

export const BRAND_META: BrandMeta[] = [];

export const SINGLE_PRODUCT_BRANDS: string[] = [];

export function brandSlug(brandName: string): string {
  return brandName
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-|-$/g, '');
}

export function brandMetaFor(_brandName: string): BrandMeta | null {
  return null;
}
