import RouteBase from "../RoutesBase";
import SetupController from "../../controllers/utilities/SetupController";

class UserRoutes extends RouteBase {
  constructor() {
    super(SetupController);
  }

  getRoutes() {
    this.buildRoute("/setup/user-admin", "post", "addAdminUser");
    this.buildRoute("/setup/create-tables","post", "createTables");
    this.buildRoute("/setup/drop-tables/:kode", "delete", "dropTables");
    this.buildRoute("/setup/run-migrations", "post", "runMigrations");
    
    return this.routes;
  }
}

export default UserRoutes;
