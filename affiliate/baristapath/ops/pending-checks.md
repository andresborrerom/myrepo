# Pending checks — baristapath

> Time-based reminders que Claude debe surfaceár al inicio de cada sesión.
> NO es el todo de tareas estratégicas (eso vive en `progreso.md` y
> `tareas-operador.md`). Es para checks de "verifica esto en X días" — el
> tipo de reminder que se pierde si no hay un sitio dedicado.
>
> **Convención**:
> - Cada item tiene fecha de creación + ventana esperada + status.
> - Cuando un check vence (ventana cumplida), Claude lo levanta sin
>   esperar prompt.
> - Cuando el operador confirma "done" o "stale", se mueve a la sección
>   archivada al final.
>
> **Status**:
> - `Pending` — esperando ventana
> - `Due` — ventana cumplida, esperando acción del operador
> - `Done` — completado, mover a archivo
> - `Stale` — venció + ya no relevante, mover a archivo

---

## Activos

### 2026-05-26 — Verificar click registrado en Amazon Associates dashboard

- **Origen**: click-test del affiliate engine post-Tarea 3 del sprint observability. Long-press en mobile confirmó URL con `?tag=baristapath79-20`. El click se disparó en la app de Amazon.
- **Qué chequear**: `https://associates.amazon.com` → **Reports** → **Earnings & Tracking** → rango "Last 7 days" → métrica "Clicks". Debería aparecer >=1 click.
- **Ventana esperada**: 24-48h post-click → fecha objetivo **2026-05-27 a 2026-05-28**.
- **Status**: Pending.
- **Si NO aparece después de 48h**: bug de attribution o el deeplink stripeó el tag. Investigar el flow del Universal Link.

### 2026-05-26 — Re-validación de schema fix en Search Console (2 issues)

- **Origen**: schema fix del 2026-05-25 (commit `c9ecca0`) — drop del bloque `Offer` en 6 templates. Operador clickeó "VALIDAR CORRECCIÓN" en los 2 alerts.
- **Qué chequear**: GSC → **Mejoras / Compras** → **Fragmentos de productos** y **Fichas de comerciantes**. Status del issue debería pasar de "No iniciada" / "Validación en curso" → "Aprobada" o "Falló validación".
- **Ventana esperada**: 1-7 días post-VALIDAR → fecha objetivo **2026-05-28 a 2026-06-03**.
- **Status**: Pending.
- **Si falla la validación**: re-leer GSC explanation, posiblemente algún template aún emite Offer que se escapó al grep. Re-auditar.

### 2026-05-26 — Indexación de 3 URLs solicitadas en Search Console

- **Origen**: operador solicitó indexación manual de `best-grinder-under-200/`, `tools/cost-per-cup-calculator/`, `quiz/which-espresso-machine/` durante Tarea 2 del sprint observability.
- **Qué chequear**: re-inspeccionar cada URL en GSC. Status debería cambiar de "Descubierta: sin indexar" → "URL está en Google".
- **Ventana esperada**: 1-7 días → fecha objetivo **2026-05-27 a 2026-06-02**.
- **Status**: Pending.
- **Si 7+ días siguen sin indexar**: señal de crawl budget bloqueado / quality signal débil para esas URLs. Revisar internal linking + autoridad de la página origen.

### 2026-05-25 — Regenerar API token de MailerLite

- **Origen**: durante sprint B6, el token JWT pasó por el chat plaintext. Disciplina anti-gray-hat de secrets hygiene: rotar después de exposure.
- **Qué chequear**: MailerLite → Integraciones → MailerLite API → token `baristapath-prod` debería ser distinto al pasado por chat. Y CF Pages env var `MAILERLITE_API_KEY` actualizada al nuevo valor.
- **Ventana esperada**: hacelo cuando puedas, no es time-critical. Pero antes de que aparezcan suscriptores reales (= antes de tráfico orgánico, que tarda semanas).
- **Status**: Pending.

### 2026-05-25 — Configurar welcome email automation en MailerLite (opcional)

- **Origen**: B6 cerró con el subscribe flow funcional pero sin welcome email automatizado. El visitante igual recibe link al PDF en pantalla, pero un email de confirmación eleva la UX y la deliverability futura.
- **Qué chequear**: MailerLite → Automatizaciones → existe un automation "subscriber joins → send email" con asunto `Your espresso setup guide is ready` y link al PDF activo.
- **Ventana esperada**: opcional. Si ves <500 subs en mes 3 sin convertir, este es el lift más bajo para mover la aguja.
- **Status**: Pending.

### 2026-06-?? — Comprar Bambu A1 mini cuando filamentpath skeleton esté listo

- **Origen**: ADR 0005 — capital justificado por evidencia (esqueleto del sitio deployado primero, después compra). Encaja con cumpleaños de tu hijo en junio.
- **Qué chequear**: ¿filamentpath/site/ está deployado en CF Pages con estructura mínima + al menos 1 review page lista para llenar con first-party content?
- **Ventana esperada**: junio 2026 (cuando se cumplan los criterios).
- **Status**: Pending — no arrancable hasta que el scaffold de filamentpath se haya hecho.

---

## Archivado

(Vacío por ahora. Cuando un check pase a Done o Stale se mueve acá con fecha de cierre.)
