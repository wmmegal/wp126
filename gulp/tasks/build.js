module.exports = function () {
  $.gulp.task('build', $.gulp.series('clean', 'copy', 'render', 'sass', 'scripts', 'images', 'webp', 'svg', 'sprite'));
};