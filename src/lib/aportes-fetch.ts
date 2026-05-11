// Helpers de lectura de aportes desde Supabase. Server-side.
// Si Supabase no está configurado, devolvemos arrays vacíos para que las
// páginas sigan funcionando con sus datos seed.

import { unstable_noStore as noStore } from 'next/cache';
import { getPublicClient } from './supabase';
import type { Aporte, AporteKind } from '@/data/aportes-types';

export async function fetchPublishedAportes(opts?: {
  kinds?: AporteKind[];
  limit?: number;
}): Promise<Aporte[]> {
  noStore();
  const supabase = getPublicClient();
  if (!supabase) return [];

  let q = supabase
    .from('aportes')
    .select('*')
    .eq('status', 'published')
    .order('created_at', { ascending: false });

  if (opts?.kinds && opts.kinds.length > 0) {
    q = q.in('kind', opts.kinds);
  }
  if (opts?.limit) {
    q = q.limit(opts.limit);
  }

  const { data, error } = await q;
  if (error) return [];
  return (data || []) as Aporte[];
}

export async function fetchCartaForYear(year: number): Promise<Aporte | null> {
  noStore();
  const supabase = getPublicClient();
  if (!supabase) return null;

  const { data } = await supabase
    .from('aportes')
    .select('*')
    .eq('status', 'published')
    .eq('kind', 'carta')
    .eq('year', year)
    .order('created_at', { ascending: false })
    .limit(1)
    .maybeSingle();

  return (data as Aporte) || null;
}

export async function fetchAportesCount(): Promise<number> {
  noStore();
  const supabase = getPublicClient();
  if (!supabase) return 0;
  const { count } = await supabase
    .from('aportes')
    .select('id', { count: 'exact', head: true })
    .eq('status', 'published');
  return count || 0;
}

// Server-side: para /admin (todos los aportes incluso no publicados).
// Usa service_role bypassing RLS.
export async function fetchAllAportesAdmin(): Promise<Aporte[]> {
  noStore();
  const { getServiceClient } = await import('./supabase');
  const supabase = getServiceClient();
  if (!supabase) return [];
  const { data } = await supabase
    .from('aportes')
    .select('*')
    .order('created_at', { ascending: false });
  return (data || []) as Aporte[];
}

