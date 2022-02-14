import app from "../src/server";
import request from "supertest";
import { deleteShortUrlById } from "../src/api/v1/services/shortenerService.js";

describe("POST Endpoints", () => {
  describe("Post /api/v1/urls", () => {
    it("should return id and short url", async () => {
      const res = await request(app).post("/api/v1/urls").send({
        url: "https://www.dcard.tw/f",
        expireAt: "9999-02-08T09:20:41Z",
      });

      expect(res.body).toHaveProperty("id");
      expect(res.body).toHaveProperty("shortUrl");
      await deleteShortUrlById(res.body.id);
    });

    it(`should return error {"errors": [{"url": "Invalid URL"}]}`, async () => {
      const res = await request(app).post("/api/v1/urls").send({
        url: "1https://www.dcard.tw/f",
        expireAt: "9999-02-08T09:20:41Z",
      });
      expect(res.body).toHaveProperty("errors");
      expect(res.body.errors[0]).toHaveProperty("url", "Invalid URL");
    });

    it(`should return error {"errors": [{"expireAt": "Date expired"}]}`, async () => {
      const res = await request(app).post("/api/v1/urls").send({
        url: "https://www.dcard.tw/f",
        expireAt: "1970-02-08T09:20:41Z",
      });
      expect(res.body).toHaveProperty("errors");
      expect(res.body.errors[0]).toHaveProperty("expireAt", "Date expired");
    });

    it(`should return error {"errors": [{"expireAt": "Date expired"}]}`, async () => {
      const res = await request(app).post("/api/v1/urls").send({
        url: "https://www.dcard.tw/f",
        expireAt: "2030-0208T09:20:41Z",
      });
      expect(res.body).toHaveProperty("errors");
      expect(res.body.errors[0]).toHaveProperty(
        "expireAt",
        "Invalid date format"
      );
    });
  });
});

describe("GET Endpoints", () => {
  describe("GET /:shortUrl", () => {
    it("should redirect to long url given short url", async () => {
      const postRes = await request(app).post("/api/v1/urls").send({
        url: "https://www.dcard.tw/f",
        expireAt: "9999-02-08T09:20:41Z",
      });

      expect(postRes.body).toHaveProperty("id");
      expect(postRes.body).toHaveProperty("shortUrl");

      const shortUrl = new URL(postRes.body.shortUrl).pathname.substring(1);

      const getRes = await request(app).get(`/${shortUrl}`);
      expect(getRes.statusCode).toEqual(302);
    });

    it("should return 404 not found", async () => {
      const getRes = await request(app).get("/a");
      expect(getRes.statusCode).toEqual(404);
    });
  });
});
