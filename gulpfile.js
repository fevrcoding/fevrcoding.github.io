var gulp            = require(`gulp`);
var clean           = require(`gulp-clean`);
var runSequence     = require(`run-sequence`);
var rename          = require(`gulp-rename`);
var imageResize     = require(`gulp-image-resize`);
var imagemin        = require(`gulp-imagemin`);

var imagesFiles = "images/**/*.{jpg,png,gif}";

var imagesSizes = [ 
        {w:150, h:150},
        {w:174, h:174},
        {w:250, h:250},
        {w:300, h:300},
        {w:500, h:500}
    ];

var distDir = `dist/`;

/* Tasks */
var resizeImageTasks = [];

gulp.task(`clean-dist`, () => {
    return gulp.src(`${distDir}*`, {read: false})
        .pipe(clean());
});

imagesSizes.forEach((size) => {
    var resizeImageTask = `resize-${size.w}x${size.h}`;
    gulp.task(resizeImageTask, () => {
        return gulp.src(imagesFiles)
        .pipe(imageResize({
            width : size.w,
            height : size.h,
            crop : true,
            upscale : false,
            imageMagick : true
        }))
        .pipe(imagemin())
        .pipe(rename((path) => { path.basename += `-${size.w}x${size.h}`; }))
        .pipe(gulp.dest(distDir));
    });
    resizeImageTasks.push(resizeImageTask);
});

gulp.task(`resize-images`, resizeImageTasks);

gulp.task(`min-images`, `images`, function () {
    return gulp.src(`${distDir}*.{jpg,png,gif}`)
        .pipe(imagemin())
        .pipe(gulp.dest(`${distDir}`));
});

gulp.task(`default`, () => { runSequence( `clean-dist`, `resize-images` ); });
