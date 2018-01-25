/**
 * This File is for all tasks that can be run in series
 * without blocking the event stream and preventing downstream
 * tasks from running.
 */
import { Paths, LIVE_RELOAD_PROXY, LiveReloadBrowserSyncConfig } from './gulp-config';
import { exec } from 'child_process';
import { task, TaskFunction } from 'gulp';
import * as typescript from 'gulp-typescript';
import * as env from 'gulp-env';
import * as gulp from 'gulp';
import * as browserSync from 'browser-sync';

/**
 * Call CLI 'ng build' function to clean the dist directory if it exists
 * and build the angular code.
 */
export const buildAppTask = <TaskFunction>function buildApp() {
  const buildCmd = exec('ng build');
  // pipe cli output to STDOUT so we can see it working.
  buildCmd.stdout.pipe(process.stdout);
  buildCmd.stderr.pipe(process.stdout);
  buildCmd.on('error', err => {
    throw err;
  });
  return buildCmd;
};
// Gulp-CLI documentation and task registration.
buildAppTask.displayName = `build:app`;
buildAppTask.description = `<Series>: Builds the Angular code via CLI.`;

/**
 * This task is only used for the Live-Reload Proxy.
 * @param done - Callback function to signal task completion.
 */
export const rebuildAppTask = <TaskFunction>function rebuildApp(done) {
  const buildCmd = exec('ng build --delete-output-path false');
  // pipe cli output to STDOUT so we can see it working.
  buildCmd.stdout.pipe(process.stdout);
  buildCmd.stderr.pipe(process.stdout);
  buildCmd.stdout.on('data', data => {
    proxyCli(LIVE_RELOAD_PROXY, LiveReloadBrowserSyncConfig);
    done();
  });
  buildCmd.on('error', err => {
    throw err;
  });
  return buildCmd;
};
// Gulp-CLI documentation and task registration.
rebuildAppTask.displayName = `rebuild:app`;
rebuildAppTask.description = `<Series>: Rebuilds the angular app output to 'dist' directory`;

export const buildElectronTask = <TaskFunction>function buildElectron() {
  return gulp
    .src([Paths.electron_src])
    .pipe(typescript())
    .pipe(gulp.dest(Paths.electron_dest));
};
buildElectronTask.displayName = 'build:electron';
buildElectronTask.description = `<Series>: Compiles Electron code to 'dist/electron'.`;

export const setLaunchVariableTask = <TaskFunction>function setLaunchVariable(done) {
  env.set({
    LAUNCH_MODE: 'build',
    NODE_ENV: 'development'
  });
  done();
};
setLaunchVariableTask.displayName = 'launch:var';
setLaunchVariableTask.description = '<Series>: Sets Environment Variable for relative proxy in Electron main window.';

export const setLiveReloadVariableTask = <TaskFunction>function setLiveReloadVariable(done) {
  env.set({
    LAUNCH_MODE: 'LiveReload',
    NODE_ENV: 'development'
  });
  done();
};
setLiveReloadVariableTask.displayName = 'live-reload:var';
setLiveReloadVariableTask.description = '<Series>: Sets Environment Variable for relative proxy in Electron main window.';

export const setHmrVariableTask = <TaskFunction>function setHmrVariable(done) {
  env.set({
    LAUNCH_MODE: 'HMR',
    NODE_ENV: 'development'
  });
  done();
};
setHmrVariableTask.displayName = 'hmr:var';
setHmrVariableTask.description = '<Series>: Sets Environment Variable for relative proxy in Electron main window.';

/**
 * Helper Method.
 * This method gets the proxy browser-sync instance and
 * calls the reload method.
 * If the instance doesnt exist, it creates a new one.
 * @param proxy - proxy type, HMR or Live-Reload.
 * @param config - relative proxy config object.
 */
export function proxyCli(proxy: string, config: object) {
  try {
    const active = browserSync.get(proxy);
    if (active) {
      console.log('Proxy Active: Reloading.');
      active.reload();
    }
  } catch (err) {
    console.log('Proxy Inactive: Instantiating new instance.');
    return browserSync.create(proxy).init(config);
  }
}
