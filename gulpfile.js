// Source: https://www.chenhuijing.com/blog/gulp-jekyll-github/
var gulp        = require('gulp');
var browserSync = require('browser-sync');
var sass        = require('gulp-sass');
var prefix      = require('gulp-autoprefixer');
var cssnano     = require('gulp-cssnano');
var concat      = require('gulp-concat');
var uglify      = require('gulp-uglify');var cp          = require('child_process');

var messages = {
  jekyllDev: 'Running: $ jekyll build for dev',
  jekyllProd: 'Running: $ jekyll build for prod'
};

// Build the Jekyll Site in development mode
gulp.task('jekyll-dev', function (done) {
  browserSync.notify(messages.jekyllDev);
  return cp.spawn('bundle', [ 'exec', 'jekyll', 'build', '--drafts', '--config', '_config.yml,_config_dev.yml'], {stdio: 'inherit'})
 .on('close', done);
});

// Rebuild Jekyll & reload the page
gulp.task('jekyll-rebuild', ['jekyll-dev'], function () {
  browserSync.reload();
});

// Wait for jekyll-dev task to complete, then launch the Server
gulp.task('browser-sync', ['sass', 'scripts', 'jekyll-dev'], function() {
  browserSync.init({
    server: "_site",
    port: 3000
  });
});


// Compile files from _scss folder into _site/css folder (for live injecting)
gulp.task('sass', function () {
  return gulp.src('_sass/styles.scss')
  .pipe(sass({
    includePaths: ['scss'],
    onError: browserSync.notify
  }))
  .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(gulp.dest('_site/css'))
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest('css'));
});

// Compile files from _js/lib folder into both _site/js folder (for live injecting) and site folder (for future Jekyll builds)
gulp.task('scripts', function() {
  return gulp.src(['_js/lib/*.js'])
  .pipe(concat('scripts.js'))
  .pipe(gulp.dest('_site/js'))
  .pipe(browserSync.reload({stream:true}))
  .pipe(gulp.dest('js'));
});

// Watch scss files for changes & recompile. Watch html/md files, run jekyll & reload BrowserSync
gulp.task('watch', function () {
  gulp.watch(['_sass/**/*.scss','_sass/*.scss'], ['sass']);
  gulp.watch(['_js/**/*.js'], ['scripts'])
  gulp.watch(['index.*', '_layouts/*.html', '_posts', '_includes/*.html', '_drafts/*', '**/*.md', '**/*.html'], ['jekyll-rebuild']);
});

// Build the Jekyll Site in production mode
gulp.task('jekyll-prod', function (done) {
  browserSync.notify(messages.jekyllProd);
  return cp.spawn('jekyll', ['build'], {stdio: 'inherit'})
  .on('close', done);
});


gulp.task('sass-prod', function () {
  return gulp.src('_sass/styles.scss')
  .pipe(sass({
    includePaths: ['scss'],
    onError: browserSync.notify
  }))
  .pipe(prefix(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
  .pipe(cssnano())
  .pipe(gulp.dest('_site/css'))
  .pipe(gulp.dest('css'));
});

// Identical Javascript compilation task to development mode, with an additional minification step thrown in using uglify
gulp.task('scripts-prod', function() {
  return gulp.src(['_js/lib/*.js'])
  .pipe(concat('scripts.js'))
  .pipe(uglify())
  .pipe(gulp.dest('_site/js'))
  .pipe(gulp.dest('js'));;
});

// Build task, run using gulp build to compile Sass and Javascript ready for deployment.
gulp.task('build', ['scripts-prod', 'sass-prod', 'jekyll-prod']);


// Default task, running just gulp will compile the sass, compile the Jekyll site, launch BrowserSync & watch files.
gulp.task('default', ['browser-sync', 'watch']);
