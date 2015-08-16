/// <reference path="../../../../../typings/github-electron/github-electron-renderer.d.ts" />;

import remote = require('remote');
var spawn = require('child_process').spawn;

export class BrowserSyncService {
  private currentDir:string;
  private app:Array<string>;
  private pid:Number;

  constructor() {
    this.currentDir = __dirname;
    this.app = [];
    this.app.push(__dirname + "/../../../node_modules/browser-sync/bin/browser-sync.js");
    this.app.push('start')
    this.app.push("--config");
    this.app.push( __dirname + "/../../../bs-config.js");

    this.pid        = null;
    
    return this;
  }

  public start() {
    if (this.pid !== null) {
      throw new Error('BrowserSync has been already started.');
    }
    var start = spawn('node', this.app, { cwd: __dirname });
    this.pid = spawn.pid;

    start.stdout.on('data', function(data){
      console.log('stdout: ' + data);
    });

    start.stderr.on('data', function(data){
      console.log('stderr: ' + data);
    });
  }

  public install() {
    var install = spawn('npm', ['install'], { cwd: __dirname });

    install.stdout.on('data', function(data){
      console.log('stdout: ' + data);
    });

    install.stderr.on('data', function(data){
      console.log('stderr: ' + data);
    });
  }
}
exports = BrowserSyncService;