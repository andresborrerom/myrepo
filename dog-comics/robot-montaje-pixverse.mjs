// 🐶 MONTAJE VERSIÓN C — clips de PixVerse (movimiento) + voces ElevenLabs (swap) + subtítulos.
// Por cada toma: toma el clip de PixVerse, le QUITA la voz genérica y le pone NUESTRA voz
// (la misma de ElevenLabs de la versión A), recorta a la duración de la voz (+cola) para
// que quede ágil, y quema el subtítulo de la frase. Luego concatena todo en un Reel.
//
// Uso:  node dog-comics/robot-montaje-pixverse.mjs give-me-the-paw
// Requiere ffmpeg + clips en output/<slug>/clips-PX/ y voces en output/<slug>/voces/.
// Salida: output/<slug>/<slug>-C-pixverse.mp4

import { readFile, writeFile, mkdir, access } from 'node:fs/promises';
import { constants } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const AQUI = new URL('./', import.meta.url);
const W = 1080, H = 1920, FPS = 30;
const FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';
const p = u => fileURLToPath(u);
async function existe(u) { try { await access(u, constants.F_OK); return true; } catch { return false; } }
function ff(args) { execFileSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', ...args]); }
function dur(f) { return parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', f]).toString().trim()) || 1.5; }
function envolver(t, max = 22) {
  const w = t.split(/\s+/); const out = []; let l = '';
  for (const x of w) { if ((l + ' ' + x).trim().length > max) { out.push(l.trim()); l = x; } else l += ' ' + x; }
  if (l.trim()) out.push(l.trim());
  return out.join('\n');
}

const slug = process.argv[2];
if (!slug) { console.error('Uso: node dog-comics/robot-montaje-pixverse.mjs <slug>'); process.exit(1); }
const guion = JSON.parse(await readFile(new URL(`guiones/${slug}.json`, AQUI), 'utf8'));
const dirPX = new URL(`output/${slug}/${process.env.CLIP_SUBDIR || 'clips-PX'}/`, AQUI);
const dirVoz = new URL(`output/${slug}/voces/`, AQUI);
const SUF = process.env.OUT_SUFFIX || 'C-pixverse';
const dirT = new URL(`output/${slug}/montaje-${SUF}/`, AQUI);
await mkdir(dirT, { recursive: true });

console.log(`\n🎞️  Montaje C (PixVerse + voces ElevenLabs) de "${guion.titulo}"\n`);
const clips = [];

for (const shot of guion.shots) {
  const px = new URL(`${shot.id}.mp4`, dirPX);
  if (!(await existe(px))) { console.error(`❌ falta clip PixVerse ${shot.id} (lo salto)`); continue; }
  const vidDur = dur(p(px));

  const quien = shot.linea?.quien;
  const voz = quien ? new URL(`${shot.id}-1-${quien}.mp3`, dirVoz) : null;
  const hayVoz = voz && await existe(voz);

  // Duración del segmento: con voz -> voz + cola corta (ágil); sin voz -> dur_seg o el clip.
  // NO capamos al largo del clip: si la voz es más larga, congelamos el último cuadro
  // (tpad) para que la frase se oiga COMPLETA sin cortarse. Si la voz es corta, recortamos.
  const D = hayVoz ? dur(p(voz)) + 0.3 : (shot.dur_seg ? shot.dur_seg + 0.2 : vidDur);

  // Subtítulo (la frase del shot), igual estilo que la versión A.
  let drawtext = '';
  if (shot.linea?.dice) {
    const txt = new URL(`cap_${shot.id}.txt`, dirT);
    await writeFile(txt, envolver(shot.linea.dice));
    drawtext = `,drawtext=fontfile=${FONT}:textfile=${p(txt)}:fontcolor=white:fontsize=54:line_spacing=10:box=1:boxcolor=black@0.55:boxborderw=24:x=(w-text_w)/2:y=h-text_h-210`;
  }

  // tpad congela el último cuadro para cubrir voces largas; luego -t D recorta a la duración exacta.
  const vf = `[0:v]scale=${W}:${H}:force_original_aspect_ratio=increase,crop=${W}:${H},setsar=1,fps=${FPS},tpad=stop_mode=clone:stop_duration=${D.toFixed(2)}${drawtext},format=yuv420p[v]`;
  const norm = new URL(`norm_${shot.id}.mp4`, dirT);
  const vBase = ['-t', String(D), '-r', String(FPS), '-c:v', 'libx264', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-ar', '48000', '-ac', '2', '-b:a', '192k'];

  if (hayVoz) {
    // Cambia la voz genérica de PixVerse por la nuestra (ElevenLabs) + nivela el volumen (loudnorm).
    ff(['-i', p(px), '-i', p(voz),
        '-filter_complex', `${vf};[1:a]loudnorm=I=-16:TP=-1.5:LRA=11,adelay=120|120,aresample=48000,apad=whole_dur=${D}[a]`,
        '-map', '[v]', '-map', '[a]', ...vBase, p(norm)]);
  } else if (shot.reaccion) {
    // Toma de reacción MUDA: silencio (la cama de música la cubre) → da respiro y timing.
    ff(['-i', p(px), '-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=48000',
        '-filter_complex', `${vf}`, '-map', '[v]', '-map', '1:a', ...vBase, p(norm)]);
  } else {
    // Sin voz nuestra (ej. toma 17 lamida): conserva el audio nativo de PixVerse.
    ff(['-i', p(px),
        '-filter_complex', `${vf};[0:a]aresample=48000,apad=whole_dur=${D}[a]`,
        '-map', '[v]', '-map', '[a]', ...vBase, p(norm)]);
  }
  console.log(`✓ ${shot.id} (${quien || 'escena'}) — ${D.toFixed(1)}s ${hayVoz ? '[voz ElevenLabs]' : '[audio PixVerse]'}`);
  clips.push(norm);
}

const lista = new URL('lista.txt', dirT);
await writeFile(lista, clips.map(u => `file '${p(u)}'`).join('\n') + '\n');
const reel = new URL(`${slug}-${SUF}.mp4`, new URL(`output/${slug}/`, AQUI));

// Cama de música continua (fluidez): MUSIC=archivo dentro de output/<slug>/.
const musica = process.env.MUSIC ? new URL(process.env.MUSIC, new URL(`output/${slug}/`, AQUI)) : null;
if (musica && await existe(musica)) {
  const base = new URL(`_base_${SUF}.mp4`, dirT);
  ff(['-f', 'concat', '-safe', '0', '-i', p(lista), '-c', 'copy', p(base)]);
  const total = dur(p(base));
  // Música por debajo con fades y ducking; voces encima. Llena los silencios entre líneas.
  ff(['-i', p(base), '-i', p(musica),
      '-filter_complex', `[1:a]volume=0.16,afade=t=in:st=0:d=1.5,afade=t=out:st=${(total - 2).toFixed(2)}:d=2[m];[0:a]volume=1.25[vv];[vv][m]amix=inputs=2:duration=first:dropout_transition=0[a]`,
      '-map', '0:v', '-map', '[a]', '-c:v', 'copy', '-c:a', 'aac', '-b:a', '192k', p(reel)]);
  console.log(`\n✅ Reel listo (con música): output/${slug}/${slug}-${SUF}.mp4  (${clips.length} tomas)\n`);
} else {
  ff(['-f', 'concat', '-safe', '0', '-i', p(lista), '-c', 'copy', p(reel)]);
  console.log(`\n✅ Reel listo: output/${slug}/${slug}-${SUF}.mp4  (${clips.length} tomas)\n`);
}
