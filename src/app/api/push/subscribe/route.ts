import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

// POST /api/push/subscribe
// Recibe una PushSubscription del navegador y la guarda en Supabase.
// Sin auth: cualquiera que instale la PWA y dé permiso queda suscrito —
// es una app familiar pequeña, el riesgo es mínimo.

export async function POST(req: Request) {
  const sub = await req.json().catch(() => null);
  if (!sub || typeof sub.endpoint !== 'string') {
    return NextResponse.json({ error: 'Suscripción inválida' }, { status: 400 });
  }

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ error: 'Supabase no configurado' }, { status: 500 });
  }

  const { error } = await supabase
    .from('push_subscriptions')
    .upsert(
      {
        endpoint: sub.endpoint,
        subscription: sub,
        updated_at: new Date().toISOString()
      },
      { onConflict: 'endpoint' }
    );

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
  return NextResponse.json({ ok: true });
}
