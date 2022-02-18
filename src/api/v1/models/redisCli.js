import redis from "redis";

export const generateConfig = () => {
  if (process.env.NODE_ENV === "production") {
    return { url: "redis://redis:6379" };
  }
  return null;
};

const REDIS = redis.createClient(generateConfig());
await REDIS.connect();
export default REDIS;
