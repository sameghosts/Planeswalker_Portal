require('dotenv').config();
const express = require('express');
const layouts = require('express-ejs-layouts');
const session = require('express-session');
const flash = require('connect-flash');
const axios = require('axios');
const passport = require('./config/ppConfig');
const isLoggedIn = require('./middleware/isLoggedIn');
const helmet = require('helmet');

const app = express();

app.set('view engine', 'ejs');

app.use(require('morgan')('dev'));
app.use(express.urlencoded({ extended: false }));
app.use(express.static(__dirname + '/public'));
app.use(layouts);

app.use(helmet());
app.use(
  helmet.contentSecurityPolicy({
    directives: {
      "default-src": ["'self'", "*.wizards.com"],
      "img-src": ["'self'", "*.wizards.com"]

    }
  })
)


app.use(session({
  secret: process.env.SESSION_SECRET, //should be an ev variable
  resave: false,
  saveUninitialized: true
}));

//Intialize Passport config - MUST HAPPEN AFTER SESSION CONFIGURATION!!!!!
app.use(passport.initialize());
app.use(passport.session());

//initialize flash connect, MUST GO AFTER THE SESSION MIDDLEWARE
app.use(flash());

// Write custom middleware to access the user on every response
app.use((req, res, next) => {
  let alerts = req.flash();
  console.log(alerts);
  res.locals.alerts = alerts;
  res.locals.currentUser = req.user;
  next();
});

app.get('/', (req, res) => {
  // console.log(req.user);
  res.render('index');
});

app.get('/profile', isLoggedIn, (req, res) => {
  res.render('profile');
});

app.use('/search', require('./routes/cards'))
app.use('/auth', require('./routes/auth'));
app.use('/user', require('./routes/user'));
app.use('/deck', require('./routes/decks'));

var server = app.listen(process.env.PORT || 3000, ()=> console.log(`🎧You're listening to the smooth sounds of port ${process.env.PORT || 3000}🎧`));

module.exports = server;

//heres a comment to test branches

