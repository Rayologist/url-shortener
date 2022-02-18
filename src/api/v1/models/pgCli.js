import PG from "pg";

export const generateConfig = () => {
  if (process.env.NODE_ENV === "production") {
    return {
      host: "postgres",
      user: "shortener",
      database: "shortener",
      password: "secret",
      port: 5432,
    };
  }
  return {
    host: "localhost",
    database: "shortener",
    port: 5432,
  };
};

const SHORTENER = new PG.Pool(generateConfig());

export default SHORTENER;
