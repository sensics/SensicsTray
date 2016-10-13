/// <binding Clean='clean' />
"use strict";

var gulp = require("gulp"),
	sourcemaps = require("gulp-sourcemaps"),
    rimraf = require("rimraf"),
	ts = require("gulp-typescript");

var paths = {
	webroot: "./wwwroot/"
};

paths.generated = paths.webroot + "generated";

var tsProject = ts.createProject(paths.webroot + "tsconfig.json");

gulp.task('tsc', function () {
	var tsResult = tsProject.src({ cwd: paths.webroot })
		.pipe(sourcemaps.init())
		.pipe(ts(tsProject));
	return tsResult.js
		.pipe(sourcemaps.write())
		.pipe(gulp.dest(paths.webroot))
});

gulp.task("clean:generated", function (cb) {
	rimraf(paths.generated, cb);
});

gulp.task("clean", ["clean:generated"]);

gulp.task("build", ["tsc"]);
