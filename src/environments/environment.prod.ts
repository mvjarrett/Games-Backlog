const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

export const environment = {
  production: true,
  serverUrl: 'http://localhost:' + process.env.PORT,
  headers : {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'OPTIONS, GET, POST',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
  },
};
