import Link from 'next/link';
import { TARJETAS_CUMPLE, getTeaserCumple } from '@/data/cumpleanos';

export const metadata = { title: 'Tarjetas de cumpleaños' };

export default function CumpleanosPage() {
  return (
    <div className="bg-lino text-tinta min-h-dvh -mt-6 -mx-5 px-6 pt-8 pb-32">
      <header className="space-y-3 pt-2">
        <p className="font-mono text-[10px] tracking-[0.2em] text-grafito">
          CASA BORRERO OSPINA · 75 AÑOS
        </p>
        <h1 className="font-display text-5xl font-extralight italic leading-[1.05] text-tinta">
          Las tarjetas
          <br />
          de tu cumpleaños.
        </h1>
        <p className="font-serif text-base italic text-grafito">
          Las personas que llegaron a tu vida y se quedaron — escribiéndote por los setenta y cinco.
        </p>
      </header>

      <div className="my-8 h-px w-full bg-regla" aria-hidden />

      <section aria-label="Tarjetas" className="space-y-8">
        <p className="font-mono text-[10px] tracking-[0.2em] text-grafito">
          {TARJETAS_CUMPLE.length} {TARJETAS_CUMPLE.length === 1 ? 'TARJETA' : 'TARJETAS'}
        </p>

        <ul className="space-y-10">
          {TARJETAS_CUMPLE.map((t) => {
            const teaser = getTeaserCumple(t, 220);
            const from = t.fromShortName || t.fromName;
            return (
              <li key={t.id}>
                <Link href={`/cumpleanos/${t.id}`} className="block group">
                  <p className="font-mono text-[10px] tracking-[0.2em] text-grafito">
                    DE {from.toUpperCase()}
                    {t.fromRelation && ` · ${t.fromRelation.toUpperCase()}`}
                  </p>
                  {t.greeting && (
                    <h2 className="mt-2 font-display text-2xl font-light italic leading-tight text-tinta group-hover:text-tomate">
                      {t.greeting}
                    </h2>
                  )}
                  <p className="mt-3 font-serif text-base leading-relaxed text-tinta/85">
                    {teaser}
                  </p>
                  <p className="mt-4 font-mono text-[11px] tracking-wider text-tomate">
                    ABRIR TARJETA →
                  </p>
                </Link>
              </li>
            );
          })}
        </ul>
      </section>

      <div className="my-12 h-px w-full bg-regla" aria-hidden />

      <footer className="pt-2">
        <p className="text-center">
          <Link href="/" className="font-serif text-sm italic text-grafito hover:text-tomate">
            ← Volver al vestíbulo
          </Link>
        </p>
      </footer>
    </div>
  );
}
