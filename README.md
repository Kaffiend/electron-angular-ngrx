# Electron Angular NGRX
[![Dependency Status](https://david-dm.org/kaffiend/electron-angular-ngrx.svg)](https://david-dm.org/kaffiend/electron-angular-ngrx)
[![devDependency Status](https://david-dm.org/kaffiend/electron-angular-ngrx/dev-status.svg)](https://david-dm.org/kaffiend/electron-angular-ngrx#info=devDependencies)
[![GitHub license](https://img.shields.io/github/license/Kaffiend/electron-angular-ngrx.svg)](https://github.com/Kaffiend/electron-angular-ngrx/blob/master/LICENSE)

# Mission
- The mission of this project is to provide a simple to use quick start seed that works with `@angular/cli`. This is to keep this seed's build and development process easy to maintain and build on.
- Embracing `@angular/cli` and `@ngrx/platform` to it's fullest, including [@ngrx/schematics](https://github.com/ngrx/platform/issues/674) for the CLI. `@ngrx/schematics` is not released yet, but we will keep up with the nightly builds as it progresses towards release as some of its features make developing in the platform extremly efficient.
-  This seed takes a low impact approach to some of the issues plagued by angular electron seeds. This seed uses minimal approach to instead proxy the electron window, instead of reloading through services such as electron-connect.
All building and serving is still done by the CLI. We just proxy the connection to the CLI services via scripting. All STDOUT output from the CLI during tasks is passed through to your process so you can still see it working in the background.
- We will make an unrelenting effort to keep this seed up to date. We use it internally for own projects and thus keeping everything upto date is paramount. This seed will stay paralell with our own private servers on the 'master' branch.
- Gulp has been removed for simplicity and performance.

# Table of Contents
- [Electron Angular NGRX](#electron-angular-ngrx)
- [Mission](#mission)
- [Table of Contents](#table-of-contents)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)
- [Build Process](#build-process)
  - [Build - HMR (development)](#build---hmr-development)
- [Contributing](#contributing)
- [ToDo](#todo)
- [angular/cli](#angularcli)
  - [Running unit tests](#running-unit-tests)
  - [Running end-to-end tests](#running-end-to-end-tests)
  - [Further help](#further-help)

# Getting Started
  - This project requires Electron, Gulp, and Angular CLI.
  - See [angular/cli](#angularcli) for CLI version. 

```bash
npm install -g @angular/cli
npm install -g electron
npm install
```
`npm start` is the default task that launchs the HMR development workflow.

# Project Structure
```
├── dist                <--Angular Build Artifacts
|  ├── electron         <--Electron Build Artifacts
├── e2e                 <--End-To-End Tests (Protractor)
├── src
|  ├── app              <--Angular App Code
|  ├── assets           <--Images, Fonts, Icons etc.
|  ├── electron         <--Main Electron Process Code
|  ├── environments     <--Dev, Prod, and HMR Environment Files
|  ├── hmr.ts           <--HMR Bootstraping Utility
|  ├── main.ts          <--Angular Entry Point (HMR Logic Included)
├── typings             <--Custom Typings
```

# Build Process


## Build - HMR (development)
Run `npm start` (default script) or `gulp hmr` to build,  and launch the HMR Workflow. 


# Contributing
Pleaes review the [CONTRIBUTING](https://github.com/Kaffiend/electron-angular-ngrx/blob/master/CONTRIBUTING.md) guidlines.

# ToDo
- [x] Integrate HMR (Hot Module Relplacement) workflow.
- [x] Clean up tasks in a uniform manner and self-documenting.
- [x] Integrate simple NGRX with HMR.
- [ ] Electron packaging.
- [x] Integrate developement extensions redux, devtron.
- [x] Add Compodoc.
- [x] Native Module Support.
- [x] Add contribution guidelines.
- [ ] Add Conventional Changelog.
- [ ] Wiki for adding [@angular/material](https://github.com/angular/material).
- [ ] Wiki for adding [Bootstrap](https://github.com/twbs/bootstrap).
- [ ] Wiki for local [FontAwesome](https://github.com/FortAwesome/Font-Awesome) for packaging.

# angular/cli 
This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 1.6.3.


## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).
