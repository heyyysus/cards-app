import { Pool } from 'pg';
import { DB_PASSWORD } from "./secret";

const pool = new Pool({
    host: "group-study-ucsb-dev.c8nxscgmv2nn.us-west-2.rds.amazonaws.com",
    port: 5432,
    user: "postgres",
    password: DB_PASSWORD,
});

export default pool;