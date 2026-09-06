// sw.js — must be served from the site root, alongside index.html

self.addEventListener("push", (event) => {
  let data = { title: "Lil Guy", body: "He's getting hungry..." };
  try {
    if (event.data) data = event.data.json();
  } catch (e) {
    // fall back to default text above if the payload isn't JSON
  }

  event.waitUntil(
    self.registration.showNotification(data.title, {
      body: data.body,
      icon: data.icon || undefined,
    })
  );
});

self.addEventListener("notificationclick", (event) => {
  event.notification.close();
  event.waitUntil(
    clients.matchAll({ type: "window" }).then((clientList) => {
      for (const client of clientList) {
        if ("focus" in client) return client.focus();
      }
      if (clients.openWindow) return clients.openWindow("/");
    })
  );
});
