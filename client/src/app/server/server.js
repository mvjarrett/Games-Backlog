const pool = require("./pool");
const express = require("express");
const bodyParser = require("body-parser");
// const unirest = require("unirest");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

const app = express();

// Define the JSON parser as a default way
// to consume and produce data through the
// exposed APIs
//middleware
app.use(bodyParser.json());
app.use(cors());

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

app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.setHeader("client_id", process.env.AUTH_ID);
  res.setHeader("Authorization", process.env.AUTH_TOKEN);
  next();
});

app.get("https://api.igdb.com/v4/games", function (req, res) {
  console.log(res.json);
});

//IGDB API ROUTES ABOVE
//POSTGRES ROUTES BELOW

//get all backlog items
app.get("/backlog", async (req, res) => {
  try {
    const allTitles = await pool.query("SELECT * FROM backlog");
    res.json(allTitles.rows);
  } catch (err) {
    console.error(err.message);
  }
});

//get a specific backlogged title
app.get("/backlog/game/:id", async (req, res) => {
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

app.post("/backlog", async (req, res) => {
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
app.put("/backlog/game/:id", async (req, res) => {
  const { id } = req.params;
  const { user_id } = req.body;
  const { played } = req.body;
  const { playing } = req.body;
  const { wishlist } = req.body;
  try {
    const { updateStatus } = await pool.query(
      "UPDATE backlog SET played = $1, playing = $2, wishlist = $3 WHERE user_id = $4",
      [played, playing, wishlist, user_id]
    );
    res.json(updateStatus);
  } catch (err) {
    console.error(err.message);
  }
});

//update a backlogged title
app.put("/backlog/:log_id", async (req, res) => {
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
app.delete("/backlog/:log_id", async (req, res) => {
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
app.delete("/backlog/game/:id", async (req, res) => {
  const { id } = req.params;
  const {user_id} = req.headers;
  try {
    const deleteGame = await pool.query(
      "DELETE FROM backlog WHERE id = $1 AND user_id = $2", 
    [id, user_id]);
    res.json("game was deleted!");
  } catch (err) {
    console.error(err.message);
  }
});
