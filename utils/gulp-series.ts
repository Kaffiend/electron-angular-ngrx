import {
  Paths,
  LIVE_RELOAD_PROXY,
  LiveReloadBrowserSyncConfig
} from './gulp-config';
import { exec } from 'child_process';
import * as typescript from 'gulp-typescript';
import * as env from 'gulp-env';
import * as gulp from 'gulp';
import * as browserSync from 'browser-sync';

/**
 * Call CLI 'ng build' function to clean the dist directory if it exists
 * and build the angular code.
 */
export function buildApp() {
  return exec('ng build', (err, stdout, stderr) => {
    if (err) {
      throw err;
    }
  });
}

/**
 * This task is only used for the Live-Reload Proxy.
 * @param done - Callback function to signal task completion.
 */
export function rebuildApp(done) {
  exec('ng build --delete-output-path false', (err, stdout, stderr) => {
    if (err) {
      throw err;
    }
    proxyReload(LIVE_RELOAD_PROXY, LiveReloadBrowserSyncConfig);
    return done();
  });
}

export function buildElectron() {
  return gulp
    .src([Paths.electron_src])
    .pipe(typescript())
    .pipe(gulp.dest(Paths.electron_dest));
}

export function setLaunchVariable(done) {
  env.set({
    LAUNCH_MODE: 'build',
    NODE_ENV: 'development'
  });
  done();
}

export function setLiveReloadVariable(done) {
  env.set({
    LAUNCH_MODE: 'LiveReload',
    NODE_ENV: 'development'
  });
  done();
}

export function setHmrVariable(done) {
  env.set({
    LAUNCH_MODE: 'HMR',
    NODE_ENV: 'development'
  });
  done();
}

export function proxyInit(proxy: string, config: Object) {
  return browserSync.create(proxy).init(config);
}

/**
 * This method gets the proxy browser-sync instance and
 * calls the reload method.
 * If the instance doesnt exhist, it creates a new one.
 * @param proxy - the proxy type, HMR or Live Reload.
 * @param config - relative proxy config object from config.
 */
export function proxyReload(proxy: string, config: object) {
  try {
    const active = browserSync.get(proxy);
    if (active) {
      active.reload();
    }
  } catch (err) {
    console.log('No proxy instance found: initializing new instance.');
    proxyInit(proxy, config);
  }
}
