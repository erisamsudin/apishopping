import RouteBase from "../RoutesBase";
import ShopController from "../../controllers/masters/ShopController";

class ShopRoutes extends RouteBase {
  constructor() {
    super(ShopController);
  }

  getRoutes() {
    this.buildRoute("/shopping", "post", "addShop", true);
    this.buildRoute("/shopping", "get", "getShops", true);
    this.buildRoute("/shopping/:id", "get", "getShopById", true);
    this.buildRoute("/shopping/:id", "put", "updateShopById", true);
    this.buildRoute("/shopping/:id", "delete", "deleteShopById", true); 
    return this.routes;
  }
}

export default ShopRoutes;
