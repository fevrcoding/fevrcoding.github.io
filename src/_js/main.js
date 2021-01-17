/* global firebase */
import { FIREBASE_CONFIG, VAPID_KEY } from './modules/constants';

const toggler = document.querySelector('.navbar-toggle');

if (toggler) {
  const target = document.querySelector(toggler.dataset.target);
  toggler.addEventListener('click', (e) => {
    e.preventDefault();
    const opened = !toggler.classList.contains('collapsed');
    toggler.classList[opened ? 'add' : 'remove']('collapsed');
    toggler.setAttribute('aria-expanded', String(!opened));
    target.classList[opened ? 'remove' : 'add']('in');
  });
}

async function subscribe(sw) {
  const result = await Notification.requestPermission();

  if (result !== 'granted' || !window.firebase) {
    return;
  }
  // Initialize Firebase

  firebase.initializeApp(FIREBASE_CONFIG);

  const messaging = firebase.messaging();

  try {
    const token = await messaging.getToken({
      serviceWorkerRegistration: sw,
      vapidKey: VAPID_KEY,
    });
    if (!token) {
      return;
    }

    console.log(token);
    document.getElementById('token').textContent = token;
  } catch (err) {
    console.error('An error occurred while retrieving token. ', err);
  }

  messaging.onMessage((payload) => {
    console.log('Message received. ', payload);
  });
}

// async function notify() {
//   const result = await Notification.requestPermission();
//   if (result !== 'granted') {
//     return;
//   }
//   const body = 'hello';
//   const icon = '/apple-touch-icon.png';
//   new Notification('Hello!', {
//     body,
//     icon,
//   });
// }

function registerNotifier(sw) {
  const hideNotificationBar =
    localStorage.getItem('notificationBar') === 'hide';
  if (!hideNotificationBar) {
    const bar = document.getElementById('notification-bar');

    const closeBar = () => {
      bar.hidden = true;
      localStorage.setItem('notificationBar', 'hide');
    };

    bar.hidden = false;
    bar.querySelector('button.close').addEventListener('click', closeBar);

    bar.querySelector('.btn.btn-link').addEventListener('click', async () => {
      const result = await Notification.requestPermission();
      closeBar();
      if (result === 'granted') {
        subscribe(sw);
      }
    });
  } else {
    subscribe(sw);
  }
}

if (process.env.NODE_ENV === 'production') {
  if ('serviceWorker' in navigator) {
    navigator.serviceWorker
      .register('/service-worker.js')
      .then(registerNotifier);
  }
} else {
  registerNotifier();
}
