// Sintetiza cartas usando voces clonadas en ElevenLabs.
//
// Uso:
//   ELEVEN_API_KEY=xxxxx node scripts/synthesize-voices.mjs
//
// Configuración: edita voices.config.json (no commitear si tiene secretos).
// Solo procesa cartas donde el fromId tenga una voiceId mapeada y donde
// no haya ya un mp3 generado (idempotente).
//
// Salida:
//   - mp3s en /public/audios/carta-{year}.mp3
//   - mapeo regenerado en src/data/audios.ts

import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { dirname } from 'node:path';

const ROOT = new URL('../', import.meta.url);
const PUBLIC_AUDIOS = new URL('public/audios/', ROOT);
const AUDIOS_TS = new URL('src/data/audios.ts', ROOT);
const CONFIG = new URL('voices.config.json', ROOT);

const ELEVEN_API = 'https://api.elevenlabs.io/v1/text-to-speech';
const MODEL_ID = 'eleven_multilingual_v2';

// Voice settings: stability/similarity/style controlan el balance entre
// "consistente como la persona" vs "expresivo según el texto".
const VOICE_SETTINGS = {
  stability: 0.45,        // un poco de variación
  similarity_boost: 0.85, // mantenerse cerca del clon
  style: 0.30,            // expresividad moderada
  use_speaker_boost: true
};

const apiKey = process.env.ELEVEN_API_KEY;
if (!apiKey) {
  console.error('Falta ELEVEN_API_KEY en las variables de entorno.');
  process.exit(1);
}

async function exists(url) {
  try { await access(url, constants.F_OK); return true; } catch { return false; }
}

const config = JSON.parse(await readFile(CONFIG, 'utf8'));

// Importar las cartas vía dynamic import del módulo TS no es trivial sin
// un transformer. En lugar de eso, parseamos el array de CARTAS desde
// cartas.ts a mano: como es JSON-friendly, lo evaluamos.
const cartasSource = await readFile(new URL('src/data/cartas.ts', ROOT), 'utf8');
const cartasMatch = cartasSource.match(/export const CARTAS: Carta\[\] = (\[[\s\S]*?\n\]);/);
if (!cartasMatch) {
  console.error('No pude encontrar CARTAS en cartas.ts');
  process.exit(1);
}

// Reemplazos para volver el array TS en JSON parseable.
const cartasRaw = cartasMatch[1]
  .replace(/\/\/.*$/gm, '')                      // comentarios //
  .replace(/(\w+):/g, '"$1":')                   // keys sin comillas → con comillas
  .replace(/'/g, '"')                            // comillas simples → dobles
  .replace(/"\s*\+\s*\n\s*"/g, '')               // concatenaciones de strings entre líneas
  .replace(/,(\s*[}\]])/g, '$1');                // comas finales

let cartas;
try {
  cartas = JSON.parse(cartasRaw);
} catch (e) {
  console.error('No pude parsear las cartas. Edita el script si la estructura cambió.');
  console.error(e.message);
  process.exit(1);
}

await mkdir(new URL('.', PUBLIC_AUDIOS), { recursive: true });
await mkdir(PUBLIC_AUDIOS, { recursive: true });

const audioMap = {};

for (const carta of cartas) {
  const voiceId = config.voices?.[carta.fromId];
  if (!voiceId) {
    console.log(`· ${carta.year} (${carta.fromId}): sin voiceId mapeado, salto.`);
    continue;
  }

  // Saltar si el cuerpo es solo un placeholder visible.
  if (/^\[.*\]$/.test((carta.body || '').trim())) {
    console.log(`· ${carta.year}: cuerpo placeholder, salto.`);
    continue;
  }

  const outFile = new URL(`carta-${carta.year}.mp3`, PUBLIC_AUDIOS);
  audioMap[carta.year] = `/audios/carta-${carta.year}.mp3`;

  if (await exists(outFile)) {
    console.log(`✓ ${carta.year}: ya existe, saltando síntesis. Borra el mp3 para regenerar.`);
    continue;
  }

  const text = [
    carta.title ? `${carta.title}.` : '',
    carta.body
  ].filter(Boolean).join('\n\n');

  console.log(`→ Sintetizando ${carta.year} (${carta.fromId}, ${text.length} chars)...`);

  const res = await fetch(`${ELEVEN_API}/${voiceId}`, {
    method: 'POST',
    headers: {
      'xi-api-key': apiKey,
      'Content-Type': 'application/json',
      'Accept': 'audio/mpeg'
    },
    body: JSON.stringify({
      text,
      model_id: MODEL_ID,
      voice_settings: VOICE_SETTINGS
    })
  });

  if (!res.ok) {
    const err = await res.text();
    console.error(`✗ Falló ${carta.year}: HTTP ${res.status}\n${err}`);
    continue;
  }

  const buf = Buffer.from(await res.arrayBuffer());
  await writeFile(outFile, buf);
  console.log(`✓ ${carta.year}: ${(buf.length / 1024).toFixed(1)} KB`);
}

// Reescribir src/data/audios.ts
const entries = Object.entries(audioMap)
  .sort(([a], [b]) => Number(a) - Number(b))
  .map(([y, p]) => `  ${y}: '${p}'`)
  .join(',\n');

const ts = `// Auto-generado por scripts/synthesize-voices.mjs. No editar a mano.
// Mapeo año → ruta del audio en /public/audios.

export const CARTA_AUDIOS: Record<number, string> = {
${entries}
};

export function getCartaAudioUrl(year: number): string | undefined {
  return CARTA_AUDIOS[year];
}
`;

await writeFile(AUDIOS_TS, ts);
console.log(`\n✓ Mapeo actualizado: ${Object.keys(audioMap).length} audios en src/data/audios.ts`);
