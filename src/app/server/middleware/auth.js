const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config({ path: ".env" });


exports.verify = function (req, res, next) {
 let token = req.headers["jwt"]


 if (!token) {
  console.error('there is a token issue')
  return res.status(403).send()
 }

let payload
 try {
  payload = jwt.verify(token, process.env.SECRET_KEY),
  next()
 }
 catch (e) {
  //if an error occured return request unauthorized error
  return res.status(401).send()
 }
}