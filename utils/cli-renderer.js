// Thanks to @maximegris!!!
// Digs into @angular/cli packaged configuration and replaces the renderer target for electron to allow native module usage.
const angularCliWebpack = './node_modules/@angular-devkit/build-angular/src/angular-cli-files/models/webpack-configs/browser.js';
const fs = require('fs');

fs.readFile(angularCliWebpack, 'utf8', function (err, data) {
  if (err) {
    return console.log(err);
  }
  var res = data.replace(/target: "electron-renderer",/g, '');
  var res = res.replace(/target: "web",/g, '');
  var res = res.replace(/return \{/g, 'return {target: "electron-renderer",');

  fs.writeFile(angularCliWebpack, res, 'utf8', function (err) {
    if (err) return console.log(err);
  });
});

