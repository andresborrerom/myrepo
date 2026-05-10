// Config de la app. Cambiar la fecha del cumpleaños en .env.local
// (NEXT_PUBLIC_BIRTHDAY_ISO) o aquí como fallback.

// 21 de mayo de 2027, 7:00 AM hora de Bogotá. Editar en .env.local si cambia.
const FALLBACK_BIRTHDAY = '2027-05-21T07:00:00-05:00';

export const APP_NAME = 'La Casa de Alejandro';
export const APP_TAGLINE = '75 años de casas, jardines y familia.';
export const APP_DESCRIPTION =
  'Una casa digital para Alejandro Borrero Ospina en sus 75 años. Hecha por sus hijos y nietos.';

export const BIRTHDAY_ISO =
  process.env.NEXT_PUBLIC_BIRTHDAY_ISO || FALLBACK_BIRTHDAY;

export function getBirthdayDate(): Date {
  return new Date(BIRTHDAY_ISO);
}
