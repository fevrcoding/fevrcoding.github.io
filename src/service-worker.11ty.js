/* eslint-env node */
const Scripts = require('./_templates/script');

module.exports = class ServiceWorker extends Scripts {
  constructor() {
    super();
    this.permalink = '/service-worker.js';
    this.src = 'service-worker.js';
  }
};
