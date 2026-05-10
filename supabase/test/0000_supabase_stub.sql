-- Stub local del schema `auth` que Supabase provee en producción.
-- SOLO para entornos de prueba sin `supabase start`. NUNCA se aplica en prod.

create schema if not exists auth;

-- En producción esto lo hace el GoTrue de Supabase.
create table if not exists auth.users (
  id uuid primary key,
  email text,
  raw_user_meta_data jsonb default '{}'::jsonb
);

-- auth.uid() devuelve el id del usuario actual.
-- En producción Supabase lo setea como JWT claim. Acá lo emulamos via GUC.
create or replace function auth.uid() returns uuid
language sql stable as $$
  select nullif(current_setting('request.jwt.claim.sub', true), '')::uuid
$$;
