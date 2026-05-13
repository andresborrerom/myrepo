import Link from 'next/link';
import Avatar from '@/components/Avatar';
import { getCalendar, formatBirthDate } from '@/lib/birthdays';
import { getColorRama } from '@/data/family';

export const metadata = { title: 'Calendario familiar' };
export const dynamic = 'force-dynamic';

export default function CalendarioPage() {
  const { conFecha, sinFecha } = getCalendar();
  const hoy = conFecha.find((b) => b.isToday);
  const proximos = conFecha.filter((b) => !b.isToday);

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-ink-900">Calendario familiar</h1>
        <p className="text-base text-ink-800/80">
          Los cumpleaños de la familia, ordenados por proximidad. Para que esta
          casa te siga sirviendo de hoy en adelante.
        </p>
      </header>

      {hoy && (
        <section
          aria-label="Hoy"
          className="overflow-hidden rounded-3xl bg-clay-500 text-cream-50 shadow-warm"
        >
          <div className="flex items-center gap-4 p-6">
            <Avatar person={hoy.person} size="lg" />
            <div>
              <p className="text-sm uppercase tracking-wide opacity-80">Hoy cumple</p>
              <p className="mt-1 font-display text-2xl font-bold">
                {hoy.person.shortName || hoy.person.name}
              </p>
              <p className="text-sm opacity-90">
                {hoy.ageOnNextBirthday} años
              </p>
            </div>
          </div>
        </section>
      )}

      {proximos.length > 0 && (
        <section aria-label="Próximos" className="space-y-3">
          <h2 className="font-display text-xl text-ink-900">
            {hoy ? 'Los demás de la familia' : 'Los próximos'}
          </h2>
          <ul className="space-y-2">
            {proximos.map((b) => {
              const ramaColor = getColorRama(b.person.id);
              const labelDias =
                b.daysUntil === 1 ? 'mañana' :
                b.daysUntil < 7 ? `en ${b.daysUntil} días` :
                b.daysUntil < 30 ? `en ${b.daysUntil} días` :
                `en ${Math.round(b.daysUntil / 30)} ${Math.round(b.daysUntil / 30) === 1 ? 'mes' : 'meses'}`;

              return (
                <li
                  key={b.person.id}
                  className="overflow-hidden rounded-2xl bg-cream-100 shadow-warm"
                >
                  <div aria-hidden className={`h-1.5 w-full ${ramaColor}`} />
                  <div className="flex items-center gap-3 p-3">
                    <Avatar person={b.person} size="md" />
                    <div className="flex-1 min-w-0">
                      <p className="font-display text-base font-bold text-ink-900">
                        {b.person.shortName || b.person.name}
                      </p>
                      <p className="text-sm text-ink-800/70">
                        {formatBirthDate(b.person.birthDate!)} · cumple {b.ageOnNextBirthday}
                      </p>
                    </div>
                    <span className="rounded-full bg-clay-500/10 px-3 py-1 text-xs font-bold text-clay-700">
                      {labelDias}
                    </span>
                  </div>
                </li>
              );
            })}
          </ul>
        </section>
      )}

      {sinFecha.length > 0 && (
        <section
          aria-label="Sin fecha"
          className="rounded-2xl border border-dashed border-cream-200 bg-cream-50 p-4"
        >
          <p className="font-display text-base text-ink-900">
            Faltan fechas de cumpleaños
          </p>
          <p className="mt-1 text-sm text-ink-800/70">
            {sinFecha.length} {sinFecha.length === 1 ? 'miembro' : 'miembros'} de la
            familia sin fecha registrada. Cuando me la pases (DD-MM-AAAA),
            la agrego al calendario.
          </p>
          <ul className="mt-3 grid grid-cols-2 gap-2">
            {sinFecha.map((p) => (
              <li
                key={p.id}
                className="rounded-xl bg-cream-100 p-2 text-sm text-ink-800"
              >
                {p.shortName || p.name}
              </li>
            ))}
          </ul>
        </section>
      )}

      <Link
        href="/memoria"
        className="block rounded-2xl border border-cream-200 bg-cream-50 p-4 text-center text-sm text-ink-800/80"
      >
        ‹ Volver a Memoria
      </Link>
    </div>
  );
}
