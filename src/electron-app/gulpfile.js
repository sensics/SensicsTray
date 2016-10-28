const gulp = require('gulp'),
    run = require('run-sequence'),
    del = require('del'),
    inject = require('gulp-inject'),
    concat = require('gulp-concat'),
    ts = require('gulp-typescript'),
	path = require('path'),
    rename = require('gulp-rename'),
    electron = require('gulp-atom-electron'),
    uglify = require('gulp-uglify'),
    symdest = require('gulp-symdest'),
    watch = require('gulp-watch');

gulp.task('clean:dist', () => {
    return del(['dist/**/*'], { force: true });
});

gulp.task('clean', ['clean:dist']);

gulp.task('copy:angular2', () => {
	return gulp.src('./node_modules/@angular/**/*.umd.min.js')
        .pipe(gulp.dest('dist/app/vendor/@angular'));
});

gulp.task('copy:rxjs', () => {
	return gulp.src('./node_modules/rxjs/**/*.js')
        .pipe(gulp.dest('dist/app/vendor/rxjs'));
});

gulp.task('copy:styles', () => {
	return gulp.src(['./node_modules/bootstrap/dist/css/bootstrap.min.css'])
		.pipe(gulp.dest('dist/app/vendor/bootstrap'));
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
	.pipe(gulp.dest('dist/app/vendor'));
});

gulp.task('copy:systemJSConfig', () => {
	return gulp.src([
		'./app/systemjs.config.js'
	])
	.pipe(gulp.dest('dist/app'));
});

gulp.task('copy:frontend', () => {
	return gulp.src([
		'./app/index.html',
		'./app/**/*.html',
		'./app/*.ts',
		'./app/**/*.ts',
		'./app/*.js',
		'./app/*.json'
	])
	.pipe(gulp.dest('dist/app'));
});

gulp.task('copy', ['clean'], (done) => {
	run(['copy:angular2', 'copy:rxjs', 'copy:styles', 'copy:otherDependencies', 'copy:systemJSConfig', 'copy:frontend'], done);
});

gulp.task('tsc', ['copy'], () => {
    var tsProject = ts.createProject('./tsconfig.json', {
        typescript: require('typescript')
    });
    var tsResult = tsProject.src()
        .pipe(tsProject());
    return tsResult.js.pipe(gulp.dest('./dist'));
});

gulp.task('build:frontend', ['tsc']);

gulp.task('build:electronPackage', () => {
    var platforms = [
        // { platform: 'darwin', slug: 'osx' },
        { platform: 'win32', slug: 'windows' }//,
        // { platform: 'linux', slug: 'linux' }
    ];
    platforms.map((p) => {
    	gulp.src(['dist/app/**/*'])
			.pipe(electron({
				version: '1.4.0',
				platform: p.platform,
				winIcon: path.join(__dirname, 'build', 'icon.ico')
			}))
			.pipe(symdest('dist/output/ng2-electron-' + p.slug));
    });
});

gulp.task('default', (done) => {
	run(
		'build:frontend',
		'build:electronPackage',
        done);
});

gulp.task('watch:frontend', (done) => {
	var files = [
		'./app/*.ts',
		'./app/*.js',
		'./app/*.html',
		'./app/**/*.ts',
		'./app/**/*.css',
		'./app/**/*.html'
	];

	var options = {
		ignoreInitial: true,
		read: false
	};

	var callback = () => {
		run('build:frontend');
	};

	return watch(files, options, callback);
});

