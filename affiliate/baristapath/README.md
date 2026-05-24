# Amazon Resale Project

Proyecto de e-commerce / contenido afiliado operado desde Panamá, con
fuerte uso de IA y agentes autónomos. Estado actual: **sitio live en
`https://baristapath.com` con 236 páginas, indexable, esperando primer
crawl de Google**.

## Quién opera esto

- Matemático / data scientist, primer negocio online.
- Residente reciente en Panamá. Operación lo más remota y autónoma posible.
- Cero presencia en redes sociales propias — el marketing es SEO/SEM/email,
  no influencer personal.
- Trabajo coordinado vía este repo + GitHub Issues + Claude Code, desde
  desktop y móvil indistintamente.

## Estado actual (2026-05-17)

- **Modelo de negocio**: SEO programático + Amazon Associates afiliado
  (ADR 0002).
- **Vertical**: coffee equipment — espresso machines, grinders, brewers,
  accessories (ADR 0003).
- **Stack**: Astro 5 static + Cloudflare Pages + SQLite/JSON in repo +
  Keepa API (mes 2) + Cloudflare Web Analytics (ADR 0004).
- **Dominio**: `baristapath.com` (Cloudflare Registrar).
- **Sitio live**: 236 páginas indexable. robots.txt flipped 2026-05-17.
- **Validaciones nicho**: VERDE en volúmenes (issue #20) y KGR pattern
  (issue #21).
- **Pinterest developer app**: submitted, Trial pendiente review.
- **Amazon Associates**: pendiente aplicar (gate 5 del runbook).

## Principios

1. **Riesgo bajo primero.** Modelo sin inventario, validar unit economics
   antes de escalar.
2. **Cumplir ToS.** Cero tácticas grises. Anti-gray-hat estricto en cada
   pieza de contenido (verificado en docs/decisions, agentes, autolinks).
3. **Decisiones basadas en datos.** Volumen, competencia, márgenes —
   no intuición. KGR validado, comisiones a verificar in-platform.
4. **Documentar todo.** ADRs en `docs/decisions/`. Aprendizajes en
   `research/`. El repo es la memoria del negocio.
5. **Automatizar antes de escalar.** Agentes hacen el grueso del trabajo
   de generación de contenido; operador foca en credenciales y decisiones.

## Estructura

- `site/` — código del sitio Astro (eventualmente migrará a repo separado).
- `docs/` — visión, KPIs, ADRs, runbooks (`deployment-to-revenue.md`,
  `tareas-operador.md` con PDF derivado, `glosario.md`).
- `research/` — fuentes curadas, design benchmark, research específicos
  (Associates desde Panamá, recepción de pagos, shortlist niche, shortlist
  dominios, etc.).
- `market/` — `niches/shortlist.md` con análisis de verticales.
- `ops/` — `legal-tax.md` con preguntas abiertas legal/fiscal.
- `agents/` — runbook de capa autónoma (planeada vs ejecutada).
- `progreso.md` — fuente de verdad de timing y milestones. **Léase al
  inicio de cada sesión**.

## Flujo de trabajo

- **Tareas y preguntas abiertas → GitHub Issues**, etiquetadas por dominio.
- **Decisiones no triviales → ADR** en `docs/decisions/NNNN-titulo.md`.
- **Outputs de agentes → commits** + comments en issues.
- **Secrets (API keys, etc.) → GitHub Actions Secrets**, nunca al repo.
- **Branch principal**: `claude/amazon-resale-project-t7o0P`.

## Próximos hitos

Ver `docs/deployment-to-revenue.md` (runbook completo) y `progreso.md`
(timeline actualizado).

Gate actual: **Google Search Console submit** (operador, ~15 min) +
**Amazon Associates application** (operador, ~30 min). Una vez ambos
hechos, el timeline a primer revenue se mide en ~3-4 meses.
