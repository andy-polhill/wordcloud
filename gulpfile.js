var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var rimraf = require('rimraf');
var runSequence = require('run-sequence');

var config = {
  scripts: 'lib/**/*.js',
  css: 'css/**/*.css',
  templates: 'templates/**/*.mustache',
  dist: './dist'
};

gulp.task('babel', function () {
  return gulp.src(config.scripts)
    .pipe(sourcemaps.init())
    .pipe(concat('wordcloud.js'))
    .pipe(babel({
      //modules: 'amd'
    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest(config.dist))
});

gulp.task('clean', function (cb) {
  rimraf(config.dist, cb);
});

gulp.task('connect', function() {
  connect.server({
    root: './',
    livereload: true,
    port: 3000
  });
});

gulp.task('watch', function() {
  gulp.watch([config.scripts, config.css], function() {
    runSequence('clean', 'babel');
  });
});

gulp.task('default', function() {
  runSequence('clean', 'babel', 'connect', 'watch');
});
