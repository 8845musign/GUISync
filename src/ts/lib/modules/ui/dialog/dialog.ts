/// <reference path="../../../../../../typings/github-electron/github-electron-renderer.d.ts" />;
export class Dialog {
  private overlayEl:HTMLElement;

  constructor() {
  }
  
  public static normal(opt: {text:string, buttonText?:string, callback?:Function}):void {
    var buttonText = opt.buttonText || "OK";
    this.showOverlay();
    var el = this.buildDialog(opt.text, buttonText);
    
    var listener:EventListener = <EventListener>function(e:Event){
      if (opt.callback) opt.callback(e);
      this.destory(el, listener);
    }
 
    el.querySelector('.js-dialogBtn__ok').addEventListener('click', listener.bind(this));
    document.body.appendChild(el);
  }
  
  private static destory(el:HTMLElement, listener:EventListener):void {
    el.removeEventListener('click', listener);
    document.body.removeChild(el);
    el = null;
    
    var overlay = <HTMLElement>document.querySelector("." + DialogConst.OVERLAY_CLASS);
    document.body.removeChild(overlay);
    overlay = null;
  }
  
  private static showOverlay():void {
    var overlayEl = <HTMLElement>document.querySelector("." + DialogConst.OVERLAY_CLASS);
    if (!overlayEl) {
      var el = this.buildOverlay();
      document.body.appendChild(el);
      overlayEl = el;
    }
  }

  private static buildDialog(text:string, buttonText:string):HTMLElement{
    var el = <HTMLElement>document.createElement('div');
    el.classList.add("dialog");
    el.classList.add("js-dialog");

    var html = `
      <div class="dialog__text">${text}</div>
      <div class="dialog__action">
        <button type="button" class="btn dialog__btn js-dialogBtn__ok">${buttonText}</button>
      </div>
    `
    
    el.innerHTML = html;

    return el;
  }
  
  /**
   * build Dialog Overlay Element
   */
  private static buildOverlay():HTMLElement{
    var el = <HTMLElement>document.createElement('div');
    el.classList.add(DialogConst.OVERLAY_CLASS);
    return el;
  }
}
exports = Dialog;

module DialogConst{
    export const OVERLAY_CLASS      = "dialog__overlay";
}