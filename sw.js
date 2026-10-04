// Service Worker: macht die App installierbar und offline-fähig.
// Strategie "Netzwerk zuerst": Updates von GitHub kommen sofort an,
// ohne Internet wird die zuletzt geladene Version aus dem Speicher gezeigt.
const CACHE = "ontrack-v1";

self.addEventListener("install", () => self.skipWaiting());
self.addEventListener("activate", (e) => e.waitUntil(self.clients.claim()));

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET" || new URL(req.url).origin !== self.location.origin) return;
  e.respondWith(
    fetch(req)
      .then((res) => {
        if (res.ok) { const copy = res.clone(); caches.open(CACHE).then((c) => c.put(req, copy)); }
        return res;
      })
      .catch(() => caches.match(req))
  );
});

// ===== Push-Nachrichten (Firebase Cloud Messaging) =====
self.addEventListener("push", (e) => {
  let d = {};
  try { d = e.data ? e.data.json() : {}; } catch (err) { d = { notification: { body: e.data && e.data.text() } }; }
  const n = d.notification || {}, data = d.data || {};
  const link = (d.fcmOptions && d.fcmOptions.link) || data.link || "freitag.html";
  e.waitUntil(self.registration.showNotification(n.title || data.title || "On Track", {
    body: n.body || data.body || "",
    icon: n.icon || "icon-192.png",
    badge: "icon-192.png",
    tag: data.tag || "ontrack",
    data: { link }
  }));
});

self.addEventListener("notificationclick", (e) => {
  e.notification.close();
  const url = new URL(e.notification.data && e.notification.data.link || "freitag.html", self.registration.scope).href;
  e.waitUntil(self.clients.matchAll({ type: "window", includeUncontrolled: true }).then((list) => {
    const offen = list.find(c => c.url.startsWith(self.registration.scope));
    if (offen) { offen.navigate(url); return offen.focus(); }
    return self.clients.openWindow(url);
  }));
});
