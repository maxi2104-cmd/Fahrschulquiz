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
