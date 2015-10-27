/// <reference path="../../../../../typings/github-electron/github-electron-renderer.d.ts" />;
/// <reference path="../../../../../typings/bluebird/bluebird.d.ts" />;

import remote = require('remote');
import Events = require('events');
import EventEmitter = Events.EventEmitter;
import Promise = require('bluebird');
var spawn   = require('child_process').spawn;

class BrowserSyncService {
  private currentDir:string;
  private app:Array<string>;
  private pid:Number;
  private child:any; // cli child process
  private env:Object;

  constructor() {
    this.currentDir = __dirname;
    this.app = [];
    this.app.push(Const.PATH_TO_BROWSER_SYNC);
    this.app.push('start')
    this.app.push("--config");
    this.app.push(__dirname + "/../../../../bs-config.js");
    this.env = Object.create( process.env );

    console.log(__dirname + "/../../../node_modules/browser-sync/bin/browser-sync.js");

    this.child = null;
    
    return this;
  }
  
  public isRunning() : boolean {
    return (this.child) ? true : false;
  }

  public start() : EventEmitter {
    if (this.child !== null) {
      throw new Error('BrowserSync has been already started.');
    }

    this.child = spawn('node', this.app, { cwd: __dirname });
    this.pid = spawn.pid;

    var event = new EventEmitter();

    this.child.stdout.on('data', function(data){
      console.log('stdout: ' + data);
      event.emit('start', data);
    });

    this.child.stderr.on('data', function(data){
      console.log('stderr: ' + data);
      event.emit('error', data);
    });
    
    return event;
  }

  public stop() : void {
   this.child.kill();
   this.child = null;
  }

  public static install() : Promise<any> {
    console.log("dir", __dirname);
    var install = spawn('npm', ['install', '--save-dev', 'browser-sync'], { cwd: __dirname });
    var event = new EventEmitter();

    return new Promise(function(resolve, reject){
      install.stdout.on('data', function(data){
        console.log('stdout: ' + data);
      });
  
      install.stderr.on('data', function(data){
        console.log('stderr: ' + data);
      });
  
      install.on('error', function(data){
        console.log('error: ' + data);
      });
  
      install.on('exit', function(data){
        resolve(data);
      });
    });

  }
  
  public static isInstelled() :Promise<any> {

    return new Promise(function(resolve, reject){
      var version = spawn([Const.PATH_TO_BROWSER_SYNC, '--version']);

      version.stdout.on('data', function(data){
        resolve(data);
      });

      version.stderr.on('data', function(data){
        reject(data);
      });
  
      version.on('error', function(data){
        reject(data);
      });
    });
    
  }
  
  public static getUrlFromStdout(stdOut:string) :string {
    var reg = new RegExp('https?://[\w/:%#\$&\?\(\)~\.=\+\-]+');
    var matches = stdOut.match(reg);

    if (matches[0]) {
      return matches[0];
    }
    return '';
  }
}
export = BrowserSyncService;

module Const {
    export const PATH_TO_BROWSER_SYNC = __dirname + "/../../../node_modules/browser-sync/bin/browser-sync.js";
}