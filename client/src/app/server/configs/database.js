const dotenv = require ('dotenv')
const { Client } = require("pg");
dotenv.config({ path: '../.env' })

const client = new Client({

 user: process.env.USER_KEY,
 password: process.env.PASS_KEY1,
 host: process.env.HOST_KEY,
 port: process.env.PORT_KEY,
 database: process.env.DB_KEY

})

module.exports = client;