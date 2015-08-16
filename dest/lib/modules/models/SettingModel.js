var SettingModel = (function () {
    function SettingModel(options) {
        this.target = options.target;
        this.basicId = options.basicId;
        this.basicPassword = options.basicPassword;
    }
    SettingModel.prototype.encodedIdAndPass = function () {
        if (!this.basicId || !this.basicPassword) {
            throw new Error('no set ID or Password');
        }
        return btoa(this.basicId + ":" + this.basicPassword);
    };
    SettingModel.prototype.getSettingString = function () {
        return "\nmodule.exports = {\n    proxy: {\n        target: \"" + this.target + "\",\n        middleware: function (req, res, next) {\n            req.headers.authorization = \"Basic " + this.encodedIdAndPass() + "\";\n            next();\n        }\n    }\n};\n";
    };
    return SettingModel;
})();
exports.SettingModel = SettingModel;
exports = SettingModel;
//# sourceMappingURL=SettingModel.js.map