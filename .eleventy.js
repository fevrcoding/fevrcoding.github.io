const yaml = require('js-yaml');
const rss = require('@11ty/eleventy-plugin-rss');
const { DateTime } = require('luxon');

module.exports = function(eleventyConfig) {
  const assets = ['js', 'css', 'fonts', 'img', 'odx-assets'];

  for (const folder of assets) {
    eleventyConfig.addPassthroughCopy({ [`static/${folder}`]: folder });
  }

  eleventyConfig.addPlugin(rss);

  eleventyConfig.addPassthroughCopy({ 'static/*.*': '.' });

  eleventyConfig.addDataExtension('yaml', (contents) =>
    yaml.safeLoad(contents),
  );

  eleventyConfig.addNunjucksFilter('dateformat', (date, format) => {
    return DateTime.fromJSDate(date).toFormat(format);
  });

  eleventyConfig.addFilter('dateslug', (date) => {
    return DateTime.fromJSDate(date).toFormat('dd/LL/yyyy');
  });

  eleventyConfig.addNunjucksFilter('published', (posts) => {
    return posts.filter((post) => post.data.published);
  });

  return {
    htmlTemplateEngine: 'njk',
    dir: {
      includes: '_includes',
      layouts: '_layouts',
      input: 'src',
      output: '_site',
    },
  };
};
