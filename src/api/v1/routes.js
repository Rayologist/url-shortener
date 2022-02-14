import { Router } from "express";
import { handleCreateShortUrl } from "./controllers/shortener.js";
import checkUrlExists from "./middlewares/checkUrlExists.js";
import validateShortener from "./validations/validateShortener.js";

const router = Router();

router.post("/urls", validateShortener, checkUrlExists, handleCreateShortUrl);

export { router as shortener };
