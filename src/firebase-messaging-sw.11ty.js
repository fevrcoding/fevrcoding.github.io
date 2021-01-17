/* eslint-env node */
const Scripts = require('./_templates/script');

module.exports = class ServiceWorker extends Scripts {
  constructor() {
    super();
    // don't generate in production mode
    this.permalink =
      process.env.ELEVENTY_ENV !== 'production'
        ? '/firebase-messaging-sw.js'
        : null;
    this.src = 'modules/message-worker.js';
  }
};
