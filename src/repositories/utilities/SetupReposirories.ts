import RepositoryBase from "../RepositoryBase";
class GroupRepositories extends RepositoryBase {
  constructor(db: any, jf: any, service: any) {
    super(db, jf, service, []);
  }
}

export default GroupRepositories;