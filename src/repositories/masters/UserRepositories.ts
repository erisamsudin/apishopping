import RepositoryBase from "../RepositoryBase";
import { User, ValidAddUser, ValidLoginUser} from "../../entities/masters/UserEntity";

class UserRepositories extends RepositoryBase {
  private user: any;
  constructor(db: any, jf: any, service: any) {
    const sendColumn = {
      "username": "$username",
      "email": "$email",
      "phone": "$phone",
      "country": "$country",
      "city": "$city",
      "postcode": "$postcode",
      "name": "$name",
      "address": "$address"
    };

    super(db, jf, service, sendColumn);

    this.user = new User();

  }

  validateAddUser(userData: any) {
    const result = this.jf.validateAsClass(userData, ValidAddUser);
    return result;
  }

  validateLoginUser(userData: any) {
    const result = this.jf.validateAsClass(userData, ValidLoginUser);
    return result;
  }

  async getUserById(username: any) {
    const users = await this.user.findOne({ username });
    return users;
  }

  async getUserByEmail(email: any) {
    const users = await this.user.findOne({ email });
    return users;
  }

  async getUsers() {
    const users = this.user.aggregate([
      { "$project": this.sendColumn }
    ]);
    return users;
  }
  
  async getUserPassword(email: any) {
    const users = await this.user.findOne({ email });
    return users;
  }

  async addUser(newUser: any, session: any) {
    const user = new this.user(newUser);
    await user.save({ session: session });
    return "Save data user BERHASIL";
  }
}

export default UserRepositories;
