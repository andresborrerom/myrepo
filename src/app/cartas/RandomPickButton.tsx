'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { fetchState, isTodayInBogota } from '@/lib/reveal-state';

export default function RandomPickButton({
  releasedYears
}: {
  releasedYears: number[];
}) {
  const router = useRouter();
  const [ready, setReady] = useState(false);
  const [canPick, setCanPick] = useState(false);
  const [candidates, setCandidates] = useState<number[]>([]);

  useEffect(() => {
    (async () => {
      const { revealedYears, lastRevealDate } = await fetchState();
      const remaining = releasedYears.filter((y) => !revealedYears.includes(y));
      setCandidates(remaining);
      const usedToday = isTodayInBogota(lastRevealDate);
      setCanPick(remaining.length > 0 && !usedToday);
      setReady(true);
    })();
  }, [releasedYears]);

  if (!ready) return null;

  if (!canPick && candidates.length > 0) {
    return (
      <p className="font-serif text-sm italic text-grafito text-center my-6">
        Ya abriste tu carta de hoy. Mañana otra.
      </p>
    );
  }

  if (candidates.length === 0) {
    return null;
  }

  function pick() {
    if (candidates.length === 0) return;
    const y = candidates[Math.floor(Math.random() * candidates.length)];
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
