import { Schema, model } from "mongoose";
import * as jf from "joiful";

export class Shop {
  constructor() {
    const shopSchema = new Schema({
      id: String,
      name: String,
      createddate: String,
    });
    shopSchema.index({ id: 1 }, { unique: true })
    const Shop = model('shopping', shopSchema, 'shopping');
    return Shop;
  }
}

export class ValidAddShop {
  @jf.string().required()
  name: string;

  @jf.string().required()
  createddate: string;
}


export class ValidUpdateShop {
  @jf.string().required()
  name: string;

  @jf.string().required()
  createddate: string;
}