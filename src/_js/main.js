/* global OneSignal */
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

window.OneSignal = window.OneSignal || [];
OneSignal.push(function () {
  OneSignal.init({
    appId:
      process.env.ELEVENTY_ENV !== 'production'
        ? '7fd49bb1-4042-42fe-acbc-d75e77584ada'
        : '3a8c18f3-02ec-469c-ae86-11d0eed8f39c',
  });
});

if ('serviceWorker' in navigator) {
  const bar = document.getElementById('notification-bar');

  const barDismiss = localStorage.getItem('barDismiss');

  navigator.serviceWorker.register('/OneSignalSDKWorker.js').then(() => {
    OneSignal.push([
      'getNotificationPermission',
      (permission) => {
        const isPushSupported = OneSignal.isPushNotificationsSupported();
        if (
          isPushSupported &&
          permission === 'default' &&
          barDismiss !== 'dismissed'
        ) {
          bar.querySelector('button.close').addEventListener('click', () => {
            bar.hidden = true;
            localStorage.setItem('barDismiss', 'dismissed');
          });
          bar.hidden = false;
        }
        OneSignal.on('notificationPermissionChange', () => {
          bar.hidden = true;
        });
      },
    ]);
  });
}
