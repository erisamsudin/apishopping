import RepositoryBase from "../RepositoryBase";
import { Shop, ValidAddShop, ValidUpdateShop } from "../../entities/masters/ShopEntity";

class ShopRepositories extends RepositoryBase {
  private shop: any;
  constructor(db: any, jf: any, service: any) {
    const sendColumn = {
      "createddate": "$createddate",
      "id": "$id",
      "name": "$name"
    };
    super(db, jf, service, sendColumn);
    this.shop = new Shop();
  }



  validateAddShop(ShopData: any) {
    const result = this.jf.validateAsClass(ShopData, ValidAddShop);
    return result;
  }

  validateUpdateShop(ShopData: any) {
    const result = this.jf.validateAsClass(ShopData, ValidUpdateShop);
    return result;
  }


  async getShopById(idna: any) {
    const shops = this.shop.aggregate([
      { "$match": { id: idna } },
      { "$project": this.sendColumn }
    ]);
    return shops;
  }

  async getShops() {
    const shops = this.shop.aggregate([
      { "$project": this.sendColumn }
    ]);
    return shops;
  }
  
  async addShop(newShop: any, session: any) {
    const user = new this.shop(newShop);
    await user.save({ session: session });
    return "Add Shop Berhasil";
  }

  async genNo() {
    const result = await this.shop.aggregate([
      { "$sort": { id: -1 } }
    ]);
    return result[0];
  }

  async updateShopById(idna: any, dataBody: any, session: any) {
    const result = await this.shop.findOneAndUpdate({ id : idna }, dataBody, { session });
    if (!result) throw new Error(`Data Shopping: ${idna} tidak di temukan, Update GAGAL!`);
    return (`Update data Shopping: ${idna} BERHASIL!`);
  }
  
  async deleteShopById(idna: any, session: any) {
    const result = await this.shop.findOneAndDelete({ id : idna }, { session });
    if (!result) throw new Error(`Data Shopping: ${idna} tidak di temukan, Delete data user GAGAL!`);
    return `Delete Shopping: ${idna} BERHASIL.`
  }
}

export default ShopRepositories;
