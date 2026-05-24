// Snapshot tests del quiz "which espresso machine should I buy?".
//
// Objetivo: prevenir regresiones cuando se tuneen los pesos del scoring en
// src/lib/quiz-scoring.js. Cada escenario representa una combinación de
// respuestas "canónica" — el quiz DEBE recomendar X en ese caso. Si un
// peso cambia y rompe uno de estos casos, el test rojo nos avisa antes
// de mergear.
//
// Cero deps de testing: usamos node:test + node:assert (Node 18+).
// Corre con: npm test
//
// Anti-gray-hat (CLAUDE.md): los expected results son lo que DEBERÍA
// suceder, no lo que actualmente sucede si el quiz tiene un bug. Si un
// test falla, primero verificamos si el quiz está mal — no relajamos el
// assert para que pase.

import { test, describe } from 'node:test';
import assert from 'node:assert/strict';

import { pickRecommendations, scoreProduct } from '../src/lib/quiz-scoring.js';
import { catalogWithReviews as catalog } from '../src/data/quiz-catalog.js';

// Helper: asserta que un caveat con palabras-clave esté presente en la lista.
// Hacemos substring match porque los caveats tienen mensajes largos que
// queremos poder editar sin romper tests.
function assertCaveatIncludes(caveats, fragment, msg) {
  const found = caveats.some((c) => c.toLowerCase().includes(fragment.toLowerCase()));
  assert.ok(
    found,
    msg ?? `Expected a caveat containing "${fragment}", got: ${JSON.stringify(caveats, null, 2)}`,
  );
}

function topPickSlug(rec) {
  return rec.topPick?.product?.slug ?? null;
}

describe('quiz: pickRecommendations — canonical scenarios', () => {
  test('beginner + low budget + milk drinks → Bambino Plus tier (entry-level con steam wand)', () => {
    const answers = {
      budget: '300-700',
      experience: 'total-beginner',
      drinks: 'milk',
      volume: '1-2',
      space: 'small',
      time: '3-5min',
      control: 'some-auto',
    };
    const rec = pickRecommendations(answers, catalog);

    // Bambino Plus es el pick canónico para beginner + milk + budget medio:
    // auto frother, beginner-friendly, footprint small, PID. Aceptamos
    // también Dedica como alternativa cercana en este tier.
    const top = topPickSlug(rec);
    assert.ok(
      ['breville-bambino-plus', 'delonghi-dedica-ec685'].includes(top),
      `Expected Bambino Plus or Dedica as top pick, got: ${top}`,
    );
    assert.ok(rec.alternates.length >= 2, 'Expected at least 2 alternates');
    assert.ok(rec.topPick.score > 20, `Top score should be solidly positive, got ${rec.topPick.score}`);
  });

  test('beginner + budget under-300 + espresso → caveat sobre Moka pot / AeroPress', () => {
    const answers = {
      budget: 'under-300',
      experience: 'total-beginner',
      drinks: 'espresso',
      volume: '1-2',
      space: 'small',
      time: '3-5min',
      control: 'some-auto',
    };
    const rec = pickRecommendations(answers, catalog);

    // Anti-gray-hat: debemos mostrar el caveat de "no real 9-bar espresso
    // under $200" para no empujar un machine de $139 como "real espresso".
    assertCaveatIncludes(
      rec.caveats,
      'no push-button machine pulls real 9-bar espresso under $200',
    );

    // El top pick puede ser un brewer (AeroPress/Moka) o un lever barato
    // (Flair Classic). Lo que NO queremos es un pressurized-basket Casabrews
    // de $139 como top pick (sería gray-hat).
    const top = topPickSlug(rec);
    assert.notEqual(
      top,
      'casabrews-3700-essential',
      'Casabrews $139 NO debe ser top pick para beginner+espresso+under-300 (gray-hat)',
    );
  });

  test('advanced + high budget + espresso only + pure manual → Cafelat Robot o Flair 58 (lever)', () => {
    const answers = {
      budget: '700-1500',
      experience: 'advanced',
      drinks: 'espresso',
      volume: '1-2',
      space: 'medium',
      time: '10plus',
      control: 'pure-manual',
    };
    const rec = pickRecommendations(answers, catalog);

    const top = topPickSlug(rec);
    // Lever machines son las únicas que cumplen "pure manual" + "espresso
    // only" + "10+ min ritual". Flair Classic ($119) o Cafelat Robot ($449)
    // o Flair 58 ($699) — cualquiera de los tres es válido.
    assert.ok(
      ['cafelat-robot', 'flair-58', 'flair-classic-signature'].includes(top),
      `Expected a lever machine as top pick, got: ${top}`,
    );
  });

  test('max automation + high budget + family volume → Breville Oracle Touch o super-auto', () => {
    const answers = {
      budget: '1500-3000',
      experience: 'some',
      drinks: 'milk',
      volume: '5plus',
      space: 'large',
      time: '1-2min',
      control: 'max-auto',
    };
    const rec = pickRecommendations(answers, catalog);

    const top = topPickSlug(rec);
    // Oracle Touch (all-in-one con auto frother + grinder, $2799), Eletta
    // ($1499 super-auto), o Touch Impress son las picks razonables.
    assert.ok(
      ['breville-oracle-touch', 'delonghi-eletta', 'breville-touch-impress'].includes(top),
      `Expected Oracle Touch / Eletta / Touch Impress as top pick, got: ${top}`,
    );
  });

  test('tiny kitchen + mid budget + single person → Bambino Plus o Dedica (footprint small/tiny)', () => {
    const answers = {
      budget: '300-700',
      experience: 'some',
      drinks: 'milk',
      volume: '1-2',
      space: 'tiny',
      time: '1-2min',
      control: 'some-auto',
    };
    const rec = pickRecommendations(answers, catalog);

    const top = topPickSlug(rec);
    // Bambino Plus (small footprint, auto frother) o Dedica (tiny footprint,
    // manual wand) — únicas máquinas que califican en tiny kitchen + mid.
    assert.ok(
      ['breville-bambino-plus', 'delonghi-dedica-ec685'].includes(top),
      `Expected Bambino Plus or Dedica as top pick for tiny kitchen, got: ${top}`,
    );

    // El top pick NO puede tener footprint 'large'.
    assert.notEqual(rec.topPick.product.footprint, 'large');
  });

  test('inconsistent: max-auto + 10+min time → caveat de inconsistencia', () => {
    const answers = {
      budget: '700-1500',
      experience: 'some',
      drinks: 'milk',
      volume: '3-4',
      space: 'medium',
      time: '10plus',
      control: 'max-auto',
    };
    const rec = pickRecommendations(answers, catalog);

    // El quiz debe explícitamente marcar que estas respuestas se contradicen.
    assertCaveatIncludes(
      rec.caveats,
      'maximum automation and also for 10+ minutes',
    );
  });

  test('mostly filter + low budget → brewer (AeroPress / Moka) como top, caveat de filter', () => {
    const answers = {
      budget: 'under-300',
      experience: 'some',
      drinks: 'filter',
      volume: '1-2',
      space: 'tiny',
      time: '3-5min',
      control: 'some-auto',
    };
    const rec = pickRecommendations(answers, catalog);

    const top = topPickSlug(rec);
    // Si pidió "mostly filter", el quiz debe pushear brewers (no machine).
    assert.ok(
      ['aeropress-original', 'bialetti-moka-express'].includes(top),
      `Expected AeroPress or Moka pot as top pick for filter answer, got: ${top}`,
    );

    // Y debe mostrar el caveat de "espresso machine es la herramienta
    // equivocada para filter".
    assertCaveatIncludes(rec.caveats, 'mostly filter');

    // El top pick debe tener type === 'brewer'.
    assert.equal(rec.topPick.product.type, 'brewer');
  });
});

// Tests adicionales de "smoke" — verifican shape de la API, no scoring
// específico. Útil si alguien rompe accidentalmente el contrato.
describe('quiz: API shape sanity checks', () => {
  test('pickRecommendations devuelve la shape esperada', () => {
    const answers = {
      budget: '700-1500',
      experience: 'intermediate',
      drinks: 'mix',
      volume: '3-4',
      space: 'medium',
      time: '3-5min',
      control: 'full-control',
    };
    const rec = pickRecommendations(answers, catalog);

    assert.ok('topPick' in rec, 'topPick key missing');
    assert.ok('alternates' in rec, 'alternates key missing');
    assert.ok('caveats' in rec, 'caveats key missing');
    assert.ok('skipCategories' in rec, 'skipCategories key missing');
    assert.ok(Array.isArray(rec.alternates));
    assert.ok(Array.isArray(rec.caveats));
    assert.ok(Array.isArray(rec.skipCategories));
    assert.equal(rec.alternates.length, 2, 'Expected exactly 2 alternates');
  });

  test('scoreProduct devuelve {score:number, reasons:string[]}', () => {
    const answers = {
      budget: '300-700',
      experience: 'some',
      drinks: 'milk',
      volume: '1-2',
      space: 'small',
      time: '3-5min',
      control: 'some-auto',
    };
    const product = catalog.find((p) => p.slug === 'breville-bambino-plus');
    const result = scoreProduct(product, answers);

    assert.equal(typeof result.score, 'number');
    assert.ok(Array.isArray(result.reasons));
    // Bambino Plus contra answers favorables debe scorear positivo.
    assert.ok(result.score > 0, `Bambino Plus debería scorear > 0 con answers favorables, got ${result.score}`);
  });
});
