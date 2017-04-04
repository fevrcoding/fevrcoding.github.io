const gulp            = require('gulp');
const clean           = require('gulp-clean');
const runSequence     = require('run-sequence');
const rename          = require('gulp-rename');
const imageResize     = require('gulp-image-resize');
const imagemin        = require('gulp-imagemin');
const debug           = require('gulp-debug');

const imagesFiles = 'convert/**/*.{jpg,png,gif}';

const imagesSizes = [
    {w:150, h:150},
    {w:174, h:174},
    {w:250, h:250},
    {w:300, h:300},
    {w:500, h:500}
];

const distDir = 'convert/dist/';

/* Tasks */
const resizeImageTasks = [];

gulp.task('clean-dist', function() {
    return gulp.src(distDir + '*', {read: false})
        .pipe(clean())
});

imagesSizes.forEach(function (size) {
    const resizeImageTask = 'resize-' + size.w + 'x' + size.h;

    gulp.task(resizeImageTask, function () {
        return gulp
            .src(imagesFiles)
            .pipe(imageResize({
                width : size.w,
                height : size.h,
                crop : true,
                upscale : false,
                imageMagick : true
            }))
            .pipe(imagemin())
            .pipe(rename( function(path){
                    path.basename += '-' + size.w + 'x' + size.h;
                } ))
            .pipe(gulp.dest(distDir));
    });

    resizeImageTasks.push(resizeImageTask);
});

gulp.task('resize-images', resizeImageTasks);

gulp.task('minify', function () {
 return gulp
     .src(imagesFiles)
     .pipe(imagemin())
     .pipe(gulp.dest(distDir));
 });

gulp.task('default', function() {
    runSequence( 'clean-dist', 'resize-images' );
});
