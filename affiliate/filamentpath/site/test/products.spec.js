// Smoke test for the products content collection.
//
// Lee directamente los archivos .md de src/content/products/ y verifica que
// el frontmatter mínimo esté presente para los 12 mock products del
// Sub-sprint 1. Esto NO es un schema validator (Astro hace ese trabajo en
// build); es una guardia adicional para que cambios accidentales al
// frontmatter (e.g. typo en `updated_at`, falta de `pros`, ASIN duplicado)
// rompan tests antes de romper el build.
//
// Anti-gray-hat: NO valida el contenido editorial; solo el shape estructural.
// El editorial se revisa humano en `affiliate/CLAUDE.md` y en code review.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { readdir, readFile } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PRODUCTS_DIR = path.join(__dirname, '..', 'src', 'content', 'products');

// Parser minimal de YAML frontmatter. Suficiente para asertar campos
// top-level requeridos. No reemplaza a Astro's Zod schema; complementa.
function parseFrontmatter(source) {
  const match = source.match(/^---\n([\s\S]*?)\n---/);
  if (!match) return null;
  const body = match[1];
  const lines = body.split('\n');
  const out = {};
  let currentKey = null;
  let currentList = null;
  for (const line of lines) {
    const listMatch = line.match(/^\s+-\s+(.+)$/);
    if (listMatch && currentList) {
      currentList.push(listMatch[1].replace(/^"|"$/g, ''));
      continue;
    }
    const kvMatch = line.match(/^(\w+):\s*(.*)$/);
    if (kvMatch) {
      currentKey = kvMatch[1];
      const value = kvMatch[2].trim();
      if (value === '') {
        // multi-line list or nested object follows
        currentList = [];
        out[currentKey] = currentList;
      } else {
        currentList = null;
        out[currentKey] = value.replace(/^"|"$/g, '');
      }
    }
  }
  return out;
}

describe('products content collection — Sub-sprint 1 smoke tests', () => {
  test('expected 12 product files exist', async () => {
    const files = (await readdir(PRODUCTS_DIR)).filter(
      (f) => f.endsWith('.md') || f.endsWith('.mdx'),
    );
    assert.equal(
      files.length,
      12,
      `Sub-sprint 1 expects exactly 12 mock products; got ${files.length}: ${files.join(', ')}`,
    );
  });

  test('all products have required top-level frontmatter fields', async () => {
    const files = (await readdir(PRODUCTS_DIR)).filter(
      (f) => f.endsWith('.md') || f.endsWith('.mdx'),
    );
    for (const file of files) {
      const source = await readFile(path.join(PRODUCTS_DIR, file), 'utf8');
      const fm = parseFrontmatter(source);
      assert.ok(fm, `${file}: missing or malformed frontmatter`);
      for (const key of ['asin', 'name', 'brand', 'type', 'price', 'price_tier', 'updated_at']) {
        assert.ok(fm[key], `${file}: missing required field "${key}"`);
      }
    }
  });

  test('all ASINs are unique across the catalog', async () => {
    const files = (await readdir(PRODUCTS_DIR)).filter(
      (f) => f.endsWith('.md') || f.endsWith('.mdx'),
    );
    const asins = new Set();
    for (const file of files) {
      const source = await readFile(path.join(PRODUCTS_DIR, file), 'utf8');
      const fm = parseFrontmatter(source);
      const asin = fm?.asin;
      assert.ok(asin, `${file}: missing asin`);
      assert.ok(!asins.has(asin), `${file}: duplicate ASIN ${asin}`);
      asins.add(asin);
    }
  });

  test('all ASINs in Sub-sprint 1 use the FILAMOCK placeholder prefix', async () => {
    const files = (await readdir(PRODUCTS_DIR)).filter(
      (f) => f.endsWith('.md') || f.endsWith('.mdx'),
    );
    for (const file of files) {
      const source = await readFile(path.join(PRODUCTS_DIR, file), 'utf8');
      const fm = parseFrontmatter(source);
      const asin = fm?.asin;
      assert.ok(
        asin?.startsWith('FILAMOCK'),
        `${file}: expected FILAMOCK### placeholder ASIN until Associates approval, got "${asin}"`,
      );
    }
  });
});
