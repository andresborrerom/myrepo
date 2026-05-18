'use client';

import { useState, type FormEvent } from 'react';

type Props = {
  source: string;
  ctaLabel: string;
  variant?: 'light' | 'dark';
};

type Status = { kind: 'idle' } | { kind: 'loading' } | { kind: 'ok' } | { kind: 'err'; msg: string };

export default function WaitlistForm({ source, ctaLabel, variant = 'light' }: Props) {
  const [status, setStatus] = useState<Status>({ kind: 'idle' });

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus({ kind: 'loading' });

    const form = new FormData(e.currentTarget);
    const email = String(form.get('email') ?? '').trim();
    const name = String(form.get('name') ?? '').trim();
    const honey = String(form.get('website') ?? '');

    if (honey) {
      setStatus({ kind: 'ok' });
      return;
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setStatus({ kind: 'err', msg: 'Revisa el correo, no parece válido.' });
      return;
    }

    const params = new URLSearchParams(window.location.search);
    const utm = {
      utm_source: params.get('utm_source') ?? null,
      utm_medium: params.get('utm_medium') ?? null,
      utm_campaign: params.get('utm_campaign') ?? null
    };

    const res = await fetch('/api/waitlist', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, name, source, ...utm })
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      setStatus({ kind: 'err', msg: body.error ?? 'No pudimos guardarlo. Intenta de nuevo.' });
      return;
    }
    setStatus({ kind: 'ok' });
  }

  if (status.kind === 'ok') {
    return (
      <div
        className={
          variant === 'dark'
            ? 'rounded-lg border border-arena/30 bg-arena/10 p-5 text-arena'
            : 'rounded-lg border border-botella/30 bg-botella/5 p-5 text-tinta-900'
        }
      >
        <p className="font-serif text-lg mb-1">Listo.</p>
        <p className="text-sm opacity-90">
          Te escribimos en cuanto abramos plazas. Revisa tu bandeja (y a veces spam) por
          si rebotamos un correo de confirmación.
        </p>
      </div>
    );
  }

  const inputBase =
    variant === 'dark'
      ? 'w-full rounded-md border border-arena/30 bg-tinta-800/60 px-4 py-3 text-arena placeholder:text-arena/50 focus:border-arena focus:outline-none focus:ring-1 focus:ring-arena'
      : 'w-full rounded-md border border-regla bg-white/80 px-4 py-3 text-tinta-900 placeholder:text-tinta-800/40 focus:border-arcilla-500 focus:outline-none focus:ring-1 focus:ring-arcilla-500';

  const button =
    variant === 'dark'
      ? 'w-full sm:w-auto rounded-md bg-arena px-6 py-3 font-medium text-tinta-900 hover:bg-arena-warm disabled:opacity-50 transition'
      : 'w-full sm:w-auto rounded-md bg-arcilla-500 px-6 py-3 font-medium text-arena hover:bg-arcilla-600 disabled:opacity-50 transition';

  return (
    <form onSubmit={onSubmit} className="space-y-3">
      <div className="flex flex-col sm:flex-row gap-3">
        <input
          type="email"
          name="email"
          required
          autoComplete="email"
          placeholder="tucorreo@ejemplo.com"
          className={inputBase}
          aria-label="Correo"
        />
        <button
          type="submit"
          disabled={status.kind === 'loading'}
          className={button}
        >
          {status.kind === 'loading' ? 'Enviando…' : ctaLabel}
        </button>
      </div>
      <input
        type="text"
        name="name"
        autoComplete="given-name"
        placeholder="Nombre (opcional)"
        className={inputBase}
        aria-label="Nombre"
      />
      {/* Honeypot — bots lo rellenan, humanos no lo ven */}
      <input
        type="text"
        name="website"
        tabIndex={-1}
        autoComplete="off"
        className="hidden"
        aria-hidden="true"
      />
      {status.kind === 'err' && (
        <p
          className={
            variant === 'dark' ? 'text-sm text-arcilla-400' : 'text-sm text-arcilla-600'
          }
        >
          {status.msg}
        </p>
      )}
    </form>
  );
}
