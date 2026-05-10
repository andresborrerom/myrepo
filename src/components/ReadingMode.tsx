'use client';

import { useEffect, useState } from 'react';

const KEY = 'casa-alejandro:reading-mode';

export default function ReadingMode() {
  const [comoda, setComoda] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem(KEY) === '1';
    setComoda(saved);
    document.documentElement.classList.toggle('lectura-comoda', saved);
  }, []);

  function toggle() {
    const next = !comoda;
    setComoda(next);
    localStorage.setItem(KEY, next ? '1' : '0');
    document.documentElement.classList.toggle('lectura-comoda', next);
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={comoda}
      className="flex items-center gap-2 rounded-full bg-cream-100 px-4 py-2 text-sm text-ink-900 shadow-warm"
    >
      <span aria-hidden className="text-base">🔍</span>
      {comoda ? 'Texto normal' : 'Texto más grande'}
    </button>
  );
}
