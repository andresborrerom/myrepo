# Deployment to revenue — runbook

Este doc captura la **secuencia exacta** entre "sitio construido" (estado
hoy) y "primer dólar de Amazon Associates". Sirve para que el operador y
Claude tengan el mismo mental model de qué bloquea qué.

> **Fecha:** 2026-05-17
> **Estado actual:** sitio live, 176 páginas, NO indexable (robots.txt bloquea)

---

## Estado actual

- Sitio live en `https://baristapath.com` (Cloudflare Pages)
- 176 páginas indexable-ready: 64 products + 40 best-of + 22 compare + 22 review + 13 brand + 4 category + glossary (55 términos, 1029 autolinks) + quiz + calculator + search + estáticas
- `robots.txt` actualmente bloquea todos los crawlers (Disallow: /)
- **NO indexado en Google**
- **0 tráfico orgánico**
- Pinterest developer app: Trial pendiente review (después Standard review)
- Amazon Associates: NO aplicado todavía
- Sin imágenes reales de producto (bloqueado por Associates / decisión de fuente)

---

## Las 8 gates entre acá y primera venta

### Gate 1 — Flip robots.txt (decisión del operador, BLOQUEA TODO LO SIGUIENTE)

Para que Google rankee el sitio, los bots deben poder crawlearlo.
Actualmente robots.txt los bloquea.

**Decisión requerida del operador**: cambiar `Disallow: /` → `Allow: /`.

**Mi recomendación: hacerlo esta semana.** El catch-22 actual:
- Imágenes están bloqueadas por aprobación de Associates (necesitamos SiteStripe)
- Associates necesita tráfico documentado
- Tráfico necesita indexación
- Indexación necesita el flip de robots.txt

**Romper el ciclo**: flipear robots.txt → Google indexa nuestro contenido
de texto + schema → en 2-4 semanas las páginas empiezan a rankear para
long-tail KGR (validados en issue #21) → primeras impresiones en Search
Console.

**Riesgo**: lanzar sin imágenes convierte peor. Mitigación: la estrategia
KGR de long-tail no depende de imágenes para rankear (rankea por relevancia
semántica y schema). Las imágenes se agregan post-Associates (mes 3).

**Acción operador (~2 min):**
1. Editar `amazon-resale-project/site/public/robots.txt`
2. Reemplazar la línea `Disallow: /` con `Allow: /`
3. Commit + push
4. Cloudflare Pages auto-redeploya

### Gate 2 — Submit sitemap a Google Search Console (operador, ~10 min)

Tras flipear robots.txt:

1. Verificar sitemap accesible: `https://baristapath.com/sitemap-index.xml` (Astro lo genera automático)
2. Search Console → Add property → "baristapath.com"
3. Verificación: si Cloudflare está bajo la misma cuenta Google, auto-verifica vía DNS TXT
4. Sitemaps section → submit `https://baristapath.com/sitemap-index.xml`
5. Esperar. Indexación de sitio nuevo: 2-4 semanas hasta ver progresión

### Gate 3 — Pinterest Standard API aprobada (operador pasivo, 1-3 semanas)

Trial está pendiente (esperá email). Una vez Trial activo:
1. Login a developers.pinterest.com → app `Coffee Equipment Pin Publisher`
2. Editar URLs a `https://baristapath.com` (no más placeholder `.pages.dev`)
3. Solicitar Standard API
4. Esperar review humano: 1-3 semanas

### Gate 4 — Primeras páginas indexadas + impresiones (pasivo, ~4-6 semanas tras Gate 2)

Tras submit del sitemap, Google empieza a crawlear. Search Console
muestra "Pages indexed" creciendo y eventualmente "Impressions"
cuando las páginas aparecen en SERPs.

**Target**: ≥100 impresiones/día por semana 6 (post-indexing inicio).
- Si más bajo: problema de calidad de contenido o técnico, investigar
- Si dentro de target: continuar al Gate 5

### Gate 5 — Aplicar a Amazon Associates US (decisión + acción operador, ~30 min)

**Cuándo aplicar**: cuando todos estos checks pasen:
- ≥30 páginas de contenido original ✅ (tenemos 176)
- Tráfico documentado en Search Console (≥100 impresiones/día ideal, no estricto)
- Páginas legales live ✅ (about, privacy, methodology)
- Affiliate disclosure visible ✅ (footer)

**Mi recomendación**: aplicar cuando hit ≥100 impresiones/día, probablemente mes 2-3 post-indexing (ago-sep 2026).

**Pasos detallados en `research/amazon-associates-from-panama.md`.**

**Crítico en tax interview**: responder **"No"** a "Do you perform services in the United States?" → 0% withholding sin necesidad de treaty (Panamá no tiene).

### Gate 6 — Replace affiliate tag (Claude action, 5 min)

Tras aprobación condicional Associates:
- Operador recibe tag real (e.g. `baristapath-20`)
- Operador da el tag a Claude
- Claude hace grep + replace de `PLACEHOLDER-20` en todos los templates
- Build + push
- A partir de acá, cada click cuenta como tracked

### Gate 7 — 3 ventas calificadas en 180 días (orgánico + activo)

Post-aprobación Associates, el clock de 180 días arranca. Necesitamos 3 sales o la cuenta cierra automático sin appeal.

**Probabilidad**:
- 176 páginas + ≥500 visits/día: alcanzable
- <100 visits/día: riesgoso

**Si no llegamos**: cuenta se cierra, esperamos 6 meses, reaplicamos con más tráfico acumulado.

### Gate 8 — Primer payout recibido (~mes 5 post-Associates aprobada)

Amazon paga 60 días después del fin del mes ganado. Configuración inicial: **Gift Card** (per ADR 0003) para payouts <$200/mo — reinvertir en proyecto (compra de productos para reseñas auténticas, herramientas, etc.).

Cambiar a Payoneer cuando consistente >$500/mo.

---

## Timeline realista

Hoy: **2026-05-17**

| Mes | Date aprox | Hito |
|---|---|---|
| 0 (hoy) | May 2026 | Sitio live, robots.txt bloqueado |
| 0 + 1 semana | Fin May | **Operador flipea robots.txt + submit sitemap** |
| 1 | Jun 2026 | Indexing en progreso, primeras impresiones trickling |
| 2 | Jul 2026 | 100-1000 impresiones/día si content quality holds; **Suscribir Keepa** |
| 3 | Ago 2026 | **Aplicar Amazon Associates** + abrir Payoneer |
| 4 | Sep 2026 | Associates aprobada, primer revenue ($1-50) |
| 5 | Oct 2026 | Primer payout (Gift Card $50-200); **cita contador panameño** |
| 6 | Nov 2026 | $200-500/mo si todo funciona; revisión 90 días ADR 0003 |
| 9 | Feb 2027 | 3 sales calificadas hit (deadline 180 días Associates) |
| 12 | May 2027 | $500-2000/mo realista, evaluar próxima palanca |

---

## El bloqueante único más importante

**Decisión operador: cuándo flipear robots.txt.**

Sin esta decisión, nada del timeline arranca. Cada semana de delay = semana de delay en todo lo que viene.

**Argumento para flipear ya**: la indexación tarda 4-8 semanas en mostrar resultados. Si flipeamos hoy, primeras impresiones meaningful llegan jul-ago. Si esperamos 1 mes a flipear, todo se corre 1 mes.

**Argumento para esperar**: si querés imágenes antes de indexar, hay que esperar a Associates (mes 3). Eso significa flipear robots.txt mes 4-5. Revenue empezaría mes 7-9.

**Mi voto**: flipear esta semana. Las páginas KGR rankean por texto + schema, las imágenes son nice-to-have no critical. Visitantes que llegan en mes 1-2 que rebotan por falta de imágenes son aceptable trade vs perder 2 meses de timeline.

---

## Qué hace Claude mientras tanto

Mientras el operador decide flip + completa Gates 2-3, Claude puede en autonomía:

- **Tooltip on hover** sobre `.glossary-link` (UX polish)
- **Per-term pages** para top 5-8 head terms del glossary ("what is PID")
- **Troubleshooting content pattern** — nueva vein de long-tail
- **How-to guides** — educacional + conversión
- **Más reviews para accessories** (catalog tiene 16, solo ~3 con review)
- **Search price-range filter** para products kind
- **Calculator presets** (?preset=...) para landing pages indexables

Pero **todo esto es polish**. Sin indexación, ningún visitor lo va a ver.

---

## Decisión inmediata

Operador debe decidir:
1. **¿Flipeamos robots.txt esta semana?** (mi recomendación: sí)
2. Si sí, ¿quién hace el cambio? Claude puede hacerlo en próxima sesión cuando confirmes.
3. Si no, ¿qué criterio activaría el flip? (e.g. "cuando tengamos imágenes", "cuando tengamos 5 reviews más", etc.) — para no quedar en limbo perpetuo.
