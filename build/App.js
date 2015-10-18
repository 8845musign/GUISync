/// <reference path="../../typings/github-electron/github-electron-renderer.d.ts" />;
var browserSyncService = require('./lib/modules/services/BrowserSyncService');
var settingModel = require('./lib/modules/models/SettingModel');
var consoleService = require('./lib/modules/services/consoleService');
var settingFileService = require('./lib/modules/services/SettingFileService');
var dialog = require('./lib/modules/ui/dialog/dialog');
var App = (function () {
    function App() {
        this.browserSync = new browserSyncService.BrowserSyncService();
    }
    App.prototype.start = function () {
        dialog.Dialog.normal({ text: "テキストだよ", buttonText: "hoge" });
        this.btnStart = document.getElementById('btnStart');
        this.btnInstall = document.getElementById('btnModuleInstall');
        this.btnStop = document.getElementById('btnStop');
        this.console = new consoleService.ConsoleService('#windowConsole');
        //    this.btnStop.disabled = true;
        this.bind();
    };
    App.prototype.bind = function () {
        this.btnStart.addEventListener('click', this.onClickStartBtn.bind(this));
        this.btnInstall.addEventListener('click', this.onClickInstallBtn.bind(this));
        this.btnStop.addEventListener('click', this.onClickStopBtn.bind(this));
    };
    App.prototype.onClickStartBtn = function (e) {
        if (this.browserSync.isRunning() === true)
            return;
        this.createSettingFile();
        var start = this.browserSync.start();
        start.on('start', function (data) {
            this.console.log(data);
        }.bind(this));
        start.on('error', function (data) {
            this.console.log(data);
        }.bind(this));
        this.btnStart.disabled = false;
        this.btnStop.disabled = true;
        e.preventDefault();
    };
    App.prototype.onClickInstallBtn = function (e) {
        var install = browserSyncService.BrowserSyncService.install();
        install.on('install', function (data) {
            this.console.log(data);
            this.btnInstall.disabled = false;
        }.bind(this));
        install.on('error', function (data) {
            this.console.log(data);
            this.btnInstall.disabled = false;
        }.bind(this));
    };
    App.prototype.onClickStopBtn = function (e) {
        if (this.browserSync.isRunning() === false)
            return;
        this.browserSync.stop();
        this.btnStart.disabled = false;
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

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIkFwcC50cyJdLCJuYW1lcyI6WyJBcHAiLCJBcHAuY29uc3RydWN0b3IiLCJBcHAuc3RhcnQiLCJBcHAuYmluZCIsIkFwcC5vbkNsaWNrU3RhcnRCdG4iLCJBcHAub25DbGlja0luc3RhbGxCdG4iLCJBcHAub25DbGlja1N0b3BCdG4iLCJBcHAuY3JlYXRlU2V0dGluZ0ZpbGUiXSwibWFwcGluZ3MiOiJBQUFBLHFGQUFxRjtBQUVyRixJQUFPLGtCQUFrQixXQUFXLDJDQUEyQyxDQUFDLENBQUM7QUFDakYsSUFBTyxZQUFZLFdBQWlCLG1DQUFtQyxDQUFDLENBQUM7QUFDekUsSUFBTyxjQUFjLFdBQWUsdUNBQXVDLENBQUMsQ0FBQztBQUM3RSxJQUFPLGtCQUFrQixXQUFXLDJDQUEyQyxDQUFDLENBQUM7QUFDakYsSUFBTyxNQUFNLFdBQXVCLGdDQUFnQyxDQUFDLENBQUM7QUFFdEU7SUFPRUE7UUFDRUMsSUFBSUEsQ0FBQ0EsV0FBV0EsR0FBR0EsSUFBSUEsa0JBQWtCQSxDQUFDQSxrQkFBa0JBLEVBQUVBLENBQUNBO0lBQ2pFQSxDQUFDQTtJQUVNRCxtQkFBS0EsR0FBWkE7UUFDRUUsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsRUFBRUEsSUFBSUEsRUFBRUEsUUFBUUEsRUFBRUEsVUFBVUEsRUFBRUEsTUFBTUEsRUFBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDNURBLElBQUlBLENBQUNBLFFBQVFBLEdBQXdCQSxRQUFRQSxDQUFDQSxjQUFjQSxDQUFDQSxVQUFVQSxDQUFDQSxDQUFDQTtRQUN6RUEsSUFBSUEsQ0FBQ0EsVUFBVUEsR0FBc0JBLFFBQVFBLENBQUNBLGNBQWNBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsQ0FBQ0E7UUFDakZBLElBQUlBLENBQUNBLE9BQU9BLEdBQXlCQSxRQUFRQSxDQUFDQSxjQUFjQSxDQUFDQSxTQUFTQSxDQUFDQSxDQUFDQTtRQUN4RUEsSUFBSUEsQ0FBQ0EsT0FBT0EsR0FBTUEsSUFBSUEsY0FBY0EsQ0FBQ0EsY0FB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QVNBLEVBQUVBLEtBQUtBLEtBQUtBLENBQUNBO1lBQUNBLE1BQU1BLENBQUNBO1FBQ25EQSxJQUFJQSxDQUFDQSxXQUFXQSxDQUFDQSxJQUFJQSxFQUFFQSxDQUFDQTtRQUN4QkEsSUFBSUEsQ0FBQ0EsUUFBUUEsQ0FBQ0EsUUFBUUEsR0FBR0EsS0FBS0EsQ0FBQ0E7UUFFL0JBLENBQUNBLENBQUNBLGNBQWNBLEVBQUVBLENBQUNBO0lBQ3JCQSxDQUFDQTtJQUVNTiwrQkFBaUJBLEdBQXhCQTtRQUNFTyxJQUFJQSxJQUFJQSxHQUErQkEsUUFBUUEsQ0FBQ0EsY0FBY0EsQ0FBQ0EsVUFBVUEsQ0FBRUEsQ0FBQ0EsS0FBS0EsQ0FBQUE7UUFDakZBLElBQUlBLElBQUlBLEdBQStCQSxRQUFRQSxDQUFDQSxjQUFjQSxDQUFDQSxVQUFVQSxDQUFFQSxDQUFDQSxLQUFLQSxDQUFDQTtRQUNsRkEsSUFBSUEsV0FBV0EsR0FBK0JBLFFBQVFBLENBQUNBLGNBQWNBLENBQUNBLGFBQWFBLENBQUVBLENBQUNBLEtBQUtBLENBQUNBO1FBRTVGQSxJQUFJQSxPQUFPQSxHQUFHQSxJQUFJQSxZQUFZQSxDQUFDQSxZQUFZQSxDQUFDQTtZQUMxQ0EsTUFBTUEsRUFBRUEsV0FBV0E7WUFDbkJBLE9BQU9BLEVBQUNBLElBQUlBO1lBQ1pBLGFBQWFBLEVBQUVBLElBQUlBO1NBQ3BCQSxDQUFDQSxDQUFDQTtRQUVIQSxrQkFBa0JBLENBQUNBLGtCQUFrQkEsQ0FBQ0EsTUFBTUEsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7SUFDeERBLENBQUNBO0lBQ0hQLFVBQUNBO0FBQURBLENBdEZBLEFBc0ZDQSxJQUFBIiwiZmlsZSI6IkFwcC5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi90eXBpbmdzL2dpdGh1Yi1lbGVjdHJvbi9naXRodWItZWxlY3Ryb24tcmVuZGVyZXIuZC50c1wiIC8+O1xuXG5pbXBvcnQgYnJvd3NlclN5bmNTZXJ2aWNlID0gcmVxdWlyZSgnLi9saWIvbW9kdWxlcy9zZXJ2aWNlcy9Ccm93c2VyU3luY1NlcnZpY2UnKTtcbmltcG9ydCBzZXR0aW5nTW9kZWwgICAgICAgPSByZXF1aXJlKCcuL2xpYi9tb2R1bGVzL21vZGVscy9TZXR0aW5nTW9kZWwnKTtcbmltcG9ydCBjb25zb2xlU2VydmljZSAgICAgPSByZXF1aXJlKCcuL2xpYi9tb2R1bGVzL3NlcnZpY2VzL2NvbnNvbGVTZXJ2aWNlJyk7XG5pbXBvcnQgc2V0dGluZ0ZpbGVTZXJ2aWNlID0gcmVxdWlyZSgnLi9saWIvbW9kdWxlcy9zZXJ2aWNlcy9TZXR0aW5nRmlsZVNlcnZpY2UnKTtcbmltcG9ydCBkaWFsb2cgICAgICAgICAgICAgPSByZXF1aXJlKCcuL2xpYi9tb2R1bGVzL3VpL2RpYWxvZy9kaWFsb2cnKTtcblxuY2xhc3MgQXBwIHtcbiAgcHJpdmF0ZSBidG5TdGFydDpIVE1MQnV0dG9uRWxlbWVudDtcbiAgcHJpdmF0ZSBidG5JbnN0YWxsOkhUTUxCdXR0b25FbGVtZW50O1xuICBwcml2YXRlIGJ0blN0b3A6SFRNTEJ1dHRvbkVsZW1lbnQ7XG4gIHByaXZhdGUgY29uc29sZTpjb25zb2xlU2VydmljZS5Db25zb2xlU2VydmljZTtcbiAgcHJpdmF0ZSBicm93c2VyU3luYzpicm93c2VyU3luY1NlcnZpY2UuQnJvd3NlclN5bmNTZXJ2aWNlO1xuICBcbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5icm93c2VyU3luYyA9IG5ldyBicm93c2VyU3luY1NlcnZpY2UuQnJvd3NlclN5bmNTZXJ2aWNlKCk7XG4gIH1cblxuICBwdWJsaWMgc3RhcnQoKSA6IHZvaWQge1xuICAgIGRpYWxvZy5EaWFsb2cubm9ybWFsKHsgdGV4dDogXCLjg4bjgq3jgrnjg4jjgaDjgohcIiwgYnV0dG9uVGV4dDogXCJob2dlXCJ9KTtcbiAgICB0aGlzLmJ0blN0YXJ0ICAgPSA8SFRNTEJ1dHRvbkVsZW1lbnQ+ZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2J0blN0YXJ0Jyk7XG4gICAgdGhpcy5idG5JbnN0YWxsID0gPEhUTUxCdXR0b25FbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5Nb2R1bGVJbnN0YWxsJyk7XG4gICAgdGhpcy5idG5TdG9wICAgID0gPEhUTUxCdXR0b25FbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdidG5TdG9wJyk7XG4gICAgdGhpcy5jb25zb2xlICAgID0gbmV3IGNvbnNvbGVTZXJ2aWNlLkNvbnNvbGVTZXJ2aWNlKCcjd2luZG93Q29uc29sZScpO1xuXG4vLyAgICB0aGlzLmJ0blN0b3AuZGlzYWJsZWQgPSB0cnVlO1xuXG4gICAgdGhpcy5iaW5kKCk7XG4gICAgXG4gIH1cblxuICBwdWJsaWMgYmluZCgpIDogdm9pZCB7XG4gICAgdGhpcy5idG5TdGFydC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGlja1N0YXJ0QnRuLmJpbmQodGhpcykpO1xuICAgIHRoaXMuYnRuSW5zdGFsbC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIHRoaXMub25DbGlja0luc3RhbGxCdG4uYmluZCh0aGlzKSk7XG4gICAgdGhpcy5idG5TdG9wLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgdGhpcy5vbkNsaWNrU3RvcEJ0bi5iaW5kKHRoaXMpKTtcbiAgfVxuXG4gIHByaXZhdGUgb25DbGlja1N0YXJ0QnRuKGU6RXZlbnQpIDogdm9pZCB7XG4gICAgaWYgKHRoaXMuYnJvd3NlclN5bmMuaXNSdW5uaW5nKCkgPT09IHRydWUpIHJldHVybjtcblxuICAgICAgdGhpcy5jcmVhdGVTZXR0aW5nRmlsZSgpO1xuXG4gICAgICB2YXIgc3RhcnQgPSB0aGlzLmJyb3dzZXJTeW5jLnN0YXJ0KCk7XG5cbiAgICAgIHN0YXJ0Lm9uKCdzdGFydCcsIGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgICB0aGlzLmNvbnNvbGUubG9nKGRhdGEpO1xuICAgICAgfS5iaW5kKHRoaXMpKTtcblxuICAgICAgc3RhcnQub24oJ2Vycm9yJywgZnVuY3Rpb24oZGF0YSl7XG4gICAgICAgIHRoaXMuY29uc29sZS5sb2coZGF0YSk7XG4gICAgICB9LmJpbmQodGhpcykpO1xuXG4gICAgICB0aGlzLmJ0blN0YXJ0LmRpc2FibGVkID0gZmFsc2U7XG4gICAgICB0aGlzLmJ0blN0b3AuZGlzYWJsZWQgPSB0cnVlO1xuICAgICAgXG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgXG4gIHByaXZhdGUgb25DbGlja0luc3RhbGxCdG4oZTpFdmVudCkgOiB2b2lkIHtcbiAgICB2YXIgaW5zdGFsbCA9IGJyb3dzZXJTeW5jU2VydmljZS5Ccm93c2VyU3luY1NlcnZpY2UuaW5zdGFsbCgpO1xuXG4gICAgaW5zdGFsbC5vbignaW5zdGFsbCcsIGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgdGhpcy5jb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIHRoaXMuYnRuSW5zdGFsbC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH0uYmluZCh0aGlzKSk7XG5cbiAgICBpbnN0YWxsLm9uKCdlcnJvcicsIGZ1bmN0aW9uKGRhdGEpe1xuICAgICAgdGhpcy5jb25zb2xlLmxvZyhkYXRhKTtcbiAgICAgIHRoaXMuYnRuSW5zdGFsbC5kaXNhYmxlZCA9IGZhbHNlO1xuICAgIH0uYmluZCh0aGlzKSk7XG4gIH1cbiAgXG4gIHByaXZhdGUgb25DbGlja1N0b3BCdG4oZTpFdmVudCkgOiB2b2lkIHtcbiAgICBpZiAodGhpcy5icm93c2VyU3luYy5pc1J1bm5pbmcoKSA9PT0gZmFsc2UpIHJldHVybjtcbiAgICB0aGlzLmJyb3dzZXJTeW5jLnN0b3AoKTtcbiAgICB0aGlzLmJ0blN0YXJ0LmRpc2FibGVkID0gZmFsc2U7XG4gICAgXG4gICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZVNldHRpbmdGaWxlKCkgOiB2b2lkIHtcbiAgICB2YXIgdXNlciA6IHN0cmluZyA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXV0aFVzZXInKSkudmFsdWVcbiAgICB2YXIgcGFzcyA6IHN0cmluZyA9ICg8SFRNTElucHV0RWxlbWVudD5kb2N1bWVudC5nZXRFbGVtZW50QnlJZCgnYXV0aFBhc3MnKSkudmFsdWU7XG4gICAgdmFyIHByb3h5VGFyZ2V0IDogc3RyaW5nID0gKDxIVE1MSW5wdXRFbGVtZW50PmRvY3VtZW50LmdldEVsZW1lbnRCeUlkKCdwcm94eVRhcmdldCcpKS52YWx1ZTtcblxuICAgIHZhciBzZXR0aW5nID0gbmV3IHNldHRpbmdNb2RlbC5TZXR0aW5nTW9kZWwoe1xuICAgICAgdGFyZ2V0OiBwcm94eVRhcmdldCwgXG4gICAgICBiYXNpY0lkOnVzZXIsIFxuICAgICAgYmFzaWNQYXNzd29yZDogcGFzc1xuICAgIH0pO1xuXG4gICAgc2V0dGluZ0ZpbGVTZXJ2aWNlLlNldHRpbmdGaWxlU2VydmljZS5jcmVhdGUoc2V0dGluZyk7XG4gIH1cbn0iXSwic291cmNlUm9vdCI6Ii9zb3VyY2UvIn0=