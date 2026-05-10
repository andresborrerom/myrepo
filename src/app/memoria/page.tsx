export const metadata = { title: 'Memoria' };

export default function MemoriaPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-ink-900">La Memoria</h1>
        <p className="text-base text-ink-800/80">
          Una línea de tiempo de 75 años. Lo tuyo, lo nuestro, lo del mundo.
        </p>
      </header>

      <section className="rounded-3xl bg-cream-100 p-6 shadow-warm">
        <p className="font-display text-xl text-ink-900">En construcción</p>
        <p className="mt-2 text-base text-ink-800/80">
          Aquí irá la línea de tiempo de 1952 a 2027 y las 75 cartas — una por
          cada año — que la familia te dejará durante los 75 días siguientes a
          tu cumpleaños.
        </p>
      </section>
    </div>
  );
}
