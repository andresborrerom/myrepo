# Progreso y tiempos estimados

> **Última actualización:** 2026-05-13
>
> Esta es la fuente de verdad del timing del proyecto. Claude lee este
> archivo al inicio de cada sesión y reporta al operador el estado
> actualizado. Toda revisión de tiempos se commitea acá con razón.

---

## Estado actual

### Hitos cumplidos

- ✅ ADR 0001 — estructura del repo + flujo de trabajo
- ✅ ADR 0002 — modelo: SEO programático + Amazon Associates
- ✅ ADR 0003 — vertical inicial: coffee equipment
- ✅ ADR 0004 — stack técnico: Astro + Cloudflare Pages + SQLite-in-repo + Keepa (mes 2+) + Cloudflare Web Analytics
- ✅ Research consolidado: shortlist verticales (`market/niches/shortlist.md`), Associates desde Panamá (`research/amazon-associates-from-panama.md`), recepción de pagos (`research/payment-receivers-panama.md`)
- ✅ CLAUDE.md con protocolos (decisión, anti-gray-hat, delegación a agentes, stop loss, inicio de sesión)
- ✅ Glosario de siglas del proyecto
- ✅ **Site bootstrap Astro 5** (commit 6749a74): 51 productos mock, 64 páginas (home + 51 product + 6 best-of + 6 compare), build local exitoso 1.92s, Schema.org JSON-LD completo. Vive en `amazon-resale-project/site/`, se migra a repo separado al elegir dominio.
- ✅ **Site deployado a Cloudflare Pages** (URL `myrepo-e68.pages.dev`): build CF green, /privacy + /about agregadas, app-icon.png generado, todas las páginas sirven OK.
- ✅ **Pinterest developer app submitted** (Trial API automático, Standard API pendiente review humano 1-3 semanas).
- ✅ **Validaciones nicho coffee VERDE**: issue #20 (volúmenes Ubersuggest, 15 keywords) y #21 (allintitle KGR, 12 long-tails) confirman volumen real + patrón KGR funcionando. Estrategia para escalar a 500-1000 páginas validada.
- ✅ **Dominio registrado**: `baristapath.com` (Cloudflare Registrar, ~$10.46/año, auto-renew). Astro config + privacy/about emails actualizados al nuevo dominio.

### Próximo hito objetivo

**Sitio publicado con 100 páginas mock indexadas — meta 2026-06-13 (fin mes 1).**

### Bloqueadores activos

- Validaciones de nicho pendientes del operador: #19 (comisión Kitchen, espera tener Associates), **#20 (volúmenes Ubersuggest, ≈30 min)**, **#21 (allintitle KGR, ≈15 min)**. Sin estas dos no escalamos contenido más allá del esqueleto actual.
- Pinterest Standard API: submitted, review humano 1-3 semanas. No bloquea construcción.

---

## Cronograma actualizado

| Mes (desde 2026-05-13) | Hito clave | Confianza |
|---|---|---|
| Mes 0 — esta semana | Validaciones manuales operador (#20, #21, Pinterest app) | Alta — depende del operador |
| Mes 1 — jun 2026 | Sitio publicado, ≥100 páginas mock indexadas, deploy CF Pages | Alta si validaciones pasan en verde |
| Mes 2 — jul 2026 | Suscripción Keepa, pull 500-1000 productos, ≥500 páginas reales | Media-alta |
| Mes 3 — ago 2026 | Aplicar Amazon Associates US, abrir Payoneer, ≥1000 impresiones/día | Media |
| Mes 4 — sep 2026 | Associates aprobada (depende de Amazon), primer revenue ($1-50) | Media |
| Mes 5 — oct 2026 | $50-200/mes, contador panameño antes de fin de mes | Media-baja |
| Mes 6 — nov 2026 | $200-500/mes, revisión 90 días ADR 0003, decisión pivot/continuar | Media-baja |

Targets de mes 5-6 son la mitad superior del rango realista. La mitad
inferior es "nicho no funcionó, pivot a outdoor cooking en mes 6
reutilizando infra".

---

## Tiempo total estimado del operador

**~8 horas distribuidas en 6 meses.** Bloques:

| Bloque | Cuándo | Tiempo | Estado |
|---|---|---|---|
| A — esta semana | 2026-05-13 a 2026-05-20 | 75 min | Pendiente |
| B — mes 1 | jun 2026 | 30 min | Futuro |
| C — mes 2 | jul 2026 | 30 min | Futuro |
| D — mes 3 | ago 2026 | 2-3 h | Futuro |
| E — mes 4 | sep 2026 | 30 min | Futuro |
| F — antes mes 6 | oct 2026 | 1-2 h | Futuro |

Detalle de cada tarea en `docs/tareas-operador.md` y en el PDF derivado.

---

## Tiempo de Claude / agentes

Trabajo de Claude depende de cadencia de conversación con operador.
Trabajo de agentes en cron de GitHub Actions corre 24/7 una vez activado.

**Próximos pasos sin esperar operador:**

1. ~~Esqueleto Astro inicial con 3 templates~~ ✅ hecho (commit 6749a74).
2. ~~50-100 ASINs mock~~ ✅ 51 productos mock cargados.
3. **Pendiente**: 404 page + robots.txt + `npm audit fix`.
4. **Pendiente**: deploy a Cloudflare Pages a una URL `.pages.dev` temporal (no submitir a Search Console hasta tener dominio real + validaciones verdes).
5. **Pendiente**: agente de research para shortlist de dominios candidatos (se puede correr mientras esperamos #20/#21).
6. **Bloqueado por operador**: si #20 y #21 vienen verdes, picking de dominio + deploy + replace de placeholders (affiliate tag, canonicals, CF Web Analytics token).

---

## Historial de revisiones

| Fecha | Cambio | Razón |
|---|---|---|
| 2026-05-13 | Versión inicial del cronograma | Tras aceptación ADR 0004 con tweaks |
| 2026-05-13 | Aplicación Associates movida mes 1 → mes 3 | Regla 180 días / 3 ventas (research #16) |
| 2026-05-13 | Keepa diferida mes 1 → mes 2 | Tweak 1 ADR 0004; ahorra $76 y valida stack primero |
| 2026-05-13 | Pinterest app promovida a bloque A (esta semana) | Tweak 3 ADR 0004; aprobación tarda 1-3 semanas |
| 2026-05-13 | Site bootstrap Astro completado (commit 6749a74) | Agente terminó esqueleto + 51 productos mock + build green |
| 2026-05-13 | Site deployado a Cloudflare Pages (myrepo-e68.pages.dev) | Operador completó flujo Cloudflare; site live con /privacy, /about, 404, app-icon |
| 2026-05-13 | Pinterest developer app submitted (Trial) | Operador completó form; Standard API pending 1-3 semanas |
| 2026-05-14 | Validaciones nicho VERDE (#20, #21) | Confirmado volumen + KGR funcional en coffee equipment |
| 2026-05-14 | Dominio baristapath.com registrado | Pendiente: connect como custom domain en CF Pages |
