# Email strategy — filamentpath (Fase 2 del revenue plan)

> Última actualización: 2026-05-26
>
> Documento operativo. Adaptado del template de baristapath/docs/email-strategy.md.
> NO está implementado en Sub-sprint 1 — el componente `EmailSignup.astro`
> y la function `/api/subscribe` se replicarán cuando se active Fase 2 de
> revenue (lead magnet "Filament starter guide PDF"). Por ahora este doc
> es la spec de lo que se va a implementar.

## Objetivos

1. **Capturar emails de visitantes orgánicos** (Fase 2 del revenue plan) — canal propio que no depende de Google ni Amazon.
2. **Educar a los suscriptores** con valor genuino — no clickbait, no affiliate agresivo. Anti-gray-hat de `CLAUDE.md` aplica.
3. **Pre-validar audiencia para un digital product** (Fase 3). Soft-pitch al final de la secuencia educativa: eBook / mini-curso de $19-29.

## Stack — MailerLite (cross-niche)

Mismo provider que baristapath. Razones:
- Free tier hasta 500 suscriptores con welcome email + automations incluidos.
- Cross-niche: una cuenta MailerLite con groups separados (`filamentpath`, `baristapath`) reduce overhead de gestión.
- Migración trivial vía export/import si crecemos.

## Setup steps (operador, cuando se active Fase 2)

1. **Crear Group separado** en MailerLite: `filamentpath — filament starter guide`. Anotar Group ID.
2. **Configurar Welcome Email (Automation)**:
   - Trigger: "Subscriber joins group: filamentpath — filament starter guide"
   - Subject: `Your free guide — How to Choose Your First FDM 3D Printer`
   - Body: ver template "Welcome email" más abajo.
   - Link al PDF: `https://filamentpath.com/lead-magnets/filament-starter-guide.pdf` (servido estático por CF Pages).
   - Activate.
3. **Reusar API Token** existente de baristapath (mismo MailerLite account) o generar uno separado por niche para auditoría limpia. Decisión menor; el operador decide cuando llegue el momento.
4. **Configurar en Cloudflare Pages** (proyecto filamentpath):
   - `MAILERLITE_API_KEY` = token
   - `MAILERLITE_GROUP_ID` = Group ID del nuevo group filamentpath
5. **Verificar end-to-end** con email de prueba en `https://filamentpath.com/filament-starter-guide` (página que se construye en Fase 2, NO en Sub-sprint 1).

Mientras los env vars no estén configurados, el endpoint `/api/subscribe` (replicado del scaffold de baristapath) devuelve 200 en modo "setup" y persiste leads en `localStorage` del cliente. Cuando se active MailerLite, el operador recoge los leads pendientes manualmente.

## Welcome email — template

**Subject**: `Your free guide — How to Choose Your First FDM 3D Printer`

**From**: `editor@filamentpath.com` (configurar en MailerLite → Sender domains cuando esté disponible Email Routing).

**Body**:

```
Hi {{ subscriber.first_name | default: "there" }},

Thanks for grabbing the free guide. The PDF is attached (12 pages).
If you skim only one page, make it page 4 — that's where the budget
allocation math lives, and where most first-time 3D printer buyers
make the mistake.

Three things you might want to do next, in order of how much they
will save you:

1. Read the methodology before you trust any review:
   https://filamentpath.com/methodology/
   If a review doesn't tell you what they evaluated and what they
   didn't, you can't tell if it applies to your use case.

2. Compare the entry tier ($200-400) printers head to head — most
   buyers should not skip this category just because faster /
   bigger printers exist:
   [TODO Sub-sprint 3: linkear best-of de entry-tier printers]

3. Pick a single material to start with — PLA. Everything else
   (PETG, TPU, ABS) is a tuning exercise on top of PLA; trying to
   start with PETG to "save time later" backfires:
   [TODO Sub-sprint 3: linkear guide de filament-selection]

You will hear from me again in about a week with the first
educational email — practical, not promotional. If you ever want
out, the unsubscribe link at the bottom works in one click. We send
1-2 emails per month, never more.

If you have questions, just reply to this email — you'll reach me
directly. Same person who wrote the guide.

— Andres
   filamentpath.com
```

## 5-email educational sequence (planificada, NO implementada en Sub-sprint 1)

> Cadence: cada 5-7 días después del welcome. Total ventana: ~5 semanas.
> Tono: educational primary, soft affiliate secondary, sin "buy now" CTAs hasta el email 5.

### Email 1 — "Why your slicer profile matters more than your printer"

**Subject**: `A $250 printer with tuned profiles beats a $700 printer with defaults`

**1-line body**: Por qué los slicer profiles default son la causa #1 de prints malos en sub-$400 printers. Cómo cambiar de Cura default a un community-tuned profile transforma el resultado. Linkear a how-to / slicer-profile-tuning (Sub-sprint 3).

### Email 2 — "The five specs that actually matter on a printer"

**Subject**: `Stop reading max-print-speed marketing. Read these five specs instead.`

**1-line body**: Build volume, bed temp max, hotend type, leveling system, motion architecture (CoreXY vs bed-slinger). Cada uno con un product real del catalog que lo ejemplifica. Link a methodology y glossary.

### Email 3 — "The first-print checklist (PLA edition)"

**Subject**: `Your first 10 prints will fail in predictable ways. Here's the order to fix them.`

**1-line body**: Checklist de primer print: bed leveling → bed adhesion → first layer height → first layer speed → cooling. Mencionar PEI textured plate y wd40 / hairspray como NOT-recommended fixes vs alternativas. Link a troubleshoot pages (Sub-sprint 3).

### Email 4 — "Mistakes I see in r/3Dprinting every week"

**Subject**: `5 mistakes that keep showing up in r/3Dprinting (and the cheap fixes)`

**1-line body**: Lista de errores recurrentes en forum threads + fixes. Storage de filament (humidity), retraction tuning, scaling vs build volume, nozzle wear con abrasivos, calibration cubes mal interpretados.

### Email 5 — Soft pitch al digital product

**Subject**: `If you want to go deeper — Calibration Mastery course`

**1-line body**: Soft pitch del primer digital product (placeholder name "Calibration Mastery"). Tono: "you've read the free guide and four follow-up emails; here's the long-form course with worked-through calibration walkthroughs". Anti-gray-hat: refund 30 días, mención explícita de que el free guide cubre ~20% de lo que está en el course.

## Placeholder: digital product Fase 3

Producto soft-pitcheado en email 5. NO existe todavía.

- **Nombre tentativo**: "Calibration Mastery for FDM"
- **Formato tentativo**: eBook PDF ~80 páginas + 1 hora de video walkthrough.
- **Precio tentativo**: $29.
- **Plataforma**: Gumroad (cross-niche con baristapath).
- **Validación previa**: si email 5 obtiene <2% CTR al landing, NO invertimos. Si >5%, priorizar.

## Segmentación a futuro

Cuando la lista filamentpath pase ~1,000 suscriptores:

- `source: home / landing-filament-starter-guide`: top-of-funnel, no compró printer. Educational sequence completa.
- `source: best-budget-fdm-printer`: high-intent buyer. Sequence acortada antes del soft pitch.
- `source: footer`: recurring readers. Soft pitch temprano (email 3).

Por ahora (lista no existe), tratamos todos igual.

## Métricas

- **Open rate** welcome: target >50%.
- **CTR al PDF**: target >40%.
- **Unsubscribe rate** por email: red flag >2%.
- **CTR a filamentpath.com** desde emails 1-4: proxy de affiliate income.
- **CTR al digital product landing** en email 5: validación primary.

UTM tags por email (`?utm_source=mailerlite&utm_campaign=email-N&utm_medium=email`) y resultados en Cloudflare Web Analytics.
