import { Schema, model } from "mongoose";
import * as jf from "joiful";

export class User {
  constructor() {
    const userSchema = new Schema({
      username: String,
      password: String,
      email: String,
      phone: String,
      country: String,
      city: String,
      postcode: String,
      name: String,
      address: String
    });
    userSchema.index({ username: 1 }, { unique: true })
    const User = model('user', userSchema, 'user');
    return User;
  }
}

export class ValidAddUser {
  @jf.string().required()
  username: string;

  @jf.string().required()
  password: string;

  @jf.string().required()
  email: string;

  @jf.string().required()
  country: string;
  
  @jf.string().required()
  phone: string;

  @jf.string().required()
  city: string;

  @jf.string().required()
  postcode: string;

  @jf.string().required()
  name: string;

  @jf.string().required()
  address: string;
}

export class ValidLoginUser {
  @jf.string().required()
  email: string;
  
  @jf.string().required()
  password: string;
}