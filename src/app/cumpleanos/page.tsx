import Link from 'next/link';
import { TARJETAS_CUMPLE } from '@/data/cumpleanos';
import TarjetaCover from './TarjetaCover';

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

      <section aria-label="Tarjetas" className="space-y-6">
        <p className="font-mono text-[10px] tracking-[0.2em] text-grafito">
          {TARJETAS_CUMPLE.length} {TARJETAS_CUMPLE.length === 1 ? 'TARJETA' : 'TARJETAS'}
        </p>

        <ul className="space-y-8">
          {TARJETAS_CUMPLE.map((t) => (
            <li key={t.id}>
              <Link
                href={`/cumpleanos/${t.id}`}
                className="block transition active:scale-[0.99]"
                aria-label={`Abrir tarjeta de ${t.fromShortName || t.fromName}`}
              >
                <TarjetaCover t={t} />
              </Link>
            </li>
          ))}
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
