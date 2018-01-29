import { Paths, LIVE_RELOAD_PROXY, HMR_PROXY, HmrBrowserSyncConfig, LiveReloadBrowserSyncConfig } from './gulp-config';
import * as gulp from 'gulp';
import { exec } from 'child_process';
import * as compodoc from '@compodoc/gulp-compodoc';
import * as nodemon from 'gulp-nodemon';
import { TaskFunction } from 'undertaker';
/**
 * Calls electron on the main process in the 'dist/electron' directory
 * Pipes STDOUT from Electron's Main process to the console.
 */
export const launchElectronTask = <TaskFunction>function launchElectron() {
  const electronCmd = exec(`electron ${Paths.electron_dest}main`);
  electronCmd.stdout.pipe(process.stdout);
  electronCmd.stderr.pipe(process.stderr);
  return electronCmd;
};
// Gulp-CLI documentation and task registration.
launchElectronTask.displayName = 'launch:electron';
launchElectronTask.description = '<Paralell>: Launches Electron and pipes STDOUT from main process.';

/**
 * This task is only used the HMR Proxy.
 * Spins up the CLI HMR service and pipes its STDOUT to the console.
 * @param done - Callback function to signal task completion.
 */
export const startHMRTask = <TaskFunction>function startHMR(done) {
  process.env.FIRST_RUN = 'true';
  const hmrCmd = exec('webpack-dev-server --env hot --hot --hot-only --port 4200');
  hmrCmd.stdout.pipe(process.stdout);
  hmrCmd.stderr.pipe(process.stderr);
  hmrCmd.stdout.on('data', data => {
    if (process.env.FIRST_RUN === 'true') {
      if (String(data) === 'webpack: Compiled successfully.\n' || String(data) === 'webpack: Compiled with warnings.') {
        process.env.FIRST_RUN = 'false';
        done();
        return serveElectronHmrTask(done);
      }
    }
  });
  hmrCmd.on('error', err => {
    throw err;
  });
};
// Gulp-CLI documentation and task registration.
startHMRTask.displayName = 'serve:hmr';
startHMRTask.description = '<Parallel>: Spins up the CLI HMR service';

/**
 * This task generates the angular Compodoc documentation to the 'docs'
 * directory and serves it on default port of 8080.
 * @param done - Callback fruntion to signal task completion.
 */
export const startCompodocTask = <TaskFunction>function startCompodoc(done) {
  return gulp.src('src/**/*.ts').pipe(
    compodoc({
      port: 8080,
      output: 'docs',
      tsconfig: 'src/tsconfig.json',
      serve: true,
      open: true
    })
  );
};
// Gulp-CLI documentation and task registration.
startCompodocTask.displayName = 'start:docs';
startCompodocTask.description = '<Paralell>: Generates Compodoc documentation and serves it up.';

export const serveLiveReloadTask = <TaskFunction>function serveLiveReload() {
  nodemon({
    exec: `electron ${Paths.electron_dest}main`,
    watch: [Paths.electron_dest]
  });
};
// Gulp-CLI documentation and task registration.
serveLiveReloadTask.displayName = 'serve:live-reload';
serveLiveReloadTask.description = '<Paralell>: Serves Electron via nodemon and proxy browser-sync.';

export const serveElectronHmrTask = <TaskFunction>function serveElectronHmr() {
  return nodemon({
    exec: `electron ${Paths.electron_dest}main`,
    watch: [Paths.electron_dest]
  });
};
// Gulp-CLI documentation and task registration.
serveElectronHmrTask.displayName = 'serve:electron-hmr';
serveElectronHmrTask.description = '<Paralell>: Serves Electron via nodemon and proxy CLI HMR service.';
