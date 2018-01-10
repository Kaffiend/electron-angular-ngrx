# Electron Angular NGRX

# Table of Contents

- [Getting Started](#getting-started)
- [Mission](#mission)
- [Project Structure](#project-structure)
- [Build Process](#build-process)
    - [Tasks](#tasks)
    - [Build - HMR (development)](#build---hmr-development)
    - [Build - Live Reload (development)](#build---live-reload-development)
    - [Build - One-Shot Launch (development)](#build---one-shot-launch-development)
- [ToDo](#todo)
- [angular/cli](#angularcli)
    - [Running unit tests](#running-unit-tests)
    - [Running end-to-end tests](#running-end-to-end-tests)
    - [Further help](#further-help)

# Getting Started
This project requires Electron and Gulp-CLI.
Typings are installed automatically.
```bash
npm install -g electron
npm install -g gulp-cli
```

# Mission
The mission of this project is to provide a simple quick start seed that works with `@angular/cli` not against it or hacked around ejection of the underlying webpack. This is to hopefully keep this seed's build and development process easy to maintain and build on.

This seed takes a low impact approach to some of the issues plagued by angular electron seeds. This seed currently uses gulp and various, tried and true packages such as `browserlink` to instead proxy the electron window, and the electron process is monitored with nodemon to restart its process on changes during live-reload development workflow.

# Project Structure
```
├── dist                <--Angular Build Artifacts
|  ├── electron         <--Electron Build Artifacts
├── e2e                 <--End-To-End Tests (Protractor)
├── gulpfile.ts         <--Build Entry Point
├── src
|  ├── app              <--Angular App Code
|  ├── assets           <--Images, Fonts, Icons etc.
|  ├── electron         <--Main Electron Process Code
|  ├── environments     <--Dev, Prod, and HMR Environment Files
|  ├── hmr.ts           <--HMR Bootstraping Utility
|  ├── main.ts          <--Angular Entry Point (HMR Logic Included)
├── typings             <--Custom Typings
└── utils               <--Build Process Utilities (See Build Process)
   ├── gulp-config.ts   <--Static Build Configuration
   ├── gulp-parallel.ts <--Parallel Build Utilities
   └── gulp-series.ts   <--Series Build Utilities
```

# Build Process

## Tasks
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
├── start:docs - build and serve compodoc on localhost:8080gulp
├── watch:electron - watcher task for changes on `src/electron`
├── watch:app - watcher task on angular code
├─┬ live-reload - task chain for launching live-reload workflow
│ └─┬ <series> - this group of tasks run in series
│   ├── build:app
│   ├── build:electron
│   ├── live-reload:var
│   └─┬ <parallel> - this group of tasks run in parallel
│     ├── watch:app
│     ├── watch:electron
│     └── serve:live-reload
├─┬ hmr - task chain for launching HMR workflow
│ └─┬ <series> - this group of tasks run in series
│   ├── build:electron
│   ├── hmr:var
│   └─┬ <parallel> this group of tasks run in parallel
│     ├── serve:hmr
│     ├── watch:electron
│     └── serve:electron-hmr
└─┬ launch - task chain for launching single run with no proxy.
  └─┬ <series> - this group of tasks run in series
    ├── build:app
    ├── build:electron
    ├── launch:var
    └── launch:electron
```
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

# ToDo
- [x] Integrate HMR (Hot Module Relplacement) workflow.
- [ ] Clean up tasks in a uniform manner and self-documenting.
- [ ] Integrate simple NGRX with HMR.
- [ ] Electron packaging.
- [ ] Integrate developement extensions redux, devtron.
- [x] Add Compodoc.
- [ ] Add contribution guidelines.

# angular/cli 
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.3.


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
