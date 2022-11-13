const path = require ('path')
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser')
const igdbRoutes = require('./routes/igdbRoutes.js');
const backlog = require('./routes/backlogRoutes');
const users = require('./routes/userRoutes');
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

app.use(cookieParser())
app.use(bodyParser.json());
app.use(cors());



const distDir = __dirname + "../../../../dist/client/";
app.use(express.static(distDir));


// server init
const server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("Express Server is now running at port:", port);
});




//get all backlog items
app.post('/externalgames/games', bodyParser.text({type: '*/*'}), igdbRoutes.topGames)


app.get('/backlog', backlog.allBacklog)




//get a specific backlogged title
app.get('/backlog/game/:id', backlog.backlogGame)


//post new backlog item
app.post('/backlog', backlog.addBacklog)


//update game status
app.put("/backlog/game/:id", backlog.updateBacklog)


//delete a backlog item by gameId
app.delete("/backlog/game/:id", backlog.deleteBacklog)



//-----register route-----
app.post('/users/register', users.register)

//------login route-------
app.post("/users/login", users.login)

//------GSI route---------
app.post("/users/gsi", users.gsi)


app.get('/*', function(req, res) {
  res.status(200).sendFile(path.resolve(__dirname + '../../../dist/client/index.html'));
});