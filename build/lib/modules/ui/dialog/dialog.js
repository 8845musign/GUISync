/// <reference path="../../../../../../typings/github-electron/github-electron-renderer.d.ts" />;
var Dialog = (function () {
    function Dialog() {
    }
    Dialog.normal = function (opt) {
        var buttonText = opt.buttonText || "OK";
        this.showOverlay();
        var el = this.buildDialog(opt.text, buttonText);
        var listener = function (e) {
            if (opt.callback)
                opt.callback(e);
            this.destory(el, listener);
        };
        el.querySelector('.js-dialogBtn__ok').addEventListener('click', listener.bind(this));
        document.body.appendChild(el);
    };
    Dialog.destory = function (el, listener) {
        el.removeEventListener('click', listener);
        document.body.removeChild(el);
        el = null;
        var overlay = document.querySelector("." + DialogConst.OVERLAY_CLASS);
        document.body.removeChild(overlay);
        overlay = null;
    };
    Dialog.showOverlay = function () {
        var overlayEl = document.querySelector("." + DialogConst.OVERLAY_CLASS);
        if (!overlayEl) {
            var el = this.buildOverlay();
            document.body.appendChild(el);
            overlayEl = el;
        }
    };
    Dialog.buildDialog = function (text, buttonText) {
        var el = document.createElement('div');
        el.classList.add("dialog");
        el.classList.add("js-dialog");
        var html = "\n      <div class=\"dialog__text\">" + text + "</div>\n      <div class=\"dialog__action\">\n        <button type=\"button\" class=\"btn dialog__btn js-dialogBtn__ok\">" + buttonText + "</button>\n      </div>\n    ";
        el.innerHTML = html;
        return el;
    };
    /**
     * build Dialog Overlay Element
     */
    Dialog.buildOverlay = function () {
        var el = document.createElement('div');
        el.classList.add(DialogConst.OVERLAY_CLASS);
        return el;
    };
    return Dialog;
})();
exports.Dialog = Dialog;
exports = Dialog;
var DialogConst;
(function (DialogConst) {
    DialogConst.OVERLAY_CLASS = "dialog__overlay";
})(DialogConst || (DialogConst = {}));

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbImxpYi9tb2R1bGVzL3VpL2RpYWxvZy9kaWFsb2cudHMiXSwibmFtZXMiOlsiRGlhbG9nIiwiRGlhbG9nLmNvbnN0cnVjdG9yIiwiRGlhbG9nLm5vcm1hbCIsIkRpYWxvZy5kZXN0b3J5IiwiRGlhbG9nLnNob3dPdmVybGF5IiwiRGlhbG9nLmJ1aWxkRGlhbG9nIiwiRGlhbG9nLmJ1aWxkT3ZlcmxheSIsIkRpYWxvZ0NvbnN0Il0sIm1hcHBpbmdzIjoiQUFBQSxpR0FBaUc7QUFDakc7SUFHRUE7SUFDQUMsQ0FBQ0E7SUFFYUQsYUFBTUEsR0FBcEJBLFVBQXFCQSxHQUEwREE7UUFDN0VFLElBQUlBLFVBQVVBLEdBQUdBLEdBQUdBLENBQUNBLFVBQVVBLElBQUlBLElBQUlBLENBQUNBO1FBQ3hDQSxJQUFJQSxDQUFDQSxXQUFXQSxFQUFFQSxDQUFDQTtRQUNuQkEsSUFBSUEsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsSUFBSUEsRUFBRUEsVUFBVUEsQ0FBQ0EsQ0FBQ0E7UUFFaERBLElBQUlBLFFBQVFBLEdBQWdDQSxVQUFTQSxDQUFPQTtZQUMxRCxFQUFFLENBQUMsQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDO2dCQUFDLEdBQUcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDbEMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUM7UUFDN0IsQ0FBQyxDQUFBQTtRQUVEQSxFQUFFQSxDQUFDQSxhQUFhQSxDQUFDQSxtQkFBbUJBLENBQUNBLENBQUNBLGdCQUFnQkEsQ0FBQ0EsT0FBT0EsRUFBRUEsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7UUFDckZBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO0lBQ2hDQSxDQUFDQTtJQUVjRixjQUFPQSxHQUF0QkEsVUFBdUJBLEVBQWNBLEVBQUVBLFFBQXNCQTtRQUMzREcsRUFBRUEsQ0FBQ0EsbUJBQW1CQSxDQUFDQSxPQUFPQSxFQUFFQSxRQUFRQSxDQUFDQSxDQUFDQTtRQUMxQ0EsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsRUFBRUEsQ0FBQ0EsQ0FBQ0E7UUFDOUJBLEVBQUVBLEdBQUdBLElBQUlBLENBQUNBO1FBRVZBLElBQUlBLE9BQU9BLEdBQWdCQSxRQUFRQSxDQUFDQSxhQUFhQSxDQUFDQSxHQUFHQSxHQUFHQSxXQUFXQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtRQUNuRkEsUUFBUUEsQ0FBQ0EsSUFBSUEsQ0FBQ0EsV0FBV0EsQ0FBQ0EsT0FBT0EsQ0FBQ0EsQ0FBQ0E7UUFDbkNBLE9BQU9BLEdBQUdBLElBQUlBLENBQUNBO0lBQ2pCQSxDQUFDQTtJQUVjSCxrQkFBV0EsR0FBMUJBO1FBQ0VJLElBQUlBLFNBQVNBLEdBQWdCQSxRQUFRQSxDQUFDQSxhQUFhQSxDQUFDQSxHQUFHQSxHQUFHQSxXQUFXQSxDQUFDQSxhQUFhQSxDQUFDQSxDQUFDQTtRQUNyRkEsRUFBRUEsQ0FBQ0EsQ0FBQ0EsQ0FBQ0EsU0FBU0EsQ0FBQ0EsQ0FBQ0EsQ0FBQ0E7WUFDZkEsSUFBSUEsRUFBRUEsR0FBR0EsSUFBSUEsQ0FBQ0EsWUFBWUEsRUFBRUEsQ0FBQ0E7WUFDN0JBLFFBQVFBLENBQUNBLElBQUlBLENBQUNBLFdBQVdBLENBQUNBLEVBQUVBLENBQUNBLENBQUNBO1lBQzlCQSxTQUFTQSxHQUFHQSxFQUFFQSxDQUFDQTtRQUNqQkEsQ0FBQ0E7SUFDSEEsQ0FBQ0E7SUFFY0osa0JBQVdBLEdBQTFCQSxVQUEyQkEsSUFBV0EsRUFBRUEsVUFBaUJBO1FBQ3ZESyxJQUFJQSxFQUFFQSxHQUFnQkEsUUFBUUEsQ0FBQ0EsYUFBYUEsQ0FBQ0EsS0FBS0EsQ0FBQ0EsQ0FBQ0E7UUFDcERBLEVBQUVBLENBQUNBLFNBQVNBLENBQUNBLEdBQUdBLENBQUNBLFFBQVFBLENBQUNBLENBQUNBO1FBQzNCQSxFQUFFQSxDQUFDQSxTQUFTQSxDQUFDQSxHQUFHQSxDQUFDQSxXQUFXQSxDQUFDQSxDQUFDQTtRQUU5QkEsSUFBSUEsSUFBSUEsR0FBR0EseUNBQ21CQSxJQUFJQSxpSUFFbUNBLFVBQVVBLGtDQUU5RUEsQ0FBQUE7UUFFREEsRUFBRUEsQ0FBQ0EsU0FBU0EsR0FBR0EsSUFBSUEsQ0FBQ0E7UUFFcEJBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBO0lBQ1pBLENBQUNBO0lBRURMOztPQUVHQTtJQUNZQSxtQkFBWUEsR0FBM0JBO1FBQ0VNLElBQUlBLEVBQUVBLEdBQWdCQSxRQUFRQSxDQUFDQSxhQUFhQSxDQUFDQSxLQUFLQSxDQUFDQSxDQUFDQTtRQUNwREEsRUFBRUEsQ0FBQ0EsU0FBU0EsQ0FBQ0EsR0FBR0EsQ0FBQ0EsV0FBV0EsQ0FBQ0EsYUFBYUEsQ0FBQ0EsQ0FBQ0E7UUFDNUNBLE1BQU1BLENBQUNBLEVBQUVBLENBQUNBO0lBQ1pBLENBQUNBO0lBQ0hOLGFBQUNBO0FBQURBLENBaEVBLEFBZ0VDQSxJQUFBO0FBaEVZLGNBQU0sU0FnRWxCLENBQUE7QUFDRCxPQUFPLEdBQUcsTUFBTSxDQUFDO0FBRWpCLElBQU8sV0FBVyxDQUVqQjtBQUZELFdBQU8sV0FBVyxFQUFBLENBQUM7SUFDRk8seUJBQWFBLEdBQVFBLGlCQUFpQkEsQ0FBQ0E7QUFDeERBLENBQUNBLEVBRk0sV0FBVyxLQUFYLFdBQVcsUUFFakIiLCJmaWxlIjoibGliL21vZHVsZXMvdWkvZGlhbG9nL2RpYWxvZy5qcyIsInNvdXJjZXNDb250ZW50IjpbIi8vLyA8cmVmZXJlbmNlIHBhdGg9XCIuLi8uLi8uLi8uLi8uLi8uLi90eXBpbmdzL2dpdGh1Yi1lbGVjdHJvbi9naXRodWItZWxlY3Ryb24tcmVuZGVyZXIuZC50c1wiIC8+O1xuZXhwb3J0IGNsYXNzIERpYWxvZyB7XG4gIHByaXZhdGUgb3ZlcmxheUVsOkhUTUxFbGVtZW50O1xuXG4gIGNvbnN0cnVjdG9yKCkge1xuICB9XG4gIFxuICBwdWJsaWMgc3RhdGljIG5vcm1hbChvcHQ6IHt0ZXh0OnN0cmluZywgYnV0dG9uVGV4dD86c3RyaW5nLCBjYWxsYmFjaz86RnVuY3Rpb259KTp2b2lkIHtcbiAgICB2YXIgYnV0dG9uVGV4dCA9IG9wdC5idXR0b25UZXh0IHx8IFwiT0tcIjtcbiAgICB0aGlzLnNob3dPdmVybGF5KCk7XG4gICAgdmFyIGVsID0gdGhpcy5idWlsZERpYWxvZyhvcHQudGV4dCwgYnV0dG9uVGV4dCk7XG4gICAgXG4gICAgdmFyIGxpc3RlbmVyOkV2ZW50TGlzdGVuZXIgPSA8RXZlbnRMaXN0ZW5lcj5mdW5jdGlvbihlOkV2ZW50KXtcbiAgICAgIGlmIChvcHQuY2FsbGJhY2spIG9wdC5jYWxsYmFjayhlKTtcbiAgICAgIHRoaXMuZGVzdG9yeShlbCwgbGlzdGVuZXIpO1xuICAgIH1cbiBcbiAgICBlbC5xdWVyeVNlbGVjdG9yKCcuanMtZGlhbG9nQnRuX19vaycpLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbGlzdGVuZXIuYmluZCh0aGlzKSk7XG4gICAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChlbCk7XG4gIH1cbiAgXG4gIHByaXZhdGUgc3RhdGljIGRlc3RvcnkoZWw6SFRNTEVsZW1lbnQsIGxpc3RlbmVyOkV2ZW50TGlzdGVuZXIpOnZvaWQge1xuICAgIGVsLnJlbW92ZUV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgbGlzdGVuZXIpO1xuICAgIGRvY3VtZW50LmJvZHkucmVtb3ZlQ2hpbGQoZWwpO1xuICAgIGVsID0gbnVsbDtcbiAgICBcbiAgICB2YXIgb3ZlcmxheSA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLlwiICsgRGlhbG9nQ29uc3QuT1ZFUkxBWV9DTEFTUyk7XG4gICAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChvdmVybGF5KTtcbiAgICBvdmVybGF5ID0gbnVsbDtcbiAgfVxuICBcbiAgcHJpdmF0ZSBzdGF0aWMgc2hvd092ZXJsYXkoKTp2b2lkIHtcbiAgICB2YXIgb3ZlcmxheUVsID0gPEhUTUxFbGVtZW50PmRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoXCIuXCIgKyBEaWFsb2dDb25zdC5PVkVSTEFZX0NMQVNTKTtcbiAgICBpZiAoIW92ZXJsYXlFbCkge1xuICAgICAgdmFyIGVsID0gdGhpcy5idWlsZE92ZXJsYXkoKTtcbiAgICAgIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQoZWwpO1xuICAgICAgb3ZlcmxheUVsID0gZWw7XG4gICAgfVxuICB9XG5cbiAgcHJpdmF0ZSBzdGF0aWMgYnVpbGREaWFsb2codGV4dDpzdHJpbmcsIGJ1dHRvblRleHQ6c3RyaW5nKTpIVE1MRWxlbWVudHtcbiAgICB2YXIgZWwgPSA8SFRNTEVsZW1lbnQ+ZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnZGl2Jyk7XG4gICAgZWwuY2xhc3NMaXN0LmFkZChcImRpYWxvZ1wiKTtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKFwianMtZGlhbG9nXCIpO1xuXG4gICAgdmFyIGh0bWwgPSBgXG4gICAgICA8ZGl2IGNsYXNzPVwiZGlhbG9nX190ZXh0XCI+JHt0ZXh0fTwvZGl2PlxuICAgICAgPGRpdiBjbGFzcz1cImRpYWxvZ19fYWN0aW9uXCI+XG4gICAgICAgIDxidXR0b24gdHlwZT1cImJ1dHRvblwiIGNsYXNzPVwiYnRuIGRpYWxvZ19fYnRuIGpzLWRpYWxvZ0J0bl9fb2tcIj4ke2J1dHRvblRleHR9PC9idXR0b24+XG4gICAgICA8L2Rpdj5cbiAgICBgXG4gICAgXG4gICAgZWwuaW5uZXJIVE1MID0gaHRtbDtcblxuICAgIHJldHVybiBlbDtcbiAgfVxuICBcbiAgLyoqXG4gICAqIGJ1aWxkIERpYWxvZyBPdmVybGF5IEVsZW1lbnRcbiAgICovXG4gIHByaXZhdGUgc3RhdGljIGJ1aWxkT3ZlcmxheSgpOkhUTUxFbGVtZW50e1xuICAgIHZhciBlbCA9IDxIVE1MRWxlbWVudD5kb2N1bWVudC5jcmVhdGVFbGVtZW50KCdkaXYnKTtcbiAgICBlbC5jbGFzc0xpc3QuYWRkKERpYWxvZ0NvbnN0Lk9WRVJMQVlfQ0xBU1MpO1xuICAgIHJldHVybiBlbDtcbiAgfVxufVxuZXhwb3J0cyA9IERpYWxvZztcblxubW9kdWxlIERpYWxvZ0NvbnN0e1xuICAgIGV4cG9ydCBjb25zdCBPVkVSTEFZX0NMQVNTICAgICAgPSBcImRpYWxvZ19fb3ZlcmxheVwiO1xufSJdLCJzb3VyY2VSb290IjoiL3NvdXJjZS8ifQ==