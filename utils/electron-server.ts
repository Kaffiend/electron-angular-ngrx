import * as electronConn from 'electron-connect';
import * as path from 'path';

export const electron = electronConn.server.create({
    path: path.join(process.cwd(), 'dist', 'electron', 'main.js'),
    // logLevel: 2
});
