import pg from "pg";
import dotenv from "dotenv";

dotenv.config();

const {Pool} = pg;

const pool = new Pool({
    host: process.env.PGHOST,
    port: process.env.PGPORT,
    database: process.env.PGDATABASE,
    user: process.env.PGUSER,
    password: process.env.PGPASSWORD,
});

pool.on("connect", () => {
  console.log("Connected to PostgreSQL:", process.env.PGDATABASE);
});

export const query = (text, params) => pool.query(text, params);

export default pool;