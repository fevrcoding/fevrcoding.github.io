const { src, dest, series } = require('gulp');
const del = require('del');
const rename = require('gulp-rename');
const imageResize = require('gulp-image-resize');
const imagemin = require('gulp-imagemin');

const imagesFiles = 'convert/**/*.{jpg,png,gif}';

const imagesSizes = [
  { w: 150, h: 150 },
  { w: 174, h: 174 },
  { w: 250, h: 250 },
  { w: 300, h: 300 },
  { w: 500, h: 500 },
];

const distDir = 'convert/dist/';

/* Tasks */

const clean = () => del(`${distDir}/**`);

const resizeImageTasks = imagesSizes.map((size) => {
  const resizeImageTask = 'resize-' + size.w + 'x' + size.h;

  function task() {
    return src(imagesFiles)
      .pipe(
        imageResize({
          width: size.w,
          height: size.h,
          crop: true,
          upscale: false,
          imageMagick: true,
        }),
      )
      .pipe(imagemin())
      .pipe(rename(({ basename }) => `${basename}-${size.w}x${size.h}`))
      .pipe(dest(distDir));
  }

  return Object.defineProperty(task, 'name', {
    value: resizeImageTask,
  });
});

function minify() {
  return src(imagesFiles)
    .pipe(imagemin())
    .pipe(dest(distDir));
}

exports.default = series(clean, ...resizeImageTasks, minify);
