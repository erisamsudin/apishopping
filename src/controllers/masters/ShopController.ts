import ControllerBase from "../ControllerBase";
class ShopController extends ControllerBase {
  async addShop() {
    const { error } = this.repository.shop.validateAddShop(this.body.shopping);
    if (error) return this.error({
      statusCode: 400,
      message: error.details[0].message
    });
    const session = await this.startTransaction();


    let idna = "";
    const getNo = await this.repository.shop.genNo();
    if (getNo) {
      idna = "N" + String(Number(Number(String(getNo.id).slice(-4)) + Number(1))).padStart(4, '0');
    } else {
      idna = "N0001"
    }
    
    try {
      const formatedBody = this.body.shopping;
      const newShop = {
        createddate: formatedBody.createddate,
        id: idna,
        name: formatedBody.name,

      }
      await this.repository.shop.addShop(newShop, session);
      await this.commitTransaction(session);
      var resultdata;
      resultdata = {
        data: newShop
      }
      this.success(resultdata);

    } catch (err) {
      await this.rollbackTransaction(session);
      this.error(err);
    }
  }

  async getShops() {
    try {
      const result = await this.repository.shop.getShops();
      this.success(result);
    } catch (err) {
      this.error(err);
    }
  }

  async getShopById() {
    try {
      const result = await this.repository.shop.getShopById(this.params.id);
      this.success(result[0]);
    } catch (err) {
      this.error(err);
    }
  }

  async updateShopById() {
    const { error } = this.repository.shop.validateUpdateShop(this.body.shopping);
    if (error) return this.error({ 
      statusCode: 400, 
      message: error.details[0].message 
    });

    const formatedBody = await this.formatStringObject(this.body.shopping, []);
    const session = await this.startTransaction();
    try {
      const result = await this.repository.shop.updateShopById(this.params.id, formatedBody, session);
      await this.commitTransaction(session);
      this.success(result);
    } catch(err) {
      await this.rollbackTransaction(session);
      this.error(err);
    }
  }

  async deleteShopById() {
    const session = await this.startTransaction();
    try {
      const result = await this.repository.shop.deleteShopById(this.params.id, session);
      await this.commitTransaction(session);
      this.success(result);
    } catch(err) {
      await this.rollbackTransaction(session);
      this.error(err);
    }
  }
}

export default ShopController;
