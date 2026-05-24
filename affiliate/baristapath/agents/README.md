# Agentes — capa de automatización

Objetivo: que el negocio corra lo más cerca posible de 24/7 sin requerir
intervención humana, y que el operador reciba un resumen de qué pasó.

## Stack

- **Runtime planeado** para agentes cron: GitHub Actions (gratuito hasta
  2,000 min/mes en repo privado, ilimitado en repo público).
- **Modelo**: Claude (vía Anthropic API).
- **Outputs**: commits a este repo + issues + (futuro) notificaciones
  Telegram / email.

## Agentes ejecutados durante development (one-shot, 2026-05-13 a 17)

Estos no son agentes cron — son ejecuciones puntuales que escalaron
contenido y arquitectura durante el build inicial. Documentados acá
para audit log.

| Fecha | Agente | Output |
|---|---|---|
| 2026-05-13 | Niche shortlist research | `market/niches/shortlist.md` con 13 verticales evaluados |
| 2026-05-13 | Associates desde Panamá research | `research/amazon-associates-from-panama.md` |
| 2026-05-13 | Payment receivers research | `research/payment-receivers-panama.md` |
| 2026-05-13 | Site bootstrap (Astro skeleton + 51 mocks + 3 templates) | 64 páginas iniciales |
| 2026-05-13 | Domain shortlist research | `research/domain-shortlist.md` |
| 2026-05-13 | Stack técnico ADR (#18) | `docs/decisions/0004-stack-tecnico.md` |
| 2026-05-14 | Scale content batch 2 (best-of + compare) | +41 páginas (108 total) |
| 2026-05-14 | Scale batch 3a accessories + best-of | +13 accessories + 9 best-of |
| 2026-05-14 | Scale batch 3b review template + 22 pages | +22 review pages |
| 2026-05-15 | Internal linking pass | Related content en 4 templates |
| 2026-05-15 | Design benchmark research | `research/design-benchmark.md` |
| 2026-05-15 | UX batch A (verdict box, CTA, byline, etc.) | 6 cambios template + 4 nuevos componentes |
| 2026-05-15 | Compare collapse | Differentiator rows + collapsable common |
| 2026-05-15 | Calculator cost-per-cup | `/tools/cost-per-cup-calculator/` |
| 2026-05-15 | Quiz "which espresso machine" | `/quiz/which-espresso-machine/` |
| 2026-05-15 | Home redesign | 7 secciones, 19 internal links |
| 2026-05-15 | Search page con Fuse.js | `/search/` |
| 2026-05-15 | Quiz snapshot tests | 9 tests, CI integration |
| 2026-05-15 | Search filter pills + Calculator v2 shareable URL | UX polish |
| 2026-05-17 | Brand pages | 13 brand + 1 index |
| 2026-05-17 | Category pages | 4 category buying guides + 1 index |
| 2026-05-17 | Glossary page (55 términos) | `/glossary/` |
| 2026-05-17 | Autolink glossary post-build | Script + 1029 links iniciales |
| 2026-05-17 | Accessory reviews (15) | +15 review pages |
| 2026-05-17 | How-to + troubleshoot vein | 2 templates + 24 pages + index |
| 2026-05-17 | Per-term glossary (tier 1) | 12 dedicated pages |
| 2026-05-17 | Per-term glossary (tier 2) | 8 dedicated pages |
| 2026-05-17 | Inline CTAs product → owner help | 41/64 product pages con CTA |

## Agentes cron planeados (no implementados aún)

| Agente | Cadence | Output | Estado |
|---|---|---|---|
| `pin-publisher` | Diario | Pinterest pins desde new content | Bloqueado por Pinterest Standard API approval |
| `keepa-sync` | Diario | Refresh precios + BSR de productos catalog | Bloqueado por suscripción Keepa (mes 2) |
| `search-console-monitor` | Semanal | Alert si pages indexed o impresiones bajan | Bloqueado por traffic real (post-indexing) |
| `pnl-tracker` | Diario | `finance/pnl/YYYY-MM-DD.json` con revenue Amazon | Bloqueado por Associates approval |
| `competitor-tracker` | Diario | Cambios de precio/stock en productos competidores | Bloqueado por elegir competidores específicos |
| `freshness-flagger` | Semanal | Lista de pages con last-updated >90 días | Implementable ahora; valor crece con traffic |

## Principios de diseño

1. **Cada agente escribe a un path predecible**. Operador puede ver
   desde móvil qué corrió y qué encontró.
2. **Idempotencia**: el mismo input produce el mismo output (cache /
   hashes cuando aplica).
3. **Fail loud**: si un agente falla, abre un issue con el error.
4. **Budgets**: cada agente tiene cap de tokens / llamadas. Visible
   en su config.
5. **Audit log**: cada corrida produce un commit. Historial git = audit log.

## Próximos pasos

1. **`freshness-flagger`** es el primer agente cron implementable sin
   bloqueos. Útil para mantener content fresh (Google likes update).
2. Una vez Pinterest Standard API approve: `pin-publisher` priority alto.
3. Una vez Associates approve + Keepa subscribe: `pnl-tracker` y
   `keepa-sync`.

## Cómo activar el primer cron agent

1. Crear `agents/<agent-name>/` con `run.mjs` + `config.yml`
2. Configurar `ANTHROPIC_API_KEY` como GitHub Actions Secret
3. Crear workflow en `.github/workflows/agent-<name>.yml` con cron schedule
4. Test localmente primero, después activar el schedule
