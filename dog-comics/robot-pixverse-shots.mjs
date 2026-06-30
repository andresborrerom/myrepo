// 🐶 PIXVERSE POR TOMAS (versión C) — anima cada toma del storyboard con PixVerse V6.
// PixVerse da el MOVIMIENTO (incluye a Pepe niño, que Veo bloquea). La voz se cambia
// luego por la de ElevenLabs en el montaje (robot-montaje-pixverse.mjs).
//
// Uso:  node dog-comics/robot-pixverse-shots.mjs give-me-the-paw 01,18   (sample)
//       node dog-comics/robot-pixverse-shots.mjs give-me-the-paw          (todas)
// COSTO (fal.ai): ~$0.20 por toma a 720p. Idempotente (no repite las ya hechas).

import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { constants } from 'node:fs';

const AQUI = new URL('./', import.meta.url);
const MODEL = 'fal-ai/pixverse/v6/image-to-video';
const DESC = { Bear: 'the big ginger dog', Tank: 'the tiny Chihuahua', Africa: 'the black Giant Schnauzer', Rex: 'the Husky', Kaiser: 'the German Shepherd', Bruno: 'the golden retriever', SirWheeze: 'the English Bulldog', Pixel: 'the Border Collie', Pepe: 'the boy in the yellow Colombia jersey' };
function describir(t) { t = t || ''; for (const n of Object.keys(DESC)) t = t.replace(new RegExp(`\\b${n}\\b`, 'g'), DESC[n]); return t; }

async function cargarEnv() { try { const txt = await readFile(new URL('.env', AQUI), 'utf8'); for (const l of txt.split('\n')) { const t = l.trim(); if (!t || t.startsWith('#')) continue; const i = t.indexOf('='); if (i < 0) continue; const k = t.slice(0, i).trim(); if (!process.env[k]) process.env[k] = t.slice(i + 1).trim().replace(/^["']|["']$/g, ''); } } catch {} }
await cargarEnv();
const FK = process.env.FAL_KEY || process.env.FAL_API_KEY;
if (!FK) { console.error('❌ Falta FAL_KEY'); process.exit(1); }
const headers = { 'Authorization': `Key ${FK}`, 'Content-Type': 'application/json' };
async function existe(u) { try { await access(u, constants.F_OK); return true; } catch { return false; } }
const dormir = ms => new Promise(r => setTimeout(r, ms));

async function pixverse(input) {
  const sub = await fetch(`https://queue.fal.run/${MODEL}`, { method: 'POST', headers, body: JSON.stringify(input) });
  if (!sub.ok) throw new Error(`encolar HTTP ${sub.status}: ${(await sub.text()).slice(0, 160)}`);
  const { status_url, response_url } = await sub.json();
  for (let i = 0; i < 90; i++) { await dormir(10000); const st = await fetch(status_url, { headers }); if (!st.ok) continue; const s = await st.json(); if (s.status === 'COMPLETED') break; if (s.status === 'FAILED' || s.status === 'ERROR') throw new Error('fal ' + s.status); process.stdout.write('.'); }
  process.stdout.write('\n');
  const r = await fetch(response_url, { headers }); const d = await r.json();
  if (!d?.video?.url) throw new Error('sin video'); return d.video.url;
}

const slug = process.argv[2];
const filtro = process.argv[3] ? new Set(process.argv[3].split(',')) : null;
if (!slug) { console.error('Uso: node dog-comics/robot-pixverse-shots.mjs <slug> [ids]'); process.exit(1); }
const guion = JSON.parse(await readFile(new URL(`guiones/${slug}.json`, AQUI), 'utf8'));
const dirImg = new URL(`output/${slug}/${process.env.IMG_SUBDIR || 'imagenes'}/`, AQUI);
const dirPX = new URL(`output/${slug}/clips-PX/`, AQUI);
await mkdir(dirPX, { recursive: true });

console.log(`\n🎬 PixVerse (C) de "${guion.titulo}"\n`);
let hechos = 0, saltados = 0, fallidos = 0;
for (const shot of guion.shots) {
  if (filtro && !filtro.has(shot.id)) continue;
  const salida = new URL(`${shot.id}.mp4`, dirPX);
  if (await existe(salida)) { console.log(`✓ ${shot.id}: ya existe.`); saltados++; continue; }
  const img = new URL(`${shot.id}.png`, dirImg);
  if (!(await existe(img))) { console.error(`❌ falta imagen ${shot.id}`); fallidos++; continue; }
  const dataUri = `data:image/png;base64,${(await readFile(img)).toString('base64')}`;
  const accion = describir(shot.en_cuadro || shot.accion || '');
  const dice = shot.linea?.dice ? ` The character speaks, mouth moving lip-synced to the words: "${describir(shot.linea.dice)}".` : '';
  const pata = shot.gesto_pata ? ' The dog is sitting and lifts ONE front paw, placing it into the kneeling boy\'s open hand (a dog giving its paw), NOT a human handshake.' : '';
  const prompt = `3D Pixar-style cartoon, keep the EXACT same characters, colors and look from the image. ${accion}.${dice}${pata} Expressive comedic facial animation, smooth natural motion, single clear action.`;
  console.log(`→ ${shot.id} (${shot.linea?.quien || 'escena'}) [PixVerse]: ${(shot.linea?.dice || accion).slice(0, 45)}... (tarda ~1-2min)`);
  try {
    const url = await pixverse({ prompt, image_url: dataUri, resolution: '720p', duration: 5, generate_audio_switch: true });
    const mp4 = Buffer.from(await (await fetch(url)).arrayBuffer());
    await writeFile(salida, mp4);
    console.log(`   ✅ ${shot.id}.mp4 (${(mp4.length / 1024 / 1024).toFixed(1)} MB)`);
    hechos++;
  } catch (e) { console.error(`   ❌ ${shot.id}: ${e.message}`); fallidos++; }
}
console.log(`\n📊 PixVerse: ${hechos} clips nuevos, ${saltados} ya existían, ${fallidos} fallidos.\n📁 output/${slug}/clips-PX/\n`);
