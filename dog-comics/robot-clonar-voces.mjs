// 🐶 ROBOT DE CLONADO DE VOCES — alternativa a "diseñar por texto".
//
// En vez de describir la voz con palabras (robot-disenar-voces.mjs), aquí CLONAMOS
// la voz a partir de una muestra de audio real que TÚ grabas o eliges
// (ElevenLabs lo llama "Instant Voice Cloning"). Suele dar más control sobre el tono.
//
// Cómo se usa:
//   1. Pon las muestras en dog-comics/refs/ así (el nombre = el personaje):
//        dog-comics/refs/Bruno.mp3            (una sola muestra), o
//        dog-comics/refs/Bruno/uno.mp3        (varias muestras = mejor clon)
//        dog-comics/refs/Bruno/dos.mp3
//      Sirven .mp3 .wav .m4a .ogg .flac .webm. Mejor audio limpio, sin música de fondo.
//   2. Corre:  node dog-comics/robot-clonar-voces.mjs
//   3. Crea la voz clonada, guarda el voice_id en characters.json y deja las muestras
//      como referencia en el repo.
//
// Solo clona personajes que TENGAN muestra en refs/. A los demás no los toca.
// Si vuelves a correrlo con la misma muestra, reemplaza esa voz (no duplica en infinito):
// borra primero la voz vieja en ElevenLabs y crea la nueva.

import { readFile, writeFile, readdir, stat } from 'node:fs/promises';
import { basename, extname } from 'node:path';

const AQUI = new URL('./', import.meta.url);
const API = 'https://api.elevenlabs.io/v1/voices';
const EXTS = new Set(['.mp3', '.wav', '.m4a', '.ogg', '.flac', '.webm', '.aac', '.opus']);
const MIME = { '.mp3': 'audio/mpeg', '.wav': 'audio/wav', '.m4a': 'audio/mp4', '.ogg': 'audio/ogg', '.flac': 'audio/flac', '.webm': 'audio/webm', '.aac': 'audio/aac', '.opus': 'audio/opus' };

// ---------- API key (env o dog-comics/.env) ----------
async function cargarEnvLocal() {
  try {
    const txt = await readFile(new URL('.env', AQUI), 'utf8');
    for (const linea of txt.split('\n')) {
      const l = linea.trim();
      if (!l || l.startsWith('#')) continue;
      const i = l.indexOf('='); if (i === -1) continue;
      const k = l.slice(0, i).trim(); const v = l.slice(i + 1).trim().replace(/^["']|["']$/g, '');
      if (!process.env[k]) process.env[k] = v;
    }
  } catch {}
}
await cargarEnvLocal();
const API_KEY = process.env.ELEVEN_API_KEY || process.env.ELEVENLABS_API_KEY || process.env.ELEVENLABS_LABS_KEY;
if (!API_KEY) {
  console.error('\n❌ Falta la API key de ElevenLabs (secreto ELEVENLABS_LABS_KEY del environment, o dog-comics/.env).\n');
  process.exit(1);
}

// ---------- Reunir muestras por personaje desde refs/ ----------
const rutaCasting = new URL('characters.json', AQUI);
const casting = JSON.parse(await readFile(rutaCasting, 'utf8'));
const nombres = Object.keys(casting.personajes);

const dirRefs = new URL('refs/', AQUI);
let entradas;
try { entradas = await readdir(dirRefs); }
catch { console.error('❌ No existe dog-comics/refs/. Crea la carpeta y pon ahí las muestras de audio.'); process.exit(1); }

// Mapa: personaje -> [rutas de muestras]
const muestras = {};
function asignar(nombrePersonaje, urlArchivo) {
  const real = nombres.find(n => n.toLowerCase() === nombrePersonaje.toLowerCase());
  if (!real) return;
  (muestras[real] ||= []).push(urlArchivo);
}
for (const e of entradas) {
  const u = new URL(e, dirRefs);
  const info = await stat(u);
  if (info.isDirectory()) {
    const dentro = await readdir(u);
    for (const f of dentro) if (EXTS.has(extname(f).toLowerCase())) asignar(e, new URL(`${e}/${f}`, dirRefs));
  } else if (EXTS.has(extname(e).toLowerCase())) {
    asignar(basename(e, extname(e)), u);
  }
}

const conMuestra = Object.keys(muestras);
if (conMuestra.length === 0) {
  console.error('❌ No encontré muestras en dog-comics/refs/ que coincidan con un personaje.');
  console.error('   Nombra el archivo como el perro, ej: refs/Bruno.mp3  o  refs/Rex/aullido.wav');
  process.exit(1);
}

console.log(`\n🧬 Clonando voces desde muestras: ${conMuestra.join(', ')}\n`);
let creadas = 0;

for (const nombre of conMuestra) {
  const archivos = muestras[nombre];
  const perro = casting.personajes[nombre];
  console.log(`→ ${nombre}: ${archivos.length} muestra(s)...`);
  try {
    const form = new FormData();
    form.append('name', `Barkademy - ${nombre}`);
    form.append('description', `Voz clonada para ${nombre} (${perro.raza}). ${perro.personalidad || ''}`.slice(0, 500));
    for (const u of archivos) {
      const buf = await readFile(u);
      const ext = extname(u.pathname).toLowerCase();
      form.append('files', new Blob([buf], { type: MIME[ext] || 'application/octet-stream' }), basename(u.pathname));
    }
    const res = await fetch(`${API}/add`, { method: 'POST', headers: { 'xi-api-key': API_KEY }, body: form });
    if (!res.ok) throw new Error(`HTTP ${res.status}: ${await res.text()}`);
    const out = await res.json();
    perro.voice_id = out.voice_id;
    perro.voice_origen = 'clon';
    console.log(`   ✅ Voz clonada: ${out.voice_id}${out.requires_verification ? ' (requiere verificación en la web)' : ''}`);
    creadas++;
    await writeFile(rutaCasting, JSON.stringify(casting, null, 2) + '\n');
  } catch (e) {
    console.error(`   ❌ ${nombre}: ${e.message}`);
  }
}

console.log(`\n📊 Listo: ${creadas} voces clonadas. voice_id guardados en characters.json.`);
console.log('👉 Siguiente: node dog-comics/robot-voces.mjs the-doorbell\n');
