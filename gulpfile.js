const { src, dest, series, watch, parallel } = require('gulp');

const removeCommentsCss = require('gulp-strip-css-comments');
const autoprefixer      = require('gulp-autoprefixer');
const sass              = require('gulp-sass')(require('sass'));
const cleanCSS          = require('gulp-clean-css');
const del               = require('del');
const concat            = require('gulp-concat');
const sync              = require('browser-sync').create();
const babel             = require('gulp-babel');
const uglify            = require('gulp-uglify');


const html = () => {
	return src('src/**.html')
		.pipe(dest('app'));
};


const scriptsDev = () => {
	return src("src/js/**/*")
		.pipe(dest("app/js"))
};

const scriptsBuild = () => {
	return src("src/js/**/*")
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(uglify({
			keep_fnames: true
		}))
		.pipe(dest("app/js"));
};

const scriptsBuildDist = () => {
	return src("src/js/**.js")
		.pipe(babel({
			presets: ['@babel/preset-env']
		}))
		.pipe(uglify({
			keep_fnames: true
		}))
		.pipe(dest("LiveGallery"));
}


const scssDev = () => {
   return src('src/scss/style.scss')
	   .pipe(sass({
			outputStyle:'expanded'
		}))
	   .pipe(concat('css/style.css'))
	   .pipe(dest('app'));
};

const scssBuild = () => {
   return src('src/scss/style.scss')
		.pipe(sass({
			outputStyle:'compressed'
		}))
		.pipe(removeCommentsCss())
		.pipe(autoprefixer())
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(concat('css/style.css'))
		.pipe(dest('app'));
};

const scssBuildScripts = () => {
	return src("src/scss/liveGallery/liveGalleryBuild.scss")
		.pipe(sass({
			outputStyle:'compressed'
		}))
		.pipe(removeCommentsCss())
		.pipe(autoprefixer())
		.pipe(cleanCSS({
			level: 2
		}))
		.pipe(concat('LiveGallery/liveGallery.css'))
		.pipe(dest('./'));
}


const clear = () => {
	return del('./app');
};

const clearScripts = () => {
	return del("./LiveGallery");
};


const serve = () => {
	sync.init({
		server: './app/'
	});

	watch('src/**/**.html',             series(html)).on('change', sync.reload);
	watch("src/js/**/**.js",            series(scriptsDev)).on('change', sync.reload);
	watch('src/scss/**/**.scss',        series(scssDev)).on('change', sync.reload);
};


exports.buildScripts = series(clearScripts, parallel(scriptsBuildDist, scssBuildScripts));
exports.build = series(clear, parallel(scssBuild, html, scriptsBuild));
exports.serve = series(clear, scssDev, html, scriptsDev, serve);
exports.clear = clear;