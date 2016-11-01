/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
	sourcemaps = require("gulp-sourcemaps"),
    rimraf = require("rimraf"),
	ts = require("gulp-typescript");

var paths = {
	webroot: "./wwwroot/"
};

paths.libs = paths.webroot + "libs/";

var tsProject = ts.createProject("tsconfig.json");

gulp.task('tsc', function () {
	var tsResult = tsProject.src({ cwd: paths.webroot })
		.pipe(sourcemaps.init())
		.pipe(ts(tsProject));
	return tsResult.js
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(""))
});

gulp.task('copy:angular2', () => {
	return gulp.src('./node_modules/@angular/**/*.umd.min.js')
        .pipe(gulp.dest(paths.libs + '@angular'));
});

gulp.task('copy:rxjs', () => {
	return gulp.src('./node_modules/rxjs/**/*.js')
        .pipe(gulp.dest(paths.libs + 'rxjs'));
});

gulp.task('copy:bootstrap', () => {
	return gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.min.css'])
		.pipe(gulp.dest(paths.libs + 'bootstrap'));
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

gulp.task('copy', [
	'copy:angular2',
	'copy:rxjs',
	'copy:bootstrap',
	'copy:otherDependencies'
]);

gulp.task('clean:libs', (cb) => {
	rimraf(paths.libs, cb);
});

gulp.task('clean', ['clean:libs']);

gulp.task('build', ['tsc']);
