import * as NodeCache from "node-cache";

class CacheData {
  private nodeCache: any;
  private _ttl: any;

  constructor() {
    this.nodeCache = new NodeCache();
    this._ttl = 1200;
  }

  storeCache(dataStore: any) {
    const result = this.nodeCache.set(dataStore.email, { token: dataStore.token }, this._ttl);
    return result;
  }

  getCache(dataStore: any) {
    const result = this.nodeCache.get(dataStore.email);
    return result;
  }

  changeTTL(dataStore:any) {
    const result = this.nodeCache.ttl(dataStore.email, this._ttl);
    return result;
  }

  deleteCache(dataStore: any) {
    const result = this.nodeCache.del(dataStore.email);
    return result;
  }
}

export default CacheData;