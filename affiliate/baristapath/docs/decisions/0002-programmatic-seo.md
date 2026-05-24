# ADR 0002 — Modelo de negocio inicial: site SEO programático + Amazon Associates

**Fecha:** 2026-05-13
**Estado:** Aceptada (revisión a los 90 días con datos en mano)

## Contexto

Operador con perfil data scientist, 15+ h/semana, capital inicial
$500–$2,000 (escalable a $2–10k si tracciona), persona natural Panamá,
sin US LLC ni Amazon Seller account, cero presencia en redes sociales,
stop loss $5,000.

Modelos considerados:

| Modelo | Estado | Por qué |
|---|---|---|
| Private Label FBA | Descartado | Capital insuficiente para MOQ + ads launch; lead time 60-90 días con proveedor chino; sin US LLC los payouts tienen fricción. Reabrir cuando otro modelo facture. |
| Wholesale FBA | Descartado | Requiere relaciones con marcas, distribuidores, autorización para vender. Requiere US LLC para muchas marcas. |
| Online / retail arbitrage | Descartado | Requiere prep center en US, sourcing manual, no escala con agentes. |
| Dropshipping Shopify | Descartado | Margen mínimo, ad spend pesado, saturado, calidad de proveedor incontrolable. |
| KDP low-content | Descartado | Saturado por spam AI 2024-2025, Amazon endureció reglas. |
| KDP libros técnicos serios | Side-bet futuro | Viable pero divide atención al inicio. |
| POD (Print on Demand) | Descartado | Ceiling bajo, requiere diseño creativo (no es fortaleza del operador). |
| **SEO programático + Amazon Associates** | **Elegido** | Ver razones abajo. |

## Decisión

Pista única al inicio: sitio de contenido SEO programático monetizado
con Amazon Associates, eventualmente diversificado a otros programas de
afiliados (Walmart, Skimlinks, programas directos del fabricante).

## Por qué encaja al operador

- **Apalanca skill data scientist**: pipeline de datos, generación
  programática, análisis de Search Console — exactamente nuestro campo.
- **Apalanca AI**: Claude redacta contenido desde datos reales, no
  desde imaginación; ventaja en throughput sostenible sobre
  competidores no técnicos.
- **No requiere redes sociales ni cara visible**: tráfico 100% search.
- **Capital bajo**: $300-500 los primeros 6 meses (dominio, hosting,
  Keepa API, dominios extras si diversificamos).
- **No requiere Amazon Seller account ni US LLC al inicio**: Amazon
  Associates pagable a cuenta panameña / Global66 (a verificar con
  Issue de operations).
- **Asset vendible**: sitios SEO maduros se venden 35-45x profit
  mensual en Empire Flippers / Motion Invest.
- **Compatible con agentes 24/7**: research, generación, rank-tracking
  y monitoring corren en GitHub Actions sin intervención.

## Criterios de éxito (compresión <6 meses)

| Mes | KPI mínimo aceptable |
|---|---|
| 1 | Sitio publicado, ≥100 páginas indexadas, Amazon Associates aprobada |
| 2 | ≥500 páginas indexadas, primer click orgánico, primer rank top 50 |
| 3 | ≥1000 impresiones/día en Search Console, primer revenue ($1–50) |
| 4 | $50–200/mes revenue, ≥3 keywords en top 10 |
| 5 | $200–500/mes |
| 6 | $500–1500/mes |

Son targets ambiciosos pero alcanzables con KGR + volumen + nicho bien
elegido. Si en mes 3 hay <$1 de revenue o <100 impresiones/día, pivot
de nicho.

## Condiciones de pivot

- Mes 3 sin tracción medible → cambio de vertical, no de estrategia.
- Mes 4 sin tracción → cuestionar estrategia (paid traffic,
  distribución fuera de search, etc.).
- Pérdida acumulada >$2,500 → revisión completa.
- Pérdida >$5,000 → stop loss según `CLAUDE.md`.

## Aceleradores para apuntar a revenue <6 meses

1. **KGR desde día 1**: keywords donde `allintitle < 10` y volumen
   50-250/mes. Rankean en 2-8 semanas en lugar de 4-9 meses.
2. **Volumen alto desde inicio**: 500-1000 páginas en mes 1-2 (no 50).
3. **Pinterest como segundo canal**: motor de búsqueda visual, indexa
   rápido, no requiere cara ni marca personal.
4. **Selección de vertical con filtros estrictos**: comisión Amazon
   ≥3%, precio promedio del producto ≥$50, DR promedio del top 10
   <40, volumen agregado ≥10k búsquedas/mes, estacionalidad acotada.
5. **Diversificación de programas de afiliados**: además de Amazon,
   programas directos donde aplique (mayor comisión).

## Lo que NO hacemos al inicio

- Comprar sitios web existentes (capital insuficiente).
- Pagar tráfico (Google Ads) hasta saber qué convierte.
- Optimización SEO técnica obsesiva antes de tener tráfico real.
- Múltiples nichos en paralelo antes de validar uno.
