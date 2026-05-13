---
title: Tareas del operador — Amazon Resale Project
author: Claude (Amazon Resale Project)
date: 2026-05-13
geometry: margin=2cm
fontsize: 11pt
colorlinks: true
---

# Tareas del operador — Amazon Resale Project

**Fecha de emisión:** 2026-05-13
**Próxima revisión:** tras cada hito o cada 1-2 semanas
**Branch del proyecto:** `claude/amazon-resale-project-t7o0P`

---

## Resumen ejecutivo

Tu trabajo manual total estimado a 6 meses: **≈8 horas**, distribuidas
en bloques chicos. La mayoría del trabajo lo hago yo (Claude) y los
agentes. Vos te concentrás en lo que requiere tus credenciales, tu
juicio estratégico, o reuniones humanas.

Las tareas están ordenadas por urgencia. Las marcadas **bloqueante**
detienen el build del sitio hasta que se resuelvan.

---

## Bloque A — esta semana (≈75 min)

**Plazo: 2026-05-20.** Las tres tareas se pueden hacer desde el celular o
desktop, en cualquier orden.

### A1. Aplicar a Pinterest Business + API developer (≈30 min)

**Por qué urgente:** la aprobación de Standard API de Pinterest puede
tardar 1-3 semanas. Si la queremos lista para mes 2 cuando arranque
el agente de pinning, hay que arrancar el reloj ya.

**Pasos:**

1. Crear cuenta Pinterest Business en `pinterest.com/business/create`
   (gratis). Email puede ser el mismo del proyecto.
2. Ir a `developers.pinterest.com` → "Create app". Llenar:
   - Nombre app: nombre del proyecto cuando lo elijamos, o algo
     genérico como "Coffee Equipment Reviews" (cambiable después).
   - Descripción: *"Programmatic content site for coffee equipment
     reviews and comparisons, distributing curated pins from articles
     linking back to source."*
   - Categoría: Marketing / E-commerce.
3. Solicitar acceso a **Standard API**. El Trial API es automático;
   Standard requiere review humano de Pinterest.
4. Esperar email de aprobación.

**Output:** comment en issue (a abrir) con screenshot de la app + estado
actual (Trial / pendiente Standard / aprobado Standard).

---

### A2. Validar volúmenes de 15 keywords coffee con Ubersuggest (≈30 min) — **bloqueante**

**Por qué bloqueante:** sin volúmenes reales no podemos comprometer
500-1000 páginas a este nicho. Los agentes no pudieron hacerlo (anti-bot
en todas las herramientas free).

**Pasos:**

1. Ir a `https://neilpatel.com/ubersuggest/`, login con cuenta Google.
2. Correr las 15 keywords listadas en el issue #20 del repo. Free tier
   permite 3 búsquedas/día sin login, ~7 con login.
3. Anotar volumen, KD (keyword difficulty), CPC por cada una.
4. Si Ubersuggest se queda corto, usar **Google Keyword Planner**
   (requiere cuenta Google Ads, gratis si no creás campañas activas).

**Output:** comment en issue #20 con la tabla completa. 12 de 15 alcanza.

**Criterio verde/amarillo/rojo:** definido en el issue.

---

### A3. Sample KGR allintitle de 10 long-tails (≈15 min) — **bloqueante**

**Por qué bloqueante:** validar que el patrón KGR (allintitle <10 +
volumen bajo = rankeable en 2-8 semanas) funciona en este nicho.
Sin esto no escalamos a 500+ páginas con confianza.

**Pasos:**

1. Abrir Google (desktop preferible, móvil sirve).
2. Para cada keyword del issue #21, pegar `allintitle:"<keyword>"`
   (con las comillas) en la barra de búsqueda.
3. Anotar el "About X results" que aparece arriba de los resultados.
   Si Google muestra menos de 10 resultados, anotar el número exacto.

**Output:** comment en issue #21 con tabla allintitle por keyword.

---

## Bloque B — mes 1 (≈30 min)

### B1. Aceptar aprobación Pinterest Standard API (≈10 min)

**Plazo:** mes 1 (esperar email de Pinterest).
**Acción:** copiar `client_id` + `client_secret` a un gestor seguro
(1Password, Bitwarden, etc.). Avisarme para configurarlos como GitHub
Actions Secret en el repo.

---

## Bloque C — mes 2 (≈30 min)

### C1. Suscribir Keepa API (≈20 min)

**Plazo:** inicio mes 2, tras validar build de Astro con datos mockeados.
**Pasos:**

1. Crear cuenta en `keepa.com`.
2. Suscribir plan: API entry tier (€19 + €49 ≈ $76 USD/mes).
3. Pagar con tarjeta de crédito del proyecto.
4. Copiar la API key, avisarme para configurar como Actions Secret.

---

## Bloque D — mes 3 (≈2-3 h)

### D1. Aplicar a Amazon Associates US (≈30 min)

**Plazo:** cuando el sitio tenga ≥30 páginas publicadas + idealmente
≥500 visitas/mes documentadas en Search Console.

**Pasos detallados:** ver `research/amazon-associates-from-panama.md`.

**Crítico:** en el tax interview responder **"No"** a *"Do you perform
services in the United States?"*. Esto produce 0% withholding sin
necesidad de tax treaty. **No marcar treaty benefits** (Panamá no tiene).

### D2. Abrir cuenta Payoneer (≈30-45 min)

**Plazo:** mes 3, una vez aplicado a Associates (en paralelo está bien).
**Pasos detallados:** ver `research/payment-receivers-panama.md`.
**Documentos:** pasaporte colombiano + comprobante de domicilio panameño
<3 meses + datos de cuenta bancaria USD panameña.

### D3. Configurar Amazon Associates pago como Gift Card (≈5 min)

**Plazo:** inmediatamente tras aprobación Associates condicional.
**Por qué:** los primeros payouts (<$200/mes) los reinvertimos en
productos coffee para reseñas auténticas. Cero fees, cero KYC.

### D4. Verificar cuenta bancaria nómina (≈15 min)

**Plazo:** mes 3.
**Acción:** llamar a tu banco panameño, preguntar si tu cuenta nómina
USD acepta transferencias de terceros y cuál es el fee de inbound wire
desde Payoneer. Si no acepta, abrir cuenta corriente USD adicional sin
flag de nómina.

---

## Bloque E — mes 4 (≈10 min)

### E1. Verificar comisión Kitchen en Amazon Associates Central (≈5 min)

**Plazo:** una vez aprobada la cuenta Associates.
**Pasos:** login → Operating Agreement → Schedule of Fees. Capturar
la tabla para Kitchen y Outdoor Recreation. Postear en issue #19.

**Si Kitchen <3%:** se abre ADR de re-evaluación de vertical (puede
implicar pivot a outdoor cooking).

---

## Bloque F — antes de mes 6 (≈1-2 h)

### F1. Cita con contador panameño (≈1-2 h)

**Plazo:** antes de que entren payouts reales (mes 5-6).
**Tema:** tributación local de comisiones de Amazon Associates pagadas
por entidad US a residente panameño. Régimen territorial: en principio
fuente extranjera no gravada, pero hay matices cuando el trabajo se
hace localmente. Pedir opinión escrita.
**Cómo encontrarlo:** contador con experiencia en e-commerce
internacional + affiliates. Recomendaciones de comunidad expat o de
la firma que te hizo la residencia.

---

## Tabla consolidada de plazos

| Bloque | Tarea | Tiempo | Plazo |
|---|---|---|---|
| A1 | Pinterest Business + API app | 30 min | 2026-05-20 |
| A2 | Volúmenes Ubersuggest | 30 min | 2026-05-20 |
| A3 | allintitle sample | 15 min | 2026-05-20 |
| B1 | Aceptar Pinterest API approval | 10 min | Mes 1 |
| C1 | Suscribir Keepa | 20 min | Inicio mes 2 |
| D1 | Aplicar Amazon Associates | 30 min | Mes 3 |
| D2 | Abrir Payoneer | 45 min | Mes 3 |
| D3 | Config Associates Gift Card | 5 min | Mes 3 |
| D4 | Verificar banco | 15 min | Mes 3 |
| E1 | Verificar Kitchen commission | 5 min | Mes 4 |
| F1 | Contador panameño | 1-2 h | Antes mes 6 |
|  | **Total** | **≈8 h** | **6 meses** |

---

## Reglas de actualización

- Estos tiempos se revisan cada vez que haya avance significativo.
- La versión más actualizada vive en `progreso.md` (raíz del proyecto).
  Lo abrimos al inicio de cada sesión.
- Si algún plazo se mueve, Claude lo registra en commit con razón.
