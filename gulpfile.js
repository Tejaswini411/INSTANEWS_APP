// Initialize modules
const { src, dest, watch, series, parallel, task } = require('gulp'),
    autoprefixer = require('autoprefixer'),
    cssnano = require('gulp-cssnano'),
    concat = require('gulp-concat'),
    postcss = require('gulp-postcss'),
    replace = require('gulp-replace'),
    sass = require('gulp-sass'),
    sourcemaps = require('gulp-sourcemaps'),
    terser = require('gulp-terser'),
    browserSync = require('browser-sync').create(); // add browser sync to visite webpage using gulp

// File path variables
const files = {
    scssPath: 'app/scss/**/*.scss',
    jsPath: 'app/js/**/*.js'
}

//Sass task 
function scssTask() {
    return src(files.scssPath)
        .pipe(sourcemaps.init())
        .pipe(sass())
        .pipe(postcss([autoprefixer()]))
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(dest('dist'));
}


// Browser Sync
function browser_sync() {
    browserSync.init({
        server: {
            baseDir: './'
        }
    });
}

//JS task 
function jsTask() {
    return src(files.jsPath)
        .pipe(concat('all.js'))
        .pipe(terser())
        .pipe(dest('dist')

        );
}

// Cachebusting task 
const cbString = new Date().getTime();

function cacheBustTask() {
    return src(['index.html'])
        .pipe(replace(/cb=\d+/g, 'cb=' + cbString))
        .pipe(dest('.'));
}


// Watch task 
function watchTask() {
    watch([files.scssPath, files.jsPath],
        parallel(scssTask, jsTask));
}


// Default task 
exports.default = series(
    parallel(scssTask, jsTask),
    cacheBustTask,
    parallel(watchTask, browser_sync)
);