import { Paths, BrowserSyncConfig, HmrBrowserSyncConfig } from './utils/build-config';
import { exec } from 'child_process';
import * as gulp from 'gulp';
import * as typescript from 'gulp-typescript';
import * as browserSync from 'browser-sync';
import * as nodemon from 'gulp-nodemon';
import * as compodoc from '@compodoc/gulp-compodoc';
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

function setHmrVariable(done) {
  env.set({
    LAUNCH_MODE: 'HMR',
    NODE_ENV: 'development'
  });
  done();
}

function launchElectron() {
  return exec(`electron ${Paths.electron_dest}main`, (err, stdout, stderr) => {
    if (err) {
      throw err;
    }
  });
}

function buildApp() {
  return exec('ng build', (err, stdout, stderr) => {
    if (err) {
      throw err;
    }
  });
}

function rebuildApp(done) {
  exec('ng build --delete-output-path false', (err, stdout, stderr) => {
    if (err) {
      throw err;
    }
    proxyReload();
    return done();
  });
}

function startHMR(done) {
  const hmrCmd = exec('ng serve --hmr -e=hmr --delete-output-path false');
  hmrCmd.stdout.on('data', data => {
    console.log(String(data));
    if (String(data) === 'webpack: Compiled successfully.\n') {
      proxyHmrReload();
      done();
    }
  });
  hmrCmd.on('error', err => {
    throw err;
  });
}

function startCompodoc(done) {
  return gulp.src('src/**/*.ts').pipe(
    compodoc({
      output: 'docs',
      tsconfig: 'src/tsconfig.json',
      serve: true
    })
  );
}

function proxyInit() {
  return browserSync.create('LiveProxy').init(BrowserSyncConfig);
}

function proxyReload() {
  return browserSync.get('LiveProxy').reload();
}

function proxyHmrInit() {
  return browserSync.create('HMR-Proxy').init(HmrBrowserSyncConfig);
}

function proxyHmrReload() {
  return browserSync.get('HMR-Proxy').reload();
}

function serveLiveReload(done) {
  nodemon({
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

function serveElectronHmr(done) {
  nodemon({
    exec: `electron ${Paths.electron_dest}main`,
    watch: [Paths.electron_dest]
  }).on('start', () => {
    try {
      const active = browserSync.get('HMR-Proxy');
      if (active) {
        active.reload();
        done();
      }
    } catch (err) {
      proxyHmrInit();
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

gulp.task('hmr:var', setHmrVariable);

gulp.task('serve:hmr', startHMR);

gulp.task('serve:electron-hmr', serveElectronHmr);

gulp.task('start:docs', startCompodoc);

// Parallel.
gulp.task('watch:electron', done => {
  gulp.watch(Paths.electron_src, buildElectron);
  done();
});

gulp.task('watch:app', done => {
  gulp.watch(Paths.app_src, rebuildApp);
  done();
});

// Chains.
gulp.task(
  'live-reload',
  gulp.series('build:app', 'build:electron', 'live-reload:var', gulp.parallel('watch:electron', 'serve:live-reload'))
);

gulp.task(
  'hmr',
  gulp.series('build:electron', 'hmr:var', gulp.parallel('serve:hmr', 'watch:electron', 'serve:electron-hmr'))
);

gulp.task('launch', gulp.series('build:app', 'build:electron', 'launch:var', 'launch:electron'));
