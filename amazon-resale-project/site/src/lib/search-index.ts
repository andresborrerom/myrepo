// Helper de build-time: recolecta entries de las 4 colecciones del sitio
// (products + best-of + compare + review) y produce un index plano que la
// página /search/ serializa a JSON e inyecta inline para búsqueda fuzzy
// client-side con Fuse.js.
//
// Decisión de scope: solo incluimos páginas indexables y con contenido único
// (un producto, un best-of, un compare, un review). NO incluimos páginas
// estáticas como /about, /methodology, /privacy, /quiz, /tools — son pocas
// y el visitante que las busca ya las encuentra en footer/nav. Esto mantiene
// el index limpio (~150 entries) y evita inflar matches con páginas
// genéricas.

import { getCollection } from 'astro:content';
import { bestPages } from '../data/best-pages';
import { comparePages } from '../data/compare-pages';
import { reviewPages } from '../data/review-pages';

export type SearchKind = 'product' | 'best-of' | 'compare' | 'review';

export interface SearchEntry {
  /** Tipo de página — alimenta el badge en la UI y permite filtrar. */
  kind: SearchKind;
  /** Título visible del result card. */
  title: string;
  /** URL relativa, incluyendo trailing slash (el sitio usa format: 'directory'). */
  url: string;
  /** Una línea de contexto. Limitado a ~200 chars en build para mantener JSON chico. */
  context: string;
  /**
   * Tags para boost de matching: tags propios del producto, palabras-clave del
   * best-of, marcas de los productos comparados, etc. No se renderiza, solo
   * alimenta el scoring de Fuse.
   */
  tags: string[];
}

/**
 * Construye el array completo de entries para el index de búsqueda.
 *
 * Ejecuta en build-time (lo importa src/pages/search.astro en su frontmatter).
 * El array resultante se serializa con JSON.stringify y se inyecta inline en
 * la página — no hay fetch runtime.
 */
export async function buildSearchIndex(): Promise<SearchEntry[]> {
  const products = await getCollection('products');

  // Lookup ASIN → producto para resolver compare/review entries que solo
  // guardan ASINs y no los datos del producto.
  const productByAsin = new Map(products.map((p) => [p.data.asin, p]));

  const entries: SearchEntry[] = [];

  // -------- Products --------
  for (const p of products) {
    const d = p.data;
    // Contexto: brand + type + un par de pros si existen, recortado a ~180 chars.
    const proHint = d.pros[0] ? ` ${d.pros[0]}` : '';
    const context = truncate(
      `${d.brand} ${labelForProductType(d.type)} — $${d.price}.${proHint}`,
      180
    );
    entries.push({
      kind: 'product',
      title: d.name,
      url: `/products/${d.asin}/`,
      context,
      tags: [
        d.brand.toLowerCase(),
        labelForProductType(d.type),
        ...d.tags,
        ...d.best_for,
      ],
    });
  }

  // -------- Best-of --------
  for (const b of bestPages) {
    entries.push({
      kind: 'best-of',
      title: b.title,
      url: `/best/${b.slug}/`,
      context: truncate(b.description, 200),
      // Tokens del slug = keywords ricas para el matching ("under-500", "milk-drinks", etc.).
      tags: b.slug.split('-'),
    });
  }

  // -------- Compare --------
  for (const c of comparePages) {
    const a = productByAsin.get(c.asinA);
    const bProd = productByAsin.get(c.asinB);
    // Si una comparación apunta a un ASIN inexistente, skip silencioso —
    // el slug de la página tampoco se genera, así que no la queremos en search.
    if (!a || !bProd) continue;
    const title = `${a.data.name} vs ${bProd.data.name}`;
    entries.push({
      kind: 'compare',
      title,
      url: `/compare/${c.slug}/`,
      context: truncate(c.intro, 200),
      tags: [
        a.data.brand.toLowerCase(),
        bProd.data.brand.toLowerCase(),
        a.data.name.toLowerCase(),
        bProd.data.name.toLowerCase(),
        'compare',
        'vs',
      ],
    });
  }

  // -------- Review --------
  for (const r of reviewPages) {
    const prod = productByAsin.get(r.productAsin);
    if (!prod) continue;
    // Título limpio sin el "(2026 Verdict)" cuando aparece.
    const title = r.title.replace(/\s*\(2026 Verdict\)\s*$/, '');
    entries.push({
      kind: 'review',
      title,
      url: `/review/${r.slug}/`,
      context: truncate(r.description, 200),
      tags: [
        prod.data.brand.toLowerCase(),
        prod.data.name.toLowerCase(),
        r.useCase,
        'review',
        'worth-it',
      ],
    });
  }

  return entries;
}

// ---------- Helpers internos ----------

function truncate(s: string, max: number): string {
  if (!s) return '';
  if (s.length <= max) return s;
  // Cortamos en el último espacio para no partir palabras.
  const slice = s.slice(0, max);
  const lastSpace = slice.lastIndexOf(' ');
  return (lastSpace > max * 0.7 ? slice.slice(0, lastSpace) : slice).trim() + '…';
}

function labelForProductType(type: string): string {
  // Convertimos 'espresso-machine' → 'espresso machine' para que la búsqueda
  // por palabra natural ("espresso machine") matchee sin trucos.
  return type.replace(/-/g, ' ');
}
