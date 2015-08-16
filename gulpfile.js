var gulp        = require('gulp');
var ts          = require('gulp-typescript');
var sourcemaps  = require('gulp-sourcemaps');
var sass        = require('gulp-sass');
var jade        = require('gulp-jade');

var path = {
  src: {
    ts : [
      'src/ts/**/*.ts',
      '!src/node_modeuls/**/*.ts'
    ],
    sass : 'src/sass/**/*.scss',
    jade : [
      'src/jade/**/*.jade',
      '!src/jade/includes/**/*.jade',
    ]
  },
  dest: 'build/'
}

gulp.task('build:ts', function () {
  return gulp
    .src(path.src.ts)
    .pipe(sourcemaps.init())
    .pipe(ts({
      target: "es5",
      module: "commonjs",
    }))
    .pipe(sourcemaps.write())
    .pipe(gulp.dest(path.dest));
});

gulp.task('build:sass', function () {
  return gulp
    .src(path.src.sass)
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(path.dest));
});

gulp.task('build:jade', function () {
  return gulp
    .src(path.src.jade)
    .pipe(jade())
    .pipe(gulp.dest(path.dest));
});

gulp.task('build', ['build:ts', 'build:jade', 'build:sass']);

gulp.task('watch', function(){
  gulp.watch(path.src.ts, ['build:ts']);
  gulp.watch(path.src.jade, ['build:jade']);
  gulp.watch(path.src.sass, ['build:sass']);
});

gulp.task('default', ['build', 'watch']);