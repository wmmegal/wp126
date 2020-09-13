global.$ = {
    gulp: require('gulp'),
    gp: require('gulp-load-plugins')(),
    browserSync: require('browser-sync').create(),
    gcmq: require('gulp-group-css-media-queries'),
    del: require('del'),
    imageminJpegRecompress: require('imagemin-jpeg-recompress'),
    pngquant: require('imagemin-pngquant'),
    nunjucks: require('gulp-nunjucks-render'),
    path: {
        config: require('./gulp/config'),
        js: './js/*.js',
    }
};

$.path.config.forEach(function (path) {
    require(path)();
});