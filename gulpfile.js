var gulp = require('gulp');
var sourcemaps = require('gulp-sourcemaps');
var babel = require('gulp-babel');
var concat = require('gulp-concat');
var connect = require('gulp-connect');
var runSequence = require('run-sequence');

gulp.task('babel', function () {
  return gulp.src('src/**/*.js')
    .pipe(sourcemaps.init())
    .pipe(concat('all.js'))
    .pipe(babel({

    }))
    .pipe(sourcemaps.write('.'))
    .pipe(gulp.dest('dist'));
});

gulp.task('connect', function() {
  connect.server({
    root: './',
    livereload: true,
    port: 3000
  });
});

gulp.task('default', function() {
  runSequence('babel', 'connect')
});
