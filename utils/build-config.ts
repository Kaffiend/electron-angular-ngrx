
/**
 * Application paths used for gulp plugins.
 */
export const Paths = {
  electron_src: './src/electron/**/*.ts',
  electron_dest: './dist/electron/',
  app_src: ['./src/app/**/*.ts', './src/app/**/*.html', './src/app/**/*.css']
};

/**
 * Live-Reload configuration for electron window proxy.
 */
export const BrowserSyncConfig = {
  open: false,
  ui: false,
  logLevel: 'silent',
  notify: false,
  port: 4200,
  server: {
    baseDir: 'dist'
  }
};

export const HmrBrowserSyncConfig = {
  open: false,
  ui: false,
  logLevel: 'silent',
  notify: false,
  port: 4201,
  proxy: {
    target: 'http://localhost:4200'
  }
};

