// Related-content helpers for internal linking between the 4 page kinds
// (product, best, compare, review). Each function returns a deduped,
// length-capped list of links pointing at other pages on the site.
//
// Design goals:
//   - Pure functions of the collections + data files (no I/O at request time).
//   - Deterministic ordering so the build output is stable across runs.
//   - Max 7 links per page, min 3 to render (sub-3 returns an empty array
//     and the template skips the section).
//   - No self-links and no duplicate hrefs within a single section.

import { getCollection, type CollectionEntry } from 'astro:content';
import { bestPages } from '../data/best-pages';
import { comparePages } from '../data/compare-pages';
import { reviewPages } from '../data/review-pages';
import { brandMetaFor } from '../data/brand-pages';
import { categoryMetaForType } from '../data/category-pages';
import { howToPages, howTosForProduct } from '../data/how-to-pages';
import { troubleshootPages, troubleshootsForProduct } from '../data/troubleshoot-pages';

export type RelatedKind =
  | 'product'
  | 'best'
  | 'compare'
  | 'review'
  | 'brand'
  | 'category'
  | 'glossary'
  | 'how-to'
  | 'troubleshoot';

export interface RelatedLink {
  href: string;
  title: string;
  kind: RelatedKind;
}

const MAX_LINKS = 7;
const MIN_LINKS = 3;

// ---------------------------------------------------------------
// Internal cache so we only run getCollection() once per build, no
// matter how many pages call into this module.
// ---------------------------------------------------------------
type Product = CollectionEntry<'products'>;
let productsCache: Product[] | null = null;
async function loadProducts(): Promise<Product[]> {
  if (productsCache === null) {
    productsCache = await getCollection('products');
  }
  return productsCache;
}

// Pre-compute the set of ASINs each best-of page contains. This is a
// closure over the filter functions, so it must run after the products
// collection is loaded — wrapped in a memoized async helper.
let bestPageAsinsCache: Map<string, Set<string>> | null = null;
async function bestPageAsins(): Promise<Map<string, Set<string>>> {
  if (bestPageAsinsCache !== null) return bestPageAsinsCache;
  const products = await loadProducts();
  const map = new Map<string, Set<string>>();
  for (const page of bestPages) {
    const asins = new Set<string>();
    for (const product of products) {
      if (page.filter(product.data)) {
        asins.add(product.data.asin);
      }
    }
    map.set(page.slug, asins);
  }
  bestPageAsinsCache = map;
  return map;
}

// Lookup helpers ------------------------------------------------------

function reviewBySlug(slug: string) {
  return reviewPages.find((r) => r.slug === slug);
}

function reviewByProductAsin(asin: string) {
  return reviewPages.find((r) => r.productAsin === asin);
}

function compareBySlug(slug: string) {
  return comparePages.find((c) => c.slug === slug);
}

function bestBySlug(slug: string) {
  return bestPages.find((b) => b.slug === slug);
}

// Take elements from `source` and push them into `target` while skipping
// dupes (by href) and the current page (by `selfHref`). Caps at `limit`.
function pushUnique(
  target: RelatedLink[],
  source: RelatedLink[],
  limit: number,
  selfHref: string,
): void {
  const seen = new Set(target.map((l) => l.href));
  for (const link of source) {
    if (target.length >= limit) break;
    if (link.href === selfHref) continue;
    if (seen.has(link.href)) continue;
    target.push(link);
    seen.add(link.href);
  }
}

// Finalize a list: enforce the MIN_LINKS floor by returning [] if not met.
function finalize(links: RelatedLink[]): RelatedLink[] {
  if (links.length < MIN_LINKS) return [];
  return links.slice(0, MAX_LINKS);
}

// ---------------------------------------------------------------
// PRODUCT PAGE
// ---------------------------------------------------------------
// 1 brand page (if brand has a dedicated page), 2-3 best-of where ASIN
// appears, 1-2 compare pages featuring ASIN, 1-2 reviews where ASIN is
// the productAsin or in alternativeAsins.
export async function relatedForProduct(asin: string): Promise<RelatedLink[]> {
  const asinMap = await bestPageAsins();
  const selfHref = `/products/${asin}/`;
  const out: RelatedLink[] = [];

  // 0a) Category page link — siempre presente (todos los products tienen
  // un type que matchea una category con >=3 products). Va primero para
  // que aparezca arriba del bloque de related content; el usuario que
  // está mirando un product probablemente quiere ver más del mismo type.
  const products = await loadProducts();
  const product = products.find((p) => p.data.asin === asin);
  if (product) {
    const categoryMeta = categoryMetaForType(product.data.type);
    if (categoryMeta) {
      pushUnique(
        out,
        [
          {
            href: `/categories/${categoryMeta.slug}/`,
            title: `More ${categoryMeta.displayName.toLowerCase()}`,
            kind: 'category',
          },
        ],
        MAX_LINKS,
        selfHref,
      );
    }
  }

  // 0b) Brand page link — solo si la brand del product tiene página propia
  // (≥2 products en el catalog). Complementa el category link de arriba.
  if (product) {
    const brandMeta = brandMetaFor(product.data.brand);
    if (brandMeta) {
      pushUnique(
        out,
        [
          {
            href: `/brands/${brandMeta.slug}/`,
            title: `More from ${brandMeta.name}`,
            kind: 'brand',
          },
        ],
        MAX_LINKS,
        selfHref,
      );
    }
  }

  // 1) Up to 2 how-to pages for the product (high-intent post-purchase
  // content: "now that you own this, here is how to descale it"). Empujadas
  // antes que best/compare porque un owner que ya compró el producto se
  // beneficia más de la guía que de otro comparison.
  const howToMatches: RelatedLink[] = howTosForProduct(asin).map((h) => ({
    href: `/how-to/${h.slug}/`,
    title: h.title,
    kind: 'how-to' as const,
  }));
  pushUnique(out, howToMatches.slice(0, 2), MAX_LINKS, selfHref);

  // 2) Up to 2 troubleshoot pages for the product. Owners que aterrizan en
  // el product page pueden estar researching un problema más que considerando
  // la compra — surface los troubleshoot links explícitamente.
  const tsMatches: RelatedLink[] = troubleshootsForProduct(asin).map((t) => ({
    href: `/troubleshoot/${t.slug}/`,
    title: t.title,
    kind: 'troubleshoot' as const,
  }));
  pushUnique(out, tsMatches.slice(0, 2), MAX_LINKS, selfHref);

  // 3) Up to 2 best-of pages where this product appears.
  const bestMatches: RelatedLink[] = [];
  for (const page of bestPages) {
    const asins = asinMap.get(page.slug);
    if (asins && asins.has(asin)) {
      bestMatches.push({
        href: `/best/${page.slug}/`,
        title: page.title,
        kind: 'best',
      });
    }
  }
  pushUnique(out, bestMatches.slice(0, 2), MAX_LINKS, selfHref);

  // 4) Up to 2 compare pages where this ASIN is involved.
  const compareMatches: RelatedLink[] = [];
  for (const comp of comparePages) {
    if (comp.asinA === asin || comp.asinB === asin) {
      const products = await loadProducts();
      const byAsin = new Map(products.map((p) => [p.data.asin, p]));
      const a = byAsin.get(comp.asinA);
      const b = byAsin.get(comp.asinB);
      if (!a || !b) continue;
      compareMatches.push({
        href: `/compare/${comp.slug}/`,
        title: `${a.data.name} vs ${b.data.name}`,
        kind: 'compare',
      });
    }
  }
  pushUnique(out, compareMatches.slice(0, 2), MAX_LINKS, selfHref);

  // 5) Up to 2 reviews where the product is the subject or an alternative.
  const reviewMatches: RelatedLink[] = [];
  for (const r of reviewPages) {
    if (r.productAsin === asin || r.alternativeAsins.includes(asin)) {
      reviewMatches.push({
        href: `/review/${r.slug}/`,
        title: r.title,
        kind: 'review',
      });
    }
  }
  pushUnique(out, reviewMatches.slice(0, 2), MAX_LINKS, selfHref);

  return finalize(out);
}

// ---------------------------------------------------------------
// HOW-TO PAGE
// ---------------------------------------------------------------
// 1 product page (si la guía es product-specific), 1-2 troubleshoot pages
// relacionadas, 1-2 how-to pages adicionales (mismo topic o mismo product).
export async function relatedForHowTo(slug: string): Promise<RelatedLink[]> {
  const page = howToPages.find((p) => p.slug === slug);
  if (!page) return [];
  const selfHref = `/how-to/${slug}/`;
  const out: RelatedLink[] = [];

  const products = await loadProducts();
  const byAsin = new Map(products.map((p) => [p.data.asin, p]));

  // 1) Product page link si aplica.
  if (page.productAsin) {
    const subject = byAsin.get(page.productAsin);
    if (subject) {
      pushUnique(
        out,
        [
          {
            href: `/products/${subject.data.asin}/`,
            title: `${subject.data.name} — Specs, Pros & Cons`,
            kind: 'product',
          },
        ],
        MAX_LINKS,
        selfHref,
      );
    }
  }

  // 2) Troubleshoot pages explícitamente relacionadas (declaradas en la data).
  if (page.relatedTroubleshootSlugs) {
    const explicitTs: RelatedLink[] = [];
    for (const tsSlug of page.relatedTroubleshootSlugs) {
      const ts = troubleshootPages.find((t) => t.slug === tsSlug);
      if (ts) {
        explicitTs.push({
          href: `/troubleshoot/${ts.slug}/`,
          title: ts.title,
          kind: 'troubleshoot',
        });
      }
    }
    pushUnique(out, explicitTs.slice(0, 2), MAX_LINKS, selfHref);
  }

  // 3) Otras how-to pages del mismo topic (descaling, dialing-in, etc).
  const sameTopic: RelatedLink[] = howToPages
    .filter((h) => h.slug !== slug && h.topic === page.topic)
    .slice(0, 2)
    .map((h) => ({ href: `/how-to/${h.slug}/`, title: h.title, kind: 'how-to' }));
  pushUnique(out, sameTopic, MAX_LINKS, selfHref);

  // 4) Si la guía es product-specific, otros productos del mismo brand pueden
  // tener guías similares (e.g. "how to descale Bambino" → Bambino Plus guide).
  if (page.productAsin) {
    const subject = byAsin.get(page.productAsin);
    if (subject) {
      const sameBrandHowTos: RelatedLink[] = howToPages
        .filter((h) => {
          if (h.slug === slug) return false;
          if (!h.productAsin) return false;
          const other = byAsin.get(h.productAsin);
          return other?.data.brand === subject.data.brand;
        })
        .slice(0, 2)
        .map((h) => ({ href: `/how-to/${h.slug}/`, title: h.title, kind: 'how-to' as const }));
      pushUnique(out, sameBrandHowTos, MAX_LINKS, selfHref);
    }
  }

  return finalize(out);
}

// ---------------------------------------------------------------
// TROUBLESHOOT PAGE
// ---------------------------------------------------------------
// 1 product page (si product-specific), 1-2 how-to pages relacionadas
// (prevention guides), 1-2 troubleshoot pages adicionales.
export async function relatedForTroubleshoot(slug: string): Promise<RelatedLink[]> {
  const page = troubleshootPages.find((p) => p.slug === slug);
  if (!page) return [];
  const selfHref = `/troubleshoot/${slug}/`;
  const out: RelatedLink[] = [];

  const products = await loadProducts();
  const byAsin = new Map(products.map((p) => [p.data.asin, p]));

  // 1) Product page link.
  if (page.productAsin) {
    const subject = byAsin.get(page.productAsin);
    if (subject) {
      pushUnique(
        out,
        [
          {
            href: `/products/${subject.data.asin}/`,
            title: `${subject.data.name} — Specs, Pros & Cons`,
            kind: 'product',
          },
        ],
        MAX_LINKS,
        selfHref,
      );
    }
  }

  // 2) How-to pages explícitamente relacionadas (prevención del problema).
  if (page.relatedHowToSlugs) {
    const explicitHowTos: RelatedLink[] = [];
    for (const htSlug of page.relatedHowToSlugs) {
      const ht = howToPages.find((h) => h.slug === htSlug);
      if (ht) {
        explicitHowTos.push({
          href: `/how-to/${ht.slug}/`,
          title: ht.title,
          kind: 'how-to',
        });
      }
    }
    pushUnique(out, explicitHowTos.slice(0, 2), MAX_LINKS, selfHref);
  }

  // 3) Otras troubleshoot pages del mismo product o misma category.
  const sameProduct: RelatedLink[] = page.productAsin
    ? troubleshootPages
        .filter((t) => t.slug !== slug && t.productAsin === page.productAsin)
        .slice(0, 2)
        .map((t) => ({ href: `/troubleshoot/${t.slug}/`, title: t.title, kind: 'troubleshoot' as const }))
    : [];
  pushUnique(out, sameProduct, MAX_LINKS, selfHref);

  const sameCategory: RelatedLink[] = troubleshootPages
    .filter((t) => t.slug !== slug && t.category === page.category)
    .slice(0, 2)
    .map((t) => ({ href: `/troubleshoot/${t.slug}/`, title: t.title, kind: 'troubleshoot' as const }));
  pushUnique(out, sameCategory, MAX_LINKS, selfHref);

  return finalize(out);
}

// ---------------------------------------------------------------
// BEST-OF PAGE
// ---------------------------------------------------------------
// 1-2 adjacent best-of pages (same product type, different filter),
// 2-3 compare pages touching this page's top picks, 1-2 reviews of
// products in this page's top picks.
export async function relatedForBest(slug: string): Promise<RelatedLink[]> {
  const page = bestBySlug(slug);
  if (!page) return [];
  const asinMap = await bestPageAsins();
  const matchedAsins = asinMap.get(slug) ?? new Set<string>();
  const selfHref = `/best/${slug}/`;
  const out: RelatedLink[] = [];

  // Determine the dominant product type for this page (espresso-machine,
  // grinder, accessory, brewer) so we can pull adjacent best-of pages of
  // the same type.
  const products = await loadProducts();
  const matchedProducts = products.filter((p) => matchedAsins.has(p.data.asin));
  const typeCounts = new Map<string, number>();
  for (const p of matchedProducts) {
    typeCounts.set(p.data.type, (typeCounts.get(p.data.type) ?? 0) + 1);
  }
  const dominantType = [...typeCounts.entries()].sort((a, b) => b[1] - a[1])[0]?.[0];

  // 0) Category page link — basado en el dominantType. Va primero para
  // dar al usuario un escape hacia el hub de la categoría, complementa
  // los best-of adjacentes que vienen después.
  if (dominantType) {
    const categoryMeta = categoryMetaForType(dominantType);
    if (categoryMeta) {
      pushUnique(
        out,
        [
          {
            href: `/categories/${categoryMeta.slug}/`,
            title: `All ${categoryMeta.displayName.toLowerCase()} in our catalog`,
            kind: 'category',
          },
        ],
        MAX_LINKS,
        selfHref,
      );
    }
  }

  // 1) 1-2 adjacent best-of pages (same dominant product type).
  if (dominantType) {
    const adjacent: RelatedLink[] = [];
    for (const other of bestPages) {
      if (other.slug === slug) continue;
      const otherAsins = asinMap.get(other.slug);
      if (!otherAsins || otherAsins.size === 0) continue;
      const sample = products.find((p) => otherAsins.has(p.data.asin));
      if (!sample) continue;
      if (sample.data.type === dominantType) {
        adjacent.push({
          href: `/best/${other.slug}/`,
          title: other.title,
          kind: 'best',
        });
      }
    }
    pushUnique(out, adjacent.slice(0, 2), MAX_LINKS, selfHref);
  }

  // Take a "top 5" sample for compare/review lookup. The data file's sort
  // is applied at build-time in [slug].astro; here we re-sort with the
  // same predicate to keep parity.
  const topProducts = page.sort
    ? [...matchedProducts].sort((a, b) => page.sort!(a.data, b.data))
    : matchedProducts;
  const topAsins = new Set(topProducts.slice(0, 5).map((p) => p.data.asin));

  // 2) 2-3 compare pages involving the top picks.
  const byAsin = new Map(products.map((p) => [p.data.asin, p]));
  const compareMatches: RelatedLink[] = [];
  for (const comp of comparePages) {
    if (topAsins.has(comp.asinA) || topAsins.has(comp.asinB)) {
      const a = byAsin.get(comp.asinA);
      const b = byAsin.get(comp.asinB);
      if (!a || !b) continue;
      compareMatches.push({
        href: `/compare/${comp.slug}/`,
        title: `${a.data.name} vs ${b.data.name}`,
        kind: 'compare',
      });
    }
  }
  pushUnique(out, compareMatches.slice(0, 3), MAX_LINKS, selfHref);

  // 3) 1-2 review pages whose subject is in the top picks.
  const reviewMatches: RelatedLink[] = [];
  for (const r of reviewPages) {
    if (topAsins.has(r.productAsin)) {
      reviewMatches.push({
        href: `/review/${r.slug}/`,
        title: r.title,
        kind: 'review',
      });
    }
  }
  pushUnique(out, reviewMatches.slice(0, 2), MAX_LINKS, selfHref);

  return finalize(out);
}

// ---------------------------------------------------------------
// COMPARE PAGE
// ---------------------------------------------------------------
// 2 best-of pages (one each, covering the two compared products),
// 2 reviews (one per compared product),
// 1 adjacent compare page (same segment, different competitor).
export async function relatedForCompare(slug: string): Promise<RelatedLink[]> {
  const comp = compareBySlug(slug);
  if (!comp) return [];
  const asinMap = await bestPageAsins();
  const selfHref = `/compare/${slug}/`;
  const out: RelatedLink[] = [];

  // 0) Category page link — solo si ambos products comparados son del
  // mismo type (caso común: espresso machine vs espresso machine). Si
  // son types distintos (cross-category compare), no agregamos category
  // link porque no hay una sola category obvia.
  const productsForCategory = await loadProducts();
  const byAsinForCategory = new Map(productsForCategory.map((p) => [p.data.asin, p]));
  const productA = byAsinForCategory.get(comp.asinA);
  const productB = byAsinForCategory.get(comp.asinB);
  if (productA && productB && productA.data.type === productB.data.type) {
    const categoryMeta = categoryMetaForType(productA.data.type);
    if (categoryMeta) {
      pushUnique(
        out,
        [
          {
            href: `/categories/${categoryMeta.slug}/`,
            title: `All ${categoryMeta.displayName.toLowerCase()} in our catalog`,
            kind: 'category',
          },
        ],
        MAX_LINKS,
        selfHref,
      );
    }
  }

  // 1) Up to 2 best-of pages covering asinA / asinB. Prefer one per ASIN.
  const bestMatchesA: RelatedLink[] = [];
  const bestMatchesB: RelatedLink[] = [];
  for (const page of bestPages) {
    const asins = asinMap.get(page.slug);
    if (!asins) continue;
    if (asins.has(comp.asinA)) {
      bestMatchesA.push({
        href: `/best/${page.slug}/`,
        title: page.title,
        kind: 'best',
      });
    }
    if (asins.has(comp.asinB)) {
      bestMatchesB.push({
        href: `/best/${page.slug}/`,
        title: page.title,
        kind: 'best',
      });
    }
  }
  // Take one best-of for each product if available, falling back to the
  // other product's list if one side has nothing.
  const bestPicks: RelatedLink[] = [];
  if (bestMatchesA[0]) bestPicks.push(bestMatchesA[0]);
  if (bestMatchesB[0] && bestMatchesB[0].href !== bestMatchesA[0]?.href) {
    bestPicks.push(bestMatchesB[0]);
  } else if (bestMatchesA[1]) {
    bestPicks.push(bestMatchesA[1]);
  } else if (bestMatchesB[1]) {
    bestPicks.push(bestMatchesB[1]);
  }
  pushUnique(out, bestPicks, MAX_LINKS, selfHref);

  // 2) Up to 2 reviews — one per product if both have a review.
  const reviewMatches: RelatedLink[] = [];
  const revA = reviewPages.find((r) => r.productAsin === comp.asinA);
  const revB = reviewPages.find((r) => r.productAsin === comp.asinB);
  if (revA) {
    reviewMatches.push({
      href: `/review/${revA.slug}/`,
      title: revA.title,
      kind: 'review',
    });
  }
  if (revB) {
    reviewMatches.push({
      href: `/review/${revB.slug}/`,
      title: revB.title,
      kind: 'review',
    });
  }
  pushUnique(out, reviewMatches, MAX_LINKS, selfHref);

  // 3) 1 adjacent compare page — another comparison that involves either
  // of the two ASINs and is not the current page.
  const adjacentCompare: RelatedLink[] = [];
  const products = await loadProducts();
  const byAsin = new Map(products.map((p) => [p.data.asin, p]));
  for (const other of comparePages) {
    if (other.slug === slug) continue;
    const involvesA = other.asinA === comp.asinA || other.asinB === comp.asinA;
    const involvesB = other.asinA === comp.asinB || other.asinB === comp.asinB;
    if (involvesA || involvesB) {
      const a = byAsin.get(other.asinA);
      const b = byAsin.get(other.asinB);
      if (!a || !b) continue;
      adjacentCompare.push({
        href: `/compare/${other.slug}/`,
        title: `${a.data.name} vs ${b.data.name}`,
        kind: 'compare',
      });
    }
  }
  pushUnique(out, adjacentCompare.slice(0, 1), MAX_LINKS, selfHref);

  return finalize(out);
}

// ---------------------------------------------------------------
// REVIEW PAGE
// ---------------------------------------------------------------
// 1 product page (the subject), 2 best-of pages featuring the product,
// 1-2 compare pages of the product vs alternatives, 1-2 reviews of the
// listed alternatives.
export async function relatedForReview(slug: string): Promise<RelatedLink[]> {
  const review = reviewBySlug(slug);
  if (!review) return [];
  const asinMap = await bestPageAsins();
  const selfHref = `/review/${slug}/`;
  const out: RelatedLink[] = [];

  const products = await loadProducts();
  const byAsin = new Map(products.map((p) => [p.data.asin, p]));
  const subject = byAsin.get(review.productAsin);

  // 1) 1 link to the subject product page.
  if (subject) {
    pushUnique(
      out,
      [
        {
          href: `/products/${subject.data.asin}/`,
          title: `${subject.data.name} — Specs, Pros & Cons`,
          kind: 'product',
        },
      ],
      MAX_LINKS,
      selfHref,
    );
  }

  // 2) Up to 2 best-of pages featuring the reviewed product.
  const bestMatches: RelatedLink[] = [];
  for (const page of bestPages) {
    const asins = asinMap.get(page.slug);
    if (asins && asins.has(review.productAsin)) {
      bestMatches.push({
        href: `/best/${page.slug}/`,
        title: page.title,
        kind: 'best',
      });
    }
  }
  pushUnique(out, bestMatches.slice(0, 2), MAX_LINKS, selfHref);

  // 3) Up to 2 compare pages where the product faces one of its alternatives.
  const altSet = new Set(review.alternativeAsins);
  const compareMatches: RelatedLink[] = [];
  for (const comp of comparePages) {
    const involvesSubject =
      comp.asinA === review.productAsin || comp.asinB === review.productAsin;
    if (!involvesSubject) continue;
    const otherAsin = comp.asinA === review.productAsin ? comp.asinB : comp.asinA;
    // Prefer comparisons against the listed alternatives but accept any
    // compare page involving the subject as a fallback.
    if (altSet.has(otherAsin) || true) {
      const a = byAsin.get(comp.asinA);
      const b = byAsin.get(comp.asinB);
      if (!a || !b) continue;
      compareMatches.push({
        href: `/compare/${comp.slug}/`,
        title: `${a.data.name} vs ${b.data.name}`,
        kind: 'compare',
      });
    }
  }
  pushUnique(out, compareMatches.slice(0, 2), MAX_LINKS, selfHref);

  // 4) Up to 2 reviews of the listed alternatives.
  const altReviewMatches: RelatedLink[] = [];
  for (const altAsin of review.alternativeAsins) {
    const altReview = reviewByProductAsin(altAsin);
    if (altReview) {
      altReviewMatches.push({
        href: `/review/${altReview.slug}/`,
        title: altReview.title,
        kind: 'review',
      });
    }
  }
  pushUnique(out, altReviewMatches.slice(0, 2), MAX_LINKS, selfHref);

  return finalize(out);
}
