# ADR 0005 — Segundo vertical: 3D printing

**Fecha:** 2026-05-24
**Estado:** Propuesta — pendiente aceptación operador en cada sub-decisión.

## Contexto

Tras research del agente "Niche shortlist research #2" (ver
`market/niches/shortlist-2.md`, commit `3ede598`), 3 verticales emergieron
como finalistas para correr en paralelo a coffee (`baristapath.com`):

| # | Vertical | Score agente | Recomendación agente |
|---|---|---|---|
| 1 | 3D printing | 25/30 | Sí (primera elección) |
| 2 | Hi-fi audio / vinyl | 24/30 | Segundo |
| 3 | Hunting / archery | 24/30 | Tercero |

Operador aceptó la recomendación principal: **3D printing**.

Razones aceptadas: SERP fragmentada (única autoridad fuerte es All3DP),
dataset hyper-técnico ideal para programmatic SEO, audiencia STEM match
natural con perfil operador (data scientist), opciones de monetización
diversificada (programas direct de Bambu/Elegoo/Creality 5-10% además de
Amazon 3%).

## Sub-decisiones a tomar

### Sub-decisión 1: Sub-nicho de entrada (FDM vs resin vs mixto)

**Opciones consideradas:**

| Opción | Pros | Contras |
|---|---|---|
| **FDM-first** (filament printers) | Mainstream ($200-600 entry); search volume mayor; Bambu Lab A1 / P1S dominante con direct program; mejor para reviews first-party | Más competencia que resin; require más espacio físico |
| Resin-first | Menos competencia; AOV alto en accessories (wash stations, resinas); audiencia más nicho | Menor volumen total; resinas requieren disclaimers de seguridad (toxicidad) que rozan YMYL |
| Mixto desde día 1 | Cobertura completa | Diluye autoridad temprana; SEO recomienda topical depth antes que breadth |

**Recomendación**: **FDM-first**, mixto al mes 6 una vez que el sitio tenga autoridad
en FDM.

Razones:

1. **AOV + volumen óptimo combinado**. FDM tiene printers desde $199 (Bambu A1 mini)
   hasta $1,500 (X1 Carbon). Audiencia más grande, queries más numerosas,
   menor barrera para reviews first-party.
2. **Topical authority pattern probado en coffee**. Iniciamos coffee con
   "espresso machines + grinders" antes de abrir a brewing methods. Mismo
   patrón aquí: FDM (printers + filaments + accessories) primero, resin al
   mes 6 si los datos lo justifican.
3. **Direct affiliate programs disponibles**. Bambu Lab + Creality +
   Anycubic + Elegoo (este último también resin pero entry FDM con
   Neptune) ofrecen 5-10% direct. Operador debe verificar términos cuando
   active.
4. **Anti-gray-hat alineado**. FDM materials (PLA, PETG, TPU) son
   chemicalmente más estables que resinas; reviews honestos de seguridad
   son más simples sin entrar en territorio YMYL.

### Sub-decisión 2: Template Astro — reuso vs fork

**Opciones consideradas:**

| Opción | Pros | Contras |
|---|---|---|
| Reuso (mismo repo, content collection nueva) | Sin overhead de mantener 2 repos; deploys atomic | Cross-contamination de marca; un bug afecta a ambos; SEO sufre si Google asocia mismo origin a 2 marcas distintas |
| **Fork (nuevo repo, mismo template)** | Branding independiente; deploys independientes; reduce blast radius de cambios; SEO clean | Hay que duplicar fixes a ambos hasta que se extraigan a un package shared |
| Monorepo con shared package | Lo mejor de ambos largo plazo | Overhead de configuración; no vale antes de validar el 2do nicho |

**Recomendación**: **Fork (nuevo repo o subcarpeta `filamentpath-project/`
en este mismo repo)**.

Razones:

1. **Independencia de deploy**. Cada sitio tiene su pipeline Cloudflare
   Pages. Si rompemos el build de uno, el otro no se ve afectado.
2. **Branding limpio**. `baristapath.com` y `filamentpath.com` deben verse
   como dos publishers distintos para Google (E-E-A-T por sitio, no
   compartido).
3. **Validación temprana antes de invertir en abstracciones**. No
   sabemos aún qué components requieren divergencia (e.g. printer specs
   table vs espresso specs table son estructuralmente distintos). Forkear
   primero, abstraer cuando duela.
4. **Subcarpeta en mismo repo es aceptable**. Operador trabaja desde
   móvil; tener 2 repos es overhead. Propuesta: `filamentpath-project/`
   al lado de `amazon-resale-project/`, copia del esqueleto Astro,
   content collections nuevas con schemas de printer/filament/accessory.

### Sub-decisión 3: ¿Comprar printer entry para reviews first-party?

**Opciones consideradas:**

| Opción | Costo | Beneficio | Riesgo |
|---|---|---|---|
| **Comprar printer entry (Bambu A1 mini ~$250) ya** | -$250 capital | Reviews first-party desde día 1, content único, defensible vs scraped competitors | Capital antes de validar nicho (mismo riesgo que comprar Keepa antes de tener tráfico) |
| Esperar a tener 50+ pages indexadas + primer click affiliate | $0 | Validamos demanda antes de invertir | Reviews iniciales todos secundarios (basados en specs públicos); diferenciación más débil |
| Pedir prestado / pedir review unit a Bambu | $0 | Reviews first-party sin capital | Bambu probablemente no responde hasta que el sitio tenga tráfico |

**Recomendación**: **Esperar — fase 1 con reviews basados en specs
públicos + community sentiment + first-party de coffee operador (sí, ya
tenés años de experiencia con esto). Comprar Bambu A1 mini ($249)
cuando el sitio tenga 50+ pages publicadas + primera evidencia de
indexing (alguna page rankeando top-50).**

Razones:

1. **Mismo principio que aplicamos a Keepa**. Capital justificado por
   evidencia, no por hype. Antes de gastar $250, validamos que el sitio
   puede generar tráfico.
2. **El operador ya tiene experiencia con 3D printing personalmente** (a
   confirmar — operador, indicame si esto es real). Si tenés un printer
   personal, podés hacer reviews first-party desde día 1 sin comprar
   nada nuevo.
3. **Stop-loss alineado**. Coffee ya consume capital ($14 dominio + $99
   futura Keepa). Acumular gastos pre-revenue eleva exposure al stop-loss
   de $5,000.
4. **Cuando comprar tenga sentido**: 50+ pages indexadas + 100+
   impresiones/mes en Search Console + 1+ click affiliate. Threshold
   concreto.

## Domain candidato

Operador debe validar disponibilidad y registrar después de aceptar este ADR.
Recomendación principal: `filamentpath.com` (paralelismo intencional con
`baristapath.com` para branding consistente).

Alternativas si `filamentpath.com` no disponible:
- `layerlab.io`
- `resinguild.com` (descartado si la sub-decisión 1 es FDM-first)
- `filamentcraft.com`
- `printpath.io`

## Costo total estimado para arrancar 2do nicho

| Item | Costo | Cuándo |
|---|---|---|
| Dominio `filamentpath.com` | $10-14/año | Inmediato post-ADR aprobada |
| Cloudflare Pages | $0 | Inmediato |
| Cloudflare Email Routing | $0 | Inmediato |
| Printer entry (Bambu A1 mini) | $249 | **Solo cuando sitio cruce threshold de validación** |
| Filamentos para reviews (5 spools) | $100-150 | Junto con el printer |
| **Total fase 1** (antes de threshold) | **$10-14** | Una vez |
| **Total fase 2** (post-threshold) | **$350-400** | Una vez |

## Métricas de validación (mes 3 del 2do nicho)

Mismas que coffee, con thresholds más agresivos porque ya tenemos un
template probado:

- ≥30 páginas indexadas en Search Console (vs 50 que era el threshold de coffee)
- ≥50 impresiones/mes orgánicas (vs 100)
- 1+ click affiliate registrado (vs 1+ sale)

Si los 3 fallan al mes 3, retro y considerar abandono.

## Riesgos cross-portfolio

Ambos sitios son hobby indoor masculino con disposable income. Riesgos
correlacionados:

- Política Amazon Associates US cambia comisiones → ambos sitios afectados
- Recesión US reduce disposable income → ambos sitios afectados
- Google core update castiga afiliados → ambos sitios afectados

Mitigación parcial: programas direct de Bambu/Creality reducen
dependencia 100% de Amazon en el 2do sitio. Coffee no tiene equivalente
masivo (manufacturers de espresso machines raramente tienen programa
affiliate direct).

## Próximos pasos si ADR aceptada

1. Operador registra `filamentpath.com` (10 min, $14).
2. Claude crea `filamentpath-project/` con copia del esqueleto Astro de
   coffee (mismo template, content collections vacías).
3. Agente bootstrap: 30-50 mock products (FDM printers + filaments +
   accessories) siguiendo schema definido.
4. Validaciones de nicho replicadas (volúmenes Ubersuggest + allintitle
   KGR) en queries 3D printing top 20.
5. ADR 0006 (futura) si threshold de mes 3 se cruza: decisión de comprar
   printer y abrir resin.
