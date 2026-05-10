'use client';

import { useEffect, useState } from 'react';

const STORAGE_PREFIX = 'casa-alejandro:heart:';

// Botón de "me llegó al corazón". Toggle persistente local. Sin contadores
// para que no se sienta como métrica — es un gesto privado del que mira.
export default function HeartButton({
  itemId,
  label = 'Me llegó al corazón'
}: {
  itemId: string;
  label?: string;
}) {
  const [active, setActive] = useState(false);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    setActive(localStorage.getItem(STORAGE_PREFIX + itemId) === '1');
  }, [itemId]);

  function toggle() {
    const next = !active;
    setActive(next);
    if (next) {
      localStorage.setItem(STORAGE_PREFIX + itemId, '1');
      setPulse(true);
      setTimeout(() => setPulse(false), 600);
    } else {
      localStorage.removeItem(STORAGE_PREFIX + itemId);
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={active}
      aria-label={label}
      className={`flex items-center gap-2 rounded-full px-4 py-2 text-sm transition ${
        active
          ? 'bg-clay-500 text-cream-50'
          : 'bg-cream-100 text-ink-900'
      } ${pulse ? 'scale-110' : ''}`}
      style={{ transitionDuration: '200ms' }}
    >
      <span aria-hidden className="text-lg">{active ? '❤️' : '🤍'}</span>
      <span>{active ? 'Te llegó' : label}</span>
    </button>
  );
}
