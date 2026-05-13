// Cron diario: arma el digest de los últimos aportes y se lo manda a
// Alejandro. Vercel Cron invoca esto con auth bearer = CRON_SECRET.
//
// Configurado en vercel.json: schedule "0 13 * * *" (8 AM Bogotá).

import { NextResponse } from 'next/server';
import { sendEmail, emailTemplate } from '@/lib/email';
import { getServiceClient } from '@/lib/supabase';
import { getPerson } from '@/data/family';
import { APORTE_KIND_LABEL, APORTE_KIND_ICON, type Aporte } from '@/data/aportes-types';

const ONE_DAY_MS = 24 * 60 * 60 * 1000;

export async function GET(req: Request) {
  // Seguridad: solo Vercel Cron (con bearer) o llamadas con secret.
  const authHeader = req.headers.get('authorization');
  const expected = `Bearer ${process.env.CRON_SECRET}`;
  if (process.env.CRON_SECRET && authHeader !== expected) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const alejandroEmail = process.env.ALEJANDRO_EMAIL;
  if (!alejandroEmail) {
    return NextResponse.json({ ok: false, reason: 'no ALEJANDRO_EMAIL' });
  }

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, reason: 'no supabase' });
  }

  const since = new Date(Date.now() - ONE_DAY_MS).toISOString();
  const { data, error } = await supabase
    .from('aportes')
    .select('*')
    .eq('status', 'published')
    .gte('created_at', since)
    .order('created_at', { ascending: false });

  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const aportes = (data || []) as Aporte[];

  // Si no hay nada nuevo, no mandamos email (no spammear a Alejandro).
  if (aportes.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, reason: 'nothing new' });
  }

  const items = aportes.map((a) => {
    const author = getPerson(a.from_id);
    const name = author?.shortName || author?.name || a.from_id;
    const kindLabel = APORTE_KIND_LABEL[a.kind];
    const icon = APORTE_KIND_ICON[a.kind];
    return `
      <tr><td style="padding:8px 0;border-bottom:1px solid #EADFC7;">
        <p style="margin:0;font-size:15px;">
          <span style="display:inline-block;width:24px;">${icon}</span>
          <strong>${name}</strong>
          <span style="color:#6B3620;font-size:13px;">· ${kindLabel}${a.year ? ` · año ${a.year}` : ''}</span>
        </p>
        ${a.title ? `<p style="margin:4px 0 0 24px;font-size:14px;color:#3A2F26;"><em>${escapeHtml(a.title)}</em></p>` : ''}
      </td></tr>
    `;
  }).join('');

  const titleLabel =
    aportes.length === 1 ? `Tienes 1 novedad nueva`
    : `Tienes ${aportes.length} novedades nuevas`;

  const html = emailTemplate({
    title: titleLabel,
    body: `
      <p>Buenos días, papá. La familia te dejó algo nuevo.</p>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;">
        ${items}
      </table>
      <p style="margin-top:20px;">
        <a href="https://casa-de-papa.vercel.app" style="background:#B05F40;color:#FBF7F0;padding:12px 22px;border-radius:999px;text-decoration:none;font-weight:bold;">Abrir la casa</a>
      </p>
    `
  });

  const result = await sendEmail({
    to: alejandroEmail,
    subject: titleLabel,
    html
  });

  return NextResponse.json({ ok: result.ok, sent: aportes.length });
}

function escapeHtml(s: string): string {
  return s
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}
