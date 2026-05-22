/* Service Worker — Casa de Papá.
   Solo maneja Web Push: recibe la notificación y, al tocarla, abre la app
   directo en /abrir-carta (la carta aleatoria del día). */

self.addEventListener('push', (event) => {
  let data = {};
  try {
    data = event.data ? event.data.json() : {};
  } catch (e) {
    data = {};
  }
  const title = data.title || 'La Casa de Papá';
  const options = {
    body: data.body || 'Te espera una carta.',
    icon: '/icon-192.png',
    badge: '/icon-192.png',
    data: { url: data.url || '/abrir-carta' },
    vibrate: [120, 60, 120]
  };
  event.waitUntil(self.registration.showNotification(title, options));
});

self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  const url = (event.notification.data && event.notification.data.url) || '/abrir-carta';
  event.waitUntil(
    self.clients.matchAll({ type: 'window', includeUncontrolled: true }).then((wins) => {
      for (const w of wins) {
        if ('focus' in w) {
          w.navigate(url);
          return w.focus();
        }
      }
      return self.clients.openWindow(url);
    })
  );
});
