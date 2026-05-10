# Modelo de Dominio — Propiedad Horizontal Colombia

Este documento define las entidades, relaciones e invariantes del dominio. Es la guía para el diseño de base de datos, el modelo de la API y la nomenclatura en la UI. **El vocabulario aquí es ley** — la suegrita debe reconocer cada término sin diccionario.

## Convenciones

- Los IDs internos son UUID v7 (orden temporal + privacidad).
- Toda entidad tiene `created_at`, `updated_at`, `deleted_at` (soft delete).
- Toda entidad pertenece a un `tenant_id` (la administradora) y, cuando aplica, a un `copropiedad_id`.
- Montos en pesos colombianos enteros (no centavos), `bigint`.
- Coeficientes en `decimal(9,7)` (suma exacta = 1.0000000).

## 1. Tenancy

### `Administradora` (tenant)
La empresa o persona natural que administra una o varias copropiedades. Es el cliente que paga la suscripción.
- `nit`, `razon_social`, `tipo_persona` (natural | jurídica)
- `responsabilidades_tributarias[]` (RUT)
- `regimen` (común | simple | no responsable de IVA)

### `Usuario`
Persona física que entra al sistema. Distinto de `Residente`/`Propietario` porque un mismo usuario puede tener varios roles en varias copropiedades.
- `email`, `telefono`, `nombre`, `documento`
- `roles[]` por copropiedad: `admin_general`, `administrador`, `consejo`, `revisor_fiscal`, `propietario`, `residente`, `arrendatario`, `porteria`

## 2. Copropiedad

### `Copropiedad`
Equivale al "conjunto residencial", "edificio", o "PH" en Ley 675.
- `nit` propio (la PH es persona jurídica sin ánimo de lucro)
- `tipo` (residencial | comercial | mixto) — **importante para tributación**
- `direccion`, `municipio_dane`, `estrato`
- `numero_unidades_total`
- `coeficiente_total` (debe ser 1.0000000)
- `fecha_constitucion`, `escritura_publica`
- `tiene_explotacion_comercial` (boolean) — define si paga renta y debe facturar electrónicamente
- `regimen_tributario_ph`
- `mes_cierre_fiscal` (default diciembre)
- `dia_corte_facturacion` (ej. 25 de cada mes)
- `dia_vencimiento` (ej. 10 del mes siguiente)
- `tasa_interes_mora_metodo` (bancario corriente | pactado en reglamento)

### `Edificio` / `Torre` / `Bloque`
Subdivisión opcional de la copropiedad.

### `Unidad`
Bien privado. Puede ser apartamento, casa, local, oficina, parqueadero independiente, depósito.
- `numero` (visible: "Apto 502 Torre B")
- `tipo` (apartamento | casa | local | oficina | parqueadero | deposito)
- `area_m2`
- `coeficiente` (decimal(9,7))
- `propietario_id` (FK a `Persona`)
- `tenedor_id` (nullable — arrendatario)
- `parqueaderos_asignados[]`
- `depositos_asignados[]`
- `estado` (habitada | desocupada | en_obra)

**Invariante:** `Σ coeficiente de unidades activas = 1.0000000` por copropiedad.

### `Persona`
Propietario o residente. Una persona puede ser propietaria de varias unidades en varias copropiedades.
- `tipo_documento`, `numero_documento`, `nombre`, `apellido` (o `razon_social`)
- `email`, `telefono_movil`, `telefono_fijo`
- `direccion_correspondencia`
- `autorizacion_tratamiento_datos` (fecha, IP, versión política) — Ley 1581
- `autorizacion_factura_electronica` (canal preferido)

## 3. Gobierno

### `Asamblea`
- `tipo` (ordinaria | extraordinaria)
- `modalidad` (presencial | virtual | mixta) — Ley 675 art. 42 modificado
- `convocatoria_fecha`, `medios_convocatoria[]`
- `primera_convocatoria`, `segunda_convocatoria`
- `quorum_requerido`, `quorum_alcanzado`
- `acta_id` (FK)

### `PuntoOrden`
Cada ítem del orden del día. Puede llevar votación.

### `Votacion`
- `tipo` (mayoría_simple | calificada_70 | calificada_80 | unánime)
- `metodo` (mano_alzada | secreta | virtual)
- Se cuenta por **coeficiente**, no por número de personas (Ley 675 art. 45).

### `Consejo`
Miembros del consejo de administración con periodo de vigencia.

### `RevisorFiscal`
Persona o firma. Obligatorio en PH comercial o mixta (Ley 675 art. 56).

### `Acta`
Documento firmado. Tiene número consecutivo por copropiedad y por órgano. Inalterable una vez firmada (versionado append-only para correcciones por adendo).

## 4. Contabilidad y presupuesto

### `Presupuesto`
- `año`, `aprobado_en_asamblea_id`
- `version` (puede haber adiciones presupuestales)
- Lleva ítems por cuenta contable.

### `PUC` — Plan Único de Cuentas
Adaptado al sector. Permite jerarquía estándar (clase, grupo, cuenta, subcuenta, auxiliar).

### `Asiento`
Partida doble. Inmutable después de cerrado el periodo.

### `Periodo`
Mensual. Estados: `abierto` | `en_revision` | `cerrado`. Cierre genera estados financieros snapshotted.

### `EstadoFinanciero`
Snapshot mensual y anual. Incluye Estado de Situación Financiera, Estado de Resultados, Cambios en el Patrimonio, Flujos de Efectivo, Notas. NIIF Grupo 2 o 3 según tamaño.

### `FondoImprevistos`
Cuenta especial. Ley 675 art. 35: aporte mínimo **1%** del presupuesto mensual de gastos comunes. El sistema **debe alertar** si el aporte queda por debajo.

### `Reserva` (otros fondos especiales)
Reserva legal, fondo de mantenimiento mayor, etc. — definidos por la asamblea.

## 5. Cartera (cuentas por cobrar)

### `Concepto`
Tipo de cobro: `expensa_ordinaria`, `expensa_extraordinaria`, `parqueadero`, `salon_social`, `cuota_extraordinaria`, `multa`, `intereses_mora`, `papelería`, `otros`.

### `Factura` / `CuentaCobro`
Emitida mensualmente por unidad. Si la PH es facturador electrónico DIAN, es `factura_electronica`; si no, es `cuenta_cobro` (no es venta de bienes/servicios para no contribuyentes).
- `unidad_id`, `periodo`, `fecha_corte`, `fecha_vencimiento`
- `items[]` (concepto, valor, base coeficiente o fijo)
- `total`, `saldo`
- `estado` (pendiente | pagada_parcial | pagada | en_acuerdo | en_cobro_juridico)

### `Pago`
- `medio` (efectivo | consignación | PSE | tarjeta | débito_automático | wompi | epayco | mercadopago)
- `referencia_externa`
- `fecha_pago`, `valor`
- `aplicado_a[]` (qué facturas/intereses cubre — orden de imputación es importante)

**Regla de imputación (Ley 675 art. 30 + Código Civil):** primero intereses moratorios, luego capital de la deuda más antigua, salvo acuerdo escrito en contrario.

### `AcuerdoPago`
- `unidad_id`, `total_diferido`, `cuotas[]`
- `estado` (vigente | cumplido | incumplido)
- Suspende cobro jurídico mientras se cumpla.

### `InteresMora`
Calculado diariamente. Tasa: la pactada en reglamento sin exceder el **interés bancario corriente** certificado por la Superfinanciera (Ley 675 art. 30 + jurisprudencia). El sistema descarga la tasa mensual y la aplica.

### `PazYSalvo`
Documento que certifica que la unidad está al día. Necesario para venta, certificados, votación en asamblea (en algunos casos).

### `CobroJuridico`
Cuando supera N meses de mora (configurable, típico 3+). Genera certificación del administrador como **título ejecutivo** (Ley 675 art. 48).

## 6. Proveedores y pagos

### `Proveedor`
- NIT, retenciones que aplican, cuenta bancaria
- Categorías: vigilancia, aseo, jardinería, ascensores, mantenimiento, públicos, contadora, etc.

### `FacturaProveedor`
Recibida. Genera causación contable y, si aplica, **retenciones** (renta, IVA, ICA) cuando la PH es agente retenedor.

### `OrdenPago` / `Egreso`
Aprobación de pago. Multi-firma opcional (consejo + administrador).

### `ConciliacionBancaria`
Mensual. Cruza extracto vs movimientos contables.

## 7. Comunicaciones

### `Comunicado`
- `tipo` (citación | informativo | cobro | notificación_legal)
- `canales[]` (email, WhatsApp, SMS, app, cartelera_digital, físico)
- `destinatarios` (filtros: torre, tipo unidad, morosos, todos)
- `acuses_recibo[]` (timestamp + canal)

**Importante:** La citación a asamblea exige medio idóneo y **antelación mínima de 15 días calendario** (Ley 675 art. 39).

### `Plantilla`
Para ahorrar trabajo: cobros, citaciones, recordatorios, paz y salvos.

### `PQR`
Petición / queja / reclamo / sugerencia. SLA configurable.

## 8. Operación física

### `AreaComun`
Salón social, BBQ, gimnasio, piscina, cancha. Reservable o no.

### `Reserva` (de área)
Calendario, pago si aplica, depósito reembolsable.

### `Visitante`
Registro de portería con timestamp entrada/salida, unidad visitada, autorizado por.

### `Correspondencia`
Paquete recibido, con foto, notificación al residente, firma de entrega.

### `Vehiculo`
Placa, tipo, propietario, parqueadero asignado.

### `Mascota`
Especie, raza, vacunas, consentimiento del manual de convivencia.

### `Multa`
Por incumplimiento del manual de convivencia. Debido proceso: notificación + descargos + decisión motivada + recurso (Ley 675 art. 59-61).

## 9. Documental

### `Documento`
Reglamento, manual de convivencia, actas, EEFF, dictámenes, contratos, certificados de existencia, RUT.
- Versionado, firma digital opcional, control de acceso por rol.

## 10. Auditoría y datos personales

### `EventoAuditoria`
Toda acción sobre dato sensible queda registrada (quién, qué, cuándo, IP). Obligatorio para trazabilidad y para responder a SIC.

### `AutorizacionTratamiento`
Por persona y por finalidad. Versión de política aceptada. Permite revocación.

### `RegistroBaseDeDatos` (RNBD)
Configuración para reporte ante SIC (Ley 1581/2012, decreto 1377/2013).

---

## Diagrama lógico de alto nivel

```
Administradora (tenant)
  └─ Copropiedad
       ├─ Edificio
       │    └─ Unidad ── Persona (propietario, tenedor)
       ├─ Asamblea ── PuntoOrden ── Votacion
       ├─ Presupuesto ── Asiento ── Periodo ── EEFF
       ├─ Factura(unidad, periodo) ── Pago ── AcuerdoPago
       ├─ Proveedor ── FacturaProveedor ── Egreso
       ├─ Comunicado ── Acuse
       ├─ AreaComun ── Reserva
       └─ Documento (versionado)
```

## Invariantes críticos (tests obligatorios)

1. La suma de coeficientes activos de una copropiedad = 1.0000000.
2. Aporte mensual a fondo de imprevistos ≥ 1% del presupuesto mensual.
3. Los asientos contables siempre balancean (Σ débitos = Σ créditos).
4. Un periodo cerrado no admite asientos.
5. El interés moratorio aplicado nunca excede el bancario corriente certificado.
6. Una factura emitida no se modifica: se anula o se emite nota crédito/débito.
7. Una autorización de tratamiento de datos revocada bloquea envíos comerciales.
