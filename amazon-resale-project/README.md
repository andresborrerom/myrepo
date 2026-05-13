# Amazon Resale Project

Proyecto para construir un negocio de e-commerce (Amazon y/o plataformas
adyacentes como Shopify, KDP, POD, afiliados) operado desde Panamá, con
fuerte uso de IA y agentes autónomos.

## Quién opera esto

- Matemático / data scientist, primer negocio online.
- Residente reciente en Panamá. Operación lo más remota y autónoma posible.
- Cero presencia en redes sociales propias — el marketing tendrá que ser
  SEO/SEM, email, o canales pagados, no influencer personal.
- Trabajo coordinado vía este repo + GitHub Issues + Claude Code, desde
  desktop y móvil indistintamente.

## Principios

1. **Riesgo bajo primero.** Empezamos por modelos sin inventario o con
   inventario mínimo. Escalamos cuando los unit economics estén probados.
2. **Cumplir Terms of Service.** Cero tácticas grises (reseñas falsas,
   manipulación de ranking, hijacking). La suspensión de cuenta es el
   riesgo #1 que mata negocios FBA.
3. **Decisiones basadas en datos.** Cada elección de nicho/producto/precio
   tiene un análisis cuantitativo detrás (volumen, competencia, márgenes),
   no intuición.
4. **Documentar todo.** Cada decisión importante = un ADR en
   `docs/decisions/`. Cada aprendizaje = nota en `research/`. El repo es
   la memoria del negocio.
5. **Automatizar antes de escalar.** Si un proceso se va a repetir > 3
   veces, se convierte en agente o script.

## Estructura

- `docs/` — visión, KPIs, registro de decisiones (ADRs), playbooks.
- `research/` — fuentes curadas, notas de pódcasts/cursos/libros, casos
  reales (éxitos y fracasos), síntesis.
- `market/` — análisis de nichos y productos candidatos.
- `ops/` — legal, fiscal, proveedores, logística.
- `finance/` — modelos de unit economics, P&L, pricing.
- `agents/` — capa de automatización (GitHub Actions + Claude).

## Flujo de trabajo

- **Tareas y preguntas abiertas → GitHub Issues**, etiquetadas por dominio.
- **Decisiones no triviales → ADR** en `docs/decisions/NNNN-titulo.md`.
- **Outputs de agentes → commits** a paths predecibles
  (`research/digests/`, `market/scans/`, `finance/pnl/`).
- **Secretos (API keys, etc.) → GitHub Actions Secrets**, nunca al repo.

## Estado

Fase 0 — investigación y arquitectura. Sin productos seleccionados aún,
sin cuenta de Amazon Seller, sin estructura legal definida.
