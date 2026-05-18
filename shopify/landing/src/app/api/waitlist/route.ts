import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

export const runtime = 'nodejs';
export const dynamic = 'force-dynamic';

type Payload = {
  email?: string;
  name?: string;
  source?: string;
  utm_source?: string | null;
  utm_medium?: string | null;
  utm_campaign?: string | null;
};

export async function POST(req: Request) {
  let body: Payload;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: 'Payload inválido.' }, { status: 400 });
  }

  const email = (body.email ?? '').trim().toLowerCase();
  const name = (body.name ?? '').trim().slice(0, 120) || null;
  const source = (body.source ?? 'unknown').slice(0, 60);

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) || email.length > 200) {
    return NextResponse.json({ error: 'Correo no válido.' }, { status: 400 });
  }

  const client = getServiceClient();
  if (!client) {
    return NextResponse.json(
      { error: 'Servidor no configurado (Supabase). Avisa a soporte.' },
      { status: 500 }
    );
  }

  const { error } = await client.from('waitlist').upsert(
    {
      email,
      name,
      source,
      utm_source: body.utm_source ?? null,
      utm_medium: body.utm_medium ?? null,
      utm_campaign: body.utm_campaign ?? null
    },
    { onConflict: 'email' }
  );

  if (error) {
    return NextResponse.json({ error: 'No pudimos guardarlo.' }, { status: 500 });
  }

  const hookUrl = process.env.NOTIFY_WEBHOOK_URL;
  if (hookUrl) {
    fetch(hookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: `Nueva waitlist: ${email} (${source})` })
    }).catch(() => {});
  }

  return NextResponse.json({ ok: true });
}
