import { NextResponse } from 'next/server';
import { isFamilyAuth } from '@/lib/auth';
import { getServiceClient } from '@/lib/supabase';
import type { AporteKind } from '@/data/aportes-types';

// POST /api/aporta — recibe un aporte de la familia, lo inserta en DB.
// v1: auto-publica todo (sin filtro IA). v2 (futuro): cuando ANTHROPIC_API_KEY
// esté, llamará a Claude para moderar tono antes de publicar.

const ALLOWED_KINDS: AporteKind[] = ['texto', 'foto', 'audio', 'video', 'carta'];

export async function POST(req: Request) {
  if (!isFamilyAuth()) {
    return NextResponse.json({ error: 'No autorizado' }, { status: 401 });
  }

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json(
      { error: 'Supabase no configurado en el servidor.' },
      { status: 500 }
    );
  }

  const body = await req.json().catch(() => null);
  if (!body) {
    return NextResponse.json({ error: 'Payload inválido' }, { status: 400 });
  }

  const {
    from_id,
    on_behalf_of_id,
    kind,
    year,
    title,
    body: text,
    media_url
  } = body;

  if (!from_id || !on_behalf_of_id) {
    return NextResponse.json({ error: 'Falta firma' }, { status: 400 });
  }
  if (!ALLOWED_KINDS.includes(kind)) {
    return NextResponse.json({ error: 'Tipo no válido' }, { status: 400 });
  }
  if (kind === 'carta' && (!year || year < 1951 || year > 2026)) {
    return NextResponse.json(
      { error: 'Las cartas necesitan un año entre 1951 y 2026' },
      { status: 400 }
    );
  }
  if (!text && !media_url) {
    return NextResponse.json(
      { error: 'Necesitamos texto, archivo, o ambos' },
      { status: 400 }
    );
  }

  // v1: status='published' directo (sin moderación IA).
  // Cuando exista ANTHROPIC_API_KEY, llamaremos a Claude y según el veredicto
  // pasará a 'published' o 'flagged'.
  const status = 'published';

  const { data, error } = await supabase
    .from('aportes')
    .insert({
      from_id,
      on_behalf_of_id,
      kind,
      year: year || null,
      title: title?.trim() || null,
      body: text?.trim() || null,
      media_url: media_url || null,
      status
    })
    .select()
    .single();

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ ok: true, aporte: data });
}
