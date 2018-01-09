import { Paths, BrowserSyncConfig } from './utils/build-config';
import { exec } from 'child_process';
import * as gulp from 'gulp';
import * as typescript from 'gulp-typescript';
import * as browserSync from 'browser-sync';
import * as nodemon from 'gulp-nodemon';
import * as env from 'gulp-env';

// Pipeline
function buildElectron() {
  return gulp
    .src([Paths.electron_src])
    .pipe(typescript())
    .pipe(gulp.dest(Paths.electron_dest));
}

function setLaunchVariable(done) {
  env.set({
    LAUNCH_MODE: 'build',
    NODE_ENV: 'development'
  });
  done();
}

function setLiveReloadVariable(done) {
  env.set({
    LAUNCH_MODE: 'LiveReload',
    NODE_ENV: 'development'
  });
  done();
}

function launchElectron() {
  return exec(`electron ${Paths.electron_dest}main`, (err, stdin, stderr) => {
    if (err) {
      throw err;
    }
  });
}

function buildApp() {
  return exec('ng build', (err, stdin, stderr) => {
    if (err) {
      throw err;
    }
  });
}

function rebuildApp() {
  return exec('ng build --delete-output-path false', (err, stdin, stderr) => {
    if (err) {
      console.log(err);
    }
  });
}

function proxyInit() {
  return browserSync.create('LiveProxy').init(BrowserSyncConfig);
}

function proxyReload() {
  return browserSync.reload();
}

function serveLiveReload(done) {
  return nodemon({
    exec: `electron ${Paths.electron_dest}main`,
    watch: [Paths.electron_dest]
  }).on('start', () => {
    try {
      const active = browserSync.get('LiveProxy');
      if (active) {
        active.reload();
        done();
      }
    } catch (err) {
      proxyInit();
      done();
    }
  });
}

// Series
gulp.task('build:electron', buildElectron);

gulp.task('build:app', buildApp);

gulp.task('launch:var', setLaunchVariable);

gulp.task('launch:electron', launchElectron);

gulp.task('rebuild:app', rebuildApp);

gulp.task('serve:live-reload', serveLiveReload);

gulp.task('live-reload:var', setLiveReloadVariable);

// Parallel.
gulp.task('watch:electron', done => {
  gulp.watch(Paths.electron_src, buildElectron);
  browserSync.reload();
  done();
});

gulp.task('watch:app', done => {
  gulp.watch(Paths.app_src, () => {
    gulp.series(['rebuild:app']);
  });
  done();
});

// Chains.
gulp.task(
  'live-reload',
  gulp.series(
    'build:app',
    'build:electron',
    'live-reload:var',
    gulp.parallel('watch:app', 'watch:electron', 'serve:live-reload')
  )
);

gulp.task(
  'electron:launch',
    gulp.series('build:app', 'build:electron', 'launch:var', 'launch:electron'));
