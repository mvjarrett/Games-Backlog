<<<<<<< HEAD
const dotenv = require ('dotenv')
dotenv.config({ path: '../.env' })

=======
>>>>>>> 8e166169a123eaedd80fecc172dc18d8bf48152d
const bcrypt = require("bcrypt");

const client = require("../configs/database");

const jwt = require("jsonwebtoken");

//Login Function
exports.login = async (req, res) => {
const { username, password } = req.body;
try {
const data = await client.query(`SELECT * FROM users WHERE username= $1;`, [username]) //Verifying if the user exists in the database
const user = data.rows;
if (user.length === 0) {
res.status(400).json({
error: "User is not registered, Sign Up first",
});
}
else {
bcrypt.compare(password, user[0].password, (err, result) => { //Comparing the hashed password
if (err) {
res.status(500).json({
error: "Server error",
});
} else if (result === true) { //Checking if credentials match
const token = jwt.sign(
{
username: username,
},
process.env.SECRET_KEY
);
res.status(200).json({
message: "User signed in!",
token: token,
});
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
};