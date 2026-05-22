'use client';

import { VAPID_PUBLIC_KEY } from './vapid';

export type PushResult =
  | 'ok'
  | 'denied'
  | 'unsupported'
  | 'error';

function urlBase64ToUint8Array(base64: string): Uint8Array {
  const padding = '='.repeat((4 - (base64.length % 4)) % 4);
  const b64 = (base64 + padding).replace(/-/g, '+').replace(/_/g, '/');
  const raw = atob(b64);
  const out = new Uint8Array(raw.length);
  for (let i = 0; i < raw.length; i++) out[i] = raw.charCodeAt(i);
  return out;
}

// Registra el service worker, pide permiso de notificaciones y guarda la
// suscripción push en el servidor. Devuelve un estado para feedback en UI.
export async function activarRecordatorio(): Promise<PushResult> {
  if (
    typeof window === 'undefined' ||
    !('serviceWorker' in navigator) ||
    !('PushManager' in window) ||
    !('Notification' in window)
  ) {
    return 'unsupported';
  }

  try {
    const reg = await navigator.serviceWorker.register('/sw.js');
    await navigator.serviceWorker.ready;

    const permission = await Notification.requestPermission();
    if (permission !== 'granted') return 'denied';

    let sub = await reg.pushManager.getSubscription();
    if (!sub) {
      sub = await reg.pushManager.subscribe({
        userVisibleOnly: true,
        applicationServerKey: urlBase64ToUint8Array(VAPID_PUBLIC_KEY)
      });
    }

    const res = await fetch('/api/push/subscribe', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(sub)
    });
    if (!res.ok) return 'error';

    return 'ok';
  } catch {
    return 'error';
  }
}

// ¿Ya está activo el recordatorio en este dispositivo?
export async function recordatorioYaActivo(): Promise<boolean> {
  if (
    typeof window === 'undefined' ||
    !('serviceWorker' in navigator) ||
    !('PushManager' in window) ||
    !('Notification' in window)
  ) {
    return false;
  }
  if (Notification.permission !== 'granted') return false;
  try {
    const reg = await navigator.serviceWorker.getRegistration();
    if (!reg) return false;
    const sub = await reg.pushManager.getSubscription();
    return !!sub;
  } catch {
    return false;
  }
}
