module.exports = function () {
  $.gulp.task('serve', function () {
    $.browserSync.init({
      server: 'build/'
    });

    $.gulp.watch('scss/*.scss', $.gulp.series('sass'));
    $.gulp.watch('*.html', $.gulp.series('html', 'render'));
    $.gulp.watch('templates/*.html', $.gulp.series('render'));
    $.gulp.watch('js/*.js', $.gulp.series('scripts'));
    $.gulp.watch('img/icon-*.png', $.gulp.series('sprite'));
    $.gulp.watch('img/*.{png,jpg,svg}', $.gulp.series('allimg'));;
  });
};