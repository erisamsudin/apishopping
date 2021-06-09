import CacheData from "./CacheData";
import Logger from "./Logger";
import Security from "./Security";
import UserService from "./UserService";
import DateService from "./DateService";
import TransactionService from "./TransactionService";
import FormatStringObject from "./FormatStringObject";

class Services {
  private variables: any;
  private db: any;

  public cacheData: any;
  public logger: any;
  public security: any;
  public userService: any;
  public dateService: any;
  public transactionService: any;
  public formatStringObject: any;

  constructor(db:any, variables: any) {
    this.db = db;
    this.variables = variables;
    
    this.registerService();
  }

  registerService() {
    this.cacheData = new CacheData();
    this.logger = new Logger();
    this.security = new Security(this.variables, this.cacheData);
    this.userService = new UserService();
    this.dateService = new DateService();
    this.transactionService = new TransactionService(this.db);
    this.formatStringObject = new FormatStringObject();
  }
}

export default Services;
