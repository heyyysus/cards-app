import { Pool, PoolConfig } from "pg";
import * as dotenv from "dotenv";
dotenv.config()

const host = process.env.POSTGRES_HOST || "localhost";
const port = parseInt(process.env.POSTGRES_PORT) || 5432;
const db_name = process.env.POSTGRES_DB || "postgres";
const user = process.env.POSTGRES_USER || "postgres";
const password = process.env.POSTGRES_PASSWORD || "postgres";

const pool_config: PoolConfig = {
    host: host,
    port: port,
    database: db_name,
    user: user,
    password: password,
};

const pool = new Pool(pool_config);

export default pool;