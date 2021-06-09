import RouteBase from "../RoutesBase";
import UserController from "../../controllers/masters/UserController";

class UserRoutes extends RouteBase {
  constructor() {
    super(UserController);
  }

  getRoutes() {
    this.buildRoute("/users/signup", "post", "addUser", true);
    this.buildRoute("/users/signin","post", "loginUser");
    this.buildRoute("/users", "get", "getUsers", true);
    return this.routes;
  }
}

export default UserRoutes;
