# refs-fotos/ — fotos REALES para personajes basados en perros de verdad

Para perros reales (ej. **Malostragos**), aquí van sus fotos. El robot de imágenes
(`robot-imagenes.mjs casting`) las usa como referencia para que su versión de cómic
se parezca al perro real (color del pelo, orejas, hocico, porte).

## Cómo subirlas

Una carpeta por perro, con el nombre EXACTO del personaje en `../characters.json`:

```
refs-fotos/Malostragos/foto1.jpg
refs-fotos/Malostragos/foto2.jpg
refs-fotos/Malostragos/foto3.jpg
```

- Formatos: `.jpg .jpeg .png .webp`
- El robot usa hasta **3 fotos** (gemini-2.5-flash-image admite ~3 referencias).
  Elige las **3 mejores**: cara clara, cuerpo entero, buena luz, distintos ángulos.
- Evita fotos muy oscuras o con "ojos rojos" del flash (confunden el color real).

## Luego

```
node dog-comics/robot-imagenes.mjs casting
```
Genera su ficha en `refs-img/Malostragos.png` — la referencia estable que el robot
reutiliza en cada viñeta para que salga idéntico.
