# Progreso y tiempos estimados

> **Última actualización:** 2026-05-13
>
> Esta es la fuente de verdad del timing del proyecto. Claude lee este
> archivo al inicio de cada sesión y reporta al operador el estado
> actualizado. Toda revisión de tiempos se commitea acá con razón.

---

## Estado actual

### Hitos cumplidos

- ✅ ADR 0001 — estructura del repo + flujo de trabajo
- ✅ ADR 0002 — modelo: SEO programático + Amazon Associates
- ✅ ADR 0003 — vertical inicial: coffee equipment
- ✅ ADR 0004 — stack técnico: Astro + Cloudflare Pages + SQLite-in-repo + Keepa (mes 2+) + Cloudflare Web Analytics
- ✅ Research consolidado: shortlist verticales (`market/niches/shortlist.md`), Associates desde Panamá (`research/amazon-associates-from-panama.md`), recepción de pagos (`research/payment-receivers-panama.md`)
- ✅ CLAUDE.md con protocolos (decisión, anti-gray-hat, delegación a agentes, stop loss, inicio de sesión)
- ✅ Glosario de siglas del proyecto
- ✅ **Site bootstrap Astro 5** (commit 6749a74): 51 productos mock, 64 páginas (home + 51 product + 6 best-of + 6 compare), build local exitoso 1.92s, Schema.org JSON-LD completo. Vive en `amazon-resale-project/site/`, se migra a repo separado al elegir dominio.
- ✅ **Site deployado a Cloudflare Pages** (URL `myrepo-e68.pages.dev`): build CF green, /privacy + /about agregadas, app-icon.png generado, todas las páginas sirven OK.
- ✅ **Pinterest developer app submitted** (Trial API automático, Standard API pendiente review humano 1-3 semanas).
- ✅ **Validaciones nicho coffee VERDE**: issue #20 (volúmenes Ubersuggest, 15 keywords) y #21 (allintitle KGR, 12 long-tails) confirman volumen real + patrón KGR funcionando. Estrategia para escalar a 500-1000 páginas validada.
- ✅ **Dominio registrado**: `baristapath.com` (Cloudflare Registrar, ~$10.46/año, auto-renew). Astro config + privacy/about emails actualizados al nuevo dominio.
- ✅ **Custom domain conectado**: `https://baristapath.com/` sirve el sitio (SSL provisionado, DNS auto desde Cloudflare Registrar).
- ✅ **Scale content batch 2** (commit 298db58): +25 best-of + +16 compare = 108 páginas total. Patrones validados de #20/#21 aplicados (under-price-with-feature, niche-use-case, accessory-for-brand, sub-tipos).
- ✅ **Methodology page** (commit afb22e7): editorial standards transparentes para build trust pre-Associates application. Footer actualizado: About | Methodology | Privacy policy.
- ✅ **Scale content batch 3a — accessories** (agent A): +13 accessories al catálogo (64 productos totales, antes 51) + 9 best-of pages targeted aprovechando los accesorios nuevos.
- ✅ **Scale content batch 3b — review pages** (agent B, commit 513189f): nuevo template `/review/[slug]` + 22 páginas tipo "is X worth it for Y". Mix de verdicts honestos (15 yes / 6 depends / 1 no). Schema Review + Product + FAQPage + BreadcrumbList.
- 📊 **Total páginas del sitio: 153** (arrancamos la sesión con 67, +128% en una sesión).
- ✅ **Design benchmark research** (commit cc0de82): doc en `research/design-benchmark.md` con patterns table-stakes vs diferenciadores de 6-9 sitios afiliados top + recomendaciones priorizadas por ROI.
- ✅ **Internal linking pass** (commit 5a4386a): Related content section en 4 templates, helper module `src/lib/related-content.ts`, 125/153 páginas con links cruzados.
- ✅ **UX batch A** (table-stakes patterns implementados): 4 componentes nuevos (VerdictBox, AffiliateButton, Byline, MethodologyNote) + multi-tier labels en best-of + update cadence visible + Review schema E-E-A-T mejorado (author + dateModified). Sitio alineado con dominante de afiliados coffee top.
- ✅ **UX batch B** (compare pages mejoradas, commit 5b59611): 22 compare pages ahora muestran 9.14 differentiator rows arriba + collapse de common specs vía `<details>` nativo. Pattern de afiliados top aplicado.
- ✅ **Calculator cost-per-cup tool** (commit pendiente verificar): nueva página `/tools/cost-per-cup-calculator/` con 7 inputs + 7 outputs, schema WebApplication + FAQPage, accesible y mobile responsive. **Diferenciador único** — ningún sitio del benchmark tiene calculator. Linkeada desde header nav, home banner, y methodology page. **154 páginas total ahora**.
- ✅ **Quiz "Which espresso machine should I buy?"** (commit e5492c7): nueva página `/quiz/which-espresso-machine/` con 7 preguntas score-based, anti-gray-hat verificado (sub-$200 → Moka pot, beginner + $3000+ → caveat, inconsistencias flagged). 155 páginas total.
- ✅ **Home redesign** (commit 6a25c58): 7 secciones (Hero + Tools + Start here + Latest reviews + Compare popular + By tier + Methodology banner), 19 internal links concentrados, schema WebSite/Organization/ItemList, 40.7KB total weight.
- ✅ **Search page client-side** (commit 8d0f597): nueva `/search/` con Fuse.js sobre 148 entries (productos + best-of + compare + review), 26.4KB gzip total, schema WebSite SearchAction ahora apunta a URL real (sitelinks-search-box ready cuando ganemos autoridad). **156 páginas total.**
- ✅ **Quiz snapshot tests** (commit pendiente): scoring extraído a `src/lib/quiz-scoring.js` + 9 tests (7 escenarios canónicos + 2 sanity) — todos passing. CI workflow corre `npm test` antes de build. Previene regresiones cuando se tunee scoring después de feedback real.
- ✅ **Search filter pills + Calculator v2 shareable URL** (commits 6193056 + último): pills por kind (Products/Best/Compare/Reviews/All) con URL state en `/search/`; Share button + URL serialization en `/tools/cost-per-cup-calculator/` para backlinks orgánicos desde Reddit/foros.
- ✅ **Brand + Category + Glossary pages** (commits varios): nuevas estructuras para topical authority. **13 brand pages** (Breville, Gaggia, etc.), **4 category pages** con buying guides (espresso-machines, grinders, brewers, accessories), **1 glossary page** con 55 términos técnicos + internal linking contextual aplicado a 10 páginas key.
- ✅ **Autolink glossary post-build** (commit último): script `scripts/autolink-glossary.mjs` que enlaza primera mención de cada term en cada page automáticamente. **+1,029 glossary links** across 172 HTML files / 42 unique terms. Build cost +0.5s. Idempotente, nested-anchor-safe, word-boundary correct con guiones.
- 🚀 **robots.txt FLIPPED a Allow** (2026-05-17): sitio public-indexable. Sitemap referenciado en robots.txt. Soft launch terminado. Gate 1 del runbook `docs/deployment-to-revenue.md` resuelto.
- ✅ **15 accessory reviews nuevas** (commit e4085dc): catalog gap cerrado. 9 yes / 4 depends / 2 no (Bplus WDT overpriced, Acaia Pearl S no justified sub-$1k). Llena Related Content de 10-11 best-of accessory-related que estaban vacías.
- ✅ **How-to + Troubleshooting content vein**: 2 templates nuevos (`/how-to/[slug]`, `/troubleshoot/[slug]`) + 1 guides index + 24 pages (12 each). Anti-gray-hat estricto: OPV mod con warranty caveat, Cafiza ≠ Dezcal disclaimer, channeling explícito como technique no hardware. 9/12 troubleshoot pages NO recomiendan affiliate parts (DIY genuino).
- ✅ **Per-term glossary pages** (commit 18a8d60): 12 páginas dedicadas para head terms del glossary (PID, burr types, boiler types, group head, pre-infusion, WDT, channeling, extraction, etc.). Autolink prioriza dedicated > anchor. Anti-gray-hat en debates contenciosos (PID worth it depends, flat vs conical sin posición). Links autolink subieron de 1,074 → 1,224.
- ✅ **Glossary tier 2** (commit bc7684d): 8 páginas dedicadas adicionales (crema, e61-group, opv, thermojet, specialty-grade, single-dosing, flat-burr, conical-burr). Crema myth desmitificado; E61 trade-offs explícitos; OPV con warranty caveat; flat vs conical reconocen blind taste indistinguibility.
- ✅ **Inline CTAs en product pages** (commit 700dbf2): componente `OwnerHelp.astro` con border-left amber. 41/64 product pages muestran 2 how-to + 2 troubleshoot relevantes (espresso machines + grinders). 23/64 skipean correctamente (accessories + brewers sin guides aún). +870 bytes promedio peso.
- ✅ **Generic how-to/troubleshoot para brewers + accessories** (commit 2ecc48b): +8 pages cubren cleaning + kettle descale + pour-over grind + knock-box + WDT + Moka mistakes + French press grit + puck screen. **Coverage CTA ahora 64/64** product pages (full). Anti-gray-hat estricto.
- ✅ **AeroPress + V60 recipes** (commit último): +8 how-to capturando high-volume brewing queries (Hoffmann AeroPress + V60, Kasuya WAC 2016 + 4:6 V60, travel workflow, ratio guide, pour-over vs AeroPress). Bug fix bonus: `toIsoDuration` ahora reconoce plurales. Anti-gray-hat: cada recipe atribuye fuente original.
- ✅ **V60/pour-over commercial intent pages**: +6 pages (4 best-of + 2 compare) cierran funnel top-of-funnel → conversión. 8 recipes modificados con "Need the right gear?" step final linkeando a best-of relevantes. Anti-gray-hat: Acaia overpriced flag, Fellow Stagg only-in-catalog framed honesto, filter page educational sin afiliado.
- ✅ **+6 productos al catalog** (commit último): Hario V60 Buono kettle, OXO Brew gooseneck electric, Timemore Black Mirror Basic scale, Hario + AeroPress + CAFEC paper filters. Catalog 64 → 70. ASINs verificados via WebSearch. Best-of pages V60/AeroPress pasan de educational-only a 3-picks ranked con affiliate options.
- ✅ **+2 grinders mid-tier** (commit 0412814): MiiCoffee DF54 ($249 single-dose electric flat burr) + 1Zpresso K-Ultra ($249 hand grinder). Llena gap $200-400 entre Encore y Niche Zero. 8 best-of pages ganan picks adicionales. Catalog 70 → 72.
- 🚀 **Search Console verificado + sitemap submitted** (2026-05-24): Gate 2 cerrado, reloj de indexing arrancó.
- 🚀 **Amazon Associates application aprobada conditional** (2026-05-24): Store ID `baristapath79-20`. W-8BEN signed, Income type Service, Status Unblocked, withholding 0% (gracias a "No services in US"). Payment method Gift Card $10 min. **Tag real reemplazado en site (commit cabc10a) — cada click ahora cuenta para los 3 sales del 180-day clock.**
- ✅ **Best grinder under $300** (commit ed7c86d): KGR opportunity en mid-tier llenada. 5 picks del catalog (Opus, Encore ESP, K-Ultra, DF54, Comandante C40). FAQ #6 anti-dark-pattern: explica cuándo SALTAR el tier a $500+ (vendedores nunca lo recomiendan, nosotros sí). 267 páginas total.
- 🚀 **Google Search Console verificado + sitemap submitted** (2026-05-24): Gate 2 del runbook resuelto. Sitio descubrible por Google bots. Indexing inicia en próximos días/semanas. Meta tag de verificación en `Base.astro`.
- 📊 **Total páginas del sitio: 266** (de los 67 iniciales: +297%).
- 🧭 **Courses business scaffold** (commit 2ae2a7b, 2026-05-24): `courses-source/` para depositar MVPs + `AGENT_PROMPT.md` para generar cursos vía Claude Code Agent tool. Pendiente operador: poblar 2-3 MVPs antes del primer dispatch.
- 🔍 **Shortlist 2do nicho research** (commit 3ede598, 2026-05-24): 11 verticales evaluados. Top 3: 3D printing (25/30), hi-fi audio (24/30), hunting/archery (24/30). Recomendación: **3D printing** (SERP fragmentada, dataset specs medibles, match operador data scientist). Pendiente decisión operador.

### Próximo hito objetivo

**Sitio publicado con 100 páginas mock indexadas — meta 2026-06-13 (fin mes 1).**

### Bloqueadores activos

- Validaciones de nicho pendientes del operador: #19 (comisión Kitchen, espera tener Associates), **#20 (volúmenes Ubersuggest, ≈30 min)**, **#21 (allintitle KGR, ≈15 min)**. Sin estas dos no escalamos contenido más allá del esqueleto actual.
- Pinterest Standard API: submitted, review humano 1-3 semanas. No bloquea construcción.

---

## Cronograma actualizado

| Mes (desde 2026-05-13) | Hito clave | Confianza |
|---|---|---|
| Mes 0 — esta semana | Validaciones manuales operador (#20, #21, Pinterest app) | Alta — depende del operador |
| Mes 1 — jun 2026 | Sitio publicado, ≥100 páginas mock indexadas, deploy CF Pages | Alta si validaciones pasan en verde |
| Mes 2 — jul 2026 | Suscripción Keepa, pull 500-1000 productos, ≥500 páginas reales | Media-alta |
| Mes 3 — ago 2026 | Aplicar Amazon Associates US, abrir Payoneer, ≥1000 impresiones/día | Media |
| Mes 4 — sep 2026 | Associates aprobada (depende de Amazon), primer revenue ($1-50) | Media |
| Mes 5 — oct 2026 | $50-200/mes, contador panameño antes de fin de mes | Media-baja |
| Mes 6 — nov 2026 | $200-500/mes, revisión 90 días ADR 0003, decisión pivot/continuar | Media-baja |

Targets de mes 5-6 son la mitad superior del rango realista. La mitad
inferior es "nicho no funcionó, pivot a outdoor cooking en mes 6
reutilizando infra".

---

## Tiempo total estimado del operador

**~8 horas distribuidas en 6 meses.** Bloques:

| Bloque | Cuándo | Tiempo | Estado |
|---|---|---|---|
| A — esta semana | 2026-05-13 a 2026-05-20 | 75 min | Pendiente |
| B — mes 1 | jun 2026 | 30 min | Futuro |
| C — mes 2 | jul 2026 | 30 min | Futuro |
| D — mes 3 | ago 2026 | 2-3 h | Futuro |
| E — mes 4 | sep 2026 | 30 min | Futuro |
| F — antes mes 6 | oct 2026 | 1-2 h | Futuro |

Detalle de cada tarea en `docs/tareas-operador.md` y en el PDF derivado.

---

## Tiempo de Claude / agentes

Trabajo de Claude depende de cadencia de conversación con operador.
Trabajo de agentes en cron de GitHub Actions corre 24/7 una vez activado.

**Próximos pasos sin esperar operador:**

1. ~~Esqueleto Astro inicial con 3 templates~~ ✅ hecho (commit 6749a74).
2. ~~50-100 ASINs mock~~ ✅ 51 productos mock cargados.
3. **Pendiente**: 404 page + robots.txt + `npm audit fix`.
4. **Pendiente**: deploy a Cloudflare Pages a una URL `.pages.dev` temporal (no submitir a Search Console hasta tener dominio real + validaciones verdes).
5. **Pendiente**: agente de research para shortlist de dominios candidatos (se puede correr mientras esperamos #20/#21).
6. **Bloqueado por operador**: si #20 y #21 vienen verdes, picking de dominio + deploy + replace de placeholders (affiliate tag, canonicals, CF Web Analytics token).

---

## Historial de revisiones

| Fecha | Cambio | Razón |
|---|---|---|
| 2026-05-13 | Versión inicial del cronograma | Tras aceptación ADR 0004 con tweaks |
| 2026-05-13 | Aplicación Associates movida mes 1 → mes 3 | Regla 180 días / 3 ventas (research #16) |
| 2026-05-13 | Keepa diferida mes 1 → mes 2 | Tweak 1 ADR 0004; ahorra $76 y valida stack primero |
| 2026-05-13 | Pinterest app promovida a bloque A (esta semana) | Tweak 3 ADR 0004; aprobación tarda 1-3 semanas |
| 2026-05-13 | Site bootstrap Astro completado (commit 6749a74) | Agente terminó esqueleto + 51 productos mock + build green |
| 2026-05-13 | Site deployado a Cloudflare Pages (myrepo-e68.pages.dev) | Operador completó flujo Cloudflare; site live con /privacy, /about, 404, app-icon |
| 2026-05-13 | Pinterest developer app submitted (Trial) | Operador completó form; Standard API pending 1-3 semanas |
| 2026-05-14 | Validaciones nicho VERDE (#20, #21) | Confirmado volumen + KGR funcional en coffee equipment |
| 2026-05-14 | Dominio baristapath.com registrado | Pendiente: connect como custom domain en CF Pages |
| 2026-05-14 | baristapath.com conectado a CF Pages | SSL provisionado, sitio live en dominio branded |
| 2026-05-14 | Scale content batch 2: +41 páginas (108 total) | Agente generó best-of + compare siguiendo patrones KGR oro |
| 2026-05-14 | Methodology page + footer link | Build trust pre-Associates application |
| 2026-05-14 | Scale batch 3a: +13 accessories + 9 best-of (131 total) | Agente A; cubrió knock box, milk pitcher, WDT, descaler, 54mm tamper |
| 2026-05-14 | Scale batch 3b: nuevo template /review + 22 worth-it pages (153 total) | Agente B; mix 15/6/1 yes/depends/no, schema Review completo |
| 2026-05-15 | Internal linking pass + design benchmark research | Related content + research/design-benchmark.md con shortlist priorizada |
| 2026-05-15 | UX batch A: verdict box, CTA botón, byline, multi-tier labels, methodology link, update cadence | Sitio alineado con patterns table-stakes de coffee affiliates top |
| 2026-05-15 | UX batch B + calculator (154 páginas) | Compare collapse + calculator cost-per-cup (diferenciador único del nicho) |
| 2026-05-15 | Quiz "which espresso machine" (155 páginas) | Score-based con 7 preguntas, anti-gray-hat verificado en 4 escenarios |
| 2026-05-15 | Home page redesign (40.7KB total) | 7 secciones, 19 internal links concentrados, mejor first impression |
| 2026-05-15 | Search page + Quiz tests (156 páginas) | Fuse.js search client-side + 9 snapshot tests del quiz scoring |
| 2026-05-15 | Search filter pills + Calculator v2 shareable URL | Pulido UX final: filtrar resultados de search por kind, calculator URL serializable para backlinks |
| 2026-05-17 | Brand + Category + Glossary pages (176 páginas) | Topical authority: 13 brand + 4 category buying guides + 1 glossary (55 términos) |
| 2026-05-17 | Autolink glossary post-build | +1,029 glossary links across 172 HTML files / 42 unique terms, idempotente |
| 2026-05-17 | **robots.txt FLIPPED a Allow** | Sitio public-indexable. Gate 1 del deployment-to-revenue runbook resuelto. |
| 2026-05-17 | +15 accessory reviews (191 páginas) | Catalog gap cerrado; 11 best-of accessory-related ahora con Related Content |
| 2026-05-17 | +25 how-to + troubleshoot pages (216 páginas) | Nueva vein post-purchase intent. Anti-gray-hat estricto en troubleshoot. |
| 2026-05-17 | +12 per-term glossary pages (228 páginas) | Dedicated pages para top head terms; autolink prioriza dedicated > anchor |
| 2026-05-17 | +8 glossary tier 2 pages (236 páginas) | crema, e61, opv, thermojet, specialty-grade, single-dosing, flat/conical-burr |
| 2026-05-17 | Inline CTAs en product pages | OwnerHelp box: 41/64 product pages con how-to + troubleshoot relevantes, 23/64 skip correcto |
| 2026-05-17 | +8 generic guides para brewers + accessories (244 páginas) | CTA coverage 41/64 → 64/64 (full). Anti-gray-hat: WDT > puck screen, técnica > hardware. |
