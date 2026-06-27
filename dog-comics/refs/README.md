# refs/ — muestras de audio para CLONAR voces

Aquí van las muestras de audio con las que `robot-clonar-voces.mjs` clona la voz
de un perro (en vez de inventarla por texto).

## Cómo nombrar los archivos

El nombre del archivo = el nombre del personaje (ver `../characters.json`).

- Una sola muestra:  `Bruno.mp3`
- Varias muestras (clon mejor):  carpeta `Bruno/` con `Bruno/uno.mp3`, `Bruno/dos.mp3`, ...

Formatos: `.mp3 .wav .m4a .ogg .flac .webm .aac .opus`.

## Consejos para una buena muestra

- Audio limpio, sin música ni ruido de fondo.
- 30 seg – 2 min de la voz hablando con el tono/energía del personaje.
- Para Bruno: "chill, happy, con ganas de jugar". Para Rex: dramático / con su aullido.

## Luego corre

```
node dog-comics/robot-clonar-voces.mjs
```

Las muestras se quedan aquí como referencia reproducible (sí van al repo, son pequeñas).
