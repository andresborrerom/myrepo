'use client';

import { useState } from 'react';

// Botón de compartir nativo (iOS Safari soporta navigator.share). Si no está
// disponible, copia el link al portapapeles.
export default function ShareButton({
  url,
  title,
  text
}: {
  url?: string;
  title?: string;
  text?: string;
}) {
  const [copied, setCopied] = useState(false);

  async function share() {
    const finalUrl = url || (typeof window !== 'undefined' ? window.location.href : '');
    if (typeof navigator !== 'undefined' && 'share' in navigator) {
      try {
        await navigator.share({ url: finalUrl, title, text });
        return;
      } catch {
        // canceló o falló, caemos al copy
      }
    }
    if (typeof navigator !== 'undefined' && navigator.clipboard) {
      await navigator.clipboard.writeText(finalUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    }
  }

  return (
    <button
      type="button"
      onClick={share}
      className="flex items-center gap-2 rounded-full bg-cream-100 px-4 py-2 text-sm text-ink-900"
    >
      <span aria-hidden className="text-lg">↗︎</span>
      <span>{copied ? 'Link copiado' : 'Compartir'}</span>
    </button>
  );
}
