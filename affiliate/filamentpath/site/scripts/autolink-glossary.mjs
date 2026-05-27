#!/usr/bin/env node
// scripts/autolink-glossary.mjs
//
// Post-build transform: lee HTML files generados en dist/, busca menciones
// de términos del glossary (term + aliases) y enlaza la PRIMERA mención de
// cada término por página a /glossary/#<slug>.
//
// Por qué post-build (no build-time):
//   - Trabaja sobre HTML rendered final → simple regex sobre string.
//   - No requiere refactor de los 7+ templates de Astro.
//   - Toggle on/off trivial (basta no correr el script).
//   - Idempotente: si corre dos veces, los anchors ya existen y los matches
//     subsecuentes caen dentro de un <a> (skip rule) y no se duplican.
//
// Anti-gray-hat:
//   - Cap "first-mention-per-page" — un solo link por término por página,
//     evitamos el over-linking que Google penaliza.
//   - Skip-list de términos demasiado genéricos.
//   - No tocamos headings, code blocks, ni la propia /glossary/.

import fs from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const SITE_ROOT = path.resolve(__dirname, '..');
const DIST_DIR = path.join(SITE_ROOT, 'dist');
const GLOSSARY_TS = path.join(SITE_ROOT, 'src/data/glossary.ts');
const GLOSSARY_DETAILED_TS = path.join(SITE_ROOT, 'src/data/glossary-detailed.ts');

// ---------------------------------------------------------------------------
// 1. Parse glossary.ts (regex; sin deps de TS loader).
//
// El archivo es un export const GLOSSARY: GlossaryTerm[] = [...] con literales
// de objeto. Extraemos slug, term, aliases con regex que asume el formato del
// archivo fuente — si cambia el formato de glossary.ts, este parser falla
// ruidosamente (throw) en vez de silenciosamente.
// ---------------------------------------------------------------------------

async function loadGlossaryTerms() {
  const source = await fs.readFile(GLOSSARY_TS, 'utf8');

  // Cada entry empieza con `slug: '<slug>',` seguido inmediatamente de
  // `term: '<term>',`. Después puede venir cualquier set de fields incluyendo
  // `aliases: [...]`. El final del entry no es fácil de detectar (bracket
  // matching sería ideal pero overkill). En su lugar, identificamos cada
  // entry por su (slug, term) y luego buscamos su aliases hacia adelante,
  // limitando la búsqueda hasta el próximo `slug:` para no pisar al siguiente.
  const entries = [];

  // Soporte para apóstrofes escapados dentro de strings TS:
  //   'Breville\'s thermoblock-style heater' → captura todo hasta el next ' no-escapado.
  const STR = "'(?:\\\\.|[^'\\\\])*'";
  // slugs/terms en este file no llevan apóstrofes, así que basta [^']+, pero
  // usamos el match seguro por si alguien agrega slug con apóstrofe en futuro.
  const headerRegex = new RegExp(
    `slug:\\s*'([^']+)',\\s*term:\\s*(${STR}),`,
    'g',
  );

  const headers = [];
  let h;
  while ((h = headerRegex.exec(source)) !== null) {
    headers.push({
      slug: h[1],
      // Unwrap el term string: quita las comillas externas y desescapa \'.
      term: unwrapTsString(h[2]),
      headerStart: h.index,
    });
  }

  for (let i = 0; i < headers.length; i++) {
    const start = headers[i].headerStart;
    const end = i + 1 < headers.length ? headers[i + 1].headerStart : source.length;
    const slice = source.slice(start, end);

    // aliases: ['a', 'b\'c'] — captura el array literal de strings.
    const aliasesMatch = slice.match(/aliases:\s*\[([\s\S]*?)\]/);
    const aliases = [];
    if (aliasesMatch) {
      const aliasContent = aliasesMatch[1];
      const aliasStringRegex = new RegExp(STR, 'g');
      let a;
      while ((a = aliasStringRegex.exec(aliasContent)) !== null) {
        aliases.push(unwrapTsString(a[0]));
      }
    }

    entries.push({ slug: headers[i].slug, term: headers[i].term, aliases });
  }

  // Glossary vacío es aceptable en sub-sprint 1 — el script hace no-op.
  // Si en cualquier otra etapa esperás entries y no las hay, eso es un bug
  // detectable porque el log de main() lo va a anunciar.
  return entries;
}

function unwrapTsString(raw) {
  // raw incluye las comillas; quita primera y última, des-escapa \' y \\.
  const inner = raw.slice(1, -1);
  return inner.replace(/\\(.)/g, '$1');
}

// ---------------------------------------------------------------------------
// 1b. Parse glossary-detailed.ts — extrae solo los slugs que tienen página
// dedicada. Estos enlazan a /glossary/[slug]/ en lugar de /glossary/#slug.
//
// Si glossary-detailed.ts no existe (toggle off, primera vez), devuelve un
// Set vacío y todo cae al comportamiento anchor-based legacy.
// ---------------------------------------------------------------------------

async function loadDetailedSlugs() {
  let source;
  try {
    source = await fs.readFile(GLOSSARY_DETAILED_TS, 'utf8');
  } catch {
    return new Set();
  }
  // Estructura del file: export const GLOSSARY_DETAILED: GlossaryDetailedPage[] = [...]
  // con entries que arrancan con `slug: '<slug>',`. Mismo parser que glossary.ts.
  const slugs = new Set();
  const STR = "'(?:\\\\.|[^'\\\\])*'";
  const slugRegex = new RegExp(`slug:\\s*(${STR}),`, 'g');
  let m;
  while ((m = slugRegex.exec(source)) !== null) {
    slugs.add(unwrapTsString(m[1]));
  }
  return slugs;
}

// ---------------------------------------------------------------------------
// 2. Build patterns para matching.
//
// Cada término + alias se vuelve un pattern case-insensitive con word
// boundaries. Sorteamos por longitud descendente para priorizar matches
// largos: "single boiler" debe matchearse antes que "boiler".
//
// Skip terms muy cortos (≤2 chars) y skip-list de términos genéricos que
// generarían noise.
// ---------------------------------------------------------------------------

// Términos demasiado genéricos o ambiguos que NO debemos auto-linkear aunque
// estén en glossary. Vacío por ahora — el glossary está bien curado y nada
// matchea términos demasiado genéricos. Lista mantenida explícitamente para que sea
// fácil agregar exclusiones futuras.
const GENERIC_SKIP_TERMS = new Set([
  // ej: 'print', 'water', 'machine' — todos demasiado genéricos.
]);

const MIN_TERM_LENGTH = 3;

function escapeRegex(str) {
  return str.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function buildMatchers(glossaryEntries) {
  const matchers = [];

  for (const entry of glossaryEntries) {
    const variants = [entry.term, ...entry.aliases];

    for (const variant of variants) {
      if (variant.length < MIN_TERM_LENGTH) continue;
      if (GENERIC_SKIP_TERMS.has(variant.toLowerCase())) continue;

      // Word boundary: usamos lookarounds custom porque \b no funciona bien
      // con términos que tienen guiones, paréntesis o terminan en letra/dígito
      // distinto. Pattern: el match debe estar precedido por inicio-de-string
      // o un non-word char, y seguido por inicio-de-tag, espacio, puntuación
      // o EOF — esto evita matches "dentro" de palabras como "filamentbed".
      const pattern = new RegExp(
        `(^|[^A-Za-z0-9_-])(${escapeRegex(variant)})(?=[^A-Za-z0-9_-]|$)`,
        'i',
      );

      matchers.push({
        slug: entry.slug,
        displayTerm: entry.term,
        variant,
        pattern,
        // Longitud del variant para sort. Términos más largos se intentan
        // primero, pero el dedupe "linkedSlugs" garantiza que cada slug
        // se linkea una sola vez por página independientemente del orden.
        length: variant.length,
      });
    }
  }

  // Sort por longitud descendente.
  matchers.sort((a, b) => b.length - a.length);
  return matchers;
}

// ---------------------------------------------------------------------------
// 3. HTML transform.
//
// Lightweight aproach: NO usamos un DOM parser (para evitar deps). Trabajamos
// sobre el string con regex que respeta las "skip zones": tags que no debemos
// tocar (a, code, pre, kbd, h1-h6, script, style, title, head metadata).
//
// Estrategia:
//   1. Tokenize el HTML en chunks: [protected zone] o [text-eligible zone].
//      Las protected zones son anything between <tag> y </tag> para los tags
//      en SKIP_TAGS, incluido el tag entero. También todos los attribute
//      values de cualquier tag.
//   2. Solo procesamos chunks "text-eligible" — los protected pasan as-is.
//   3. Sobre cada text-eligible chunk, intentamos cada matcher en orden.
//   4. Una vez linkeado un slug en esta página, no se re-linkea (Set).
// ---------------------------------------------------------------------------

const SKIP_TAGS = ['a', 'code', 'pre', 'kbd', 'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'script', 'style', 'title', 'head', 'noscript'];

// Regex que matchea: open/close de skip tags (con contenido), o cualquier tag
// (para excluir attribute values del scope text-eligible).
//
// Construimos un mega-regex que enumera todas las "zones" que NO debemos
// tocar, y luego procesamos solo el texto FUERA de esas zones.

function buildSkipZoneRegex() {
  const tagAlternation = SKIP_TAGS.join('|');
  // Matches:
  //   - <skipTag ...>...</skipTag> (no-greedy, dotall via [\s\S])
  //   - cualquier otro tag <foo attr="...">
  //   - HTML comments <!-- ... -->
  //   - <!DOCTYPE ...>
  //
  // El orden importa: skip tags primero (más específicos), luego any tag.
  return new RegExp(
    `<(?:${tagAlternation})\\b[^>]*>[\\s\\S]*?<\\/(?:${tagAlternation})\\s*>` // skip-tag block
    + `|<!--[\\s\\S]*?-->` // comments
    + `|<![^>]*>` // doctype + other declarations
    + `|<[^>]+>`, // any other tag (incluye attribute values dentro de >)
    'gi',
  );
}

const SKIP_ZONE_REGEX = buildSkipZoneRegex();

function transformHtml(html, matchers, stats, detailedSlugs) {
  // Pre-processing: rewrite manual links que apunten a /glossary/#slug si
  // ese slug ahora tiene página dedicada. Mantiene retrocompatibilidad —
  // los templates pueden seguir usando /glossary/#slug y este script los
  // upgrade a /glossary/[slug]/ cuando aplica. Cualquier link que apunte
  // a un slug SIN página dedicada se deja como anchor (correct comportamiento).
  html = html.replace(
    /href="\/glossary\/#([a-z0-9-]+)"/g,
    (full, slug) => (detailedSlugs.has(slug) ? `href="/glossary/${slug}/"` : full),
  );

  // Idempotencia: pre-poblamos linkedSlugs con slugs ya presentes en el HTML
  // (ya sea de un run previo del autolink, o de links manuales del template
  // hacia /glossary/#foo o /glossary/<slug>/). Esto garantiza que re-correr
  // el script no agrega links nuevos.
  //
  // Detectamos AMBOS formatos:
  //   /glossary/#slug   (anchor del index, terms sin página dedicada)
  //   /glossary/slug/   (página dedicada, después del rewrite arriba)
  const linkedSlugs = new Set();
  const existingAnchorRegex = /href="\/glossary\/#([a-z0-9-]+)"/g;
  let existing;
  while ((existing = existingAnchorRegex.exec(html)) !== null) {
    linkedSlugs.add(existing[1]);
  }
  const existingDetailedRegex = /href="\/glossary\/([a-z0-9-]+)\/"/g;
  while ((existing = existingDetailedRegex.exec(html)) !== null) {
    linkedSlugs.add(existing[1]);
  }

  let result = '';
  let lastIndex = 0;

  // Walk el HTML; el regex matchea protected zones. El texto ENTRE matches es
  // el text-eligible chunk donde corremos los matchers.
  let m;
  SKIP_ZONE_REGEX.lastIndex = 0;
  while ((m = SKIP_ZONE_REGEX.exec(html)) !== null) {
    const textChunk = html.slice(lastIndex, m.index);
    result += processTextChunk(textChunk, matchers, linkedSlugs, stats, detailedSlugs);
    result += m[0]; // protected zone — pasa tal cual
    lastIndex = m.index + m[0].length;
  }
  // Tail del HTML (después del último tag — raro pero posible).
  result += processTextChunk(html.slice(lastIndex), matchers, linkedSlugs, stats, detailedSlugs);

  return { html: result, linkedCount: linkedSlugs.size, linkedSlugs };
}

function processTextChunk(chunk, matchers, linkedSlugs, stats, detailedSlugs) {
  if (!chunk || chunk.length === 0) return chunk;

  // Ranges donde insertamos un <a>...</a> en este chunk. Cualquier match
  // posterior que caiga (parcial o totalmente) dentro de uno de estos ranges
  // se descarta: evita nested anchors cuando un término corto ("boiler")
  // matchea dentro del texto ya linkeado por uno largo ("dual boiler").
  const insertedRanges = [];

  function overlapsInserted(start, end) {
    for (const [s, e] of insertedRanges) {
      if (start < e && end > s) return true;
    }
    return false;
  }

  let working = chunk;
  for (const matcher of matchers) {
    if (linkedSlugs.has(matcher.slug)) continue; // already linked en esta página

    // Buscamos la primera ocurrencia que NO caiga dentro de un range ya
    // anchorizado. Avanzamos `searchStart` hasta encontrar un match válido.
    matcher.pattern.lastIndex = 0;
    let searchStart = 0;
    let validMatch = null;

    while (searchStart < working.length) {
      const sliceStr = working.slice(searchStart);
      const m = matcher.pattern.exec(sliceStr);
      if (!m) break;

      const fullMatchStart = searchStart + m.index + m[1].length;
      const fullMatchEnd = fullMatchStart + m[2].length;

      if (!overlapsInserted(fullMatchStart, fullMatchEnd)) {
        validMatch = { start: fullMatchStart, end: fullMatchEnd, text: m[2] };
        break;
      }
      // Match dentro de zona anchorizada — saltamos al char siguiente.
      searchStart = fullMatchStart + 1;
    }

    if (!validMatch) continue;

    // Priority: si el slug tiene página dedicada (existe en
    // GLOSSARY_DETAILED), enlazamos a /glossary/<slug>/ — destino más rico
    // que el anchor del index. Fallback al anchor para slugs que solo viven
    // en el index page.
    const href = detailedSlugs.has(matcher.slug)
      ? `/glossary/${matcher.slug}/`
      : `/glossary/#${matcher.slug}`;
    const anchor = `<a href="${href}" class="glossary-link">${validMatch.text}</a>`;
    working = working.slice(0, validMatch.start) + anchor + working.slice(validMatch.end);

    // Shift ranges existentes que estén después del insert, y registrar el nuevo.
    const shift = anchor.length - (validMatch.end - validMatch.start);
    for (const range of insertedRanges) {
      if (range[0] >= validMatch.end) {
        range[0] += shift;
        range[1] += shift;
      }
    }
    insertedRanges.push([validMatch.start, validMatch.start + anchor.length]);

    linkedSlugs.add(matcher.slug);
    stats.linksAdded += 1;
    stats.termsSeen.add(matcher.slug);
  }
  return working;
}

// ---------------------------------------------------------------------------
// 4. Walk dist/ y aplicar.
// ---------------------------------------------------------------------------

// Páginas que NO deben recibir auto-links:
//   - /glossary/* — el glossary se auto-linkearía a sí mismo, ruido.
//   - /about/, /privacy/, /methodology/ — pages legales/meta, dejamos limpias.
//   - 404.html — no es content page.
const SKIP_PATH_PREFIXES = [
  'glossary/',
  'about/',
  'privacy/',
  '404.html',
];

function shouldSkipPath(relativePath) {
  const normalized = relativePath.replace(/\\/g, '/');
  return SKIP_PATH_PREFIXES.some((prefix) => normalized.startsWith(prefix));
}

async function walkHtmlFiles(dir, base = dir) {
  const out = [];
  const items = await fs.readdir(dir, { withFileTypes: true });
  for (const item of items) {
    const full = path.join(dir, item.name);
    if (item.isDirectory()) {
      out.push(...(await walkHtmlFiles(full, base)));
    } else if (item.isFile() && item.name.endsWith('.html')) {
      out.push({ full, relative: path.relative(base, full) });
    }
  }
  return out;
}

async function main() {
  const t0 = Date.now();

  let distExists = true;
  try {
    await fs.access(DIST_DIR);
  } catch {
    distExists = false;
  }
  if (!distExists) {
    console.error(`[autolink-glossary] dist/ no existe en ${DIST_DIR}. Corré astro build primero.`);
    process.exit(1);
  }

  const glossaryEntries = await loadGlossaryTerms();
  if (glossaryEntries.length === 0) {
    console.log(`[autolink-glossary] Glossary is empty (stub). Skipping autolink pass — no terms to link.`);
    return;
  }
  const matchers = buildMatchers(glossaryEntries);
  const detailedSlugs = await loadDetailedSlugs();
  console.log(
    `[autolink-glossary] Loaded ${glossaryEntries.length} glossary entries → ${matchers.length} matcher patterns. `
    + `${detailedSlugs.size} terms link to dedicated /glossary/[slug]/ pages, rest fall back to /glossary/#slug.`,
  );

  const allFiles = await walkHtmlFiles(DIST_DIR);
  const stats = {
    filesProcessed: 0,
    filesSkipped: 0,
    filesFailed: 0,
    linksAdded: 0,
    termsSeen: new Set(),
  };

  for (const file of allFiles) {
    if (shouldSkipPath(file.relative)) {
      stats.filesSkipped += 1;
      continue;
    }

    try {
      const original = await fs.readFile(file.full, 'utf8');
      const { html } = transformHtml(original, matchers, stats, detailedSlugs);

      // Write si el HTML cambió por CUALQUIER motivo:
      //   - autolink agregó nuevos links (linkedCount > 0), o
      //   - el rewrite cambió un href manual /glossary/#slug → /glossary/slug/.
      // Ambos casos se reflejan en html !== original.
      if (html !== original) {
        // Write atómico per file: si el rename falla, el archivo original
        // queda intacto. fs.writeFile no es estrictamente atómico pero es lo
        // suficientemente seguro para builds — y si crashea, el build se
        // re-corre desde cero.
        await fs.writeFile(file.full, html, 'utf8');
      }
      stats.filesProcessed += 1;
    } catch (err) {
      stats.filesFailed += 1;
      console.error(`[autolink-glossary] FAIL ${file.relative}: ${err.message}`);
      // No re-throw: seguimos con el siguiente file. Un file roto no debe
      // tumbar todo el build pipeline.
    }
  }

  const elapsed = ((Date.now() - t0) / 1000).toFixed(2);
  console.log(
    `[autolink-glossary] Processed ${stats.filesProcessed} HTML files `
    + `(skipped ${stats.filesSkipped}, failed ${stats.filesFailed}), `
    + `added ${stats.linksAdded} glossary links across ${stats.termsSeen.size} unique terms `
    + `in ${elapsed}s.`,
  );

  if (stats.filesFailed > 0) {
    // Exit code distinto pero no fatal — el HTML original sigue válido.
    process.exit(2);
  }
}

main().catch((err) => {
  console.error('[autolink-glossary] FATAL:', err);
  process.exit(1);
});
