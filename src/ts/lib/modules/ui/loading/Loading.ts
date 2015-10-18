/// <reference path="../../../../../../typings/github-electron/github-electron-renderer.d.ts" />

class Loading {
	
	/**
	 * show Loading
	 */
	public static show():void {
		var el = document.createElement('div');
		el.classList.add(Const.CLASS_NAME);
		document.appendChild(el);
		el.focus();
		
		// TODO: Invalid KeyBoard Input
	}
	
	/**
	 * hide Loading
	 */
	public static hide():void {
		var loadings = document.querySelectorAll("." + Const.CLASS_NAME);
		
		for (var i = 0, len = loadings.length; i < len; i++) {
			document.removeChild(loadings[i]);
		}
	}
}
export = Loading;

/**
 * Loading Class Const
 */
module Const{
	export const CLASS_NAME = "loading";
}