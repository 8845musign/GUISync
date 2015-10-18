/// <reference path="../../typings/github-electron/github-electron-renderer.d.ts" />;
/// <reference path="../../typings/bluebird/bluebird.d.ts" />;

import browserSyncService = require('./lib/modules/services/BrowserSyncService');
import settingModel       = require('./lib/modules/models/SettingModel');
import consoleService     = require('./lib/modules/services/consoleService');
import settingFileService = require('./lib/modules/services/SettingFileService');
import dialog             = require('./lib/modules/ui/dialog/dialog');
import Loading            = require('./lib/modules/ui/loading/Loading');

class App {
  private btnStart:HTMLButtonElement;
  private btnInstall:HTMLButtonElement;
  private btnStop:HTMLButtonElement;
  private console:consoleService.ConsoleService;
  private browserSync:browserSyncService.BrowserSyncService;
  
  constructor() {
    this.browserSync = new browserSyncService.BrowserSyncService();
  }

  public start() : void {
    this.btnStart   = <HTMLButtonElement>document.getElementById('btnStart');
    this.btnInstall = <HTMLButtonElement>document.getElementById('btnModuleInstall');
    this.btnStop    = <HTMLButtonElement>document.getElementById('btnStop');
    this.console    = new consoleService.ConsoleService('#windowConsole');

    this.bind();
    this.checkBrowserSync();
  }

  public bind() : void {
    this.btnStart.addEventListener('click', this.onClickStartBtn.bind(this));
    this.btnInstall.addEventListener('click', this.onClickInstallBtn.bind(this));
    this.btnStop.addEventListener('click', this.onClickStopBtn.bind(this));
  }
  
  public checkBrowserSync() {
    browserSyncService.BrowserSyncService.isInstelled().then(function(){
      // nothing
    }).catch(function(){
      dialog.Dialog.normal({
        text: "BrowserSyncをインストールします",
        buttonText: "OK",
        callback: function() {
          var install = browserSyncService.BrowserSyncService.install();
          install.on('install', function(){
            dialog.Dialog.normal({ text:'インストール完了しました', buttonText:'OK' });
          });
        }
      });
    });
  }

  private onClickStartBtn(e:Event) : void {
    if (this.browserSync.isRunning() === true) return;

      this.createSettingFile();

      var start = this.browserSync.start();

      start.on('start', function(data){
        this.console.log(data);
      }.bind(this));

      start.on('error', function(data){
        this.console.log(data);
      }.bind(this));

      this.btnStart.disabled = false;
      this.btnStop.disabled = true;

      e.preventDefault();
  }
  
  private onClickInstallBtn(e:Event) : void {
    var install = browserSyncService.BrowserSyncService.install();

    install.on('install', function(data){
      this.console.log(data);
      this.btnInstall.disabled = false;
    }.bind(this));

    install.on('error', function(data){
      this.console.log(data);
      this.btnInstall.disabled = false;
    }.bind(this));
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

    var setting = new settingModel.SettingModel({
      target: proxyTarget, 
      basicId:user, 
      basicPassword: pass
    });

    settingFileService.SettingFileService.create(setting);
  }
}