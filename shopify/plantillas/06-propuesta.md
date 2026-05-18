# Plantilla de propuesta

> Documento de 4 páginas para Documenso. Variables marcadas con `{{}}` se reemplazan automáticamente por cliente. Diseño limpio, dos colores máximo, tipografía sobria.

---

## Configuración técnica

- **Plataforma:** Documenso (auto-hospedable, mejor que DocuSign para esta escala)
- **Formato:** PDF generado desde plantilla con variables
- **Firma:** electrónica con timestamp
- **Tras firma:** webhook a n8n → crea Notion del cliente, factura Stripe, evento calendario, email bienvenida

### Variables del template

```
{{cliente_nombre}}
{{cliente_email}}
{{cliente_pais}}
{{fecha_propuesta}}
{{ciudades_objetivo}}
{{rango_inversion}}
{{honorarios_total}}
{{honorarios_inicial}}
{{honorarios_final}}
{{plazo_meses}}
{{fecha_inicio}}
{{fecha_estimada_cierre}}
{{frase_motivacion_cliente}}  // de la pregunta 9 del cuestionario o de la llamada
```

---

## Página 1 — Carátula

```
PROPUESTA DE ACOMPAÑAMIENTO
OPERACIÓN INMOBILIARIA LLAVE EN MANO

Para: {{cliente_nombre}}
Fecha: {{fecha_propuesta}}
Validez: 14 días desde emisión

Andrés [Apellido] | Cami [Apellido]
[Marca]
contacto@[dominio].com
```

Diseño: bloque limpio, espacio en blanco generoso, logo de la marca arriba.

---

## Página 2 — Resumen ejecutivo

### Lo que entendimos de tu caso

{{frase_motivacion_cliente}}

> Ejemplos del tipo de texto:
> "Querés tener una base estable en Madrid para tus viajes de trabajo, sumando una rentabilidad de alquiler vacacional cuando no la uses. La operación tiene que cerrar antes de septiembre 2026 porque ahí cambia tu situación fiscal en México."
>
> O:
> "Estás buscando diversificar 350 000 € en un activo en EUR como cobertura ante volatilidad del peso argentino, sin urgencia de uso personal, priorizando rentabilidad sostenida de alquiler de larga duración."

### Lo que proponemos

Acompañamiento end-to-end por **{{plazo_meses}} meses** desde briefing hasta entrega de llaves, en **{{ciudades_objetivo}}**, con presupuesto operativo en el rango **{{rango_inversion}}**.

| Honorarios | Inicio | Cierre |
|---|---|---|
| **{{honorarios_total}} €** | {{honorarios_inicial}} € (50%) | {{honorarios_final}} € (50%) |

### Plazo estimado

- Inicio: {{fecha_inicio}}
- Cierre estimado: {{fecha_estimada_cierre}}

---

## Página 3 — Alcance del servicio

### Qué incluye

**Fase 1 — Briefing (Semana 1)**
- Sesión de discovery con ambos socios (Andrés + Cami) de 90 min
- Documento de briefing firmado por ambas partes
- Definición de zonas, tipologías, rentabilidad objetivo, criterios de descarte
- Plan de trabajo detallado a 12 semanas

**Fase 2 — Búsqueda y filtrado (Semanas 2-4)**
- Búsqueda en portales públicos + red privada de Cami (agencias boutique, contactos directos, mercado off-market)
- Análisis comparativo de 30-40 inmuebles
- Shortlist de 8-10 con análisis detallado: precio €/m², histórico de zona, cargas registrales, estado de comunidad, potencial de revalorización
- Video walk-through grabado por Cami de los 8-10 (sin necesidad de viajar)

**Fase 3 — Visitas y due diligence (Semanas 5-8)**
- Visitas físicas de Cami a los 3-5 finalistas
- Informe técnico-legal de cada finalista: nota simple registral, acta de última junta de comunidad, estado del ITE/IEE, declaración de obra nueva si aplica, estimación de derramas pendientes
- Negociación de precio en tu nombre con vendedor / agencia
- Coordinación con tasador bancario si hay financiación
- Conexión con abogado mercantil colegiado de nuestra red para revisión legal del contrato

**Fase 4 — Cierre (Semanas 9-12)**
- Acompañamiento en firma de arras (presencial Cami, remoto vos via poder notarial si aplica)
- Coordinación con notario, gestoría, banco
- Asistencia o representación con poder notarial en firma de escritura
- Entrega de carpeta digital completa: escritura, IBI, certificado energético, planos, manuales de electrodomésticos si aplica, contactos de administrador de comunidad
- Setup operativo post-compra: alta en suministros (si aplica), cambio de titular en comunidad, alta IBI

### Qué NO incluye (por transparencia)

- Honorarios de abogado mercantil propio del cliente: 1-1.5% del precio del piso
- Honorarios de notario: 0.1-0.5% (fijado por ley)
- Inscripción en Registro de la Propiedad: 0.1-0.3%
- ITP, IVA o AJD según corresponda
- Tasación bancaria si hay financiación: 300-500 €
- Comisión de agencia inmobiliaria del vendedor: la paga el vendedor, no tú
- Reformas, mobiliario, decoración post-compra
- Gestión de alquiler post-cierre (servicio adicional vía retainer 300 €/mes si lo activás)

---

## Página 4 — Condiciones

### Forma de pago

- **50% al inicio**, antes del briefing: **{{honorarios_inicial}} €**
- **50% al cierre**, al firmar escritura: **{{honorarios_final}} €**
- Pago por transferencia bancaria SEPA o Stripe (incluye cargo +1.5% si elegís Stripe)

### Garantía de devolución

Si en **{{plazo_meses}} meses desde el inicio del trabajo** no logramos identificar ningún inmueble sobre el cual estés en condiciones de presentar oferta formal, te reembolsamos el **50% pagado al inicio**.

Excepciones a esta garantía:
- Si el cliente cambia significativamente los criterios de búsqueda durante el proceso (ej. cambia de ciudad, duplica presupuesto, cambia uso) el plazo se recalcula desde el momento del cambio.
- Si el cliente no responde a las comunicaciones del equipo durante más de 21 días consecutivos, el contrato se suspende y la garantía deja de aplicar.

### Confidencialidad

Ambas partes se comprometen a mantener confidencialidad sobre cualquier información sensible compartida durante el proceso: situación patrimonial, fiscal, familiar, identidad, datos de la operación.

Esta confidencialidad se extiende por **5 años desde la finalización del servicio**.

### Limitación de responsabilidad

[Marca] presta servicios de **asesoramiento y acompañamiento operativo**. No constituye asesoramiento legal, fiscal o de inversión personalizado. Las decisiones finales de compra, financiación y estructura fiscal son del cliente y deben validarse con sus asesores legales y fiscales propios.

La responsabilidad económica máxima de [Marca] ante el cliente queda limitada al importe total de honorarios pagado por el cliente bajo esta propuesta.

### Validez y firma

Esta propuesta tiene validez de **14 días naturales** desde la fecha de emisión. Pasado ese plazo, se requiere reconfirmación de disponibilidad de plaza (5 clientes por trimestre).

Para aceptar, firma electrónicamente en la página siguiente. Tras la firma, recibirás:
1. Email automático de bienvenida con accesos al canal de Telegram dedicado
2. Factura proforma del 50% inicial
3. Link de pago Stripe o datos para transferencia SEPA
4. Invitación a la sesión de briefing (Cal.com)

---

## Página 5 — Firma electrónica

```
He leído y acepto los términos de esta propuesta.


____________________________
{{cliente_nombre}}
{{cliente_email}}
{{cliente_pais}}
Fecha de firma: __________


____________________________
Andrés [Apellido]
Por [Marca]
Fecha: {{fecha_propuesta}}
```

---

## Reglas operativas para el armado de cada propuesta

1. **Tiempo máximo desde llamada a envío:** 24 horas. Pasado ese plazo, el calor de la llamada se enfría.
2. **Personalización mínima obligatoria:** el bloque "Lo que entendimos de tu caso" en página 2 debe ser literal, citando frases del lead. No genérico nunca.
3. **Honorarios:** rango 4 500-6 500 € según fórmula interna:
   - Base: 4 500 €
   - +500 € si Madrid/Barcelona/Marbella/Baleares (mercado complejo)
   - +500 € si rango inversión >800 000 €
   - +500 € si hay financiación bancaria que coordinar
   - +500 € si requiere coordinación fiscal especial (estructura societaria, doble imposición)
4. **Plazo:** default 12 semanas. Sumar +4 semanas si mercado Madrid/Marbella + presupuesto >800k (escasez de oferta). Restar 2 semanas si Valencia/Málaga capital (mercado más rápido).
5. **Validez de 14 días es regla.** No aceptar firmas tras 14 días sin renegociar precio (deja claro el límite de plaza).
6. **Revisión antes de enviar:** Cami siempre revisa la propuesta antes del envío. Sus correcciones del lado España son críticas (zonas mal mapeadas, plazos optimistas, etc.).

---

## Métricas

- **% propuestas enviadas vs llamadas hechas:** objetivo 60-70%.
- **% propuestas firmadas vs enviadas:** objetivo 40-50%.
- **Tiempo medio de firma post-envío:** ideal <72 horas. Si pasa de 7 días, probabilidad de firma cae a <20%.
- **Razones de no-firma:** anotar siempre. Patrones más comunes: "se enfrió", "esposa no aprobó", "encontré algo solo", "voy a esperar".
