const pool = require("../pool");

const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const { verify } = require('../middleware/auth');


exports.allBacklog = (verify, async (req, res) => {
 try {
  const { user_id } = req.headers;
  const allTitles = await pool.query("SELECT * FROM backlog WHERE user_id = $1", [user_id]);
  res.json(allTitles.rows);
 } catch (err) {
  console.error(err.message);
 }
});

exports.backlogGame = (verify, async (req, res) => {
 try {
  const { id } = req.params;
  const { user_id } = req.headers;
  const allTitles = await pool.query("SELECT * FROM backlog WHERE id = $1 AND user_id = $2", [
   id, user_id
  ]);

  res.json(allTitles.rows);
 } catch (err) {
  console.error(err.message);
 }
});


exports.addBacklog = (verify, async (req, res) => {
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

exports.updateBacklog = (verify, async (req, res) => {
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

exports.deleteBacklog = (verify, async (req, res) => {
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

