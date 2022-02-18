import { generateConfig as pgGenerateConfig } from "../src/api/v1/models/pgCli.js";
import { generateConfig as redisGenerateConfig } from "../src/api/v1/models/redisCli.js";

describe("Test generateConfig", () => {
  it("should return postgres config in production", () => {
    const original = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";

    const config = pgGenerateConfig();

    expect(config).toHaveProperty("host");
    expect(config).toHaveProperty("user");
    expect(config).toHaveProperty("database");
    expect(config).toHaveProperty("password");
    expect(config).toHaveProperty("port");

    process.env.NODE_ENV = original;
  });

  it("should return redis config in production", () => {
    const original = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";

    const config = redisGenerateConfig();

    expect(config).toHaveProperty("url");

    process.env.NODE_ENV = original;
  });
});
