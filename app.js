const express = require('express')
const app = express();
const port = process.env.PORT;
var bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
var path = require('path');
var cors = require('cors');

// To access public folder
app.use(cors())
app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// app.use(express.json());

// Set up Global configuration access
(async ()=>{
  let isDBConnect = await require("./config/db")();

  console.log(isDBConnect, 'dbconn')
})()
const middlewareAuth = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler.js");

//   //Call Main Routes
const mainRouter = express.Router();
const mainRoutes = require('./routes/index.js')(mainRouter,middlewareAuth);
app.use('/app', mainRoutes);

app.use(errorHandler.ErrorHandler);

app.listen((process.env.PORT || 8081), () => {
  console.log(`Example app listening on port ${process.env.PORT}!`)
});

process.on('SIGINT', async () => {
  console.log('🔴 Closing MongoDB connection...');
  await mongoose.connection.close();
  process.exit(0);
});