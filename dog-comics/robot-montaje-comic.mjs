// 🐶 ROBOT DE MONTAJE MOTION-COMIC (versión A) — arma el Reel desde imágenes fijas.
// Por cada toma del storyboard: imagen + Ken Burns (zoom suave) + su voz + subtítulo
// (frase) + duración cuadrada (audio == video, sin desfase). Luego concatena todo.
//
// Uso:  node dog-comics/robot-montaje-comic.mjs give-me-the-paw
// Requiere ffmpeg. Salida: output/<slug>/<slug>-A-motioncomic.mp4

import { readFile, writeFile, mkdir, access, readdir } from 'node:fs/promises';
import { constants } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { fileURLToPath } from 'node:url';

const AQUI = new URL('./', import.meta.url);
const W = 1080, H = 1920, FPS = 30;
const FONT = '/usr/share/fonts/truetype/dejavu/DejaVuSans-Bold.ttf';
const p = u => fileURLToPath(u);
async function existe(u) { try { await access(u, constants.F_OK); return true; } catch { return false; } }
function ff(args) { execFileSync('ffmpeg', ['-y', '-hide_banner', '-loglevel', 'error', ...args]); }
function durAudio(f) { return parseFloat(execFileSync('ffprobe', ['-v', 'error', '-show_entries', 'format=duration', '-of', 'default=nw=1:nk=1', f]).toString().trim()) || 1.5; }
// Envuelve el texto en líneas de ~22 chars (drawtext no hace wrap solo).
function envolver(t, max = 22) {
  const w = t.split(/\s+/); const out = []; let l = '';
  for (const x of w) { if ((l + ' ' + x).trim().length > max) { out.push(l.trim()); l = x; } else l += ' ' + x; }
  if (l.trim()) out.push(l.trim());
  return out.join('\n');
}

const slug = process.argv[2];
if (!slug) { console.error('Uso: node dog-comics/robot-montaje-comic.mjs <slug>'); process.exit(1); }
const guion = JSON.parse(await readFile(new URL(`guiones/${slug}.json`, AQUI), 'utf8'));
const dirImg = new URL(`output/${slug}/imagenes/`, AQUI);
const dirVoz = new URL(`output/${slug}/voces/`, AQUI);
const dirT = new URL(`output/${slug}/montaje-A/`, AQUI);
await mkdir(dirT, { recursive: true });

console.log(`\n🎞️  Motion-comic de "${guion.titulo}"\n`);
const clips = [];

for (let i = 0; i < guion.shots.length; i++) {
  const shot = guion.shots[i];
  const img = new URL(`${shot.id}.png`, dirImg);
  if (!(await existe(img))) { console.error(`❌ falta imagen ${shot.id}`); continue; }

  const quien = shot.linea?.quien;
  const voz = quien ? new URL(`${shot.id}-1-${quien}.mp3`, dirVoz) : null;
  const hayVoz = voz && await existe(voz);
  const D = hayVoz ? durAudio(p(voz)) + 0.8 : (shot.dur_seg || 2.0);
  const frames = Math.round(D * FPS);

  // Ken Burns: zoom suave (alterna leve in/out por toma)
  const zin = i % 2 === 0;
  const kb = zin
    ? `zoompan=z='min(zoom+0.0009,1.12)':d=${frames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=${W}x${H}:fps=${FPS}`
    : `zoompan=z='if(eq(on,0),1.12,max(zoom-0.0009,1.0))':d=${frames}:x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':s=${W}x${H}:fps=${FPS}`;

  // Subtítulo (la frase). Se escribe a archivo para evitar problemas de escape.
  let drawtext = '';
  if (shot.linea?.dice) {
    const txt = new URL(`cap_${shot.id}.txt`, dirT);
    await writeFile(txt, envolver(shot.linea.dice));
    drawtext = `,drawtext=fontfile=${FONT}:textfile=${p(txt)}:fontcolor=white:fontsize=54:line_spacing=10:box=1:boxcolor=black@0.55:boxborderw=24:x=(w-text_w)/2:y=h-text_h-210`;
  }

  const vf = `[0:v]scale=1190:2115,setsar=1,${kb}${drawtext},format=yuv420p[v]`;
  const norm = new URL(`norm_${shot.id}.mp4`, dirT);
  const vBase = ['-t', String(D), '-r', String(FPS), '-c:v', 'libx264', '-preset', 'veryfast', '-pix_fmt', 'yuv420p', '-c:a', 'aac', '-ar', '48000', '-ac', '2'];

  if (hayVoz) {
    ff(['-loop', '1', '-i', p(img), '-i', p(voz),
        '-filter_complex', `${vf};[1:a]adelay=300|300,aresample=48000,apad=whole_dur=${D}[a]`,
        '-map', '[v]', '-map', '[a]', ...vBase, p(norm)]);
  } else {
    ff(['-loop', '1', '-i', p(img), '-f', 'lavfi', '-i', 'anullsrc=channel_layout=stereo:sample_rate=48000',
        '-filter_complex', vf, '-map', '[v]', '-map', '1:a', ...vBase, p(norm)]);
  }
  console.log(`✓ ${shot.id} (${quien || 'escena'}) — ${D.toFixed(1)}s`);
  clips.push(norm);
}

// Concatenar
const lista = new URL('lista.txt', dirT);
await writeFile(lista, clips.map(u => `file '${p(u)}'`).join('\n') + '\n');
const reel = new URL(`${slug}-A-motioncomic.mp4`, new URL(`output/${slug}/`, AQUI));
ff(['-f', 'concat', '-safe', '0', '-i', p(lista), '-c', 'copy', p(reel)]);
const total = clips.reduce((s, _) => s, 0);
console.log(`\n✅ Reel A listo: output/${slug}/${slug}-A-motioncomic.mp4  (${clips.length} tomas)\n`);
