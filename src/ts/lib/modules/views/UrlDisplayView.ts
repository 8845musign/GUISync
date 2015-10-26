/// <reference path="../../../../../typings/github-electron/github-electron-renderer.d.ts" />;

class UrlDisplayView {
    private el:HTMLElement;

    /**
     * constructor
     */
    constructor(selector) {
        this.el = <HTMLElement>document.querySelector(selector);
        this.el.innerText = "";
    }

    public setUrl(text):void {
        this.el.innerText = text;
    }

    public clearUrl():void {
        this.setUrl('');
    }
}

export = UrlDisplayView;