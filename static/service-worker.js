/* eslint-disable no-undef */
const cacheName = 'fevr-v2-cache';

// import workbox
importScripts(
  'https://storage.googleapis.com/workbox-cdn/releases/5.1.2/workbox-sw.js',
);
const { routing, strategies } = workbox;

const listRegExp = /^\/(index\.html|eventi\/index\.html)/;

routing.registerRoute(
  ({ url }) => !listRegExp.test(url.pathname),
  new strategies.StaleWhileRevalidate({ cacheName }),
);

routing.registerRoute(
  ({ url }) => listRegExp.test(url.pathname),
  new strategies.NetworkFirst({ cacheName: cacheName + '-list' }),
);

// removes all caches not named <cacheName>
const invalidateOldCache = async () => {
  const keys = await caches.keys();
  const isOldCache = (key) => !key.startsWith(cacheName);
  const oldKeys = keys.filter(isOldCache);

  return Promise.all(oldKeys.map((key) => caches.delete(key)));
};

// runs invalidateOldCache on activation
self.addEventListener('activate', (e) => e.waitUntil(invalidateOldCache()));
