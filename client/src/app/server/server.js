const pool = require("./pool");

const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const cookieParser = require('cookie-parser')
dotenv.config({ path: ".env" });
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { verify } = require('./middleware/auth')
const app = express();
var corsOptions = {
  origin: "*",
  credentials: true
};

//middleware
app.use(cookieParser())
app.use(bodyParser.json());
app.use(cors(corsOptions));
// app.use("/user", user);  //Route for /user endpoint of API
// Create link to Angular build directory
// The `ng build` command will save the result
// under the `dist` folder.
const distDir = __dirname + "/dist/";
app.use(express.static(distDir));

// server init
const server = app.listen(8080, function () {
  var port = server.address().port;
  console.log("App now running on port", port);
});

// server.listen(port, () => {console.log("server started on port : " + port)})


app.use(function (req, res, next) {
  // res.setHeader("Access-Control-Allow-Origin", "https://localhost:8080");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("client_id", process.env.AUTH_ID);
  res.setHeader("Authorization", process.env.AUTH_TOKEN);
  next();
});

// app.get("https://api.igdb.com/v4/games", verify, function (req, res) {
//   console.log(res.json);
// });

//IGDB API ROUTES ABOVE
//POSTGRES ROUTES BELOW

//get all backlog items
app.get("/backlog", verify, async (req, res) => {
  try {
    const allTitles = await pool.query("SELECT * FROM backlog");
    res.json(allTitles.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a specific backlogged title
app.get("/backlog/game/:id", verify, async (req, res) => {
  try {
    const { id } = req.params;
    const allTitles = await pool.query("SELECT * FROM backlog WHERE id = $1", [
      id,
    ]);

    res.json(allTitles.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//post new backlog item

app.post("/backlog", verify, async (req, res) => {
  try {
    const { user_id } = req.headers;
    const { id } = req.body;
    const { played } = req.body;
    const { playing } = req.body;
    const { wishlist } = req.body;
    const newGame = await pool.query(
      "INSERT INTO backlog ( user_id, id, played, playing, wishlist) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [user_id, id, played, playing, wishlist]
    );

    res.json(newGame.rows[0]);
  } catch (err) {
    console.error(err.message);
  }
});

//update game status
app.put("/backlog/game/:id", verify, async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.headers;
  const { played } = req.body;
  const { playing } = req.body;
  const { wishlist } = req.body;
  try {
    const { updateStatus } = await pool.query(
      "UPDATE backlog SET played = $1, playing = $2, wishlist = $3 WHERE user_id = $4 AND id = $5",
      [played, playing, wishlist, user_id, id]
    );
    res.json(updateStatus)
  } catch (err) {
    console.error(err.message);
  }
});

//update a backlogged title
app.put("/backlog/:log_id", verify, async (req, res) => {
  try {
    const { log_id } = req.params;
    const { title_name } = req.body;
    const updateTitle = await pool.query(
      "UPDATE backlog SET title_name = $1 WHERE id = $2",
      [title_name, log_id]
    );
    res.json("backlog was updated");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a backlog item
app.delete("/backlog/:log_id", verify, async (req, res) => {
  try {
    const { log_id } = req.params;
    const deleteGame = await pool.query(
      "DELETE FROM backlog WHERE log_id = $1",
      [log_id]
    );
    res.json("game was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});

//delete a backlog item by gameId
app.delete("/backlog/game/:id", verify, async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.headers;
  try {
    const deleteGame = await pool.query(
      "DELETE FROM backlog WHERE id = $1 AND user_id = $2",
      [id, user_id]);
    res.json("game was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});


//----auth routes below----
app.post("/users/register", async (req, res) => {
  console.log('route test')
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


app.post("/users/login", async (req, res) => {
  console.log('route test')
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
          const token = jwt.sign(payload, process.env.SECRET_KEY, { expiresIn: process.env.ACCESS_TOKEN_LIFE });
          // res.cookie("jwt", token, { secure: false, httpOnly: true })
          res.status(200).json({
            message: "User signed in!",
            token: token
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
// app.post("/signup", async (req, res) => {
//   try {
    // const { user_id } = req.body;
    // const { password } = req.body;
    // const newUser = await pool.query(
//       "INSERT INTO users (user_id, password) VALUES($1, $2)",
//       [user_id, crypt(password, gen_salt('bf'))]
//     );

//     res.json("Account Created!");
//   } catch (err) {
//     console.error(err.message);
//   }
// });