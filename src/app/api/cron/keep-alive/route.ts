// Cron liviano: ping diario a Supabase para evitar que el proyecto free-tier
// se pause por inactividad. Supabase pausa proyectos con ~7 dias sin actividad;
// este endpoint hace un SELECT trivial cada dia para mantener el proyecto vivo.
//
// Contexto: en agosto 2026 el proyecto Supabase se pauso (probablemente por
// alguna falla silenciosa del cron de recordatorio), rompiendo push + reveal.
// Ver errores-que-generaron-reproceso.md § "Supabase se pauso por inactividad".
//
// Configurado en vercel.json: schedule "0 3 * * *" (3 AM UTC).
// Sin auth requerido si CRON_SECRET no esta seteado; Vercel Cron invoca con
// Bearer CRON_SECRET si el env var existe.

import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

export async function GET(req: Request) {
  const authHeader = req.headers.get('authorization');
  const expected = `Bearer ${process.env.CRON_SECRET}`;
  if (process.env.CRON_SECRET && authHeader !== expected) {
    return NextResponse.json({ error: 'unauthorized' }, { status: 401 });
  }

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ ok: false, reason: 'no supabase' });
  }

  // Ping trivial: count exact head=true no descarga filas, solo pega la DB.
  const { count, error } = await supabase
    .from('aportes')
    .select('id', { count: 'exact', head: true });

  if (error) {
    return NextResponse.json(
      { ok: false, error: error.message },
      { status: 500 }
    );
  }

  return NextResponse.json({
    ok: true,
    pinged_at: new Date().toISOString(),
    aportes_count: count ?? 0
  });
}
