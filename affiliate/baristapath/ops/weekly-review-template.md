# Weekly review template — baristapath

> Documento operativo. Copiar este template a `weekly-reviews/YYYY-WW.md`
> (e.g. `2026-22.md` para semana 22 del año) cada lunes y llenar en 15-20
> minutos. Source de verdad para tomar decisiones data-driven semanales.
>
> **Cadencia**: cada lunes 9:00-9:30 (o cuando el operador prefiera, pero
> mismo día/hora cada semana — la consistencia importa más que la
> elección específica).
>
> **Objetivo**: detectar señales temprano. NO es para "felicitarse por la
> semana" ni para "preocuparse en pánico". Es para llegar al threshold
> de decisión a tiempo cuando ocurra.

---

## YYYY-WW (semana del DD/MM al DD/MM)

### 1. Métricas — Cloudflare Web Analytics

`dash.cloudflare.com → Analytics & Logs → Web Analytics → baristapath.com`

| Métrica | Esta semana | Semana pasada | Δ | Nota |
|---|---|---|---|---|
| Visitors únicos | | | | |
| Page views | | | | |
| Avg page views per visitor | | | | |
| Top 3 countries | | | | |
| Top 3 referrers | | | | |
| Top 5 landing pages | | | | |
| Bounce rate aprox. | | | | |

**Threshold de alarmas**:
- 0 visitors en semana 4+: bug de indexación o site bloqueado. Revisar robots.txt + GSC coverage.
- Top referrer = `(direct)` >80% en semana 8+: falta de discovery (SEO no funcionando aún).
- Bounce rate >90% en pages comerciales: contenido no engancha. Revisar copy + first paragraph.

### 2. Métricas — Google Search Console

`search.google.com/search-console → propiedad baristapath.com → Rendimiento`

Rango: **Últimos 7 días**.

| Métrica | Esta semana | Semana pasada | Δ |
|---|---|---|---|
| Impresiones totales | | | |
| Clicks totales | | | |
| CTR promedio | | | |
| Posición promedio | | | |
| Páginas con impresiones | | | |
| Queries únicas | | | |

**Top 5 queries con impresiones** (anotar query + posición):

1. `<query>` — posición X.X
2. `<query>` — posición X.X
3. ...

**Top 5 pages con clicks** (anotar URL + clicks):

1. `/path/` — N clicks
2. ...

**Threshold de alarmas**:
- 0 impresiones en GSC en semana 6+: el sitio no se está indexando o no rankea para nada. Revisar Coverage tab.
- Posición promedio >30 en semana 12+: SEO no está moviendo. Hora de revisar contenido, backlinks, technical SEO.
- CTR <1% con posición top-10: meta titles + descriptions no enganchan. Pase manual de tuning.

**Coverage** (`Indexación → Páginas`):

| Estado | Páginas |
|---|---|
| Indexadas | |
| No indexadas | |
| Excluidas (de un vistazo, no detalle) | |

**Threshold**: si <50% de las 268 páginas están indexadas en semana 8+, hay problema de crawl budget o quality signals. Decisión: priorizar internal linking + autoridad externa.

### 3. Métricas — Amazon Associates

`associates.amazon.com → Reports → Earnings & Tracking`

Rango: **Últimos 7 días**.

| Métrica | Esta semana | Acumulado total |
|---|---|---|
| Clicks (con tag `baristapath79-20`) | | |
| Ordered items | | |
| Shipped items | | |
| Earnings ($) | | |
| Top 3 products with clicks | | |

**Días corridos en el 180-day clock**: NN / 180

**Sales acumuladas en el 180-day window**: N / 3 (gate)

**Threshold de alarmas**:
- Día 60+ con 0 clicks: el affiliate engine no recibe tráfico. Issue es de tráfico, no de conversión.
- Día 90+ con clicks pero 0 sales: conversión no funciona. Revisar product pages, AffiliateButton visibility, copy.
- Día 120+ con <2 sales: 60 días para 1+ sale o se cae la cuenta. Acelerar backlinks + traffic.
- Día 150+ con <3 sales: alto riesgo. Considerar tráfico pago al pertenecer a último mes (con caveat de ROI).

### 4. Métricas — MailerLite

`dashboard.mailerlite.com → Suscriptores`

| Métrica | Esta semana | Acumulado |
|---|---|---|
| Suscriptores nuevos | | |
| Unsubscribes | | |
| Total suscriptores activos | | |

**Si configuraste welcome email automation**:

| Métrica | Esta semana |
|---|---|
| Welcome email open rate | |
| Welcome email click rate | |

**Threshold**: <500 subs en semana 26+ con 100+ visitors/día = lead magnet no convierte. Revisar copy de la landing.

### 5. Issues operacionales

- ⚠️ Alertas externas recibidas esta semana (GSC, CF, Amazon, MailerLite):
  - Registrar en `affiliate/baristapath/ops/alerts-log.md` con diagnóstico + fix.
- 🐛 Bugs visibles en producción:
  - Listar.
- 🔧 Pendientes técnicos identificados:
  - Listar.

### 6. Decisiones gatilladas esta semana

Si alguna métrica cruzó threshold → qué decisión se tomó:

- Decisión: ...
- Razonamiento: ...
- Acción siguiente: ...

Si ninguna métrica gatilló decisión → **"Sin acciones requeridas. Continuar con plan actual."**

### 7. Plan próxima semana

- Sprint actual (en curso): ...
- Tarea concreta operador: ...
- Tarea concreta Claude / agentes: ...
- Bloqueadores: ...

---

## Notas sobre cómo usar este template

1. **No saltarse semanas**. Si una semana no podés llenarlo, escribí "Sin review esta semana — razón: X" en el archivo. Tener visibilidad de gaps es parte de la review.

2. **No tunear thresholds para que se sientan bien**. Los thresholds están calibrados para detectar problemas. Si querés cambiarlos, hacelo con razón documentada — no porque "no llegamos esta semana".

3. **Promediar > picos**. Una semana de spike puede ser luck. Tomá la tendencia de 2-3 semanas antes de decisiones grandes (e.g. "no hay tráfico").

4. **Cross-referenciar nichos cuando aplique**. Cuando filamentpath esté live, comparar métricas paralelas (week 4 baristapath vs week 4 filamentpath) es señal valiosa.

5. **Promover insight al log de interacciones cuando algo sea pedagógicamente valioso**. Si en una review descubrís un patrón generalizable (e.g. "el bounce rate alto es porque la home tarda más de 1.5s en mobile en 3G"), anotarlo en `affiliate/courses-source/coffee-affiliate-site/interactions-log.md`.

---

## Histórico de revisiones del template

| Fecha | Cambio | Razón |
|---|---|---|
| 2026-05-26 | Versión inicial | Primer sprint de observability post-launch. Thresholds calibrados con expectativas conservadoras (sitio nuevo, 0 backlinks, 268 páginas). |
