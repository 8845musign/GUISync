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
import BtnActionView  = require('./lib/modules/views/BtnActionView');
import UrlDisplayView = require('./lib/modules/views/UrlDisplayView');

class App {
  private btnStart:HTMLButtonElement;
  private btnInstall:HTMLButtonElement;
  private btnStop:HTMLButtonElement;
  private console:ConsoleService;
  private browserSync:BrowserSyncService;
  private urlDisplayView:UrlDisplayView;
  
  constructor() {
    this.browserSync = new BrowserSyncService();
    this.console = new ConsoleService('#windowConsole');
  }

  public start() : void {
    this.urlDisplayView = new UrlDisplayView('.dispUrl__text');
    var btnActionView = new BtnActionView({
      selector:'#btnRun',
      startFunc: function(event) {
        if (this.browserSync.isRunning()) return;
        this.createSettingFile();
  
        var start = this.browserSync.start();

        start.on('start', function(data){
          var str = String.fromCharCode.apply(null, data);
          this.console.log(data);
          if (str.indexOf('External') < 0 || str.indexOf('UI') > -1) return;

          var url = BrowserSyncService.getUrlFromStdout(str);
          this.urlDisplayView.setUrl(url);

          event.emit('started');
        }.bind(this));
  
        start.on('error', function(data){
          this.console.log("" + data);
          this.urlDisplayView.clearUrl();

          event.emit('started');
        }.bind(this));
      }.bind(this),
      stopFunc: function(event){
        this.browserSync.stop();
        this.urlDisplayView.clearUrl();

        event.emit('stoped');
      }.bind(this),
    });

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
          BrowserSyncService
            .install()
            .then(function(){
              Dialog.normal({ text:'インストール完了しました', buttonText:'OK' });
            }, function() {});
        }
      });
    });
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