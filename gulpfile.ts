import { Config } from './utils/gulp-config';
import { spawn, exec } from 'child_process';
import * as gulp from 'gulp';
import * as typescript from 'gulp-typescript';
import { electron } from './utils/electron-server';

const callback = function(electronProcState) {
  console.log('electron process state: ' + electronProcState);
  if (electronProcState === 'stopped') {
    process.exit();
  }
};

gulp.task('build:electron', done => {
  gulp
    .src([Config.electron_src])
    .pipe(typescript())
    .pipe(gulp.dest(Config.electron_dest), done());
});

gulp.task('restart:electron', electron.restart());

gulp.task('watch:electron', () => {
  gulp.watch(Config.electron_src, ['build:electron']);
});
