import ControllerBase from "../ControllerBase";

class UserController extends ControllerBase {
  async loginUser() {
    try {
      const { error } = this.repository.users.validateLoginUser(this.body);
      if (error) {
        return this.error(
          { 
            statusCode: 400, 
            message: error.details[0].message 
          }
        );
      }
      
      const user = await this.repository.users.getUserPassword(this.body.email);
      if (!user) {
        return this.error(
          { 
            statusCode: 400, 
            message: "User id atau Password yang anda masukan salah!"
          }
        );
      }

      const matchPassword = await this.repository.users.service.userService.comparePassword(this.body.password, user);
      if (!matchPassword) {
        return this.error(
          { 
            statusCode: 400, 
            message: "User id atau Password yang anda masukan salah!"
          }
        );
      }

      const token = await this.repository.users.service.security.generateToken(user);
      if (!token) {
        return this.error(
          { 
            statusCode: 400, 
            message: "Gagal login, coba ulangi kembali!"
          }
        );
      }
      const result  = {
        email: user.email,
        token: token,
        username: user.username,        
      };

      await this.repository.users.service.cacheData.storeCache(result);
      this.success(result);
    } catch(err) {
      this.error(err);
    }
  }

  async addUser() {
    // return;
    
    const { error } = this.repository.users.validateAddUser(this.body.user);
    if (error) return this.error({ 
      statusCode: 400, 
      message: error.details[0].message 
    });
    const session = await this.startTransaction();
    
    try {
      const formatedBody = this.body.user;
      let CekUser = await this.repository.users.getUserById(formatedBody.username);
      if (CekUser) {
        await this.rollbackTransaction(session);
        return this.error({ 
          statusCode: 400, 
          message: "Username sudah terdaftar!"
        });
      }

      let CekEmail = await this.repository.users.getUserByEmail(formatedBody.email);

      if (CekEmail) {
        await this.rollbackTransaction(session);
        return this.error({ 
          statusCode: 400, 
          message: "Email sudah terdaftar!"
        });
      }

      const newUser = {
        username : formatedBody.username,
        password: formatedBody.password,
        email: formatedBody.email,
        phone: formatedBody.phone,
        country: formatedBody.country,
        city: formatedBody.city,
        postcode: formatedBody.postcode,
        name: formatedBody.name,
        address: formatedBody.address
      }
      const token = await this.repository.users.service.security.generateToken(formatedBody.username);
      newUser.password = await this.repository.users.service.userService.hashPassword(newUser.password);
      await this.repository.users.addUser(newUser, session);
      
      await this.commitTransaction(session);
      var resultdata;
      resultdata = {
        "email": formatedBody.email,
        "token" : token,
        "username": formatedBody.username
      }
      this.success(resultdata);

    } catch(err) {
      await this.rollbackTransaction(session);
      this.error(err);
    }
  }

  async getUsers() {
    try {
      const result = await this.repository.users.getUsers();
      this.success(result);
    } catch(err) {
      this.error(err);
    }
  }
}

export default UserController;
