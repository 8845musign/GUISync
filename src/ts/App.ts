/// <reference path="../../typings/github-electron/github-electron-renderer.d.ts" />;
/// <reference path="../../typings/bluebird/bluebird.d.ts" />;

// Services
import BrowserSyncService = require('./lib/modules/services/BrowserSyncService');
import SettingModel       = require('./lib/modules/models/SettingModel');
import ConsoleService     = require('./lib/modules/services/consoleService');
import SettingFileService = require('./lib/modules/services/SettingFileService');
// UI
import Dialog             = require('./lib/modules/ui/dialog/dialog');
import Loading            = require('./lib/modules/ui/loading/Loading');

//View
import BtnActionView = require('./lib/modules/views/BtnActionView');

class App {
  private btnStart:HTMLButtonElement;
  private btnInstall:HTMLButtonElement;
  private btnStop:HTMLButtonElement;
  private console:ConsoleService;
  private browserSync:BrowserSyncService;
  
  constructor() {
    this.browserSync = new BrowserSyncService();
  }

  public start() : void {
    var btnActionView = new BtnActionView({
      el:'#btnRun',
      startFunc: function(event) {
        if (this.browserSync.isRunning() === true) return;
        this.createSettingFile();
  
        var start = this.browserSync.start();

        start.on('start', function(data){
          this.console.log(data);
        });
  
        start.on('error', function(data){
          this.console.log(data);
        });
  
        event.emit('started');
      }.bind(this),
      stopFunc: function(event){
        this.browserSync.stop();
        event.emit('stoped');
      }.bind(this),
    });
    this.console    = new ConsoleService('#windowConsole');

    this.checkBrowserSync();
  }

  public checkBrowserSync() {
    BrowserSyncService.isInstelled().then(function(){
      // nothing
    }).catch(function(){
      Dialog.normal({
        text: "BrowserSyncをインストールします",
        buttonText: "OK",
        callback: function() {
          var install = BrowserSyncService.install();
          install.on('install', function(){
            Dialog.normal({ text:'インストール完了しました', buttonText:'OK' });
          });
        }
      });
    });
  }
    
  private onClickStopBtn(e:Event) : void {
    if (this.browserSync.isRunning() === false) return;
    this.browserSync.stop();
    this.btnStart.disabled = false;
    
    e.preventDefault();
  }

  public createSettingFile() : void {
    var user : string = (<HTMLInputElement>document.getElementById('authUser')).value
    var pass : string = (<HTMLInputElement>document.getElementById('authPass')).value;
    var proxyTarget : string = (<HTMLInputElement>document.getElementById('proxyTarget')).value;

    var setting = new SettingModel({
      target: proxyTarget, 
      basicId:user, 
      basicPassword: pass
    });

    SettingFileService.create(setting);
  }
}