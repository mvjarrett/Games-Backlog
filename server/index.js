const express = require('express');
const app = express();
const cors = require('cors');
const pool = require('./db');


//middleware
app.use(cors());
app.use(express.json());

//routes//

//log game (create)

app.post('/backlog', async(req, res) => {  //append /:userid
    try {
        const { title_name } = req.body;
        const { user_id } = req.headers;
        const { sys } = req.body;
        const { genre } = req.body;
        const { played } = req.body;
        const { playing } = req.body;
        const { wishlist } = req.body;
        const newGame = await pool.query("INSERT INTO backlog (title_name, user_id, sys, genre, played, playing, wishlist) VALUES ($1, $2, $3, $4, $5, $6, $7)",
        [title_name, user_id, sys, genre, played, playing, wishlist]
    );

        res.json(newGame);
    } catch (err) {
        console.error(err.message);  
    }
})

//get all backlogged titles

app.get('/backlog', async(req, res) => {
    try {
        const allTitles = await pool.query("SELECT * FROM backlog");
        res.json(allTitles.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//get a specific backlogged title

app.get('/backlog/:game_id', async(req, res) => {
    try {
        const { game_id } = req.params;
        const allTitles = await pool.query("SELECT * FROM backlog WHERE game_id = $1", [game_id])

        res.json(allTitles.rows)
    } catch (err) {
        console.error(err.message)
    }
})

//update a backlogged title
app.put('/backlog/:game_id', async(req, res) => {
    try {
        const {game_id} = req.params;
        const {title_name} = req.body;
        const updateTitle = await pool.query("UPDATE backlog SET title_name = $1 WHERE game_id = $2",
        [title_name, game_id]
        );
        res.json('backlog was updated')
    } catch (err) {
        console.error(err.message)
    }
})

//delete an entry

app.delete('/backlog/:game_id', async (req, res) => {
    try {
        const { game_id } = req.params;
        const deleteGame = await pool.query("DELETE FROM backlog WHERE game_id = $1", 
        [game_id]);
        res.json('game was deleted!')
    } catch (err) {
        console.error(err.message)
    }
})

app.listen(5000, () => {
    console.log('server has started on port 5000');
});