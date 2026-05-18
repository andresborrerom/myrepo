import { createClient } from '@supabase/supabase-js';

const URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const ANON = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export function getPublicClient() {
  if (!URL || !ANON) return null;
  return createClient(URL, ANON, { auth: { persistSession: false } });
}

export function getServiceClient() {
  const service = process.env.SUPABASE_SERVICE_ROLE_KEY;
  if (!URL || !service) return null;
  return createClient(URL, service, { auth: { persistSession: false } });
}
