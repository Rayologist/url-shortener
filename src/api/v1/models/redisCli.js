import redis from "redis";
const REDIS = redis.createClient();
await REDIS.connect();
export default REDIS;
