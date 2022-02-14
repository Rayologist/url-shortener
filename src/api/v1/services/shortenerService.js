import SHORTENER from "../models/pgCli.js";

async function createShortUrlByLongUrl(original, shortened, ttl) {
  const result = await SHORTENER.query(
    `INSERT INTO shortener (long_url, short_url, ttl)
     VALUES ($1, $2, $3)
     RETURNING id, short_url
    `,
    [original, shortened, ttl]
  );
  return result.rows;
}

async function getLongUrlByShortUrl(shortUrl) {
  const result = await SHORTENER.query(
    `SELECT * FROM shortener
    WHERE short_url = $1 
    AND ttl > $2; 
    `,
    [shortUrl, new Date(new Date().toUTCString())]
  );
  return result.rows;
}

async function getShortUrlByLongUrl(longUrl) {
  const result = await SHORTENER.query(
    `SELECT * FROM shortener
     WHERE long_url = $1
     AND ttl > $2; 
    `,
    [longUrl, new Date(new Date().toUTCString())]
  );
  return result.rows;
}

async function deleteShortUrlById(id) {
  const result = await SHORTENER.query(
    `DELETE FROM shortener
     WHERE id = $1
    `,
    [id]
  );
  return result.rows;
}

export {
  createShortUrlByLongUrl,
  getLongUrlByShortUrl,
  getShortUrlByLongUrl,
  deleteShortUrlById,
};
