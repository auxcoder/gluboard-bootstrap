"use strict";

// Load plugins
const autoprefixer = require("gulp-autoprefixer");
const browsersync = require("browser-sync").create();
const cleanCSS = require("gulp-clean-css");
const del = require("del");
const gulp = require("gulp");
const header = require("gulp-header");
const merge = require("merge-stream");
const plumber = require("gulp-plumber");
const sass = require("gulp-sass");
const uglify = require("gulp-uglify");
var flatmap = require('gulp-flatmap');
var usemin = require('gulp-usemin');
var imgmin = require('gulp-imagemin');
var concat = require('gulp-concat');
var path = require('path');
var rev = require('gulp-rev');
var htmlmin = require('gulp-htmlmin');

const paths = {
  dist: 'dist',
  scripts: 'js',
  styles: 'css',
  scriptsSrc: 'scripts',
  stylesSrc: 'scss',
  vendor: 'vendor',
};

// Load package.json for banner
const pkg = require('./package.json');

// Set the banner content
const banner = '/*! <%= pkg.title %> v<%= pkg.version %> (<%= pkg.homepage %>) - Copyright ' + (new Date()).getFullYear() + ' <%= pkg.author %> **/\n';

// BrowserSync
function browserSync(done) {
  browsersync.init({
    server: {
      baseDir: `./`
    },
    port: 3000
  });
  done();
}

// BrowserSync reload
function browserSyncReload(done) {
  browsersync.reload();
  done();
}

// Clean vendor
function clean() {
  return del([`./${paths.vendor}/`]);
}

// Clean
function delJs() {
  return del([`./${paths.scripts}`]);
}
function delCss() {
  return del([`./${paths.styles}`]);
}

// Bring third party dependencies from node_modules into vendor directory
function modules() {
  // Bootstrap JS
  var bootstrapJS = gulp.src('./node_modules/bootstrap/dist/js/*')
    .pipe(gulp.dest(`./vendor/bootstrap/js`));
  // Bootstrap SCSS
  var bootstrapSCSS = gulp.src('./node_modules/bootstrap/scss/**/*')
    .pipe(gulp.dest(`./vendor/bootstrap/scss`));
  // ChartJS
  var chartJS = gulp.src('./node_modules/chart.js/dist/*.js')
    .pipe(gulp.dest(`./vendor/chart.js`));
  // dataTables
  var dataTables = gulp.src([
      './node_modules/datatables.net/js/*.js',
      './node_modules/datatables.net-bs4/js/*.js',
      './node_modules/datatables.net-bs4/css/*.css'
    ])
    .pipe(gulp.dest(`./vendor/datatables`));
  // Font Awesome
  var fontAwesome = gulp.src('./node_modules/@fortawesome/**/*')
    .pipe(gulp.dest(`./vendor`));
  // jQuery Easing
  var jqueryEasing = gulp.src('./node_modules/jquery.easing/*.js')
    .pipe(gulp.dest(`./vendor/jquery-easing`));
  // jQuery
  var jquery = gulp.src([
      './node_modules/jquery/dist/*',
      '!./node_modules/jquery/dist/core.js'
    ])
    .pipe(gulp.dest(`./vendor/jquery`));
  return merge(bootstrapJS, bootstrapSCSS, chartJS, dataTables, fontAwesome, jquery, jqueryEasing);
}

// CSS task
function css() {
  return gulp
    .src(`./${paths.stylesSrc}/*.scss`)
    .pipe(plumber())
    .pipe(sass({
      outputStyle: "expanded",
      includePaths: "./node_modules",
    }))
    .on("error", sass.logError)
    .pipe(autoprefixer({
      cascade: false
    }))
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(cleanCSS({
      level: 2
    }))
    .pipe(gulp.dest(`./${paths.styles}`))
    .pipe(browsersync.stream());
}

// JS task
function js() {
  return gulp
    .src([
      './scripts/*.js',
      '!./scripts/*.min.js',
    ])
    .pipe(header(banner, {
      pkg: pkg
    }))
    .pipe(flatmap(function(stream, file) {
      return stream.pipe(concat(path.basename(file.path)));
    }))
    .pipe(concat('scripts.js'))
    .pipe(gulp.dest(`./js`))
    .pipe(browsersync.stream());
}

function minimage() {
  return gulp.src('./img/*.{png,jpg,gif}')
    .pipe(plumber())
    .pipe(imgmin({optimizationLevel: 3, progressive: true, interlaced: true}))
    .pipe(gulp.dest('./dist/img'));
}

// USEMIN task
function mincode(done) {
  gulp.src('./*.html')
    .pipe(flatmap(function(stream, file) {
      return stream.pipe(usemin({
        css: [rev()],
        html: [function() {
          return htmlmin({collapseWhitespace: true});
        }],
        js: [uglify, rev()],
      }))
    }))
    .pipe(plumber())
    .pipe(gulp.dest('./dist'))
    .pipe(browsersync.stream());
  done();
}

// Watch files
function watchFiles() {
  gulp.watch("./scss/**/*", css);
  gulp.watch(["./js/**/*", "!./js/**/*.min.js"], js);
  gulp.watch("./**/*.html", browserSyncReload);
}

// Define complex tasks
const vendor = gulp.series(clean, modules);
const minimize = gulp.parallel(minimage, mincode)
const build = gulp.series(vendor, minimize);
const watch = gulp.series(build, gulp.parallel(watchFiles, browserSync));
// Export tasks
exports.scripts = gulp.series(delJs, js);
exports.styles = gulp.series(delCss, css);
exports.build = build;
exports.default = watch;
