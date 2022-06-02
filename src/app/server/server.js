const path = require ('path')
const express = require("express");
const app = express();
const cors = require("cors");
const cookieParser = require('cookie-parser')
const backlog = require('./routes/backlogRoutes');
const users = require('./routes/userRoutes');
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
dotenv.config({ path: ".env" });

// function requireHTTPS(req, res, next) {
//   // The 'x-forwarded-proto' check is for Heroku
//   if (!req.secure && req.get('x-forwarded-proto') !== 'https') {
//       return res.redirect('https://' + req.get('host') + req.url);
//   }
//   next();
// }

//middleware
// var corsOptions = {
//   origin: 'http://localhost:4200',
//   methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
//    credentials:true, 
//   optionsSuccessStatus: 200
// }
app.use(cookieParser())
app.use(bodyParser.json());
app.use(cors());

// app.get('/*', (req, res) => {
//   res.sendFile('index.html', { root: '../../../../dist/client' });
// });

// app.use(express.static('./dist/client/'));

const distDir = __dirname + "../../../../dist/client/";
app.use(express.static(distDir));


// server init
const server = app.listen(process.env.PORT || 8080, function () {
  var port = server.address().port;
  console.log("Express Server is now running at port:", port);
});



// app.use(function (req, res, next) {
//   req.headers[authHeaderClient] = process.env.AUTH_ID;
//   req.headers[authHeaderToken] = process.env.AUTH_TOKEN;

//   next();
// });



//get all backlog items
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

//------login route------
app.post("/users/login", users.login)

app.get('*', function(req, res) {
  res.status(200).sendFile(path.resolve(__dirname + '../../../../dist/client/index.html'));
});