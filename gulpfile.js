const { src, dest, series, watch, parallel } = require('gulp');

const removeCommentsCss = require('gulp-strip-css-comments');
const autoprefixer      = require('gulp-autoprefixer');
const sass              = require('gulp-sass');
const cleanCSS          = require('gulp-clean-css');
const del               = require('del');
const concat            = require('gulp-concat');
const webpack           = require("webpack-stream");
const sync              = require('browser-sync').create();
const babel             = require('gulp-babel');
const uglify            = require('gulp-uglify');
const replace           = require("gulp-replace");


const htmlDev = () => {
    return src('src/**.html')
        .pipe(dest('app'));
};

const htmlBuild = () => {
    return src('src/**.html')
        .pipe(replace(/type="module"/g, ""))
        .pipe(dest('app'));
};


const scriptsDev = () => {
    return src("src/js/**/*")
        .pipe(dest("app/js"))
};

const scriptsBuild = () => {
    return src("src/js/**/*")
        .pipe(webpack(require("./webpack.config.js")))
        .pipe(dest("app/js"));
};

const scriptsBuildDist = () => {
    return src(["src/js/**.js", "!src/js/app.js"])
        .pipe(replace(/export class/g, 'class'))
        .pipe(babel({
            presets: ['@babel/preset-env']
        }))
        .pipe(uglify({
            keep_fnames: true
        }))
        .pipe(dest("LiveGallery"));
}


const scssDev = () => {
   return src('src/scss/**.scss')
       .pipe(sass({
            outputStyle:'expanded'
        }))
       .pipe(concat('css/style.css'))
       .pipe(dest('app'));
};

const scssBuild = () => {
   return src('src/scss/**.scss')
        .pipe(sass({
            outputStyle:'compressed'
        }))
        .pipe(removeCommentsCss())
        .pipe(cleanCSS())
        .pipe(autoprefixer())
        .pipe(concat('css/style.css'))
        .pipe(dest('app'));
};


const clear = () => {
    return del(['./app', "./dist"]);
};

const clearScripts = () => {
    return del("./LiveGallery");
};


const serve = () => {
    sync.init({
        server: './app/'
    });

    watch('src/**/**.html',             series(htmlDev)).on('change', sync.reload);
    watch("src/js/**/**.js",            series(scriptsDev)).on('change', sync.reload);
    watch('src/scss/**/**.scss',        series(scssDev)).on('change', sync.reload);
};


exports.buildScripts = series(clearScripts, scriptsBuildDist)
exports.build = series(clear, parallel(scssBuild, htmlBuild, scriptsBuild));
exports.serve = series(clear, scssDev, htmlDev, scriptsDev, serve);
exports.clear = clear;