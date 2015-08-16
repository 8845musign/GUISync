var ConsoleService = (function () {
    function ConsoleService(selector) {
        this.el = document.querySelector(selector);
    }
    ConsoleService.prototype.log = function (log) {
        return this.el.innerText = this.el.innerText + log;
    };
    return ConsoleService;
})();
exports.ConsoleService = ConsoleService;
exports = ConsoleService;
//# sourceMappingURL=ConsoleService.js.map