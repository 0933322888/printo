var gulp = require('gulp');
var plugins = require('gulp-load-plugins')();
var argv = require('yargs').argv;

var paths = {
    proj: ['./'],
    less: ['./app/**/*.less'],
    js: ['./app/**/*.js'],
    json: ['./app/components/**/*.json'],
    dist: {
        css: './dist/',
        js: './dist/',
        json: './dist/'
    },
    vendor: {
        css: ['./bower_components/**/*.css'],
        js: [
            './bower_components/jquery/dist/jquery.min.js',
            './bower_components/angular/angular.min.js',
            './bower_components/angular-ui-router/release/angular-ui-router.min.js',
            './bower_components/bootstrap/dist/js/bootstrap.min.js',
            './bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
            './bower_components/ngInfiniteScroll/build/ng-infinite-scroll.min.js',
            './bower_components/jcrop/js/jquery.Jcrop.js',
            './bower_components/ng-jcrop/ng-jcrop.js',
            './node_modules/angular-crop/lib/angular-crop.js',
            './bower_components/angular-sanitize/angular-sanitize.min.js'
        ]
    }

};

/**
 * compiles less files into css.
 */
gulp.task('less', function() {
    gulp.src(paths.less)
        .pipe(plugins.concat('style.css'))
        .pipe(plugins.less())
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest(paths.dist.css));
});

gulp.task('js', function() {
    gulp.src(paths.js)
        .pipe(plugins.concat('printo.js'))
        .pipe(plugins.if(argv.prod, plugins.uglify({mangle: false})))
        .pipe(gulp.dest(paths.dist.js));
});

gulp.task('json', function() {
    gulp.src(paths.json)
        .pipe(plugins.mergeJson({
            fileName: 'languages.json'
        }))
        .pipe(gulp.dest(paths.dist.json));
});

/**
 * copies vendor specific files to the public folder.
 */
gulp.task('vendor', function() {
    gulp.src(paths.vendor.css)
        .pipe(plugins.concat('vendor.css'))
        .pipe(plugins.minifyCss())
        .pipe(gulp.dest(paths.dist.css));

    gulp.src(paths.vendor.js)
        .pipe(plugins.concat('vendor.min.js'))
        .pipe(plugins.uglify({mangle: false}))
        .pipe(gulp.dest(paths.dist.js));
});

gulp.task('connect', function() {
    plugins.connect.server({
        root: './',
        port: 8080,
        fallback: 'index.html',
        livereload: true
    });
});

gulp.task('html', function () {
    gulp.src('./index.html')
        .pipe(plugins.connect.reload());
});

gulp.task('watchBuild', function () {
    gulp.watch(['./app/components/**/*.json'], ['json', 'html']);
});

gulp.task('watchDev', function () {
    gulp.watch(
        ['./app/**/*.js', './app/components/**/*.less'],
        ['dev', 'html']);
});

gulp.task('watch', function () {
    gulp.watch(
        ['./app/components/**/*.html'], ['html']);
});

gulp.task('default', ['build', 'serve']);

gulp.task('build', ['vendor', 'less', 'js', 'json']);
gulp.task('dev', ['less', 'js']);
gulp.task('serve', ['connect', 'watch', 'watchDev', 'watchBuild']);