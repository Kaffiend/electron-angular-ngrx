/**
 * Main gulpfile entry point for gulpclass.
 */
// this transpiles and runs your tasks for gulpclass in a way gulp can read the task names.
//its just a pass through for the TS files.
eval(require("typescript").transpile(require("fs").readFileSync(".tasks/gulpclass.ts").toString()));
