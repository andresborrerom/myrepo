import { NextResponse } from 'next/server';
import { isAdminAuth } from '@/lib/auth';
import { getServiceClient } from '@/lib/supabase';

// PATCH /api/admin/aporte/[id] — editar contenido o cambiar status
// DELETE /api/admin/aporte/[id] — borrar definitivamente

export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
  if (!isAdminAuth()) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }
  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase no configurado' }, { status: 500 });
  }

  const updates = await req.json().catch(() => ({}));
  // Campos que aceptamos editar.
  const safe: Record<string, unknown> = {};
  if (typeof updates.title === 'string')   safe.title = updates.title.trim() || null;
  if (typeof updates.body === 'string')    safe.body = updates.body.trim() || null;
  if (typeof updates.year === 'number')    safe.year = updates.year;
  if (typeof updates.status === 'string')  safe.status = updates.status;
  if (typeof updates.from_id === 'string') safe.from_id = updates.from_id;
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
  if (!isAdminAuth()) {
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
