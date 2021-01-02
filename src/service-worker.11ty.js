const { resolve } = require('path');
const esbuild = require('esbuild');

const PRODUCTION = process.env.ELEVENTY_ENV === 'production';

module.exports = class Scripts {
  data() {
    return {
      permalink: '/service-worker.js',
      eleventyExcludeFromCollections: true,
    };
  }

  async render() {
    const { outputFiles } = await esbuild.build({
      entryPoints: [resolve(__dirname, './_js/service-worker.js')],
      bundle: true,
      minify: PRODUCTION,
      sourcemap: false,
      target: ['es2019'],
      write: false,
      define: {
        'process.env.NODE_ENV': JSON.stringify(
          process.env.ELEVENTY_ENV || 'development',
        ),
      },
    });
    return outputFiles[0].contents;
  }
};
