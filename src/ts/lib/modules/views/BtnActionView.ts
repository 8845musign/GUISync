/// <reference path="../../../../../typings/github-electron/github-electron-renderer.d.ts" />;
/// <reference path="../../../../../typings/node/node.d.ts" />;

import events = require('events');
var EventEmitter = events.EventEmitter

class BtnActionView extends EventEmitter {
    private el:HTMLElement;
    private startFunc:Function;
    private stopFunc:Function;
    private mode:Mode;

    /**
     * constructor
     */
    constructor(options:{selector:string, startFunc:Function, stopFunc:Function}) {
        super();
        this.el         = <HTMLElement>document.querySelector(options.selector);
        this.startFunc  = options.startFunc;
        this.stopFunc   = options.stopFunc;

        this.init();
    }

    /**
     * initialize
     */
    private init():void {
        this.mode = Mode.start;
        this.el.classList.add(Const.CSS_CLASS_START);

        this.el.addEventListener('click', this.onClick.bind(this));
    }
	
    /**
     * on click
     */
    private onClick(e:Event):void {
        if (this.mode === Mode.start) {
            this.start();
        } else {
            this.stop();
        }

        e.preventDefault();
    }

    /**
     * start function
     */
    private start():void {
        this.startFunc(this);
        this.el.classList.remove(Const.CSS_CLASS_START);
        this.el.classList.add(Const.CSS_CLASS_STOP);
    }
	
    /**
     * stop function
     */
    private stop():void {
        this.stopFunc(this);
        this.el.classList.remove(Const.CSS_CLASS_STOP);
        this.el.classList.add(Const.CSS_CLASS_START);
    }
}
export = BtnActionView;

/**
 * Button Mode
 */
enum Mode{
	start,
	stop
}

/**
 * const
 */
module Const {
    export const CSS_CLASS_START    = 'btnAction--start';
    export const CSS_CLASS_STOP     = 'btnAction--stop';
}