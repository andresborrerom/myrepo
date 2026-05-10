export const metadata = { title: 'Cómo instalarme' };

export default function ComoInstalarPage() {
  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h1 className="font-display text-3xl text-ink-900">Cómo poner esta app en tu iPhone</h1>
        <p className="text-base text-ink-800/80">
          Es muy fácil. Tres pasos en Safari y queda como cualquier otra app
          en tu pantalla de inicio.
        </p>
      </header>

      <ol className="space-y-4">
        <Step n={1} title="Abre la app en Safari">
          Toca el link que te mandé. Abre <strong>Safari</strong>, no Chrome.
        </Step>
        <Step n={2} title="Toca el botón de Compartir">
          Es el cuadrito con la flecha hacia arriba, abajo en el centro de la
          pantalla.
        </Step>
        <Step n={3} title="Elige “Añadir a pantalla de inicio”">
          Baja en la lista hasta verlo. Toca <strong>Añadir</strong>. Ya te
          aparece el ícono en la pantalla principal del iPhone.
        </Step>
      </ol>

      <p className="rounded-2xl bg-cream-100 p-4 text-base text-ink-900 shadow-warm">
        Después de instalar, ábrela desde el ícono (no desde el navegador).
        Así se ve a pantalla completa, sin barras.
      </p>
    </div>
  );
}

function Step({ n, title, children }: { n: number; title: string; children: React.ReactNode }) {
  return (
    <li className="rounded-2xl bg-cream-100 p-4 shadow-warm">
      <div className="flex items-center gap-3">
        <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-clay-500 font-display text-xl font-bold text-cream-50">
          {n}
        </span>
        <h2 className="font-display text-lg text-ink-900">{title}</h2>
      </div>
      <p className="mt-2 text-base text-ink-800">{children}</p>
    </li>
  );
}
