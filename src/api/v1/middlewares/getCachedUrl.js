import { redisGetUrl } from "../services/redis/cacheShortener.js";

const getCachedUrl = async (req, res, next) => {
  const { shortUrl } = req.params;
  const result = await redisGetUrl(shortUrl);
  const keys = Object.keys(result);
  if (!(keys.length && result.longUrl)) {
    return next();
  }
  return res.redirect(result.longUrl);
};

export default getCachedUrl;
