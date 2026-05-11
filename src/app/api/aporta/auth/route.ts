import { NextResponse } from 'next/server';
import { FAMILY_PASSWORD, setFamilyAuthCookie } from '@/lib/auth';

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: '' }));
  if (password !== FAMILY_PASSWORD) {
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
  }
  setFamilyAuthCookie();
  return NextResponse.json({ ok: true });
}
