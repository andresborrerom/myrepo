# Email strategy — Fase 2 del revenue plan

> Última actualización: 2026-05-24
>
> Documento operativo. Captura el contenido del welcome email + secuencia educativa para que el operador (o un agente futuro) lo grabe en ConvertKit cuando se active la integración. También captura los pasos de setup de ConvertKit en sí.

## Objetivos

1. **Capturar emails de visitantes orgánicos** (Fase 2 del revenue plan) para tener un canal propio que no dependa de Google/Amazon.
2. **Educar a los suscriptores** con valor genuino — no clickbait, no afiliado agresivo. La regla anti-gray-hat de `CLAUDE.md` aplica también acá.
3. **Pre-validar audiencia para un digital product** (Fase 3). El soft-pitch al final de la secuencia educativa es un eBook o curso de bajo precio ($19-29) — si nadie compra, mejor enterarnos con una lista de 500 suscriptores que con $5k invertidos en producción.

## Stack elegido — ConvertKit (free tier)

- **Por qué ConvertKit**: free tier hasta 10,000 suscriptores (subió de 1k en 2024), API simple, broadcast + automation en el mismo plan, no se necesita pagar para empezar.
- **Alternativa considerada**: Buttondown ($9/mes desde día 1), MailerLite (free hasta 1k pero migrar duele si llegamos a 1k).
- **Decisión**: empezar con ConvertKit free tier. Si superamos 10k o necesitamos commerce nativo, re-evaluar.

## Setup steps (operador)

1. **Registrar cuenta**: <https://app.convertkit.com/users/signup>. Free tier directo, sin tarjeta.
2. **Crear Form**: dashboard → Forms → New → Form → Inline (no usaremos el embed UI, solo la API). Title: "Espresso Setup Guide — Lead Magnet". Apuntar al lead magnet PDF como incentive email attachment.
3. **Configurar Incentive Email**:
   - Subject: `Your free guide — How to Choose Your First Home Espresso Setup`
   - Body: ver template "Welcome email" más abajo.
   - Attachment: `public/lead-magnets/espresso-setup-guide.pdf` (subir copia a ConvertKit; el sitio también lo sirve estático).
4. **Copiar credenciales**:
   - Account → Settings → API. Copiar **API Secret** (no la API Key — necesitamos el Secret para POST a forms).
   - Forms → tu form → Settings → encontrar **Form ID** (número en la URL, ej. `https://app.convertkit.com/forms/designers/12345/edit` → form ID = 12345).
5. **Configurar en Cloudflare Pages**:
   - Dashboard → Pages → tu proyecto → Settings → Environment variables.
   - Production env:
     - `CONVERTKIT_API_KEY` = (API Secret de ConvertKit) — marcar como **Secret/Encrypted**.
     - `CONVERTKIT_FORM_ID` = (número del form).
   - Save + redeploy.
6. **Verificar**:
   - Entrar a la home de baristapath.com, subscribir un email de prueba.
   - Confirmar que aparece en ConvertKit → Subscribers en <60 segundos.
   - Confirmar que recibe el incentive email con el PDF adjunto.

Mientras los env vars NO estén configurados, el endpoint `/api/subscribe` igual devuelve 200 (modo "setup"), y el componente del cliente persiste el lead en `localStorage`. **No se pierden leads durante la transición**. Cuando el operador active ConvertKit, los leads en localStorage se pueden recoger manualmente (abrir devtools en un browser donde un visitante se haya suscrito, exportar `localStorage['baristapath:email-pending-leads']`).

## Welcome email — template

**Subject**: `Your free guide — How to Choose Your First Home Espresso Setup`

**From**: `editor@baristapath.com` (configurar en ConvertKit → Account → Email settings; mientras no tengamos email custom, usar el default de ConvertKit).

**Body**:

```
Hi {{ subscriber.first_name | default: "there" }},

Thanks for grabbing the free guide. The PDF is attached to this email
(12 pages, ~30 KB). If you skim only one page, make it page 3 — that
is where the budget allocation math lives, and it's the single mistake
that costs beginners the most.

Three things you might want to do next, in order of how much they will
save you:

1. Run the cost-per-cup calculator before you buy anything:
   https://baristapath.com/tools/cost-per-cup-calculator/
   If the payback period is over 18 months for your real coffee habit,
   you are buying the hobby, not savings — which is fine, but worth
   knowing.

2. Take the 7-question quiz to narrow your machine pick:
   https://baristapath.com/quiz/which-espresso-machine/
   No email gate (the gate is on the email you just gave us — fair
   trade). 1 minute, transparent scoring.

3. Read the best-of for your tier:
   - https://baristapath.com/best/best-espresso-machine-under-500/
   - https://baristapath.com/best/best-grinder-under-200/

You will hear from me again in about a week with the first educational
email — practical, not promotional. If you ever want out, the
unsubscribe link is at the bottom of every email and works in one
click. We send 1-2 emails per month, never more.

If you have questions, just reply to this email — you'll reach me
directly. Same person who wrote the guide.

— [Editor name]
   baristapath.com
```

**Send delay**: immediate after confirmed subscription.

## 5-email educational sequence

> Cadence: cada 5-7 días después del welcome. Total ventana: ~5 semanas.
> Tono: educational primary, soft affiliate secondary, sin "buy now" CTAs hasta el email 5.

### Email 1 — "Why your grinder matters more than your machine"

**Subject**: `Why a $500 machine + $300 grinder beats a $700 machine + $50 grinder`

**Send delay**: 5 días después del welcome.

**1-line body**: Expandir el principio de "30-40% del budget al grinder" del PDF, con un ejemplo real (Bambino Plus + DF54 vs. Barista Pro + blade grinder), terminar linkeando a `/best/best-grinder-under-200/` y `/best/best-grinder-under-300/`.

### Email 2 — "The five specs that actually matter on an espresso machine"

**Subject**: `Stop reading bar-pressure marketing. Read these five specs instead.`

**Send delay**: 7 días después del email 1.

**1-line body**: Capítulo "Choosing the espresso machine" del PDF — boiler type, PID, group head 54/58mm, pre-infusion, steam wand. Cada uno con un product real del catalog que lo ejemplifica. Link a `/glossary/` y a `/methodology/`.

### Email 3 — "The dialing-in checklist (first 50 shots)"

**Subject**: `Your first 50 shots will be inconsistent. Here's the order to fix that.`

**Send delay**: 6 días después del email 2.

**1-line body**: Contenido nuevo no del PDF — checklist de dialing in (grind → dose → yield → time → taste). Mencionar WDT tool y bottomless portafilter como diagnostic tools, link a `/how-to/wdt-tool-espresso/` y `/how-to/diagnosing-channeling/`.

### Email 4 — "Common mistakes I see in r/espresso every week"

**Subject**: `5 mistakes that keep showing up in r/espresso (and the cheap fixes)`

**Send delay**: 7 días después del email 3.

**1-line body**: Capítulo "Common mistakes" del PDF + 1-2 mistakes adicionales observadas en forums (no rinsing portafilter, dosing volumétrico en lugar de por peso). Cero affiliate hard sells.

### Email 5 — Soft pitch al digital product

**Subject**: `If you want to go deeper — Espresso at Home Masterclass`

**Send delay**: 10 días después del email 4.

**1-line body**: Soft pitch del primer producto digital (placeholder: "Espresso at Home Masterclass — $29 eBook"). Tono: "you've read the free guide and four follow-up emails; if you want the long version with worked-through dial-in walkthroughs and full troubleshooting tree, here is the eBook". **Anti-gray-hat**: ofrecemos refund a 30 días por defecto, mencionamos explícitamente que el contenido del PDF gratuito es ~20% de lo que está en el eBook (no engañar al lector haciéndole pensar que el free guide ya cubría todo).

## Placeholder: digital product Fase 3

Producto soft-pitcheado en el email 5. NO existe todavía. Lo armamos después de que la lista llegue a ~500 suscriptores activos (signal de que hay audiencia interesada).

- **Nombre tentativo**: "Espresso at Home Masterclass"
- **Formato tentativo**: eBook PDF de ~80 páginas + 1 hora de video walkthrough de dial-in.
- **Precio tentativo**: $29 (mid-tier impulse-buy, no requiere autoridad establecida).
- **Plataforma de venta tentativa**: Gumroad (no Stripe directo — Gumroad maneja tax/VAT compliance).
- **Validación previa**: si el email 5 obtiene <2% click-through al landing del eBook, NO se invierte tiempo en el producto. Si obtiene >5%, se prioriza.

## Segmentación a futuro

Cuando la lista pase de ~1,000 suscriptores, segmentar por `source`:

- `home` / `landing-espresso-setup-guide`: top-of-funnel, todavía no compró equipo. Mantener en secuencia educational.
- `best-best-espresso-machine-under-500`, `best-best-grinder-under-200`: high-intent buyer. Acortar la secuencia a 2-3 emails antes del soft pitch.
- `footer`: lectores recurrentes que decidieron suscribirse después de leer mucho. Probablemente high-affinity — soft-pitch antes (email 3).

Por ahora (lista pequeña), tratamos todos igual.

## Métricas a trackear

- **Open rate** del welcome email (target: >50% — incentive emails siempre van bien).
- **Click-through** al PDF download (target: >40% — si menos, el subject no está alineado).
- **Unsubscribe rate por email** (red flag: >2% en cualquier email individual).
- **Click-through a baristapath.com** desde emails 1-4 (proxy de affiliate income futuro).
- **Click-through al eBook landing** en email 5 (validación primary del digital product).

ConvertKit free tier no incluye click tracking en URLs custom — usamos UTM tags en cada link (`?utm_source=convertkit&utm_campaign=email-N&utm_medium=email`) y leemos los resultados en Cloudflare Web Analytics (cuando esté activado).
