module.exports = function () {
    $.gulp.task('render', function () {
        return $.gulp.src('*.html')
            .pipe($.nunjucks({
                path: ['templates/'] // String or Array
            }))
            .pipe($.gulp.dest('build'))
            .pipe($.browserSync.reload({stream: true, reloadDebounce: 100 }))
    });

};
