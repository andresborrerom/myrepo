# Landing — Waitlist

Landing minimalista en Next.js 14 + Tailwind + Supabase para validar demanda del nicho elegido. Todo el copy y la marca vive en **un solo archivo**: [`brand.config.ts`](./brand.config.ts).

## Qué hace

- Página única (hero + propuesta de valor + para quién + FAQ + CTA repetido + footer).
- Formulario de email que escribe a Supabase (`public.waitlist`).
- Captura UTMs para distinguir tráfico orgánico vs ads.
- Honeypot anti-bots (campo `website` oculto).
- Notificación opcional a webhook (Slack/Telegram) cuando entra alguien.
- Mobile-first, sin JavaScript pesado, score alto en PageSpeed esperado.

## Setup en 10 minutos

```bash
cd shopify/landing
npm install

# Configurar Supabase
cp .env.example .env.local
# editar .env.local con tu URL y keys

# Crear tabla en Supabase
# Abrir https://supabase.com/dashboard → SQL Editor → pegar shopify/landing/supabase/schema.sql → Run

npm run dev
# abrir http://localhost:3001
```

## Editar la marca y el copy

Todo en [`brand.config.ts`](./brand.config.ts):

- `name`, `tagline`, `domain`
- `heroHeadline`, `heroSubheadline`, `heroCta`
- `pillars` (3 puntos de valor)
- `forWhom.isFor` / `forWhom.isNotFor`
- `faq` (lista de preguntas)
- `footer`

Si cambia el **nicho** (no solo el copy), reescribir este archivo entero. Los componentes no se tocan.

## Cambiar la paleta

[`tailwind.config.ts`](./tailwind.config.ts) tiene los colores `arena`, `arcilla`, `tinta`, `botella`, `regla`. Editar ahí.

Si querés tono completamente distinto (ej. nicho B2B serio, paleta azul + gris), cambiar las definiciones de color y los nombres en los componentes. `globals.css` también referencia `arena` y `tinta` — cambiar las clases ahí.

## Despliegue en Vercel

```bash
# desde shopify/landing/
npx vercel
```

Configurar variables de entorno en Vercel:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY` (secret)
- `NOTIFY_WEBHOOK_URL` (opcional)

Apuntar el dominio comprado al deploy en Vercel.

## Validar con ads

1. Subir el landing a producción.
2. Crear campaña Google Ads o Meta Ads con presupuesto 50 €.
3. Apuntar a la URL con UTM:
   `https://singladuracapital.com/?utm_source=google&utm_medium=cpc&utm_campaign=test-mvp-001`
4. Dejar correr 5 días.
5. Mirar tabla `waitlist` en Supabase: cuántos emails, qué fuente, qué conversión.

**Criterio de validación:** si en 5 días con 50 € hay ≥20 emails de tráfico cualificado, el nicho responde. Si no, replantear.

## Estructura

```
shopify/landing/
├── README.md
├── brand.config.ts        ← edita aquí el copy / marca
├── package.json
├── tsconfig.json
├── next.config.mjs
├── tailwind.config.ts
├── postcss.config.mjs
├── .env.example
├── supabase/
│   └── schema.sql         ← ejecutar una vez en Supabase
└── src/
    ├── app/
    │   ├── layout.tsx
    │   ├── page.tsx       ← composición de secciones
    │   ├── globals.css
    │   └── api/
    │       └── waitlist/
    │           └── route.ts  ← endpoint POST
    ├── components/
    │   └── WaitlistForm.tsx
    └── lib/
        └── supabase.ts
```

## Decisiones de diseño

- **Sin imágenes en v1.** Tipografía + color hacen el trabajo. Imagen real (foto papá Marbella, etc.) entra cuando tengamos foto buena, no antes.
- **No CMS.** Copy en TypeScript = un solo archivo, control de versiones, sin dependencia externa.
- **Sin tracker pesado.** Solo UTMs nativos. Si querés GA4/Meta Pixel después, se añade en `layout.tsx` con `<Script>`.
- **Honeypot, no captcha.** Captcha mata conversión; un campo `website` oculto filtra 99% de bots.
- **Puerto 3001** en `dev` para no chocar con el repo padre (`la-casa-de-alejandro` corre en 3000).
