# 11 — Flujo captura → cierre del producto 2

> Manual de operaciones del corazón del negocio: cómo un desconocido se convierte en cliente que paga 5 000€ por "Operación llave en mano". 15 etapas, owner por etapa, herramienta exacta, plantilla/prompt y métrica de éxito.

## Vista de pájaro

```
[Tráfico]  →  [Landing]  →  [Lead magnet]  →  [Nurture 5 emails]  →  [Aplicación]
   ↓             ↓               ↓                   ↓                    ↓
 Ads/orgánico   Email capture   PDF + email        Educación + filtro    Cuestionario
                                                                               ↓
[Referidos] ← [Retainer] ← [Cierre] ← [Ejecución] ← [Kickoff] ← [Firma + pago] ← [Propuesta] ← [Llamada] ← [Score IA]
     ↑          OPT-IN        ↓        3-4 meses                                                    ↑
     └──────────────────── upsell ↓                                                            Andrés
                          Curso digital
                          como entrada barata
```

Owner global: **Andrés** lleva todo desde awareness hasta firma. **Cami** entra en kickoff.

## Métricas del embudo (objetivos en estado maduro)

| Etapa | Tasa de conversión objetivo |
|---|---|
| Visita → email capture | 5-8% |
| Email → aplicación | 15-20% |
| Aplicación → score 7+ (cualificado) | 40-50% |
| Cualificado → llamada agendada | 70%+ |
| Llamada → propuesta | 60-70% |
| Propuesta → firma | 40-50% |
| **Visita → cliente firmado** | **~0.15-0.4%** |

Con 50€/día en ads (15-25 clicks cualificados/día), eso da **2-4 clientes/mes** en cruise.

---

## Etapa 1 — Tráfico

**Owner:** Andrés.
**Herramienta:** Google Ads (intent alta) + LinkedIn orgánico + YouTube (long-form).
**Inputs:** keywords de alta intención, contenido evergreen.
**Output:** clicks al landing.

### Keywords de alta intención para Google Ads (presupuesto inicial 50€/día)

Grupo A — Geografía + intención:
- "comprar piso Madrid desde México"
- "invertir en bienes raíces España Colombia"
- "comprar inmueble Marbella desde Latinoamérica"
- "comprar piso España siendo extranjero"

Grupo B — Visa / migración:
- "visa inversionista España 2026"
- "alternativas golden visa España"
- "residencia España por inversión"

Grupo C — Operacional:
- "asesor inmobiliario independiente España"
- "comprador piso España sin comisión"
- "due diligence piso España"

**Match type:** Phrase match, no broad. Negativas: "barato", "gratis", "alquilar".

**Métrica de éxito:** CPC <2.50€ y CTR >3%.

---

## Etapa 2 — Landing

**Owner:** Andrés (ya construido en `shopify/landing/`).
**Herramienta:** Next.js + Vercel.
**Input:** click + UTM.
**Output:** email + nombre en Supabase.

**Métrica de éxito:** 5-8% de visitas dejan email.

### Optimizaciones después del primer batch de tráfico
- A/B test del headline (3 variantes).
- A/B test del CTA ("Apúntate" vs "Reservar plaza" vs "Quiero hablar").
- Heatmap (Microsoft Clarity, gratis) para ver dónde caen.

---

## Etapa 3 — Lead magnet

**Owner:** Andrés (escribir 1 vez, vida útil ~2 años).
**Herramienta:** PDF en Notion → exportar → Drive público.
**Input:** email del landing.
**Output:** PDF entregado + lead marcado en CRM.

### Contenido del PDF — "8 errores que cometen los latinoamericanos al comprar piso en España"

Outline ~12 páginas, lenguaje directo:

1. **Confundir golden visa con la única vía.** Está en extinción 2025. Hay 4 alternativas, una mejor para cada perfil.
2. **No calcular el coste real de transacción.** ITP/IVA, notario, registro, abogado: 10-13% sobre el precio. Mucha gente lo descubre tarde.
3. **Comprar en Madrid pensando que es como Polanco o El Poblado.** Madrid tiene 21 distritos, no todos son comparables. Mapa de barrios premium vs de inversión vs a evitar.
4. **No pedir el "informe simple" del registro antes de firmar arras.** Cargas ocultas, embargos, herencias. Coste: 9€. Lo que ahorras: incalculable.
5. **Ignorar el estado real de la comunidad.** Derramas pendientes, ITE, litigios. Documento clave: acta de la última junta.
6. **Subestimar el riesgo cambiario.** Si compras en EUR con ingresos en MXN/COP, una devaluación te puede salir más cara que el piso.
7. **Pensar que vas a financiar 80% del valor.** No residentes: 50-60% máximo, con condiciones más duras. Planifica el 100% líquido o casi.
8. **No tener residencia fiscal clara.** Doble imposición LATAM-España puede devorar el alquiler. Convenios existen pero hay que aplicarlos.

CTA al final del PDF: **"Si esto te resonó y quieres acompañamiento end-to-end, completa este cuestionario rápido"** → link al formulario de aplicación.

---

## Etapa 4 — Nurture (5 emails en 14 días)

**Owner:** Andrés (escribir 1 vez).
**Herramienta:** ConvertKit / MailerLite.
**Input:** email capturado.
**Output:** lead "calentado" + ~15-20% que aplican.

### Secuencia

| Día | Subject | Idea clave |
|---|---|---|
| 0 | "Tu PDF está aquí (y una pregunta)" | Entrega PDF + pregunta abierta: "¿qué te tiene mirando España?" — invita respuesta directa por email |
| 2 | "El error que me costó 18 meses entender" | Historia personal corta de Andrés. Conecta credibilidad sin venderse |
| 4 | "Por qué Marbella no es un solo mercado" | Educativo: micro-mercados dentro de una ciudad. Demuestra expertise |
| 7 | "Lo que hicieron 3 clientes diferentes" | Mini-casos (anonimizados). Refleja arquetipos: ejecutivo, familia, empresario |
| 11 | "Si quieres que lo veamos contigo" | Invitación a aplicar al acompañamiento. Link al cuestionario. Plazas limitadas explícitas |

**Métricas:** open rate >40%, click rate >5%, respuestas directas (las del día 0 son oro — convierte 3x mejor que email frío).

---

## Etapa 5 — Aplicación

**Owner:** Andrés.
**Herramienta:** Tally (gratis, mejor que Typeform a este volumen).
**Input:** click del email del día 11 o del PDF.
**Output:** registro completo en CRM con respuestas estructuradas.

### Cuestionario (10 preguntas, ~5 min)

1. Nombre completo
2. País de residencia actual
3. Edad (rangos)
4. Patrimonio líquido disponible para esta inversión (rangos: <200k€, 200-500k, 500k-1M, 1M-3M, >3M)
5. ¿En qué horizonte quieres comprar? (próximos 3 meses / 3-6 meses / 6-12 meses / >12 meses / explorando)
6. ¿Para qué uso principal? (uso propio / alquiler / mixto / plan B residencial / diversificación pura)
7. ¿Qué ciudades te llaman? (multi-select: Madrid / Barcelona / Marbella / Costa del Sol / Valencia / Otras)
8. ¿Has comprado antes inmueble fuera de tu país? (sí / no)
9. ¿Qué te frena para hacerlo solo? (texto libre, importante para escuchar)
10. Email + WhatsApp (para contacto)

**Métrica de éxito:** 15-20% de quienes recibieron la secuencia completan el cuestionario.

---

## Etapa 6 — Cualificación con IA

**Owner:** Sistema (automático).
**Herramienta:** n8n + Claude API.
**Input:** respuestas del cuestionario.
**Output:** score 1-10 + razón + tag en CRM.

### Prompt de cualificación (Claude API, modelo Sonnet)

```
Sos un asistente que evalúa si un lead encaja para un servicio de acompañamiento
inmobiliario en España dirigido a inversores latinoamericanos. El servicio
cuesta 4 500-6 500€ y dura 3-4 meses.

Criterios de buen encaje:
- Patrimonio líquido >=200 000€
- Horizonte de compra entre 3 y 12 meses (no "explorando", no "ya compro la
  semana que viene")
- Uso claro (no "no sé todavía")
- Frenos relacionados con distancia/complejidad (lo que sabemos resolver)
- País de residencia LATAM principal: México, Colombia, Argentina, Chile, Perú,
  Venezuela, Panamá, Uruguay

Criterios de mal encaje:
- Patrimonio <200 000€
- Horizonte >12 meses sin urgencia
- Quiere "el más barato"
- Ya tiene la operación cerrada y solo quiere validación
- Vive en Europa (no es nuestro nicho)

Devolveme JSON:
{
  "score": número 1-10,
  "tier": "A" si 8-10, "B" si 6-7, "C" si <=5,
  "razon": frase corta,
  "alertas": lista de cosas a indagar en la llamada
}

Datos del lead:
[respuestas del cuestionario insertadas aquí]
```

### Reglas de routing

- **Tier A (score 8-10):** invitación directa a agendar llamada con Andrés en Cal.com. Slot prioritario en 48h.
- **Tier B (score 6-7):** email pidiendo aclaración de 1-2 puntos antes de agendar. Si responde bien, sube a A.
- **Tier C (score ≤5):** email amable con curso digital (497€) como alternativa. No quema el lead, monetiza el filtro.

**Métrica de éxito:** 40-50% de aplicantes salen tier A o B.

---

## Etapa 7 — Agendamiento

**Owner:** Sistema.
**Herramienta:** Cal.com.
**Input:** click del email tier A/B.
**Output:** llamada de 45 min agendada en agenda de Andrés.

### Configuración Cal.com
- Slots: solo lunes a jueves, 9-12am hora LATAM (servir mejor a los clientes mexicanos y colombianos).
- Buffer: 15 min entre llamadas.
- Pre-llamada automation: enviar email con "qué esperar de esta llamada" + recordatorio 24h y 1h antes.
- Post-llamada automation: enviar resumen + próximos pasos (manual o auto según cómo fue).

**Métrica de éxito:** 70%+ de cualificados agendan llamada (la fricción es baja, debe ser alta).

---

## Etapa 8 — Llamada diagnóstico (45 min)

**Owner:** Andrés.
**Herramienta:** Zoom / Google Meet + grabación con consentimiento + Otter o Whisper para transcripción.
**Input:** llamada agendada + ficha del lead en pantalla.
**Output:** decisión binaria (avanzo o no) + notas estructuradas en CRM.

### Estructura de la llamada — NO se vende, se diagnostica

```
[0-3 min]   Rapport ligero. "¿Cómo estás? ¿Llamada bien?"
[3-8 min]   "Contame qué te tiene mirando España" — escuchar 5 min seguidos
[8-15 min]  Preguntas abiertas sobre motivación profunda
            - ¿Qué pasaría si no hicieras nada en los próximos 12 meses?
            - ¿Quién más decide contigo? ¿Pareja, hijos, asesor?
            - ¿Has visto algún piso ya? ¿Por qué no avanzaste?
[15-25 min] Preguntas estructurales sobre patrimonio y operación
            - Confirmar rango de inversión
            - Confirmar timing real (no aspiracional)
            - Confirmar fuente y disponibilidad de fondos
            - ¿Necesita financiación bancaria? ¿En qué proporción?
[25-35 min] Aquí recién explicás cómo trabajan
            - "Nosotros somos dos: yo en LATAM, Cami en España, papá arquitecto
               en Marbella desde el 97"
            - "Cobramos honorarios fijos, no comisión. Nuestro cliente sos vos"
            - "Esto cuesta entre 4 500 y 6 500€ según ciudad y complejidad"
            - "Dura 3-4 meses, te llevamos hasta llaves"
[35-40 min] Preguntas del cliente
[40-45 min] Cierre suave
            - "¿Tiene sentido para vos?"
            - Si sí: "Te mando propuesta concreta en 24h, miramos al detalle"
            - Si dudoso: "Pensalo y me decís"
            - Si no: "Te mando un par de recursos por si más adelante"
```

### Línea roja de la llamada
- **No prometer resultados.** "Vamos a buscar el mejor encaje que encontremos", no "te conseguimos un piso al 6% de TIR".
- **Si no hay timing claro (>12 meses), no avanzar.** Quemar a Andrés en llamadas de "explorando" es la muerte del modelo.
- **Si el patrimonio no llega, ofrecer curso de 497€.** No quemar el lead.

**Métrica de éxito:** 60-70% de llamadas terminan con "te mando propuesta" honesto.

---

## Etapa 9 — Propuesta

**Owner:** Andrés (con plantilla, ~30 min por propuesta).
**Herramienta:** Documenso o Pandadoc con plantilla, datos auto-rellenados desde CRM.
**Input:** notas de la llamada.
**Output:** PDF/link enviado al cliente con propuesta firmable.

### Estructura de la propuesta (4 páginas)

**Página 1 — Resumen ejecutivo**
- Nombre del cliente
- Diagnóstico en 3 líneas (qué buscás, qué te frena, qué proponemos)
- Honorarios y plazo en grande

**Página 2 — Qué hacemos (alcance)**
- Lista cerrada de entregables: briefing, búsqueda de 30-40 inmuebles, presentación de 8-10, due diligence de 1-2 finalistas, coordinación de cierre, entrega de carpeta digital
- Lo que NO incluye: honorarios de abogado, notario, impuestos, agente vendedor

**Página 3 — Cómo lo hacemos (proceso por semana)**
- Semana 1: briefing y discovery
- Semanas 2-4: búsqueda y filtrado
- Semanas 5-8: visitas, due diligence
- Semanas 9-12: cierre

**Página 4 — Condiciones**
- Honorarios: 5 000€ (o el número específico)
- 50% al inicio, 50% al cierre de operación
- Garantía: si en 4 meses no encontramos ningún inmueble que te genere oferta, reembolsamos 50%
- Confidencialidad mutua
- Firma electrónica

### Plantilla de email que acompaña

```
Asunto: Tu propuesta — [Nombre]

[Nombre], adjunto te paso la propuesta que charlamos.

Resumido:
- Trabajamos 3-4 meses
- Honorario 5 000€, mitad al inicio
- 5 plazas al trimestre, 2 disponibles en este

Si te encaja, firmás abajo y arrancamos el lunes. Cualquier duda, llamame
directamente al [teléfono].

Andrés
```

**Métrica de éxito:** 40-50% de propuestas firman.

---

## Etapa 10 — Firma + primer pago

**Owner:** Sistema (con seguimiento humano si no firma en 48h).
**Herramienta:** Documenso (firma) + Stripe (pago).
**Input:** click "firmar" en el link de propuesta.
**Output:** contrato firmado + 50% cobrado + trigger de onboarding.

### Automation
- Cliente firma → webhook a n8n.
- n8n crea: Notion del cliente, canal de Telegram dedicado, factura en Holvi/Holded, evento en calendario compartido con Cami.
- Email automático: "¡Bienvenido! Esta semana arrancamos. Te llamamos miércoles a las 10am" + ficha de briefing.

### Si no firma en 48h
- Email manual de Andrés: "¿hay algo que no te cierra? hablémoslo".
- Si no firma en 7 días, secuencia de "no era el momento" + curso como alternativa.

---

## Etapa 11 — Kickoff

**Owner:** Andrés + Cami (primer encuentro juntos con el cliente).
**Herramienta:** Zoom de 60 min + Notion del cliente + checklist en Notion.
**Input:** firma confirmada.
**Output:** briefing detallado completo, plan a 12 semanas, próxima reunión.

### Estructura del kickoff
- Presentación de equipo (5 min)
- Briefing profundo (45 min) — preguntas detalladas que no se hicieron antes
- Próximos pasos y comunicación semanal (10 min)

### Notion del cliente — estructura
```
Cliente: [Nombre]
├── Briefing
├── Bitácora semanal
├── Listings revisados
│   ├── Descartados (con razón)
│   ├── En seguimiento
│   └── Finalistas
├── Due diligence
├── Documentos (poder notarial, IBAN, identidad)
├── Partners conectados (abogado, notario, banco, gestor alquiler)
└── Hitos de pago
```

Plantilla creada 1 vez, duplicada por cliente con automation de n8n.

---

## Etapa 12 — Ejecución (12 semanas)

**Owner:** Cami principal, Andrés en sync semanal.
**Herramienta:** todo el stack ya descrito (`10-automatizacion.md`).
**Output:** llaves del piso en mano del cliente.

### Ritmo semanal
- Lunes: Cami revisa avance, actualiza Notion del cliente.
- Martes: llamada con cliente (30 min).
- Jueves: Cami presenta nuevos listings o avance de due diligence.
- Viernes: sync Andrés-Cami de 30 min sobre todos los clientes activos.

### Hitos de progreso (visibles en Notion del cliente)
1. ✅ Briefing completo
2. ✅ Búsqueda inicial (30+ listings revisados)
3. ✅ Shortlist (8-10 con video walk-through)
4. ✅ Visitas en persona (Cami) de 3-5 finalistas
5. ✅ Due diligence técnico-legal del finalista
6. ✅ Oferta presentada
7. ✅ Arras firmadas
8. ✅ Escritura en notaría
9. ✅ Llaves entregadas

---

## Etapa 13 — Segundo pago y cierre formal

**Owner:** Sistema + Andrés.
**Trigger:** hito 8 marcado (escritura firmada).
**Output:** 50% restante cobrado, email de cierre formal, encuesta NPS.

### Email de cierre
```
Asunto: ¡Listo! Y lo que sigue.

[Nombre], felicidades. Acabamos de firmar tu escritura.

En las próximas 48h te llega:
- Carpeta digital con toda la documentación organizada
- Resumen de gastos finales y próximos pagos fiscales
- Recomendaciones de gestor de alquiler si lo decides

Si quieres seguir con nosotros gestionando el activo (declaraciones fiscales,
gestión de alquiler, soporte continuo), el retainer es 300€/mes. Te lo
explicamos en una llamada de 15 min cuando quieras.

Y por último: si conoces a alguien en tu situación, nos das el regalo más
grande mandándole nuestra info. Por cada referido que firma, te devolvemos
500€.

Gracias por confiar.

Andrés y Cami
```

---

## Etapa 14 — Activación de retainer (opt-in)

**Owner:** Andrés (llamada de 15 min).
**Trigger:** 30 días post-llaves.
**Conversión objetivo:** 40-60% de clientes opt-in.

Si firma retainer:
- Stripe subscription 300€/mes activada.
- Calendario fiscal del cliente creado (IRNR, IBI, declaración anual).
- Cami queda como contacto operacional, Andrés review trimestral.

---

## Etapa 15 — Referidos

**Owner:** sistema + Andrés (toque humano).
**Trigger:** mes 3 post-cierre + cada 6 meses después.
**Mecánica:** 500€ por referido que firma. Pagado al firmar primer pago del nuevo cliente.

### Email recordatorio (cada 6 meses, post-cierre)
```
Asunto: ¿Algo que te haya hecho pensar en nosotros?

[Nombre], rápido y sin venderte nada.

A veces sale alguien en una conversación que está pensando en comprar en
España. Si te toca, mandanos su nombre.

Si firma, te devolvemos 500€.

Si no, igual gracias por estar.

Andrés
```

**Métrica de éxito:** 20-30% de clientes generan al menos 1 referido en 12 meses post-cierre.

---

## Plantillas anexas (a redactar antes de lanzar)

- [ ] PDF "8 errores" (~12 páginas)
- [ ] 5 emails de nurture
- [ ] Cuestionario de aplicación Tally
- [ ] Prompt de cualificación IA (testeado con 20 casos)
- [ ] Script de llamada diagnóstico
- [ ] Plantilla de propuesta Documenso
- [ ] Email de propuesta
- [ ] Contrato base (revisado por abogado mercantil)
- [ ] Plantilla Notion del cliente
- [ ] Email de cierre
- [ ] Email de referidos

**Tiempo estimado de redacción de todas las plantillas:** 25-35h. Hacer en mes 0-1, antes de las primeras ventas manuales.

## KPIs a vigilar mensualmente

| Métrica | Objetivo cruise |
|---|---|
| Visitas al landing | 1 500-3 000/mes |
| Email captures | 100-200/mes |
| Aplicaciones completadas | 20-40/mes |
| Cualificados tier A/B | 10-20/mes |
| Llamadas hechas | 8-15/mes |
| Propuestas enviadas | 5-10/mes |
| Firmas | 2-4/mes |
| Retainers activos | crecimiento +1-2/mes |
| Referidos firmados | 0.5-1/mes |

Si alguna métrica está fuera del rango, la etapa anterior está rota. Diagnosticar de abajo hacia arriba.
