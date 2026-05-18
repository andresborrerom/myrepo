---
title: Tareas del operador — Amazon Resale Project
author: Claude (Amazon Resale Project)
date: 2026-05-17
geometry: margin=2cm
fontsize: 11pt
colorlinks: true
---

# Tareas del operador — Amazon Resale Project

**Fecha de emisión:** 2026-05-13
**Última revisión:** 2026-05-17
**Branch del proyecto:** `claude/amazon-resale-project-t7o0P`

---

## Resumen ejecutivo

Tu trabajo manual total estimado a 6 meses sigue siendo **≈8 horas**.
La mayoría del trabajo lo hago yo (Claude) y los agentes. Vos te
concentrás en credenciales, juicio estratégico, o reuniones humanas.

**Estado al 2026-05-17**:
- Bloque A (validaciones iniciales) — **COMPLETADO** ✅
- Sitio live en `https://baristapath.com` con 236 páginas, indexable.
- Pinterest app submitted, Trial pendiente review.
- robots.txt flipped — Google empieza a crawlear.
- Email Routing creado (`hello@baristapath.com` → gmail).

Lo que queda es Bloques B-F, abajo en orden.

---

## ~~Bloque A — pre-launch (COMPLETADO 2026-05-14)~~

✅ **A1. Pinterest Business + API developer app** — submitted, Trial pendiente
✅ **A2. Volúmenes Ubersuggest** — VERDE, issue #20 cerrado
✅ **A3. allintitle KGR sample** — VERDE, issue #21 cerrado

---

## Bloque B — esta semana (≈45 min) — **NUEVO POST-FLIP**

### B1. Google Search Console — submit sitemap (≈15 min) — **CRÍTICO**

Sin esto, Google no va a crawlear nuestro sitio aunque robots.txt
permita. Es el switch que arranca el reloj de indexing (2-4 semanas).

**Pasos:**

1. Abrir `https://search.google.com/search-console` en PC.
2. Add property → "URL prefix" → `https://baristapath.com/`
3. Verification:
   - Elegir **DNS record** verification
   - Google da un TXT record
   - En Cloudflare dashboard → DNS → Add record TXT con valor de Google
   - Vuelta a Search Console → Verify
4. Sidebar izquierdo → **Sitemaps** → ingresar `sitemap-index.xml` → Submit
5. Done. A partir de acá Google empieza a crawlear.

### B2. Amazon Associates US — aplicar (≈30 min)

**No esperar a tener tráfico.** Tenemos 236 páginas de contenido
original, califica como sitio activo.

**Pasos:**

1. Abrir `https://affiliate-program.amazon.com` en PC.
2. Sign up → asociate tu cuenta amazon.com.
3. Website URL: `https://baristapath.com`. Topics: "Coffee equipment
   reviews and comparisons". Traffic source: SEO.
4. **Tax interview**: cuando pregunten "Do you perform services in the
   United States?" respondé **"No"**. Esto produce 0% withholding sin
   necesidad de treaty.
5. Submit. Aprobación condicional típicamente 1-7 días.

### B3. Pinterest — check Trial status (≈5 min)

Cuando recibás email de Pinterest confirmando Trial activo:

1. Login `developers.pinterest.com` → app "Coffee Equipment Pin Publisher"
2. Editar Company website + Privacy URL: `https://baristapath.com` y
   `https://baristapath.com/privacy/` (en lugar del `.pages.dev`).
3. Solicitar **Standard API**. Review humano 1-3 semanas.

### B4. Cloudflare Web Analytics token (≈5 min) — opcional pero útil

Para ver tráfico real:

1. Cloudflare dashboard → zone `baristapath.com` → **Analytics & Logs**
   → **Web Analytics** → Add site
2. Pegar `baristapath.com` → genera un beacon token
3. Pasarme el token (es público, no es secret) → lo inyecto en
   `Base.astro` y deploya

---

## Bloque C — mes 2 (≈30 min)

### C1. Suscribir Keepa API (≈20 min)

**Plazo:** inicio mes 2 (~jul 2026), tras validar build con datos
mockeados.

**Pasos:**

1. Crear cuenta en `keepa.com`.
2. Suscribir plan API entry tier (€19 + €49 ≈ $76 USD/mes).
3. Pagar con tarjeta de crédito del proyecto.
4. Copiar API key, pasármela para configurar como Actions Secret.

---

## Bloque D — mes 3 (~30 min, tras aprobación Associates)

### D1. Replace affiliate tag (≈5 min)

Cuando Amazon Associates te apruebe conditionalmente:

1. Recibís tu tracking tag (e.g. `baristapath-20`).
2. Me lo pasás. Hago grep + replace de `PLACEHOLDER-20` en todos los
   templates.
3. Build + push, CF redeploya. A partir de acá cada click cuenta.

### D2. Abrir cuenta Payoneer (≈30-45 min) — solo si payouts crecen

**Plazo:** una vez Associates aprobado y empieza a generar revenue.
**Pasos detallados:** ver `research/payment-receivers-panama.md`.
**Documentos:** pasaporte CO + comprobante domicilio PA <3 meses +
datos cuenta bancaria USD panameña.

**Alternativa inicial**: configurar Amazon Associates pago como Gift
Card si los payouts iniciales son <$200/mo. Reinvertimos en proyecto.

### D3. Verificar comisión Kitchen en Associates Central (≈5 min)

Una vez Associates activa, login → Operating Agreement → Schedule of
Fees. Capturar tabla actual para "Kitchen" + "Outdoor Recreation".
Postear en issue #19. Si Kitchen <3%, abrimos ADR de re-evaluación.

---

## Bloque E — antes de mes 6 (≈1-2 h)

### E1. Cita con contador panameño (≈1-2 h)

**Plazo:** antes de que entren payouts reales (mes 5-6).
**Tema:** tributación local de comisiones Amazon Associates pagadas
por entidad US a residente panameño. Régimen territorial: en principio
fuente extranjera no gravada, pero hay matices cuando el trabajo se
hace localmente. Pedir opinión escrita.
**Cómo encontrarlo:** contador con experiencia en e-commerce
internacional + affiliates. Recomendaciones de comunidad expat o
firma que te hizo la residencia.

---

## Tabla consolidada de plazos

| Bloque | Tarea | Tiempo | Plazo | Estado |
|---|---|---|---|---|
| A1 | Pinterest Business + API | 30 min | 2026-05-20 | ✅ |
| A2 | Volúmenes Ubersuggest | 30 min | 2026-05-20 | ✅ |
| A3 | allintitle sample | 15 min | 2026-05-20 | ✅ |
| **B1** | **Google Search Console submit** | **15 min** | **Esta semana** | **Pendiente** |
| **B2** | **Aplicar Amazon Associates** | **30 min** | **Esta semana** | **Pendiente** |
| **B3** | **Pinterest Trial → Standard request** | **5 min** | **Cuando Trial active** | **Pendiente** |
| B4 | CF Web Analytics token | 5 min | Cuando puedas | Pendiente |
| C1 | Suscribir Keepa | 20 min | Inicio mes 2 (jul) | Futuro |
| D1 | Replace affiliate tag | 5 min | Tras Associates approve | Futuro |
| D2 | Abrir Payoneer (si revenue >$200) | 45 min | Mes 3-4 | Futuro |
| D3 | Verificar Kitchen commission | 5 min | Tras Associates activa | Futuro |
| E1 | Contador panameño | 1-2 h | Antes mes 6 (oct) | Futuro |
|  | **Total** | **≈8 h** | **6 meses** | |

---

## Reglas de actualización

- Estos tiempos se revisan cada vez que haya avance significativo.
- Versión actualizada en `progreso.md` (raíz del proyecto). Se abre al
  inicio de cada sesión.
- Si algún plazo se mueve, Claude lo registra en commit con razón.
