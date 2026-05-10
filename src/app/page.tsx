import Link from 'next/link';
import Avatar from '@/components/Avatar';
import Countdown from '@/components/Countdown';
import { APP_TAGLINE } from '@/lib/config';
import { getPerson, PATRIARCH_ID } from '@/data/family';

export default function VestibuloPage() {
  const alejandro = getPerson(PATRIARCH_ID)!;

  return (
    <div className="space-y-8">
      <header className="flex flex-col items-center gap-4 text-center">
        <Avatar person={alejandro} size="xl" />
        <div>
          <h1 className="font-display text-3xl text-ink-900">Bienvenido a casa, papá</h1>
          <p className="mt-1 text-base text-ink-800/80">{APP_TAGLINE}</p>
        </div>
      </header>

      <section
        aria-label="Conteo regresivo"
        className="rounded-3xl bg-cream-100 p-6 text-center shadow-warm"
      >
        <Countdown />
      </section>

      <section aria-label="Novedades de hoy" className="space-y-3">
        <h2 className="font-display text-xl text-ink-900">Novedades de hoy</h2>
        <div className="rounded-2xl border border-dashed border-cream-200 bg-cream-50 p-6 text-center text-ink-800/70">
          Aún no hay novedades. La familia las irá llenando.
        </div>
      </section>

      <section aria-label="Atajos" className="grid grid-cols-2 gap-3">
        <ShortcutCard href="/arbol"   icon="🌳" title="Tu árbol"   sub="14 personas" />
        <ShortcutCard href="/estudio" icon="✏️" title="Tu obra"    sub="Casas y flores" />
        <ShortcutCard href="/buzon"   icon="✉️" title="El buzón"   sub="Mensajes y fotos" />
        <ShortcutCard href="/memoria" icon="📖" title="La memoria" sub="75 años" />
      </section>
    </div>
  );
}

function ShortcutCard({
  href, icon, title, sub
}: { href: string; icon: string; title: string; sub: string }) {
  return (
    <Link
      href={href}
      className="flex flex-col gap-1 rounded-2xl bg-cream-100 p-4 shadow-warm active:scale-[0.98]"
    >
      <span aria-hidden className="text-3xl">{icon}</span>
      <span className="font-display text-lg font-bold text-ink-900">{title}</span>
      <span className="text-sm text-ink-800/70">{sub}</span>
    </Link>
  );
}
