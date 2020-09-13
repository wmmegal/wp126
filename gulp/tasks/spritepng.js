module.exports = function () {
    $.gulp.task('sprite', function () {
        let spriteData = $.gulp.src('img/icon-*.png').pipe($.gp.spritesmith({
            imgName: 'img/sprite.png',
            cssName: 'scss/_sprite.scss',
            padding: 10
        }));

        return spriteData.pipe($.gulp.dest('./'));
    });
};