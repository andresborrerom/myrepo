-- Tabla de waitlist. Ejecutar una sola vez en el SQL Editor de Supabase
-- del proyecto que vaya a recibir los emails.
--
-- Nota: la tabla NO tiene RLS pensada para escritura desde el cliente.
-- Las inserciones van por el API route con la service_role key,
-- que bypasa RLS. Lectura solo desde el dashboard / scripts admin.

create extension if not exists "uuid-ossp";

create table if not exists public.waitlist (
  id uuid primary key default uuid_generate_v4(),
  email text not null unique,
  name text,
  source text,
  utm_source text,
  utm_medium text,
  utm_campaign text,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists waitlist_created_at_idx on public.waitlist (created_at desc);
create index if not exists waitlist_source_idx on public.waitlist (source);

-- Sin RLS: solo se accede con service_role key desde el server.
-- Si quisieras permitir lectura pública en algún momento, añade RLS y políticas.
alter table public.waitlist enable row level security;

-- Política negativa explícita (nadie puede leer/escribir con anon key).
drop policy if exists "deny anon" on public.waitlist;
create policy "deny anon" on public.waitlist
  for all to anon
  using (false)
  with check (false);
