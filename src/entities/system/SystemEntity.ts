import { Schema, model } from "mongoose";
import * as jf from "joiful";

export class SystemSetting {
  constructor() {
    const SystemSettingSchema = new Schema({
      tgl_system: String,
      kode_toko : String,
      nama_toko : String,
      alamat_toko : String,
      no_telp : String
    });

    SystemSettingSchema.index({ tgl_system: 1}, { unique: true })    
    const SystemSetting = model('tp_system', SystemSettingSchema, 'tp_system');
    
    return SystemSetting;
  }
}



