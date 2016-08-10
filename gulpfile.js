var jekyllprod = { JEKYLL_ENV: "production" };
var gulp         = require('gulp'),
    sass         = require('gulp-ruby-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    cssnano      = require('gulp-cssnano'),
    concat       = require('gulp-concat'),
    uglify       = require('gulp-uglify'),
    imagemin     = require('gulp-imagemin'),
    rename       = require('gulp-rename'),
    cache        = require('gulp-cache'),
    cp           = require('child_process'),
    browserSync  = require('browser-sync');


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
gulp.task('browser-sync', ['styles', 'scripts', 'jekyll-dev'], function() {
  browserSync.init({
    server: "_site",
    port: 3000
  });
});


// Compile files from assets/_sass folder into _site/assets/css folder (for live injecting)
gulp.task('styles1', function () {
  return sass('assets/_sass/styles.scss', { style: 'expanded', onError: browserSync.notify})
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('_site/assets/css')) // Used for direct injection
    .pipe(browserSync.reload({stream:true}))
    .pipe(gulp.dest('assets/css')); // Jekyll can grab it from here
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
  gulp.watch(['assets/_sass/**/*.scss' ], ['styles']);
  gulp.watch(['_js/**/*.js'], ['scripts'])
  gulp.watch(['index.*', '_layouts/*.html', '_posts/*', '_includes/*.html', '_drafts/*', '**/*.md', '**/*.html'], ['jekyll-rebuild']);
});

// Build the Jekyll Site in production mode
gulp.task('jekyll-prod', function (done) {
  browserSync.notify(messages.jekyllProd);
  return cp.spawn('bundle', ['exec', 'jekyll', 'build'], {stdio: 'inherit'})
  .on('close', done);
});


gulp.task('styles', function () {
  return sass('assets/_sass/styles.scss', { style: 'expanded', onError: browserSync.notify})
    .pipe(autoprefixer(['last 15 versions', '> 1%', 'ie 8', 'ie 7'], { cascade: true }))
    .pipe(gulp.dest('_site/assets/css')) // Used for direct injection
    .pipe(browserSync.reload({stream:true}))
    .pipe(rename({suffix: '.min'}))
    .pipe(cssnano())
    .pipe(gulp.dest('assets/css')); // Jekyll can grab it from here
});


gulp.task('sass-prod', function () {
  return gulp.src('_sass/styles.scss')
  .pipe(sass({
    includePaths: ['_sass'],
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
