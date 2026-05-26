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

**El curso NO enseña "cómo escribir 268 páginas sobre café". Enseña el meta-proceso:**

1. **Cómo elegir nicho con data (no con corazonadas)**: KGR validation, allintitle, Ubersuggest, design benchmark research. Threshold-based decision making.
2. **Cómo trabajar con AI como co-pilot**, no como subcontratista barato: protocolo "Claude recomienda, operador decide" para no perder agency. Cuándo delegar a agentes vs cuándo decidir vos.
3. **Anti-gray-hat como ventaja competitiva, no restricción**: el principio de "honest restraint" (no fake reviews, no hot-link de Amazon, no inventar credenciales) baja la velocidad short-term pero construye marca defensible.
4. **Infraestructura mínima viable**: Astro + Cloudflare Pages + Amazon Associates + email provider gratis. Stack que escala a 0-$1,000/mes sin migrar nada.
5. **Cuándo abstraer vs cuándo duplicar**: la decisión "no creamos componente compartido hasta 3 nichos sufran la duplicación" — pattern crítico para no over-engineer.
6. **Pivots como herramienta, no fracaso**: la migración ConvertKit→MailerLite mid-sprint cuando el primer provider movió features a pago. Cómo decidir y ejecutar un pivot sin perder velocidad.
7. **Estructura editorial sin background editorial**: byline real, methodology page transparente, scoring honesto. Cómo proyectar autoridad cuando no la tenés todavía.
8. **El reloj de Amazon Associates (3 sales / 180 días)**: el gate REAL del negocio. Cómo trackearlo y qué hacer cuando estás 60 días en y sin sales.

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
