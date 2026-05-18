# Plantilla Notion del cliente

> Estructura del workspace operativo que se crea automáticamente al firmar el contrato. Se duplica desde una "Master Template" en Notion y se rellena con los datos del cliente vía API. Es el centro neurálgico de la operación durante los 3-4 meses de servicio.

---

## Estructura jerárquica

```
👤 Cliente: {{cliente_nombre}}
│
├── 📋 Ficha del cliente
├── 📝 Briefing
├── 📅 Plan de trabajo a 12 semanas
├── 🗒️ Bitácora semanal
│
├── 🏠 Inmuebles
│   ├── ⏳ En seguimiento
│   ├── ✅ Shortlist (8-10)
│   ├── 🎯 Finalistas (3-5)
│   └── ❌ Descartados (con razón)
│
├── 🔍 Due diligence
│   └── (página por finalista, plantilla replicable)
│
├── 📄 Documentos del cliente
│   ├── Identidad y NIE
│   ├── Poderes notariales
│   ├── Justificación de fondos
│   └── Documentación bancaria
│
├── 🤝 Partners conectados
│   ├── Abogado mercantil
│   ├── Asesor fiscal
│   ├── Notario
│   ├── Banco / financiación
│   ├── Gestoría
│   └── Administrador de fincas (post-cierre)
│
├── 💰 Hitos de pago
└── 🏁 Post-cierre
    ├── Checklist de cierre
    └── Calendario fiscal del cliente
```

---

## Página: Ficha del cliente

Vista de base de datos con propiedades. Una sola fila por cliente, pero estructurada para reportar y filtrar.

| Propiedad | Tipo | Ejemplo |
|---|---|---|
| Nombre completo | Text | {{cliente_nombre}} |
| Email | Email | {{cliente_email}} |
| WhatsApp | Phone | {{cliente_telefono}} |
| País de residencia | Select | México / Colombia / Argentina / Chile / Perú / Otro |
| Edad rango | Select | 25-34 / 35-44 / 45-54 / 55-64 / 65+ |
| Estado civil | Select | Soltero / Pareja / Casado / Otro |
| Decisores adicionales | Text | "Esposa (Lucía, lucia@email.com)" o "Solo él" |
| Patrimonio líquido | Select | 200-500k / 500k-1M / 1M-3M / >3M |
| Fuente principal de ingresos | Text | "CEO empresa textil" / "Director regional MNC" / "Rentista" |
| Idiomas | Multi-select | Español / Inglés / Otro |
| Zona horaria | Select | GMT-6 (CDMX) / GMT-5 (Bogotá) / GMT-3 (Buenos Aires) |
| Fecha de firma contrato | Date | 2026-06-12 |
| Tier de cualificación | Select | A / B |
| Origen del lead | Select | Google Ads / LinkedIn / YouTube / Referido / Newsletter |
| Status operación | Select | Briefing / Búsqueda / Visitas / Due diligence / Negociación / Arras / Escritura / Cerrado / Post-venta |

---

## Página: Briefing

Estructura de la sesión inicial de 90 min. Se completa durante la llamada de kickoff y se firma por ambas partes al finalizar (anexo al contrato).

### Bloque 1 — Contexto vital
- ¿Qué te llevó a mirar España específicamente?
- ¿Qué pasó hace poco que aceleró la decisión?
- ¿Cómo encaja esto en tu vida los próximos 5 años?

### Bloque 2 — Operación
- Uso prioritario: [uso propio / alquiler larga / alquiler vacacional / mixto / plan B / diversificación]
- Ciudades en orden de preferencia: 1. _____ 2. _____ 3. _____
- Tipología:
  - Estudio / 1 dorm / 2 dorm / 3 dorm / 4+ dorm
  - Casa unifamiliar / Adosado / Piso en edificio
- Antigüedad aceptable: [obra nueva / reformado / a reformar / cualquier]
- Plantas: bajo / intermedio / alto / ático
- Exterior / interior / cualquier
- Aparcamiento: imprescindible / deseable / indiferente
- Ascensor: imprescindible / deseable / indiferente
- Características no negociables: _____
- Características descartables (rotundamente no): _____

### Bloque 3 — Económico
- Rango total presupuesto inversión (precio piso + 12% costes): _____ a _____
- Financiación bancaria: sí / no
  - Si sí: % financiación deseado, plazo deseado
- Origen y disponibilidad de fondos:
  - País donde están: _____
  - Tiempo necesario para movilizarlos: _____
- Tolerancia a riesgo cambiario (1-10): _____
- Rentabilidad bruta mínima esperada si es alquiler: _____%

### Bloque 4 — Restricciones y plazos
- Fecha tope de cierre (si existe): _____
- Disponibilidad para viajar a España durante el proceso: _____
- Voluntad de firmar por poder notarial: sí / no
- Restricciones fiscales conocidas: _____

### Bloque 5 — Compromisos del cliente para con el proceso
- Disponibilidad para llamada semanal de 30 min: día y hora preferida _____
- Canal preferido de comunicación: Email / WhatsApp / Telegram
- Tiempo máximo de respuesta esperado: _____
- Documentos a aportar en próximos 14 días:
  - [ ] Copia documento identidad apostillada
  - [ ] Justificación de fondos
  - [ ] NIE (si ya lo tiene) o plan de obtención
  - [ ] Información fiscal de su país

### Firma del briefing
- Fecha: _____
- Firma cliente: _____
- Firma Andrés: _____
- Firma Cami: _____

---

## Página: Plan de trabajo a 12 semanas

Tabla con columnas: Semana | Fase | Entregables esperados | Owner | Status

| Semana | Fase | Entregables | Owner | Status |
|---|---|---|---|---|
| 1 | Briefing | Briefing firmado, plan a 12 sem | Andrés + Cami | ⬜ |
| 2 | Búsqueda I | Primeros 15 inmuebles revisados | Cami | ⬜ |
| 3 | Búsqueda II | 30 inmuebles totales, primer cribado | Cami | ⬜ |
| 4 | Filtrado | Shortlist 8-10 con análisis | Cami | ⬜ |
| 5 | Visitas I | Video walk-through de los 8-10 | Cami | ⬜ |
| 6 | Visitas II | Visita física de 3-5 finalistas | Cami | ⬜ |
| 7 | Due diligence | Informe técnico-legal finalistas | Cami + abogado | ⬜ |
| 8 | Decisión | Cliente elige uno | Cliente | ⬜ |
| 9 | Negociación | Oferta presentada | Cami | ⬜ |
| 10 | Arras | Firma de contrato de arras | Cami + abogado | ⬜ |
| 11 | Cierre I | Coordinación notario, banco, gestor | Cami | ⬜ |
| 12 | Escritura | Firma escritura + entrega llaves | Cami | ⬜ |

Buffer: +2 semanas habituales según mercado y financiación.

---

## Página: Bitácora semanal

Database con una entrada por semana del cliente.

| Propiedad | Tipo |
|---|---|
| Semana # | Number |
| Fecha de actualización | Date |
| Avance objetivo | Text |
| Avance real | Text |
| Bloqueadores | Text |
| Próximos pasos cliente | Checkbox |
| Próximos pasos Cami | Checkbox |
| Próximos pasos Andrés | Checkbox |
| Notas adicionales | Text |
| Link grabación llamada semanal | URL |

**Reglas:**
- Cami actualiza cada lunes antes del mediodía España.
- Andrés revisa cada lunes por la tarde y agrega notas si aplica.
- Cliente tiene acceso de lectura permanente.

---

## Página: Inmuebles

Base de datos central con todos los inmuebles que se evalúan. Una fila por inmueble.

### Propiedades de la database

| Propiedad | Tipo | Notas |
|---|---|---|
| Referencia | Title | Código interno: BIS-001, BIS-002... |
| Status | Select | En seguimiento / Shortlist / Finalista / Descartado |
| Razón descarte | Text | Solo si Status = Descartado |
| Dirección | Text | Calle y número (cuando esté disponible) |
| Distrito / barrio | Text | |
| Ciudad | Select | |
| Precio publicado | Number | EUR |
| Precio €/m² | Formula | =precio / m2 |
| Superficie m² | Number | Útil, no construida |
| Habitaciones | Number | |
| Baños | Number | |
| Año construcción | Number | |
| Año última reforma | Number | |
| Planta | Select | Bajo / Intermedio / Alto / Ático |
| Ascensor | Checkbox | |
| Aparcamiento | Checkbox | |
| Exterior | Checkbox | |
| Estado | Select | Reformado / A reformar / Obra nueva |
| Cargas detectadas | Text | De nota simple registral |
| Comunidad — derramas pendientes | Text | |
| Comunidad — cuota mensual | Number | EUR |
| Tipo de licencia (si aplica VUT) | Select | Vacacional vigente / No vacacional / Posible solicitar |
| Link Idealista | URL | |
| Link Fotocasa | URL | |
| Link otro portal | URL | |
| Agente / vendedor | Text | |
| Notas Cami | Text | Impresión tras revisión |
| Score interno (1-10) | Number | Cami lo asigna |

### Vistas predefinidas

1. **Tabla por status** (agrupada por status, vista principal)
2. **Kanban por status** (visual para la reunión semanal)
3. **Calendario de visitas** (filtrar por status = Finalista)
4. **Shortlist para cliente** (filtro Status = Shortlist o Finalista, columnas reducidas: ref, dirección, precio, €/m², notas)

---

## Página: Due diligence (plantilla replicable por finalista)

Una página completa por cada finalista. Se duplica desde plantilla.

### Estructura

**1. Información básica**
- Inmueble: [link a database Inmuebles]
- Fecha de inicio DD: _____
- Responsable interno: Cami

**2. Documentos obtenidos**
- [ ] Nota simple registral (9€, pedir en registradores.org)
- [ ] Última acta de junta de comunidad
- [ ] Certificado del administrador de comunidad sobre estado de pagos
- [ ] Certificado de eficiencia energética
- [ ] Cédula de habitabilidad
- [ ] Boletines de las instalaciones (gas, electricidad, agua)
- [ ] Estado del ITE/IEE si edificio >45 años
- [ ] Recibos del IBI últimos 3 años
- [ ] Estatutos de la comunidad
- [ ] Licencia de actividad si comercial o VUT
- [ ] Plano oficial del catastro

**3. Análisis legal (rellenado por abogado mercantil de la red)**
- Titularidad real coincide con vendedor declarado: sí / no
- Cargas hipotecarias: importe y plazo de cancelación
- Embargos, anotaciones, demandas: detalle
- Limitaciones urbanísticas: detalle
- Conformidad con estatutos de comunidad: sí / no
- Riesgos legales detectados: detalle

**4. Análisis técnico**
- Estado real visitado (fotos):
- Patologías visibles (humedades, grietas, instalaciones obsoletas):
- Coste estimado de reforma si aplica:
- Necesidad de obra en plazo cercano por la comunidad:

**5. Análisis económico**
- Precio publicado: _____
- Precio €/m² (referencia zona): _____
- Margen estimado de negociación: _____
- Coste estimado total (precio + 12%): _____
- Si alquiler: renta estimada y rentabilidad bruta esperada
- Si uso propio: comparable con coste de alquiler equivalente en zona

**6. Decisión recomendada**
- Recomendación de Cami: AVANZAR / DESCARTAR / NEGOCIAR PRECIO
- Razón:
- Si avanzar: precio máximo recomendado: _____

**7. Decisión cliente**
- Fecha de presentación al cliente: _____
- Decisión: _____
- Observaciones del cliente: _____

---

## Página: Documentos del cliente

Carpeta organizada con los documentos del cliente. Subpáginas o secciones para:

1. **Identidad y NIE**
   - Pasaporte / DNI apostillado
   - NIE (Número de Identificación de Extranjero)
   - Solicitud de NIE si todavía no lo tiene
   
2. **Poderes notariales**
   - Poder específico para esta operación (si firmamos por él)
   - Apostilla de La Haya del poder
   - Traducción jurada si aplica

3. **Justificación de fondos**
   - Extractos bancarios últimos 6 meses
   - Declaraciones de impuestos últimos 3 años
   - Si fuente empresarial: documentación societaria

4. **Documentación bancaria**
   - Apertura de cuenta bancaria en España (necesaria para escriturar)
   - Solicitud de hipoteca si aplica
   - Tasación

**Reglas de manejo:**
- Todos los documentos se suben encriptados.
- Cami y Andrés tienen acceso, cliente tiene acceso permanente.
- Backup automático mensual a almacenamiento privado.

---

## Página: Partners conectados

Database con los profesionales externos involucrados en este cliente concreto.

| Profesional | Tipo | Nombre | Empresa | Email | Teléfono | Honorarios estimados | Status |
|---|---|---|---|---|---|---|---|
| Abogado mercantil | Externo | _____ | _____ | _____ | _____ | _____ | Confirmado / Pendiente |
| Asesor fiscal | Externo | _____ | _____ | _____ | _____ | _____ | _____ |
| Notario | Externo | _____ | _____ | _____ | _____ | _____ | _____ |
| Banco | Externo | _____ | _____ | _____ | _____ | n/a | _____ |
| Gestoría | Externo | _____ | _____ | _____ | _____ | _____ | _____ |

---

## Página: Hitos de pago

| Hito | Importe | Status | Fecha esperada | Fecha real | Factura |
|---|---|---|---|---|---|
| 1er plazo honorarios (50%) | {{honorarios_inicial}} € | ⬜ | Día de firma | _____ | [link factura] |
| 2do plazo honorarios (50%) | {{honorarios_final}} € | ⬜ | Al firmar escritura | _____ | _____ |
| Arras inmueble (10%) | _____ € | ⬜ | Semana 10 | _____ | _____ |
| Escritura inmueble (90%) | _____ € | ⬜ | Semana 12 | _____ | _____ |
| ITP / IVA | _____ € | ⬜ | 30 días post-escritura | _____ | _____ |
| Notario, registro, gestoría | _____ € | ⬜ | Semana 12 | _____ | _____ |
| Honorarios abogado mercantil | _____ € | ⬜ | Semana 10-12 | _____ | _____ |

---

## Página: Post-cierre

### Checklist de cierre operativo

- [ ] Llaves entregadas al cliente o a persona designada
- [ ] Cambio de titular en suministros: luz, agua, gas, internet
- [ ] Alta o cambio de titular comunidad de propietarios
- [ ] Cambio de titular IBI (vía gestoría)
- [ ] Carpeta digital completa entregada al cliente
- [ ] Email de cierre formal enviado
- [ ] Encuesta NPS enviada
- [ ] Factura final 50% emitida y cobrada
- [ ] Pago a partners externos completado (abogado, notario)
- [ ] Comisión a referidor pagada si aplica

### Calendario fiscal del cliente (próximos 12 meses)

Para no residentes con inmueble en alquiler:
- Mensualmente: contabilizar ingresos de alquiler
- Trimestralmente: declaración Modelo 210 (IRNR) — primeros 20 días del mes posterior a cada trimestre
- Anualmente: Modelo 211 si vendieran (no aplica salvo venta)
- Anualmente: declaración patrimonio si supera umbrales

Para no residentes con inmueble de uso propio:
- Anualmente: imputación de renta inmobiliaria (Modelo 210), 1.1% o 2% del valor catastral

Cami programa recordatorios automáticos al cliente 15 días antes de cada vencimiento.

---

## Automation de creación del Notion del cliente

Al firmar el contrato, n8n ejecuta:

1. Duplica la página "Master Template — Cliente Nuevo".
2. Renombra a "Cliente: {{cliente_nombre}}".
3. Rellena propiedades de "Ficha del cliente" con datos del cuestionario y del briefing previo.
4. Genera el calendario de 12 semanas con fechas calculadas desde la firma.
5. Invita al cliente con permisos de lectura.
6. Invita a Cami con permisos de edición.
7. Crea canal de Telegram dedicado con bot que avisa cuando hay actualizaciones en la bitácora.
8. Envía email de bienvenida con link al workspace y al canal.

Coste técnico: ~15 min de setup por cliente. Si se automatiza 100%, ~30 segundos.

---

## Reglas de uso del workspace

- **Cliente** tiene acceso de lectura a todo excepto: notas internas de Cami, scoring interno, conversación entre Andrés y Cami.
- **Cami** edita todo lo operativo: Inmuebles, DD, Bitácora, Documentos.
- **Andrés** revisa Bitácora semanal, comenta cuando sea necesario, lidera comunicación con cliente.
- **Reuniones internas Andrés-Cami** los viernes: revisar workspace de cada cliente activo, alinear próxima semana, decidir bloqueadores.

---

## Vista de dashboard interno (separado del cliente)

Notion database superior agrupando todos los clientes activos:

| Cliente | Status | Semana | Próximo hito | Bloqueadores | Riesgo |
|---|---|---|---|---|---|
| Cliente A | Búsqueda | 3/12 | Shortlist viernes | Ninguno | 🟢 |
| Cliente B | Visitas | 6/12 | Visita final martes | Doc del cliente pendiente | 🟡 |
| Cliente C | Escritura | 12/12 | Firma jueves | Ninguno | 🟢 |

Solo Andrés y Cami acceden a este dashboard.
