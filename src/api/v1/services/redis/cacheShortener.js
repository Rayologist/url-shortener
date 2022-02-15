import REDIS from "../../models/redisCli.js";

function getKey(shortUrl) {
  return `shortener:url:${shortUrl}`;
}

async function redisSetUrl(id, longUrl, shortUrl, expire = null) {
  if (expire == null) {
    expire = 86400;
  }

  expire = Math.ceil(expire);

  const key = getKey(shortUrl);

  return Promise.all([
    REDIS.hSet(key, [
      ["id", id],
      ["longUrl", longUrl],
    ]),
    REDIS.expire(key, expire),
  ]);
}

async function redisGetUrl(shortUrl) {
  const key = getKey(shortUrl);
  return REDIS.hGetAll(key);
}

async function redisDeleteUrl(shortUrl) {
  const key = getKey(shortUrl);
  return REDIS.del(key);
}

export { redisGetUrl, redisSetUrl, redisDeleteUrl };
