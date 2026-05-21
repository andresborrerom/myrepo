'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

type Tab = { href: string; n: string; label: string };

// v2 — numeración editorial estilo Plano Maestro / Apartamento.
// Los emojis se fueron. Quedó el número (mono) sobre el rótulo (serif).
const TABS: Tab[] = [
  { href: '/',         n: '01', label: 'Vestíbulo' },
  { href: '/arbol',    n: '02', label: 'Árbol' },
  { href: '/cartas',   n: '03', label: 'Cartas' },
  { href: '/buzon',    n: '04', label: 'Buzón' }
];

export default function BottomNav() {
  const pathname = usePathname();

  return (
    <nav
      aria-label="Navegación principal"
      className="fixed bottom-0 left-0 right-0 z-30 border-t border-regla bg-lino/95 backdrop-blur"
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
                className={`flex flex-col items-center gap-0.5 py-3 ${
                  active ? 'text-tomate' : 'text-tinta'
                }`}
              >
                <span className={`font-mono text-[10px] tracking-widest ${
                  active ? 'text-tomate' : 'text-grafito'
                }`}>
                  {tab.n}
                </span>
                <span className="font-display text-base font-light italic">
                  {tab.label}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
