// For all available options, see node_modules/pho-devstack/config.js
// These are development build settings, see gulpfile-production.js for production settings

var gulp = require('gulp');
var uglify = require('gulp-uglify');
var gutil = require("gulp-util")
var plumber = require('gulp-plumber');




//HTML///////////////////////////////////////
var html_files = ["./app/index.html"];
gulp.task('html', function () {
  gulp.src('./src/index.html')
    .pipe(plumber())
    .pipe(gulp.dest('./app/'))
    .pipe(reload({stream:true}));
});

//CSS//////////////////////////////////////
var stylus = require('gulp-stylus');
var nib = require('nib');
var css_origin = './app/assets/css/';
var css_files = [css_origin + "*.styl",css_origin + "**/*.styl"];

gulp.task('css', function () {
  gulp.src('./src/styles/style.styl')
    .pipe(plumber())
    .pipe(stylus({
      use: nib(),
      compress: (gutil.env.type === 'production' ? true : false)
    }))
    .pipe(gulp.dest(css_origin))
    .pipe(reload({stream:true}));
});

//JS///////////////////////////////////////
var browserify = require('gulp-browserify');
var js_origin = "./app/assets/js/"
var js_files = [js_origin+"*.js",js_origin+"**/*.js"];

gulp.task('js', function () {
  gulp.src('./src/scripts/main.js');
    //.pipe(plumber())
    //.pipe(browserify())
    //.pipe(gutil.env.type === 'production' ? uglify() : gutil.noop())
    //.pipe(gulp.dest(js_origin))
    //.pipe(reload({stream:true}));
});

//BROWSER-SYNC/////////////////////////////
var browserSync = require('browser-sync');
var reload      = browserSync.reload;
gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./app/"
        },
        port:8086
    });
});


//DEFAULT TASK/////////////////////////////

gulp.task('default', ['html','css','js','browser-sync'], function () {
    gulp.watch(html_files, ['html']);
    gulp.watch(css_files, ['css']);
    gulp.watch(js_files, ['js']);
});