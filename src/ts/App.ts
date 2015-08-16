/// <reference path="../../typings/github-electron/github-electron-renderer.d.ts" />;

import browserSyncService = require('./lib/modules/services/BrowserSyncService');
import settingModel       = require('./lib/modules/models/SettingModel');
import settingFileService = require('./lib/modules/services/SettingFileService');

class App {
  private btnStart:Element;

  public start() : void {
    this.btnStart = document.getElementById('btnStart');

    this.bind();
  }

  public bind() : void {
    this.btnStart.addEventListener('click', this.onClickStartBtn.bind(this));
  }

  private onClickStartBtn(e:Event) : void {
      this.createSettingFile();

      var browserSync = new browserSyncService.BrowserSyncService();
      browserSync.start();

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