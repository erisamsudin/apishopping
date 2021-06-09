import RouteBase from "../RoutesBase";
import SystemSettingController from "../../controllers/system/SystemSettingController";

class SystemSettingRoutes extends RouteBase {
  constructor() {
    super(SystemSettingController);
  }

  getRoutes() {
    this.buildRoute("/system/add", "post", "AddSystem", true);
    this.buildRoute("/system/get", "get", "GetSystem", true);
    this.buildRoute("/system/close", "post", "TutupToko", true);

    return this.routes;
  }
}

export default SystemSettingRoutes;