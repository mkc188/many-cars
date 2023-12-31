var gulp = require('gulp')
  , gutil = require('gulp-util')
  , del = require('del')
  , concat = require('gulp-concat')
  , rename = require('gulp-rename')
  , minifycss = require('gulp-minify-css')
  , minifyhtml = require('gulp-minify-html')
  , processhtml = require('gulp-processhtml')
  , jshint = require('gulp-jshint')
  , uglify = require('gulp-uglify')
  , gls = require('gulp-live-server')
  , paths;

paths = {
  assets: 'src/assets/**/*',
  css:    'src/css/*.css',
  libs:   [
    'src/bower_components/phaser-official/build/phaser.min.js'
  ],
  js:     ['src/js/**/*.js'],
  dist:   './dist/'
};

gulp.task('clean', function (cb) {
  return del([paths.dist], cb);
});

gulp.task('copy-assets', ['clean'], function () {
  return gulp.src(paths.assets)
    .pipe(gulp.dest(paths.dist + 'assets'))
    .on('error', gutil.log);
});

gulp.task('copy-vendor', ['clean'], function () {
  return gulp.src(paths.libs)
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('uglify', ['clean','lint'], function () {
  return gulp.src(paths.js)
    .pipe(concat('main.min.js'))
    .pipe(gulp.dest(paths.dist))
    .pipe(uglify({outSourceMaps: false}))
    .pipe(gulp.dest(paths.dist));
});

gulp.task('minifycss', ['clean'], function () {
  return gulp.src(paths.css)
    .pipe(minifycss({
      keepSpecialComments: false,
      removeEmpty: true
    }))
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('processhtml', ['clean'], function() {
  return gulp.src('src/index.html')
    .pipe(processhtml({}))
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('minifyhtml', ['clean'], function() {
  return gulp.src('dist/index.html')
    .pipe(minifyhtml())
    .pipe(gulp.dest(paths.dist))
    .on('error', gutil.log);
});

gulp.task('lint', function() {
  return gulp.src(paths.js)
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .on('error', gutil.log);
});

gulp.task('serve', function () {
  var server = gls.new('app.js');
  server.start();

  gulp.watch(paths.js, ['lint']);
  gulp.watch(['./src/index.html', paths.css, paths.js], server.notify);
  gulp.watch('app.js', server.start);
});

gulp.task('default', ['serve']);
gulp.task('build', ['copy-assets', 'copy-vendor', 'uglify', 'minifycss', 'processhtml', 'minifyhtml']);
