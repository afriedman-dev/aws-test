const Pool = require('pg').Pool;
require('dotenv').config();

const { DBUSERNAME, DBPASSWORD, DBHOST, DBPORT } = process.env;

const pool = new Pool({
    user: DBUSERNAME,
    password: DBPASSWORD,
    host: DBHOST,
    port: DBPORT,
    database: 'postgres',
    ssl: {
        rejectUnauthorized: false
    }
});

module.exports = pool;