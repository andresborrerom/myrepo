# courses-source/

Carpeta para que el operador deposite los MVPs (Minimum Viable Products) que
ha construido con Claude. El agente de generación de cursos lee esta carpeta
para producir material listo-para-launch en `courses/`.

## Cómo agregar un nuevo MVP

1. Crear subcarpeta nueva: `courses-source/<slug-del-proyecto>/`
2. Copiar dentro los archivos relevantes del MVP:
   - Código fuente (sanitizado de secretos, API keys, datos personales)
   - README explicando qué hace el MVP
   - Cualquier doc de decisiones, ADRs, runbooks que escribiste durante el build
   - Screenshots o evidencias del producto funcionando (opcional pero ayuda)
3. Agregar un `meta.md` en la subcarpeta con:
   - Título del proyecto
   - Propósito en 1 oración
   - Audiencia target del MVP original (para entender el "user journey")
   - Tiempo total invertido en construirlo
   - ¿Está vivo / en uso / archived?
   - Lo que querés que el curso ENSEÑE (la palanca metodológica, no la idea específica)
   - Lo que NO querés que se duplique (info sensible, business logic propio)

## Convenciones de nombre

Slug del proyecto: kebab-case, descriptivo y genérico:
- ✅ `presencial-course-builder` (no `mi-curso-de-yoga`)
- ✅ `gift-website-generator` (no `regalo-aniversario-jose`)
- ✅ `investment-recommender` (no `mi-portfolio-bbva`)
- ✅ `coffee-affiliate-site` (este proyecto)

## Sanitización

Antes de copiar a `courses-source/`, asegurate de remover:

- API keys, tokens, passwords (incluso en commits viejos — usá `git filter-branch` si están en historial)
- Datos personales (emails de clientes, números de teléfono, direcciones)
- Business logic propietaria que no querés que otros copien
- Información financiera (revenue real, ad spend, etc.)

El agente genera contenido GENERALIZADO: enseña el HOW, no el WHAT específico tuyo.

## Cómo se invoca el agente

Ver `AGENT_PROMPT.md` en esta misma carpeta. El prompt está diseñado para
dispatch via Claude Code Agent tool. Cada vez que agregás un MVP nuevo,
podés re-invocar el agente para generar curso correspondiente.

## Output esperado

Cada invocación del agente genera/actualiza una carpeta en `courses/<course-slug>/`
con:

- `syllabus.md` — temario completo del curso
- `modules/` — contenido por módulo
- `exercises/` — workbooks para estudiantes
- `market-research.md` — análisis competitivo + pricing recomendado
- `promotion-strategy.md` — canales para promocionar el curso (orgánicos + paid)
- `sample-lesson.md` — 1 lección completa de ejemplo para usar en marketing

## Estado actual

| MVP | Status | Curso generado | Notas |
|---|---|---|---|
| `coffee-affiliate-site/` | Ready (este proyecto) | Pendiente | Source material completo en este repo |

Empezar populando 2-3 MVPs antes de dispatch. Validar el flow del agente
en el primero (`coffee-affiliate-site/`) que ya está documentado.
