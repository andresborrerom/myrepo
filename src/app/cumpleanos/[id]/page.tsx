import Link from 'next/link';
import { notFound } from 'next/navigation';
import { TARJETAS_CUMPLE, getTarjetaCumple } from '@/data/cumpleanos';
import TarjetaAbrible from './TarjetaAbrible';

export function generateStaticParams() {
  return TARJETAS_CUMPLE.map((t) => ({ id: t.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params;
  const t = getTarjetaCumple(id);
  if (!t) return { title: 'Tarjeta no encontrada' };
  return { title: `Tarjeta de ${t.fromShortName || t.fromName} · 75 años` };
}

export default async function TarjetaCumplePage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const t = getTarjetaCumple(id);
  if (!t) notFound();

  return (
    <div className="bg-lino text-tinta min-h-dvh -mt-6 -mx-5 px-6 pt-6 pb-32">
      <div className="pt-2">
        <Link
          href="/cumpleanos"
          className="font-mono text-[10px] tracking-[0.2em] text-grafito hover:text-tomate"
        >
          ← TARJETAS
        </Link>
      </div>

      <TarjetaAbrible t={t} />

      <div className="mt-10 text-center">
        <Link
          href="/cumpleanos"
          className="font-serif text-sm italic text-grafito hover:text-tomate"
        >
          ← Volver a todas las tarjetas
        </Link>
      </div>
    </div>
  );
}
