'use client';

import { useEffect, useState } from 'react';
import { activarRecordatorio, recordatorioYaActivo, type PushResult } from '@/lib/push-client';

export default function PushOptIn() {
  const [estado, setEstado] = useState<'cargando' | 'activo' | 'inactivo'>('cargando');
  const [resultado, setResultado] = useState<PushResult | null>(null);
  const [trabajando, setTrabajando] = useState(false);

  useEffect(() => {
    recordatorioYaActivo().then((activo) => {
      setEstado(activo ? 'activo' : 'inactivo');
    });
  }, []);

  async function activar() {
    setTrabajando(true);
    const r = await activarRecordatorio();
    setResultado(r);
    if (r === 'ok') setEstado('activo');
    setTrabajando(false);
  }

  if (estado === 'cargando') return null;

  if (estado === 'activo') {
    return (
      <p className="font-serif text-sm italic text-musgo">
        ✓ Recordatorio diario activo. Cada mañana te avisamos para que abras tu carta.
      </p>
    );
  }

  return (
    <div className="space-y-2">
      <button
        type="button"
        onClick={activar}
        disabled={trabajando}
        className="inline-flex items-center gap-2 rounded-full bg-cuero px-5 py-2.5 font-mono text-[11px] tracking-[0.2em] text-papel shadow-warm transition active:scale-95 disabled:opacity-50"
      >
        {trabajando ? 'ACTIVANDO…' : '🔔 ACTIVAR RECORDATORIO DIARIO'}
      </button>

      {resultado === 'denied' && (
        <p className="font-serif text-xs italic text-tomate">
          No diste permiso de notificaciones. Si cambias de opinión, actívalas
          en los ajustes de Safari para esta app.
        </p>
      )}
      {resultado === 'unsupported' && (
        <p className="font-serif text-xs italic text-grafito">
          Para recibir el recordatorio, instala la app en tu pantalla de inicio
          (botón compartir → "Agregar a inicio") y vuelve a intentar.
        </p>
      )}
      {resultado === 'error' && (
        <p className="font-serif text-xs italic text-tomate">
          Algo falló. Intenta de nuevo en un momento.
        </p>
      )}
    </div>
  );
}
