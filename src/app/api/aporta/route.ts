import { NextResponse } from 'next/server';
import { isFamilyAuth } from '@/lib/auth';
import { getServiceClient } from '@/lib/supabase';
import { sendEmail, emailTemplate } from '@/lib/email';
import { getPerson } from '@/data/family';
import { APORTE_KIND_LABEL } from '@/data/aportes-types';
import type { AporteKind } from '@/data/aportes-types';

// POST /api/aporta — recibe un aporte de la familia, lo inserta en DB.
// v1: auto-publica todo (sin filtro IA). v2 (futuro): cuando ANTHROPIC_API_KEY
// esté, llamará a Claude para moderar tono antes de publicar.

const ALLOWED_KINDS: AporteKind[] = ['texto', 'foto', 'audio', 'video', 'carta', 'foto-perfil'];

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
  // Las cartas pueden tener año (1951-2026) o no tenerlo (mensaje libre).
  if (kind === 'carta' && year !== null && year !== undefined && (year < 1951 || year > 2026)) {
    return NextResponse.json(
      { error: 'Si pones año en una carta, debe estar entre 1951 y 2026' },
      { status: 400 }
    );
  }
  if (!text && !media_url) {
    return NextResponse.json(
      { error: 'Necesitamos texto, archivo, o ambos' },
      { status: 400 }
    );
  }
  if (kind === 'foto-perfil' && !media_url) {
    return NextResponse.json(
      { error: 'La foto de perfil necesita un archivo' },
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

  // Notificación a admin — best effort, no rompe el flujo si falla.
  const adminEmail = process.env.ADMIN_EMAIL;
  if (adminEmail && data) {
    const author = getPerson(from_id);
    const uploader = getPerson(on_behalf_of_id);
    const authorName = author?.shortName || author?.name || from_id;
    const uploaderName = uploader?.shortName || uploader?.name || on_behalf_of_id;
    const kindLabel = APORTE_KIND_LABEL[kind as AporteKind];

    sendEmail({
      to: adminEmail,
      subject: `Nuevo aporte: ${kindLabel.toLowerCase()} de ${authorName}`,
      html: emailTemplate({
        title: `Nuevo aporte de ${authorName}`,
        body: `
          <p><strong>${authorName}</strong> dejó un nuevo aporte en la casa.</p>
          <ul style="padding-left:20px;line-height:1.7;">
            <li>Tipo: <strong>${kindLabel}</strong></li>
            ${data.year ? `<li>Año: <strong>${data.year}</strong></li>` : ''}
            ${data.title ? `<li>Título: <em>"${escapeHtml(data.title)}"</em></li>` : ''}
            ${uploaderName !== authorName ? `<li>Subido por: ${uploaderName}</li>` : ''}
          </ul>
          ${data.body ? `<blockquote style="border-left:3px solid #C97B5C;margin:16px 0;padding:0 16px;color:#3A2F26;">${escapeHtml(data.body).slice(0, 400)}${data.body.length > 400 ? '…' : ''}</blockquote>` : ''}
          <p style="margin-top:20px;">
            <a href="https://casa-de-papa.vercel.app/admin" style="background:#B05F40;color:#FBF7F0;padding:10px 18px;border-radius:999px;text-decoration:none;font-weight:bold;">Ver en /admin</a>
          </p>
        `
      })
    }).catch((e) => console.error('[email] notification failed:', e));
  }

  return NextResponse.json({ ok: true, aporte: data });
}

function escapeHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
