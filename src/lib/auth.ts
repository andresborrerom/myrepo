// Gates por contraseña simple. No es auth fuerte: es una puerta familiar.
// Guarda la pass como cookie HTTP-only (server-side) por 60 días.

import { cookies } from 'next/headers';

const FAMILY_COOKIE = 'casa-aporta-gate';
const ADMIN_COOKIE = 'casa-admin-gate';
const COOKIE_MAX_AGE = 60 * 60 * 24 * 60; // 60 días

export const FAMILY_PASSWORD =
  process.env.FAMILY_PASSWORD || 'borrero75';
export const ADMIN_PASSWORD =
  process.env.ADMIN_PASSWORD || 'papa75-admin';

export function isFamilyAuth(): boolean {
  return cookies().get(FAMILY_COOKIE)?.value === FAMILY_PASSWORD;
}

export function isAdminAuth(): boolean {
  return cookies().get(ADMIN_COOKIE)?.value === ADMIN_PASSWORD;
}

export function setFamilyAuthCookie() {
  cookies().set(FAMILY_COOKIE, FAMILY_PASSWORD, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: COOKIE_MAX_AGE,
    path: '/'
  });
}

export function setAdminAuthCookie() {
  cookies().set(ADMIN_COOKIE, ADMIN_PASSWORD, {
    httpOnly: true,
    sameSite: 'lax',
    secure: process.env.NODE_ENV === 'production',
    maxAge: COOKIE_MAX_AGE,
    path: '/'
  });
}

export function clearAuthCookies() {
  cookies().delete(FAMILY_COOKIE);
  cookies().delete(ADMIN_COOKIE);
}

// "Insider" = familia o admin. Sirve como gate para vista preview de
// la rejilla de cartas. Si no eres insider (es decir, eres Alejandro),
// solo ves contenido ya revelado.
export function isInsider(): boolean {
  return isFamilyAuth() || isAdminAuth();
}
