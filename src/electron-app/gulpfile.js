const gulp = require('gulp');
const del = require('del');
const path = require('path');
const builder = require('electron-builder');
const Platform = builder.Platform;

gulp.task('clean:dist', () => {
    return del(['dist/**/*'], { force: true });
});

gulp.task('clean', ['clean:dist']);

gulp.task('copy:usblib', ['clean'], () => {
	return gulp.src([
		"../OSVR-USB-Monitor/build/RelWithDebInfo/osvrUSBDetection.dll",
		"../OSVR-USB-Monitor/build/RelWithDebInfo/osvrUSBDetection.pdb"
	]).pipe(gulp.dest("app/bin"));
});

gulp.task('copy', ['copy:usblib']);

gulp.task('build:electronPackage', ['copy'], (cb) => {
	builder.build({
		targets: Platform.WINDOWS.createTarget(),
		devMetadata: {
			"directories": {
				"app": "app",
				"output": "dist"
			},
			"build": {
				"appId": "com.sensics.sensicsTray",
				"asar": false,
				"win": {
					"target": "zip",
					"iconUrl": "https://github.com/OSVR/OSVR-Config/blob/master/src/Launcher/assets/osvrconfig.ico?raw=true"
				}
			}
		}
	})
	.then(() => {
		cb();
	})
	.catch((error) => {
		cb(error);
	});
});

gulp.task('default', ['build:electronPackage']);

