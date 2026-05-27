# North Star — filamentpath

> Última actualización: 2026-05-26

Este file es el espejo cross-niche del north-star del portfolio. Para
filamentpath específicamente, captura: por qué este nicho, qué buscamos
sacar de él, y qué señales nos dicen que sirve o no.

## Por qué 3D printing FDM

ADR 0005 (`affiliate/baristapath/docs/decisions/0005-segundo-nicho-3d-printing.md`)
captura el razonamiento completo. Resumen:

- Mercado en crecimiento sostenido (3DPI / consumer makers).
- Audiencia con disposición a investigar antes de comprar (alto
  share de search por queries comparativos / specs).
- Producto físico real con specs verificables — encaja con el
  framing de "specs-led editorial" de baristapath.
- Bajo solapamiento con espresso → cero risk de canibalización de
  authority del primer nicho.
- Operador puede comprar un printer (Bambu A1 mini, ~$249) en junio
  2026 para tener first-party content disponible week 1.

## KPIs específicos

Mismos KPIs que el cross-portfolio, pero con thresholds calibrados al
nicho:

- **Cashflow mensual neto** por filamentpath: target $0 → $300/mes
  en 6 meses post-launch.
- **ROI sobre capital invertido**: capital inicial del nicho es
  bajo (~$25 dominio + opcional ~$250 printer si se justifica con
  evidencia). ROI breakeven en <6 meses si KGR verde.
- **Tráfico orgánico**: 0 → 1000 sessions/mes en 4 meses, 5000+
  en 12 meses.
- **Conversion**: tracked vía Amazon Associates reports. Target
  1-3% click-through-rate inicial, mejorable.

## Hitos calibrados

- **Mes 0 (ya cumplido)**: ADR 0005 aprobada, dominio registrado,
  meta.md creado.
- **Mes 0-1 (Sub-sprint 1, en progreso 2026-05-26)**: scaffold del
  sitio, 12 mock products, methodology + glossary 3D printing.
- **Mes 1 (Sub-sprint 2)**: KGR validations en 10-20 queries
  3D printing top. Si verde → Sub-sprint 3; si rojo → freeze.
- **Mes 1-3 (Sub-sprint 3, condicional a KGR verde)**: content
  scale a 30-50 products, 10 best-of, 10 compare, glosario público.
- **Mes 3-6**: first-party reviews del Bambu A1 mini (post-compra
  operador). Marketing orgánico inicial.
- **Mes 6**: revisión de KPIs vs threshold. Decisión de continuar
  expandiendo a resin SLA / MSLA o quedarse FDM-first.

## Decisión-criterion para freeze

filamentpath se freeze (no más content scale) si en **mes 3 post-launch**:

- Tráfico orgánico < 200 sessions/mes.
- Y/o no hay click-throughs a Amazon links.
- Y/o KGR rojo en queries seed pasó los 10 intentos sin verde.

Freeze NO es kill: el dominio y el contenido permanecen, simplemente
no escalamos. Si el nicho 3 toma off, filamentpath puede ser
re-activado a costo bajo.

## Decisión-criterion para expandir

Si en mes 6 post-launch:

- $200+ MRR de Associates.
- Tráfico >5000 sessions/mes.
- Operador ha publicado >3 first-party reviews.

→ Considerar expansión a resin (con safety overhead) y/o lead
magnet específico del nicho ("Filament starter guide PDF").

## Relación con baristapath

Cross-portfolio (no jerárquico):

- Mismo operador, misma stack técnica, mismo brand voice (data-led,
  no clickbait), misma anti-gray-hat policy.
- Distintas audiencias, distintos products, distinta methodology
  detail.
- Si algún componente probado en baristapath se vuelve genéricamente
  útil (e.g. EmailSignup component, autolink-glossary script),
  considerar abstraerlo a `affiliate/scaffold/` cuando haya 3+
  nichos sufriendo la duplicación.
