'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { getRevealedYears, canRevealMoreToday } from '@/lib/reveal-state';

export default function RandomPickButton({
  releasedYears
}: {
  releasedYears: number[];
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [canPick, setCanPick] = useState(false);
  const [candidatesCount, setCandidatesCount] = useState(0);

  useEffect(() => {
    const revealed = new Set(getRevealedYears());
    const remaining = releasedYears.filter((y) => !revealed.has(y));
    setCandidatesCount(remaining.length);
    setCanPick(remaining.length > 0 && canRevealMoreToday());
    setReady(true);
  }, [releasedYears]);

  if (!ready) return null;

  if (!canRevealMoreToday()) {
    return (
      <p className="font-serif text-sm italic text-grafito text-center my-6">
        Ya abriste tu carta de hoy. Mañana otra.
      </p>
    );
  }

  if (candidatesCount === 0) {
    return null;
  }

  function pick() {
    const revealed = new Set(getRevealedYears());
    const remaining = releasedYears.filter((y) => !revealed.has(y));
    if (remaining.length === 0) return;
    const y = remaining[Math.floor(Math.random() * remaining.length)];
    router.push(`/cartas/${y}`);
  }

  return (
    <button
      onClick={pick}
      className="w-full rounded-none border border-tinta bg-transparent py-4 font-mono text-[11px] tracking-widest text-tinta hover:bg-tinta hover:text-lino transition-colors my-6"
    >
      ABRIR UNA AL AZAR →
    </button>
  );
}
