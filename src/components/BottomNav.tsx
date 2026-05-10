'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Tab = { href: string; label: string; icon: string };

// 4 íconos grandes, etiqueta visible siempre. Diseñado para una mano y para
// que un abuelo pueda leer cada destino sin adivinar.
const TABS: Tab[] = [
  { href: '/',         label: 'Vestíbulo', icon: '🏠' },
  { href: '/arbol',    label: 'Árbol',     icon: '🌳' },
  { href: '/estudio',  label: 'Estudio',   icon: '✏️' },
  { href: '/buzon',    label: 'Buzón',     icon: '✉️' }
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-cream-200 bg-cream-50/95 backdrop-blur"
    >
      <ul className="mx-auto flex max-w-xl items-stretch justify-around px-2 pb-[env(safe-area-inset-bottom)]">
        {TABS.map((tab) => {
          const active =
            tab.href === '/' ? pathname === '/' : pathname.startsWith(tab.href);
          return (
            <li key={tab.href} className="flex-1">
              <Link
                href={tab.href}
                aria-current={active ? 'page' : undefined}
                className={`flex flex-col items-center gap-1 py-3 text-sm ${
                  active ? 'text-clay-600 font-bold' : 'text-ink-800'
                }`}
              >
                <span aria-hidden className="text-2xl leading-none">{tab.icon}</span>
                <span>{tab.label}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
