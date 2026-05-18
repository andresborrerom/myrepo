# 10 — Automatización

> Hasta dónde se puede automatizar cada producto, qué jamás se debe automatizar, y el stack concreto. Decisión: el negocio entero puede correr al 80-90% automatizado **menos la entrega del servicio del producto 2** — esa parte humana es lo que justifica el ticket de 5 000€.

## Principio rector

"Se gestiona solo" tiene dos lecturas honestas:

- **Sí, automatizable:** todo lo que rodea al servicio (captura, cualificación, contratos, pagos, reportes, recordatorios, curso completo, retainer).
- **No, humano:** las 6-8h de trabajo cualificado que requiere cada cliente del producto 2 (llamadas, visitas, negociación, criterio).

En cruise (mes 9+) los dos socios suman **~40h/semana activas combinadas**, no 120h. Pero tampoco 0h.

**Antipatrón crítico:** automatizar antes de entender el flow real es encerrar en código un proceso roto. **Vendé manualmente los primeros 3-5 clientes**, después automatizá.

## Producto 1 — Curso (95% automatizable)

Es **anzuelo para producto 2 Y producto rentable por sí solo**. La capa automatizable más amplia del negocio.

| Pieza | Automatización | Notas |
|---|---|---|
| Venta | 100% | Hotmart o Shopify, pagos en moneda local LATAM |
| Entrega | 100% | Contenido pre-grabado, login auto post-compra |
| Onboarding | 100% | Secuencia de 5 emails dosificando módulos |
| Upsell a producto 2 | 100% | Email automático en módulo 6: "aplica para acompañamiento" |
| Soporte | 80% | Bot IA entrenado con el contenido + email humano para el 20% restante |
| Actualización de contenido | 0% | Cada 6 meses, ~8h de trabajo. Crítico hacerlo bien (regulación cambia) |

**Resultado:** 4-8k€/mes recurrentes con ~5h/mes de mantenimiento.

## Producto 2 — Acompañamiento (50% del trabajo periférico automatizable)

El alma del servicio NO se automatiza. Lo que rodea, sí.

| Pieza | Automatización | Herramienta |
|---|---|---|
| Captura de lead | 100% | Landing → CRM webhook |
| Pre-cualificación | 100% | Cuestionario Tally/Typeform + scoring IA |
| Agendamiento | 100% | Cal.com con buffer entre llamadas |
| Contrato | 100% | Documenso/Pandadoc con plantilla rellenada desde CRM |
| Cobro | 100% | Stripe con segundo pago programado al hito |
| Búsqueda de inmuebles | 70% | Crawler Idealista/Fotocasa + IA filtra contra briefing |
| Briefing al cliente | 50% | Notion auto-creado por cliente, campos pre-rellenados |
| Reportes semanales | 80% | Notion → email auto con avance |
| Due diligence | 30% | Checklist estructurada, partes humanas claras |
| Coordinación partners | 60% | Plantillas email + Notion compartido con abogado/notario/banco |
| Post-venta | 90% | Activación auto del retainer si aplica |

**Línea roja — jamás se automatiza:**
- Primera llamada con lead cualificado (cierre humano de 5k€).
- Llamadas semanales con cliente activo.
- Visitas presenciales.
- Recomendación final de comprar/no comprar.
- Llamada cuando algo va mal.

**Resultado:** ~6-8h de trabajo humano por cliente (vs 20-30h sin automatización). Permite 3-4 clientes/mes entre dos sin morir.

## Producto 3 — Retainer (70% automatizable)

| Pieza | Automatización |
|---|---|
| Facturación recurrente | 100% Stripe |
| Recordatorios fiscales (IRNR, IBI) | 100% calendario + email |
| Reportes mensuales (renta, ocupación, gastos) | 90% si conectamos API del gestor de alquiler |
| Revisión anual del activo | 0% humana, presencial cada 12 meses |
| Incidencias del piso | 0% humanas, son la razón por la que pagan |

**Resultado:** con 20+ retainers activos, ~3h/semana total + 4-6k€/mes recurrentes.

## Stack — la fontanería transversal

| Función | Herramienta | Coste/mes | Por qué |
|---|---|---|---|
| CRM | **Attio** | ~30€ | Más limpio que HubSpot, escala, API decente |
| Web / landing | Next.js + Vercel | 0-20€ | Ya construido en `landing/` |
| Curso | **Hotmart** | ~50€ + 5-10% | Penetración LATAM brutal, pagos locales |
| Email marketing | **ConvertKit** o MailerLite | 30€ | Secuencias + broadcast, tag por segmento |
| Calendario | **Cal.com** | 12€ | Open source, integra todo |
| Documentos | **Documenso** / Pandadoc | 0-30€ | Contratos auto-rellenados desde CRM |
| Pagos | **Stripe** | 0 fija | El estándar |
| Operaciones | **Notion** | 8€/usuario | Vault interno + portal por cliente |
| Comunicación cliente | **WhatsApp Business API** + Telegram | 0-20€ | Donde están los clientes LATAM |
| Pegamento | **n8n** self-hosted | 5€ | Más barato que Make/Zapier, 100x más flexible |
| IA | **Claude API** | pay-per-use, ~50-150€ | El multiplicador real |
| Contabilidad | Xolo / Holvi / Holded | 30-100€ | Según jurisdicción (`03-fiscal.md`) |
| Soporte | **Plain** o Help Scout | 25€ | Tickets, no chat en vivo |

**Coste total fijo: ~250-350€/mes.** Despreciable vs 5 000€ por cliente.

## La capa de IA — donde está la palanca real

Uso concreto de Claude API en el negocio:

1. **Pre-cualificación de leads.** Cuestionario → prompt evalúa encaje (presupuesto, timeline, motivación) → score 1-10. Solo 7+ entra al calendario de Andrés.
2. **Filtrado de listings.** Crawler trae 200 pisos → Claude filtra contra briefing → top 15 con razones.
3. **Resumen de llamadas.** Grabación (con consentimiento) → Whisper transcribe → Claude resume con acciones + email al cliente listo para revisar.
4. **Primer borrador de comunicaciones.** "Cliente X preguntó esto, respondé en mi tono" → Claude redacta → 30s para editar y enviar.
5. **Análisis financiero del inmueble.** Inputs → cashflow 10 años + sensibilidad → PDF cliente.
6. **Soporte del curso.** Bot entrenado con tu contenido resuelve 80% del soporte.

Cada hora que ahorra vale 100€+. El coste real (~100€/mes en estado maduro) es ridículo.

## Una semana ideal en estado maduro (mes 9+)

**Andrés (Bogotá/Panamá):**
- Lunes 9am: revisión CRM (15 min). Leads pre-cualificados, agenda ya tiene 3 llamadas.
- 3 llamadas con leads cualificados (3h).
- 2 llamadas con clientes activos del producto 2 (2h).
- Sesión de contenido YouTube/newsletter (3h).
- Sync con Cami viernes (1h).
- **Total: ~12-15h activas.**

**Cami (Andalucía):**
- 5-8 visitas presenciales en la semana (10-15h).
- Coordinación con partners (5h).
- Due diligence en terreno (5h).
- Sync con Andrés (1h).
- **Total: ~22-25h activas.**

El resto: descansar, familia, otros proyectos, contenido.

## Roadmap de automatización — orden importa

| Mes | Foco | Razón |
|---|---|---|
| 1-2 | **NADA todavía.** Vender 3-5 clientes manualmente. | Entender el flow real antes de codificarlo |
| 3 | Captura + cualificación + agendamiento + contrato + pago | Quita 5h/cliente nuevo |
| 4 | Reportes al cliente + comunicación con partners | Quita 3h/semana de coordinación |
| 5 | Lanzar curso 100% automatizado | Activa ingreso recurrente pasivo |
| 6-7 | IA para búsqueda + pre-cualificación | El multiplicador grande |
| 8+ | Refinamiento, eliminar fricción descubierta | Cleanup |
| 12 | Evaluar buyer's agent jr en España | Duplicar capacidad sin quemar a Cami |

## Línea roja resumida

Nunca automatizar:

- Primera llamada con lead serio.
- Recomendación final de comprar/no comprar.
- Crisis del cliente (llamada humana en <2h).
- Actualización de contenido del curso ante cambio regulatorio.
