import { NextResponse } from 'next/server';
import { isFamilyAuth } from '@/lib/auth';
import { getServiceClient } from '@/lib/supabase';

// POST /api/aporta/reorder
// Body: { ordered_ids: string[] }
// Reasigna position = 0..N a la lista en el orden dado.
// Toda la familia puede reordenar — confiamos en buenas intenciones.

export async function POST(req: Request) {
  if (!isFamilyAuth()) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase no configurado' }, { status: 500 });
  }

  const { ordered_ids } = await req.json().catch(() => ({ ordered_ids: null }));
  if (!Array.isArray(ordered_ids) || ordered_ids.length === 0) {
    return NextResponse.json({ error: 'ordered_ids requerido' }, { status: 400 });
  }

  // Actualizamos en paralelo. Cada item recibe position = índice en el array.
  const results = await Promise.all(
    ordered_ids.map((id: string, i: number) =>
      supabase
        .from('aportes')
        .update({ position: i, updated_at: new Date().toISOString() })
        .eq('id', id)
    )
  );

  const firstError = results.find((r) => r.error);
  if (firstError?.error) {
    return NextResponse.json({ error: firstError.error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
