/// <reference path="../../../../../typings/github-electron/github-electron-renderer.d.ts" />;
var fs = require('fs');
var SettingFileService = (function () {
    function SettingFileService() {
        this.SETTING_FILE_PATH = "./bs-config.js";
    }
    SettingFileService.create = function (model) {
        var content = model.getSettingString();
        return fs.writeFile('bs-config.js', content);
    };
    return SettingFileService;
})();
exports.SettingFileService = SettingFileService;
exports = SettingFileService;
//# sourceMappingURL=SettingFileService.js.map