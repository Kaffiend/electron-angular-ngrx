# Electron Angular NGRX
[![Dependency Status](https://david-dm.org/kaffiend/electron-angular-ngrx.svg)](https://david-dm.org/kaffiend/electron-angular-ngrx.svg)
[![devDependency Status](https://david-dm.org/kaffiend/electron-angular-ngrx/dev-status.svg)](https://david-dm.org/kaffiend/electron-angular-ngrx.svg#info=devDependencies)
[![GitHub license](https://img.shields.io/github/license/Kaffiend/electron-angular-ngrx.svg)](https://github.com/Kaffiend/electron-angular-ngrx/blob/master/LICENSE)

# Mission
The mission of this project is to provide a simple quick start seed that works with `@angular/cli` not against it or hacked around ejection of the underlying webpack. This is to hopefully keep this seed's build and development process easy to maintain and build on.

This seed takes a low impact approach to some of the issues plagued by angular electron seeds. This seed currently uses gulp and various, tried and true packages such as `browserlink` to instead proxy the electron window, and the electron process is monitored with nodemon to restart its process on changes during live-reload, and HMR development workflow.

# Table of Contents

- [Getting Started](#getting-started)
- [Mission](#mission)
- [Project Structure](#project-structure)
- [Build Process](#build-process)
    - [Build - HMR (development)](#build---hmr-development)
    - [Build - Live Reload (development)](#build---live-reload-development)
    - [Build - One-Shot Launch (development)](#build---one-shot-launch-development)
    - [Tasks](#tasks)
- [ToDo](#todo)
- [angular/cli](#angularcli)
    - [Running unit tests](#running-unit-tests)
    - [Running end-to-end tests](#running-end-to-end-tests)
    - [Further help](#further-help)

# Getting Started
  - This project requires Electron, Gulp, and Angular CLI.
  - See [angular/cli](#angularcli) for CLI version. 
  - Typings are installed automatically.
```bash
npm install -g @angular/cli
npm install -g electron
npm install -g gulp@next
npm install
```
`npm start` is the default task that launchs the HMR development workflow.

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


## Build - HMR (development)
Run `npm start` (default script) or `gulp hmr` to build,  and launch the HMR Workflow. 

## Build - Live Reload (development)

Run `npm run live-reload` or `gulp live-reload` to build, launch and proxy live reloads. 
The angular build artifacts will be stored in the `dist/` directory.
The electron build artifacts will be stored in the `dist/electron` directory.
The Electron main process will be restarted automatically if the electron code changes.
The Render Process will utilize live reloads to reload changes on save for angular code.

## Build - One-Shot Launch (development)
Run `npm run launch` or `gulp electron:launch` to build,  and launch non-proxyed static build. 
The angular build artifacts will be stored in the `dist/` directory.
The electron build artifacts will be stored in the `dist/electron` directory.

## Tasks
```
 ├── build:electron      <Series>: Compiles Electron code to 'dist/electron'.
 ├── build:app           <Series>: Builds the Angular code via CLI.
 ├── launch:var          <Series>: Sets Environment Variable for relative proxy in Electron main window.
 ├── launch:electron     <Paralell>: Launches Electron and pipes STDOUT from main process.
 ├── rebuild:app         <Series>: Rebuilds the angular app output to 'dist' directory
 ├── serve:live-reload   <Paralell>: Serves Electron via nodemon and proxy browser-sync.
 ├── live-reload:var     <Series>: Sets Environment Variable for relative proxy in Electron main window.
 ├── hmr:var             <Series>: Sets Environment Variable for relative proxy in Electron main window.
 ├── serve:hmr           <Parallel>: Spins up the CLI HMR service
 ├── serve:electron-hmr  <Paralell>: Serves Electron via nodemon and proxy CLI HMR service.
 ├── start:docs          <Paralell>: Generates Compodoc documentation and serves it up.
 ├── watch:electron
 ├── watch:app
 ├─┬ live-reload
 │ └─┬ <series>
 │   ├── build:app
 │   ├── build:electron
 │   ├── live-reload:var
 │   └─┬ <parallel>
 │     ├── watch:electron
 │     ├── watch:app
 │     └── serve:live-reload
 ├─┬ hmr
 │ └─┬ <series>
 │   ├── build:electron
 │   ├── hmr:var
 │   └─┬ <parallel>
 │     ├── serve:hmr
 │     └── watch:electron
 └─┬ default
   └─┬ <series>
     ├── build:app
     ├── build:electron
     ├── launch:var
     └── launch:electron
```

# ToDo
- [x] Integrate HMR (Hot Module Relplacement) workflow.
- [x] Clean up tasks in a uniform manner and self-documenting.
- [ ] Integrate simple NGRX with HMR.
- [ ] Electron packaging.
- [ ] Integrate developement extensions redux, devtron.
- [x] Add Compodoc.
- [ ] Add contribution guidelines.
- [ ] Add Conventional Changelog.

# angular/cli 
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.3.


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
