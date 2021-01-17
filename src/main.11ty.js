/* eslint-env node */
const Scripts = require('./_templates/script');

module.exports = class Main extends Scripts {
  constructor() {
    super();
    this.permalink = '/js/main.js';
    this.src = 'main.js';
  }
};
