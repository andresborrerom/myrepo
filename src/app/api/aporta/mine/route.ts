import { NextResponse } from 'next/server';
import { isFamilyAuth } from '@/lib/auth';
import { getServiceClient } from '@/lib/supabase';

// POST /api/aporta/mine — recibe un array de ids y devuelve los aportes
// correspondientes. Usado por /aporta para mostrar "Mis aportes" desde
// localStorage. Bypasa RLS via service_role para incluir aportes que la
// familia subió pero que tal vez admin marcó como ocultos.

export async function POST(req: Request) {
  if (!isFamilyAuth()) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const { ids } = await req.json().catch(() => ({ ids: [] }));
  if (!Array.isArray(ids) || ids.length === 0) {
    return NextResponse.json({ aportes: [] });
  }

  const supabase = getServiceClient();
  if (!supabase) return NextResponse.json({ aportes: [] });

  const { data } = await supabase
    .from('aportes')
    .select('*')
    .in('id', ids.slice(0, 100))
    .order('created_at', { ascending: false });

  return NextResponse.json({ aportes: data || [] });
}
