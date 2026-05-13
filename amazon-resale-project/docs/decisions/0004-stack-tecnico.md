# ADR 0004 — Stack técnico del sitio

**Fecha:** 2026-05-13
**Estado:** Propuesta (espera aceptación operador)

## Contexto

Tras ADR 0002 (modelo: SEO programático + Amazon Associates) y ADR 0003
(vertical: coffee equipment), necesitamos congelar el stack técnico
antes de empezar a construir. Restricciones que mandan:

- **Operador solo, data scientist**, ~15 h/semana. Sin servidor propio,
  sin DevOps dedicado.
- **Capital inicial $500–$2,000.** Stop loss $5,000. El stack debe
  costar <$50/mes los primeros 6 meses para mantener runway largo.
- **Escala objetivo:** 500–1,000 páginas en mes 1–3, 5,000+ en mes 12.
- **Datasource:** productos Amazon (precio actual, BSR, reviews, specs).
- **Audiencia:** US-English; canales Google orgánico + Pinterest.
- **Operación 24/7 desde GitHub + serverless.** Agentes en GitHub Actions
  regeneran datos y contenido en cron.
- **Compatibilidad con ToS Amazon Associates 2026.** No tácticas grises
  (CLAUDE.md).

Dos descubrimientos del research cambian el plan respecto a la
intuición inicial:

1. **PA-API se retira el 15 de mayo de 2026** (deprecación oficial
   30 abril, endpoint apagado 15 mayo). Migración obligatoria a
   **Creators API** (OAuth 2.0 en lugar de AWS SigV4). Además exige
   **≥10 ventas calificadas en los últimos 30 días** para mantener el
   acceso, lo cual choca con la realidad de un sitio nuevo sin tráfico.
   No es solo cambio de auth: cambia toda la economía de la decisión.
2. **Vercel Hobby prohíbe uso comercial** explícitamente en su Fair Use
   policy (revenue-generating projects → suspensión). Para Associates
   eso es uso comercial. Descarta Vercel free para producción.

## Decisión

### Framework: Astro 5 (con content collections + MDX)

**Razonamiento.**
- Static-first con islas opcionales, output HTML puro: ideal para SEO
  programático puro y para que el bot de Google y AI Overviews crawlee
  sin ejecutar JS.
- Content collections con schema Zod permiten tipar productos en
  TypeScript desde JSON/CSV en build — encaja con el perfil data
  scientist del operador y con el flujo "agente genera JSON → build
  estático".
- Astro 5 redujo build time de content collections "hasta 5×" para
  Markdown y "hasta 2×" para MDX vs Astro 4. Casos reales reportan
  1,000 posts buildando en ~14 min sin tuning agresivo, segundos con
  caché incremental.
- JSON-LD trivial vía `<script type="application/ld+json">` en
  layouts. Soporta Product, Review, FAQPage, BreadcrumbList nativo
  (sin plugin pesado tipo Yoast).
- Ecosistema maduro 2026: Astro es la elección de facto para
  programmatic SEO según múltiples comparativas independientes; hay
  buen tooling de RSS, sitemap, imágenes optimizadas.

**Limitaciones aceptadas.**
- Build time crecerá linealmente; a 10k páginas sin optimización puede
  pegar el techo de 20 min de Cloudflare Pages free (mitigaciones en
  Riesgos).
- Menos rápido en build puro que Hugo (Hugo: 1k páginas en ~2 s; Astro:
  minutos). Trade-off aceptable por DX, TypeScript y data pipeline.

**Alternativas descartadas.**
- **Next.js**: overhead innecesario, optimizado para apps no para SEO
  estático, y ata al ecosistema Vercel cuyo free tier prohíbe uso
  comercial. Para un sitio de contenido puro es over-engineering.
- **Hugo**: build rapidísimo pero templating con Go templates es hostil
  para data pipelines complejos en TypeScript; pobre integración con
  esquemas tipados, MDX, componentes reutilizables. Apropiado para
  blogs simples, no para programmatic con muchas matrices comparativas.
- **Eleventy**: alternativa razonable, ecosistema más chico que Astro
  en 2026, sin content collections tipadas equivalentes.

### Hosting: Cloudflare Pages (free) → upgrade a Workers Paid si pegamos límites

**Razonamiento.**
- **Bandwidth ilimitado** en free tier (único host serverless mainstream
  con esto en 2026). Para un sitio que apunta a ~10k visitas/día
  escalando, esto elimina la incertidumbre de overage.
- **CDN global edge** integrado, latencia baja sin configurar.
- **500 builds/mes** = ~16/día, más que suficiente.
- **Compatible con uso comercial** (a diferencia de Vercel Hobby).
- Build timeout 20 min/build, un build a la vez en free.

**Costo estimado.**
- **Mes 1–6:** $0/mes (free tier alcanza para 500–2,000 páginas con
  margen).
- **Mes 7–12:** $0/mes si seguimos <20,000 archivos, o $5/mes (Workers
  Paid) si cruzamos. Workers Paid también levanta el cap de files a
  100,000 (changelog Cloudflare 23 enero 2026, requiere
  `PAGES_WRANGLER_MAJOR_VERSION=4`).

**Límites free tier 2026 verificados.**
| Recurso | Free | Cuándo nos pega |
|---|---|---|
| Bandwidth | Ilimitado | Nunca |
| Builds/mes | 500 | ~16/día — solo si hacemos rebuilds locos |
| Build duration | 20 min | A ~5k–10k páginas sin caché incremental |
| Files/sitio | 20,000 | A ~10k páginas (cada página = HTML + assets) |
| Pages Functions requests/día | 100,000 | Solo si usamos edge functions (probablemente no) |
| Concurrent builds | 1 | Aceptable para un solo operador |

**Alternativas descartadas.**
- **Vercel Hobby**: explícitamente prohibido para uso comercial /
  revenue-generating. Pro = $20/mes/dev + bandwidth caro ($40/100GB
  extra). No.
- **Netlify free**: 100 GB bandwidth/mes (no ilimitado), 300 build
  minutes legacy o nuevo modelo de credits desde abril 2026. Si
  excedemos en mes calendario → **suspensión** hasta el siguiente.
  Riesgo operacional inaceptable para un sitio en crecimiento.
- **GitHub Pages**: válido para arrancar, pero sin edge functions ni
  imágenes optimizadas, peor SEO de imágenes, y el hard cap de 100 GB
  bandwidth/mes "soft enforcement" es ambiguo.

### DB de productos: SQLite local en repo, build estático (Plan A)

**Razonamiento.**
- Para 1,000–5,000 productos, un solo `products.db` SQLite (o JSON
  generado a partir de Keepa CSV exports) en `data/` del repo es
  suficiente. El build lee, Astro renderiza HTML, end of story.
- **Cero costo de DB en producción**, cero latencia runtime, cero
  vendor lock-in. Backup = git history.
- Encaja con el perfil data scientist: pandas / DuckDB / sqlite3 desde
  los agentes que generan los datos.
- Escalable hasta ~50k productos sin drama (la DB sigue siendo <500 MB,
  builds son el cuello, no la DB).

**Cuándo migrar (no ahora):** si necesitamos lecturas runtime
(p.ej. precio actualizado al render por usuario, comparador
interactivo), saltamos a Turso o Cloudflare D1. Hasta entonces, YAGNI.

**Alternativas para etapa 2 (no comprometidas).**
- **Turso (libSQL)**: free tier 5 GB / 500M reads / 10M writes mensuales.
  Excelente si necesitamos runtime queries distribuidas.
- **Cloudflare D1**: 5 GB / ~150M reads / ~3M writes mensuales, free.
  Ventaja: integrado al mismo Cloudflare donde hosteamos.
- **Postgres (Neon / Supabase)**: descartado para esta fase. Overkill
  relacional para data esencialmente clave-valor + atributos.

### Datasource Amazon: Keepa API (paga, €19 + €49/mes) como Plan A

**Esta es la decisión más delicada del stack.** Resumen del paisaje 2026:

| Opción | Costo 2026 | Cobertura | Riesgo |
|---|---|---|---|
| **PA-API v5** | Gratis | Histórico amplio | **Se apaga el 15 de mayo de 2026 (2 días).** Inútil. |
| **Creators API** (sustituto oficial) | Gratis | Datos producto + offers | **Requiere ≥10 ventas calificadas en últimos 30 días o devuelve `AssociateNotEligible`.** Para un sitio nuevo es inviable hasta tener tráfico real (mes 4+). |
| **Keepa API** | €19/mes Keepa sub + €49/mes API entry tier (20 tokens/min ≈ 1,200 productos/h, 30k/día teórico). EUR — sumar 1–3 % conversión. | Histórico precios, BSR, reviews count, ofertas. La mejor base para programmatic en coffee. | Token system requiere planificar batches. Sin free trial. |
| **RainforestAPI** | $59/mes entry, $375 tier siguiente. Respuestas 30–50 s, calidad inconsistente reportada. | Producto live + SERP. | Caro y lento. |
| **SerpApi** | $25/mes 1k búsquedas / $75 5k. Bueno para SERPs Amazon, no para producto detalle a escala. | Limitada. | Cap bajo de queries. |
| **FlyByAPIs / Easyparser / Scrape.do** | $15–$30/mes entry tiers reportados | Reseñas mixtas, menos histórico. | Vendors jóvenes, riesgo continuidad. |

**Recomendación: Keepa.** Es la única opción que combina
(a) histórico de precio y BSR (clave para nuestro contenido tipo
"price drop alert" y "BSR trend"), (b) cobertura amplia del catálogo,
(c) costo determinístico €68/mes total con tope conocido y
(d) reputación establecida en la comunidad de affiliates. Sumado:
**los datos de Keepa siguen sirviendo aunque PA-API se apague**, porque
Keepa los obtiene por su propio pipeline.

**Plan B si Keepa quiebra / sube precios / nos limita:**
1. Mantener seed dataset extraído mientras teníamos acceso (snapshot
   completo del nicho coffee en JSON, versionado en repo).
2. Suplementar con Creators API una vez tengamos ≥10 ventas/mes (mes
   4–5 si todo sale bien).
3. SerpApi o equivalente para SERPs Amazon (descubrir productos nuevos,
   no histórico).
4. Re-scraping ligero respetuoso de la página pública de Amazon para
   atributos no críticos (specs textuales) — con extrema cautela ToS.

**Rate limits Keepa.** Plan entry: 20 tokens/min, expiran 60 min.
Un producto detallado consume 1 token. Para 5,000 productos completos
en un refresh, ~4 h de pull continuo. Para refreshes diarios de
precios (no specs), 5,000/día = factible holgado. **Recomendación
operativa:** un agente GitHub Action diario de 30–60 min para refresh
de precios + un agente semanal de ~4 h para refresh completo de specs.

### Analytics: Google Search Console + Plausible Cloud (o GoatCounter self-hosted)

**Recomendación primaria.** GSC obligatorio (no negociable, datos
de keywords no se obtienen de otra fuente). Para analytics de visitas,
**Plausible Cloud** ($9/mes Starter por 10k pageviews) si queremos cero
mantenimiento, o **GoatCounter** self-hosted gratis (single Go binary
en una VM de $5/mes o en Fly.io free) si preferimos $0.

**Decisión propuesta:** Empezar con GoatCounter gratis en Cloudflare
Workers o Fly.io free tier. Migrar a Plausible Cloud cuando facturemos
$200+/mes y el ahorro de tiempo justifique los $9. Evitar GA4: spam
de bots, sesgo a Google ecosystem, friction de cookies con privacy.

### Search interna: Pagefind

**Recomendación.** Pagefind builda el índice desde el HTML ya generado
post-build, lo sirve como assets estáticos por el mismo CDN. Cero
costos, cero backend, escala bien hasta decenas de miles de páginas.
Algolia free tier (1M records / 10k requests/mes) está limitado a
"development" en términos de ToS; usar en producción afiliada es zona
gris.

### Schema markup approach: JSON-LD inline en layouts Astro

**Recomendación.** Componentes Astro tipados `<ProductSchema product={...} />`,
`<ReviewSchema review={...} />`, `<FAQPageSchema faqs={...} />`,
`<BreadcrumbListSchema crumbs={...} />` que renderizan
`<script type="application/ld+json">`. Validar con Google Rich Results
Test en CI (curl + diff) antes de cada deploy.

JSON-LD es el formato recomendado por Google en 2026 (Microdata y RDFa
descartados). Los datos vienen del mismo content collection que
renderiza la página, sin duplicación.

### Pinterest tool: Pinterest API v5 directo

**Recomendación.** Pinterest API v5 es gratis hasta los rate limits
(1,000 read/min, 100 write/min). Para nuestra escala (digamos 20 pins
nuevos/día) eso es 10× lo que necesitamos. Un agente GitHub Action
diario lee páginas nuevas del sitio, genera 1–3 pins por página
(imagen + descripción + link), publica via API.

No usar Buffer / Tailwind (la herramienta, no el framework) / Later:
overhead de cuenta + costo + ToS más restrictivo que la API oficial,
y queremos mantener todo en GitHub Actions sin SaaS extra.

**Pendiente operador:** crear Pinterest Business account + app
developer + API credentials. Tarea de 30 min, no bloqueante hoy.

## Costo total estimado

| Item | Mes 1–6 | Mes 7–12 | Notas |
|---|---|---|---|
| Dominio (.com via Cloudflare Registrar) | $10/año amortizado ≈ $0.85/mes | $0.85/mes | Cloudflare vende a wholesale. |
| Hosting (Cloudflare Pages free) | $0 | $0–$5 | $5 si pegamos límites y subimos a Workers Paid. |
| Keepa subscription (€19) | ~$21/mes | ~$21/mes | Necesario para activar API. |
| Keepa API entry (€49) | ~$54/mes | ~$54/mes | 20 tokens/min, alcanza para nicho coffee a esta escala. |
| Analytics (GoatCounter self-host o $0) | $0 | $0 | Self-host en free tier ajeno. |
| Search interna (Pagefind) | $0 | $0 | Static. |
| Pinterest API | $0 | $0 | Free tier oficial. |
| GitHub Actions (repo privado, 2000 min/mes free) | $0 | $0 | Holgado a esta escala. Si abrimos repo público → ilimitado. |
| **Total** | **~$76/mes** | **~$76–$81/mes** | Mayoría = Keepa. |

Total 12 meses: **~$910 USD**, dentro del capital inicial $500–$2,000.
Si en mes 3–4 no hay tracción, podemos pausar Keepa y mantener solo
el snapshot, bajando a ~$1/mes hasta repensar.

## Alternativas descartadas (tabla)

| Componente | Opción | Por qué no |
|---|---|---|
| Framework | Next.js | Overhead app-oriented, ata a Vercel cuyo free es no comercial. |
| Framework | Hugo | DX pobre para data pipelines TS y matrices comparativas; sin content collections tipadas. |
| Framework | Eleventy | Ecosistema menor, sin schema tipado equivalente. |
| Hosting | Vercel Hobby | Prohibido uso comercial (Fair Use). |
| Hosting | Netlify | 100 GB bandwidth cap + suspensión si excedés. Riesgo operacional. |
| Hosting | GitHub Pages | Sin edge functions, sin image opt, soft cap ambiguo. |
| DB | Turso / D1 / Postgres | YAGNI para fase static-at-build. Reabrir cuando necesitemos runtime. |
| Datasource | PA-API | Se apaga 15 mayo 2026. |
| Datasource | Creators API | Requiere 10 ventas/mes para no ser revocada — inviable mes 1–3. |
| Datasource | RainforestAPI | $59 entry, latencia 30–50 s, calidad inconsistente. |
| Datasource | SerpApi | Cap bajo, sin histórico de precios. |
| Analytics | GA4 | Spam de bots, cookies friction, ecosystem lock-in. |
| Analytics | Plausible Cloud (al inicio) | $9/mes innecesario hasta tener revenue. |
| Search | Algolia free | Limitado a development en ToS; uso comercial = upgrade pagado. |
| Search | FlexSearch | Lib cliente, requiere armar índice propio; Pagefind ya lo resuelve. |
| Pinterest | Buffer / Tailwind / Later | SaaS extra, costo, sin ventaja sobre API directa para nuestro flujo. |

## Riesgos técnicos

1. **Build time si crece a 10k+ páginas.**
   - Cloudflare Pages free corta a 20 min/build. Astro 5 con caché
     incremental aguanta ~5k páginas en ese presupuesto sin tuning.
   - Mitigación: usar caché incremental Astro (`experimental.incrementalBuild`
     en 5.x), separar el sitio en sub-builds (p.ej. `/espresso-machines/*`
     y `/grinders/*` como apps Astro hermanas con shared layout), o
     pre-renderizar a R2 y servir mixto.
   - **Cuándo importa:** mes 7+ si crecemos a 5k+ páginas. Validar
     con benchmark real en mes 2 cuando tengamos 500 páginas reales.

2. **Cap de 20,000 files free tier de Pages.**
   - Cada página = mínimo 1 HTML + ~3–10 assets. A 5k páginas estamos
     en ~20–50k files. Mitigación: subir a Workers Paid ($5/mes), que
     levanta a 100k files. Decisión disparada por dato, no anticipada.

3. **Costo Keepa si free tier de Amazon Creators API no llega nunca.**
   - €68/mes (~$76) es fijo aunque el sitio facture $0. Si en mes 4 no
     hay tracción, criterio de pivot del ADR 0002 corta gasto.
   - Plan B documentado arriba (snapshot + SerpApi puntual + Creators
     cuando califiquemos).

4. **Vendor lock-in mínimo, pero existe.**
   - Astro genera HTML estándar → cualquier hosting estático puede
     servirlo. Migración Cloudflare → Netlify / S3+CloudFront / etc.
     es cuestión de horas, no días.
   - Keepa es el lock-in más fuerte: si nos cortan, perdemos el
     histórico futuro pero conservamos el snapshot.
   - GoatCounter es portable (Go binary + SQLite).

5. **Cambios regulatorios Amazon Associates 2026.**
   - Amazon endureció policy contra "AI content sin valor" y agentes
     no identificados. Mitigación ya en CLAUDE.md (anti-gray-hat).
     Contenido siempre arranca de specs reales y aporta herramienta
     decisional, no opinión generada.

6. **Pinterest API: cuenta business + app approval pueden tardar.**
   - No bloqueante para mes 1 (podemos pinear manualmente). Si la app
     no se aprueba, Plan B: pinning manual scheduled con un agente
     que abra issues "pinea esto" al operador desde móvil.

## Validaciones antes de comprometer

Antes de pagar Keepa y poner dominio en producción:

1. **Confirmar pricing Keepa actual** (€19 sub + €49 API entry tier)
   con login del operador en keepa.com → verificar EUR/USD del día,
   confirmar que 20 tokens/min aún es el entry tier en 2026.
2. **Confirmar que el operador puede pagar Keepa** desde método
   panameño (tarjeta crédito local, Payoneer card, etc.) — Keepa
   bills en EUR.
3. **Benchmark real Astro:** generar sitio dummy con 500 páginas
   mockeadas, medir build time local y en Cloudflare Pages. Si >5 min
   sin caché, planear caché incremental desde día 1.
4. **Confirmar 20k files cap Pages** con un deploy real de 100
   páginas + assets, contar files generados, extrapolar.
5. **Cuenta Pinterest Business + app developer** abierta y aprobada
   antes de comprometer agente de pinning (riesgo de aprobación
   tardía).
6. **Test JSON-LD** con Google Rich Results Test sobre 3 plantillas
   (Product, Review, FAQPage) ANTES de generar 500 páginas con un
   schema roto.
7. **Cron GitHub Actions con secret Keepa API key**: probar pull de
   10 productos coffee, verificar que parsea, que respeta rate limit,
   que commit del JSON es idempotente.

Hasta resolver 1, 3, 6, no comprometemos build de infra ni dominio
final. Items 2, 4, 5, 7 pueden resolverse en paralelo.

## Decisiones pendientes (post-aceptación)

- **Nombre de dominio**: a decidir en ADR separado (branding del sitio).
- **Repo público vs privado para el sitio**: ADR 0001 deja esta decisión
  pendiente. Repo público da Actions ilimitados pero expone tesis; repo
  privado consume 2000 min/mes de free tier (suficiente al inicio).
- **Estrategia de imágenes**: Cloudflare Images ($5/mes 100k imágenes)
  vs Astro image optimization local vs assets en R2. Decidir cuando
  tengamos primer batch de productos.
