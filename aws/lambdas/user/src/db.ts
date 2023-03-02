import { Pool } from 'pg';

const pool = new Pool({
    host: "group-study-ucsb-dev.c8nxscgmv2nn.us-west-2.rds.amazonaws.com",
    port: 5432,
    user: "postgres",
    password: "RPloa9Wa04gkcmtHFwWFl",
});

export default pool;