import * as jwt from "jsonwebtoken";

class Security {
  private mode: any;
  private jwtPrivateKey: any;
  private cacheData: any;

  constructor(variables: any, cacheData: any) {
    this.mode = variables.mode;
    this.jwtPrivateKey = variables.jwtPrivateKey;
    this.cacheData = cacheData;
  }
  
  generateToken(userData: any) {
    const token = jwt.sign({
      email: userData.email
      },
      this.jwtPrivateKey);
    return token;
  }

  authenticate() {
    return [
      (req: any, res: any, next: any) => {
        // const token = req.headers["x-auth-token"];
        const gettoken  = req.headers["authorization"];
        const token = gettoken.replace('Bearer ','');
        req.autor
        if (!token) return res.status(401).send("Access denied. No token provided.");
        try {
          const decoded = jwt.verify(token, this.jwtPrivateKey);
          req.user = decoded;
          
          if (this.mode === "production") {
            const cacheToken = this.cacheData.getCache(req.user);
            if (cacheToken.token !== token) return res.status(400).send("Invalid token.");
            this.cacheData.changeTTL(req.user);
          }

          next();
        } catch(err) {
          res.status(400).send("Invalid token.");
        }
      }
    ]
  }
}

export default Security;