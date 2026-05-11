import { NextResponse } from 'next/server';
import { ADMIN_PASSWORD, setAdminAuthCookie } from '@/lib/auth';

export async function POST(req: Request) {
  const { password } = await req.json().catch(() => ({ password: '' }));
  if (password !== ADMIN_PASSWORD) {
    return NextResponse.json({ error: 'Contraseña incorrecta' }, { status: 401 });
  }
  setAdminAuthCookie();
  return NextResponse.json({ ok: true });
}
