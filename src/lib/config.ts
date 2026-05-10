// Config de la app. La fecha del cumpleaños se puede sobreescribir vía
// NEXT_PUBLIC_BIRTHDAY_ISO en Vercel/.env.local — pero validamos que sea
// una fecha real antes de usarla, para evitar pegar una variable rota
// (el autocorrector móvil cambia comillas, guiones, etc.).

const FALLBACK_BIRTHDAY = '2026-05-21T07:00:00-05:00';

function pickBirthday(): string {
  const env = process.env.NEXT_PUBLIC_BIRTHDAY_ISO;
  if (env && !Number.isNaN(new Date(env).getTime())) return env;
  return FALLBACK_BIRTHDAY;
}

export const APP_NAME = 'La Casa de Alejandro';
export const APP_TAGLINE = '75 años de casas, jardines y familia.';
export const APP_DESCRIPTION =
  'Una casa digital para Alejandro Borrero Ospina en sus 75 años. Hecha por sus hijos y nietos.';

export const BIRTHDAY_ISO = pickBirthday();

export function getBirthdayDate(): Date {
  return new Date(BIRTHDAY_ISO);
}
