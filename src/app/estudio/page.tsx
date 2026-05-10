import Avatar from '@/components/Avatar';
import { HIJOS, getPerson } from '@/data/family';
import { getCasaDe } from '@/data/casas';

export const metadata = { title: 'Estudio' };

export default function EstudioPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-ink-900">El Estudio</h1>
        <p className="text-base text-ink-800/80">
          Tu obra: las casas que construiste para nosotros y para el mundo, y las
          flores que has llevado a millones de hogares.
        </p>
      </header>

      <CincoCasas />

      <section
        aria-label="Obra arquitectónica"
        className="rounded-3xl bg-cream-100 p-6 shadow-warm"
      >
        <h2 className="font-display text-xl text-ink-900">Construcción</h2>
        <p className="mt-2 text-base text-ink-800">
          Tu trabajo como arquitecto en Bogotá. Una selección de proyectos,
          fechas y anécdotas de quienes los habitaron.
        </p>
        <p className="mt-3 text-sm text-ink-800/60 italic">
          Próximamente: fichas de obra con fotos.
        </p>
      </section>

      <section
        aria-label="Elite Flower"
        className="rounded-3xl bg-olive-700 p-6 text-cream-50 shadow-warm"
      >
        <h2 className="font-display text-2xl">Elite Flower</h2>
        <p className="mt-2 text-base">
          Embellecer al mundo, una flor a la vez. La historia de Elite Flower y
          de cómo desde la sabana de Bogotá llegan rosas y claveles a millones
          de mesas en EE.UU., Europa y Asia.
        </p>
        <p className="mt-3 text-sm italic opacity-80">
          Próximamente: cifras, hitos, fotos de los cultivos y galería de
          variedades insignia.
        </p>
      </section>
    </div>
  );
}

function CincoCasas() {
  return (
    <section
      aria-label="Las cinco casas"
      className="space-y-3 rounded-3xl bg-clay-500 p-6 text-cream-50 shadow-warm"
    >
      <h2 className="font-display text-2xl">Cinco casas, cinco hogares</h2>
      <p className="text-base/relaxed">
        A cada uno de tus cinco hijos le construiste una casa para vivir con su
        familia. No solo techos: pisos altos para nuestra tranquilidad, los
        árboles que crecen al lado de los nietos, y la certeza de un lugar
        propio en el mundo.
      </p>

      <ul className="mt-4 space-y-2">
        {HIJOS.map((hijo) => {
          const casa = getCasaDe(hijo.id);
          return (
            <li
              key={hijo.id}
              className="flex items-center gap-3 rounded-2xl bg-clay-600/60 p-3"
            >
              <Avatar person={hijo} size="sm" />
              <div className="flex-1 min-w-0">
                <p className="font-display text-base font-bold">
                  La casa de {hijo.shortName}
                </p>
                <p className="truncate text-sm opacity-90">
                  {casa?.barrio || 'barrio por completar'}
                  {casa?.yearBuilt ? ` · ${casa.yearBuilt}` : ''}
                </p>
              </div>
            </li>
          );
        })}
      </ul>

      <p className="pt-2 text-sm italic opacity-80">
        Próximamente: foto y anécdota de cada casa, escrita por el hijo que vive
        en ella.
      </p>
    </section>
  );
}
