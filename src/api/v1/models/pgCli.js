import PG from "pg";

const SHORTENER = new PG.Pool({
    host: 'localhost',
    database: 'shortener',
    port: 5432,
});

export default SHORTENER;
