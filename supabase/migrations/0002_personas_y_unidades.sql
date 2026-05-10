-- Migration 0002: Personas, unidades y coeficientes.
-- - persona: propietarios y residentes (con autorización Ley 1581).
-- - edificio: subdivisión opcional.
-- - unidad: bien privado (apartamento, casa, local, parqueadero, depósito).
-- - unidad_persona: relación muchos-a-muchos con rol (propietario/tenedor/residente).
-- Coeficientes en escala entera (10_000_000) para validación exacta.

-- =========================================================================
-- Persona
-- =========================================================================

create table persona (
  id uuid primary key default gen_random_uuid(),
  -- Una persona puede existir en varias copropiedades de la misma administradora,
  -- por eso el scope es la administradora.
  administradora_id uuid not null references administradora(id) on delete restrict,
  tipo_persona text not null check (tipo_persona in ('natural','juridica')),
  documento_tipo text not null check (documento_tipo in ('CC','CE','PA','NIT','TI')),
  documento_numero text not null,
  nombre text not null,
  apellido text,
  razon_social text,
  email citext,
  telefono_movil text,
  telefono_fijo text,
  direccion_correspondencia text,
  -- Ley 1581/2012: autorización de tratamiento de datos.
  autorizacion_datos_dada_at timestamptz,
  autorizacion_datos_ip inet,
  autorizacion_datos_version text,           -- versión de la política aceptada
  autorizacion_datos_revocada_at timestamptz,
  -- Canal preferido para envío de cuentas de cobro y comunicaciones.
  canal_preferido text default 'email'
    check (canal_preferido in ('email','whatsapp','sms','fisico')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  unique (administradora_id, documento_tipo, documento_numero)
);

create index persona_admin_idx on persona(administradora_id);

create trigger persona_set_updated_at
  before update on persona
  for each row execute function app_set_updated_at();

-- =========================================================================
-- Edificio (subdivisión opcional dentro de la copropiedad)
-- =========================================================================

create table edificio (
  id uuid primary key default gen_random_uuid(),
  copropiedad_id uuid not null references copropiedad(id) on delete cascade,
  nombre text not null,                   -- "Torre A", "Bloque 3"
  numero_pisos smallint check (numero_pisos > 0),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  unique (copropiedad_id, nombre)
);

create trigger edificio_set_updated_at
  before update on edificio
  for each row execute function app_set_updated_at();

-- =========================================================================
-- Unidad (bien privado)
-- =========================================================================

create type tipo_unidad as enum (
  'apartamento','casa','local','oficina','parqueadero','deposito'
);

create table unidad (
  id uuid primary key default gen_random_uuid(),
  copropiedad_id uuid not null references copropiedad(id) on delete cascade,
  edificio_id uuid references edificio(id) on delete set null,
  tipo tipo_unidad not null,
  -- Identificador visible (lo que ve el residente). Único por copropiedad.
  numero text not null,                   -- "Apto 502 Torre B"
  area_m2 numeric(10,2) check (area_m2 >= 0),
  -- Coeficiente en escala entera (10_000_000 = 100%).
  -- Suma de coeficientes activos por copropiedad debe ser exactamente 10_000_000;
  -- se valida con un trigger diferido (más abajo).
  coeficiente integer not null check (coeficiente >= 0 and coeficiente <= 10000000),
  estado text not null default 'habitada'
    check (estado in ('habitada','desocupada','en_obra','archivada')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  unique (copropiedad_id, numero)
);

create index unidad_copropiedad_idx on unidad(copropiedad_id);

create trigger unidad_set_updated_at
  before update on unidad
  for each row execute function app_set_updated_at();

comment on column unidad.coeficiente is
  'Coeficiente de copropiedad en escala 10_000_000 (Ley 675 arts. 25-31). 1.0 = 10_000_000.';

-- =========================================================================
-- unidad_persona: relación muchos-a-muchos con rol y vigencia
-- =========================================================================

create type rol_unidad as enum ('propietario','tenedor','residente');

create table unidad_persona (
  id uuid primary key default gen_random_uuid(),
  unidad_id uuid not null references unidad(id) on delete cascade,
  persona_id uuid not null references persona(id) on delete restrict,
  rol rol_unidad not null,
  porcentaje_propiedad numeric(7,4) check (porcentaje_propiedad >= 0 and porcentaje_propiedad <= 100),
  vigente_desde date not null default current_date,
  vigente_hasta date,
  notificable boolean not null default true,  -- se le envían cobros/comunicados
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index unidad_persona_unidad_idx on unidad_persona(unidad_id) where vigente_hasta is null;
create index unidad_persona_persona_idx on unidad_persona(persona_id);

create trigger unidad_persona_set_updated_at
  before update on unidad_persona
  for each row execute function app_set_updated_at();

-- =========================================================================
-- Validación de coeficientes: Σ activos por copropiedad = 10_000_000
-- =========================================================================

-- Función que verifica la suma para una copropiedad. Se ejecuta diferida
-- (al final de la transacción) para permitir reordenamientos masivos.
create or replace function validar_suma_coeficientes()
returns trigger language plpgsql as $$
declare
  cop uuid;
  suma integer;
begin
  cop := coalesce(new.copropiedad_id, old.copropiedad_id);
  select coalesce(sum(coeficiente), 0) into suma
    from unidad
    where copropiedad_id = cop and deleted_at is null and estado <> 'archivada';
  -- Si no hay unidades aún, es válido (copropiedad en setup).
  if suma = 0 then
    return null;
  end if;
  if suma <> 10000000 then
    raise exception
      'Suma de coeficientes de copropiedad % es % (esperado 10000000). Ley 675 arts. 25-31.',
      cop, suma;
  end if;
  return null;
end
$$;

create constraint trigger unidad_coeficientes_suma
  after insert or update or delete on unidad
  deferrable initially deferred
  for each row execute function validar_suma_coeficientes();
