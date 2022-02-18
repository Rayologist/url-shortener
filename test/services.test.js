import {
  redisSetUrl,
  redisDeleteUrl,
} from "../src/api/v1/services/redis/cacheShortener.js";

describe("Redis Test", () => {
  it("should return [2, true] when successfully set key/value in redis", async () => {
    const result = await redisSetUrl("0", "https://test", "test");
    expect(result[0]).toEqual(2);
    expect(result[1]).toEqual(true);
    await redisDeleteUrl("test");
  });
});
