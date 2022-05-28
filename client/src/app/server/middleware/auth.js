const jwt = require("jsonwebtoken");

const dotenv = require("dotenv");
dotenv.config({ path: ".env" });


exports.verify = function (req, res, next) {
 let token = req.headers["jwt"]
 //if there is no token stored in cookies, the request is unauthorized
 if (!token) {

  return res.status(403).send()
 }

let payload
 try {
  payload = jwt.verify(accessToken, process.env.SECRET_KEY)
  // const data = jwt.verify(token, process.env.SECRET_KEY)
  // req.userId = data.id;
  // return next()
  next()
 }
 catch (e) {
  //if an error occured return request unauthorized error
  return res.status(401).send()
 }
}