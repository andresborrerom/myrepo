import { NextResponse } from 'next/server';
import { getServiceClient } from '@/lib/supabase';

// "Hoy" en hora de Bogotá (UTC-5, sin DST). Marbella va 6-7 horas adelante,
// pero Alejandro está conectado a su familia bogotana — esta fecha es la
// que más sentido tiene para el ritual de "una al día".
function todayBogota(): string {
  const now = new Date();
  const bogMs = now.getTime() - 5 * 3_600_000 - now.getTimezoneOffset() * 60_000;
  // Lo anterior fuerza UTC-5. Lo simple:
  const bogDate = new Date(Date.now() - 5 * 3_600_000);
  return bogDate.toISOString().slice(0, 10);
}

// POST /api/alejandro/reveal { year }
// Reglas:
//   - Si year ya está en revealed_years: { kind: 'already-revealed' }
//   - Si last_reveal_date === hoy (otro año): { kind: 'blocked-today' }
//   - Caso contrario: agrega year a revealed_years, set last_reveal_date a hoy
//     y responde { kind: 'first-reveal' }.
// Sin auth — el endpoint es para Alejandro (familia tiene cookie y bypasa el
// gate antes de llegar acá).
export async function POST(req: Request) {
  const body = await req.json().catch(() => null);
  if (!body || typeof body.year !== 'number') {
    return NextResponse.json({ kind: 'error', error: 'invalid' }, { status: 400 });
  }
  const year: number = body.year;

  const supabase = getServiceClient();
  if (!supabase) {
    return NextResponse.json({ kind: 'no-backend' }, { status: 200 });
  }

  const { data: current, error: readErr } = await supabase
    .from('alejandro_state')
    .select('revealed_years, last_reveal_date')
    .eq('id', 'singleton')
    .maybeSingle();

  if (readErr) {
    return NextResponse.json({ kind: 'error', error: readErr.message }, { status: 500 });
  }

  const revealed: number[] = (current?.revealed_years as number[]) || [];
  const last: string | null = (current?.last_reveal_date as string) || null;
  const today = todayBogota();

  if (revealed.includes(year)) {
    return NextResponse.json({
      kind: 'already-revealed',
      state: { revealedYears: revealed, lastRevealDate: last }
    });
  }

  if (last === today) {
    return NextResponse.json({
      kind: 'blocked-today',
      state: { revealedYears: revealed, lastRevealDate: last }
    });
  }

  const updated = [...revealed, year];
  const { error: writeErr } = await supabase
    .from('alejandro_state')
    .upsert({
      id: 'singleton',
      revealed_years: updated,
      last_reveal_date: today,
      updated_at: new Date().toISOString()
    });

  if (writeErr) {
    return NextResponse.json({ kind: 'error', error: writeErr.message }, { status: 500 });
  }

  return NextResponse.json({
    kind: 'first-reveal',
    state: { revealedYears: updated, lastRevealDate: today }
  });
}
