// Trade Jurnal – çevrimdışı çalışma için service worker
const VERSION = 'tj-v2';
const SHELL = ['./', './index.html', './manifest.webmanifest', './icons/icon-192.png', './icons/icon-512.png', './icons/apple-touch-icon.png', './icons/favicon-64.png'];

self.addEventListener('install', e => {
  e.waitUntil(caches.open(VERSION).then(c => c.addAll(SHELL)).then(() => self.skipWaiting()));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys => Promise.all(keys.filter(k => k !== VERSION).map(k => caches.delete(k)))).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  const req = e.request;
  if (req.method !== 'GET') return;
  const url = new URL(req.url);
  const sameOrigin = url.origin === self.location.origin;
  const isFont = /fonts\.(googleapis|gstatic)\.com$/.test(url.hostname);
  if (!sameOrigin && !isFont) return;
  // Sayfa: önce ağ (güncel sürüm), ağ yoksa önbellek
  if (req.mode === 'navigate') {
    e.respondWith(fetch(req).then(res => { const c = res.clone(); caches.open(VERSION).then(ca => ca.put('./index.html', c)); return res; })
      .catch(() => caches.match('./index.html')));
    return;
  }
  // Diğer dosyalar ve fontlar: önbellek, arkada güncelle
  e.respondWith(caches.match(req).then(hit => {
    const net = fetch(req).then(res => { if (res && (res.ok || res.type === 'opaque')) { const c = res.clone(); caches.open(VERSION).then(ca => ca.put(req, c)); } return res; }).catch(() => hit);
    return hit || net;
  }));
});
