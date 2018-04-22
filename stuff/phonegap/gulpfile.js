var gulp = require('gulp');
var sass = require('gulp-sass');
var inject = require('gulp-inject');
var mainBowerFiles = require('main-bower-files');
var es = require('event-stream');
var browserSync = require('browser-sync').create();
var uglify = require('gulp-uglify');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var deleteLines = require('gulp-delete-lines');
var gulpSequence = require('gulp-sequence');
var angularFilesort = require('gulp-angular-filesort');

gulp.task('default', ['serve'], function () {

});

gulp.task('serve', ['injection', 'sass:watch', 'injection:watch'], function () {
    browserSync.init({
        server: 'src'
    });

    gulp.watch('src/**/**').on('change', browserSync.reload);

});


gulp.task('injection', ['sass'], function () {
    var cssFiles = gulp.src('src/css/**/*.css');

    var jsFiles = gulp.src('src/app/**/*.js', {
        read: false,
    });

    return gulp.src('src/index.html')
        .pipe(inject(gulp.src(mainBowerFiles(), {
            read: false
        }), {
            relative: true,
            name: 'bower'
        }))
        .pipe(inject(es.merge(
            cssFiles,
            jsFiles
        ), {
            relative: true
        }))
        .pipe(gulp.dest('src'));

});

gulp.task('sass', function () {
    return gulp.src('src/sass/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest('src/css'));
});

gulp.task('sass:watch', function () {
    gulp.watch('src/sass/**/*.scss', ['sass']);
});

gulp.task('injection:watch', function () {
    gulp.watch('src/**/**', ['injection']);
});

gulp.task('prod', gulpSequence('minify', 'copy:index','copy:fonts', 'copy:minify'));

gulp.task('minify', function () {

    gulp.src(mainBowerFiles('**/*.js'))
        .pipe(concat('vendor.min.js'))
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest('www/js'));

    gulp.src(mainBowerFiles('**/*.css'))
        .pipe(concat('vendor.min.css'))
        .pipe(minifyCSS())
        .pipe(gulp.dest('www/css'));


    gulp.src('src/css/**/*.css')
        .pipe(minifyCSS())
        .pipe(concat('app.min.css'))
        .pipe(gulp.dest('www/css'));

    return gulp.src('src/app/**/*.js')
        .pipe(concat('app.min.js'))
        .pipe(uglify({ mangle: false }))
        .pipe(gulp.dest('www/js'));
});

gulp.task('copy:index', function () {
    gulp.src('src/app/**/*.html')
        .pipe(gulp.dest('www/app'));

    return gulp.src('src/index.html')
        .pipe(deleteLines({
            'filters': [
                /<script\s+src=["']bower_components/i
            ]
        }))
        .pipe(deleteLines({
            'filters': [
                /<link\s+rel=["']stylesheet["']\s+href=["']bower_components/i
            ]
        }))
        .pipe(gulp.dest('www'));

});

gulp.task('copy:fonts', function () {
    return gulp.src('src/fonts/**')
        .pipe(gulp.dest('www/fonts'));
});

gulp.task('copy:minify', function () {
    var cssFiles = gulp.src('www/css/**/*.css');

    var jsFiles = gulp.src(['www/js/**/*.js']).pipe(angularFilesort());

    return gulp.src('www/index.html')
        .pipe(inject(es.merge(
            cssFiles,
            jsFiles
        ), {
            relative: true
        }))
        .pipe(gulp.dest('www'));
});