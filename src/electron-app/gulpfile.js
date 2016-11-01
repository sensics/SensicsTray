const gulp = require('gulp'),
    del = require('del'),
	path = require('path'),
    electron = require('gulp-atom-electron'),
    symdest = require('gulp-symdest');

gulp.task('clean:dist', () => {
    return del(['dist/**/*'], { force: true });
});

gulp.task('clean', ['clean:dist']);

gulp.task('build:electronPackage', ['clean:dist'], () => {
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

gulp.task('default', ['build:electronPackage']);

