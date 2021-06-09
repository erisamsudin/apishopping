import RepositoryBase from "./RepositoryBase";

import SetupRepositories from "./utilities/SetupReposirories";

//START MASTER
import UserRepositories from "./masters/UserRepositories";
import ShopRepositories from "./masters/ShopRepositories";



//END MASTER


//START SYSTEM SETTING
import SystemSettingRepositories from "./system/SystemRepositories";
//START SYSTEM SETTING




class Repository {
  private _db: any;
  private _jf: any;
  private _service: any;

  private global: any;
  private setup: any;


  //START MASTER
  private users: any;
  private shop: any;

    
//START MASTER


  //SYSTEM
  private systemsetting: any;
  //SYSTEM





  constructor(db: any, jf: any, service: any) {
    this._db = db;
    this._jf = jf;
    this._service = service;
  }

  registerRepositories() {
    this.global = new RepositoryBase(this._db, this._jf, this._service, []);
    this.setup = new SetupRepositories(this._db, this._jf, this._service);


    this.users = new UserRepositories(this._db, this._jf, this._service);
    this.shop = new ShopRepositories(this._db, this._jf, this._service);
    


    this.systemsetting = new SystemSettingRepositories(this._db, this._jf, this._service)        
  }
}

export default Repository;
