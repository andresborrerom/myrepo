import { NextResponse } from 'next/server';
import { unstable_noStore as noStore } from 'next/cache';
import { getPublicClient } from '@/lib/supabase';

// GET /api/alejandro/state
// Devuelve qué años ha abierto Alejandro y la fecha del último día abierto.
// Anon-readable (cualquiera puede leer; solo se escribe via /reveal con
// service_role).
export async function GET() {
  noStore();
  const supabase = getPublicClient();
  if (!supabase) {
    return NextResponse.json({ revealedYears: [], lastRevealDate: null, ok: false });
  }
  const { data, error } = await supabase
    .from('alejandro_state')
    .select('revealed_years, last_reveal_date')
    .eq('id', 'singleton')
    .maybeSingle();
  if (error) {
    return NextResponse.json({ revealedYears: [], lastRevealDate: null, ok: false });
  }
  return NextResponse.json({
    revealedYears: (data?.revealed_years as number[]) || [],
    lastRevealDate: (data?.last_reveal_date as string) || null,
    ok: true
  });
}
