module.exports = function () {
  $.gulp.task('images', function () {
    return $.gulp.src('build/img/**/*.{png,jpg,svg}')
        .pipe($.gp.imagemin([
          $.gp.imagemin.jpegtran({progressive: true}),
          $.imageminJpegRecompress({
            loops: 5,
            min: 90,
            max: 95,
            quality: 'high'
          }),
          $.gp.imagemin.optipng({optimizationLevel: 3}),
          $.pngquant({quality: '90-95', speed: 5}),
          $.gp.imagemin.svgo(),
        ]))
        .pipe($.gulp.dest('build/img'));
  });
};