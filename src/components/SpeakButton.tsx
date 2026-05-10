'use client';

import { useEffect, useRef, useState } from 'react';

// Botón "Escuchar" usando Web Speech API (gratis, nativo en iOS Safari).
// Lee el texto en voz alta. Para 75 años es transformador.
//
// Nota iOS: la primera vez, Safari pide permiso silencioso de habla. Si no
// arranca al primer toque, basta con tocar otra vez.

export default function SpeakButton({
  text,
  lang = 'es-CO'
}: {
  text: string;
  lang?: string;
}) {
  const [supported, setSupported] = useState(true);
  const [speaking, setSpeaking] = useState(false);
  const utterRef = useRef<SpeechSynthesisUtterance | null>(null);

  useEffect(() => {
    setSupported(typeof window !== 'undefined' && 'speechSynthesis' in window);
    return () => {
      if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  function toggle() {
    if (!supported) return;
    const synth = window.speechSynthesis;

    if (speaking) {
      synth.cancel();
      setSpeaking(false);
      return;
    }

    const u = new SpeechSynthesisUtterance(text);
    u.lang = lang;
    u.rate = 0.95;   // un pelín más lento — más cómodo para oír
    u.pitch = 1.0;
    u.onend = () => setSpeaking(false);
    u.onerror = () => setSpeaking(false);
    utterRef.current = u;

    // iOS Safari a veces deja la cola en estado raro tras navegación.
    synth.cancel();
    synth.speak(u);
    setSpeaking(true);
  }

  if (!supported) return null;

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={speaking}
      aria-label={speaking ? 'Detener lectura' : 'Escuchar la carta'}
      className={`flex items-center gap-2 rounded-full px-5 py-3 text-base shadow-warm ${
        speaking ? 'bg-olive-700 text-cream-50' : 'bg-clay-500 text-cream-50'
      }`}
    >
      <span aria-hidden className="text-xl">{speaking ? '⏸' : '🔊'}</span>
      <span className="font-bold">{speaking ? 'Detener' : 'Escuchar la carta'}</span>
    </button>
  );
}
