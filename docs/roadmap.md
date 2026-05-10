# Roadmap

Filosofía: **vender antes de construir todo**. La suegrita conoce administradoras y consejos. Conseguimos 1–3 copropiedades piloto comprometidas (gratis los primeros meses) antes de escribir mucho código, para validar que el flujo real corresponde a lo que asumimos.

## Fase 0 — Diseño y validación (semanas 1–3)

- [x] Crear repo, ramas, gobernanza
- [ ] Documentos fundacionales (este conjunto de `docs/*.md`)
- [ ] Entrevistar a la suegrita: walkthrough de un mes típico (cartera, asamblea, cierre)
- [ ] Compromiso de **2 copropiedades piloto** (firmar carta de intención)
- [ ] Diseñar flujos clave en Figma (5 pantallas máximo): login, dashboard admin, estado de cuenta unidad, registrar pago, citar asamblea
- [ ] Validación de los flujos con la suegrita y un administrador externo

**Entregable:** brief firmado + 5 pantallas validadas + lista de must-have del MVP.

## Fase 1 — MVP funcional cerrado (semanas 4–10)

Objetivo: que una copropiedad pequeña (≤ 60 unidades, residencial pura, sin explotación comercial) pueda **dejar de usar Excel** con esta herramienta. No buscamos vender todavía, buscamos dejar de avergonzarnos.

Alcance:

1. **Onboarding de copropiedad**: cargue masivo de unidades, coeficientes, propietarios desde Excel.
2. **Generación de facturas mensuales** automáticas con expensas ordinarias y conceptos fijos por unidad.
3. **Registro de pagos** manual (consignación, efectivo) con imputación correcta (mora primero, luego capital antiguo).
4. **Estado de cuenta por unidad** y **cartera consolidada** (qué se debe).
5. **Cálculo automático de intereses moratorios** con tasa Superfinanciera mensual.
6. **Comunicaciones por email** (Resend) con plantillas: cobro, recordatorio, recibo de caja.
7. **Generación de paz y salvo** PDF.
8. **Dashboard administrador**: ¿quién debe?, ¿cuánto entró este mes?, ¿qué tengo que hacer?
9. **Exportación contable** en CSV para que la contadora externa la suba a su software.
10. **Auditoría básica** de toda acción.
11. **Multi-tenant** desde día uno (varias copropiedades por administradora).
12. **Política de datos personales** publicada y captura de autorización.

**Fuera de alcance MVP:** facturación electrónica DIAN, WhatsApp, asambleas virtuales, app móvil, contabilidad de partida doble interna (lo hace la contadora externa por ahora).

**Criterio de éxito:** la suegrita opera 1 copropiedad piloto durante 1 mes completo y dice "ya no quiero volver a Excel".

## Fase 2 — Piloto comercial (semanas 11–18)

- [ ] **Pasarela de pagos Wompi** (PSE + tarjeta + Nequi). Webhook de confirmación → conciliación automática.
- [ ] **WhatsApp Cloud API**: cobros y recordatorios.
- [ ] **Portal del residente** (lectura de su estado, descarga de paz y salvo, pago en línea).
- [ ] **Acuerdos de pago** con seguimiento.
- [ ] **PQRs** básicos.
- [ ] **Reservas de áreas comunes** simple.
- [ ] **Onboarding self-service** para nuevas copropiedades.
- [ ] **Plan de precios definido** (ver §Monetización).
- [ ] **Migración** de datos desde Sygo / Excel / SIIGO documentada.

**Criterio de éxito:** 5 copropiedades pagando, retención ≥ 80% al tercer mes, NPS ≥ 30.

## Fase 3 — Cumplimiento ampliado (semanas 19–30)

- [ ] **Asambleas virtuales/mixtas** con votación por coeficiente, registro de asistencia, generación de acta.
- [ ] **Contabilidad interna** con partida doble (PUC adaptado), periodos, EEFF mensuales y anuales.
- [ ] **Facturación electrónica DIAN** vía proveedor autorizado para copropiedades con explotación comercial.
- [ ] **Retenciones** (renta, IVA, ICA) cuando la PH es agente retenedor.
- [ ] **Información exógena** DIAN.
- [ ] **Conciliación bancaria** automática (carga de extracto Bancolombia, Davivienda, BBVA).
- [ ] **Cobro jurídico** con generación automática de título ejecutivo.
- [ ] **App móvil** del residente (PWA o nativa con Expo).

**Criterio de éxito:** una copropiedad mixta puede usarnos sin software complementario.

## Fase 4 — Crecimiento y diferenciación (mes 7+)

Lo que detectemos del benchmark como gap: ver `docs/benchmark.md` § Oportunidades. Probables candidatos:

- **IA conversacional para residentes** (preguntar saldo por WhatsApp).
- **Predicción de mora** y priorización de gestión de cartera.
- **Marketplace de proveedores** verificados (vigilancia, ascensores).
- **Reportes ejecutivos** automáticos para el consejo.
- **Integración con cámaras / IoT** (visitantes con QR).
- **Multi-idioma** (inglés para extranjeros propietarios en Cartagena/Medellín).

## Monetización

Modelo recomendado: **SaaS por unidad/mes**, sin contratos de permanencia.

Hipótesis (a validar con suegrita y benchmark):

| Plan | Unidades | Funciones | Precio sugerido (COP/mes) |
|---|---|---|---|
| Esencial | hasta 50 | Cartera, pagos manuales, comunicaciones email | COP 1.000–2.000 / unidad |
| Profesional | 51–200 | + Pasarela, WhatsApp, portal residente, asambleas | COP 1.500–3.000 / unidad |
| Empresarial | 200+ | + Facturación electrónica, retenciones, exógena, multi-conjunto | COP 2.500–4.500 / unidad |

Mínimo mensual por copropiedad: COP 80.000 para que el costo unitario no haga inviable copropiedades pequeñas.

Cargos adicionales:
- Implementación / migración: única vez, COP 200.000–800.000 según tamaño.
- WhatsApp masivo por encima de cuota: pass-through del costo Meta + 20%.

Costos variables a cubrir por nosotros: Wompi (~3%), facturador electrónico (~$30k/mes), email (incluido en Resend).

**Margen objetivo:** ≥ 75% bruto. Todo lo que sobra después de infra + comisiones va para la suegrita.

## Estrategia comercial (resumen)

- **Suegrita** abre puertas con su red (administradoras y consejos en Bogotá).
- Demo presencial de 30 min, fórmula "muéstrame tu cartera en Excel y te la paso al sistema en 10 minutos".
- Primer mes gratis con migración asistida.
- Programa de referidos: 1 mes gratis al referente y al referido.
- Contenido educativo en YouTube/blog (cómo cumplir Ley 675 paso a paso) para SEO.
