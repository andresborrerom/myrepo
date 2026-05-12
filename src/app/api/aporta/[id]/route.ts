import { NextResponse } from 'next/server';
import { isFamilyAuth } from '@/lib/auth';
import { getServiceClient } from '@/lib/supabase';

// PATCH /api/aporta/[id] — edición desde el lado familiar.
// Cualquier miembro de la familia (con cookie) puede editar; el filtro real
// es UI: en /aporta solo se le muestran los botones de editar/borrar a los
// aportes que tiene guardados en localStorage de su dispositivo.

// DELETE /api/aporta/[id] — mismo principio.

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!isFamilyAuth()) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase no configurado' }, { status: 500 });
  }

  const updates = await req.json().catch(() => ({}));
  const safe: Record<string, unknown> = {};
  if (typeof updates.title === 'string')     safe.title = updates.title.trim() || null;
  if (typeof updates.body === 'string')      safe.body = updates.body.trim() || null;
  if (typeof updates.year === 'number')      safe.year = updates.year;
  if (typeof updates.media_url === 'string') safe.media_url = updates.media_url || null;
  safe.updated_at = new Date().toISOString();

  const { error } = await supabase
    .from('aportes')
    .update(safe)
    .eq('id', params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}

export async function DELETE(
  _req: Request,
  { params }: { params: { id: string } }
) {
  if (!isFamilyAuth()) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase no configurado' }, { status: 500 });
  }

  const { error } = await supabase
    .from('aportes')
    .delete()
    .eq('id', params.id);

  if (error) return NextResponse.json({ error: error.message }, { status: 500 });
  return NextResponse.json({ ok: true });
}
