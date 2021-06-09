class ControllerBase {
  public params: any;
  public query: any;
  public headers: any;
  public body: any;
  public send: any;
  public repository: any;
  public user: any;

  constructor({ 
    params, 
    query, 
    headers, 
    body, 
    send, 
    repository,
    user 
  }: any) {
    this.params = params;
    this.query = query;
    this.headers = headers;
    this.body = body;
    this.send = send;
    this.repository = repository;
    this.user = user;
  }

  error(err: any) {
    const status = err.statusCode || err.status;
    const statusCode = status || 500;
    
    const message = err.message || err
    
    this.send(statusCode, message);
  }

  success(data: any) {
    this.send(200, data);
  }

  async createQueryRunner() {
    await this.repository.global.service.transactionService.createQueryRunner();
  }

  async releaseQueryRunner(session: any) {
    await this.repository.global.service.transactionService.releaseQueryRunner(session);
  }

  async startTransaction() {
    return await this.repository.global.service.transactionService.startTransaction();
  }

  async commitTransaction(session: any) {
    await this.repository.global.service.transactionService.commitTransaction(session);
  }

  async rollbackTransaction(session: any) {
    await this.repository.global.service.transactionService.rollbackTransaction(session);
  }

  formatStringObject(dataObject: any, dataIgnore: any) {
    const result = this.repository.global.service.formatStringObject.format(dataObject, dataIgnore); 
    return result;
  }
}

export default ControllerBase;
