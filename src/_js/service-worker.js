import { registerRoute } from 'workbox-routing';
import { StaleWhileRevalidate, NetworkFirst } from 'workbox-strategies';
import './modules/message-worker';

const cacheName = 'fevr-v2-cache';
const listRegExp = /^\/(index\.html|eventi\/index\.html)/;

registerRoute(
  ({ url }) => !listRegExp.test(url.pathname),
  new StaleWhileRevalidate({ cacheName }),
);

registerRoute(
  ({ url }) => listRegExp.test(url.pathname),
  new NetworkFirst({ cacheName: cacheName + '-list' }),
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
