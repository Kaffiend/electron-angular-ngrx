# ElectronAngularNgrx
# Mission
The mission of this project is to provide a simple quick start seed that works with `@angular/cli` not against it or hacked around ejection of the underlying webpack. This is to hopefully keep this seed's build and development process easy to maintain and build on.

I've taken an alternative approach to some of the issues plagued by angular electron seeds. Most of these use projects like `electron-reload`, `electron-connect` or eject 
the underlying webpack from the cli to integrate the `webpack-dev-server`. This seed currently uses gulp and various tried and true packages such as `browserlink` to instead proxy the electron window, and the electron process is monitored with nodemon to restart its process on changes during live-reload development workflow.

This project requires Electron.
Typings are installed automatically.
```bash
npm install -g electron
```

# Tasks - Build Process
```
├── build:electron - builds `src/electron` => `dist/electron`
├── build:app - calls `ng build` on angular app => `dist/`
├── launch:var - sets required environment variable for non-proxyed electron window url
├── launch:electron - launches electron process on `dist/electron`
├── rebuild:app - called by watcher to rebuild angular code.
├── serve:live-reload - proxy electron window url with browserlink for live reload
├── live-reload:var - sets required environment variable for proxyed electron window url.
├── hmr:var - sets required environment variable for proxyed electron window with hmr.
├── serve:hmr - calls `ng serve -hmr -e=hmr` to be proxyed by browserlink
├── serve:electron-hmr proxy electron window with browserlink for hmr binding.
├── watch:electron - watcher task for changes on `src/electron`
├── watch:app - watcher task on angular code
├─┬ live-reload - task chain for launching live-reload workflow
│ └─┬ <series>
│   ├── build:app
│   ├── build:electron
│   ├── live-reload:var
│   └─┬ <parallel>
│     ├── watch:app
│     ├── watch:electron
│     └── serve:live-reload
├─┬ hmr - task chain for launching hrm workflow
│ └─┬ <series>
│   ├── build:electron
│   ├── hmr:var
│   └─┬ <parallel>
│     ├── serve:hmr
│     ├── watch:electron
│     └── serve:electron-hmr
└─┬ electron:launch - task chain for launching single run with no proxy.
  └─┬ <series>
    ├── build:app
    ├── build:electron
    ├── launch:var
    └── launch:electron
```
# angular/cli 
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.3.

## Build - HMR (development)
Run `npm start` (default script) or `gulp hmr` to build,  and launch and non-proxyed build with HMR. 

## Build - Live Reload (development)

Run `npm run live-reload` or `gulp live-reload` to build, launch and proxy live reloads. 
The angular build artifacts will be stored in the `dist/` directory.
The electron build artifacts will be stored in the `dist/electron` directory.
The Electron main process will be restarted automatically if the electron code changes.
The Render Process will utlize live reloads to reload changes on save on angular code.

## Build - One-Shot Launch (development)
Run `npm run launch` or `gulp electron:launch` to build,  and launch and non-proxyed build. 
The angular build artifacts will be stored in the `dist/` directory.
The electron build artifacts will be stored in the `dist/electron` directory.


## ToDo
- [x] Integrate HMR (Hot Module Relplacement) workflow.
- [ ] Integrate simple NGRX with HMR.
- [ ] Electron packaging.
- [ ] Integrate developement extensions redux, devtron.
- [ ] Add Compodoc.
- [ ] Add contribution guidelines.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
