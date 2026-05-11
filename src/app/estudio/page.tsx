import Avatar from '@/components/Avatar';
import { HIJOS } from '@/data/family';
import { getCasaDe } from '@/data/casas';
import { OBRAS } from '@/data/obras';

export const metadata = { title: 'Estudio' };

export default function EstudioPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-ink-900">El Estudio</h1>
        <p className="text-base text-ink-800/80">
          Tu obra: las casas que construiste para nosotros, los edificios que
          dibujaste para otros, las rosas que llevas al mundo, y la escuela
          que lleva el nombre de tu papá.
        </p>
      </header>

      <CincoCasas />

      <ObrasDeArquitectura />

      <EliteFlower />

      <Fundacion />
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

function ObrasDeArquitectura() {
  return (
    <section
      aria-label="Estudio Borrero y Sánchez"
      className="rounded-3xl bg-cream-100 p-6 shadow-warm"
    >
      <h2 className="font-display text-2xl text-ink-900">
        Borrero y Sánchez Cía.
      </h2>
      <p className="mt-2 text-base text-ink-800">
        El estudio de arquitectura con el que firmaste los edificios de Bogotá
        que muchos llamamos hogar. Lo que sigue son las obras que recordamos —
        cada uno de tus hijos llenará la suya con los detalles.
      </p>

      <ul className="mt-5 space-y-3">
        {OBRAS.map((o) => (
          <li key={o.id} className="rounded-2xl bg-cream-50 p-4">
            <p className="font-display text-lg font-bold text-ink-900">
              {o.name}
            </p>
            {(o.address || o.city) && (
              <p className="text-sm text-ink-800/70">
                {[o.address, o.city].filter(Boolean).join(', ')}
                {o.yearBuilt ? ` · ${o.yearBuilt}` : ''}
              </p>
            )}
            {o.description && (
              <p className="mt-2 text-base text-ink-800">{o.description}</p>
            )}
            {o.family_note && (
              <p className="mt-2 rounded-lg bg-clay-500/10 px-3 py-2 text-sm italic text-clay-700">
                {o.family_note}
              </p>
            )}
          </li>
        ))}
      </ul>

      <p className="mt-5 text-sm italic text-ink-800/60">
        Próximamente: fotos de cada edificio, fechas, anécdotas de los hijos que
        las habitaron. Si tienes propaganda original, planos o tarjetas de la
        firma, sumamos.
      </p>
    </section>
  );
}

function EliteFlower() {
  const cifras: { label: string; value: string }[] = [
    { label: 'Empleados en Colombia',  value: '~9.000' },
    { label: 'Empleados globales',      value: '~42.000' },
    { label: 'Hectáreas en Colombia',   value: '~600' },
    { label: 'Hectáreas globales',      value: '~2.000' },
    { label: 'Tallos al año',           value: '2.700 millones' },
    { label: 'Variedades cultivadas',   value: '1.000+' },
    { label: 'Cuota exportadora 2024',  value: '13% (2° del país)' }
  ];

  return (
    <section
      aria-label="Elite Flower"
      className="rounded-3xl bg-olive-700 p-6 text-cream-50 shadow-warm"
    >
      <h2 className="font-display text-2xl">Elite Flower</h2>
      <p className="mt-2 text-base">
        Embellecer al mundo, una flor a la vez. Desde la sabana de Bogotá
        salen rosas, alstroemerias, gerberas, claveles y crisantemos hacia
        Estados Unidos, Reino Unido, Canadá, Japón y los Países Bajos.
      </p>

      <dl className="mt-5 grid grid-cols-2 gap-2">
        {cifras.map((c) => (
          <div key={c.label} className="rounded-xl bg-olive-600/60 p-3">
            <dt className="text-xs uppercase tracking-wide opacity-80">{c.label}</dt>
            <dd className="font-display text-lg font-bold">{c.value}</dd>
          </div>
        ))}
      </dl>

      <ul className="mt-5 space-y-2 text-base/relaxed">
        <li>· Para San Valentín 2025, Colombia mandó <strong>900 millones de tallos</strong> a Estados Unidos.</li>
        <li>· Para el Día de la Madre 2026, récord: <strong>330 millones de tallos</strong>.</li>
        <li>· Clientes: Walmart, Whole Foods, Costco, supermercados europeos.</li>
        <li>· Certificaciones: Florverde, VeriFlora, Rainforest Alliance.</li>
      </ul>

      <p className="mt-5 text-sm italic opacity-80">
        Cifras públicas verificadas en La República, Portafolio, Asocolflores y
        el sitio oficial de The Elite Flower.
      </p>
    </section>
  );
}

function Fundacion() {
  return (
    <section
      aria-label="Fundación Fernando Borrero Caicedo"
      className="rounded-3xl bg-cream-100 p-6 shadow-warm"
    >
      <h2 className="font-display text-2xl text-ink-900">
        Fundación Fernando Borrero Caicedo
      </h2>
      <p className="mt-2 text-base text-ink-800">
        En el año 2000, cinco años después de despedir a tu papá, ustedes los
        hermanos pusieron su nombre en un colegio. Está en El Corzo de
        Facatativá, al lado de los cultivos. Educa a los hijos de los
        trabajadores que cuidan las rosas de la familia.
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-2xl bg-clay-500 p-4 text-cream-50">
          <p className="text-xs uppercase tracking-wide opacity-80">Año 2000</p>
          <p className="font-display text-3xl font-bold">34</p>
          <p className="text-sm">primeros niños</p>
        </div>
        <div className="rounded-2xl bg-clay-700 p-4 text-cream-50">
          <p className="text-xs uppercase tracking-wide opacity-80">Hoy</p>
          <p className="font-display text-3xl font-bold">619</p>
          <p className="text-sm">niños beneficiados</p>
        </div>
      </div>

      <p className="mt-4 text-base text-ink-800">
        Cada uno de ellos pronuncia el apellido de tu padre todos los días.
        Cada vez que alguien en Estados Unidos compra un ramo de Elite en
        Whole Foods, sin saberlo está mandando algo a ese colegio que lleva
        el nombre de tu papá Fernando.
      </p>

      <p className="mt-3 text-base italic text-clay-700">
        Tu padre no se fue. Se volvió escuela.
      </p>
    </section>
  );
}
