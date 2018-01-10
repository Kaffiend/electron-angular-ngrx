import { Paths, LIVE_RELOAD_PROXY, HMR_PROXY, HmrBrowserSyncConfig, LiveReloadBrowserSyncConfig } from './gulp-config';
import * as gulp from 'gulp';
import { exec } from 'child_process';
import * as compodoc from '@compodoc/gulp-compodoc';
import * as browserSync from 'browser-sync';
import { proxyReload, proxyInit } from './gulp-series';

/**
 * Calls electron on the main process in the 'dist/electron' directory
 */
export function launchElectron() {
  return exec(`electron ${Paths.electron_dest}main`, (err, stdout, stderr) => {
    if (err) {
      throw err;
    }
  });
}

/**
 * This task is only used the HMR Proxy.
 * @param done - Callback function to signal task completion.
 */
export function startHMR(done) {
  const hmrCmd = exec('ng serve --hmr -e=hmr --delete-output-path false');
  hmrCmd.stdout.on('data', data => {
    console.log(String(data));
    if (String(data) === 'webpack: Compiled successfully.\n') {
      proxyReload('HMR', HmrBrowserSyncConfig);
      done();
    }
  });
  hmrCmd.on('error', err => {
    throw err;
  });
}

/**
 * This task generates the angular Compodoc documentation to the 'docs'
 * directory and serves it on default port of 8080.
 * @param done - Callback fruntion to signal task completion.
 */
export function startCompodoc(done) {
  return gulp.src('src/**/*.ts').pipe(
    compodoc({
      port: 8080,
      output: 'docs',
      tsconfig: 'src/tsconfig.json',
      serve: true
    })
  );
}
