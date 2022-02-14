import { getLongUrlByShortUrl } from "../services/shortenerService.js";

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function pickRandomWord() {
  const WORD = "abcdefghijklmnopqrstuvwxyz0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const char = WORD[getRandomInt(WORD.length)];
  return char;
}

function _generateShortUrl(length) {
  const result = [];
  for (let i = 0; i < length; ++i) {
    result.push(pickRandomWord());
  }
  return result.join("");
}

async function generateShortUrl(length) {
  const short = _generateShortUrl(length);
  let hasUrl = await getLongUrlByShortUrl(short);
  if (hasUrl.length) {
    return await generateShortUrl(length);
  }
  return short;
}

export { generateShortUrl, _generateShortUrl, getRandomInt, pickRandomWord };
