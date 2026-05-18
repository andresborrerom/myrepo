# Deployment to revenue — runbook

Este doc captura la **secuencia exacta** entre "sitio construido" (estado
actual) y "primer dólar de Amazon Associates". Sirve para que el operador
y Claude tengan el mismo mental model de qué bloquea qué.

> **Última revisión:** 2026-05-17
> **Estado actual:** sitio live, 236 páginas, robots.txt flipped a Allow,
> esperando primer crawl de Google + submission a Search Console.

---

## Estado actual

- Sitio live en `https://baristapath.com` (Cloudflare Pages)
- **236 páginas indexable** — distribución:
  - 64 product pages
  - 40 best-of pages
  - 22 compare pages
  - 22 review pages (worth-it format) + 15 accessory reviews
  - 13 brand pages + 1 index
  - 4 category pages + 1 index
  - 12 how-to + 12 troubleshoot + 1 guides index
  - 1 glossary index + 20 glossary dedicated term pages
  - 1 quiz, 1 calculator (cost-per-cup), 1 search page
  - 5 estáticas (home, about, methodology, privacy, 404)
- **Schema completo**: Product, Review, ItemList, FAQPage, CollectionPage,
  BreadcrumbList, DefinedTerm, DefinedTermSet, WebApplication, WebSite con
  SearchAction, Organization, Brand, HowTo
- **Internal linking denso**: 1,224 glossary autolinks + related content
  sections + OwnerHelp CTAs en 41/64 product pages
- **robots.txt**: `Allow: /` + Sitemap referenciado (flipped 2026-05-17)
- Pinterest developer app: Trial pendiente review
- Amazon Associates: NO aplicado todavía
- CF Web Analytics: NO configurado (sin token todavía)
- Sin imágenes reales de producto (post-Associates approval con SiteStripe)

---

## Las 8 gates entre acá y primera venta

### ✅ Gate 1 — Flip robots.txt (COMPLETADO 2026-05-17)

robots.txt cambiado de `Disallow: /` a `Allow: /` + Sitemap referenciado.
Cloudflare Pages redeploya automático. Google bots ahora pueden crawlear
el sitio.

### Gate 2 — Submit sitemap a Google Search Console (operador, ~15 min)

**Pendiente — bloqueante para indexing real.**

Aunque robots.txt permite el crawl, Google necesita saber que el sitio
existe. Submission del sitemap a Search Console acelera el discovery.

1. Verificar sitemap accesible: `https://baristapath.com/sitemap-index.xml` (Astro lo genera automático)
2. Search Console → Add property → "URL prefix" → `https://baristapath.com/`
3. Verificación: DNS TXT record (Cloudflare auto-fills si misma cuenta Google)
4. Sitemaps section → submit `https://baristapath.com/sitemap-index.xml`
5. Esperar. Indexación inicial: 2-4 semanas

### Gate 3 — Pinterest Standard API aprobada (operador pasivo, 1-3 semanas)

Trial está pendiente (esperá email). Una vez Trial activo:

1. Login `developers.pinterest.com` → app `Coffee Equipment Pin Publisher`
2. Editar URLs a `https://baristapath.com` (no más `.pages.dev`)
3. Solicitar Standard API
4. Review humano: 1-3 semanas

### Gate 4 — Primeras páginas indexadas + impresiones (pasivo, ~4-6 semanas tras Gate 2)

Tras submit del sitemap, Google crawlea. Search Console muestra "Pages
indexed" creciendo y "Impressions" cuando aparecen en SERPs.

**Target**: ≥100 impresiones/día por semana 6 post-Gate 2.
- Si menos: problema de calidad o técnico, investigar
- Si dentro de target: continuar al Gate 5

### Gate 5 — Aplicar a Amazon Associates US (operador, ~30 min)

**Cuándo aplicar (acelerado)**: esta semana. No esperar tráfico.

Cualificación:
- ≥30 páginas de contenido original ✅ (tenemos 236)
- Páginas legales live ✅ (about, privacy, methodology)
- Affiliate disclosure visible ✅ (footer)
- Tráfico documentado en Search Console: nice-to-have, no estricto

**Pasos detallados:** `research/amazon-associates-from-panama.md`.

**Crítico**: tax interview → responder **"No"** a "Do you perform services in the US?" → 0% withholding sin tax treaty.

### Gate 6 — Replace affiliate tag (Claude action, 5 min)

Tras aprobación conditional Associates:

- Operador recibe tag real (e.g. `baristapath-20`)
- Claude hace grep + replace de `PLACEHOLDER-20` en todos los templates
- Build + push → CF redeploya
- A partir de acá cada click cuenta como tracked

### Gate 7 — 3 ventas calificadas en 180 días (orgánico + activo)

Post-aprobación, el clock de 180 días arranca. Necesitamos 3 sales o la
cuenta cierra automático sin appeal.

**Probabilidad**:
- 236 páginas + ≥500 visits/día: alcanzable
- <100 visits/día: riesgoso (reaplicar es posible, sin ban permanente)

### Gate 8 — Primer payout recibido (~mes 5 post-Associates aprobada)

Amazon paga 60 días después del fin del mes ganado. Configuración inicial:
**Gift Card** (per ADR 0003) para payouts <$200/mo — reinvertir en
proyecto. Cambiar a Payoneer cuando consistente >$500/mo.

---

## Timeline (revisado 2026-05-17)

Hoy: **2026-05-17** — robots.txt flipped, sitio public-indexable, 236
páginas listas.

| Mes | Date aprox | Hito |
|---|---|---|
| ✅ 0 (hoy) | 2026-05-17 | Sitio live + robots.txt flipped + 236 páginas |
| 0+1sem | Fin May | Operador: Search Console submit + Apply Associates |
| 1 | Jun 2026 | Indexing en progreso, primeras impresiones trickling |
| 2 | Jul 2026 | 100-1000 impresiones/día; suscribir Keepa |
| 3 | Ago 2026 | Pinterest Standard probable approval; primer revenue ($1-50) |
| 4 | Sep 2026 | Revenue estable ($50-300/mo) |
| 5 | Oct 2026 | Primer payout (Gift Card); cita contador panameño |
| 6 | Nov 2026 | $200-500/mo si todo funciona; revisión 90 días ADR 0003 |
| 9 | Feb 2027 | 3 sales calificadas hit (deadline 180 días Associates) |
| 12 | May 2027 | $500-2000/mo realista (path conservador) |

---

## El bloqueante crítico ahora

**Search Console submission**. Sin esto, robots.txt flipped no es
suficiente — Google no descubre el sitio rápido. Tarea: 15 min, hoy.

---

## Qué hace Claude mientras tanto

Mientras operador completa Gates 2-5:

- Tier 3 glossary terms (puck-prep, aeropress, nine-bar-pressure)
- Per-brand how-to expansion (Lelit, Profitec, Eureka)
- Accessory-vs-accessory compares (4-6 pages)
- Generic how-to/troubleshoot para brewers + accessories (sube CTA coverage 41 → 58/64)
- Tooltip preview on hover en glossary links

Todo es contenido neto adicional. Sin indexing aún no se ve, pero está
listo para cuando Google lo encuentre.

---

## Decisiones tomadas durante deployment

- **2026-05-17**: Plan conservador elegido (target $500-2000/mo al mes 12),
  no all-in agresivo (target $5-10k). Razón: capital/tiempo limitado,
  preferir validar antes de escalar inversión.
- **2026-05-17**: robots.txt flipped esta semana (no esperar imágenes).
  Razón: las páginas KGR rankean por texto/schema; imágenes son nice-to-have
  no critical.
