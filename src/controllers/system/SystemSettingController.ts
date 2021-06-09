import { group } from "console";
import ControllerBase from "../ControllerBase";
const uuid = require('uuid');
const dateFormat = require('dateformat');


class SystemSettingController extends ControllerBase {

  async AddSystem() {
    const formatedData = this.repository.group.service.formatStringObject.format(this.body, []);
    const session = await this.startTransaction();
    try {
      const NewCash = {
        tgl_system: formatedData.tgl_system,
        kode_toko: formatedData.kode_toko,
        nama_toko: formatedData.nama_toko,
        no_telp: formatedData.no_telp,
        alamat_toko: formatedData.alamat_toko,
      };
      const result = await this.repository.systemsetting.AddSystem(NewCash, session);
      await this.commitTransaction(session);
      return this.success({
        message: result
      });
    } catch (err) {
      this.error(err);
    }

  }

  async TutupToko() {
    const formatedData = this.repository.group.service.formatStringObject.format(this.body, []);
    const session = await this.startTransaction();
    //CEK VALIDASI
    const validjual = await this.repository.jual.GetOutstandPenjualanAll();
    if (validjual.length > 0){
      return this.error({
        code : 400,
        message: "Ada Penjualan Yg Belum Di Validasi!"
      });
    }

    const validbeli = await this.repository.beli.GetOutstandPembelianAll();
    if (validbeli.length > 0){
      return this.error({
        code : 400,
        message: "Ada Pembelian Yg Belum Di Validasi!"
      });
    }

    const validhutang = await this.repository.hutang.GetOutstandHutangAll();
    if (validhutang.length > 0){
      return this.error({
        code : 400,
        message: "Ada Hutang Yg Belum Di Validasi!"
      });
    }
    
    //CEK VALIDASI
    try {
      //GET SYSTEM
      const GetSystem = await this.repository.systemsetting.GetSystem();
      var tgl_system;
      var nama_toko;
      var kode_toko;
      var alamat_toko;
      var no_telp;
      if (GetSystem.length > 0) {
        for (let vSystem of GetSystem) {
          tgl_system = vSystem.tgl_system;
          nama_toko = vSystem.nama_toko;
          kode_toko = vSystem.kode_toko;
          alamat_toko = vSystem.alamat_toko;
          no_telp = vSystem.no_telp;
        }
      } else {
        return this.error({
          statusCode: 400,
          message: "System Belum Di Setting!"
        });
      }
      //GET SYSTEM
      
      var tgl_ganti = new Date(tgl_system);
      tgl_ganti.setDate(tgl_ganti.getDate() + 1);
      tgl_ganti = dateFormat(tgl_ganti, "yyyy-mm-dd")
      //TT_BARANG_SALDO
      var SaldoBarang = [];
      const CekSaldoBarang = await this.repository.saldobarang.getSaldoBarangAll(tgl_system);
      if (CekSaldoBarang) {
        for (let vBarang of CekSaldoBarang) {
          const newSaldoBarang = {
            tanggal: tgl_ganti,
            kode_barcode: vBarang.kode_barcode,
            kode_group: vBarang.kode_group,
            kode_dept: vBarang.kode_dept,
            kode_gudang: vBarang.kode_gudang,
            kode_toko: vBarang.kode_toko,
            stock_awal: 1,
            berat_awal: vBarang.berat_akhir,
            stock_in: 0,
            berat_in: 0,
            stock_out: 0,
            berat_out: 0,
            stock_jual: 0,
            berat_jual: 0,
            stock_hancur: 0,
            berat_hancur: 0,
            stock_akhir: 1,
            berat_akhir: vBarang.berat_akhir
          }
          SaldoBarang.push(
            newSaldoBarang
          );
        }
        const options = { ordered: true };
        await this.repository.saldobarang.AddSaldoBarangMany(SaldoBarang, options, session);
        //TT BARANG SALDO
      }
      const result = await this.repository.systemsetting.TutupToko(tgl_ganti, kode_toko, session);
      await this.commitTransaction(session);
      return this.success({
        message: result
      });
    } catch (err) {
      this.error(err);
    }
  }


  async GetSystem() {
    try {
      const result = await this.repository.systemsetting.GetSystem();
      return this.success(result);
    } catch (err) {
      this.error(err);
    }
  }
}

export default SystemSettingController;
