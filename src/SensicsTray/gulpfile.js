/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
	sourcemaps = require("gulp-sourcemaps"),
    rimraf = require("rimraf"),
    ts = require("gulp-typescript"),
    sass = require('gulp-sass');

var paths = {
    webroot: "./wwwroot/",
    nativeLibs: './artifacts/bin/'
};

paths.libs = paths.webroot + "libs/";
paths.app = paths.webroot + "app/";

var tsProject = ts.createProject("tsconfig.json");

gulp.task('sass', () => {
    return gulp.src(paths.webroot + '**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(gulp.dest(paths.webroot));
});

gulp.task('tsc', function () {
    var tsResult = tsProject.src()
        .pipe(sourcemaps.init())
        .pipe(tsProject());

    return tsResult.js
        .pipe(sourcemaps.write())
        .pipe(gulp.dest(paths.app));
});

gulp.task('copy:angular2', () => {
    return gulp.src([
        './node_modules/@angular/**/*.umd.min.js',
        './node_modules/@angular/**/*.scss',
        './node_modules/@angular/**/*.css',
        './node_modules/@angular/**/*.umd.js'
    ])
        .pipe(gulp.dest(paths.libs + '@angular'));
});

gulp.task('copy:rxjs', () => {
	return gulp.src('./node_modules/rxjs/**/*.js')
        .pipe(gulp.dest(paths.libs + 'rxjs'));
});

gulp.task('copy:bootstrap-fonts', () => {
	return gulp.src([
		'./node_modules/bootstrap/dist/fonts/*.*'
	]).pipe(gulp.dest(paths.libs + 'fonts'));
});

gulp.task('copy:bootstrap', ['copy:bootstrap-fonts'], () => {
	return gulp.src([
		'./node_modules/bootstrap/dist/css/bootstrap.min.css'
	]).pipe(gulp.dest(paths.libs + 'bootstrap'));
});

gulp.task('copy:otherDependencies', () => {
	return gulp.src([
		'node_modules/core-js/client/shim.min.js',
        'node_modules/zone.js/dist/zone.min.js',
        'node_modules/reflect-metadata/Reflect.js',
        'node_modules/systemjs/dist/system.js',
        'node_modules/ng2-bootstrap/bundles/ng2-bootstrap.umd.min.js',
		'node_modules/moment/moment.js'
	])
	.pipe(gulp.dest(paths.libs));
});

gulp.task('copy:usbLib', () => {
    return gulp.src([
        '../OSVR-USB-Monitor/build/RelWithDebInfo/osvrUSBDetection.dll',
        '../OSVR-USB-Monitor/build/RelWithDebInfo/osvrUSBDetection.pdb'
    ])
    .pipe(gulp.dest(paths.nativeLibs));
});

// this task should only be run manually, not as part of the 'build' task
// this avoids git mistakingly marking libs as touched when no change is made.
gulp.task('copy', [
	'copy:angular2',
	'copy:rxjs',
	'copy:bootstrap',
    'copy:otherDependencies'
]);

// This task should only be run manually, not as part of the 'clean' task
gulp.task('clean:libs', (cb) => {
	rimraf(paths.libs, cb);
});

gulp.task('clean', []);

gulp.task('build', ['tsc', 'sass']);
