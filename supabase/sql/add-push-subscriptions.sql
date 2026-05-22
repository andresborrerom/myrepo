-- Tabla de suscripciones Web Push (recordatorio diario de "abre tu carta").
-- Pega esto en Supabase → SQL Editor → New query → Run.

create table if not exists push_subscriptions (
  endpoint text primary key,
  subscription jsonb not null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table push_subscriptions enable row level security;

-- Solo el servidor (service_role) escribe/lee. Sin políticas públicas:
-- el endpoint /api/push/subscribe usa service_role y el cron también.
