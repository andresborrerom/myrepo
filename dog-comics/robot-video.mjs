// 🐶 ROBOT DE VIDEO — Paso 6 del robot de cómics de perros.
//
// Toma cada VIÑETA (imagen fija) de un guion y la ANIMA en un clip corto (~6s) con
// Hailuo (MiniMax) vía fal.ai. La imagen es el primer cuadro del video, así que el
// perro se mantiene idéntico; el modelo le agrega movimiento suave (cola, parpadeo,
// cámara). El audio (voces) se monta después con FFmpeg (paso 7).
//
// Cómo se usa:
//   node dog-comics/robot-video.mjs the-doorbell        (anima TODAS las viñetas)
//   node dog-comics/robot-video.mjs the-doorbell 02     (solo el panel 02 — prueba barata)
//
// Idempotente: no re-anima un clip que ya existe (no gasta dinero de gusto).
//
// OJO COSTOS: cada clip cuesta ~$0.27 en TU cuenta de fal.ai. Cada generación tarda
// varios minutos (es asíncrono: el robot encola y espera).

import { readFile, writeFile, mkdir, readdir, access } from 'node:fs/promises';
import { constants } from 'node:fs';

const AQUI = new URL('./', import.meta.url);
const MODEL = 'fal-ai/minimax/hailuo-02/standard/image-to-video'; // el más barato y probado ($0.045/s)
const QUEUE = `https://queue.fal.run/${MODEL}`;
const DURACION = '6';      // segundos por clip
const RESOLUCION = '768P';

// ---------- API key (env o dog-comics/.env) ----------
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
const API_KEY = process.env.FAL_KEY || process.env.FAL_API_KEY;
if (!API_KEY) {
  console.error('\n❌ Falta la API key de fal.ai.');
  console.error('   Debe venir como secreto FAL_KEY del environment (o en dog-comics/.env).\n');
  process.exit(1);
}
const headers = { 'Authorization': `Key ${API_KEY}`, 'Content-Type': 'application/json' };

async function existe(url) { try { await access(url, constants.F_OK); return true; } catch { return false; } }
const dormir = ms => new Promise(r => setTimeout(r, ms));

// Envía una imagen a fal y espera el mp4. Devuelve la URL del video.
async function animar(promptMov, dataUri) {
  // 1) Encolar
  const sub = await fetch(QUEUE, {
    method: 'POST', headers,
    body: JSON.stringify({ prompt: promptMov, image_url: dataUri, duration: DURACION, resolution: RESOLUCION, prompt_optimizer: true })
  });
  if (!sub.ok) throw new Error(`encolar HTTP ${sub.status}: ${(await sub.text()).slice(0, 200)}`);
  const { status_url, response_url } = await sub.json();

  // 2) Esperar (poll). Hailuo tarda ~minutos; probamos hasta ~10 min.
  for (let intento = 0; intento < 60; intento++) {
    await dormir(10000);
    const st = await fetch(status_url, { headers });
    if (!st.ok) continue;
    const s = await st.json();
    if (s.status === 'COMPLETED') break;
    if (s.status === 'FAILED' || s.status === 'ERROR') throw new Error(`fal reportó ${s.status}`);
    process.stdout.write('.');
  }
  process.stdout.write('\n');

  // 3) Recoger el resultado
  const res = await fetch(response_url, { headers });
  if (!res.ok) throw new Error(`resultado HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  const url = data?.video?.url;
  if (!url) throw new Error(`sin video en la respuesta: ${JSON.stringify(data).slice(0, 200)}`);
  return url;
}

// ---------- Cargar guion + imágenes ----------
const slug = process.argv[2];
const soloPanel = process.argv[3]; // opcional: '02' para animar solo ese
if (!slug) { console.error('Uso: node dog-comics/robot-video.mjs <guion> [NN]'); process.exit(1); }

let guion;
try { guion = JSON.parse(await readFile(new URL(`guiones/${slug}.json`, AQUI), 'utf8')); }
catch { console.error(`❌ No encontré el guion: dog-comics/guiones/${slug}.json`); process.exit(1); }

const dirImg = new URL(`output/${slug}/imagenes/`, AQUI);
const dirClips = new URL(`output/${slug}/clips/`, AQUI);
await mkdir(dirClips, { recursive: true });

let imagenes;
try { imagenes = (await readdir(dirImg)).filter(f => f.endsWith('.png')).sort(); }
catch { console.error(`❌ No hay imágenes en output/${slug}/imagenes/. Corre primero robot-imagenes.mjs ${slug}`); process.exit(1); }

console.log(`\n🎥 Animando viñetas de: "${guion.titulo}"\n`);
let creados = 0, saltados = 0;

for (const archivo of imagenes) {
  const num = archivo.slice(0, 2); // "01", "02", ...
  if (soloPanel && num !== soloPanel) continue;
  const salida = new URL(archivo.replace('.png', '.mp4'), dirClips);
  if (await existe(salida)) { console.log(`✓ Clip ${num}: ya existe, salto.`); saltados++; continue; }

  // Movimiento a partir de la acción del panel del guion (mismo orden que las imágenes).
  const panel = guion.panels[parseInt(num, 10) - 1] || {};
  const accion = panel.accion || panel.sfx || 'subtle ambient motion';
  const promptMov = `3D animated cartoon. ${accion}. Subtle natural movement, gentle camera, characters stay on-model. Short loop.`;

  const buf = await readFile(new URL(archivo, dirImg));
  const dataUri = `data:image/png;base64,${buf.toString('base64')}`;

  console.log(`→ Clip ${num}: ${accion.slice(0, 55)}... (esto tarda ~minutos)`);
  try {
    const url = await animar(promptMov, dataUri);
    const mp4 = Buffer.from(await (await fetch(url)).arrayBuffer());
    await writeFile(salida, mp4);
    console.log(`   ✅ ${archivo.replace('.png', '.mp4')} (${(mp4.length / 1024 / 1024).toFixed(1)} MB)`);
    creados++;
  } catch (e) { console.error(`   ❌ Clip ${num}: ${e.message}`); }
}

console.log(`\n📊 Clips: ${creados} creados, ${saltados} ya existían.`);
console.log(`📁 dog-comics/output/${slug}/clips/\n`);
