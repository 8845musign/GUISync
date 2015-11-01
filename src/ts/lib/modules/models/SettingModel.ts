class SettingModel {
  private target :string;
  private basicId :string;
  private basicPassword :string;

  constructor(options:{ target:string, basicId?:string, basicPassword?:string }) {
    this.target          = options.target;
    this.basicId         = options.basicId || "";
    this.basicPassword   = options.basicPassword || "";
  }

  private encodedIdAndPass():string {
    if (!this.basicId || !this.basicPassword) {
      throw new Error('no set ID or Password');
    }

    return btoa(this.basicId + ":" + this.basicPassword);
  }

  public getSettingString():string {

    var hasBasicAuth = (this.basicId !== "" && this.basicPassword !== "");

    if (!hasBasicAuth) {
      // No auth
      return `
module.exports = {
    proxy: { target: "${ this.target }" }
};
`;
    } else {
      // auth
      return `
module.exports = {
    proxy: {
        target: "${ this.target }",
        middleware: function (req, res, next) {
            req.headers.authorization = "Basic ${ this.encodedIdAndPass() }";
            next();
        }
    }
};
`;
    }
  }
}
export = SettingModel;