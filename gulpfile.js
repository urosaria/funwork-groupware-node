
var path = require('path');

var gulp = require('gulp');

var gutil = require('gulp-util');

var lint = require('gulp-jshint');

var concat = require('gulp-concat');

var uglify = require('gulp-uglify');

var rename = require('gulp-rename');

var filesize = require('gulp-filesize');

var clean = require('gulp-clean');

var watch = require('gulp-watch');



gulp.task('clean', function () {

    return gulp.src('build', {read: false})

        .pipe(clean());

});



gulp.task('build', function() {

    return gulp.src('src/*.js')

        .pipe(concat('src.js'))

        .pipe(gulp.dest('build'))

        .pipe(filesize())

        .pipe(uglify())

        .pipe(rename('src.min.js'))

        .pipe(gulp.dest('build'))

        .pipe(filesize())

        .on('error', gutil.log)

});





gulp.task('check', function() {

    return gulp.src('src/*.js')

        .pipe(lint())

        .pipe(lint.reporter('default'));

});



gulp.task('watch', function() {

    gulp.watch('src/*.js', ['check', 'build']);

});



gulp.task('default', ['check', 'build', 'watch']);

