import { URL } from "url";

export const isValidUrl = (url) => {
  try {
    new URL(url);
    return true;
  } catch (error) {
    return false;
  }
};

export const hasExpired = (timeString) => {
  const expire = new Date(timeString);
  const now = new Date(new Date().toUTCString());
  return expire < now;
};

export const isValidTimeString = (ISOString) => {
  const dateString = new Date(ISOString).toString();
  return dateString !== "Invalid Date";
};

const validateShortener = (req, res, next) => {
  const { url, expireAt } = req.body;
  const errors = [];
  if (!isValidUrl(url)) {
    errors.push({ url: "Invalid URL" });
  }

  if (hasExpired(expireAt)) {
    errors.push({ expireAt: "Date expired" });
  }

  if (!isValidTimeString(expireAt)) {
    errors.push({ expireAt: "Invalid date format" });
  }

  if (errors.length) {
    return res.status(400).json({ errors });
  }

  return next();
};

export default validateShortener;
