const { redis } = require("../Config/redis.config");
const redisExpiry = 3 * 24 * 60 * 60; // 3days

class RedisClassService {
  constructor(time) {
    this.redisExpiry = time ?? redisExpiry;
  }
  async setRedisJSON(key, value) {
    try {
      const stringValue = JSON.stringify(value);
      await redis.set(key, stringValue, "EX", this.redisExpiry);
      return true;
    } catch (error) {
      throw error;
    }
  }

  async getRedisJSON(key) {
    try {
      const data = await redis.get(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      throw error;
    }
  }
}

module.exports = RedisClassService;
