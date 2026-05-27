# meta.md — coffee-affiliate-site

## Título del proyecto

**baristapath.com** — sitio afiliado de reviews de equipo de café (espresso machines, grinders, pour-over brewers).

## Propósito en 1 oración

Construir un activo de revenue pasivo basado en SEO programático + Amazon Associates, optimizado para el modelo "comparison shopping" en el nicho de café para casa.

## Audiencia target del MVP original

- **Audiencia del sitio** (lectores): hobbyistas/aspirantes a barista en casa, presupuesto $200-$2,000, fase "research antes de comprar". Mayoritariamente USA por el affiliate program.
- **Operador del MVP** (vos, andres.borrerom): data scientist, perfil técnico fuerte, sin background editorial previo en café, tiempo disponible 1-3 horas/semana, ambición clara hacia portfolio de afiliados como vehículo de revenue.

## Tiempo total invertido en construirlo

**~3 semanas calendario** (2026-05-13 → en curso 2026-05-25). Distribución aproximada:

- Investigación + decisiones estratégicas (ADRs 0001-0005): ~5 horas operador.
- Construcción (código, contenido, agentes despachados): ~30 sesiones de conversación con Claude. Tiempo total operador: ~15-20 horas.
- Setup externo (dominio, Associates, Search Console, MailerLite): ~3 horas operador.
- **Total operador**: ~25 horas en 3 semanas. Claude+agentes hicieron el grueso heavy-lifting.

## Estado actual

**Ready for traffic, pre-revenue.** Sitio en producción con 268 páginas, Amazon Associates activo (tag `baristapath79-20`), schema válido (Merchant Listing alerts resueltos), email capture funcional via MailerLite. **Falta**: tráfico (zero hoy), analytics (sin configurar), backlinks (cero).

## Lo que querés que el curso ENSEÑE

**El curso NO enseña "cómo escribir 268 páginas sobre café". Enseña el meta-proceso para construir un activo afiliado defensible usando AI como co-pilot.**

### Estructura propuesta — 7 capítulos

La estructura del curso emerge directamente de los 7 capítulos temáticos identificados en `interactions-log.md`. Cada capítulo contiene 1-7 entries de interacciones reales operador↔Claude que sirven como casos de estudio.

1. **Capítulo 1 — Elegir nicho con data (no con corazonadas)**: KGR validation, allintitle, Ubersuggest, design benchmark research. Threshold-based decision making. El ejercicio inicial del curso: probar que el nicho preferido del estudiante NO es necesariamente el mejor.

2. **Capítulo 2 — Stack técnico mínimo viable**: Astro + Cloudflare Pages + Cloudflare Registrar at-cost. Por qué NO WordPress (a menos que vos seas no-técnico — entonces versión paralela). Filosofía at-cost desde la primera compra como alineación con el modelo.

3. **Capítulo 3 — Construir confianza editorial sin background editorial**: design benchmark via agentes, robots.txt FLIPPED solo cuando hay masa crítica + señales de E-E-A-T, polish visual basado en diagnóstico (no en síntomas), byline real con foto + methodology transparente.

4. **Capítulo 4 — Anti-gray-hat como ventaja competitiva**: no self-purchase (ban automático), no fake reviews, no hot-linking de Amazon, schema honesty (somos affiliate, no merchant). El principio de "honest restraint" como marca defensible.

5. **Capítulo 5 — Activos pre-revenue (Associates, email, audiencia)**: Amazon Associates 180-day clock, lead magnet con email capture, pivots de proveedor cuando free tier cambia (ConvertKit → MailerLite). Construir activos cuando no hay revenue todavía.

6. **Capítulo 6 — Mantenimiento y seguimiento (sugerido por el operador)**: el cap más denso. Observability (CF Web Analytics + GSC + Amazon Associates dashboard + MailerLite), weekly review cadence con template, thresholds calibrados, secrets hygiene, multi-device validation, technical debt accounting. **El gap entre "infraestructura ready" y "revenue arriving" suele ser meses — este capítulo enseña qué hacer en ese gap sin perder dirección.**

7. **Capítulo 7 — Escalado y replicación**: cuándo abstraer vs cuándo duplicar (regla de los 3 nichos), monorepo affiliate/, SCAFFOLD cross-niche, replicación de patterns validados, courses business como meta-vehicle.

### Cómo se vinculan capítulos a entries del log

Cada entry en `interactions-log.md` está mapeada al capítulo correspondiente (ver "Índice por capítulos del curso" al final del log). El agente generador de cursos (`courses-source/AGENT_PROMPT.md`) usa este mapeo para producir el material de cada lección con casos reales.

## Lo que NO querés que se duplique

- **Identidad personal**: el byline "Andres Borrero", la bio "data scientist relocated from Colombia", el email `andres.borrerom@gmail.com`. Esos son específicos del operador.
- **Dominio y branding**: `baristapath.com`, paleta naranja, tipografía serif. Esos son resultado de elecciones específicas, no parte del método.
- **Decisión específica de nicho**: el curso NO debe sugerir "vendé equipo de café también". Debe enseñar el FRAMEWORK que llevó a esa decisión.
- **ASINs y review content específicos**: las 268 páginas con product specs reales son propiedad editorial de este sitio. El curso enseña el patrón de scaling, no copia el catálogo.
- **Métricas financieras reales** (cuando existan): revenue, costos, ROI. El curso usa rangos genéricos.
- **Información de cuentas**: nombres de Stripe/Payoneer, números de tarjeta, screenshots de paneles privados.

## Materiales fuente disponibles en este repo

- `affiliate/baristapath/` — el sitio mismo (código + content + docs)
- `affiliate/baristapath/docs/decisions/` — ADRs 0001-0005 con el razonamiento de cada decisión estratégica
- `affiliate/baristapath/docs/email-strategy.md`, `glosario.md`, `methodology.md`, `deployment-to-revenue.md` — playbooks operacionales
- `affiliate/baristapath/ops/alerts-log.md` — registro de alertas externas (GSC, CF, Amazon) + cómo se manejaron
- `affiliate/baristapath/progreso.md` — el journal cronológico del proyecto desde día 0
- `affiliate/courses-source/coffee-affiliate-site/interactions-log.md` — **el log de interacciones clave operador↔Claude, retroactivo y ongoing**. Es la materia prima más valiosa del curso porque captura el razonamiento, no solo el resultado.
- `affiliate/SCAFFOLD.md` + `affiliate/CLAUDE.md` — protocolos cross-niche que emergieron al construir un 2do vertical en paralelo (filamentpath, 3D printing).
