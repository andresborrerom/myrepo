// 🐶 ROBOT DE VOCES POR TOMAS — genera el audio de cada línea del storyboard.
// Lee guiones/<slug>.json (shots), y por cada línea (shot.linea y shot.extra) genera
// un mp3 con la voz y ajustes del personaje. Bear usa la voz de Malostragos.
//
// Uso:  node dog-comics/robot-voces-shots.mjs give-me-the-paw
// Idempotente. Salida: output/<slug>/voces/<id>-<n>-<quien>.mp3

import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { constants } from 'node:fs';

const AQUI = new URL('./', import.meta.url);
const TTS = 'https://api.elevenlabs.io/v1/text-to-speech';
const MODEL = 'eleven_multilingual_v2';
const VOZ = { Bear: 'Malostragos' }; // nombre en guion -> clave en characters.json (resto = igual)

async function cargarEnvLocal() {
  try {
    const txt = await readFile(new URL('.env', AQUI), 'utf8');
    for (const l of txt.split('\n')) { const t = l.trim(); if (!t || t.startsWith('#')) continue; const i = t.indexOf('='); if (i < 0) continue; const k = t.slice(0, i).trim(); if (!process.env[k]) process.env[k] = t.slice(i + 1).trim().replace(/^["']|["']$/g, ''); }
  } catch {}
}
await cargarEnvLocal();
const API_KEY = process.env.ELEVEN_API_KEY || process.env.ELEVENLABS_API_KEY || process.env.ELEVENLABS_LABS_KEY;
if (!API_KEY) { console.error('❌ Falta la API key de ElevenLabs (ELEVENLABS_LABS_KEY).'); process.exit(1); }

async function existe(u) { try { await access(u, constants.F_OK); return true; } catch { return false; } }
const dormir = ms => new Promise(r => setTimeout(r, ms));

async function sintetizar(texto, voiceId, ajustes, intento = 1) {
  const res = await fetch(`${TTS}/${voiceId}`, {
    method: 'POST',
    headers: { 'xi-api-key': API_KEY, 'Content-Type': 'application/json', 'Accept': 'audio/mpeg' },
    body: JSON.stringify({ text: texto, model_id: MODEL, voice_settings: ajustes })
  });
  if (res.status === 429 && intento <= 4) { await dormir(2 ** intento * 1000); return sintetizar(texto, voiceId, ajustes, intento + 1); }
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${(await res.text()).slice(0, 150)}`);
  return Buffer.from(await res.arrayBuffer());
}

const slug = process.argv[2];
if (!slug) { console.error('Uso: node dog-comics/robot-voces-shots.mjs <slug>'); process.exit(1); }
const casting = JSON.parse(await readFile(new URL('characters.json', AQUI), 'utf8')).personajes;
const guion = JSON.parse(await readFile(new URL(`guiones/${slug}.json`, AQUI), 'utf8'));
const dir = new URL(`output/${slug}/voces/`, AQUI);
await mkdir(dir, { recursive: true });

console.log(`\n🎙️  Voces de "${guion.titulo}"\n`);
let hechos = 0, saltados = 0, sinVoz = 0;

for (const shot of guion.shots) {
  const lineas = [shot.linea, shot.extra].filter(l => l && l.dice && l.quien);
  for (let n = 0; n < lineas.length; n++) {
    const linea = lineas[n];
    const quien = linea.quien;
    const clave = VOZ[quien] || quien;
    const perro = casting[clave];
    const salida = new URL(`${shot.id}-${n + 1}-${quien}.mp3`, dir);

    if (!perro || !perro.voice_id || perro.voice_id.startsWith('REEMPLAZAR')) {
      console.log(`· ${shot.id} (${quien}): sin voice_id, salto.`); sinVoz++; continue;
    }
    if (await existe(salida)) { console.log(`✓ ${shot.id}-${n + 1} (${quien}): ya existe.`); saltados++; continue; }

    const texto = linea.dice.replace(/\s*\((howl|aullido)\)\s*/gi, ' ').trim();
    console.log(`→ ${shot.id}-${n + 1} (${quien}): "${texto.slice(0, 45)}"`);
    try {
      const audio = await sintetizar(texto, perro.voice_id, perro.voice_settings);
      await writeFile(salida, audio);
      console.log(`   ✅ ${(audio.length / 1024).toFixed(0)} KB`);
      hechos++;
    } catch (e) { console.error(`   ❌ ${shot.id}: ${e.message}`); }
  }
}
console.log(`\n📊 Voces: ${hechos} generadas, ${saltados} ya existían, ${sinVoz} sin voz.`);
console.log(`📁 output/${slug}/voces/\n`);
