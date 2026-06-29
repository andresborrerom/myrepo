// 🐶 ROBOT DE IMÁGENES — Paso 4/5 del robot de cómics de perros.
//
// Usa Gemini "Nano Banana" (gemini-2.5-flash-image) para generar las viñetas.
// El truco de consistencia: primero creamos una FICHA visual de cada perro (una imagen
// de referencia), y luego en cada viñeta le pasamos esa ficha para que el perro salga
// IDÉNTICO. Sin entrenar nada, solo mandando la imagen de referencia en cada pedido.
//
// Dos modos:
//   1) Crear las fichas de los 7 perros (una vez):
//        node dog-comics/robot-imagenes.mjs casting
//      → guarda dog-comics/refs-img/<Perro>.png  (se commitean: son la referencia estable)
//
//   2) Generar las viñetas de un guion:
//        node dog-comics/robot-imagenes.mjs the-doorbell
//      → guarda dog-comics/output/<guion>/imagenes/NN-<Perro>.png
//
// Idempotente: no regenera imágenes que ya existen (no gasta dinero de gusto).
// Borra el .png que quieras rehacer y vuelve a correr.
//
// OJO COSTOS: cada imagen cuesta ~$0.039 en TU cuenta de Google. 7 fichas + ~6 viñetas
// del primer cómic ≈ $0.5. Requiere facturación activada en el proyecto de Google.

import { readFile, writeFile, mkdir, access, readdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import { extname } from 'node:path';

const AQUI = new URL('./', import.meta.url);
const MODEL = 'gemini-2.5-flash-image'; // "Nano Banana" (verificado jun-2026)
const ENDPOINT = `https://generativelanguage.googleapis.com/v1beta/models/${MODEL}:generateContent`;

// ---------- API key (env o dog-comics/.env). Aceptamos varios nombres por si el ----------
// ---------- secreto del environment se llama distinto (como pasó con ElevenLabs). --------
async function cargarEnvLocal() {
  try {
    const txt = await readFile(new URL('.env', AQUI), 'utf8');
    for (const linea of txt.split('\n')) {
      const l = linea.trim(); if (!l || l.startsWith('#')) continue;
      const i = l.indexOf('='); if (i === -1) continue;
      const k = l.slice(0, i).trim(); const v = l.slice(i + 1).trim().replace(/^["']|["']$/g, '');
      if (!process.env[k]) process.env[k] = v;
    }
  } catch {}
}
await cargarEnvLocal();
const API_KEY = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY
  || process.env.GOOGLE_GENAI_API_KEY || process.env.GEMINI_LABS_KEY;
if (!API_KEY) {
  console.error('\n❌ Falta la API key de Gemini.');
  console.error('   Debe venir como secreto GEMINI_API_KEY del environment (o en dog-comics/.env).\n');
  process.exit(1);
}

const casting = JSON.parse(await readFile(new URL('characters.json', AQUI), 'utf8'));
const ESTILO = casting.estilo_global || '';
const personajes = casting.personajes;

async function existe(url) { try { await access(url, constants.F_OK); return true; } catch { return false; } }

// Llama a Gemini. `parts` = trozos del pedido (texto + imágenes de referencia opcionales).
// Devuelve un Buffer PNG. Reintenta si el servidor está ocupado (429/503).
async function generarImagen(parts, aspectRatio, intento = 1) {
  const body = {
    contents: [{ parts }],
    generationConfig: { responseModalities: ['TEXT', 'IMAGE'], imageConfig: { aspectRatio } }
  };
  const res = await fetch(ENDPOINT, {
    method: 'POST',
    headers: { 'x-goog-api-key': API_KEY, 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });
  if ((res.status === 429 || res.status === 503) && intento <= 4) {
    const espera = 2 ** intento * 1000;
    console.log(`   ⏳ Gemini ocupado (${res.status}), reintento en ${espera / 1000}s...`);
    await new Promise(r => setTimeout(r, espera));
    return generarImagen(parts, aspectRatio, intento + 1);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 300)}`);
  const data = await res.json();
  const cand = data.candidates?.[0];
  const imgPart = cand?.content?.parts?.find(p => p.inlineData?.data);
  if (!imgPart) {
    const motivo = cand?.finishReason || data.promptFeedback?.blockReason || 'sin imagen en la respuesta';
    throw new Error(`Gemini no devolvió imagen (${motivo})`);
  }
  return Buffer.from(imgPart.inlineData.data, 'base64');
}

// Lee una imagen del disco y la deja lista para mandarla como referencia.
async function comoReferencia(url) {
  const buf = await readFile(url);
  return { inlineData: { mimeType: 'image/png', data: buf.toString('base64') } };
}

// Lee hasta 3 FOTOS REALES de refs-fotos/<nombre>/ para personajes basados en perros
// de verdad (ej. Malostragos). Si no hay carpeta, devuelve [] y se usa solo el texto.
async function fotosReales(nombre) {
  const dir = new URL(`refs-fotos/${nombre}/`, AQUI);
  let archivos;
  try { archivos = await readdir(dir); } catch { return []; }
  const MIME = { '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.png': 'image/png', '.webp': 'image/webp' };
  const partes = [];
  for (const f of archivos.sort()) {
    const ext = extname(f).toLowerCase();
    if (!MIME[ext]) continue;
    const buf = await readFile(new URL(`${nombre}/${f}`, new URL('refs-fotos/', AQUI)));
    partes.push({ inlineData: { mimeType: MIME[ext], data: buf.toString('base64') } });
    if (partes.length >= 3) break; // gemini-2.5-flash-image admite ~3 referencias
  }
  return partes;
}

// ---------- MODO 1: crear las fichas de los perros ----------
async function modoCasting(soloUno) {
  const dir = new URL('refs-img/', AQUI);
  await mkdir(dir, { recursive: true });
  console.log(soloUno ? `\n🎨 Creando la ficha de ${soloUno}...\n` : '\n🎨 Creando las fichas visuales de los perros...\n');
  let creadas = 0, saltadas = 0;
  for (const [nombre, perro] of Object.entries(personajes)) {
    if (soloUno && nombre.toLowerCase() !== soloUno.toLowerCase()) continue;
    const salida = new URL(`${nombre}.png`, dir);
    if (await existe(salida)) { console.log(`✓ ${nombre}: ya tiene ficha, salto.`); saltadas++; continue; }
    const fotos = await fotosReales(nombre);
    const trozos = [...fotos];
    const esHumano = perro.tipo === 'humano';
    let prompt;
    if (esHumano) {
      // Personaje humano: si hay fotos, se ENVEJECE a adulto e INSPIRA (no copia), para
      // proteger la identidad de un menor. El resultado es un adulto distinto.
      prompt = fotos.length
        ? `${ESTILO}. Create a young ADULT character INSPIRED by the person in these photos: age them up to a friendly adult in their late 20s. Keep only a subtle family resemblance but make them clearly a DISTINCT ADULT, NOT a child. ${perro.visual}. Full body, single character, clean neutral background, character model sheet.`
        : `${ESTILO}. Full-body character reference of an adult: ${perro.visual}. Single character, clean neutral background, character model sheet.`;
    } else {
      prompt = fotos.length
        ? `${ESTILO}. Turn THIS real dog into a character for an Instagram comic, keeping his distinctive look clearly recognizable (coat color and markings, ear shape, snout, body build). ${perro.visual}. Full body, single dog, clean neutral background, character model sheet.`
        : `${ESTILO}. Full-body character reference of ${perro.visual}. Single dog, clean neutral studio background, full body visible, sharp focus. Character model sheet for an Instagram cartoon comic.`;
    }
    trozos.push({ text: prompt });
    console.log(`→ ${nombre}: generando ficha${fotos.length ? ` (con ${fotos.length} foto(s) real(es))` : ''}...`);
    try {
      const png = await generarImagen(trozos, '1:1');
      await writeFile(salida, png);
      console.log(`   ✅ refs-img/${nombre}.png (${(png.length / 1024).toFixed(0)} KB)`);
      creadas++;
    } catch (e) { console.error(`   ❌ ${nombre}: ${e.message}`); }
  }
  console.log(`\n📊 Fichas: ${creadas} creadas, ${saltadas} ya existían.`);
  console.log('📁 dog-comics/refs-img/  (revísalas; estas mantienen a cada perro idéntico)\n');
}

// ---------- MODO 2: generar las viñetas de un guion ----------
async function modoGuion(slug) {
  let guion;
  try { guion = JSON.parse(await readFile(new URL(`guiones/${slug}.json`, AQUI), 'utf8')); }
  catch { console.error(`❌ No encontré el guion: dog-comics/guiones/${slug}.json`); process.exit(1); }

  const dir = new URL(`output/${slug}/imagenes/`, AQUI);
  await mkdir(dir, { recursive: true });
  console.log(`\n🎬 Generando viñetas de: "${guion.titulo}"\n`);
  let creadas = 0, saltadas = 0;
  const ultimaDe = {}; // última viñeta de cada perro, para mantener continuidad panel a panel

  for (let i = 0; i < guion.panels.length; i++) {
    const panel = guion.panels[i];
    const num = String(i + 1).padStart(2, '0');
    const nombre = panel.personaje;
    const perro = nombre ? personajes[nombre] : null;
    const etiqueta = nombre || 'escena';
    const salida = new URL(`${num}-${etiqueta}.png`, dir);
    if (await existe(salida)) {
      console.log(`✓ Panel ${num} (${etiqueta}): ya existe, salto.`);
      if (nombre) ultimaDe[nombre] = salida; // sirve de referencia de continuidad para la próxima viñeta de este perro
      saltadas++; continue;
    }

    // Construir el pedido: estilo + escena + acción, con la ficha del perro como referencia
    // Y ADEMÁS, si este perro ya salió antes, su última viñeta (para que se vea idéntico de panel a panel).
    const escena = guion.escena_base || guion.panels[0]?.escena_base || 'a cozy room';
    const trozos = [];
    const refPath = perro ? new URL(`refs-img/${nombre}.png`, AQUI) : null;
    if (refPath && await existe(refPath)) trozos.push(await comoReferencia(refPath));
    if (nombre && ultimaDe[nombre]) trozos.push(await comoReferencia(ultimaDe[nombre]));

    const desc = perro
      ? `Keep this EXACT same dog character identical to the reference image(s) (same face, fur color, ears, proportions). Comic panel: ${perro.visual}, ${panel.accion}. Setting: ${escena}.`
      : `Comic panel, no characters. ${panel.sfx ? 'Scene suggesting: ' + panel.sfx + '. ' : ''}Setting: ${escena}.`;
    trozos.push({ text: `${ESTILO}. Vertical 9:16 Instagram comic panel. ${desc}` });

    console.log(`→ Panel ${num} (${etiqueta}): ${panel.accion ? panel.accion.slice(0, 60) : panel.sfx || ''}...`);
    try {
      const png = await generarImagen(trozos, '9:16');
      await writeFile(salida, png);
      console.log(`   ✅ ${num}-${etiqueta}.png (${(png.length / 1024).toFixed(0)} KB)`);
      if (nombre) ultimaDe[nombre] = salida;
      creadas++;
    } catch (e) { console.error(`   ❌ Panel ${num}: ${e.message}`); }
  }
  console.log(`\n📊 Viñetas: ${creadas} creadas, ${saltadas} ya existían.`);
  console.log(`📁 dog-comics/output/${slug}/imagenes/\n`);
}

// ---------- Arranque ----------
const arg = process.argv[2];
if (!arg) {
  console.error('Uso:  node dog-comics/robot-imagenes.mjs casting   (crea las fichas de los perros)');
  console.error('  o:  node dog-comics/robot-imagenes.mjs the-doorbell   (genera las viñetas del guion)');
  process.exit(1);
}
if (arg === 'casting') await modoCasting(process.argv[3]); // opcional: un solo perro, ej. "casting Malostragos"
else await modoGuion(arg);
