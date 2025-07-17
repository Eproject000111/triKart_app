const express = require('express')
const app = express();
const session = require('express-session');
const cookieParser = require('cookie-parser');
const port = process.env.PORT;
var bodyParser = require('body-parser');
const dotenv = require('dotenv').config();
var path = require('path');
var cors = require('cors');
const { createClient } = require('redis');
const {RedisStore} = require('connect-redis');

// To access public folder
// app.use(cors())

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.json());

/* const redisClient = createClient(
	{ url: 'redis://localhost:6379',
		// legacyMode: true
		pingInterval: 1000
	}
); */
/* redisClient.connect().
then(()=>console.log('Redis connected successfully')).
catch(console.error); */


// Set up Global configuration access
(async ()=>{
  let isDBConnect = await require("./config/db")();

  console.log(isDBConnect, 'dbconn')
})()

const middlewareAuth = require("./middleware/auth");
const errorHandler = require("./middleware/errorHandler.js");

/* app.use(
	session({
	  store: new RedisStore({ client: redisClient,prefix: 'sess:' }),
	  secret: '12121212',
	  resave: false,
	  saveUninitialized: false,
	  cookie: {
		httpOnly: true,
		secure: false, // true in case of https
		sameSite: 'lax',
		maxAge: 1000 * 60 * 60 * 24 * 7, // 7 days
	  },
	})
); */

// For development
var corsOptions = {
	// origin : true,
	origin: '*',
	methods: ['GET', 'POST'],
	credentials: true, 
};  

app.use(cors(corsOptions));

app.use(bodyParser.json());

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