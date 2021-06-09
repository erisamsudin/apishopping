import ControllerBase from "../ControllerBase";

class SetupController extends ControllerBase {
  async addAdminUser() {
    const session = await this.startTransaction();
    try {
      let result = await this.repository.users.getUserById("admin");
      if (result) {
        await this.rollbackTransaction(session);
        return this.error({ statusCode: 400, message: "User id sudah terdaftar!"});
      }

      const newUser = {
        user_id: "admin",
        user_name: "ADMIN",
        level: "OWN",
        password: "admin",
        input_by: "SYSTEM",
        input_date: this.repository.users.service.dateService.localDateTime(),
        edit_by: "-",
        edit_date: this.repository.users.service.dateService.localDateTime()
      }
      newUser.password = await this.repository.users.service.userService.hashPassword(newUser.password);

      result = await this.repository.users.addUser(newUser, session);

      await this.commitTransaction(session);
      this.success(result);
    } catch(err) {
      console.log(err.message);
      await this.rollbackTransaction(session);
      this.error(err);
    }
  }

  async createTables() {
    try {
      const result = await this.repository.setup.createTables();
      this.success(result);
    } catch(err) {
      this.error(err);
    }
  }

  async dropTables() {
    try {
      if (this.params.kode !== "seccreeet") this.error({ statusCode: 400, message: "FORBIDDEN ACCESS!!!"});

      const result = await this.repository.setup.dropTables();
      this.success(result);
    } catch(err) {
      this.error(err);
    }
  }

  async runMigrations() {
    try {
      await this.repository.setup.runMigrations();
      this.success("Run migration SUCCESS.");
    } catch(err) {
      this.error(err);
    }
  }
}

export default SetupController;