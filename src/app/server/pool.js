const dotenv = require ('dotenv')
const { Pool } = require('pg');
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false
  }
});



// const pool = new Pool({    
//     user: process.env.USER_KEY,
//     password: process.env.PASS_KEY1,
//     host: process.env.HOST_KEY,
//     port: process.env.PORT_KEY,
//     database: process.env.DB_KEY
// });

module.exports = pool;
