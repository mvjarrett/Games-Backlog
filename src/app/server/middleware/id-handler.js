// // const jwt = require("jsonwebtoken");

// const dotenv = require("dotenv");
// dotenv.config({ path: ".env" });


// exports.addId = function (req, res, next) {
//  let intHeader = req.headers["jwt"]
//  if (!intHeader) {

//   return res.status(403).send()
//  }

//  try {
//   req.headers.set('test', 'test')
//   next()
//  }
//  catch (e) {
//   //if an error occured return request unauthorized error
//   return res.status(401).send()
//  }
// }