// category-pages.ts — STUB (Sub-sprint 1 scaffold)
//
// Category hub pages para filamentpath se generan en Sub-sprint 3.

export interface CategoryBuyingGuideTopic {
  heading: string;
  body: string;
}

export interface CategoryFaq {
  q: string;
  a: string;
}

export interface CategoryMeta {
  slug: string;
  displayName: string;
  type: string;
  description: string;
  buyingGuide?: CategoryBuyingGuideTopic[];
  faqs?: CategoryFaq[];
}

export const CATEGORY_META: CategoryMeta[] = [];

export function categoryMetaForType(_type: string): CategoryMeta | null {
  return null;
}

export function categorySlugForType(_type: string): string | null {
  return null;
}
