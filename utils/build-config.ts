
export const Paths = {
  electron_src: './src/electron/**/*.ts',
  electron_dest: './dist/electron/',
  app_src: ['./src/app/**/*.ts', './src/app/**/*.html', './src/app/**/*.css']
};

export const BrowserSyncConfig = {
  open: false,
  ui: false,
  logLevel: 'silent',
  notify: false,
  port: 4200,
  server: {
    baseDir: 'dist'
  }
}
