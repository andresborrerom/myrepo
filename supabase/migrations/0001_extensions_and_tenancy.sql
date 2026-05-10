-- Migration 0001: extensiones y tenancy.
-- Crea las extensiones necesarias y el modelo base de multi-tenancy:
--   - administradora (cliente que paga la suscripción)
--   - copropiedad (la PH como persona jurídica, art. 4 Ley 675)
--   - app_user / membership (usuarios con roles por copropiedad)

create extension if not exists pgcrypto;
create extension if not exists citext;

-- =========================================================================
-- Helpers comunes
-- =========================================================================

-- Función reusable para mantener updated_at en cada UPDATE.
create or replace function app_set_updated_at() returns trigger
language plpgsql as $$
begin
  new.updated_at := now();
  return new;
end
$$;

-- =========================================================================
-- Administradora (tenant raíz). Es el cliente que paga la suscripción.
-- =========================================================================

create table administradora (
  id uuid primary key default gen_random_uuid(),
  nit text not null,
  digito_verificacion smallint check (digito_verificacion between 0 and 9),
  razon_social text not null,
  tipo_persona text not null check (tipo_persona in ('natural','juridica')),
  email_contacto citext not null,
  telefono text,
  direccion text,
  municipio_dane text,
  -- Régimen tributario de la administradora (no de la PH).
  regimen text check (regimen in ('comun','simple','no_responsable_iva')),
  -- Plan de suscripción (esencial / profesional / empresarial).
  plan text not null default 'esencial',
  estado text not null default 'activa' check (estado in ('activa','suspendida','cancelada')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint administradora_nit_unico unique (nit)
);

create trigger administradora_set_updated_at
  before update on administradora
  for each row execute function app_set_updated_at();

comment on table administradora is 'Tenant raíz. Empresa o persona natural que administra una o más copropiedades.';

-- =========================================================================
-- Copropiedad (la PH propiamente dicha)
-- =========================================================================

create table copropiedad (
  id uuid primary key default gen_random_uuid(),
  administradora_id uuid not null references administradora(id) on delete restrict,
  nit text not null,
  digito_verificacion smallint check (digito_verificacion between 0 and 9),
  razon_social text not null,
  tipo text not null check (tipo in ('residencial','comercial','mixta')),
  direccion text not null,
  municipio_dane text not null,
  estrato smallint check (estrato between 1 and 6),
  numero_unidades_total integer not null check (numero_unidades_total >= 0),
  fecha_constitucion date,
  escritura_publica text,
  -- Tributario:
  tiene_explotacion_comercial boolean not null default false,
  -- Calendario de cartera:
  dia_corte_facturacion smallint not null default 25
    check (dia_corte_facturacion between 1 and 28),
  dia_vencimiento smallint not null default 10
    check (dia_vencimiento between 1 and 28),
  -- Mora:
  -- Tasa pactada en reglamento (E.A.); si null, se usa el tope (1.5×IBC vigente).
  tasa_mora_pactada_ea numeric(7,6) check (tasa_mora_pactada_ea >= 0),
  -- Cierre fiscal (default: diciembre).
  mes_cierre_fiscal smallint not null default 12
    check (mes_cierre_fiscal between 1 and 12),
  estado text not null default 'activa' check (estado in ('activa','suspendida','archivada')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz,
  constraint copropiedad_nit_unico unique (nit)
);

create index copropiedad_administradora_idx on copropiedad(administradora_id);

create trigger copropiedad_set_updated_at
  before update on copropiedad
  for each row execute function app_set_updated_at();

comment on table copropiedad is 'Persona jurídica de la PH (Ley 675/2001 art. 4). Tenant secundario dentro de la administradora.';

-- =========================================================================
-- Usuarios y membresías
-- =========================================================================

-- Usuario aplicativo. Identidad federada con Supabase Auth (id = auth.uid).
create table app_user (
  id uuid primary key,                          -- = auth.users.id
  email citext not null unique,
  nombre text not null,
  documento_tipo text check (documento_tipo in ('CC','CE','PA','NIT','TI')),
  documento_numero text,
  telefono text,
  mfa_enrolled boolean not null default false,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  deleted_at timestamptz
);

create trigger app_user_set_updated_at
  before update on app_user
  for each row execute function app_set_updated_at();

-- Roles soportados a nivel de copropiedad. La autorización se chequea
-- en políticas RLS contra la tabla membership (ver migración 0003).
create type rol_copropiedad as enum (
  'admin_general',     -- dueño de la administradora; cross-copropiedad
  'administrador',
  'consejo',
  'revisor_fiscal',
  'propietario',
  'residente',
  'arrendatario',
  'porteria'
);

create table membership (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references app_user(id) on delete cascade,
  administradora_id uuid not null references administradora(id) on delete cascade,
  copropiedad_id uuid references copropiedad(id) on delete cascade,
  rol rol_copropiedad not null,
  -- admin_general no requiere copropiedad_id; el resto sí.
  constraint membership_scope_check check (
    (rol = 'admin_general' and copropiedad_id is null)
    or (rol <> 'admin_general' and copropiedad_id is not null)
  ),
  vigente boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (user_id, administradora_id, copropiedad_id, rol)
);

create index membership_user_idx on membership(user_id);
create index membership_copropiedad_idx on membership(copropiedad_id);

create trigger membership_set_updated_at
  before update on membership
  for each row execute function app_set_updated_at();

comment on table membership is 'Roles de un usuario dentro de una administradora o copropiedad. Base de RLS.';
