# sfx/ — efectos de sonido del cómic

Sonidos que NO son diálogo: aullidos, ladridos, timbre, golpes, etc.
El robot de montaje (FFmpeg, paso futuro) los mezcla encima de las voces.

## Inventario

- `rex-howl.m4a` — el aullido oficial de Rex (muestra real aportada por Andrés).
  Rex habla con su voz diseñada (ver `../characters.json`), pero cuando AÚLLA se
  usa este audio como efecto, no la voz de texto-a-voz.

## Cómo se referencia

En `../characters.json`, el campo `sfx_howl` de un personaje apunta a su sonido aquí.
En los guiones, un panel `"tipo": "sfx"` puede pedir un efecto por nombre.
