import {
  Paths,
  HmrBrowserSyncConfig,
  LIVE_RELOAD_PROXY,
  LiveReloadBrowserSyncConfig,
  HMR_PROXY
} from './utils/gulp-config';
import { TaskFunction, TaskCallback,  } from 'gulp';
import { exec } from 'child_process';
import * as gulp from 'gulp';
import * as typescript from 'gulp-typescript';
import * as browserSync from 'browser-sync';
import * as nodemon from 'gulp-nodemon';
import * as compodoc from '@compodoc/gulp-compodoc';
import * as env from 'gulp-env';

// Pipeline
import {
  buildAppTask,
  rebuildAppTask,
  buildElectron,
  setHmrVariable,
  setLaunchVariable,
  setLiveReloadVariable,
  proxyInit,
  proxyCli
} from './utils/gulp-series';

import {
  launchElectron,
  startCompodoc,
  startHMR,
  serveLiveReload,
  serveElectronHmr
} from './utils/gulp-parallel';

 /**
  * Gulp individual task wrappers.
  */
gulp.task('build:electron', buildElectron);

gulp.task(buildAppTask);

gulp.task('launch:var', setLaunchVariable);

gulp.task('launch:electron', launchElectron);

gulp.task(rebuildAppTask);

gulp.task('serve:live-reload', serveLiveReload);

gulp.task('live-reload:var', setLiveReloadVariable);

gulp.task('hmr:var', setHmrVariable);

gulp.task('serve:hmr', startHMR);

gulp.task('serve:electron-hmr', serveElectronHmr);

gulp.task('start:docs', startCompodoc);

// Parallel.
gulp.task('watch:electron', (done) => {
  gulp.watch(Paths.electron_src, buildElectron);
  done();
});

gulp.task('watch:app', done => {
  gulp.watch(Paths.app_src, rebuildAppTask);
  done();
});

// Gulp Task Chains.
gulp.task(
  'live-reload',
  gulp.series('build:app', 'build:electron', 'live-reload:var', gulp.parallel('watch:electron', 'watch:app', 'serve:live-reload'))
);

gulp.task(
  'hmr',
  gulp.series('build:electron', 'hmr:var', gulp.parallel('serve:hmr', 'watch:electron'))
);

gulp.task('default', gulp.series('build:app', 'build:electron', 'launch:var', 'launch:electron'));
