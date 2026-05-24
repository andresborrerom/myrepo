# Niche shortlist research

Fecha: 2026-05-13
Autor: Claude (research preliminar) — sujeto a revisión del operador y a ADR
0003 para decisión final.

## Resumen ejecutivo

Tras evaluar 13 verticales contra 6 filtros (comisión Amazon Associates US,
precio promedio, competencia SERP, volumen agregado, estacionalidad,
dataset disponible), tres verticales emergen como candidatos viables:

1. **Outdoor cooking (pellet smokers / BBQ / grills portátiles)** — 26/30.
   Precio alto ($300-2000), comunidad activa, SERP poblada por afiliados
   nicho (smokedbbqsource, BBQReport, journeymanhq, grillcuisines) más que
   por autoridades. Atributos comparables claros (BTUs, sq.in., pellets vs
   gas, hopper capacity).
2. **Coffee equipment (espresso, grinders, especialidad)** — 25/30.
   Comunidad obsesiva-comparativa, productos modulares (máquina + grinder
   + accesorios = 3 búsquedas por usuario), precio medio-alto, dataset
   muy estructurado por presión bares, group head size, boiler type,
   PID, etc.
3. **Aquariums / fishkeeping (filtros, iluminación, calentadores,
   sustratos)** — 24/30. Mercado de $7B+ creciendo 6.5% CAGR, hobby
   intensivo en equipo, SERP fragmentada en sitios chicos
   (aquarevolt, fishtank.expert, simplyaquarium, myhomeaquarium),
   muchos sub-segmentos (75gal, 55gal, reef, planted, betta).

Recomendación final al cierre del documento: **arrancar por outdoor
cooking** — combina la mejor relación de comisión + precio alto +
competencia SERP relativamente débil + estacionalidad manejable.

## Metodología

### Herramientas usadas

- WebSearch (Google) para SERP inspection y verificación de sitios
  rankeando.
- WebFetch intentado contra fuentes oficiales y agregadores; la mayoría
  devolvió 403, así que la tabla de comisiones se reconstruyó cruzando
  snippets de 4-5 fuentes secundarias (azonpress, helpingmerchants,
  affiliatexblocks, getlasso, earnifyhub, youfiliate, Shopify guide).
- Google autocomplete y "related searches" inferidos vía resultados de
  búsqueda (sin acceso directo a Trends ni a Ahrefs/Keyword Planner).
- Inspección manual del top 10 de cada SERP buscando: ¿hay Wirecutter,
  RTINGS, Consumer Reports, NYT, marca de autoridad? vs ¿hay dominios
  nicho independientes con `.com` corto?

### Aplicación de los 6 filtros (scoring 1-5 cada uno)

1. **Comisión Amazon Associates US**: 5 si ≥6%, 4 si 4.5-5.9%, 3 si
   3-4.4%, 2 si 2-2.9%, 1 si <2%. Hay variación entre fuentes
   secundarias (post-cuts de abril 2020 y ajustes posteriores). Donde
   hay conflicto, tomo la más conservadora.
2. **Precio promedio**: 5 si ≥$300, 4 si $150-299, 3 si $80-149, 2 si
   $50-79, 1 si <$50.
3. **Competencia SERP**: 5 si dominada por afiliados independientes y
   marcas (sin DR>70), 4 con mezcla 80/20 nicho/autoridad, 3 si 50/50,
   2 si dominan medios grandes pero hay huecos, 1 si Wirecutter +
   Consumer Reports + RTINGS copan top 5.
4. **Volumen agregado**: 5 si claramente >100k búsquedas/mes en total
   nicho, 4 si 30-100k, 3 si 10-30k, 2 si 3-10k, 1 si <3k. Sin
   Ahrefs todo es estimación cualitativa basada en señales (cantidad
   de sitios afiliados maduros = proxy de volumen rentable).
5. **Estacionalidad**: 5 si plana o levemente creciente todo el año, 4
   si pico moderado pero base alta, 3 si pico estacional claro pero
   compras durante todo el año, 2 si fuerte estacional, 1 si pico
   masivo aislado.
6. **Dataset**: 5 si atributos numéricos / categóricos claros
   (capacidad, BTU, vatios, presión, etc.), 4 si atributos algo
   estandarizados pero requieren parsing, 3 si mixto, 2 si subjetivo,
   1 si todo es opinión / fit / estilo.

### Limitaciones honestas (también en sección final)

- Sin Ahrefs / Helium 10 / Semrush / Google Keyword Planner, los
  volúmenes son estimaciones cualitativas basadas en cantidad y
  madurez de sitios afiliados en el nicho. Confidence: media.
- WebFetch falló contra el schedule oficial de Amazon Associates
  (HTTP 403). La tabla de comisiones está reconstruida cruzando
  fuentes secundarias y verás conflictos: el operador debe loguearse
  a Amazon Associates US para validar las tasas exactas hoy antes
  de comprometerse.
- No inspeccioné DR real (sin Ahrefs); estimo DR por marca del sitio
  + edad aparente del dominio.

## Tabla amplia de verticales evaluados

Comisión Amazon Associates US: el dato es **conservador / disputado**
en varias categorías. Sigue mejor estimación cruzando fuentes; el
operador debe verificar in-platform.

| Vertical | Comisión % | Precio prom. | Compet. SERP (1-5) | Vol. estim. | Estacional. (1-5) | Dataset (1-5) | Score total | Comentario corto |
|---|---|---|---|---|---|---|---|---|
| Outdoor cooking (pellet smokers, grills portátiles, BBQ) | 3-4.5% (Outdoors/Sports) | $300-1500 | 5 | 5 | 4 | 5 | **26/30** | SERP dominada por afiliados nicho; dataset técnico muy comparable |
| Coffee equipment (espresso, grinders, accesorios) | 4.5% (Kitchen) | $150-1500 | 4 | 5 | 5 | 5 | **25/30** | Sub-nicho espresso/grinders muy estructurado; algo de RTINGS y Food Network |
| Aquariums / fishkeeping | 3-8% (Pet) | $100-800 | 5 | 4 | 5 | 5 | **24/30** | Hobby caro, muchos sub-segmentos; sitios chicos rankean |
| Cat furniture / cat trees | 3-8% (Pet) | $60-300 | 4 | 4 | 5 | 4 | **20/30** | Catster como autoridad media; precio bajo limita comisión absoluta |
| Backyard chickens (coops, doors, feeders) | 3% (Outdoors) | $80-500 | 5 | 3 | 4 | 4 | **20/30** | SERP llena de sitios chicos pero volumen moderado, estacional suave |
| Home gym equipment (racks, plates, benches) | 3% (Sports) | $300-1500 | 3 | 5 | 4 | 4 | **22/30** | BarBend, Garage Gym Reviews son sólidos pero hay huecos en sub-nichos |
| Standing desks / ergonomic office | 4-8% (Furniture, disputado) | $200-600 | 4 | 4 | 5 | 4 | **22/30** | Mix de afiliados (DeskBusters) y marcas grandes (Autonomous) |
| Headphones / audio | 3-4% (Electronics) | $100-400 | 1 | 5 | 5 | 4 | **18/30** | RTINGS + Rolling Stone + SoundGuys = pared |
| Power tools / cordless drills | 3% (Tools) | $150-500 | 2 | 5 | 4 | 4 | **20/30** | Consumer Reports + HGTV + Reviewed dominan top 10 |
| E-bikes / mobility | 3% (Sports) | $1000-3000 | 3 | 4 | 4 | 4 | **20/30** | Marcas (Lectric, Aventon) compiten por su propio nombre; precios altos compensan |
| Sous vide / niche kitchen | 4.5% (Kitchen) | $100-300 | 2 | 4 | 5 | 4 | **20/30** | Food Network + Anova marca dominan; pero sub-nichos posibles |
| Fishing kayaks | 3% (Sports) | $400-1200 | 3 | 3 | 3 | 4 | **18/30** | Field & Stream + Outdoor Life rankean; estacional moderado |
| Photography / mirrorless cameras | 5% (Camera) | $500-2500 | 1 | 4 | 5 | 5 | **20/30** | DPReview + PetaPixel + Wirecutter; nicho saturado de autoridad |

Total verticales evaluados: 13. Excluidos automáticamente por filtros:
suplementos (YMYL), juguetes infantiles (estacional + audiencia
adolescente), disfraces, productos para adolescentes, replicas.

## Top 3 finalistas

### 1. Outdoor cooking (pellet smokers, portable grills, BBQ accessories)

- **Score:** 26/30
- **Comisión Amazon US:** **3-4.5%** según fuente. La categoría
  Amazon "Outdoors" históricamente fue 5.5% y la "Sports" 4.5%; ambas
  fueron cortadas a 3% en algunos rounds de cuts. Algunas fuentes
  secundarias actuales (2026) reportan Outdoors/Sports nuevamente
  en 4.5%. **Acción operador:** loguearse a Associates Central y
  validar la celda exacta para "Outdoor Recreation Products" antes
  de confirmar.
  Fuentes consultadas (todas secundarias, conflicto entre ellas):
  https://www.gorillaroi.com/blog/profitable-product-categories-amazon-affiliates
  · https://martech.org/big-amazon-affiliate-commission-rate-cuts-among-latest-program-changes/
- **Precio típico:** $300-1500. Ejemplos de ASINs reales mencionados
  en SERPs 2026 (precios verificar en Amazon, snapshot):
  - Traeger Pro 22 Wood Pellet Grill: ~$450-600
  - Z Grills 697 (2026 Upgrade): ~$500-700
  - Pit Boss 850 DX: ~$500-650
  - Weber Traveler (portable propane): ~$400
  - Camp Chef SmokePro DLX: ~$500-700
- **Competencia SERP en 5 keywords:**
  - "best pellet smoker for beginners 2026": top 10 = smokedbbqsource,
    tasteofhome (autoridad media), openaircooking, bettergrills,
    bbqreport, heygrillhey, bigcheesepizzaandgrinders, smokeandpellets,
    mensjournal (autoridad media), bbqguys. **DR estimada: medio-bajo
    promedio**, dominado por afiliados nicho.
  - "best pellet smoker for apartment": top 10 = smokedbbqsource,
    journeymanhq, grillcuisines, lakesidesmokers, zgrills (marca),
    quora, foros. **DR bajo**, perfecto para entrada.
  - "best portable propane grill camping 2026": mensjournal +
    consumerreports + outdoorgearlab + foodnetwork + bbqguys +
    smokedbbqsource + treelinereview. **Mix con autoridad media-alta**;
    sub-keyword más fácil sería "best portable propane grill for tailgating".
  - "best budget pellet smokers under 500": smokeandpellets, bbqreport,
    heygrillhey + nichos. **DR bajo-medio**.
  - "z grills 697 vs traeger pro 22": casi nada serio top 10, oportunidad
    de comparativa programática pura.
- **Volumen estimado:** **agregado >50k/mes** entre el conjunto de
  long-tails. Estimación cualitativa: hay docenas de sitios afiliados
  maduros viviendo del nicho (smokedbbqsource es un agregador con
  cientos de reviews), proxy de mercado rentable.
- **Estacionalidad:** pico en abril-junio (apertura de temporada BBQ
  en US), pero pellet smokers se venden todo el año porque la base
  de usuarios pellet incluye smoking de invierno (briskets, ribs).
  No verificado en Google Trends directamente — confidence media.
  URL trend a validar: https://trends.google.com/trends/explore?q=pellet%20smoker
- **Dataset:** **excelente**. Atributos comparables claros:
  - Cooking area (sq.in.)
  - Hopper capacity (lbs)
  - Temperature range (F)
  - PID controller (sí/no)
  - WiFi-enabled (sí/no)
  - Sear capability (sí/no)
  - Warranty (años)
  - Weight (lbs) / portabilidad
  - Power source (electric, propane, charcoal, pellets)
  - Price tier
  Genera fácilmente 500+ páginas tipo "X vs Y", "best X for Y", "X
  under $Z", "X for [use case]".
- **Tesis del nicho (2 párrafos):**

  El comprador típico de pellet smoker es hombre, 35-65, ingreso
  medio-alto, propietario de casa, decisión de compra de $500-1500
  considerada (no impulsiva). Pasa semanas investigando, compara
  modelos, lee reseñas, mira videos de YouTube. Es exactamente el
  perfil que convierte bien en Amazon Associates: ticket alto + ciclo
  largo + alta intención. El cookie de 24h de Amazon además recoge
  ventas colaterales (pellets, probes, covers, accesorios) que
  multiplican comisión por sesión.

  Keywords long-tail estratégicas: "best [brand] vs [brand]" (Traeger
  vs Pit Boss, Z Grills vs Traeger), "best pellet smoker for [use
  case]" (beginners, apartments, large family, tailgating, briskets,
  competition), "[model] review", "best pellets for [meat]" (cookies
  Amazon redirigen a pellets de $30-50), "[brand] vs [brand] [size]
  comparison". Páginas programáticas tipo: matriz de comparación por
  brand+size, calculadora de cooking area por tamaño de familia,
  "smokers under $X" rebanado por presupuesto.
- **Riesgos específicos:**
  - smokedbbqsource es un competidor sólido con DR estimada 50+; va
    a costar entrar al top 3 para keywords cabeza.
  - Estacionalidad real puede ser peor de lo estimado en mercados
    fríos (norte de US). Mitigación: contenido de smoking de invierno.
  - Pellet smokers son productos que pesan 100+ libras, alto riesgo de
    devolución por daño en envío. Amazon paga comisión solo si la
    venta se mantiene (no devuelta). En categoría grill las
    devoluciones son ~5-10%.
  - Marcas como Traeger tienen sus propios programas de afiliados
    fuera de Amazon con tasas más altas — opción de monetización
    alternativa pero requiere setup extra.

### 2. Coffee equipment (espresso machines, grinders, accesorios)

- **Score:** 25/30
- **Comisión Amazon US:** **4.5%** (Kitchen) según múltiples fuentes
  secundarias 2026. Algunas fuentes la bajan a 3% post-cuts; verificar
  en Associates Central. Si es 4.5% sostenida, es de las mejores tasas
  para physical goods de ticket medio-alto.
  Fuentes: https://www.shopify.com/blog/amazon-affiliate-marketing
  (Kitchen 4.5%) cruzado con otras 4 fuentes secundarias.
- **Precio típico:** $150-1500. Ejemplos:
  - Breville Bambino Plus: ~$500
  - Gaggia Classic Pro: ~$450
  - Breville Barista Express: ~$750
  - Baratza Encore ESP grinder: ~$200
  - DeLonghi Stilosa: ~$120
  - Breville Joule Turbo (sous vide colateral): ~$250
- **Competencia SERP en 5 keywords:**
  - "best espresso machine under 500 home": top 10 = coffeechronicler,
    coffeekev, tomscoffeecorner, surlatable (retail), coffeeness,
    quora, coffeeblog.co.uk, coffeegeek (autoridad media-alta),
    home-barista (forum), tomsguide (autoridad alta). **Mix
    50/50** — coffeegeek y tomsguide son autoridades; el resto son
    nicho. Hay hueco para nuevo entrante con contenido programático
    bien estructurado.
  - "best espresso machine for small kitchen": coffeekev, danielnorris,
    huffpost (autoridad), procoffeegear (retail), coffeegeek,
    coffeeness, coffeebrewshub, surlatable, bestbuy, chriscoffee.
    **DR mix**, con espacio.
  - "best espresso machines under 300 with grinder": casi nada serio
    en allintitle — kgr-friendly.
  - "breville bambino vs gaggia classic": comparativas long-tail
    poco saturadas, ideal para páginas programáticas.
  - "best grinder under 200 for espresso": baratza forum, coffeegeek,
    home-barista, perfectdailygrind, varios afiliados nicho. **DR
    medio**.
- **Volumen estimado:** **>100k/mes agregado**. El mercado coffee
  machines vale $20B globales, US es 30% de eso. Nicho de
  hobbyistas obsesivos genera muchas búsquedas long-tail por usuario.
  Fuente: https://www.mordorintelligence.com/industry-reports/global-coffee-machine-market
- **Estacionalidad:** **muy plana**. Café se consume todo el año.
  Único pico discreto es Black Friday/Christmas. URL trend:
  https://trends.google.com/trends/explore?q=espresso%20machine
- **Dataset:** **excelente**. Atributos:
  - Boiler type (single, dual, thermoblock, thermoblock+thermojet)
  - Group head size (54mm, 58mm)
  - PID controller (sí/no)
  - Bar pressure
  - Steam wand (automatic/manual/none)
  - Pre-infusion (sí/no)
  - Built-in grinder (sí/no)
  - Programmable (sí/no)
  - Footprint (width x depth)
  - Water tank capacity
  - Warranty
  - Price tier
  Grinders agregan: burr size, burr material (steel/ceramic), motor
  watts, step vs stepless, micro-adjustments.
- **Tesis del nicho (2 párrafos):**

  Coffee hobbyists tienen una característica única para SEO afiliado:
  compran iterativamente. Primera compra = máquina ($300-500). 6 meses
  después = grinder ($150-300). Año 1 = accesorios (tampers, scales,
  filtros, descalers). Año 2 = upgrade de máquina ($800-1500). Cada
  upgrade dispara una nueva ronda de research. El usuario maduro
  compra $2000+ en 24 meses, todo trackeable bajo el mismo cookie
  Amazon si vuelve al sitio. Adicionalmente, la pasión por el hobby
  hace que las páginas comparativas se compartan en foros (home-barista,
  reddit r/espresso) — backlinks orgánicos.

  Long-tail strategy: "[model] vs [model]" entre las 20-30 máquinas
  más populares = 200+ páginas. "Best espresso machine for [profile]"
  (beginners, latte lovers, small kitchen, manual control, etc.) =
  50+ páginas. "Best grinder for [machine]" combinatoria = 100+
  páginas. "[Brand] [model] review" = páginas por modelo con tabla
  de specs y comparativos. Páginas programáticas: matriz de specs
  por boiler type, filtros por price+features.
- **Riesgos específicos:**
  - coffeegeek.com es DR estimada 60+, autoridad histórica del
    nicho. tomsguide y wirecutter cubren las queries cabeza más
    competidas.
  - La comunidad espresso es técnica y olfatea contenido AI-generated
    sin valor. El sitio debe tener review process serio (mínimo
    fotos reales del operador con cada máquina mencionada, o
    aggregation transparente).
  - Productos más caros (>$1000) están dominados en Amazon por
    marcas con propios programas (Breville, Lelit, La Marzocco). La
    máquina puede no estar disponible o discontinuada en Amazon.

### 3. Aquariums / fishkeeping equipment

- **Score:** 24/30
- **Comisión Amazon US:** **3-8%** disputado. "Pet Products" se
  reporta entre 3% (algunas fuentes) y 8% (otras). Lo más probable
  hoy: 3% post-cuts. **Acción operador:** verificar en Associates
  Central, este es el campo con mayor incertidumbre del análisis.
- **Precio típico:** $50-800. Ejemplos:
  - Fluval 407 canister filter: ~$200
  - Fluval FX6 canister: ~$400
  - AquaClear 110 HOB filter: ~$110
  - Eheim Classic series: $80-200
  - Heaters Inkbird: $40-80
  - LED lighting Fluval/Kessil: $100-400
  - Tanks 75-gallon: $200-500
  - CO2 systems planted tank: $150-400
- **Competencia SERP en 5 keywords:**
  - "best aquarium filter for 75 gallon": top 10 = aquarevolt,
    bestreviews.guide, fishtank.expert, vevor (retail), simplyaquarium,
    fishlore forum, thecichlidstage, reef2reef forum, aquariacentral
    forum, myhomeaquarium. **DR muy bajo en promedio**, dominado por
    sitios pet-niche pequeños + foros.
  - "best filter for 55 gallon planted tank": similar, sitios chicos.
  - "fluval fx4 vs fx6": comparativas con almost zero serious top 3.
  - "best heater for betta tank": sitios betta-specific, comunidad
    pet chica.
  - "best LED light for planted aquarium": planted tank specialists,
    DR bajo.
- **Volumen estimado:** **30-80k/mes agregado**. Mercado aquarium
  global $4-7B con CAGR 6.5%. Hobbyistas son ~1-2% de hogares US pero
  intensivos en gasto. Sub-nichos múltiples = volumen distribuido
  fragmentadamente.
  Fuente: https://www.fortunebusinessinsights.com/aquarium-market-110692
- **Estacionalidad:** **plana**. Tanks se compran y mantienen todo el
  año; setup inicial pico ligero en enero (resoluciones de año
  nuevo) y septiembre (back-to-routine). URL trend a validar:
  https://trends.google.com/trends/explore?q=aquarium%20filter
- **Dataset:** **excelente**. Atributos:
  - Filter type (canister, HOB, internal, sump, sponge)
  - GPH (gallons per hour)
  - Tank capacity range (gallons)
  - Media stages (mechanical, chemical, biological)
  - UV sterilizer integrated
  - Noise level (dB)
  - Power draw (W)
  - Hose diameter
  - Warranty
  Y para tanques: dimensiones, glass thickness, rimmed/rimless, sump
  ready, etc.
- **Tesis del nicho (2 párrafos):**

  Aquarium hobby tiene una propiedad ideal para programmatic SEO:
  combinatoria enorme entre {tipo de tank} x {capacidad en galones}
  x {tipo de fish/plantas/coral} x {equipment category}. Eso
  fácilmente genera 500-1000 páginas long-tail con KGR
  &lt;10 (e.g. "best heater for 20 gallon betta tank", "best filter
  for 40 gallon discus tank", "best LED for 75 gallon planted").
  La comunidad fish-keeping es comunitaria pero la SERP está
  fragmentada en sitios chicos: gran oportunidad de entrada.

  Sub-segmentos atacables: planted tanks (audiencia tech, gastadora,
  CO2/lighting research-heavy), reef tanks (audiencia premium,
  $5000+ setups), nano tanks (low-cost entry hobby, alta rotación de
  primera compra), shrimp keeping (hipster niche, equipment de bajo
  ticket pero alto volumen de páginas). Páginas programáticas tipo:
  matriz por tank size x equipment category, "best X for Y gallon
  tank" combinatoria, comparativas entre brands top (Fluval, Eheim,
  Aqueon, Marineland) por categoría.
- **Riesgos específicos:**
  - Si la comisión real es 3% (no 8%), el unit economics es peor que
    coffee o outdoor cooking. Habría que volumen compensar.
  - Devoluciones por damage in shipping en tanks grandes (cristal
    roto). Mitigación: enfoque en equipment, no en tanks completos.
  - Catster-equivalent del aquarium space es PracticalFishkeeping
    pero es UK-centric. The Spruce Pets cubre algunas queries cabeza
    pero deja huecos enormes en long-tail.
  - Hobby tiene alto churn de entrada — muchos novatos abandonan a
    los 6 meses. Pero los que se quedan son LTV alto.

## Recomendación final

**Arrancar por outdoor cooking (pellet smokers, portable grills,
BBQ accessories).**

Razones:

1. **Mejor combinación de comisión + precio**. A 4.5% sobre $500-1000
   típicos = $22-45 por venta. Si la comisión es 3% sostenida sigue
   siendo $15-30 por venta. Cooking de Amazon Associates funciona
   con cart-attach generoso (pellets, probes, covers, gloves) — el
   ticket promedio por sesión puede ser $700-900.
2. **Competencia SERP más débil** de los tres finalistas. Los top
   sitios (smokedbbqsource, BBQReport, journeymanhq) son afiliados
   independientes con DR estimada 30-50 — alcanzables con 500-1000
   páginas long-tail bien hechas y 12-18 meses de paciencia.
3. **Dataset técnico ideal** para programmatic generation. Más
   estructurado que coffee (que tiene componentes subjetivos como
   "espresso quality") y menos saturado de marcas que coffee.
4. **Demografía del comprador alinea con conversión Amazon Associates**:
   propietario de casa US, ticket considerado, ciclo de research largo,
   confianza alta en Amazon Prime para shipping de unidades de 100+
   libras.

Coffee es el segundo más fuerte pero la competencia incluye coffeegeek,
tomsguide y wirecutter — barrera más alta. Aquariums es atractivo por
SERP fácil pero el riesgo de comisión 3% sobre tickets menores reduce
unit economics.

Próximo paso recomendado: que el operador escriba ADR 0003 con la
decisión final (probable: outdoor cooking + posible plan B coffee).
Antes de empezar a producir contenido, validar in-platform la comisión
real del operating agreement de Amazon Associates US.

## Limitaciones del análisis

**Confidence levels por filtro:**

- Comisión Amazon Associates US — **confidence media-baja**. Fuentes
  secundarias en conflicto. WebFetch falló contra affiliate-program.amazon.com
  (HTTP 403). El operador debe loguearse a Associates Central y
  ver la tabla actual antes de comprometerse.
- Precio promedio — **confidence alta**. Verificado via SERP de
  reviews 2026 con precios mencionados.
- Competencia SERP — **confidence media-alta**. Inspección manual
  de top 10 hecha; DR es estimación visual (sin Ahrefs/Moz).
- Volumen agregado — **confidence baja**. Sin Keyword Planner /
  Ahrefs / Semrush. Estimación basada en proxies (cantidad de
  sitios afiliados maduros = proxy de volumen rentable). Puede
  estar errado por factor 2-3x en cualquier dirección.
- Estacionalidad — **confidence media**. No accedí a Google Trends
  directamente; inferí de conocimiento del mercado y de menciones
  en SERPs.
- Dataset — **confidence alta**. Inspección de productos top y
  catálogos de retail confirma atributos comparables.

**Validaciones pendientes (recomendadas antes de ADR 0003):**

1. Login a Amazon Associates Central US — verificar tabla actual
   de commission rates por categoría exacta (Outdoor Recreation
   Products, Kitchen, Pet Products).
2. Google Trends inspección directa de 5 keywords cabeza de cada
   finalista, 24 meses.
3. Si el operador tiene acceso a Ubersuggest / KWFinder / KeywordTool.io
   free tier — validar volúmenes en 10-15 keywords cabeza.
4. Sample manual de 5-10 long-tails cada vertical con `allintitle:`
   en Google para confirmar KGR &lt;10.
5. Mirar 3-5 sitios afiliados maduros del nicho ganador y estimar
   sus ingresos via SimilarWeb / Worth estimators (proxy de unit
   economics real del nicho).

**Sesgo de selección:** evaluación limitada a 13 verticales en el
tiempo disponible. Verticales no evaluados que podrían superar a
los finalistas: hunting gear, archery, RV accessories, marine
electronics, woodworking tools, 3D printing (filaments + printers),
amateur radio, drone accessories. Recomiendo segunda ronda si el
operador no convalida ninguno de los tres.

## Fuentes consultadas

Tabla de comisiones (todas secundarias por bloqueo del sitio oficial):
- https://www.shopify.com/blog/amazon-affiliate-marketing
- https://www.gorillaroi.com/blog/profitable-product-categories-amazon-affiliates
- https://martech.org/big-amazon-affiliate-commission-rate-cuts-among-latest-program-changes/
- https://searchengineland.com/amazon-affiliate-commission-rates-cut-332966
- Snippet aggregations vía WebSearch de: azonpress, helpingmerchants,
  affiliatexblocks, getlasso, earnifyhub, youfiliate.

Verticales (SERP inspection vía WebSearch):
- Outdoor cooking: smokedbbqsource, BBQReport, openaircooking,
  bettergrills, heygrillhey, journeymanhq, grillcuisines,
  smokeandpellets, mensjournal, bbqguys.
- Coffee: coffeegeek, coffeechronicler, coffeekev, coffeeness,
  home-barista, tomsguide, huffpost, coffeebrewshub.
- Aquariums: aquarevolt, fishtank.expert, simplyaquarium,
  myhomeaquarium, reef2reef, fishlore, vevor.
- Otros verticales evaluados: RTINGS (audio), Consumer Reports
  (drills, grills), Catster (cats), Bird Watching HQ (birds),
  Field & Stream (kayaks), Switchback Travel (MTB), BarBend
  (gym), DeskBusters (desks), Food Network (sous vide), Pickleheads
  (pickleball), thefarmerscupboard (chickens).

Market sizing:
- https://www.fortunebusinessinsights.com/aquarium-market-110692
- https://www.mordorintelligence.com/industry-reports/global-coffee-machine-market
