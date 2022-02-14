import redis from "redis";
const SHORTENERRedisClient = redis.createClient({ legacyMode: true });
await SHORTENERRedisClient.connect();
export default SHORTENERRedisClient;
