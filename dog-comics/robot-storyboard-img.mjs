// 🐶 GENERADOR DE TOMAS (storyboard) — versión por SHOTS (no por panels).
// Cada toma del guion = una imagen 9:16, usando las fichas de los personajes en cuadro
// como referencia (para que salgan idénticos).
//
// Uso:
//   node dog-comics/robot-storyboard-img.mjs give-me-the-paw            (todas las tomas)
//   node dog-comics/robot-storyboard-img.mjs give-me-the-paw 01,11,12,13 (solo esas)
//
// Idempotente. Modelo: gemini-2.5-flash-image.

import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { constants } from 'node:fs';

const AQUI = new URL('./', import.meta.url);
const ENDPOINT = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash-image:generateContent';

// Nombre en el guion -> archivo de ficha en refs-img/
const FICHA = { Tank: 'Tank', Rex: 'Rex', SirWheeze: 'SirWheeze', Kaiser: 'Kaiser', Bruno: 'Bruno', Africa: 'Africa', Pixel: 'Pixel', Bear: 'Malostragos', Pepe: 'Pepe-nino' };
const NOMBRES = Object.keys(FICHA);
// Descripción para el PROMPT (evita que 'Bear'->oso, 'Tank'->tanque, 'Africa'->continente, etc.)
const DESC = {
  Tank: 'Tank the tiny brown-and-white Chihuahua',
  Rex: 'Rex the grey Siberian Husky',
  SirWheeze: 'SirWheeze the chubby wrinkly English Bulldog',
  Kaiser: 'Kaiser the German Shepherd',
  Bruno: 'Bruno the golden retriever',
  Africa: 'the large black female Giant Schnauzer',
  Pixel: 'Pixel the Border Collie',
  Bear: 'the big ginger mixed-breed leader dog',
  Pepe: 'Pepe the boy in the yellow Colombia football jersey',
};
function describir(texto) { let t = texto || ''; for (const n of NOMBRES) t = t.replace(new RegExp(`\\b${n}\\b`, 'g'), DESC[n]); return t; }
// Tamaño relativo POR personaje (solo se aplican los que están en cuadro).
const SIZE = {
  Pepe: 'the boy is slightly TALLER than the big dogs',
  Bear: 'the big ginger leader dog is large (same size as the German Shepherd)',
  Kaiser: 'the German Shepherd is large (same size as the big ginger leader dog)',
  Africa: 'the black Giant Schnauzer is a bit shorter than the big dogs but more muscular and powerful',
  Rex: 'the Husky is medium-large',
  Bruno: 'the golden retriever is medium-large',
  Pixel: 'the Border Collie is medium',
  SirWheeze: 'the English Bulldog is short and stocky',
  Tank: 'the Chihuahua is tiny (fits in a hand)',
};
// Gesto correcto de "dar la pata" (verificado): solo en tomas con shot.gesto_pata = true.
const PAW = 'the dog is SITTING on its haunches and lifts ONE front paw a few inches to its own chest height, gently placing it into the kneeling boy\'s open upturned palm; the boy is crouched/kneeling low at the dog\'s level holding out one flat hand palm-up';
const PAW_NEG = 'dog standing on hind legs, dog standing upright like a human, dog on all fours, two paws raised, vertical human handshake, clasped or gripping hands, paw raised too high, boy standing upright';

async function cargarEnvLocal() {
  try {
    const txt = await readFile(new URL('.env', AQUI), 'utf8');
    for (const l of txt.split('\n')) { const t = l.trim(); if (!t || t.startsWith('#')) continue; const i = t.indexOf('='); if (i < 0) continue; const k = t.slice(0, i).trim(); if (!process.env[k]) process.env[k] = t.slice(i + 1).trim().replace(/^["']|["']$/g, ''); }
  } catch {}
}
await cargarEnvLocal();
const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY || process.env.GEMINI_LABS_KEY;
if (!API_KEY) { console.error('❌ Falta GEMINI_API_KEY'); process.exit(1); }

async function existe(u) { try { await access(u, constants.F_OK); return true; } catch { return false; } }
const dormir = ms => new Promise(r => setTimeout(r, ms));

async function generar(parts, intento = 1) {
  const body = { contents: [{ parts }], generationConfig: { responseModalities: ['TEXT', 'IMAGE'], imageConfig: { aspectRatio: '9:16' } } };
  const res = await fetch(ENDPOINT, { method: 'POST', headers: { 'x-goog-api-key': API_KEY, 'Content-Type': 'application/json' }, body: JSON.stringify(body) });
  if ((res.status === 429 || res.status === 503) && intento <= 4) { await dormir(2 ** intento * 1000); return generar(parts, intento + 1); }
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const part = (await res.json()).candidates?.[0]?.content?.parts?.find(p => p.inlineData?.data);
  if (!part) throw new Error('sin imagen (posible filtro)');
  return Buffer.from(part.inlineData.data, 'base64');
}
async function refDe(nombre) {
  const u = new URL(`refs-img/${FICHA[nombre]}.png`, AQUI);
  if (!(await existe(u))) return null;
  return { inlineData: { mimeType: 'image/png', data: (await readFile(u)).toString('base64') } };
}

const slug = process.argv[2];
const filtro = process.argv[3] ? new Set(process.argv[3].split(',')) : null;
if (!slug) { console.error('Uso: node dog-comics/robot-storyboard-img.mjs <slug> [ids]'); process.exit(1); }

const guion = JSON.parse(await readFile(new URL(`guiones/${slug}.json`, AQUI), 'utf8'));
const casting = JSON.parse(await readFile(new URL('characters.json', AQUI), 'utf8'));
const ESTILO = casting.estilo_global;
const ESCALA = casting.escala_relativa || '';
const escena = guion.escena_base || 'a cozy room';
const dir = new URL(`output/${slug}/imagenes/`, AQUI);
await mkdir(dir, { recursive: true });

console.log(`\n🎨 Tomas de "${guion.titulo}"\n`);
let hechas = 0, saltadas = 0;

for (const shot of guion.shots) {
  if (filtro && !filtro.has(shot.id)) continue;
  const salida = new URL(`${shot.id}.png`, dir);
  if (await existe(salida)) { console.log(`✓ ${shot.id}: ya existe, salto.`); saltadas++; continue; }

  // ¿Quiénes están en cuadro? (hablante(s) + nombres mencionados en 'en_cuadro')
  const presentes = [];
  const add = n => { if (n && FICHA[n] && !presentes.includes(n)) presentes.push(n); };
  add(shot.linea?.quien); add(shot.extra?.quien);
  const texto = (shot.en_cuadro || '') + ' ' + (shot.accion || '');
  for (const n of NOMBRES) if (new RegExp(`\\b${n}\\b`).test(texto)) add(n);
  if (/todos|MOUNTAIN|montaña/i.test(texto + (shot.extra?.quien || ''))) { add('Pepe'); add('Bear'); add('Tank'); }

  const refs = [];
  for (const n of presentes.slice(0, 3)) { const r = await refDe(n); if (r) refs.push(r); }

  const desc = describir(`${shot.plano || ''}. ${shot.en_cuadro || shot.accion || ''}`);
  const sizeNote = presentes.map(n => SIZE[n]).filter(Boolean).join('; ');
  const paw = shot.gesto_pata ? ` Correct paw gesture: ${PAW}. Avoid: ${PAW_NEG}.` : '';
  const prompt = `${ESTILO}. Vertical 9:16 Instagram comic panel. ${desc}.${sizeNote ? ' Relative sizes: ' + sizeNote + '.' : ''}${paw} Keep each character identical to the reference image(s). Setting: ${escena}. Expressive cartoon comedy, clean composition.`;
  console.log(`→ ${shot.id} [${shot.beat}] (${presentes.join('+') || 'escena'}): ${(shot.en_cuadro || '').slice(0, 50)}...`);
  try {
    const png = await generar([...refs, { text: prompt }]);
    await writeFile(salida, png);
    console.log(`   ✅ ${shot.id}.png (${(png.length / 1024).toFixed(0)} KB)`);
    hechas++;
  } catch (e) { console.error(`   ❌ ${shot.id}: ${e.message}`); }
}
console.log(`\n📊 Tomas: ${hechas} hechas, ${saltadas} ya existían.\n📁 output/${slug}/imagenes/\n`);
