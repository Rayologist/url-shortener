import { generateShortUrl } from "../utils/generateShortUrl.js";
import { ROOT_URL } from "../constants/constants.js";
import {
  createShortUrlByLongUrl,
  getLongUrlByShortUrl,
  deleteShortUrlByShortUrl,
} from "../services/shortenerService.js";

const handleCreateShortUrl = async (req, res) => {
  const { url, expireAt } = req.body;
  const short = await generateShortUrl(5);
  const ttl = new Date(expireAt);
  const result = await createShortUrlByLongUrl(url, short, ttl);
  if (!result.length) {
    return res.sendStatus(500);
  }
  const { id, short_url: shortUrl } = result[0];

  return res.status(200).json({ id, shortUrl: `${ROOT_URL}/${shortUrl}` });
};

const handleRedirectShortUrl = async (req, res) => {
  const { shortUrl } = req.params;
  const result = await getLongUrlByShortUrl(shortUrl);
  if (!result.length) {
    return res.sendStatus(404);
  }
  return res.redirect(302, result[0].long_url);
};

const handleDeleteShortUrl = async (req, res) => {
  const { shortUrl } = req.body;
  await Promise.all([
    deleteShortUrlByShortUrl(shortUrl),
    redisDeleteUrl(shortUrl),
  ]);
  return res.sendStatus(204);
};

export { handleCreateShortUrl, handleRedirectShortUrl, handleDeleteShortUrl };
