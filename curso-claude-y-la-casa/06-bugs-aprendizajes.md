# Errores que generaron reproceso

Bitácora de bugs/decisiones equivocadas que costaron reproceso al usuario. Sirve para no repetirlos y para que la próxima vez que se hereda este proyecto haya contexto.

---

## Lógica de cartas — modelo erróneo de "desbloqueo por día"

**Síntomas reportados por el usuario**: en día 4 post-cumpleaños, papá abrió 1 carta y le salió "ya las abriste todas". Y al volver, el botón aleatorio sacaba una carta sin año / vacía / placeholder.

**Causa raíz (anti-patrón)**:
1. Diseñé `releasedYears` como un slicing por día: `years.filter(y => y - BIRTH_YEAR <= dayIdx)`. Esto significaba "se desbloquea un AÑO por día desde el cumpleaños". Pero los años sin carta (los 50s, 60s mayormente) consumían días del calendario. Al día 4 solo "se había desbloqueado" 1951 — la única carta sembrada en los primeros 4 años.
2. Aún después de corregir el slicing, el pool incluía cartas-placeholder seed (`'[Camilo llenará esta carta]'`). El azar las podía sacar y papá se encontraba con una carta vacía.
3. La sección "Las que ya recibiste" en `/cartas` filtraba por slot.day < dayIdx, no por `revealedYears` real. Las cartas pre-abiertas (1979, 1983, 1985) no aparecían porque su day-index > dayIdx.

**Modelo correcto** (acordado y documentado en este commit):
- El pool de candidatos del azar = **TODOS los años con carta NO-placeholder**. Sin filtro de calendario.
- La cadencia "una por día" se enforce **únicamente con `lastRevealDate`** (registro de "la última vez que reveló algo").
- Nunca se repite una ya abierta (`restantes = released - revealed`).
- Si se agrega una carta nueva (seed o DB), entra al pool automáticamente.
- "Las que ya recibiste" lee `revealedYears` de Supabase.

**Función centralizada**: `getReleasedYears()` en `src/lib/cartas-fetch.ts`. Cualquier flujo que use el pool del azar debe consultarla.

**Lección**: el calendario es solo cadencia (`una por día`), no inventario. El inventario es el set de cartas existentes.

---

## "Carta del día" determinística que coexistía con el azar

**Síntoma**: el vestíbulo mostraba una carta específica para el día (`getCartaDelDia`), pero el botón en `/cartas` usaba selección aleatoria. Dos modelos compitiendo.

**Decisión final**: un solo modelo — **el azar**. La home tiene un CTA "ABRIR MI CARTA DE HOY" que redirige a `/abrir-carta`, que escoge al azar y redirige a `/cartas/[year]`. La función `getCartaDelDia` quedó eliminada del uso.

---

## Grid de cartas con colores basados en día, no en estado real

**Síntoma**: aparecían "en color café" (estado "abierta/pasada") los primeros años (1951, 1952, 1953, 1954) aunque papá no los había abierto.

**Causa**: en `/cartas` el `SlotCell` coloreaba según `isPast = day < dayIdx`. Esto refleja el calendario, no el estado de "abierto" real.

**Fix**: el grid se rediseñó como sobres (cerrados/abiertos) y el color/icono refleja `revealedYears`, no `dayIdx`.

---

## Push notification — set-up requería intervención manual cada PR

**Síntoma**: el deploy a Vercel se "rompía" cada vez que se mergeaba un PR. Había que ir a Vercel y promover manualmente. Mes de mayo había una serie de commits con `[skip ci]` que se comieron el auto-deploy.

**Fix**: workflow `.github/workflows/deploy-vercel.yml` que en cada push a master llama un Vercel Deploy Hook (URL en GitHub secret `VERCEL_DEPLOY_HOOK_URL`). Una vez configurado, no más promociones manuales.

---

## Imágenes de usuario no persistidas a disco a tiempo

**Síntoma**: cuando el usuario adjunta una imagen, a veces el archivo no aparece en el filesystem inmediatamente (la sesión jsonl tiene latencia de escritura). Si me precipito a leer, no encuentro nada.

**Cómo manejo esto**: uso un patrón de polling con `Bash run_in_background` que espera a que el jsonl tenga la imagen, y solo entonces extraigo. Ver ejemplos en commits de tarjetas de cumpleaños (Aleria, Carlota, sobrina, etc.).

---

## Reset --hard a master borrando trabajo en curso

**Síntoma**: hice `git reset --hard origin/master` cuando había trabajo no commiteado encima de una rama feature, perdiendo edits a archivos tracked (como `vercel.json` y `page.tsx`). Los nuevos archivos untracked sobrevivieron pero los edits fueron revertidos.

**Lección**: antes de `git reset --hard`, siempre `git stash -u` para no perder trabajo. Luego `git stash pop` para restaurar.

---

## "Insider override" en vistas que deberían ser papa-eye

**Síntoma**: `/cartas` mostró 19 de 19 sobres abiertos al usuario. Esperaba ver 4 abiertos (los que papá realmente abrió) y el resto cerrados.

**Causa raíz**: el código tenía un patrón "si el visor es insider/familia, muéstrale todo abierto en modo preview". Eso es útil para que la familia pueda revisar contenido, pero arruina la experiencia de **pre-visualizar lo que ve papá**. El usuario abrió la app con la cookie de familia y vio el override.

**Fix**: para vistas que muestran el "estado de papá" (cartas abiertas, etc.), no sobrescribir con el modo insider. Si la familia quiere ver el estado real, debe ver el estado real. Si necesitamos una vista "preview para la familia" diferente, debe ser una página o flag aparte explícito, no un override silencioso del estado.

**Lección**: cualquier "override silencioso del estado" (insider, dev mode, debug) es una trampa. Si existe, debe ser obvio (un banner, un toggle visible) o no existir.

---

## Respetar el formato visual del proyecto

**Síntoma**: rediseñé `/cartas` con sobres SVG minimalistas sobre fondo blanco-papel plano. El usuario: "está feo, tenemos un formato bonito en todo el website, respetemos eso".

**Causa raíz**: hice un componente nuevo sin mirar la paleta y el lenguaje visual del resto de la app — Hacienda v3 (sabana, cuero, oro, hairlines, ◆ entre secciones, monograma AB·75, fotos cálidas con grano, tipografía Fraunces italic). Mis SVG plain blancos contra cream se ven Tailwind genérico, no editorial.

**Lección / checklist antes de diseñar un componente nuevo**:
- [ ] ¿Usa la paleta v3 (sabana, papel, cuero, oro, hueso, musgo)?
- [ ] ¿Usa tipografía consistente (`font-display` para títulos italic, `font-mono` para metadata, `font-serif` para body)?
- [ ] ¿Tiene textura, sombra o material físico? (no aparecer como un wireframe Tailwind por defecto)
- [ ] ¿Encaja con los motivos del proyecto (caballo, ceiba, monograma, sobre con sello, pergamino)?
- [ ] ¿Aporta el "feel" Apartamento + hacienda colombiana + Hermès equestrian?

Si no se cumple por lo menos 3 de los 5, **NO commitear** sin revisar el design system.

---

## Lógica day-based replicada en múltiples lugares (CartaGate)

**Síntoma**: arreglé `getReleasedYears` y `/cartas` para usar el modelo "pool = todas las cartas no-placeholder + cadencia via lastRevealDate". Pero el `/cartas/[year]` seguía con `CartaGate` haciendo el check viejo: `if (dayIdx === null || dayOfYear > dayIdx) → locked-future`. Resultado: papá veía sus sobres bien en el grid, pero al tocar 1979 (abierto en estado) le salía "Esta carta llega después · Te llegará el día 29 desde tu cumpleaños". El usuario insider veía bien porque pasaba el gate.

**Causa raíz**: la lógica "day-based" estaba duplicada en 3 lugares (página `/cartas`, página `/abrir-carta`, componente `CartaGate`). Cuando arreglé los primeros 2, el tercero quedó con el modelo viejo. **Cualquier regla de negocio replicada en 2+ archivos es una bomba de tiempo**.

**Fix**:
1. `CartaGate` ahora confía 100% en el servidor (`tryReveal`). El servidor ya tiene la lógica correcta: si está revelado → allow; si hay cupo de hoy → reveal + allow; si cupo consumido → block-today. No hay check day-based del lado cliente.
2. La prop `dayOfYear` se eliminó del componente (era para el "te llega el día N" mensaje del bloqueo viejo).

**Lección**: cuando se cambia un modelo central (como "qué significa que una carta esté disponible"), grep en TODO el repo por la lógica vieja antes de declarar el fix terminado. Pattern para grep: cualquier `dayOfYear > dayIdx`, `y - BIRTH_YEAR <= dayIdx`, `s.day < dayIdx`, etc. Esos son antípodas del modelo nuevo.

---

## Cómo agregar al README/contexto

Cuando aparezca un nuevo error de reproceso:
1. Agrégalo a este archivo con: síntoma reportado, causa raíz, modelo correcto/fix, lección.
2. Si toca un comportamiento del producto (no solo bug técnico), actualiza también `contexto.md`.
