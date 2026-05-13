// Helpers para el calendario familiar. Trabaja sobre Person.birthDate
// ('YYYY-MM-DD'). Si una persona no tiene birthDate, se considera
// "fecha por agregar" y se muestra al final del calendario.

import { FAMILY, type Person } from '@/data/family';

export type BirthdayInfo = {
  person: Person;
  date: Date;
  daysUntil: number;       // 0 = hoy, negativo = pasó hace tanto
  ageOnNextBirthday: number;
  isToday: boolean;
};

function todayBogota(): Date {
  // Aprox. UTC-5. No usamos timezone exacto para no complicar — el calendario
  // muestra "días" y un día arriba/abajo no importa para una vista mensual.
  const now = new Date();
  const utc = now.getTime() + now.getTimezoneOffset() * 60_000;
  return new Date(utc + -5 * 3_600_000);
}

function parseBirth(birthDate: string): { month: number; day: number; year: number } | null {
  const m = /^(\d{4})-(\d{2})-(\d{2})$/.exec(birthDate);
  if (!m) return null;
  return {
    year: Number(m[1]),
    month: Number(m[2]) - 1,
    day: Number(m[3])
  };
}

export function getNextBirthday(person: Person, ref: Date = todayBogota()): BirthdayInfo | null {
  if (!person.birthDate) return null;
  const parsed = parseBirth(person.birthDate);
  if (!parsed) return null;

  const refYear = ref.getFullYear();
  let next = new Date(refYear, parsed.month, parsed.day);
  // Si ya pasó este año, próximo año.
  const refMidnight = new Date(refYear, ref.getMonth(), ref.getDate());
  if (next.getTime() < refMidnight.getTime()) {
    next = new Date(refYear + 1, parsed.month, parsed.day);
  }
  const diffMs = next.getTime() - refMidnight.getTime();
  const daysUntil = Math.round(diffMs / 86_400_000);
  const ageOnNextBirthday = next.getFullYear() - parsed.year;
  const isToday = daysUntil === 0;

  return { person, date: next, daysUntil, ageOnNextBirthday, isToday };
}

export function getCalendar(): {
  conFecha: BirthdayInfo[];
  sinFecha: Person[];
} {
  const ref = todayBogota();
  const conFecha: BirthdayInfo[] = [];
  const sinFecha: Person[] = [];

  for (const p of FAMILY) {
    const info = getNextBirthday(p, ref);
    if (info) conFecha.push(info);
    else sinFecha.push(p);
  }

  conFecha.sort((a, b) => a.daysUntil - b.daysUntil);
  return { conFecha, sinFecha };
}

export function formatBirthDate(birthDate: string): string {
  const parsed = parseBirth(birthDate);
  if (!parsed) return birthDate;
  const months = [
    'enero', 'febrero', 'marzo', 'abril', 'mayo', 'junio',
    'julio', 'agosto', 'septiembre', 'octubre', 'noviembre', 'diciembre'
  ];
  return `${parsed.day} de ${months[parsed.month]}`;
}
