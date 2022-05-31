const pool = require("../pool");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");



exports.register = (async (req, res) => {
 try {
  const { username } = req.body
  const { password } = req.body
  const data = await pool.query(`SELECT * FROM users WHERE username = $1;`, [username]); //Checking if user already exists
  const arr = data.rows;
  if (arr.length != 0) {
   return res.status(200).json({
    message: "username already exists.",
    exist: 1
   });
  }
  else {
   bcrypt.hash(password, 10, (err, hash) => {
    if (err)
     res.status(err).json({
      error: "Server error",
     });
    const user = {
     username,
     password: hash,
    };
    var flag = 1; //Declaring a flag
    //Inserting data into the database

    pool
     .query(`INSERT INTO users (username,  password) VALUES ($1,$2);`, [user.username, user.password], (err) => {

      if (err) {
       flag = 0; //If user is not inserted is not inserted to database assigning flag as 0/false.
       console.error(err);
       return res.status(500).json({
        error: "Database error"
       })
      }
      else {
       flag = 1;
       return res.status(200).send({ message: 'User added to database, not verified', exist: 0 });
      }
     })
    if (flag) {
     const token = jwt.sign( //Signing a jwt token
      {
       username: user.username
      },
      process.env.SECRET_KEY
     );
    };
   });
  }
 }
 catch (err) {

  console.log(err);
  res.status(500).json({
   error: "Database error while registring user!", //Database connection error
  });
 };
})



exports.login = (async (req, res) => {

 const { username, password } = req.body;
 try {
  const data = await pool.query(`SELECT * FROM users WHERE username= $1;`, [username]) //Verifying if the user exists in the database
  const user = data.rows;

  if (user.length === 0) {
   const id = data.rows[0].id;
   res.status(200).json({
    message: "User is not registered, Sign Up first",
    registered: 0
   });
  }
  else {
   bcrypt.compare(password, user[0].password, (err, result) => { //Comparing the hashed password
    if (err) {
     res.status(500).json({
      error: "Server error",
     });
    } else if (result === true) { //Checking if credentials match
     let id = data.rows[0].id;
     let payload = {
      username: username,
      id: id
     }
     const token = jwt.sign(payload, process.env.SECRET_KEY);
     const decoded = jwt.verify(token, process.env.SECRET_KEY);
     var user_id = decoded.id
     // res.cookie("jwt", token, { secure: false, httpOnly: true })
     res.status(200).json({
      message: "User signed in!",
      token: token,
      id: id
     });
     res.send()
    }
    else {
     //Declaring the errors
     if (result != true)
      res.status(400).json({
       error: "Enter correct password!",
      });
    }
   })
  }
 } catch (err) {
  console.log(err);
  res.status(500).json({
   error: "Database error occurred while signing in!", //Database connection error
  });
 };
});