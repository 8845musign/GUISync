class ConsoleService {
  private el:HTMLTextAreaElement;

  constructor(selector:string) {
    this.el = (<HTMLTextAreaElement>document.querySelector(selector));  }
  
  public log(log:string) {
    this.el.value = this.el.value + log;
    this.el.scrollTop = this.el.clientHeight;
    return this.el.value;
  }
}
export = ConsoleService;