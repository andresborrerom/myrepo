export const metadata = { title: 'Buzón' };

export default function BuzonPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-ink-900">El Buzón</h1>
        <p className="text-base text-ink-800/80">
          Aquí entran las novedades que la familia te va dejando: fotos, audios,
          notas, dibujos.
        </p>
      </header>

      <section className="rounded-3xl bg-cream-100 p-6 text-center shadow-warm">
        <p className="font-display text-xl text-ink-900">Aún está vacío</p>
        <p className="mt-2 text-base text-ink-800/80">
          En los próximos días tu familia empezará a llenarlo. Te avisaremos
          cuando llegue algo nuevo.
        </p>
      </section>

      <section className="rounded-2xl border border-dashed border-cream-200 bg-cream-50 p-5 text-sm text-ink-800/70">
        <strong className="block text-ink-900">Próximamente</strong>
        Subida de fotos/audio por miembro de la familia, reacciones de un toque
        ("❤", "qué orgullo", "te quiero"), y notificaciones agrupadas a su
        iPhone (una vez al día).
      </section>
    </div>
  );
}
