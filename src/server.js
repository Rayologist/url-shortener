import express from "express";
import helmet from "helmet";
import { shortener } from "./api/v1/routes.js";
import { handleRedirectShortUrl } from "./api/v1/controllers/shortener.js";
import getCachedUrl from "./api/v1/middlewares/getCachedUrl.js";

const app = express();

const PORT = process.env.PORT || 80;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(helmet());

app.use("/api/v1", shortener);
app.get("/:shortUrl", getCachedUrl, handleRedirectShortUrl);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
