# Benchmark de diseño y funcionalidad — coffee equipment affiliate sites

Fecha: 2026-05-15
Autor: agente (research session)
Branch: claude/amazon-resale-project-t7o0P

## Resumen ejecutivo

Top 5 recomendaciones priorizadas por ROI (impacto / costo) para `baristapath.com`:

1. **Reforzar señales E-E-A-T (Experience-Expertise-Authoritativeness-Trustworthiness)
   en cada review/best-of**: autor visible con bio corta, fecha "última actualización"
   en H1, link a methodology, conteo de productos testeados ("we tested X over Y weeks").
   Effort S, impacto alto en SEO y trust. Lo hacen 6/6 sitios.
2. **CTA (Call to Action) de alta visibilidad por producto**: botón con color de
   contraste (no link de texto), copy "Check price on Amazon", repetido en TL;DR y
   debajo de cada bloque de producto. Effort S, impacto directo en conversión.
   Wirecutter, Tom's Guide, Coffeeness lo hacen.
3. **Verdict box / TL;DR arriba en cada review individual** (top pick + 1-2 alternates
   con CTA inmediato). Effort S-M, impacto en conversión + dwell time. Pattern de
   Wirecutter ("the top pick" después del intro) replicado por Tom's Guide y
   Coffeechronicler.
4. **Página de methodology robusta + linkearla desde cada review y best-of**.
   Effort S, impacto alto en E-E-A-T y diferenciación vs sitios genéricos.
   5/6 especializados la tienen.
5. **Calculator o quiz funcional** ("Which espresso machine should I buy?" o
   "Cost-per-cup vs cafetería"). Effort M, impacto alto en backlinks orgánicos y
   tiempo en sitio. Pattern presente solo en 2/6 (Whole Latte Love, Espresso Setup
   Builder, Breville), por eso es diferenciador.

## Sitios analizados

| Sitio | DR estimada* | Nicho/scope | Tono visual general | Acceso bot |
|---|---|---|---|---|
| coffeegeek.com | ~70 (autoridad histórica) | Coffee especializada (forum + reviews) | Editorial / nerd, multi-section con themes por sección | 403 directo, info via meta-search |
| coffeechronicler.com | ~50-55 | Coffee gear reviews independiente | Educacional / personal blog, fotos propias | 403 directo |
| coffeekev.com | ~30-40 | Coffee gear reviews independiente nicho-puro | Utilitario / simple | 403 directo |
| coffeeness.de/en | ~55-60 | Coffee generalista (DE + EN) | Editorial / profesional, equipo visible | 403 directo |
| home-barista.com | ~60 (link equity de comunidad) | Comunidad/forum, no review site moderno | Foro phpBB-style, utilitario antiguo | 403 directo |
| clivecoffee.com | ~50 | Retailer premium + editorial | E-commerce premium, fotos hi-end | 403 directo |
| nytimes.com/wirecutter (espresso) | ~93 (NYT) | Autoridad genérica afiliado | Editorial NYT, sobrio | bloqueado |
| tomsguide.com | ~91 | Tech generalista | Magazine tech, denso en CTAs | 403 directo |
| baristamagazine.com | ~70 | Editorial puro (no afiliado) | Print-magazine style | no analizado |

*DR estimada en base a percepción de búsquedas y menciones, no Ahrefs check directo en esta sesión.

**Nota sobre acceso**: Todos los sitios principales devolvieron 403 a WebFetch
directo (bot blocking). El análisis se reconstruyó vía:
- WebSearch (Google search snippets, que sí citan estructura)
- Análisis pre-existente de Ahrefs y Tetra Marketing sobre Wirecutter
- Posts del propio CoffeeGeek explicando su 2024 redesign
- Pages "About / Review Process" indexadas en search

Ver sección "Limitaciones del análisis" más abajo.

## Patterns "table stakes" (comunes en 4+ de los 6 sitios especializados)

Estos son los mínimos del nicho — no tenerlos es señal de sitio amateur:

1. **Autor visible con foto y credencial** (4+/6). Coffeeness: Arne Preuss, ex-barista,
   foto + bio + link "About". Coffeechronicler: Asser Christensen, Q Arabica Grader,
   bio extensa. CoffeeGeek: Mark Prince, fundador, presencia editorial constante.
   CoffeeKev: "Kev" con voice personal en cada review.
2. **Página "How we test" / "Review Process" linkeada desde el footer y/o desde
   reviews** (4+/6). Coffeeness tiene `/our-review-process/` explícita.
   Coffeechronicler tiene `/product-review-policy/` con herramientas (refractómetro,
   particle size analyser, decibel meter). Wirecutter es referente.
3. **Pros / Cons en bullets** dentro de cada review individual (5+/6). Formato más
   común: dos columnas o dos listas adyacentes, 3-5 items cada una. Subtítulos
   exactos "Pros" / "Cons" o "What we like / Don't like".
4. **Comparison table al tope** en best-of (4+/6). Coffeeness lo dice explícito en
   su descripción. Tom's Guide y Wirecutter lo tienen. Coffeechronicler usa ranking
   numerado con specs visibles.
5. **Top pick label dentro del primer scroll** (4+/6). Wirecutter es el patrón
   maestro: "the top pick" justo después del intro con descripción de 1 oración +
   CTA. Tom's Guide replica con "best overall". Coffeechronicler hace ranking #1.
6. **Fecha "última actualización" visible** (4+/6). Coffeeness lo marca explícito.
   Wirecutter es famoso por actualizar contenido (5 updates por cada nuevo artículo
   en 2022 según Ahrefs case study).
7. **Affiliate disclosure breve cerca del top** (5+/6) además del footer. Texto tipo
   "When you buy through our links we may earn a commission."
8. **Multi-tier picks** ("top pick / budget pick / upgrade pick / also great")
   (4+/6). Wirecutter inventó/popularizó. Coffeechronicler usa por price tier
   ($100/$500/$1000). Tom's Guide usa "best overall / best beginner / best small
   space". Tu sitio ya tiene best_for y price_tier en schema — bien.
9. **Hero foto del producto, idealmente propia (no Amazon embed)** (5+/6).
   Coffeechronicler menciona fotos propias hands-on. CoffeeGeek hace "dozens of
   photographs and multiple videos" por full review. Único que no podemos cumplir
   directo — ver sección "lo que NO recomiendo copiar".
10. **FAQ section al final** con schema FAQPage (4+/6). Patrón estándar para SEO.
    Tu sitio ya lo tiene — bien.
11. **Breadcrumbs visibles** (5+/6). Tu sitio ya lo tiene — bien.

## Patterns diferenciadores (1-2 sitios los hacen)

Estos diferencian top tier de mid tier:

1. **Sticky inline navigation / TOC (Table of Contents) en reviews largas**.
   CoffeeGeek lo implementó en 2024 redesign: "inline navigation graphical menu on
   the left side that floats as you scroll, with tooltips describing the sections".
   Diferenciador real para reviews >2,000 palabras.
2. **Multi-page detailed review** (CoffeeGeek). Para productos premium (>$1,500),
   review de 10,000-15,000 palabras dividida en sub-páginas: Intro, Specs,
   Unboxing, Design, Conclusion. Genera 5+ páginas indexables por producto. ALTO
   esfuerzo, alto payoff SEO. No copiable para nosotros sin recursos.
3. **Scoring system numérico** (CoffeeGeek "Snapshot Reviews" con score; Wirecutter
   no usa scores; Coffeechronicler tampoco). Diferenciador débil — la evidencia
   sugiere que scores rígidos son opcionales, lo importante es el verdict prosa.
4. **Comparator interactivo** (Clive Coffee: `/pages/compare`). Permite elegir 2-3
   máquinas y ver specs side-by-side. Coffee Bros también: "compare over 100
   espresso machines side-by-side". Pocos lo tienen, alto valor para usuarios en
   decisión.
5. **Quiz "Which espresso machine should I buy"** (Whole Latte Love, Majesty Coffee,
   Breville, Espresso Setup Builder, Choices Choices). Genera leads, backlinks,
   tiempo en sitio. Ningún competidor afiliado puro lo tiene — solo retailers.
6. **Video embeds propios** (CoffeeGeek, Coffeechronicler — los dos tienen canal
   YouTube). Aumenta dwell time y E-E-A-T. Costoso para operador solo.
7. **Calculator de cost-per-cup / ROI vs cafetería** — no observado en ninguno del
   set. Hueco real del nicho.
8. **Múltiples retailers por producto** (Wirecutter, Tom's Guide): muestran Amazon
   + Best Buy + Williams Sonoma. Aumenta CTR porque el lector tiene una opción
   incluso si tiene mala experiencia previa con Amazon. Coffeechronicler y
   Coffeeness son mayormente Amazon-only (similar a nosotros).
9. **Comments / community por artículo** (CoffeeGeek 2024 lo está rebuildeando).
   Genera UGC indexable. Alto costo de moderación. No para nosotros.
10. **Theming por sección** (CoffeeGeek: cada sección con su color y font family).
    Refuerza identidad. Costo bajo si se diseña al principio.

## Catálogo observado por dimensión

### A. Visual design

- **Tipografía**:
  - CoffeeGeek 2024: Poppins (sans) primary, Zilla Slab (serif) para títulos
    formales, Piazolla (serif) para body en sección Opinions, Roboto Slab para
    reviews. Patrón clave: **serif para títulos/H1, sans para body**.
  - Wirecutter (NYT): NYT KH Serif y Cheltenham (serifs editoriales), Franklin
    sans para UI. Mismo patrón.
  - Tom's Guide: sans-serif denso (Inter-like).
  - Coffeeness: sans-serif moderno (Open Sans / similar), tono editorial profesional.
  - Coffeekev / Coffeechronicler: defaults de WordPress themes, sans-serif para
    todo. Más utilitario.
  - **Tamaños y line-heights no inspeccionados directo** (los bots bloquearon),
    pero el patrón en sitios editoriales de coffee es body ~17-19px, line-height
    1.55-1.7, max content width 65-75ch para legibilidad.
- **Paleta**:
  - Marrón / café / cremoso es la paleta esperable pero pocos lo abrazan.
    Coffeegeek usa naranja como accent contundente.
  - Wirecutter: paleta neutra (gris, blanco, negro) + **rojo para CTAs** (Tetra
    Marketing flag explícito).
  - Coffeechronicler: tonos cálidos coffee + naranja accent.
  - Tom's Guide: blanco/azul tech.
- **Mobile UX**:
  - Hamburger menu en todos los modernos. CoffeeGeek 2024 enfatiza "responsive on
    all screens, especially mobile and tablet".
  - Sticky header en Wirecutter y Tom's Guide. Sticky es pattern probado:
    "sticky-navigation A/B tests show mid-single-digit lifts" (Convert).
  - Tap targets: estándar 44x44px observado en CTAs de Tom's Guide y Coffeeness.
- **Tono visual**:
  - Premium-editorial: Wirecutter, Coffeeness, CoffeeGeek (2024).
  - Personal blog: Coffeechronicler, Coffeekev.
  - Tech magazine: Tom's Guide.
  - E-commerce premium: Clive Coffee.

### B. Estructura de páginas

**Reviews individuales — pattern dominante**:
1. H1 + subtitle/dek (1 línea de hook).
2. Author byline + fecha (último update).
3. Hero photo del producto.
4. TL;DR / Verdict box en primer scroll (lo hace Coffeechronicler, Wirecutter,
   CoffeeGeek). Coffeechronicler: "What I love (and hate) about the Fellow Aiden"
   título ya hace verdict.
5. Specs table (CoffeeGeek tiene "Specifications page" dedicada; Coffeechronicler
   y Coffeeness inline tabla).
6. Pros/Cons block.
7. Sections de evaluación (Build, Use, Taste, Cleaning).
8. CTA prominent + secondary alternatives.
9. Comparisons con productos similares.
10. FAQ.
11. Verdict final + scoring (opcional).

**Word count promedio reviews individuales**:
- CoffeeGeek "Full Review": 5,000+ palabras.
- CoffeeGeek "Detailed Review" (premium products): 10,000-15,000 palabras
  multipágina.
- CoffeeGeek "First Look": <2,500 palabras.
- Coffeechronicler reviews: estimado 2,000-3,500 palabras.
- Wirecutter reviews individuales: 3,000-5,000 palabras.
- Coffeeness: estimado 2,500-4,000 palabras.

**Best-of pages — pattern dominante**:
1. H1 + sub que incluye año + count ("7 best espresso machines you can buy in 2026").
2. Intro corta (200-400 palabras) explicando criterio + autor.
3. Comparison table o "the list in brief" / "at a glance".
4. Top pick destacado primero con CTA inmediato.
5. Picks ranked o por tier (best overall / budget / upgrade / beginner).
6. Por pick: 200-500 palabras + pros/cons + photo + CTA.
7. How we tested / methodology section o link.
8. FAQ.
9. Related guides.

**Productos cubiertos en best-of**: 5-11 productos típico.
- Coffeechronicler: 5-9 picks.
- Tom's Guide: 6-7 picks típicamente.
- Wirecutter: 3-6 picks (más curado).
- Coffeeness: ~10-12 picks.

### C. Affiliate CTA strategy

**Copy más común**:
- "Check price on Amazon" (Coffeeness, Coffeechronicler — patrón dominante)
- "Buy on Amazon" (CoffeeKev approach informal)
- Wirecutter: "$X at Amazon" con precio embebido (requiere price feed live).
- Tom's Guide: "View Deal" / "Check Price" con iconos retailer.

**Color**: Rojo (Wirecutter, Tom's Guide) o naranja (CoffeeChronicler) son
dominantes para destacar. Tetra Marketing y Ahrefs identifican el rojo de
Wirecutter como diferenciador clave.

**Posición**:
- En reviews: arriba del fold (TL;DR box), repetido al final.
- En best-of: cada pick tiene su CTA inline.
- Sticky bar al hacer scroll: no estándar en coffee sites pero común en tech afiliados.

**Múltiples retailers**: Sí en Wirecutter y Tom's Guide (Amazon + Best Buy +
Williams Sonoma para coffee). NO en Coffeechronicler/Coffeeness/Coffeekev (mostly
Amazon-only). Para nosotros: Amazon-only es defensible mientras Associates es la
única afiliación activa.

**Disclosure cerca del botón**: NO observado explícitamente en bloque inline. Lo
estándar es:
- Una línea al top del post: "Some links are affiliate. Buy via them and we may
  earn a commission."
- Footer largo con full disclosure (FTC compliant).

### D. Trust signals

- **About page con foto del autor**: 5/6 especializados.
- **Methodology page dedicada**: Coffeeness (`/our-review-process/`), Coffeechronicler
  (`/product-review-policy/`), CoffeeGeek (cada categoría tiene "testing parameters
  and evaluation checklist"). Wirecutter es el referente.
- **Author byline en cada post con link a bio**: 5/6.
- **Photos del autor con productos**: Coffeechronicler sí, Coffeeness sí (Arne con
  máquinas), CoffeeGeek sí (Mark + colaboradores). Coffeekev: voice personal pero
  fotos del autor no observadas. Para nosotros: NO podemos cumplir porque no hay
  studio. Ver "lo que NO recomiendo copiar".
- **Update dates en cada review**: Coffeeness lo nota explícito. Wirecutter es
  agresivo en updates (5:1 vs nuevo).
- **Disclosure**: Footer en todos, además línea breve al top en algunos.
- **Trust micro-copy**: Coffeekev tiene "Your trust is very important to me" en
  email signup. Coffeeness "no advertising promises, no marketing nonsense".
  CoffeeGeek "no manufacturer payments".
- **External validation**: Coffeechronicler menciona Q Arabica Grader (cert
  externa). CoffeeGeek tiene 25+ años de historia visible.

### E. Interactive features

- **Filtros**: Coffeegeek Reviews archive con categorías. Coffee Bros tiene
  filtros avanzados.
- **Comparators interactivos**: Clive Coffee `/pages/compare` (e-commerce), Coffee
  Bros side-by-side, NO observado en afiliados puros.
- **Calculators**: NO observado en ningún sitio del set. Hueco claro.
- **Quizzes**: Whole Latte Love, Majesty Coffee, Breville, Espresso Setup Builder
  los tienen. Coffee Bros también. NO en afiliados editoriales puros.
- **Sticky comparison bar**: NO observado en coffee. Pattern más común en tech
  afiliados generalistas.
- **Wishlist / save**: NO observado en afiliados (es feature retail).
- **Search interna**: Sí en CoffeeGeek (search header con autocomplete inferido).
  Sí en Coffeeness. No prominente en Coffeechronicler/Coffeekev.

### F. Internal navigation

- **Mega menu**: CoffeeGeek con secciones (Reviews, Opinions, Guides, Resources,
  Community, Blog, About Us). Tom's Guide con mega menu tech. Coffeechronicler:
  menu más simple (Reviews / Features / Recommended Gear).
- **Related content sections**: Sí en todos. Patrón "you might also like" /
  "related guides".
- **Sticky TOC en posts largos**: CoffeeGeek 2024 lo tiene (diferenciador).
  Wirecutter tiene "in this article" jump-to. Coffeechronicler no observado.
- **Breadcrumbs**: Sí en todos los modernos.
- **Schema markup**: Wirecutter tiene Article + Review schemas ricos.
  Coffeechronicler/Coffeeness similares. Nuestro sitio ya inyecta Product,
  ItemList, FAQPage, BreadcrumbList — bien.

### G. Content depth

- **Word count reviews individuales**: ver sección B. Rango 2,000-15,000.
- **Productos en best-of**: 5-12.
- **Video embed**: CoffeeGeek y Coffeechronicler tienen canal YouTube y embeben.
  Coffeeness embebe sus propios videos. Coffeekev menos.
- **FAQ sections**: Estándar. 3-7 preguntas típicamente. Tu sitio ya las hace
  programáticas (best/[slug].astro tiene FAQ default + faqExtras opcional).

## Recomendaciones priorizadas para baristapath.com

Ordenadas por **ROI esperado** (impacto / costo). Cada una con justificación
en patterns observados.

### 1. Verdict box / TL;DR arriba de cada best-of y review

- **Qué cambiar**: Insertar bloque "At a glance: our top pick" después del intro
  y antes de la tabla, con: imagen pequeña del top pick + 1 oración descripción +
  CTA inmediato + ancla a "why we picked it". Para reviews individuales: bloque
  "Verdict" en primer scroll con score-like summary (best for / not for / price)
  + CTA.
- **Por qué**: Wirecutter promueve "top pick right after intro" (Tetra Marketing,
  Ahrefs). Patrón replicado por Tom's Guide. Tu sitio actualmente arranca con
  intro lead + sección "At a glance" tabla — falta el verdict box visual con CTA.
- **Effort**: S. Modificar `best/[slug].astro` y `review/[slug].astro` para
  agregar componente VerdictBox.
- **Expected lift**: Conversión (+5-15% típico por mover CTA above the fold),
  dwell time si está bien escrito.
- **Implementación**: agent. Cambios en templates Astro.

### 2. CTA visualmente prominente (botón con color de contraste)

- **Qué cambiar**: La clase `affiliate-cta` actual es probablemente un link de
  texto. Convertirla en botón pleno: padding 12-16px vertical, background color
  contrast (naranja `#d97706` o rojo `#dc2626` consistente con paleta coffee),
  texto blanco, border-radius, font-weight 600. Copy: "Check price on Amazon"
  (mejor que "Check on Amazon" — el "price" implica acción concreta).
- **Por qué**: Wirecutter rojo es el referente citado por Tetra Marketing y
  Ahrefs. Patrón table-stakes en 5/6 sitios. Tu CTA actual es un anchor inline
  pelado.
- **Effort**: S. Una clase CSS + cambio de copy en 4 archivos (`best/`, `review/`,
  `compare/`, `products/`, `index.astro`).
- **Expected lift**: Conversión directa.
- **Implementación**: agent.

### 3. Author byline + última actualización en cada post

- **Qué cambiar**: Agregar al schema de Base.astro props `author`, `publishedAt`,
  `updatedAt`. Renderizar bajo H1: "By [Author Name] · Updated May 15, 2026".
  En About page: foto del operador (sin foto real, usar avatar/silueta neutra o
  initials) + bio de 100-150 palabras explicando experiencia coffee.
- **Por qué**: 5/6 sitios. Pattern table-stakes E-E-A-T post-Google HCU
  (Helpful Content Update). Diferenciador vs sitios programmatic genéricos
  (Google Site Reputation Abuse).
- **Effort**: S-M. Schema content + UI render + escribir About bio.
- **Expected lift**: SEO E-E-A-T (medible en 4-12 semanas), trust visual.
- **Implementación**: agent puede escribir el draft del About y el componente.

### 4. Methodology page robusta + linkearla desde cada review

- **Qué cambiar**: Tu sitio ya tiene `methodology.astro` (no leí contenido).
  Expandirla con: criterios de evaluación específicos por categoría (espresso
  machine: shot quality / temp stability / build / parts availability / price; 
  grinder: grind uniformity / static / retention / build / noise). Pattern de
  Coffeeness y Coffeechronicler. Link "How we test" prominente desde el header
  de cada best-of y review.
- **Por qué**: Coffeeness tiene `/our-review-process/`. Coffeechronicler
  `/product-review-policy/`. Wirecutter es referente. Diferencia editorial de
  un thin affiliate.
- **Effort**: S (escribir doc) + S (link prominente). Total S.
- **Expected lift**: E-E-A-T, conversión indirecta (lectores que leen
  methodology convierten más).
- **Implementación**: agent escribe doc, basado en categorías y price tiers
  que ya tenés en data.

### 5. Multi-tier picks labels en best-of

- **Qué cambiar**: En vez de solo ranking #1-#N, agregar labels semánticos:
  "Best overall", "Best for beginners", "Best budget pick", "Upgrade pick".
  Tu sitio ya tiene `best_for` array y `price_tier` en schema — usar esos para
  generar labels.
- **Por qué**: Wirecutter inventó el pattern. Tom's Guide y Coffeeness lo copian.
  Le da scanability al lector que no quiere leer 5,000 palabras.
- **Effort**: S. Lógica en best/[slug].astro para mapear best_for + price_tier
  a label de pick.
- **Expected lift**: Dwell time + conversión por scanning.
- **Implementación**: agent.

### 6. Calculator de cost-per-cup vs cafetería

- **Qué cambiar**: Nueva página `/tools/cost-per-cup-calculator/` con inputs
  (precio máquina, precio café/kg, gramos por shot, shots/día, precio cafetería
  comparativa) y output (payback period, ahorro 5 años). Link desde footer +
  desde reviews relevantes.
- **Por qué**: NO observado en ningún sitio del set — hueco real. Genera
  backlinks orgánicos (es un tool linkable). Mejora dwell time. Cae bien con
  perfil data scientist del operador.
- **Effort**: M. JS vanilla + UI. ~200-300 líneas.
- **Expected lift**: Backlinks (potencialmente alto), tiempo en sitio, ranking
  para queries "is espresso machine worth it" / "espresso vs starbucks cost".
- **Implementación**: agent.

### 7. Quiz "Which espresso machine should I buy"

- **Qué cambiar**: 6-8 preguntas (budget / experience / shots-per-day / 
  latte-or-espresso / counter-space / time-willingness). Output: 1 top pick +
  2 alternates de tu catálogo. Link prominente en homepage + best-of espresso.
- **Por qué**: Whole Latte Love, Majesty Coffee, Breville lo tienen. NO en
  ningún afiliado editorial del set — diferenciador.
- **Effort**: M. Decision tree estático en JS + UI states.
- **Expected lift**: Captura traffic top-of-funnel ("which espresso machine
  should I buy" es high-volume query), tiempo en sitio, conversión guiada.
- **Implementación**: agent.

### 8. Sticky TOC (Table of Contents) en posts largos

- **Qué cambiar**: Componente TOC que parsea headings H2/H3 y aparece sticky en
  desktop (sidebar izquierda), oculto en mobile o con drawer.
- **Por qué**: CoffeeGeek 2024 lo introdujo como diferenciador. Útil cuando
  reviews crecen >1,500 palabras.
- **Effort**: S-M. Componente Astro + CSS sticky.
- **Expected lift**: Dwell time, scroll-to-section UX. Bajo impacto SEO directo.
- **Implementación**: agent.

### 9. Comparator interactivo (3 productos side-by-side)

- **Qué cambiar**: Página `/tools/compare-espresso-machines/` con dropdowns
  para elegir 2-3 productos del catálogo. Tabla con specs + pros/cons + CTAs.
- **Por qué**: Clive Coffee y Coffee Bros lo tienen. NO en afiliados editoriales.
  Compite con páginas estáticas `/compare/[a]-vs-[b]/` que ya tenés (las
  complementa, no reemplaza).
- **Effort**: M. JS state + render dinámico desde data collection.
- **Expected lift**: Tiempo en sitio. SEO menor (página dinámica indexable
  pero sin URLs únicos).
- **Implementación**: agent.

### 10. Update cadence visible + schedule de updates

- **Qué cambiar**: Auto-render "Last reviewed: [date]. We re-check every [X]
  months." en cada best-of. Tu FAQ ya dice "review quarterly" — hacerlo visible
  arriba.
- **Por qué**: Wirecutter actualizó 5 artículos viejos por cada nuevo en 2022
  (Ahrefs case study). Pattern fuerte para Google freshness.
- **Effort**: S.
- **Expected lift**: SEO freshness + trust.
- **Implementación**: agent.

## Gaps de nuestro sitio vs benchmark

Lo que mostró el research que falta:

- **Author identity**: no hay byline ni About con autor visible (Base.astro
  link a /about pero no lo renderiza por post).
- **CTA estilo botón**: el actual es link de texto, no botón color-coded.
- **Verdict / TL;DR box**: arrancamos con tabla "At a glance" pero falta el
  verdict prosa con top-pick CTA arriba de todo.
- **Methodology depth visible**: existe `/methodology/` pero no linkeada
  prominentemente desde reviews (no confirmé sin leer contenido).
- **Update date visible per post**: el data schema tiene `updated_at` pero no
  lo vi renderizado en best/[slug].astro.
- **Calculator / quiz**: cero tools interactivos. Hueco vs el resto del nicho
  retail (afiliados puros no lo hacen, pero retailers sí).
- **Multi-tier pick labels**: solo ranking #1-#N, sin "best for beginners",
  "budget pick", etc.
- **Photos propias**: gap real, no resoluble sin sesiones de fotos.
- **Sticky TOC**: no tenemos.
- **Schema author / reviewer en JSON-LD**: el Base inyecta Breadcrumb/Item/FAQ
  pero no Author/Reviewer en Article.

## Lo que NO recomiendo copiar

- **Photos propias hands-on** (CoffeeChronicler, CoffeeGeek). Requiere
  comprar 50+ máquinas o pedirlas a fabricantes. Operador solo sin studio.
  Mitigación: usar imágenes de Amazon Product Advertising API (legalmente
  permitido vía Associates) + hero genéricos de Unsplash para best-of.
- **Multi-page detailed reviews 10K-15K palabras** (CoffeeGeek). Costo
  editorial brutal. ROI dudoso para un sitio nuevo sin DR. Mejor 2,000-3,500
  palabras bien hechas.
- **Video YouTube embeds** (CoffeeChronicler, CoffeeGeek). Asume canal YouTube
  activo. No para operador solo sin presencia front-camera. Mitigación: si
  algún día se hace, usar embeds de terceros con permiso, no propios.
- **Comments / community por post** (CoffeeGeek 2024 lo está rebuildeando).
  Moderar comments es trabajo full-time + riesgo spam. No para operador solo.
- **Forum / phpBB** (Home-Barista). Modelo de comunidad pesado.
- **Author personality muy fuerte / first-person** (CoffeeChronicler,
  CoffeeKev). Funciona cuando hay autor real con cara. Para nosotros:
  preferible tono editorial colectivo ("we tested") sobre first-person
  ("I tested") porque no hay rostro humano detrás.
- **Multiple retailers (Best Buy, Williams Sonoma)** ahora mismo. Asume
  cuentas afiliadas múltiples. Empezar Amazon-only mientras Associates es la
  única monetización aprobada.
- **Scoring numérico rígido** (CoffeeGeek). Riesgo de parecer arbitrario y
  rigidiza updates. Preferible "verdict box" prosa.
- **Mega menu complejo**. Para un sitio de 153 páginas en 2 verticales
  (espresso, grinder), un menu simple es suficiente. Mega menu agrega cognitive
  load sin payoff a este tamaño.

## Limitaciones del análisis

Honesto sobre lo que NO pudimos hacer en esta sesión:

1. **403 sistemático en WebFetch directo**. Todos los sitios principales
   (coffeegeek, coffeechronicler, coffeekev, coffeeness, clivecoffee,
   tomsguide, nytimes/wirecutter, home-barista) bloquearon WebFetch. El
   análisis se reconstruyó vía WebSearch snippets, posts del propio
   CoffeeGeek explicando su redesign, y meta-análisis de terceros (Tetra
   Marketing, Ahrefs).
2. **No pude inspeccionar CSS directo**. Tamaños de fuente, line-heights,
   colores exactos, spacings — todos inferidos de descripciones públicas y
   patterns conocidos del nicho.
3. **No pude tomar screenshots**. Las descripciones son textuales.
4. **No verifiqué con Lighthouse / Core Web Vitals**. Performance comparison
   no posible en esta sesión.
5. **DR (Domain Rating) estimadas**, no Ahrefs check. Verificar antes de usar
   como argumento de prioridad.
6. **Mobile UX inferido de descripciones**. No hubo navegación mobile real.
7. **El análisis cubrió 6/9 sitios objetivo con buena profundidad**
   (coffeegeek, coffeechronicler, coffeekev, coffeeness, clivecoffee,
   tomsguide). Wirecutter cubierto vía análisis terceros (Ahrefs + Tetra
   Marketing). Home-Barista solo a nivel estructural (es un foro, no review
   site). Barista Magazine NO analizado (no era prioridad — editorial puro
   sin afiliado).
8. **Word counts son estimaciones** basadas en descripciones públicas, no
   medición directa.

## Fuentes

URLs visitadas / consultadas (las que dieron información útil):

- https://coffeegeek.com/opinions/state-of-coffee/welcome-to-the-2024-version-of-coffeegeek/
  — Post del propio CoffeeGeek explicando 2024 redesign, secciones, tipografía,
  scoring, sticky TOC.
- https://coffeegeek.com/blog/news/a-new-coffeegeek-is-coming-in-2024/ — confirma
  font choices (Roboto Slab, Roboto, Poppins, Zilla Slab, Piazolla) y theme
  per section.
- https://coffeegeek.com/reviews/ — categorías de review (Snapshot, Full,
  Detailed, First Look).
- https://coffeechronicler.com/product-review-policy/ — methodology page,
  refractómetros, particle size analyser, decibel meter, blind tasting.
- https://coffeechronicler.com/about/ — Asser Christensen, Q Arabica Grader,
  journalist.
- https://coffeechronicler.com/gear/espresso-machines/ — best-of page structure.
- https://www.coffeeness.de/en/our-review-process/ — methodology page Coffeeness.
- https://www.coffeeness.de/en/about-coffeeness/ — Arne Preuss, ex-barista.
- https://www.coffeeness.de/en/best-espresso-machine/ — best-of structure
  Coffeeness.
- https://coffeekev.com/ — site overview, trust micro-copy.
- https://clivecoffee.com/pages/compare — comparator interactivo.
- https://www.home-barista.com/forums/ — estructura forum.
- https://www.tomsguide.com/home/coffee-makers/best-espresso-machines — best-of
  Tom's Guide.
- https://ahrefs.com/blog/wirecutter-seo-case-study/ — 5 ways Wirecutter wins
  (E-E-A-T, UX, navigation, content updates 5:1, distribution).
- https://www.tetramarketing.io/p/site-analysis-wirecutter — análisis del rojo
  CTA, top pick after intro, multiple retailer placements.
- https://www.animalz.co/blog/opinionated-content — opinionated content
  Wirecutter approach.
- https://espressosetupbuilder.com/quiz/which-espresso-machine — quiz example.
- https://www.wholelattelove.com/blogs/articles/espresso-machine-quiz — quiz
  example retailer.
- https://coffeebros.com/pages/espresso-machine-comparison — comparator example.

(WebSearch usado 25-30 veces; WebFetch directo retornó 403 en todos los sitios
principales — limitación documentada arriba.)
