// Initialize modules
const { src, dest, watch, series, parallel } = require('gulp');
const autoprefixer = require ('autoprefixer');
const cssnano = require ('gulp-cssnano');
const concat = require ('gulp-concat');
const postcss = require ('gulp-postcss');
const replace = require ('gulp-replace');
const sass = require ('gulp-sass');
const sourcemaps = require ('gulp-sourcemaps');
const terser = require ('gulp-terser');





// File path variables
const files = {
	scssPath: 'app/scss/**/*.scss' ,
	jsPath: 'app/js/**/*.js'
}

//Sass task 
function scssTask(){
	return src(files.scssPath)
	.pipe(sourcemaps.init())
	.pipe(sass())
	.pipe(postcss([ autoprefixer()]))
	.pipe(cssnano())
	.pipe(sourcemaps.write('.'))
	.pipe(dest('dist')
	);
}



//JS task 

function jsTask(){
    return src(files.jsPath)
    .pipe(concat('all.js'))
    .pipe(terser())
    .pipe(dest('dist')

    );

}



// Cachebusting task 

const cbString = new Date().getTime();
function cacheBustTask(){
	return src(['index.html'])
	.pipe(replace(/cb=\d+/g, 'cb=' +cbString))
	.pipe(dest('.')
	);
}





// Watch task 


function watchTask(){
	watch([files.scssPath, files.jsPath],
	  parallel(scssTask,jsTask));
}


// Default task 

exports.default = series(
    parallel(scssTask,jsTask),
    cacheBustTask,
    watchTask
	);


	