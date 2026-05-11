'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

// Puerta de contraseña reutilizable. Envía a un endpoint que setea cookie.

export default function PasswordGate({
  title,
  subtitle,
  endpoint
}: {
  title: string;
  subtitle: string;
  endpoint: string;
}) {
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function submit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const res = await fetch(endpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password })
      });
      if (!res.ok) {
        const j = await res.json().catch(() => ({}));
        setError(j.error || 'Contraseña incorrecta');
        setLoading(false);
        return;
      }
      router.refresh();
    } catch {
      setError('Error de red. Intenta otra vez.');
      setLoading(false);
    }
  }

  return (
    <div className="flex min-h-[60dvh] flex-col items-center justify-center gap-6 text-center">
      <div className="space-y-2">
        <h1 className="font-display text-3xl text-ink-900">{title}</h1>
        <p className="text-base text-ink-800/80">{subtitle}</p>
      </div>
      <form onSubmit={submit} className="w-full max-w-sm space-y-3">
        <input
          type="password"
          inputMode="text"
          autoComplete="off"
          autoCapitalize="none"
          autoCorrect="off"
          spellCheck={false}
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full rounded-2xl border border-cream-200 bg-cream-50 px-5 py-4 text-base text-ink-900 shadow-warm focus:border-clay-500 focus:outline-none"
        />
        <button
          type="submit"
          disabled={loading || !password}
          className="w-full rounded-2xl bg-clay-500 px-5 py-4 text-base font-bold text-cream-50 shadow-warm disabled:opacity-50"
        >
          {loading ? 'Entrando...' : 'Entrar'}
        </button>
        {error && (
          <p className="text-sm text-clay-700">{error}</p>
        )}
      </form>
    </div>
  );
}
