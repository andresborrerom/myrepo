# Anonimización del fork

> Checklist explícito de qué borrar, qué reemplazar y qué conservar al forkear el repo original (`andresborrerom/myrepo`) hacia el repo nuevo (`casarte-template` o equivalente).
>
> **Regla de oro**: la **estructura técnica** se hereda; el **contenido específico** se borra. Si dudas, borra y deja un placeholder genérico.

---

## Antes de empezar

1. Confirma que estás trabajando en el **repo nuevo** (no en el original). `git remote -v` debe apuntar a tu repo, no a `andresborrerom/myrepo`.
2. Crea una rama `chore/anonimizar-fork` y haz todo el trabajo allí. No mergees a `main` hasta que el checklist esté completo.
3. **Antes de tocar nada**, ejecuta este grep para mapear el alcance:

```bash
git grep -i -n -E "alejandro|borrero|marce|alexandra|camilo|carolina|luchi|aleria|carlota|miranda|musi|pocho|pedro pablo|alissa|valentina" -- ':!**/*.md' ':!producto-white-label/**' ':!curso-claude-y-la-casa/**' > /tmp/personal-hits.txt
wc -l /tmp/personal-hits.txt
```

Cada línea de `personal-hits.txt` es algo que tienes que resolver. No tienes que borrarlo todo a mano — la mayoría está en pocos archivos (ver §1).

---

## 1. Archivos con contenido personal (BORRAR contenido, mantener forma)

| Archivo | Acción |
|---|---|
| `src/data/cartas.ts` | Vaciar el array. Dejar 2-3 cartas de **ejemplo genérico** (Lorem ipsum biográfico para "Persona Ficticia, 1950, 1962, 1980"). Conservar la **forma del tipo** (`Carta`). |
| `src/data/family.ts` | Vaciar. Dejar 4-5 personas ficticias ("Persona 1", "Persona 2") con avatares placeholder. Conservar el tipo `Persona`. |
| `src/data/cumpleanos.ts` | Vaciar. Dejar 2 tarjetas de ejemplo (con cover, body, opcional youtube). Conservar tipo `Tarjeta`. |
| `src/data/casas.ts` | Si existe contenido personal (nombres de fincas, lugares), borrar. Dejar 2 entradas ficticias. |
| `src/data/timeline.ts` | Borrar entradas. Dejar 2 hitos ficticios. |
| `src/data/updates.ts` | Borrar entradas. Dejar 1 entrada ejemplo. |
| `src/data/audios.ts` | Borrar entradas y vaciar el array. |
| `src/data/aportes-types.ts` | **CONSERVAR** — son tipos, no contenido. |
| `contexto.md` (root) | **BORRAR completo** (es la biografía privada del homenajeado). Reemplazar por un `contexto-app.md` genérico que explique cómo se llena el wizard. |
| `errores-que-generaron-reproceso.md` (root) | **MOVER** a `docs/bugs-aprendizajes.md` y mantener — es aprendizaje técnico aplicable. (Si nombres personales aparecen en los ejemplos, reemplazar por "la persona homenajeada", "la familia".) |
| `producto-regalo-generalizado.md` (root) | **BORRAR** (ya está en `producto-white-label/01-vision.md`). |
| `curso-claude-y-la-casa/` (carpeta entera) | **BORRAR**. Ese material vive en el repo original como bitácora; no aplica al producto. |
| `producto-white-label/` (carpeta entera, una vez que arranques) | Después de leerla y absorberla, puedes **borrarla** o moverla a `/docs/origen/`. No tiene que vivir en producción. |

---

## 2. Archivos con strings personales (BUSCAR y REEMPLAZAR)

Pasa por estos archivos y reemplaza cualquier referencia personal por placeholders o configuración:

| Archivo | Qué buscar | Qué hacer |
|---|---|---|
| `src/app/page.tsx` | "AB · 75", "Alejandro", "papá", "casa de papá" | Reemplazar por valores de `<GiftConfig>` (monograma generado, nombre del homenajeado, título de la casa) |
| `src/app/layout.tsx` | `<title>`, metadata, OpenGraph | Reemplazar por `gift.title` + `gift.subtitle` |
| `src/app/RecorridoIndex.tsx` | Nombres de establos | Genérico: "Capítulo 1", "Capítulo 2", o configurable por preset de tema |
| `src/app/arbol/page.tsx` | "Borrero", "ceiba de Tilatá" | Configurable: árbol con imagen subida por el comprador o fallback ilustración SVG |
| `src/app/api/alejandro/route.ts` | Renombrar carpeta a `src/app/api/destinatario/` o `src/app/api/[giftId]/state/` | Refactor a multi-tenant |
| `src/lib/cartas-fetch.ts` | Referencias a "Alejandro" / fecha de cumple hardcodeada | Recibir `giftId` como parámetro; leer `birthday` desde DB |
| `src/lib/reveal-state.ts` | Cookie `alejandro_state` | Renombrar a `gift_state_<giftId>` o usar localStorage por gift |
| `tailwind.config.ts` | Paleta única hardcoded | Mantener UNA paleta como default pero soportar runtime CSS variables (ver `02-arquitectura.md` §Paletas) |
| `src/app/aporta/page.tsx` | Email `andres.borrerom@gmail.com` en mailto | Reemplazar por `gift.ownerEmail` |
| `src/app/api/push/**` | Subject `mailto:andres.borrerom@gmail.com` en VAPID | Reemplazar por env var `VAPID_SUBJECT` (default `mailto:support@casarte.app`) |
| `next.config.js` / `next.config.mjs` | Dominios permitidos en `images.remotePatterns` | Mantener `*.supabase.co`; quitar dominios personales si los hay |
| `package.json` | `"name": "myrepo"` o "casa-de-papa" | Renombrar a `"casarte-template"` |
| `README.md` (root) | Contenido específico del regalo | Reemplazar por README genérico del template SaaS |

---

## 3. Assets en `public/` (BORRAR archivos personales)

```bash
# Listar primero, no borrar a ciegas
ls -la public/images/people/
ls -la public/images/cumpleanos/
ls -la public/images/
```

**Borrar**:
- `public/images/people/*` (todas las fotos de personas reales).
- `public/images/cumpleanos/*` (todas las portadas de tarjetas reales).
- `public/images/papa-caballo.png` (foto personal).
- Cualquier foto de finca/lugar específico subida.
- Cualquier video/audio en `public/` que sea personal.

**Conservar** (son genéricos / decorativos):
- `public/images/arbol-ceiba.jpg` → **decidir**: o lo mantienes como ilustración default opcional, o lo mueves a `public/images/defaults/tree-fallback.jpg`. Si crees que es muy "marca de la casa original", reemplázalo por otra ilustración genérica de árbol.
- Iconos SVG, favicons (regenerarás los favicons al lanzar marca).
- Service worker (`public/sw.js`) — limpiar cualquier string personal.
- Manifests (`manifest.json`) — actualizar `name`, `short_name`, `theme_color` a placeholders.

**Reemplazar con placeholders genéricos**:
- Crear `public/images/defaults/avatar-fallback.png` (silueta neutra).
- Crear `public/images/defaults/cover-fallback.jpg` (gradient + textura).
- Crear `public/images/defaults/hero-fallback.jpg` (paisaje neutro o gradient editorial).

---

## 4. Supabase / DB

**Crítico**: si forkeas con conexión al mismo proyecto Supabase, vas a leer/escribir sobre los datos reales del homenajeado original. **Crea un proyecto Supabase nuevo** antes de hacer `npm run dev`.

Pasos:

1. Crear proyecto Supabase nuevo (free tier es suficiente para empezar).
2. Copiar las migraciones desde `supabase/sql/` del repo original como **schema inicial** (sin data).
3. Adaptar las tablas al modelo multi-tenant — añadir columna `gift_id uuid not null references gifts(id)` a cada tabla que tenga contenido (aportes, push_subscriptions, etc.). Ver `02-arquitectura.md` §DB.
4. Generar `.env.local.example` con todas las vars necesarias **sin valores** (`SUPABASE_URL=`, `SUPABASE_ANON_KEY=`, `SUPABASE_SERVICE_ROLE=`, `VAPID_PUBLIC_KEY=`, `VAPID_PRIVATE_KEY=`, `VAPID_SUBJECT=`).
5. **NUNCA** subir `.env.local` con valores reales. Agregar a `.gitignore` si no está.

---

## 5. Vercel / dominios / secrets

- **No** importes el proyecto Vercel del repo original. Crea uno nuevo apuntando al nuevo repo.
- VAPID keys: **genera nuevas** (`npx web-push generate-vapid-keys`). No reutilices las del proyecto original.
- Cron jobs: revisar `vercel.json` y limpiar nombres personales en los paths del cron (`/api/cron/recordatorio` está bien; si hay alguno con nombre personal, renombrar).
- Dominios: configurar wildcard (`*.casarte.app`) en Vercel y apuntar DNS — pero solo después de tener un MVP funcionando en `vercel.app`.
- Variables de entorno: **rotar todo**. Asume comprometidas las del proyecto original.

---

## 6. Identidad visual / marca

El proyecto original tiene una identidad fuerte ("Hacienda v3" + monograma AB·75 + caballito + sello dorado). Decisiones para el white-label:

| Elemento | Acción |
|---|---|
| Paleta "sabana/papel/cuero/oro/musgo" | **Convertir en preset llamado "Hacienda"**. Crear 4 presets más (Editorial, Mediterráneo, Bosque, Costa) con diferentes paletas. Ver `02-arquitectura.md` §Paletas. |
| Tipografía Fraunces + Source Serif | **Default del preset Hacienda**. Permitir override por preset. |
| Caballito como marker del recorrido | **Convertir en motivo opcional**. El preset Hacienda lo usa; otros presets usan motivos distintos (mariposa, barca, lámpara). |
| Sello dorado en sobres | **Configurable**: oro, plata, lacre rojo, sin sello (sobre simple). |
| Monograma "AB·75" | **Generador automático**: tomar iniciales del homenajeado + edad/año/duración del wizard. |
| Hero ceiba | **Default es la imagen genérica que suba el comprador**. Fallback: gradient editorial con monograma centrado. |

**Logo / nombre del producto**:
- El proyecto se llamará tentativamente `casarte.app`. Crear logo placeholder simple (texto + glifo) — no copiar nada del proyecto original.
- Favicon: regenerar.
- OpenGraph image: regenerar con el branding del producto, no del regalo original.

---

## 7. Variables de entorno y secretos en el código

```bash
# Verificar que no quede ningún secret hardcoded
git grep -E "(VAPID|SUPABASE|API_KEY|SECRET|password)" -- src/ supabase/
```

Lo que aparezca tiene que estar leyendo de `process.env`, no como literal. Si encuentras un literal (especialmente las VAPID del proyecto original o passwords como `borrero75`, `papa75-admin`), **bórralo inmediatamente** y reemplaza por `process.env.X`.

**Reset de passwords**:
- `borrero75` y `papa75-admin` no aplican al producto. Cada gift tendrá sus propias passwords generadas en el wizard.

---

## 8. Commits y historia

Después de borrar todo:

```bash
git add -A
git commit -m "chore: anonimizar fork — borrar contenido personal del repo origen

Vacía data/* a placeholders genéricos.
Borra fotos personales en public/images/.
Refactor de Alejandro-específico a gift-genérico (siguiendo plan en producto-white-label/02-arquitectura.md).
Genera VAPID nuevas, nuevo proyecto Supabase, .env limpio.

Ver producto-white-label/04-anonimizacion.md para checklist completo."
```

**No** hagas `git push --force` para reescribir historia. La historia del fork queda como evidencia de "este repo viene de X y fue limpiado". Si te incomoda mostrar la historia personal, **crea un repo nuevo desde cero** y sube solo el código limpio (sin git history del fork). Es más caro de configurar pero más limpio.

---

## 9. Verificación final

Antes de hacer el primer deploy a Vercel del repo nuevo, corre este checklist:

- [ ] `git grep -i -E "alejandro|borrero|marce|alexandra|camilo|carolina|luchi|aleria|carlota|miranda|musi|pocho|pedro pablo|alissa"` retorna **vacío** (excepto en `producto-white-label/` y `docs/` si los conservas).
- [ ] `ls public/images/people/` está **vacío** o solo tiene placeholders.
- [ ] `ls public/images/cumpleanos/` está **vacío** o solo tiene placeholders.
- [ ] `src/data/cartas.ts`, `family.ts`, `cumpleanos.ts` contienen solo datos de ejemplo genéricos.
- [ ] `npm run dev` levanta sin crashear y muestra el wizard / la home con datos de ejemplo.
- [ ] `.env.local` no está commiteado (`git ls-files | grep env`).
- [ ] Variables de Vercel del proyecto nuevo están seteadas con secretos **nuevos**.
- [ ] El proyecto Supabase está apuntando al **nuevo** proyecto (no al del regalo original).

Una vez todo check, abre `05-roadmap.md` y empieza el día 1.

---

## 10. Nota legal/ética

El contenido original (cartas, fotos, voces, historias) pertenece a Andrés y su familia. Aunque técnicamente forkear es legítimo:

- **No publiques** el contenido personal en ninguna parte del repo nuevo, ni siquiera en commits viejos del fork.
- **No uses** las voces clonadas / audios del homenajeado original como ejemplo de marketing del producto.
- **No incluyas** screenshots con caras o nombres reales en el landing o docs públicos. Genera "casa demo" con familia ficticia para mostrar.

Si llegas a publicar el producto y el repo es público (open source), considera **resetear el git history** o **crear un repo desde cero** para no exponer commits con contenido personal del proyecto origen.
