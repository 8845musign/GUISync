class ConsoleService {
  private el:HTMLTextAreaElement;

  constructor(selector:string) {
    this.el = (<HTMLTextAreaElement>document.querySelector(selector));  }
  
  public log(log:string) {
    return this.el.value = this.el.value + log; 
  }
}
export = ConsoleService;