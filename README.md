# La Casa de Alejandro

Una app-regalo (PWA) para los 75 años de **Alejandro Borrero Ospina** (21-05-1951 → 21-05-2026).

## Cómo verla en local

```bash
npm install
npm run dev
# abre http://localhost:3000
```

## Estructura

- `src/app/` — páginas (Vestíbulo, Árbol, Estudio, Buzón, Cartas, Memoria).
- `src/components/` — UI reutilizable.
- `src/data/` — **archivos editables sin saber código**:
  - `family.ts` — los 14 perfiles (papá, hijos, nietos). Edita aquí fotos y bios.
  - `casas.ts` — las 5 casas que construyó. Edita barrio, año, foto, anécdota.
  - `cartas.ts` — las 75 cartas (una por año de vida).
  - `timeline.ts` — hitos de la línea de tiempo.
  - `updates.ts` — buzón de novedades (fotos / audios / texto).
- `public/` — fotos. Sube aquí y referencia con `/foto.jpg`.

## Editar contenido (sin código)

Todos los archivos en `src/data/` son TypeScript pero se leen como listas.
Ejemplo para agregar una novedad al Buzón en `src/data/updates.ts`:

```ts
{
  id: '2026-05-22-foto-jardin',
  fromId: 'carolina',          // id de quien lo manda (ver family.ts)
  kind: 'foto',                // 'texto' | 'foto' | 'audio' | 'video'
  title: 'Las rosas de la abuela',
  text: 'Hoy florecieron en el jardín.',
  mediaUrl: '/buzon/2026-05-22-rosas.jpg',
  createdAt: '2026-05-22T10:30:00-05:00'
}
```

Para una **carta** (en `src/data/cartas.ts`):

```ts
{
  year: 1985,
  fromId: 'alexandra',
  title: 'El año de la casa nueva',
  body: 'Texto de la carta.\n\nSegundo párrafo aquí.'
}
```

## Despliegue (Vercel)

1. Crea proyecto en https://vercel.com con este repo.
2. Production Branch: `claude/family-tree-app-e8eT4` (luego `main`).
3. Variables de entorno:
   - `NEXT_PUBLIC_BIRTHDAY_ISO=2026-05-21T07:00:00-05:00`
4. Deploy automático en cada push.

## Roadmap

- [x] Fase 0 — Cáscara PWA + tema cálido
- [x] Fase 1 — Árbol genealógico interactivo
- [x] Fase 2a — Buzón seedeable (vía data file)
- [x] Fase 3a — Estudio con las 5 casas y placeholders Elite Flower
- [x] Fase 4a — 75 cartas + Memoria con timeline
- [ ] Fase 2b — Subida desde el celular de cada miembro (Supabase)
- [ ] Fase 2c — Web Push iOS
- [ ] Fase 3b — Mapa de obras + integración del brief de investigación
- [ ] Fase 5 — Pulido + dominio + ensayo en iPhone real
