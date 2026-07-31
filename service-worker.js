// Kauai Countdown — service worker
// Bump CACHE version to force clients to fetch new files after a deploy.
const CACHE = "kauai-v2";
const ASSETS = [
  "./",
  "./index.html",
  "./manifest.webmanifest",
  "./icon.svg",
  "./icon-192.png",
  "./icon-512.png",
  "./icon-maskable-512.png"
];

self.addEventListener("install", (e) => {
  e.waitUntil(
    caches.open(CACHE).then((c) => c.addAll(ASSETS)).then(() => self.skipWaiting())
  );
});

self.addEventListener("activate", (e) => {
  e.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)))
    ).then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (e) => {
  const req = e.request;
  if (req.method !== "GET") return;

  const url = new URL(req.url);

  // Never cache the weather API or YouTube; always go to the network.
  if (
    url.hostname.includes("open-meteo.com") ||
    url.hostname.includes("youtube.com") ||
    url.hostname.includes("youtube-nocookie.com") ||
    url.hostname.includes("ytimg.com") ||
    url.hostname.includes("googlevideo.com")
  ) {
    return; // let the browser handle it normally
  }

  // Same-origin: cache-first with background refresh (stale-while-revalidate)
  if (url.origin === self.location.origin) {
    e.respondWith(
      caches.match(req).then((cached) => {
        const fetchPromise = fetch(req)
          .then((res) => {
            if (res && res.status === 200) {
              const copy = res.clone();
              caches.open(CACHE).then((c) => c.put(req, copy));
            }
            return res;
          })
          .catch(() => cached);
        return cached || fetchPromise;
      })
    );
  }
});
