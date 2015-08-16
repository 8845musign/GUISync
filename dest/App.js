/// <reference path="../../typings/github-electron/github-electron-renderer.d.ts" />;
var browserSyncService = require('./lib/modules/services/BrowserSyncService');
var settingModel = require('./lib/modules/models/SettingModel');
var settingFileService = require('./lib/modules/services/SettingFileService');
var App = (function () {
    function App() {
    }
    App.prototype.start = function () {
        this.btnModuleInstall = document.getElementById('btnModuleInstall');
        this.bind();
    };
    App.prototype.bind = function () {
        this.btnModuleInstall.addEventListener('click', this.onClickStartBtn.bind(this));
    };
    App.prototype.onClickStartBtn = function (e) {
        this.createSettingFile();
        var browserSync = new browserSyncService.BrowserSyncService();
        browserSync.start();
        e.preventDefault();
    };
    App.prototype.createSettingFile = function () {
        var user = document.getElementById('authUser').value;
        var pass = document.getElementById('authPass').value;
        var proxyTarget = document.getElementById('proxyTarget').value;
        var setting = new settingModel.SettingModel({
            target: proxyTarget,
            basicId: user,
            basicPassword: pass
        });
        settingFileService.SettingFileService.create(setting);
    };
    return App;
})();
//# sourceMappingURL=App.js.map