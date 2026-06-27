// 🐶 ROBOT DE VOCES — Paso 3 del robot de comics de perros.
//
// Qué hace, en simple:
//   1. Lee el "casting" (characters.json): quién es cada perro y qué voz usa.
//   2. Lee un guion (ej. guiones/the-doorbell.json): qué dice cada perro.
//   3. Por cada frase, le pide a ElevenLabs que la diga con la voz de ese perro.
//   4. Guarda los audios en output/<guion>/voces/  (ej. 02-Tank.mp3).
//
// Cómo se usa:
//   ELEVEN_API_KEY=tu_key  node dog-comics/robot-voces.mjs the-doorbell
//   (o pones la key en dog-comics/.env y solo corres: node dog-comics/robot-voces.mjs the-doorbell)
//
// Es "idempotente": si un audio ya existe, no lo vuelve a generar (no gastas créditos
// de gusto). Borra el mp3 si quieres regenerarlo.

import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { constants } from 'node:fs';

const AQUI = new URL('./', import.meta.url);
const ELEVEN_TTS = 'https://api.elevenlabs.io/v1/text-to-speech';
const MODEL_ID = 'eleven_multilingual_v2'; // voz lifelike, multi-idioma

// ---------- 1. Cargar la API key (de variable de entorno o de dog-comics/.env) ----------
async function cargarEnvLocal() {
  try {
    const txt = await readFile(new URL('.env', AQUI), 'utf8');
    for (const linea of txt.split('\n')) {
      const limpia = linea.trim();
      if (!limpia || limpia.startsWith('#')) continue;
      const i = limpia.indexOf('=');
      if (i === -1) continue;
      const clave = limpia.slice(0, i).trim();
      const valor = limpia.slice(i + 1).trim().replace(/^["']|["']$/g, '');
      if (!process.env[clave]) process.env[clave] = valor;
    }
  } catch { /* no hay .env, no pasa nada */ }
}
await cargarEnvLocal();

const API_KEY = process.env.ELEVEN_API_KEY || process.env.ELEVENLABS_API_KEY;
if (!API_KEY) {
  console.error('\n❌ Falta la API key de ElevenLabs.');
  console.error('   Ponla así:  ELEVEN_API_KEY=xxxx node dog-comics/robot-voces.mjs the-doorbell');
  console.error('   O créala en el archivo  dog-comics/.env  (ver dog-comics/.env.example)\n');
  process.exit(1);
}

// ---------- 2. Leer el casting y el guion ----------
const slug = process.argv[2] || 'the-doorbell';
const casting = JSON.parse(await readFile(new URL('characters.json', AQUI), 'utf8'));
const personajes = casting.personajes;

let guion;
try {
  guion = JSON.parse(await readFile(new URL(`guiones/${slug}.json`, AQUI), 'utf8'));
} catch {
  console.error(`❌ No encontré el guion: dog-comics/guiones/${slug}.json`);
  process.exit(1);
}

const dirVoces = new URL(`output/${slug}/voces/`, AQUI);
await mkdir(dirVoces, { recursive: true });

async function existe(url) {
  try { await access(url, constants.F_OK); return true; } catch { return false; }
}

// ---------- 3. Pedir una frase a ElevenLabs (con reintento si hay saturacion) ----------
async function sintetizar(texto, voiceId, ajustes, intento = 1) {
  const res = await fetch(`${ELEVEN_TTS}/${voiceId}`, {
    method: 'POST',
    headers: { 'xi-api-key': API_KEY, 'Content-Type': 'application/json', 'Accept': 'audio/mpeg' },
    body: JSON.stringify({ text: texto, model_id: MODEL_ID, voice_settings: ajustes })
  });
  if (res.status === 429 && intento <= 4) {
    const espera = 2 ** intento * 1000; // 2s, 4s, 8s, 16s
    console.log(`   ⏳ ElevenLabs ocupado, reintento en ${espera / 1000}s...`);
    await new Promise(r => setTimeout(r, espera));
    return sintetizar(texto, voiceId, ajustes, intento + 1);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return Buffer.from(await res.arrayBuffer());
}

// ---------- 4. Recorrer el guion y generar las voces ----------
console.log(`\n🎬 Generando voces para: "${guion.titulo}"\n`);
let generados = 0, saltados = 0, sinVoz = 0;

for (let i = 0; i < guion.panels.length; i++) {
  const panel = guion.panels[i];
  const num = String(i + 1).padStart(2, '0');

  if (!panel.dice) continue; // panel sin diálogo (ej. solo efecto de sonido)

  const perro = personajes[panel.personaje];
  if (!perro) { console.log(`· Panel ${num}: personaje "${panel.personaje}" no está en el casting, salto.`); continue; }

  const voiceId = perro.voice_id;
  if (!voiceId || voiceId.startsWith('REEMPLAZAR')) {
    console.log(`· Panel ${num} (${panel.personaje}): aún sin voice_id en characters.json, salto.`);
    sinVoz++;
    continue;
  }

  const salida = new URL(`${num}-${panel.personaje}.mp3`, dirVoces);
  if (await existe(salida)) {
    console.log(`✓ Panel ${num} (${panel.personaje}): ya existe, salto. (Borra el mp3 para regenerar.)`);
    saltados++;
    continue;
  }

  console.log(`→ Panel ${num} (${panel.personaje}): "${panel.dice}"`);
  try {
    const audio = await sintetizar(panel.dice, voiceId, perro.voice_settings);
    await writeFile(salida, audio);
    console.log(`  ✅ ${num}-${panel.personaje}.mp3 (${(audio.length / 1024).toFixed(1)} KB)`);
    generados++;
  } catch (e) {
    console.error(`  ❌ Falló panel ${num}: ${e.message}`);
  }
}

// ---------- 5. Resumen ----------
console.log(`\n📊 Listo: ${generados} generados, ${saltados} ya existían, ${sinVoz} sin voz asignada.`);
console.log(`📁 Audios en: dog-comics/output/${slug}/voces/`);
if (sinVoz > 0) {
  console.log(`\n💡 Para los que faltan: pon el voice_id de cada perro en dog-comics/characters.json`);
  console.log(`   (lo sacas de ElevenLabs > Voice Design o Voice Library) y vuelve a correr.`);
}
console.log('');
