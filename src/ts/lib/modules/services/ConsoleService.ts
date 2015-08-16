export class ConsoleService {
  private el:HTMLTextAreaElement;

  constructor(selector:string) {
    this.el = (<HTMLTextAreaElement>document.querySelector(selector));
  }
  
  public log(log:string) {
    return this.el.innerText = this.el.innerText + log; 
  }
}
exports = ConsoleService;