const Pool = require('pg').Pool;


const pool = new Pool({
    user: 'postgres',
    password: 'horizon090192',
    host: 'localhost',
    port: '5432',
    database: 'tere'
});

module.exports = pool;