# Alerts log — baristapath

Registro de alertas externas recibidas (Search Console, Cloudflare, Amazon,
proveedores) + cómo se manejaron. El operador me forwardea las críticas
cuando llegan; yo diagnostico, propongo fix y dejo entrada acá.

A futuro automatizamos via Search Console API + GitHub Actions cron. Por
ahora es manual con este log como source of truth.

## Formato

```
## YYYY-MM-DD — <Fuente> — <Asunto corto>

**Mensaje recibido** (resumen):
- ...

**Diagnóstico**:
- ...

**Fix aplicado**:
- Commit: `<sha>` — descripción
- Archivos: ...

**Pendiente**:
- ...
```

---

## 2026-05-24 — Google Search Console — Datos estructurados de Fichas de comerciantes (Merchant Listings)

**Mensaje recibido**:
- 5 problemas en `https://baristapath.com/`.
- 1 crítico: falta `image`.
- 4 no críticos: faltan `hasMerchantReturnPolicy` (en offers), `shippingDetails` (en offers), `description`, `availability` (en offers).
- Asunto del email: "Se detectaron Datos estructurados de Fichas de comerciantes problemas".

**Diagnóstico**:
- Los templates de producto emitían `Product` schema con bloque `offers`
  (precio, availability). Eso le decía a Google "soy merchant" y disparaba
  Merchant Listing rich result, que requiere campos del vendedor real
  (shipping policy, return policy, foto del producto).
- Nosotros NO somos merchant — Amazon es el vendedor. No podemos honestly
  completar esos campos (anti-gray-hat).

**Fix aplicado**:
- Eliminado el bloque `offers` de los 6 templates que emitían Product schema:
  - `src/pages/products/[asin].astro`
  - `src/pages/review/[slug].astro` (también: eliminado productSchema entero — itemReviewed dentro de reviewSchema ya describe el Product)
  - `src/pages/best/[slug].astro`
  - `src/pages/categories/[slug].astro`
  - `src/pages/brands/[slug].astro`
  - `src/pages/compare/[slug].astro`
- Sin Offer, Google ya no trata las páginas como merchant listings y los
  requisitos no aplican. El affiliate link sigue intacto en el HTML
  (componente AffiliateButton) — no necesita estar en JSON-LD.
- WebApplication schemas en quiz/calculator con `price: 0` NO se tocaron
  (son válidos para apps gratuitas, no triggerean Merchant Listing).

**Pendiente**:
- En Search Console: marcar el issue como resuelto y pedir re-validación
  después del próximo crawl (CF auto-deploya post-push, sitemap se regenera).
- Re-validación toma 24-48h. Si reaparece el mismo issue, escalar.

---

## 2026-05-24 — Google Search Console — Datos estructurados de Fragmentos de productos (Product Snippets)

**Mensaje recibido**:
- 3 problemas no críticos en `https://baristapath.com/`.
- Faltan `review`, `aggregateRating`, `availability` (en offers).
- Asunto del email: "Se detectaron Datos estructurados de Fragmentos de productos problemas".

**Diagnóstico**:
- Mismo origen que la alerta anterior. Product schema con Offer triggereaba
  Product Snippet rich result que pide review o aggregateRating para mostrar
  estrellas en SERP.
- Tres opciones evaluadas:
  - (a) Agregar `aggregateRating` con valor fake — VIOLACIÓN anti-gray-hat.
  - (b) Crear sistema de rating numérico per product y agregarlo al schema —
    requiere editorial pass de 72 productos. Backlog.
  - (c) Drop Offer (también resuelve esta alerta porque sin merchant
    listing no aplica el "availability" warning, y "review/aggregateRating"
    pasa a ser solo recomendación, no warning).
- Elegida (c). Las `/review/[slug]` pages YA tienen un reviewSchema
  completo con rating real (`page.rating` editorial) — para esas 37 URLs
  Google ya tiene la data que necesita.

**Fix aplicado**:
- Mismo commit que la alerta anterior (un solo fix resuelve las dos).

**Pendiente**:
- Idem: re-validación post-crawl.
- Opcional futuro: agregar sistema de scoring numérico per producto al
  data model + render. Lift medio. Trigger: solo si decidimos que el
  Product Snippet rich result con estrellas mueve la aguja de CTR.

---
