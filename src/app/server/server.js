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


const server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("Express Server is now running at port:", port);
});



app.post('/externalgames/games', bodyParser.text({type: '*/*'}), igdbRoutes.topGames)

//get all backlog items
app.get('/backlog', backlog.allBacklog)


//get genres for navbar
app.post('/externalgames/genres', bodyParser.text({type: '*/*'}), igdbRoutes.getGenres)

//get platforms for navbar
app.post('/externalgames/platforms', bodyParser.text({type: '*/*'}), igdbRoutes.getPlatforms)

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

app.use(express.static(distDir));




// app.get('*', function(req, res) {
//   res.sendFile(path.join(distDir + 'index.html'));
// });

