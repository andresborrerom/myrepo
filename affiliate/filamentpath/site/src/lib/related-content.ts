// related-content.ts — MINIMAL (Sub-sprint 1 scaffold)
//
// Sub-sprint 1 solo tiene product pages (no best/compare/review/how-to/troubleshoot).
// `relatedForProduct` devuelve hasta 4 productos del mismo `type` distintos del
// actual, para no dejar product pages como dead-ends.
//
// Sub-sprint 3 expandirá esto cuando aparezcan best-of, compare, etc.

import { getCollection, type CollectionEntry } from 'astro:content';

export type RelatedKind = 'product';

export interface RelatedLink {
  href: string;
  title: string;
  kind: RelatedKind;
}

type Product = CollectionEntry<'products'>;
let productsCache: Product[] | null = null;

async function loadProducts(): Promise<Product[]> {
  if (productsCache === null) {
    productsCache = await getCollection('products');
  }
  return productsCache;
}

const MAX_LINKS = 4;

export async function relatedForProduct(asin: string): Promise<RelatedLink[]> {
  const products = await loadProducts();
  const current = products.find((p) => p.data.asin === asin);
  if (!current) return [];

  // Stable order: same-type products, deterministic by ASIN.
  const sameType = products
    .filter((p) => p.data.asin !== asin && p.data.type === current.data.type)
    .sort((a, b) => a.data.asin.localeCompare(b.data.asin))
    .slice(0, MAX_LINKS);

  return sameType.map((p) => ({
    href: `/products/${p.data.asin}/`,
    title: p.data.name,
    kind: 'product' as const,
  }));
}
