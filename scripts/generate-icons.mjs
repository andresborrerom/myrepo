// Genera los íconos PNG de la PWA y favicon a partir de un SVG inline.
// Correr con: node scripts/generate-icons.mjs
//
// Diseño: cuadrado con esquinas redondeadas en clay-500, una "A" grande
// tipográfica color crema. Inicial de Alejandro como sello.

import sharp from 'sharp';
import { mkdir, writeFile } from 'node:fs/promises';
import { dirname } from 'node:path';

const PUBLIC = new URL('../public/', import.meta.url);

function svg({ size, radius, bg, fg, hasBg = true }) {
  // El glyph ocupa ~62% del lienzo, centrado ópticamente.
  const fontSize = Math.round(size * 0.65);
  const yBase = Math.round(size * 0.74);
  const bgRect = hasBg
    ? `<rect width="${size}" height="${size}" rx="${radius}" fill="${bg}"/>`
    : '';
  return `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${size} ${size}" width="${size}" height="${size}">
  ${bgRect}
  <text x="50%" y="${yBase}"
        font-family="Georgia, 'Times New Roman', serif"
        font-size="${fontSize}" font-weight="700"
        text-anchor="middle" fill="${fg}">A</text>
</svg>`;
}

const CLAY = '#B05F40';
const CREAM = '#FBF7F0';

async function makePng(name, size, opts = {}) {
  const { hasBg = true, radius = Math.round(size * 0.22), padding = 0 } = opts;
  const buf = Buffer.from(
    svg({ size: size - padding * 2, radius, bg: CLAY, fg: CREAM, hasBg })
  );
  let img = sharp(buf, { density: 384 });
  if (padding > 0) {
    img = img.extend({
      top: padding, bottom: padding, left: padding, right: padding,
      background: hasBg ? CLAY : { r: 0, g: 0, b: 0, alpha: 0 }
    });
  }
  const out = new URL(name, PUBLIC);
  await mkdir(dirname(out.pathname), { recursive: true });
  await img.png().toFile(out.pathname);
  console.log('✓', name);
}

await Promise.all([
  // PWA icons
  makePng('icon-192.png', 192),
  makePng('icon-512.png', 512),
  // Maskable: el glyph ocupa el "safe zone" central (~80%) para que iOS/
  // Android puedan recortarlo en círculo, gota, etc., sin cortar la A.
  makePng('icon-maskable-512.png', 512, { padding: 64 }),
  // Apple touch icon (iOS no aplica máscara, conviene 180x180 con bg).
  makePng('apple-touch-icon.png', 180),
  // Favicon
  makePng('favicon-32.png', 32, { radius: 6 }),
]);

// Favicon SVG (vector, para navegadores modernos).
await writeFile(
  new URL('icon.svg', PUBLIC).pathname,
  svg({ size: 64, radius: 14, bg: CLAY, fg: CREAM })
);
console.log('✓ icon.svg');
