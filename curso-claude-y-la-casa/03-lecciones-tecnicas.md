# Lecciones técnicas

Para la pista B del curso (developers). Patrones que sí funcionaron y anti-patrones que cometí.

---

## Patrones que funcionaron

### 1. Polling para sincronización asíncrona de archivos

Cuando el usuario adjunta una imagen en Claude Code, hay un delay entre el momento del envío y el momento en que aparece en disco. Polling con `Bash run_in_background` + un loop hasta que el archivo esperado aparezca, sin bloquear la conversación.

```bash
until python3 -c "
import json, os
jsonl_dir='/root/.claude/projects/-home-user-myrepo'
files = sorted(os.listdir(jsonl_dir), key=os.path.getmtime, reverse=True)
# ... busca el mensaje específico ...
exit(0 if encontrado else 1)
"; do sleep 2; done
echo "Found"
```

Importante: la notificación de completion llega como evento — Claude no tiene que sleep activamente.

### 2. Documentación retroactiva de errores como memoria estructurada

Cada vez que Claude se equivoca y el usuario corrige, añadir un párrafo al `errores-que-generaron-reproceso.md` con:
- Síntoma reportado
- Causa raíz
- Fix aplicado
- Lección

Esto convierte la memoria del proyecto en algo durable. Las sesiones de Claude son efímeras; los archivos no.

### 3. SQL migrations como archivos en repo

Cuando Supabase necesita una migración (nueva columna, nueva tabla), guardar el SQL como archivo en `supabase/sql/...`. Permite que el usuario lo pegue en su SQL Editor y mantiene historial reproducible.

```sql
-- supabase/sql/add-position-column.sql
ALTER TABLE aportes ADD COLUMN IF NOT EXISTS position INTEGER NOT NULL DEFAULT 0;
CREATE INDEX IF NOT EXISTS aportes_from_position_idx
  ON aportes(from_id, position, created_at DESC);
```

### 4. Server Component + Client Component separation en Next.js 14

Páginas que necesitan datos de DB → Server Component (async, llama a Supabase directo). Si necesita estado/efectos → extraer un Client Component (use client) que recibe los datos como prop.

Ejemplo: `/abrir-carta/page.tsx` (server) llama a `getReleasedYears()` y le pasa el array a `<AbrirCartaRedirect />` (client) que hace la lógica de redirección.

### 5. Función central como single source of truth para reglas de negocio

`getReleasedYears()` en `lib/cartas-fetch.ts` es la ÚNICA función que decide "qué cartas son candidatas del azar". Todo lo demás (página principal, gate de carta individual, cron de push) la consulta.

Cuando se cambia el modelo (de calendar a random), un solo archivo cambia.

### 6. Agentes en paralelo para investigación

Para tareas como "investigá referencias visuales de fincas colombianas" o "encontrá VAPID keys", lanzar un agente `general-purpose` en background mientras se hace código en paralelo. La notificación de completion llega al chat.

```ts
Agent({
  description: "Research finca colombiana visual references",
  prompt: "...",
  run_in_background: true,
  subagent_type: "general-purpose"
})
```

### 7. PWA + Web Push iOS

Funciona en iOS 16.4+ pero SOLO si:
- La app está instalada en home screen (no Safari suelto)
- El usuario otorga permiso explícitamente
- Existe un service worker registrado
- Las llaves VAPID están bien configuradas

Implementación mínima: `public/sw.js`, `Notification.requestPermission()`, `pushManager.subscribe()`, web-push npm package en el cron de Vercel.

### 8. Vercel cron + GitHub Action deploy hook

Vercel cron requiere `vercel.json` con schedule. El header `Authorization: Bearer <CRON_SECRET>` valida.

Si Vercel auto-deploy se rompe por algún `[skip ci]` en historial, usar un GitHub Action que llame un Vercel Deploy Hook URL en cada push a master.

### 9. Bg removal local con rembg

Para fotos que necesitan ir sin fondo (como el caballo del recorrido):

```bash
pip3 install rembg onnxruntime
python3 -c "
from rembg import remove
from PIL import Image
img = Image.open('input.jpg')
out = remove(img)
out.save('output.png')
"
```

### 10. Drag-and-drop con @dnd-kit en mobile

`@dnd-kit/sortable` con `TouchSensor` + `activationConstraint: { delay: 250, tolerance: 8 }` evita conflicto con scroll vertical en mobile. Long-press para activar drag.

---

## Anti-patrones que cometí

### 1. Lógica replicada en múltiples lugares

El modelo "qué cartas están disponibles" estaba en 3 archivos. Arreglé 2, dejé el tercero. Resultado: bug del lado papá (insider veía bien, papá veía bloqueado).

**Lección**: cuando cambias una regla de negocio central, `grep` en TODO el repo por los patrones viejos antes de declarar el fix terminado.

### 2. Overrides silenciosos de estado

`const revealed = insider ? allReleased : realState` — para el visor insider, mostraba TODO como abierto. La familia veía 19/19 abiertos y no podía previsualizar la vista de papá.

**Lección**: cualquier "modo dev" silencioso es una trampa. Si existe, debe ser obvio (un banner, un toggle visible) o no existir.

### 3. Asumir intent en vez de preguntar

"Random entre los años con carta" puede significar dos cosas (todos los años con carta vs solo los desbloqueados por calendario). Tomé la peor sin preguntar.

**Lección**: ante ambigüedad, una pregunta de 30 segundos ahorra 3 horas de reproceso.

### 4. Apoyarse en código existente como si fuera spec

Encontré `releasedYears = filter(y => y - BIRTH_YEAR <= dayIdx)` en código viejo y lo arrastré. Era el modelo que el usuario quería cambiar.

**Lección**: leer el `.md` de contexto y los commits relevantes antes de empezar a tocar el código.

### 5. Diseñar fuera del sistema visual del proyecto

Generé sobres en SVG plano sobre fondo blanco. El usuario: "está feo, tenemos un formato bonito, respetemos eso".

**Lección**: checklist antes de commitear un componente nuevo:
- [ ] ¿Usa la paleta v3 (sabana, papel, cuero, oro, hueso, musgo)?
- [ ] ¿Usa tipografía consistente?
- [ ] ¿Tiene textura, sombra o material físico?
- [ ] ¿Encaja con los motivos del proyecto?
- [ ] ¿Aporta el "feel" del proyecto?

### 6. `git reset --hard` sin stash previo

Reseteé a master con trabajo no commiteado encima. Perdí edits a archivos tracked. Los nuevos archivos untracked sobrevivieron.

**Lección**: antes de `git reset --hard`, siempre `git stash -u`. Luego `git stash pop` para restaurar.

### 7. PRs grandes que mezclan features no relacionadas

Algunos commits en este proyecto tenían 3 cambios distintos (tarjeta nueva + bug fix + redesign). Difíciles de revisar.

**Lección**: un PR = un asunto. Si son varios, varios PRs.

---

## Notas sobre Claude Code específicamente

- **Tool combinations que funcionan bien**: `Bash` para git/build, `Edit` para cambios puntuales, `Write` para archivos nuevos, `Agent` para tareas paralelas largas, `WebSearch` para info externa actualizada.

- **Cuando pedir un agente vs hacerlo solo**: agentes son buenos para (a) investigación que tomaría 10+ búsquedas, (b) tareas paralelas mientras haces otra cosa, (c) tareas que requieren context-switching de tópico. Hacerlo solo cuando es 1-2 comandos.

- **El `.md` como prompt para el futuro**: documentar contexto en archivos permite que la próxima sesión empiece "calibrada". El usuario puede decir "lee errores-que-generaron-reproceso.md y errores X" en vez de re-explicar.

- **Mensajes de commit como narrativa**: en este proyecto, cada commit message tiene la forma "qué cambió + por qué". Sirve como `git log` legible y como input para resumir el proyecto al usuario.

- **Las llaves VAPID que generé en este proyecto son públicas en el repo**: para un proyecto productivo NO hacer esto. Generar nuevas y guardar la privada solo en env vars. Para este regalo personal está OK por el contexto controlado.
