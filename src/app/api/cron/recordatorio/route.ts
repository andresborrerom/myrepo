// Cron diario: le manda a Alejandro un push recordándole abrir su carta.
// Al tocar la notificación, la app abre /abrir-carta (carta aleatoria).
//
// Configurado en vercel.json: schedule "0 14 * * *" (9 AM Bogotá).
// Vercel Cron invoca con auth bearer = CRON_SECRET.

import { NextResponse } from 'next/server';
import webpush from 'web-push';
import { getServiceClient } from '@/lib/supabase';
import { VAPID_PUBLIC_KEY, VAPID_SUBJECT } from '@/lib/vapid';

type StoredSub = {
  endpoint: string;
  subscription: webpush.PushSubscription;
};

const MENSAJES = [
  { title: 'Tu carta de hoy te espera 🐎', body: 'No olvides abrirla. Un año de tu vida, contado por quien te quiere.' },
  { title: 'Una carta sin abrir 🐎', body: 'La familia te dejó un año para revivir hoy. Ábrela.' },
  { title: 'Buenos días, papá 🐎', body: 'Te espera la carta del día. Tócame para abrirla.' }
];

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  const expected = `Bearer ${process.env.CRON_SECRET}`;
  if (process.env.CRON_SECRET && authHeader !== expected) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const privateKey = process.env.VAPID_PRIVATE_KEY;
  if (!privateKey) {
    return NextResponse.json({ ok: false, reason: 'no VAPID_PRIVATE_KEY' });
  }

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, reason: 'no supabase' });
  }

  const { data, error } = await supabase
    .from('push_subscriptions')
    .select('endpoint, subscription');
  if (error) {
    return NextResponse.json({ ok: false, error: error.message }, { status: 500 });
  }

  const subs = (data || []) as StoredSub[];
  if (subs.length === 0) {
    return NextResponse.json({ ok: true, sent: 0, reason: 'sin suscripciones' });
  }

  webpush.setVapidDetails(VAPID_SUBJECT, VAPID_PUBLIC_KEY, privateKey);

  const msg = MENSAJES[Math.floor(Math.random() * MENSAJES.length)];
  const payload = JSON.stringify({
    title: msg.title,
    body: msg.body,
    url: '/abrir-carta'
  });

  let sent = 0;
  const expiradas: string[] = [];

  await Promise.all(
    subs.map(async (s) => {
      try {
        await webpush.sendNotification(s.subscription, payload);
        sent++;
      } catch (e: unknown) {
        const status = (e as { statusCode?: number })?.statusCode;
        // 404/410 = suscripción muerta → marcar para borrar
        if (status === 404 || status === 410) {
          expiradas.push(s.endpoint);
        }
      }
    })
  );

  if (expiradas.length > 0) {
    await supabase.from('push_subscriptions').delete().in('endpoint', expiradas);
  }

  return NextResponse.json({ ok: true, sent, limpiadas: expiradas.length });
}
