import { Config } from './utils/gulp-config';
import { spawn, exec } from 'child_process';
import * as gulp from 'gulp';
import * as typescript from 'gulp-typescript';
import { electron } from './utils/electron-server';
import { IpcMain, ipcMain } from 'electron';

const callback = function(electronProcState) {
  console.log('electron process state: ' + electronProcState);
  if (electronProcState === 'stopped') {
    process.exit();
  }
};

gulp.task('build:app', (done) => {
  exec('ng build', (err, stdin, stderr) => {
    if (err) {
      console.log(err);
    }
    done();
  });
});

gulp.task('rebuild:app', (done) => {
  exec('ng build --delete-output-path false' , (err, stdin, stderr) => {
    if (err) {
      console.log(err);
    }
    done();
  });

});

gulp.task('build:electron', (done) => {
  gulp
    .src([Config.electron_src])
    .pipe(typescript())
    .pipe(gulp.dest(Config.electron_dest), done());
});

gulp.task('watch:electron', () => {
  gulp.watch(Config.electron_src, ['build:electron']);
});
gulp.task('watch:app', () => {
  gulp.watch(Config.app_src, ['rebuild:app']);
});
