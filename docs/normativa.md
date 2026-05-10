# Normativa Colombiana de Propiedad Horizontal aplicable al SaaS

> Resumen ejecutivo y técnico para el diseño funcional, legal y tributario de la plataforma. Cubre copropiedades residenciales, mixtas y comerciales.
>
> Fecha de corte: mayo de 2026.
>
> **Aviso:** documento orientado a producto, no es asesoría legal vinculante. Todo release que toque módulos regulados (cartera, tributario, datos, asambleas) debe pasar por revisión legal externa antes de producción.

---

## 0. Marco jurídico general aplicable

| Norma | Materia | Relevancia para el SaaS |
|---|---|---|
| Constitución Política, art. 15, 51, 58 | Intimidad, vivienda digna, propiedad | Base de protección de datos y de domicilio |
| Ley 675 de 2001 | Régimen de Propiedad Horizontal | Núcleo funcional |
| Ley 1581 de 2012 + Decreto 1377 de 2013 + Decreto 1074 de 2015 | Protección de Datos Personales | Tratamiento de datos de copropietarios, residentes, visitantes |
| Ley 1819 de 2016 (art. 143) y ET art. 19-5 | Tributario PH con explotación comercial | Determinación de contribuyente |
| Ley 2010 de 2019 | Régimen Simple, ajustes ET | Aplicación a PH |
| Ley 2155 de 2021 | Inversión social, Simple, facturación electrónica | Facturación electrónica obligatoria |
| Ley 2300 de 2023 | Protección al consumidor frente a comunicaciones no solicitadas | Comunicaciones a copropietarios |
| Decreto 1625 de 2016 (DUR Tributario) | Reglamentación tributaria | Retenciones, exógena |
| Ley 1314 de 2009 + Decretos 2420/2015, 2483/2018 | Marco contable NIIF/NIF | Grupo 1, 2, 3 |
| Código General del Proceso (Ley 1564 de 2012), art. 422 y ss. | Proceso ejecutivo | Cobro de cuotas |
| Estatuto del Consumidor (Ley 1480 de 2011) | PQR | Atención de quejas |

---

## 1. Ley 675 de 2001 — Régimen de Propiedad Horizontal

### 1.1 Naturaleza jurídica (arts. 1, 4, 32, 33)

- La PH es persona jurídica sin ánimo de lucro, conformada por la totalidad de los propietarios de bienes privados.
- Su objeto es administrar bienes y servicios comunes, manejar recursos y velar por el cumplimiento del reglamento.

**Implicación SaaS:** multi-tenant donde cada copropiedad es un tenant con su propio NIT, reglamento, coeficientes y usuarios.

### 1.2 Asamblea General (arts. 36-49)

| Artículo | Regla | Requerimiento del software |
|---|---|---|
| 37 | Asamblea ordinaria al menos una vez al año, dentro de los tres primeros meses, para aprobar EEFF, presupuesto y elegir órganos | Calendario anual, alertas, generación de orden del día |
| 38 | Naturaleza de las decisiones (mayorías simples, calificadas, unánimes según tema) | Motor de votación con quórum y mayorías parametrizables por tipo de decisión |
| 39 | Convocatoria con antelación mínima de 15 días calendario para ordinarias | Workflow de convocatoria con conteo de días, plantillas |
| 40 | Sanciones por inasistencia según reglamento | Registro de asistencia; cálculo de multas por inasistencia |
| 41 | Reuniones de segunda convocatoria | Quórum reducido al día siguiente entre 8:00 y 21:00 |
| 42 | Reuniones no presenciales y mixtas | Asambleas virtuales con identificación, voto y comunicación simultánea (consolidado tras Decreto 398 de 2020) |
| 43 | Decisiones por comunicación escrita | Votación asincrónica con verificación de identidad |
| 44 | Acta firmada por presidente y secretario, comisión verificadora | Generador de actas, firma electrónica (Ley 527/1999), control de versiones |
| 45-46 | Mayorías calificadas (70%) y unanimidad (cambio de uso, desafectación) | Validación automática por coeficiente |
| 47 | Impugnación de decisiones (2 meses) | Registro y trazabilidad |
| 49 | Coeficientes determinan voto y participación en expensas | Maestro de coeficientes editable solo con auditoría |

**Riesgo si el software no lo cubre:** nulidad de decisiones asamblearias, impugnaciones exitosas, responsabilidad solidaria del administrador.

### 1.3 Consejo de Administración (arts. 53-55)

- Obligatorio en edificios o conjuntos comerciales, mixtos o residenciales **con más de 30 bienes privados** (art. 53).
- Número impar (3 o más).

**SaaS:** módulo de actas de consejo, periodicidad sugerida (mensual), tareas asignadas, votaciones internas, conflicto de intereses.

### 1.4 Administrador (arts. 50-52)

Funciones del art. 51 (17 numerales) mapeadas al producto:

| Función legal | Módulo SaaS |
|---|---|
| Cobro de cuotas y mora | Cartera, facturación, conciliación bancaria |
| Presupuesto y ejecución | Presupuesto + contabilidad |
| Convocatorias e informes | Comunicaciones + asambleas |
| Paz y salvo | Generador automático condicionado a saldo en cero |
| Libros y archivos | Repositorio documental + libros oficiales |
| Seguros | Módulo de pólizas con vencimientos |
| Multas | Módulo sancionatorio con debido proceso |
| Representación legal | Generador de poderes y certificación de representación |

**Riesgo:** responsabilidad civil y penal del administrador (art. 50 par.); el SaaS debe dejar trazabilidad para defensa.

### 1.5 Revisor Fiscal (arts. 56-57)

- **Obligatorio** en PH **comercial o mixta** (art. 56).
- Potestativo en residencial salvo que el reglamento lo exija.
- Contador público; incompatibilidades de Ley 43/1990 y art. 205 C. Co.

**SaaS:** rol "Revisor Fiscal" con acceso de solo lectura a contabilidad, libros, actas, conciliaciones, soportes; generación de dictámenes.

### 1.6 Coeficientes de copropiedad (arts. 25-31)

- Determinan voto, % en expensas, % en bienes comunes.
- Calculados sobre área privada construida ponderada por destinación, uso, localización.
- Modificables solo por reforma de reglamento (mayoría calificada o unánime).

**SaaS:** cálculo automático de cuota = coeficiente × presupuesto / 12, con soporte para módulos contributivos diferenciados (art. 30) cuando el reglamento prevé sectores.

### 1.7 Expensas comunes y cuotas (arts. 29-30)

- Ordinarias (presupuesto) vs extraordinarias (asamblea).

**SaaS:** distinción clara, cuotas extraordinarias vinculadas al acta que las aprobó.

### 1.8 Mora e intereses (art. 30 parágrafo)

- Cobro de intereses moratorios desde el vencimiento.
- Tope: el **Interés Bancario Corriente** certificado por la Superfinanciera, con tope de **1,5 veces** según art. 884 C. Co. (interés de mora máximo legal).
- Exceso: pérdida de intereses + sanciones.

**SaaS:** parametrización de tasa, recálculo automático con tasa vigente certificada, validación anti-usura, estado de cuenta auditable.

### 1.9 Sanciones a propietarios y residentes (arts. 59-61)

- Tipos: amonestación pública/privada, multas sucesivas, restricción al uso de áreas comunes no esenciales.
- Debido proceso: solicitud, descargos, decisión motivada, recurso.

**SaaS:** flujo sancionatorio con plazos, descargos, decisión y registro en hoja de vida del inmueble.

### 1.10 Comunicaciones (arts. 39, 60, 32 y reglamento)

- Convocatorias y notificaciones por los medios establecidos en el reglamento.
- Medios electrónicos válidos si están autorizados en el reglamento o por acuerdo expreso del propietario.

**SaaS:** matriz "tipo de comunicación × medio autorizado × destinatario", trazabilidad de envío, lectura, fallos.

### 1.11 Libros obligatorios y registro de actas

- **Libro de actas de asamblea** (registrado ante Alcaldía Municipal o Curaduría según el municipio, art. 8 Ley 675).
- **Libro de actas de consejo**.
- **Libros de contabilidad** (mayor, diario, auxiliares) según marco NIF.

La PH se inscribe ante la **Alcaldía Municipal** (no Cámara de Comercio) según art. 8.

**SaaS:**
- Foliación electrónica continua y exportable.
- Verificación de inscripción municipal del libro físico y registro de la PH.
- Generación de certificaciones de representación con QR (cuando lo acepte la alcaldía).

**Riesgo:** actas no registradas pierden valor probatorio; nulidad de decisiones.

### 1.12 Fondo de imprevistos (art. 35)

- **Obligatorio**.
- Mínimo: **1% del presupuesto anual de gastos comunes**.
- Uso: necesidades imprevistas; requiere autorización de asamblea salvo urgencia.

**SaaS:**
- Cálculo automático del 1% sobre presupuesto.
- Cuenta contable separada y conciliable.
- Bloqueo de uso sin autorización registrada (acta).

### 1.13 Reservas adicionales

- Voluntarias, aprobadas por asamblea (mejoras, reposición de activos).
- Distintas del fondo de imprevistos.

**SaaS:** múltiples fondos parametrizables.

### 1.14 Bienes comunes y de uso exclusivo (arts. 19-22)

- Comunes esenciales (no enajenables): estructura, fachada, terrenos, accesos.
- Comunes no esenciales: desafectables con quórum calificado.
- **Comunes de uso exclusivo** (parqueaderos, depósitos, terrazas): asignados a un propietario, mantenimiento a su cargo.

**SaaS:** inventario, asignación por inmueble, reservas cuando aplica, control de mantenimiento.

### 1.15 Parqueaderos y áreas comunes para visitantes (art. 22 par.)

- Parqueaderos para visitantes son bienes comunes de **uso y goce general**.

**SaaS:** bitácora de visitantes, reservas de zonas comunes (BBQ, salón social, cancha).

---

## 2. Reformas y proyectos recientes (2024-2026)

- **Decreto 398 de 2020:** habilitó reuniones no presenciales; criterios adoptados de forma permanente.
- **Ley 2300 de 2023:** afecta cobros y comunicaciones (ver §6).
- **Proyectos en trámite (2024-2026):**
  - Profesionalización del administrador (registro y certificación).
  - Límites al cobro de intereses de mora.
  - Publicación electrónica obligatoria de actas.
  - Regulación de Airbnb en PH residencial.

  No sancionados a mayo de 2026.

**Recomendación de producto:** policy engine parametrizable + suscripción a monitoreo legislativo + changelog normativo visible al cliente.

---

## 3. Régimen Tributario de la Propiedad Horizontal

### 3.1 Clasificación por destinación

| Tipo | Norma | Tributación |
|---|---|---|
| Residencial | Ley 675 art. 33 | **No contribuyente** del impuesto sobre la renta (regla general) |
| Mixta o comercial | Ley 675 art. 33 + ET art. 19-5 | **Contribuyente** del régimen ordinario sobre rentas de explotación comercial/industrial de áreas comunes |

### 3.2 ET art. 19-5 (Ley 1819 de 2016, art. 143)

> "Las personas jurídicas originadas en la constitución de propiedad horizontal que destinan algún o algunos de sus bienes, o áreas comunes para la explotación comercial o industrial, generando algún tipo de renta, perderán su calidad de no contribuyentes... Serán contribuyentes del régimen ordinario del impuesto sobre la renta y complementarios y del impuesto de industria y comercio. Se excluyen de lo dispuesto en este artículo las propiedades horizontales de uso residencial."

Hechos generadores típicos: arriendo de salón social a terceros, fachada para publicidad, antenas de telecomunicaciones, parqueaderos para no residentes, tiendas o cafeterías en áreas comunes.

**SaaS:**
- Cuestionario inicial de configuración tributaria.
- Identificación de ingresos sujetos vs no sujetos.
- Cálculo de renta cuando aplique (35% tarifa general 2026, sujeto a cambios).
- Reportes para Formulario 110.

### 3.3 RUT e inscripción en DIAN

- NIT obligatorio.
- RUT obligatorio (Decreto 1625/2016, art. 1.6.1.2.5).
- Responsabilidades en RUT según actividad:

| Responsabilidad | Cuándo aplica |
|---|---|
| 05 - Renta régimen ordinario | PH mixta/comercial con explotación |
| 07 - Retención en la fuente | Si es agente retenedor |
| 09 - Retención IVA | Si es responsable de IVA o gran contribuyente |
| 11 - Ventas régimen común | Si vende bienes/servicios gravados y supera topes |
| 14 - Informante de exógena | Cuando la DIAN lo requiera |

**SaaS:** wizard de configuración tributaria que setea responsabilidades y desbloquea módulos.

### 3.4 IVA

- Cuotas de administración **no son hecho generador de IVA**.
- Otros servicios (alquiler de salón a terceros, p.ej.) sí pueden serlo.
- Topes de no responsable en UVT actualizados anualmente.

**SaaS:** facturación con IVA discriminado, control de topes, libro auxiliar, formulario 300 (bimestral o cuatrimestral).

### 3.5 Retención en la fuente (renta, IVA, ICA)

PH es agente retenedor cuando:
- Es gran contribuyente (acto administrativo DIAN), o
- Cumple supuestos del art. 368-2 ET, o
- Es responsable de IVA con retenciones de IVA aplicables.

**SaaS:**
- Tabla de conceptos de retención (servicios, honorarios, compras, arrendamientos) con tarifas y topes UVT.
- Certificados de retención anuales (art. 381 ET).
- Declaración mensual (Formulario 350).

### 3.6 Régimen Simple de Tributación

- ET arts. 903-916.
- **No aplica a personas jurídicas sin ánimo de lucro.** La PH **no puede acogerse al SIMPLE** (Concepto DIAN 1532/2018).

**SaaS:** bloquear la opción SIMPLE para PH.

### 3.7 Información Exógena (DIAN)

- Resolución anual (Resolución 162/2023 para AG 2024, 188/2024 para AG 2025).
- Formatos relevantes:

| Formato | Contenido |
|---|---|
| 1001 | Pagos y abonos en cuenta |
| 1003 | Retenciones practicadas |
| 1005 | IVA descontable |
| 1006 | IVA generado |
| 1007 | Ingresos recibidos |
| 1008 | Cuentas por cobrar |
| 1009 | Cuentas por pagar |
| 1010 | Socios/asociados |
| 2276 | Ingresos laborales |

**SaaS:** prevalidador DIAN automático, detección de obligación según topes, validación de NIT/CC.

### 3.8 Facturación electrónica (Resolución DIAN 165 de 2023)

- Obligatoria para responsables de IVA y quienes desarrollen actividades comerciales.
- PH con explotación comercial: obligada.
- Documento equivalente (POS) con tope de UVT.
- Documento soporte para operaciones con no obligados.
- Nómina electrónica obligatoria si hay empleados (Resolución 013/2021).
- Cuotas de administración: la posición DIAN mayoritaria es que no son hecho generador de IVA; mientras no haya certeza total, recomendamos **cuenta de cobro electrónica** trazable.

**SaaS:** integración con proveedor tecnológico autorizado, numeración DIAN, envío en tiempo real, validación previa.

### 3.9 ICA municipal y ReteICA

- PH con explotación comercial sujeto de Industria y Comercio en su municipio.
- Cada municipio con su estatuto (Acuerdo 65/2002 Bogotá, 469/2018 Medellín, etc.).
- ReteICA cuando es agente retenedor municipal.

**SaaS:** catálogo de tarifas por municipio, liquidación bimestral o anual, certificados ReteICA.

---

## 4. Contabilidad

### 4.1 Marco normativo

- Ley 1314 de 2009 (convergencia NIIF).
- Decreto 2420/2015 (DUR Contable) modificado por 2483/2018.
- Grupos:
  - Grupo 1: NIIF Plenas.
  - Grupo 2: NIIF para PYMES.
  - Grupo 3: Contabilidad simplificada para microempresas.

### 4.2 Grupo aplicable a la PH

| Grupo | Criterio orientativo |
|---|---|
| Grupo 3 | PH residencial pequeña: ingresos < 6.000 SMMLV, activos < 500 SMMLV, < 10 empleados |
| Grupo 2 | Mayoría de PH medianas y grandes |
| Grupo 1 | Solo si emite valores (raro) |

**SaaS:** parametrización de grupo NIF, plantillas de EEFF distintas.

### 4.3 Plan Único de Cuentas

- No existe PUC oficial específico para PH.
- Se adapta el de comerciantes (Decreto 2650/1993) o se construye conforme a NIIF para PYMES.
- Cuentas típicas:
  - 4135 - Cuotas de administración
  - 4140 - Cuotas extraordinarias
  - 4145 - Intereses de mora
  - 28xx - Fondo de imprevistos
  - 32xx - Fondos sociales y reservas

**SaaS:** plan de cuentas precargado para PH, extensible, mapeo a NIIF.

### 4.4 Estados Financieros obligatorios (NIIF para PYMES, Sección 3)

1. Estado de Situación Financiera.
2. Estado de Resultado Integral.
3. Estado de Cambios en el Patrimonio.
4. Estado de Flujos de Efectivo.
5. Notas.

Aprobación: asamblea ordinaria (Ley 675 art. 38 num. 2), dentro de los 3 primeros meses del año.

**SaaS:** generación automática + flujo borrador → consejo → contador → revisor → asamblea + exportación PDF firmada.

### 4.5 Presupuesto y ejecución

- Aprobado por asamblea (art. 38).
- Base para cálculo de cuotas (presupuesto / 12 / coeficiente).

**SaaS:** construcción por rubros, comparativo presupuesto vs ejecutado, alertas por desviación, re-presupuestación con acta.

---

## 5. Protección de Datos Personales

### 5.1 Marco legal

- Ley 1581/2012 + Decreto 1377/2013 + Decreto 1074/2015 Libro 2 Parte 2 Título 2.
- Ley 1266/2008 (datos financieros, centrales de riesgo).
- Circular Externa 02/2015 SIC y posteriores.

### 5.2 Roles y obligaciones

La PH es **Responsable** y el SaaS es **Encargado** (art. 3 lit. e Ley 1581).

| Obligación | Implicación SaaS |
|---|---|
| Política de Tratamiento (art. 13 Decreto 1377) | Plantilla descargable y editable, publicación en cartelera digital |
| Aviso de privacidad | Generador automático |
| Autorización previa, expresa e informada | Captura digital con timestamp, IP, prueba |
| Registro Nacional de Bases de Datos (RNBD) ante SIC | Asistente de inscripción y actualización (Decreto 090/2018: personas jurídicas con activos > 100.000 UVT) |
| Atención de PQRDS de titulares | Workflow consulta (10+5 hábiles), reclamo (15+8), rectificación, supresión, revocatoria |
| Seguridad de la información | Cifrado, backups, logs, control de acceso, ISO 27001 deseable |
| Transferencia internacional | Contrato de transmisión + garantías + país adecuado o autorización SIC |

### 5.3 Datos sensibles y de menores

- Cámaras en áreas comunes: dato personal (imagen identificable). Política específica + señalización.
- Menores residentes: tratamiento solo en interés superior y con autorización del representante.

### 5.4 Contrato de Transmisión / Encargo

- El SaaS firma contrato de transmisión con cada PH cliente (art. 25 Decreto 1377).
- Cláusulas: finalidad, deberes, confidencialidad, devolución/eliminación, auditorías.

**Riesgo:** sanciones SIC hasta 2.000 SMMLV (más de COP $2.800 millones en 2026), suspensión de actividades, cierre.

---

## 6. Comunicaciones legales

### 6.1 Convocatoria a asamblea

- Antelación mínima 15 días calendario (ordinarias).
- Medio del reglamento; en silencio, escrito con constancia de recibo.
- Medios electrónicos válidos si: reglamento lo permite, asamblea lo aprueba, o consentimiento expreso del propietario.

### 6.2 Ley 527 de 1999 (mensajes de datos)

- Email y WhatsApp con valor probatorio si:
  - Se identifica al emisor.
  - Se conserva en su integridad.
  - Es accesible para consulta posterior.

**SaaS:** correo con DKIM/SPF/DMARC, archivo con sello temporal, opcional integración con notificación certificada (firma electrónica + estampa cronológica de entidad acreditada por ONAC).

### 6.3 Ley 2300 de 2023 — comunicaciones no solicitadas

- Llamadas, SMS y mensajes con fines comerciales o publicitarios.
- Horario: L-V 7:00–19:00, S 8:00–15:00. **No domingos ni festivos.**
- Frecuencia máxima: una vez por semana por canal.
- Registro de exclusión publicitaria.

**Aplicación a PH:**
- Cobranzas por mora: criterios análogos extendidos por SIC y SFC (Circular Externa 018/2022 SIC sobre cobranza).
- Convocatorias y comunicaciones obligatorias **no son comerciales**; buena práctica respetar horarios.

**SaaS:**
- Motor de envíos con horarios y frecuencia.
- Clasificación: convocatoria (obligatoria) vs comercial vs cobranza.
- Lista de exclusión.
- Logs auditables.

### 6.4 Validez de email/WhatsApp

- Email: aceptado por jurisprudencia y Ley 527.
- WhatsApp: aceptado si el propietario lo autoriza expresamente y se conserva la prueba.
- Recomendación: doble canal (email + WhatsApp) para actos relevantes; SMS de respaldo.

---

## 7. Cobro de Cartera

### 7.1 Título ejecutivo (art. 30 par. Ley 675 + CGP art. 422)

> "El administrador certificará... el estado de cuenta del deudor y este, junto con el respectivo recibo de pago, prestará mérito ejecutivo."

Componentes:
1. Certificación del administrador con: identificación de la PH, del inmueble y propietario, cuotas adeudadas y períodos, intereses liquidados, saldo total.
2. Estados de cuenta detallados.
3. Acta o reglamento que respalde la cuota.

**SaaS:**
- Generador con plantilla legalmente validada.
- Adjunción automática de estado de cuenta + acta.
- Firma electrónica del administrador.
- Versión histórica no editable.

### 7.2 Intereses moratorios

- Tope: 1,5 × Interés Bancario Corriente certificado por la Superfinanciera (art. 884 C. Co.).
- Certificación trimestral.
- Anatocismo limitado por art. 886 C. Co.

**SaaS:** actualización automática de tasa SF, validación anti-usura, recálculo histórico al cambio de tasa.

### 7.3 Proceso ejecutivo

- Competencia: Juez Civil Municipal o del Circuito según UVT.
- Procedimiento: ejecutivo singular CGP arts. 422 y ss.
- Medidas cautelares posibles desde el mandamiento.

**SaaS:** generación del paquete ejecutivo (demanda con anexos) listo para abogado, estado del proceso con hitos, integración eventual con Rama Judicial.

### 7.4 Acuerdos de pago

Deben:
- Constar por escrito.
- Incluir capital, intereses corrientes y de mora, plazo, cuotas.
- Cláusula aceleratoria por incumplimiento.
- No condonar derechos sin autorización del consejo o asamblea.

**SaaS:** constructor con tabla de amortización, firma electrónica del propietario, seguimiento automático, disparo de cláusula aceleratoria.

> Reporte a centrales de riesgo: solo con autorización expresa del titular y observando Ley 1266/2008. No es práctica masiva en PH.

---

## 8. Otros aspectos

### 8.1 Reglamento de Propiedad Horizontal

- Obligatorio (Ley 675 arts. 4-5).
- Por escritura pública, registrado en Oficina de Registro de Instrumentos Públicos.

**SaaS:** repositorio versionado, OCR + búsqueda inteligente, vínculos contextuales.

### 8.2 Manual de convivencia

- Complementario al reglamento.
- Aprobado por asamblea o consejo según reglamento.
- No requiere escritura pública.

### 8.3 PQR

- Estatuto del Consumidor (Ley 1480/2011) cuando la PH presta servicios a terceros.
- Para residentes: derecho de petición constitucional (art. 23 CN) y reglamento.
- Plazo sugerido: 15 días hábiles.

### 8.4 Seguros obligatorios

- Art. 15 Ley 675: seguro obligatorio sobre **bienes comunes**, cubriendo **incendio y terremoto**.
- Tomador: la PH; beneficiarios: PH y propietarios.
- Recomendación: incluir manejo (infidelidad de empleados), responsabilidad civil extracontractual, daños a terceros.

**SaaS:** módulo de pólizas con: aseguradora, ramo, vigencia, valor asegurado, prima, cuotas, beneficiarios. Alertas a 60/30/15/5 días. Repositorio de siniestros.

### 8.5 Vigilancia laboral y SST

Si la PH tiene empleados directos:
- SG-SST (Decreto 1072/2015, Resolución 0312/2019).
- PILA (seguridad social y parafiscales).
- Reglamento Interno de Trabajo si > 5 trabajadores.
- Comité de Convivencia Laboral.

**SaaS:** módulo de nómina o integración con software laboral homologado; alertas SST.

### 8.6 Otros impuestos

- Predial: lo paga cada propietario sobre su unidad privada.
- Valorización municipal: puede afectar áreas comunes.
- Impuesto al consumo: solo si la PH revende o intermedia.

---

## 9. Matriz consolidada de riesgos para el SaaS

| # | Riesgo | Norma | Severidad | Mitigación de producto |
|---|---|---|---|---|
| 1 | Nulidad de asamblea por vicios de convocatoria | L. 675 art. 39 | Alta | Workflow obligatorio con check-list y trazabilidad |
| 2 | Pérdida de mérito ejecutivo de cobros | L. 675 art. 30 par. + CGP 422 | Alta | Plantilla certificada, no edición retroactiva |
| 3 | Sanción SIC por tratamiento indebido de datos | L. 1581/2012 | Alta | Política, autorizaciones, RNBD, cifrado, contrato de transmisión |
| 4 | Cobro de intereses por encima de usura | C. Co. art. 884 | Alta | Tasa parametrizada y actualizada, validación anti-usura |
| 5 | Omisión de declaración de renta de PH mixta/comercial | ET 19-5 | Alta | Wizard tributario, alertas de obligación |
| 6 | Multa DIAN por exógena no presentada | ET 651 | Media | Generación y validación automatizadas |
| 7 | Sanción por no facturación electrónica | Res. 165/2023 DIAN | Media | Integración homologada |
| 8 | Multa por no inscripción en RNBD | Decreto 090/2018 | Media | Asistente y recordatorios |
| 9 | Comunicaciones por fuera de horario / sin consentimiento | L. 2300/2023 | Media | Motor de envíos con reglas |
| 10 | Decisiones impugnadas por mayorías mal calculadas | L. 675 art. 45-46 | Alta | Motor de votación con validación por coeficientes |
| 11 | Uso del fondo de imprevistos sin autorización | L. 675 art. 35 | Media | Bloqueo lógico y trazabilidad |
| 12 | Pérdida de actas no foliadas/registradas | L. 675 art. 44 + práctica | Media | Foliación electrónica y registro municipal |
| 13 | Falta de seguro de áreas comunes | L. 675 art. 15 | Media | Módulo de pólizas con alertas |
| 14 | Uso de SIMPLE por error | ET 905 | Baja | Bloqueo en wizard |

---

## 10. Roadmap funcional sugerido (alto nivel)

**MVP (módulos imprescindibles):**
1. Multi-tenant + RUT/NIT.
2. Coeficientes y maestro de inmuebles.
3. Cartera con título ejecutivo y mora controlada.
4. Comunicaciones con consentimiento Ley 1581 + Ley 2300.
5. Generación de actas y libro de actas digital.
6. Contabilidad NIF Grupo 2 con plan de cuentas PH.
7. Presupuesto con fondo de imprevistos automático.

**V2:**
1. Asambleas virtuales con voto por coeficiente.
2. Facturación electrónica y nómina electrónica.
3. Exógena DIAN.
4. Reservas de áreas comunes y parqueaderos.
5. Sancionatorio con debido proceso.
6. Pólizas y SST.

**V3:**
1. Integración judicial (procesos ejecutivos).
2. BI/analytics.
3. App de residentes.
4. Marketplace de proveedores.
5. Firma electrónica certificada nativa.

---

## 11. Fuentes

### Normativa primaria
- Constitución Política de Colombia.
- Ley 675 de 2001 — Régimen de Propiedad Horizontal.
- Ley 1581 de 2012 — Protección de Datos Personales.
- Ley 1266 de 2008 — Habeas Data Financiero.
- Ley 1314 de 2009 — Convergencia a NIIF.
- Ley 1480 de 2011 — Estatuto del Consumidor.
- Ley 1564 de 2012 — Código General del Proceso.
- Ley 1819 de 2016 — Reforma Tributaria Estructural (art. 143).
- Ley 2010 de 2019, Ley 2155 de 2021, Ley 2300 de 2023.
- Estatuto Tributario (Decreto 624/1989), arts. 19-5, 368, 437, 615, 651, 903-916.
- Código de Comercio (Decreto 410/1971), arts. 884, 886.
- Decretos 1377/2013, 1074/2015, 1625/2016, 2420/2015, 2483/2018, 1072/2015, 090/2018, 398/2020.

### Normativa secundaria
- Resoluciones DIAN sobre exógena (162/2023, 188/2024) y facturación electrónica (165/2023, 013/2021).
- Resolución 312/2019 Mintrabajo.
- Circulares SIC sobre habeas data y cobranza.
- Certificación trimestral del Interés Bancario Corriente — Superintendencia Financiera.

### Doctrina y jurisprudencia clave
- Conceptos DIAN sobre PH: 1532/2018, 0357/2019, 0915/2021.
- Corte Constitucional: C-318/2002 (constitucionalidad L.675), C-522/2002, T-630/2018 (debido proceso sancionatorio en PH).
- Consejo de Estado, Sección Cuarta, sobre PH como contribuyente.

### Recursos institucionales
- Confederación Colombiana de Propiedad Horizontal (CCPH).
- Superintendencia de Industria y Comercio (SIC) — Guías de Habeas Data.
- DIAN — Cartilla Renta y Cartilla Facturación Electrónica.
- Consejo Técnico de la Contaduría Pública (CTCP) — Conceptos sobre contabilidad de ESAL y PH.
