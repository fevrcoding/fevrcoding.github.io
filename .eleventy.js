const yaml = require('js-yaml');
const { DateTime } = require('luxon');

module.exports = function(eleventyConfig) {
  const assets = ['js', 'css', 'fonts', 'img', 'odx-assets'];

  for (const folder of assets) {
    eleventyConfig.addPassthroughCopy({ [`static/${folder}`]: folder });
  }

  eleventyConfig.addPassthroughCopy({ 'static/*.*': '.' });

  eleventyConfig.addDataExtension('yaml', (contents) =>
    yaml.safeLoad(contents),
  );

  eleventyConfig.addNunjucksFilter('date', (date, format) => {
    return DateTime.fromJSDate(date).toFormat(format);
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
