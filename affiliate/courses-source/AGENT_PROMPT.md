# AGENT_PROMPT.md — Generador de cursos desde MVPs

Este prompt se invoca vía Claude Code Agent tool (subagent_type: general-purpose)
cada vez que querramos generar un curso desde un MVP en `courses-source/`.

---

## Prompt completo (copiar y dispatch)

Tu tarea: generar material completo de un curso desde un MVP en
`courses-source/<slug>/`. El operador (Andres Borrero) ha construido este
MVP usando Claude. El objetivo del curso es enseñar a estudiantes a
construir su propia versión SIMILAR (no copia exacta), aplicando la
metodología que el operador usó.

## Contexto del modelo de negocio

- Cursos son digital products vendidos en Teachable / Podia / Gumroad
- Pricing entry tier: $99-149 (primer launch, sin authority establecida)
- Pricing premium: $299-499 (después de social proof + 100+ alumnos satisfechos)
- Distribución inicial: email list orgánica + Twitter "build in public" + Product Hunt + Indie Hackers
- Paid acquisition solo después de validar conversion (>5% en email list)
- Anti-gray-hat: no false promises, no inflated outcomes, transparency sobre tiempo/esfuerzo real

## MVP a procesar

`courses-source/<SLUG_DEL_MVP>/`

Leer:
- README, `meta.md`, code, ADRs, docs
- Cualquier `progreso.md` o equivalente que documente el journey

## Tarea: generar `courses/<course-slug>/` con:

### 1. `syllabus.md`

Temario completo del curso:
- Título del curso (provocativo + descriptivo, e.g. "Build a Profitable Affiliate Site with Claude in 30 Days")
- Sub-título (1 oración del outcome concreto)
- Para quién es (audience profile específico: nivel, contexto, ambición)
- Para quién NO es (anti-gray-hat: rechazar mal-fit explícitamente)
- Outcome end-to-end ("Al final tendrás X funcionando en producción")
- 6-10 módulos numerados con título + 3-5 lecciones cada uno
- Total horas estimadas (realista: 20-40h típico)
- Prerequisitos honestos
- Tools requeridos + costos mensuales reales

### 2. `modules/<NN>-<title>/`

Por cada módulo:
- `README.md`: objetivos del módulo, qué se construye
- `lessons/<NN>-<title>.md`: 3-5 lecciones, cada una con:
  - Objetivo de la lección
  - Concepto teórico (5-10 min lectura)
  - Walkthrough práctico paso-a-paso
  - "Try it yourself" exercise
  - Common pitfalls
- `resources/`: snippets de código, templates, links externos relevantes

GENERALIZAR el código del MVP: cambiar nombres específicos por placeholders
(ej. "your-niche-site.com" en lugar de "baristapath.com"), pero MOSTRAR el
caso real del MVP como case study a lo largo del curso para credibilidad.

### 3. `exercises/`

- `final-project.md`: descripción del proyecto que el alumno debe completar
- `checklist.md`: lista de criterios de "done" para el final project
- `templates/`: scaffold files que el alumno puede usar para arrancar

### 4. `market-research.md`

Investigar (vía WebSearch + WebFetch):
- Cursos competidores en el espacio (3-5 ejemplos, con URLs y pricing)
- Diferenciación del nuestro vs cada competidor
- Pricing recommendation con razonamiento (anchored en competidores + diferenciación)
- Tamaño estimado del mercado (lead indicators: search volume relacionado, communities size)
- Top objections esperadas de potenciales buyers (y cómo abordarlas en sales page)

### 5. `promotion-strategy.md`

Canales para promocionar este curso específico:

**Orgánicos (cero costo, alto tiempo)**:
- Twitter / X "build in public" threads (templates incluidos)
- LinkedIn posts (templates)
- Indie Hackers, Product Hunt, Hacker News post strategies
- Email list nurture (sequence de 4-6 emails pre-launch)
- Newsletter cross-promotions con creators del mismo espacio

**Paid (con cost estimates honestos)**:
- Twitter Ads ($300-1000 test budget mínimo)
- Reddit Ads en subreddits relevantes ($200-500)
- YouTube ads ($500-2000)
- Sponsorships en newsletters (más eficiente que ads): $200-2000 per sponsor con audience real
- Course platform feature placement (Teachable etc., usually free)

**Best routes for this niche specifically** (research-driven, no template):
- Identificar 3-5 communities, blogs, o creators donde está el target audience
- Sugerir partnership/cross-promo strategies concretas

### 6. `sample-lesson.md`

Una lección completa, polished, lista para usar como:
- Free preview en sales page
- Lead magnet (cambiar email por download)
- Demo del calidad para promo

### 7. `pricing-and-launch-plan.md`

- Pricing tier sugerido + razonamiento
- Launch sequence (week-by-week para 4-6 semanas pre + post launch)
- Pre-sell strategy a email list
- Discount strategy (founders pricing, early bird, etc.)
- Refund policy honest (no scammy 60-day refund — algo razonable como 14 días)
- Launch metrics a trackear (signups, conversion %, refund rate)

## Constraints técnicos

- Idioma del curso: inglés (audiencia US/global)
- Idioma de comments + commit: español
- Anti-gray-hat:
  - No prometer ingresos específicos ("make $10k/month") sin caveat masivo
  - Tiempo real ("este curso toma 30 días si dedicás 5h/semana"), no marketing time
  - Mostrar tu MVP REAL como case study (incluyendo dónde NO funcionó)
  - Refund policy genuina
- Sanitización: chequear que no copiaste:
  - API keys, tokens, passwords del MVP source
  - Información personal del operador
  - Business logic propietaria (generalizar SIEMPRE)
- Tono: pragmático, builder-oriented, no hype

## Después

1. Verificar todos los .md generados son válidos y compilables
2. `git pull --rebase origin claude/amazon-resale-project-t7o0P`
3. `git add courses/<course-slug>/`
4. Commit: `Course #N: <título corto> — material completo generado desde MVP <slug>`
5. Push

## Devolveme

Resumen 8-12 líneas:
- Curso slug + título final propuesto
- Cuántos módulos + lecciones generadas
- Pricing recomendado con razonamiento de 1 oración
- 3 canales de promoción top por ROI
- Top 2 competidores del market research + cómo nos diferenciamos
- Edge cases / decisiones difíciles tomadas
- Calidad subjetiva del material (vs estado MVP source): ¿está listo para launch o necesita más pulido humano?
- 1 sugerencia próxima iteración (e.g. agregar videos, workbook PDFs, community Slack/Discord)

---

## Notas operacionales

- Cada invocación toma 30-60 min de agent time (es una tarea grande)
- Iterar antes de scale: validar primer curso end-to-end ANTES de generar 10
- Revisar manualmente sanitización antes de hacer público
