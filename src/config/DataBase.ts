import * as mongoose from "mongoose";

class DataBase {
  private urlDb: any;
  private logger: any;
  public connection: any;

  constructor(variables: any, logger: any) {
    const { urlDb } = variables;

    this.urlDb = urlDb;
    this.logger = logger;

    this.connect();
  }

  async connect() {
    const optionConnClient = {
      useNewUrlParser: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useUnifiedTopology: true,
      retryWrites: true
    };

    return await mongoose.connect(this.urlDb, optionConnClient)
    .then((connection) => {
      this.logger.info("Success connect to database.");
      return connection;
    })
    .catch((err) => {
      throw new Error(`ERROR DATABASE: ${err}`);
    });
  }

  getDb() {
    return mongoose;
  }
}

export default DataBase;
