// 🐶 ROBOT DE VIDEO — Paso 6. Anima cada viñeta a un clip corto.
//
// HÍBRIDO: cada panel del guion elige su motor con el campo "motor":
//   - "hailuo" → barato, movimiento general, SIN voz (la voz de ElevenLabs se monta luego).
//   - "veo"    → Veo 3.1: el perro HABLA con la boca sincronizada (Veo pone su propia voz).
//
// Uso:
//   node dog-comics/robot-video.mjs the-doorbell        (anima todas las viñetas)
//   node dog-comics/robot-video.mjs the-doorbell 02     (solo el panel 02 — prueba)
//
// Idempotente: no re-anima un clip que ya existe.
// OJO COSTOS (en tu cuenta fal.ai): Hailuo ~$0.27/clip · Veo ~$0.90/clip. Tardan minutos.

import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { constants } from 'node:fs';

const AQUI = new URL('./', import.meta.url);
const MODELOS = {
  hailuo: 'fal-ai/minimax/hailuo-02/standard/image-to-video',
  veo: 'fal-ai/veo3.1/fast/image-to-video',
};

// ---------- API key ----------
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
if (!API_KEY) { console.error('\n❌ Falta FAL_KEY (secreto del environment o dog-comics/.env).\n'); process.exit(1); }
const headers = { 'Authorization': `Key ${API_KEY}`, 'Content-Type': 'application/json' };

async function existe(url) { try { await access(url, constants.F_OK); return true; } catch { return false; } }
const dormir = ms => new Promise(r => setTimeout(r, ms));

// Envía a fal (cualquier modelo) y espera el mp4. Devuelve la URL del video.
async function enviar(modelId, input) {
  const sub = await fetch(`https://queue.fal.run/${modelId}`, { method: 'POST', headers, body: JSON.stringify(input) });
  if (!sub.ok) throw new Error(`encolar HTTP ${sub.status}: ${(await sub.text()).slice(0, 200)}`);
  const { status_url, response_url } = await sub.json();
  for (let i = 0; i < 90; i++) {
    await dormir(10000);
    const st = await fetch(status_url, { headers });
    if (!st.ok) continue;
    const s = await st.json();
    if (s.status === 'COMPLETED') break;
    if (s.status === 'FAILED' || s.status === 'ERROR') throw new Error(`fal reportó ${s.status}`);
    process.stdout.write('.');
  }
  process.stdout.write('\n');
  const res = await fetch(response_url, { headers });
  if (!res.ok) throw new Error(`resultado HTTP ${res.status}: ${(await res.text()).slice(0, 200)}`);
  const data = await res.json();
  if (!data?.video?.url) throw new Error(`sin video: ${JSON.stringify(data).slice(0, 200)}`);
  return data.video.url;
}

// ---------- Cargar guion ----------
const slug = process.argv[2];
const soloPanel = process.argv[3];
if (!slug) { console.error('Uso: node dog-comics/robot-video.mjs <guion> [NN]'); process.exit(1); }

let guion;
try { guion = JSON.parse(await readFile(new URL(`guiones/${slug}.json`, AQUI), 'utf8')); }
catch { console.error(`❌ No encontré el guion: dog-comics/guiones/${slug}.json`); process.exit(1); }

const dirImg = new URL(`output/${slug}/imagenes/`, AQUI);
const dirClips = new URL(`output/${slug}/clips/`, AQUI);
await mkdir(dirClips, { recursive: true });

console.log(`\n🎥 Animando viñetas de: "${guion.titulo}" (híbrido Hailuo/Veo)\n`);
let creados = 0, saltados = 0;

for (let i = 0; i < guion.panels.length; i++) {
  const panel = guion.panels[i];
  const num = String(i + 1).padStart(2, '0');
  if (soloPanel && num !== soloPanel) continue;
  const etiqueta = panel.personaje || 'escena';
  const motor = panel.motor || 'hailuo';
  const salida = new URL(`${num}-${etiqueta}.mp4`, dirClips);
  if (await existe(salida)) { console.log(`✓ Clip ${num} (${etiqueta}): ya existe, salto.`); saltados++; continue; }

  const imgPath = new URL(`${num}-${etiqueta}.png`, dirImg);
  if (!(await existe(imgPath))) { console.error(`❌ Clip ${num}: falta la imagen ${num}-${etiqueta}.png`); continue; }
  const dataUri = `data:image/png;base64,${(await readFile(imgPath)).toString('base64')}`;
  const accion = panel.accion || panel.sfx || 'subtle ambient motion';

  let input;
  if (motor === 'veo') {
    // Veo: el perro habla con la boca sincronizada (Veo genera la voz).
    const dice = panel.dice ? ` The dog says, mouth clearly lip-synced to the words: "${panel.dice}".` : '';
    input = {
      prompt: `3D Pixar-style cartoon dog. ${accion}.${dice} Expressive snout, comedic, cozy living room. Keep the same character design as the image.`,
      image_url: dataUri, aspect_ratio: '9:16', duration: '6s', resolution: '1080p', generate_audio: true,
    };
  } else {
    // Hailuo: movimiento, sin voz (la voz va aparte en el montaje).
    input = {
      prompt: `3D animated cartoon. ${accion}. Subtle natural movement, gentle camera, character stays on-model.`,
      image_url: dataUri, duration: '6', resolution: '768P', prompt_optimizer: true,
    };
  }

  console.log(`→ Clip ${num} (${etiqueta}) [${motor.toUpperCase()}]: ${accion.slice(0, 50)}... (tarda minutos)`);
  try {
    const url = await enviar(MODELOS[motor], input);
    const mp4 = Buffer.from(await (await fetch(url)).arrayBuffer());
    await writeFile(salida, mp4);
    console.log(`   ✅ ${num}-${etiqueta}.mp4 [${motor}] (${(mp4.length / 1024 / 1024).toFixed(1)} MB)`);
    creados++;
  } catch (e) { console.error(`   ❌ Clip ${num}: ${e.message}`); }
}

console.log(`\n📊 Clips: ${creados} creados, ${saltados} ya existían.`);
console.log(`📁 dog-comics/output/${slug}/clips/\n`);
