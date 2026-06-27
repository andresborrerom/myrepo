// 🐶 ROBOT DE DISEÑO DE VOCES — Paso 3a (antes que las voces hablen, hay que INVENTARLAS).
//
// Qué hace, en simple:
//   1. Lee el casting (characters.json): cada perro tiene un 'voice_prompt' (cómo suena su voz).
//   2. Por cada perro que TODAVÍA no tiene voz, le pide a ElevenLabs (API "Voice Design")
//      que invente 3 propuestas de voz a partir de esa descripción.
//   3. Guarda las 3 propuestas como mp3 en output/_voces-diseno/<Perro>/ para que las escuches.
//   4. Convierte la propuesta #1 en una VOZ PERMANENTE y guarda su 'voice_id' en characters.json.
//
// Cómo se usa:
//   node dog-comics/robot-disenar-voces.mjs
//
// Es "idempotente": si un perro ya tiene voice_id real, lo salta (no gasta créditos).
// ¿No te gustó una voz? Borra su voice_id (déjalo en "REEMPLAZAR_CON_VOICE_ID") y vuelve a correr;
// o escucha las propuestas guardadas y dime "usa la #2 para Rex" y la cambiamos a mano.

import { readFile, writeFile, mkdir } from 'node:fs/promises';

const AQUI = new URL('./', import.meta.url);
const API = 'https://api.elevenlabs.io/v1/text-to-voice';
const MODEL_DESIGN = 'eleven_multilingual_ttv_v2'; // modelo de Voice Design verificado (jun-2026)

// ---------- Cargar la API key (de variable de entorno o de dog-comics/.env) ----------
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

// Aceptamos varios nombres: el secreto del environment se llama ELEVENLABS_LABS_KEY.
const API_KEY = process.env.ELEVEN_API_KEY || process.env.ELEVENLABS_API_KEY || process.env.ELEVENLABS_LABS_KEY;
if (!API_KEY) {
  console.error('\n❌ Falta la API key de ElevenLabs.');
  console.error('   En este environment debería venir como secreto ELEVENLABS_LABS_KEY.');
  console.error('   O ponla en dog-comics/.env (ver dog-comics/.env.example)\n');
  process.exit(1);
}

const headers = { 'xi-api-key': API_KEY, 'Content-Type': 'application/json' };

// Reintento con espera si ElevenLabs responde 429 (ocupado / límite de concurrencia).
async function postJson(url, body, intento = 1) {
  const res = await fetch(url, { method: 'POST', headers, body: JSON.stringify(body) });
  if (res.status === 429 && intento <= 4) {
    const espera = 2 ** intento * 1000;
    console.log(`   ⏳ ElevenLabs ocupado, reintento en ${espera / 1000}s...`);
    await new Promise(r => setTimeout(r, espera));
    return postJson(url, body, intento + 1);
  }
  if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
  return res.json();
}

// ---------- Leer el casting ----------
const rutaCasting = new URL('characters.json', AQUI);
const casting = JSON.parse(await readFile(rutaCasting, 'utf8'));
const personajes = casting.personajes;

console.log('\n🎨 Diseñando voces para Barkademy...\n');
let creadas = 0, saltadas = 0;

for (const [nombre, perro] of Object.entries(personajes)) {
  const yaTiene = perro.voice_id && !perro.voice_id.startsWith('REEMPLAZAR');
  if (yaTiene) {
    console.log(`✓ ${nombre}: ya tiene voz (${perro.voice_id}), salto.`);
    saltadas++;
    continue;
  }
  if (!perro.voice_prompt) {
    console.log(`· ${nombre}: no tiene 'voice_prompt' en characters.json, salto.`);
    continue;
  }

  console.log(`→ ${nombre}: diseñando voz...`);
  console.log(`   prompt: "${perro.voice_prompt.slice(0, 80)}..."`);

  // Si un perro falla (ej. el filtro de seguridad rechaza su prompt), lo registramos
  // y seguimos con los demás: un perro malo no tumba toda la corrida.
  try {
    // 1) Generar 3 propuestas de voz a partir de la descripción.
    const dis = await postJson(`${API}/design`, {
      voice_description: perro.voice_prompt,
      model_id: MODEL_DESIGN,
      auto_generate_text: true
    });
    const previews = dis.previews || [];
    if (previews.length === 0) { console.error(`   ❌ ${nombre}: ElevenLabs no devolvió propuestas.`); continue; }

    // 2) Guardar las 3 propuestas para que el humano pueda comparar.
    const dirPrev = new URL(`output/_voces-diseno/${nombre}/`, AQUI);
    await mkdir(dirPrev, { recursive: true });
    for (let i = 0; i < previews.length; i++) {
      const mp3 = Buffer.from(previews[i].audio_base_64, 'base64');
      await writeFile(new URL(`propuesta-${i + 1}.mp3`, dirPrev), mp3);
    }
    console.log(`   🎧 ${previews.length} propuestas guardadas en output/_voces-diseno/${nombre}/`);

    // 3) Convertir la propuesta #1 en voz permanente y guardar el voice_id.
    const creada = await postJson(API, {
      voice_name: `Barkademy - ${nombre}`,
      voice_description: perro.voice_prompt,
      generated_voice_id: previews[0].generated_voice_id
    });
    perro.voice_id = creada.voice_id;
    console.log(`   ✅ Voz creada: ${creada.voice_id}`);
    creadas++;

    // 4) Guardar characters.json YA (si algo falla luego, no perdemos lo avanzado).
    await writeFile(rutaCasting, JSON.stringify(casting, null, 2) + '\n');
  } catch (e) {
    const bloqueo = /blocked_generation|safety guidelines/i.test(e.message);
    console.error(`   ❌ ${nombre}: ${bloqueo ? 'el filtro de seguridad de ElevenLabs rechazó el prompt. Suaviza el voice_prompt y reintenta.' : e.message}`);
  }
}

console.log(`\n📊 Listo: ${creadas} voces creadas, ${saltadas} ya existían.`);
console.log('📁 Propuestas para escuchar: dog-comics/output/_voces-diseno/<Perro>/');
console.log('📝 voice_id guardados en: dog-comics/characters.json');
console.log('\n👉 Siguiente: node dog-comics/robot-voces.mjs the-doorbell\n');
