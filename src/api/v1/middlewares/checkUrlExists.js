import { getShortUrlByLongUrl } from "../services/shortenerService.js";
import { ROOT_URL } from "../constants/constants.js";

const checkUrlExists = async (req, res, next) => {
  const { url } = req.body;
  const short = await getShortUrlByLongUrl(url);
  
  if (short.length) {
    return res
      .status(200)
      .json({ id: short[0].id, shortUrl: `${ROOT_URL}/${short[0].short_url}` });
  }
  
  return next();
};

export default checkUrlExists;
