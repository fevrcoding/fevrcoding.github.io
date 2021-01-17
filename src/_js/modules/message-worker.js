/* global firebase */
import { FIREBASE_CONFIG } from './constants';
importScripts('https://www.gstatic.com/firebasejs/5.5.2/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/5.5.2/firebase-messaging.js');

firebase.initializeApp({
  messagingSenderId: FIREBASE_CONFIG.messagingSenderId,
});

const messaging = firebase.messaging();

/*
 * We need a generic class to hold data and methods, that inherit from Event
 */
class CustomPushEvent extends Event {
  constructor(data) {
    super('push');

    Object.assign(this, data);
    this.custom = true;
  }
}

/*
 * Overrides push notification data, to avoid having 'notification' key and firebase blocking
 * the message handler from being called
 */
self.addEventListener('push', (e) => {
  // Skip if event is our own custom event
  if (e.custom) return;

  // Kep old event data to override
  let oldData = e.data;

  // Create a new event to dispatch
  let newEvent = new CustomPushEvent({
    data: {
      json() {
        let newData = oldData.json();
        newData._notification = newData.notification;
        delete newData.notification;
        return newData;
      },
    },

    waitUntil: e.waitUntil.bind(e),
  });

  // Stop event propagation
  e.stopImmediatePropagation();

  // Dispatch the new wrapped event
  dispatchEvent(newEvent);
});

messaging.setBackgroundMessageHandler(({ data }) => {
  const notificationOptions = {
    body: data.body,
    icon: '/apple-touch-icon.png',
  };
  return self.registration.showNotification(data.title, notificationOptions);
});
