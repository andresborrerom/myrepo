// 🐶 ROBOT DE MONTAJE — Paso 7. Arma el Reel final con FFmpeg.
//
// Toma los clips animados (output/<guion>/clips/) y:
//   1. Normaliza cada uno a 1080x1920 (9:16), 30 fps.
//   2. Le pone el audio que corresponde:
//        - panel "veo"    → conserva la voz que ya trae el clip (Veo).
//        - panel "hailuo" → le monta encima su voz de ElevenLabs (output/<guion>/voces/NN-*.mp3).
//        - sin voz (escena) → silencio.
//   3. Pega todos los clips en orden → output/<guion>/<guion>-REEL.mp4
//
// Uso:  node dog-comics/robot-montaje.mjs the-doorbell
// Requiere ffmpeg instalado.

import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const AQUI = new URL('./', import.meta.url);
const W = 1080, H = 1920, FPS = 30;
const VF = `[0:v]scale=${W}:${H}:force_original_aspect_ratio=decrease,pad=${W}:${H}:(ow-iw)/2:(oh-ih)/2:black,fps=${FPS},setsar=1[v]`;
const p = url => fileURLToPath(url);
async function existe(url) { try { await access(url, constants.F_OK); return true; } catch { return false; } }

const slug = process.argv[2];
if (!slug) { console.error('Uso: node dog-comics/robot-montaje.mjs <guion>'); process.exit(1); }

const guion = JSON.parse(await readFile(new URL(`guiones/${slug}.json`, AQUI), 'utf8'));
const dirClips = new URL(`output/${slug}/clips/`, AQUI);
const dirVoces = new URL(`output/${slug}/voces/`, AQUI);
const dirMont = new URL(`output/${slug}/montaje/`, AQUI);
await mkdir(dirMont, { recursive: true });

function ff(args) { execFileSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', ...args]); }

console.log(`\n🎞️  Montando el Reel de "${guion.titulo}"...\n`);
const normalizados = [];

for (let i = 0; i < guion.panels.length; i++) {
  const panel = guion.panels[i];
  const num = String(i + 1).padStart(2, '0');
  const etiqueta = panel.personaje || 'escena';
  const motor = panel.motor || 'hailuo';
  const clip = new URL(`${num}-${etiqueta}.mp4`, dirClips);
  if (!(await existe(clip))) { console.error(`❌ Falta el clip ${num}-${etiqueta}.mp4, lo salto.`); continue; }

  const norm = new URL(`norm_${num}.mp4`, dirMont);
  const vBase = ['-c:v', 'libx264', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-r', String(FPS), '-c:a', 'aac', '-ar', '48000', '-ac', '2'];
  const voz = new URL(`${num}-${etiqueta}.mp3`, dirVoces);

  if (motor === 'veo') {
    // conserva el audio del propio clip (la voz de Veo)
    ff(['-i', p(clip), '-filter_complex', VF, '-map', '[v]', '-map', '0:a:0?', ...vBase, p(norm)]);
    console.log(`✓ ${num} (${etiqueta}) [veo] — voz del clip`);
  } else if (await existe(voz)) {
    // hailuo + voz de ElevenLabs encima (rellena con silencio hasta el final del video)
    ff(['-i', p(clip), '-i', p(voz), '-filter_complex', `${VF};[1:a]aresample=48000,apad[a]`, '-map', '[v]', '-map', '[a]', '-shortest', ...vBase, p(norm)]);
    console.log(`✓ ${num} (${etiqueta}) [hailuo] — voz ElevenLabs`);
  } else {
    // sin voz → silencio
    ff(['-i', p(clip), '-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=48000', '-filter_complex', VF, '-map', '[v]', '-map', '1:a', '-shortest', ...vBase, p(norm)]);
    console.log(`✓ ${num} (${etiqueta}) [${motor}] — silencio`);
  }
  normalizados.push(norm);
}

if (normalizados.length === 0) { console.error('❌ No hay clips para montar.'); process.exit(1); }

// Concatenar (todos los normalizados comparten códec/formato → copy directo)
const lista = new URL('lista.txt', dirMont);
await writeFile(lista, normalizados.map(u => `file '${p(u)}'`).join('\n') + '\n');
const reel = new URL(`${slug}-REEL.mp4`, new URL(`output/${slug}/`, AQUI));
ff(['-f', 'concat', '-safe', '0', '-i', p(lista), '-c', 'copy', p(reel)]);

console.log(`\n✅ Reel listo: dog-comics/output/${slug}/${slug}-REEL.mp4`);
console.log(`   ${normalizados.length} clips · ${W}x${H} · ${FPS}fps\n`);
