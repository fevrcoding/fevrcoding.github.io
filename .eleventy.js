const yaml = require('js-yaml');
const rss = require('@11ty/eleventy-plugin-rss');
const { DateTime } = require('luxon');
const markdown = require('markdown-it')({
  html: true,
});

const WEEK = [
  'Lunedì',
  'Martedì',
  'Mercoledì',
  'Giovedì',
  'Venerdì',
  'Sabato',
  'Domenica',
];

const MONTHS = [
  'Gennaio',
  'Febbraio',
  'Marzo',
  'Aprile',
  'Maggio',
  'Giugno',
  'Luglio',
  'Agosto',
  'Settembre',
  'Ottobre',
  'Novembre',
  'Dicembre',
];

module.exports = function(eleventyConfig) {
  const assets = ['js', 'css', 'fonts', 'img', 'odx-assets', 'admin'];

  for (const folder of assets) {
    eleventyConfig.addPassthroughCopy({ [`static/${folder}`]: folder });
  }

  eleventyConfig.addPlugin(rss);

  eleventyConfig.addPassthroughCopy({ 'static/*.*': '.' });

  eleventyConfig.addDataExtension('yaml', (contents) =>
    yaml.safeLoad(contents),
  );

  eleventyConfig.addNunjucksShortcode('markdown', (content) =>
    markdown.render(content),
  );

  eleventyConfig.addNunjucksFilter('dateformat', (date, format) => {
    return DateTime.fromJSDate(date, { zone: 'Europe/Rome' }).toFormat(format);
  });

  eleventyConfig.addNunjucksFilter('date_human', (start, end) => {
    const startDate = DateTime.fromJSDate(start, {
      zone: 'Europe/Rome',
    });

    const startLocale = `${
      WEEK[startDate.weekday - 1]
    } ${startDate.day.toString().padStart(2, '0')} ${
      MONTHS[startDate.month - 1]
    } ${startDate.year}`;
    const startTime = startDate.toFormat('HH:mm');

    if (!end) {
      return `${startLocale} alle ${startTime}`;
    }
    const endTime = DateTime.fromJSDate(end, { zone: 'Europe/Rome' }).toFormat(
      'HH:mm',
    );
    return `${startLocale} dalle ${startTime} alle ${endTime}`;
  });

  eleventyConfig.addFilter('dateslug', (date) => {
    return DateTime.fromJSDate(date, { zone: 'Europe/Rome' }).toFormat(
      'yyyy/LL',
    );
  });

  eleventyConfig.addNunjucksFilter('published', (posts) => {
    return posts.filter((post) => post.data.published);
  });

  eleventyConfig.addNunjucksFilter('limit', (posts, num) => {
    return posts.slice(0, num);
  });

  eleventyConfig.addNunjucksFilter('featuredEvent', (posts) => {
    // return a featured event or the first one
    return posts.find(({ data }) => data.featured) || posts[0];
  });

  // redirect collection
  eleventyConfig.addCollection('redirects', function(collection) {
    const redirs = collection.getAll().filter(({ data }) => data.redirect_from);
    const redirects = new Map();
    for (item of redirs) {
      let { redirect_from } = item.data;
      if (!Array.isArray(redirect_from)) {
        redirect_from = [redirect_from];
      }
      redirect_from.forEach((from) => {
        redirects.set(from, {
          from,
          to: item.url,
        });
      });
    }
    return [...redirects.values()];
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
