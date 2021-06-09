import RepositoryBase from "../RepositoryBase";
import { SystemSetting } from "../../entities/system/SystemEntity";

class SystemSettingRepositories extends RepositoryBase {
  private systemsetting: any

  constructor(db: any, jf: any, service: any) {
    const sendColumn = {
      "tgl_system": "$tgl_system",
      "kode_toko": "$kode_toko",
      "nama_toko": "$nama_toko",
      "alamat_toko": "$alamat_toko",
      "no_telp": "$no_telp"
    };
    super(db, jf, service, sendColumn);
    this.systemsetting = new SystemSetting();
  }

  async TutupToko(tgl_system: any,kode_toko: any, session: any) {
    const result = await this.systemsetting.updateMany({ kode_toko : kode_toko },{ tgl_system : tgl_system }, { session });
    if (!result) throw new Error(`TUTUP TOKO : ${kode_toko} GAGAL!`);
    return `TUTUP TOKO : ${kode_toko} BERHASIL.`;
  }
  
  async AddSystem(DataSystem: any, session: any) {
    const TambahSystem = new this.systemsetting(DataSystem);
    await TambahSystem.save({ session });
    return "Simpan data BERHASIL.";
  }

  async GetSystem() {
    const result = await this.systemsetting.aggregate([
      // { "$match": { status_aktif: true }},
      { "$project": this.sendColumn }
    ]);
    return result;
  }

  
  // //REPORT CASH
  // async ReportCashDetail(tgl_awal: any) {
  //   const Tgl = new Date(tgl_awal).toISOString;
  //   // return Tgl;
  //   const result = await this.Cash.aggregate([
  //     { "$match": { tanggal: tgl_awal } },
  //     {
  //       "$project": {
  //         "input_by": "$input_by",
  //         "kategori": "$kategori",
  //         "deskripsi": "$deskripsi",
  //         "jumlah_in": "$jumlah_in",
  //         "jumlah_out": "$jumlah_out"
  //       }
  //     }
  //   ]);
  //   return result;
  // }

  // async ReportCashRekap(tgl_awal: any) {
  //   const Tgl = new Date(tgl_awal);
  //   const result = await this.Cash.aggregate([
  //     { "$match": { tanggal: tgl_awal } },
  //     {
  //       "$project": {
  //         "tanggal": "$tanggal",
  //         "jumlah_in": "$jumlah_in",
  //         "jumlah_out": "$jumlah_out",
  //         "kategori": "$kategori",
  //       }
  //     },
  //     {
  //       $group: {
  //         _id: "$kategori",
  //         jumlah_in: { $sum: '$jumlah_in' },
  //         jumlah_out: { $sum: '$jumlah_out' }
  //       }
  //     }
  //   ]);
  //   return result;
  // }
  // //REPORT CASH
  
  // async GetDetailUang(no_faktur_group: any) {
  //   // return Tgl;
  //   const result = await this.Cash.aggregate([
  //     { "$match": { deskripsi: no_faktur_group } },
  //     {
  //       "$project": {
  //         "jenis": "$kategori",
  //         "deskripsi": "$deskripsi",
  //         "jumlah_in": "$jumlah_in",
  //         "jumlah_out": "$jumlah_out"
  //       }
  //     }
  //   ]);
  //   return result;
  // }
  
}
export default SystemSettingRepositories;