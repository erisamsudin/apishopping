class RepositoryBase {
  public db: any;
  public jf: any;
  public sendColumn: any;
  public service: any;

  constructor(db: any, jf: any, service: any, sendColumn: any) {
    this.db = db;
    this.jf = jf;
    this.sendColumn = sendColumn;
    this.service = service;
  }
}

export default RepositoryBase;
