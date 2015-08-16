/// <reference path="../../../../../typings/github-electron/github-electron-renderer.d.ts" />;

import fs = require('fs');

export class SettingFileService {
  private SETTING_FILE_PATH : string = "./bs-config.js"; 
  constructor() {}
  
  public static create (model) {
    var content: string = model.getSettingString();
    
    return fs.writeFile('bs-config.js', content);
  }
}
exports = SettingFileService;