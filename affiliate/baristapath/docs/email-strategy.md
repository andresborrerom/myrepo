# Email strategy — Fase 2 del revenue plan

> Última actualización: 2026-05-24
>
> Documento operativo. Captura el contenido del welcome email + secuencia educativa para que el operador (o un agente futuro) lo grabe en MailerLite cuando se active la integración. También captura los pasos de setup de MailerLite en sí.

## Objetivos

1. **Capturar emails de visitantes orgánicos** (Fase 2 del revenue plan) para tener un canal propio que no dependa de Google/Amazon.
2. **Educar a los suscriptores** con valor genuino — no clickbait, no afiliado agresivo. La regla anti-gray-hat de `CLAUDE.md` aplica también acá.
3. **Pre-validar audiencia para un digital product** (Fase 3). El soft-pitch al final de la secuencia educativa es un eBook o curso de bajo precio ($19-29) — si nadie compra, mejor enterarnos con una lista de 500 suscriptores que con $5k invertidos en producción.

## Stack elegido — MailerLite (free tier)

- **Por qué MailerLite**: free tier hasta 500 suscriptores con 12,000 emails/mes — incluye **welcome email + automations** en el plan free (no como MailerLite, que en 2025 movió incentive email a planes pagos). Pricing predecible: ~$10/mes en 1k subs, ~$20/mes en 2.5k.
- **Alternativa considerada (descartada)**: MailerLite/Kit free — ya no incluye welcome email automation gratis ($29+/mes para activarlo). Buttondown ($9/mes desde día 1, sin free real). Beehiiv (free 2.5k pero más newsletter-oriented).
- **Decisión 2026-05-24**: migrar de MailerLite a MailerLite. Para nuestra etapa (0 subs, proyectados <500 en 6 meses) free tier alcanza. Migración cuando se supere 500 subs es trivial vía export/import.

## Setup steps (operador)

1. **Registrar cuenta**: <https://www.mailerlite.com/signup>. Free tier directo, sin tarjeta. Onboarding pregunta tipo de creador, audiencia estimada, etc.
2. **Verificar email** del welcome de MailerLite.
3. **(Opcional) Crear Group**: Subscribers → Groups → Create group → "baristapath — espresso setup guide". Anotar el Group ID de la URL. Solo necesario si queremos segmentar por origen — para v1 podemos saltar y todos los suscriptores van a la lista general.
4. **Configurar Welcome Email (Automation)**:
   - Automations → Create new → Trigger: "Subscriber joins group" (o "Subscriber joins any group" si saltamos el group del paso 3).
   - Action: Send email.
   - Subject: `Your free guide — How to Choose Your First Home Espresso Setup`
   - Body: ver template "Welcome email" más abajo.
   - Adjuntar el PDF o linkear a `https://baristapath.com/lead-magnets/espresso-setup-guide.pdf` (recomendado el link — el site también lo sirve estático).
   - Activate automation.
5. **Generar API Token**:
   - Integraciones → MailerLite API → "Crear nuevo token" (Generate new token).
   - Nombre: `baristapath-prod`.
   - IP restrictions: "Todas las IPs permitidas" (no restringir — CF Pages Functions tienen IPs dinámicas).
   - **Copiar el token COMPLETO inmediatamente** — solo se ve una vez. Guardarlo en password manager.
6. **Configurar en Cloudflare Pages**:
   - Dashboard → Pages → tu proyecto → Settings → Variables and Secrets.
   - Production env:
     - `MAILERLITE_API_KEY` = (el token JWT) — marcar como **Secret/Encrypted**.
     - `MAILERLITE_GROUP_ID` = (Group ID si creaste uno; si no, no agregar esta variable). Tipo: Text.
   - Save + redeploy (Retry deployment).
7. **Verificar end-to-end**:
   - Entrar a `https://baristapath.com/espresso-setup-guide`, subscribir un email de prueba (e.g. alias `andres.borrerom+ml-test@gmail.com`).
   - Confirmar que aparece en MailerLite → Subscribers en <60 segundos.
   - Confirmar que recibe el welcome email con el link al PDF.
   - DevTools → Network → ver respuesta de `POST /api/subscribe`. Si dice `mode: "mailerlite"`, OK. Si dice `mode: "setup"`, las env vars no quedaron.

Mientras los env vars NO estén configurados, el endpoint `/api/subscribe` igual devuelve 200 (modo "setup"), y el componente del cliente persiste el lead en `localStorage`. **No se pierden leads durante la transición**. Cuando el operador active MailerLite, los leads en localStorage se pueden recoger manualmente (abrir devtools en un browser donde un visitante se haya suscrito, exportar `localStorage['baristapath:email-pending-leads']`).

## Welcome email — template

**Subject**: `Your free guide — How to Choose Your First Home Espresso Setup`

**From**: `editor@baristapath.com` (configurar en MailerLite → Sender domains; mientras no tengamos email custom, usar el default de MailerLite con "Barista Path" como From name).

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

MailerLite free tier no incluye click tracking en URLs custom — usamos UTM tags en cada link (`?utm_source=mailerlite&utm_campaign=email-N&utm_medium=email`) y leemos los resultados en Cloudflare Web Analytics (cuando esté activado).
