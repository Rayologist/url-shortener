import {
  _generateShortUrl,
  getRandomInt,
  pickRandomWord,
  generateShortUrl
} from "../src/api/v1/utils/generateShortUrl.js";

describe("Test utils/generateShortUrl", () => {

  it("should return a random int greate than 0 and smaller than max", () => {
    {
      const max = 0;
      expect(getRandomInt(max)).toBeGreaterThanOrEqual(0);
      expect(getRandomInt(max)).toBeLessThanOrEqual(max);
    }

    {
      const max = 20;
      expect(getRandomInt(max)).toBeGreaterThanOrEqual(0);
      expect(getRandomInt(max)).toBeLessThanOrEqual(max);
    }
  });

  it("should return [A-Za-z0-9] ", () => {
    expect(pickRandomWord()).toMatch(/[A-Za-z0-9]/);
  });

  it("should return a string with the given length", () => {
    {
      const length = 50;
      expect(_generateShortUrl(length)).toHaveLength(length);
    }
    {
      const length = 0;
      expect(_generateShortUrl(length)).toHaveLength(length);
    }
  });

  it("should return a string with the given length", async () => {
    {
      const length = 50;
      expect(await generateShortUrl(length)).toHaveLength(length);
    }
    {
      const length = 0;
      expect(await generateShortUrl(length)).toHaveLength(length);
    }
  });
});
