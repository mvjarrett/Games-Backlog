const pool = require("./pool");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require('cors');

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
const server = app.listen(process.env.PORT || 8080, function () {
    var port = server.address().port;
    console.log("App now running on port", port);
});

app.get('/backlog', async(req, res) => {
    try {
        const allTitles = await pool.query("SELECT * FROM backlog");
        res.json(allTitles.rows)
    } catch (err) {
        console.error(err.message)
    }
})