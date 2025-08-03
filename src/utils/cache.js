// src/utils/cache.js
// Cache prevents repeated API calls for the same location
// Example: User clicks London -> API call -> cache result
// User clicks London again -> no API call, instant result from cache
const Cache = {
  data: new Map(),

  get(key) {
    return this.data.get(key);
  },

  set(key, value) {
    this.data.set(key, value);
    Logger.log(`Cached data for: ${key}`);
  },

  has(key) {
    return this.data.has(key);
  },
};
