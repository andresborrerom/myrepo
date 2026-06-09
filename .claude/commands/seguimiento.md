---
description: "Status report del portfolio afiliado: Amazon clock, pending-checks vencidos, weekly review status, dashboards a chequear, próxima acción."
---

Ejecutá un status report estructurado del portfolio afiliado. Hacelo en este orden estricto.

## 1. Calcular timing (deterministic, sin LLM judgement)

Corré en bash:

```bash
echo "=== Fechas clave ==="
TODAY=$(date "+%Y-%m-%d")
echo "Hoy: $TODAY"

# Amazon Associates 180-day clock arrancó al activar tag real (commit cabc10a, 2026-05-24)
AMAZON_CLOCK_START="2026-05-24"
DAYS_IN_CLOCK=$(( ( $(date -d "$TODAY" +%s) - $(date -d "$AMAZON_CLOCK_START" +%s) ) / 86400 ))
DAYS_LEFT=$(( 180 - DAYS_IN_CLOCK ))
PCT_CONSUMED=$(( DAYS_IN_CLOCK * 100 / 180 ))
echo "Reloj Amazon Associates: día $DAYS_IN_CLOCK de 180 (${PCT_CONSUMED}% consumido)"
echo "Días restantes para gate de 3 sales: $DAYS_LEFT"

# Último commit
echo ""
echo "=== Actividad git ==="
LAST_COMMIT_DATE=$(git log -1 --format=%cs)
DAYS_SINCE_COMMIT=$(( ( $(date -d "$TODAY" +%s) - $(date -d "$LAST_COMMIT_DATE" +%s) ) / 86400 ))
echo "Último commit: $LAST_COMMIT_DATE (hace $DAYS_SINCE_COMMIT días)"

# Última weekly review
echo ""
echo "=== Weekly reviews ==="
WEEKLY_REVIEWS_DIR="affiliate/baristapath/ops/weekly-reviews"
LAST_REVIEW=$(ls -t "$WEEKLY_REVIEWS_DIR"/*.md 2>/dev/null | grep -v gitkeep | head -1)
if [ -z "$LAST_REVIEW" ]; then
  echo "ALERTA: Cero weekly reviews hechas. Template existe pero cadencia no arrancó."
  echo "Template: affiliate/baristapath/ops/weekly-review-template.md"
else
  REVIEW_DATE=$(stat -c %y "$LAST_REVIEW" | cut -d' ' -f1)
  DAYS_SINCE_REVIEW=$(( ( $(date -d "$TODAY" +%s) - $(date -d "$REVIEW_DATE" +%s) ) / 86400 ))
  echo "Última weekly review: $LAST_REVIEW (hace $DAYS_SINCE_REVIEW días)"
  if [ "$DAYS_SINCE_REVIEW" -gt 9 ]; then
    echo "ALERTA: cadencia rota (>9 días = más de 1 semana sin review)."
  fi
fi
```

## 2. Surfacear pending-checks vencidos

Leé `affiliate/baristapath/ops/pending-checks.md`. Para cada item bajo `## Activos` con status `Pending`:

- Extraé la "Ventana esperada" (fecha o rango).
- Si la fecha objetivo o el final del rango es ≤ hoy → marcar como `Due` (vencido).
- Para cada vencido, output:
  - Título de la entry (line `### YYYY-MM-DD — <titulo>`).
  - "Vencido hace N días"
  - "Acción": el campo "Qué chequear" abreviado (primera oración).

NO modifiques el archivo aún (solo lectura en este comando).

## 3. Dashboards a chequear esta sesión

Listá los 4 dashboards con URL directa + qué métrica mirar:

- **Amazon Associates** (la única manual obligatoria — sin API pública):
  - URL: https://associates.amazon.com
  - Reports → Earnings & Tracking → rango "All time"
  - Métricas: Clicks totales, Ordered items, Earnings $
  - **Métrica más importante hoy**: Clicks. Si ≥1, engine confirmado.

- **Google Search Console**:
  - URL: https://search.google.com/search-console
  - Propiedad: baristapath.com
  - Métricas: Impresiones (últimos 7 días), Clicks (últimos 7 días), Posición promedio, Páginas indexadas (Coverage tab).

- **Cloudflare Web Analytics**:
  - URL: https://dash.cloudflare.com → Analytics & Logs → Web Analytics → baristapath.com
  - Métricas: Visits, Page views, Top referrers, Top landing pages.

- **MailerLite**:
  - URL: https://dashboard.mailerlite.com/subscribers
  - Métrica: Total subscribers activos (esperado ≤5 — el lead magnet aún no recibe tráfico real).

## 4. Acción recomendada para hoy

Basado en lo anterior, output UNA acción concreta priorizada. Lógica:

- Si hay pending-checks Due → priorizá el más antiguo
- Si NO hay checks Due pero la weekly review está atrasada (>9 días) → recomendá llenar la review usando el template
- Si todo está al día → recomendá la próxima tarea del progreso.md

## 5. Recordatorios sin acción inmediata

Mencioná brevemente al final, NO como prioridad:
- ¿filamentpath está deployado? (si no sabemos, preguntá al operador).
- ¿Token de MailerLite regenerado? (pending check no time-critical).
- Bambu A1 mini: status según filamentpath deploy + KGR.

## Formato final del output

```
# Seguimiento del portfolio afiliado — <fecha>

## Reloj Amazon Associates
Día X/180 (Y% consumido) — restan Z días para gate de 3 sales.

## Checks vencidos (N)
1. [título] — vencido hace X días — Acción: [...]
2. ...

## Weekly review status
Última: [fecha o "ninguna"]. Cadencia: [OK / atrasada N días].

## Dashboards a chequear (4)
[lista con URLs]

## Acción recomendada para HOY
[una sola acción concreta]

## Recordatorios secundarios
[bullets breves]
```

Mantenelo bajo 50 líneas total. Si el operador quiere detalle de algo, lo pide después.
