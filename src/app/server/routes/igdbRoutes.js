const axios = require('axios').default;
const path = require('path')
const dotenv = require("dotenv");
dotenv.config({ path: "./env" });
const { verify } = require('../middleware/auth');




exports.topGames = (verify, async (req, res) => {
  const authHeaders = {
    headers: {
      'Client-ID': process.env.AUTH_ID,
      'Authorization': process.env.AUTH_TOKEN
    }
  }
  try{
  let response = await axios.post('https://api.igdb.com/v4/games/', req.body, authHeaders);
  res.send(response.data);
  } catch (err) {
    console.log('axios error: ', err)
    res.send(400)
  }
})



