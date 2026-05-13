# Agentes — capa de automatización

Objetivo: que el negocio corra lo más cerca posible de 24/7 sin
requerir intervención humana, y que el operador reciba un resumen
diario/semanal de qué pasó.

## Stack

- **Runtime**: GitHub Actions (gratuito hasta 2,000 min/mes en repo
  privado, ilimitado en repo público).
- **Modelo**: Claude (vía Anthropic API). Default: Claude Haiku 4.5 para
  tareas rutinarias por coste; Claude Sonnet 4.6 para análisis de
  mercado; Claude Opus 4.7 sólo para decisiones estratégicas.
- **Outputs**: commits a este repo + issues + (más adelante)
  notificaciones a Telegram / email.

## Agentes planificados

| Agente | Cadence | Output | Estado |
|---|---|---|---|
| `research-digest` | Diario | `research/digests/YYYY-MM-DD.md` con resumen de pódcasts / blogs / subreddits seguidos. | Pendiente — primer agente a montar |
| `niche-scanner` | Semanal | `market/scans/YYYY-WW.md` con top oportunidades según criterios (BSR, reviews, precio, peso). | Bloqueado por elegir modelo |
| `pnl-tracker` | Diario | `finance/pnl/YYYY-MM-DD.json` con ventas, ad spend, márgenes. | Bloqueado por tener tienda |
| `inbox-watcher` | Cada 2h | Issue nuevo por mensaje de comprador o reseña negativa. | Bloqueado por tener tienda |
| `competitor-tracker` | Diario | Cambios de precio / stock / reseñas de competidores priorizados. | Bloqueado por elegir productos |

## Principios de diseño

1. **Cada agente escribe a un path predecible**. El operador puede ver
   desde móvil qué corrió y qué encontró.
2. **Idempotencia**: el mismo input produce el mismo output (cache /
   hashes cuando aplica).
3. **Fail loud**: si un agente falla, abre un issue con el error.
4. **Budgets**: cada agente tiene un cap de tokens / llamadas. Visible
   en `agents/<nombre>/config.yml`.
5. **Audit log**: cada corrida produce un commit. El historial git
   es el audit log.

## Próximos pasos

1. Implementar `research-digest` primero (no depende de tener tienda).
2. Decidir qué fuentes consume — depende de lo que quede en
   `research/sources.md` tras filtrar.
3. Configurar `ANTHROPIC_API_KEY` como GitHub Actions Secret.
