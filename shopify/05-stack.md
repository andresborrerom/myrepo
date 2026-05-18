# 05 — Stack técnico

## Honestidad primero: ¿Shopify es la mejor opción para producto digital?

Para **producto físico**, Shopify es indiscutible.

Para **producto digital puro**, hay alternativas que pueden ser mejores. Antes de comprometerse con Shopify por el nombre, vale la pena evaluar:

| Caso | Mejor opción que Shopify | Por qué |
|---|---|---|
| Curso online | **Teachable / Podia / Kajabi** | Hechos para esto: video hosting, drip, certificados, comunidad incluida |
| SaaS / app web | **Stripe + app propia** | Shopify no soporta bien suscripciones a software con login |
| Plantillas / descargables baratos (<50 €) | **Gumroad / Lemon Squeezy** | Cero fricción, hechos para esto, fees competitivos |
| Plantillas / packs premium (>50 €) | **Shopify ✅** | Aquí sí, el carrito y el checkout pulido importan |
| Membresía + comunidad | **Skool / Circle / Mighty Networks** | Comunidad nativa, no la tiene Shopify |
| Servicio productizado high-ticket | **Shopify ✅ o landing custom + Stripe** | Checkout de confianza, valor de marca premium |

**Si el producto elegido es A (curso), B (SaaS) o E (membresía), Shopify probablemente NO es lo correcto.**
Si es C (plantillas premium) o D (servicio high-ticket), Shopify sí.

Esta decisión se cierra cuando se cierre `02-producto-nicho.md`.

## Asumiendo que sí es Shopify

### Plan Shopify
- **Shopify Basic (29 €/mes)** para arrancar. Suficiente para los primeros 12 meses.
- Subir a Shopify (79 €) o Advanced (299 €) solo cuando los **2.9% fees marginales sobre las ventas adicionales** justifiquen el coste fijo extra (cuenta sencilla con la diferencia de fees).

### Tema
- **Dawn** (gratis, oficial de Shopify) como base. Bien optimizado, mobile-first.
- Customización CSS / Liquid en lugar de comprar tema premium. Solo invertir en tema premium si el branding lo justifica.
- Si el producto es muy custom (config builder, calculadora, demo interactiva), considerar **Hydrogen** (headless con React/Next.js) — encaja bien con lo que ya sabemos.

### Apps imprescindibles (digital products)
- **SendOwl** o **Digital Downloads** (oficial Shopify) — entrega del archivo tras compra.
- **Klaviyo** o **Omnisend** — email marketing (carritos abandonados, post-venta, secuencias).
- **Loox** o **Judge.me** — reseñas con foto.
- **Hotjar** — heatmaps del checkout y landing.

Coste total apps: ~50-150 €/mes. Auditar cada 3 meses, cortar las que no aportan.

### Pasarela
- **Shopify Payments** si la entidad legal puede activarla en el país elegido (España SL: sí; Panamá: con dificultad).
- **Stripe** como fallback universal.
- **PayPal** opcional — fees altos pero algunos clientes lo exigen.

## Dominio y emails

- Dominio en **Cloudflare Registrar** (precio neto, mejor DNS).
- Email empresarial en **Google Workspace** (6 €/usuario/mes) — Cami y Andrés, mínimo.
- Email transaccional (recibos, descargas) por defecto via Shopify; si queremos personalizar mucho, **Postmark** o **Resend**.

## Analítica y métricas

- **Google Analytics 4** + **Shopify Analytics** nativos.
- **PostHog** (autohospedado o cloud) si queremos eventos custom y feature flags. Buen free tier.
- Dashboard semanal en **Google Sheets** o **Notion** con: revenue, sesiones, conversion rate, top productos, CAC, churn (si aplica).

## Repo / código

Si construimos código propio (landing custom, app SaaS, integraciones):

- Mismo stack que ya manejamos en `myrepo`: **Next.js + TypeScript + Tailwind + Supabase**.
- Despliegue en **Vercel** (free tier alcanza para arrancar).
- Repo separado del de "La Casa de Alejandro" cuando empiece el código real. Por ahora, esta carpeta `shopify/` es solo planning.

## Seguridad y privacidad

- 2FA en **todas** las cuentas (Shopify, Stripe, Google Workspace, dominio, banco).
- **1Password** familia compartido para credenciales del proyecto.
- Política de privacidad y términos generados con **Termly** o **iubenda** (compliance UE: GDPR es serio si vendemos en España).
- Cookies banner si hay GA o píxel de Meta.
