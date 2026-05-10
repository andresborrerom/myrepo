'use client';

import { useEffect, useState } from 'react';
import { getBirthdayDate } from '@/lib/config';

function diff(target: Date) {
  const now = Date.now();
  const ms = target.getTime() - now;
  if (ms <= 0) return null;
  const days = Math.floor(ms / 86_400_000);
  const hours = Math.floor((ms % 86_400_000) / 3_600_000);
  return { days, hours };
}

export default function Countdown() {
  const target = getBirthdayDate();
  const [d, setD] = useState(() => diff(target));

  useEffect(() => {
    const t = setInterval(() => setD(diff(target)), 60_000);
    return () => clearInterval(t);
  }, [target]);

  if (!d) {
    return (
      <p className="text-2xl font-display text-clay-600">
        ¡Hoy es el gran día! Feliz cumpleaños, papá. 🎉
      </p>
    );
  }

  return (
    <p className="text-lg text-ink-800">
      Faltan{' '}
      <strong className="text-3xl font-display text-clay-600">{d.days}</strong>{' '}
      {d.days === 1 ? 'día' : 'días'} para los <strong>75</strong> de Alejandro.
    </p>
  );
}
