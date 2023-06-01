const pool = require("../pool");

const dotenv = require("dotenv");

dotenv.config({ path: ".env" });

const { verify } = require('../middleware/auth');
const { query } = require("express");


exports.allBacklog = (async (req, res) => {
 try {
  const { user_id } = req.headers;
  const allTitles = await pool.query("SELECT * FROM backlog WHERE user_id = $1", [user_id]);
  res.json(allTitles.rows);
 } catch (err) {
  console.error('no user ID header detected!');
 }
});

exports.backlogGame = (async (req, res) => {
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


exports.addBacklog = (async (req, res) => {
 try {
  const { user_id } = req.headers;
  const { id } = req.body;
  const { category } = req.body
  const newGame = await pool.query(
   "INSERT INTO backlog ( user_id, id, category) VALUES ($1, $2, $3) RETURNING *",
   [user_id, id, category]
  );

  res.json(newGame.rows[0]);
 } catch (err) {
  console.error(err.message);
 }
});

exports.updateBacklog = (async (req, res) => {
 const { id } = req.params;
 const { user_id } = req.headers;
 const { category } = req.body
 try {
  const { updateStatus } = await pool.query(
   "UPDATE backlog SET category = $1 WHERE user_id = $2 AND id = $3",
   [category, user_id, id]
  );
  res.json(category)
 } catch (err) {
  console.error(err.message);
 }
});

exports.deleteBacklog = (async (req, res) => {
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

