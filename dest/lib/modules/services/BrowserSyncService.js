/// <reference path="../../../../../typings/github-electron/github-electron-renderer.d.ts" />;
var spawn = require('child_process').spawn;
var BrowserSyncService = (function () {
    function BrowserSyncService() {
        this.currentDir = __dirname;
        this.app = [];
        this.app.push(__dirname + "/../../../node_modules/browser-sync/bin/browser-sync.js");
        this.app.push('start');
        this.app.push("--config");
        this.app.push(__dirname + "/../../../bs-config.js");
        this.pid = null;
        return this;
    }
    BrowserSyncService.prototype.start = function () {
        if (this.pid !== null) {
            throw new Error('BrowserSync has been already started.');
        }
        var start = spawn('node', this.app, { cwd: __dirname });
        this.pid = spawn.pid;
        start.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });
        start.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });
    };
    BrowserSyncService.prototype.install = function () {
        var install = spawn('npm', ['install'], { cwd: __dirname });
        install.stdout.on('data', function (data) {
            console.log('stdout: ' + data);
        });
        install.stderr.on('data', function (data) {
            console.log('stderr: ' + data);
        });
    };
    return BrowserSyncService;
})();
exports.BrowserSyncService = BrowserSyncService;
exports = BrowserSyncService;
//# sourceMappingURL=BrowserSyncService.js.map