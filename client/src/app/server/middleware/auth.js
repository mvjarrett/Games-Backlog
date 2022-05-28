const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config({ path: ".env" });


exports.verify = function (req, res, next) {
 let token = req.headers["jwt"]
// console.log('token: ', token)
// console.log('header: ', req.headers.jwt)

 if (!token) {

  return res.status(403).send()
 }

let payload
 try {
  payload = jwt.verify(token, process.env.SECRET_KEY),
console.log('payload is: ', payload)

  // req.userId = data.id;
  // return next()
  next()
 }
 catch (e) {
  //if an error occured return request unauthorized error
  return res.status(401).send()
 }
}