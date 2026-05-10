-- Migration 0003: Cartera (cuentas por cobrar).
-- - tasa_ibc: histórico de Interés Bancario Corriente certificado por SF (segmentado).
-- - concepto: catálogo de conceptos cobrables.
-- - factura: cuenta de cobro mensual por unidad (cabecera).
-- - factura_item: ítems de la factura.
-- - pago: ingreso de plata.
-- - aplicacion_pago: imputación a facturas/intereses.
-- - acuerdo_pago: refinanciación de cartera vencida.
-- - paz_y_salvo: certificación de unidad al día.

-- =========================================================================
-- Tasa de Interés Bancario Corriente (Superfinanciera)
-- =========================================================================

-- Histórico de tasas para validación anti-usura y cálculo de mora segmentado.
-- Se actualiza vía un job que descarga el dato oficial mensualmente.
create table tasa_ibc (
  id uuid primary key default gen_random_uuid(),
  -- Modalidad relevante para PH: 'consumo_y_ordinario'. Otras posibles
  -- (microcrédito, etc.) se modelan por completitud.
  modalidad text not null default 'consumo_y_ordinario'
    check (modalidad in ('consumo_y_ordinario','microcredito')),
  vigente_desde date not null,
  vigente_hasta date not null,
  ibc_ea numeric(7,6) not null check (ibc_ea > 0),  -- Tasa Efectiva Anual
  fuente text not null default 'Superintendencia Financiera de Colombia',
  resolucion text,
  created_at timestamptz not null default now(),
  unique (modalidad, vigente_desde),
  check (vigente_hasta > vigente_desde)
);

create index tasa_ibc_vigencia_idx on tasa_ibc(modalidad, vigente_desde, vigente_hasta);

comment on table tasa_ibc is
  'Histórico oficial del Interés Bancario Corriente. Tope mora PH = 1.5×IBC (C.Co. art. 884).';

-- =========================================================================
-- Conceptos cobrables (catálogo por copropiedad)
-- =========================================================================

create type tipo_concepto as enum (
  'expensa_ordinaria',
  'expensa_extraordinaria',
  'cuota_extraordinaria',
  'parqueadero',
  'salon_social',
  'multa',
  'intereses_mora',
  'papeleria',
  'otros'
);

create table concepto (
  id uuid primary key default gen_random_uuid(),
  copropiedad_id uuid not null references copropiedad(id) on delete cascade,
  codigo text not null,                 -- "EXP-ORD", "MORA", "PARQ-VIS"
  nombre text not null,
  tipo tipo_concepto not null,
  -- Modo de cálculo del valor cuando se factura:
  --   por_coeficiente  → valor = presupuesto_mensual × coeficiente
  --   fijo_unidad      → valor fijo por unidad
  --   manual           → cada factura lo ingresa
  metodo_calculo text not null default 'manual'
    check (metodo_calculo in ('por_coeficiente','fijo_unidad','manual')),
  valor_fijo bigint check (valor_fijo >= 0),
  -- Si genera intereses moratorios cuando se vence sin pagar.
  genera_mora boolean not null default true,
  -- Cuenta contable PUC asociada (4135, 4140, 4145, etc.). Texto por flexibilidad.
  cuenta_puc text,
  activo boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (copropiedad_id, codigo)
);

create trigger concepto_set_updated_at
  before update on concepto
  for each row execute function app_set_updated_at();

-- =========================================================================
-- Factura / cuenta de cobro
-- =========================================================================

create type estado_factura as enum (
  'borrador',
  'emitida',
  'pagada_parcial',
  'pagada',
  'en_acuerdo',
  'en_cobro_juridico',
  'anulada'
);

create table factura (
  id uuid primary key default gen_random_uuid(),
  copropiedad_id uuid not null references copropiedad(id) on delete restrict,
  unidad_id uuid not null references unidad(id) on delete restrict,
  -- Numeración consecutiva por copropiedad.
  numero bigint not null,
  -- Periodo facturado (1er día del mes).
  periodo date not null,
  fecha_emision date not null default current_date,
  fecha_vencimiento date not null,
  total bigint not null check (total >= 0),
  saldo bigint not null check (saldo >= 0),
  estado estado_factura not null default 'borrador',
  -- Si la PH está obligada a factura electrónica DIAN, se guarda el CUFE.
  factura_electronica_cufe text,
  factura_electronica_xml_url text,
  notas text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  unique (copropiedad_id, numero),
  check (fecha_vencimiento >= fecha_emision)
);

create index factura_unidad_periodo_idx on factura(unidad_id, periodo);
create index factura_copropiedad_estado_idx on factura(copropiedad_id, estado) where deleted_at is null;

create trigger factura_set_updated_at
  before update on factura
  for each row execute function app_set_updated_at();

-- Items de la factura.
create table factura_item (
  id uuid primary key default gen_random_uuid(),
  factura_id uuid not null references factura(id) on delete cascade,
  concepto_id uuid not null references concepto(id) on delete restrict,
  descripcion text not null,
  valor bigint not null check (valor >= 0),
  -- Si el ítem fue calculado por coeficiente, guardamos los insumos.
  base_calculo bigint,
  coeficiente_aplicado integer,
  created_at timestamptz not null default now()
);

create index factura_item_factura_idx on factura_item(factura_id);

-- =========================================================================
-- Pagos
-- =========================================================================

create type medio_pago as enum (
  'efectivo','consignacion','pse','tarjeta','debito_automatico',
  'wompi','epayco','mercadopago','breb','nequi','daviplata','otros'
);

create table pago (
  id uuid primary key default gen_random_uuid(),
  copropiedad_id uuid not null references copropiedad(id) on delete restrict,
  unidad_id uuid references unidad(id) on delete set null,
  -- Persona que pagó (puede no ser propietario).
  pagador_persona_id uuid references persona(id) on delete set null,
  fecha_pago date not null default current_date,
  valor bigint not null check (valor > 0),
  medio medio_pago not null,
  -- Identificador de la pasarela (referencia para conciliación).
  referencia_externa text,
  -- Status: 'pendiente_aplicar' cuando llega y aún no se imputó;
  -- 'aplicado' cuando se distribuyó en facturas; 'anulado' si se reversó.
  estado text not null default 'pendiente_aplicar'
    check (estado in ('pendiente_aplicar','aplicado','anulado')),
  comprobante_url text,
  notas text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index pago_unidad_idx on pago(unidad_id);
create index pago_referencia_idx on pago(copropiedad_id, referencia_externa) where referencia_externa is not null;

create trigger pago_set_updated_at
  before update on pago
  for each row execute function app_set_updated_at();

-- Aplicación del pago a facturas / intereses.
create table aplicacion_pago (
  id uuid primary key default gen_random_uuid(),
  pago_id uuid not null references pago(id) on delete cascade,
  factura_id uuid not null references factura(id) on delete restrict,
  -- 'capital' aplica al saldo de la factura.
  -- 'mora' aplica a intereses ya causados (registrados como factura_item de tipo intereses_mora).
  destino text not null check (destino in ('capital','mora')),
  monto bigint not null check (monto > 0),
  created_at timestamptz not null default now()
);

create index aplicacion_pago_pago_idx on aplicacion_pago(pago_id);
create index aplicacion_pago_factura_idx on aplicacion_pago(factura_id);

-- =========================================================================
-- Acuerdo de pago
-- =========================================================================

create type estado_acuerdo as enum ('vigente','cumplido','incumplido','cancelado');

create table acuerdo_pago (
  id uuid primary key default gen_random_uuid(),
  copropiedad_id uuid not null references copropiedad(id) on delete restrict,
  unidad_id uuid not null references unidad(id) on delete restrict,
  fecha_acuerdo date not null default current_date,
  total_capital bigint not null check (total_capital >= 0),
  total_intereses bigint not null check (total_intereses >= 0),
  numero_cuotas smallint not null check (numero_cuotas > 0),
  -- Cláusula aceleratoria: con N incumplimientos consecutivos se vence todo.
  cuotas_incumplimiento_acelera smallint not null default 2,
  estado estado_acuerdo not null default 'vigente',
  documento_pdf_url text,
  firmado_por_propietario_at timestamptz,
  notas text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger acuerdo_pago_set_updated_at
  before update on acuerdo_pago
  for each row execute function app_set_updated_at();

create table acuerdo_cuota (
  id uuid primary key default gen_random_uuid(),
  acuerdo_id uuid not null references acuerdo_pago(id) on delete cascade,
  numero_cuota smallint not null,
  fecha_vencimiento date not null,
  valor bigint not null check (valor >= 0),
  saldo bigint not null check (saldo >= 0),
  estado text not null default 'pendiente'
    check (estado in ('pendiente','pagada','en_mora')),
  unique (acuerdo_id, numero_cuota)
);

-- =========================================================================
-- Paz y salvo
-- =========================================================================

create table paz_y_salvo (
  id uuid primary key default gen_random_uuid(),
  copropiedad_id uuid not null references copropiedad(id) on delete restrict,
  unidad_id uuid not null references unidad(id) on delete restrict,
  emitido_por_user_id uuid references app_user(id),
  fecha_emision date not null default current_date,
  fecha_vigencia date not null,                         -- usualmente +30 días
  saldo_a_la_fecha bigint not null,
  documento_pdf_url text,
  hash_documento text,                                  -- para verificación
  created_at timestamptz not null default now()
);

create index paz_y_salvo_unidad_idx on paz_y_salvo(unidad_id);
