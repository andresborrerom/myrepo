export const metadata = { title: 'Estudio' };

export default function EstudioPage() {
  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-ink-900">El Estudio</h1>
        <p className="text-base text-ink-800/80">
          La obra de Alejandro: las casas que construyó para su familia y para el
          mundo, y las flores que ha llevado a millones de hogares.
        </p>
      </header>

      <section
        aria-label="Casas para sus hijos"
        className="rounded-3xl bg-cream-100 p-6 shadow-warm"
      >
        <h2 className="font-display text-xl text-ink-900">Cinco casas, cinco hogares</h2>
        <p className="mt-2 text-base text-ink-800">
          A cada uno de sus cinco hijos, Alejandro le construyó una casa para vivir
          con su familia. No solo techos: pisos altos para la tranquilidad, los
          árboles que crecen al lado de los nietos, y la certeza de un lugar
          propio en el mundo.
        </p>
        <p className="mt-3 text-sm text-ink-800/60 italic">
          Próximamente: foto y planos de cada casa.
        </p>
      </section>

      <section
        aria-label="Obra arquitectónica"
        className="rounded-3xl bg-cream-100 p-6 shadow-warm"
      >
        <h2 className="font-display text-xl text-ink-900">Construcción</h2>
        <p className="mt-2 text-base text-ink-800">
          Su trabajo como arquitecto en Bogotá. Una selección de proyectos,
          fechas y anécdotas de quienes los habitaron.
        </p>
        <p className="mt-3 text-sm text-ink-800/60 italic">
          Próximamente: mapa interactivo y fichas de obra.
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
          Próximamente: cifras, hitos, fotos de los cultivos y una galería de las
          variedades insignia.
        </p>
      </section>
    </div>
  );
}
