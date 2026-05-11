import { createClient } from '@supabase/supabase-js';

// Cliente público (anon key). Para leer datos públicos en server components.
// Si las env vars no están, devolvemos null y la app degrada graciosamente
// (Buzón / Cartas siguen funcionando solo con seed data).

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export function getPublicClient() {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return null;
  return createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    auth: { persistSession: false }
  });
}

// Cliente server-only con service_role. Bypasa RLS. Solo se usa en API
// routes (nunca expuesto al cliente). Para escribir aportes + admin actions
// + setup del bucket y tabla.
export function getServiceClient() {
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!SUPABASE_URL || !serviceKey) return null;
  return createClient(SUPABASE_URL, serviceKey, {
    auth: { persistSession: false }
  });
}

export const APORTES_BUCKET = 'aportes-media';

export function hasSupabaseConfigured(): boolean {
  return Boolean(SUPABASE_URL && SUPABASE_ANON_KEY);
}
