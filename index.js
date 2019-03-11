const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const exphbs = require('express-handlebars');
const expressValidator = require('express-validator');
const flash = require('connect-flash');
const session = require('express-session');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const mongo = require('mongodb');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://mongo:27017');

var db = mongoose.connection;

const routes = require('./routes/index');
const users = require('./routes/users');
const services = require('./routes/services');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', exphbs({defaultLayout:'layout'}));
app.set('view engine', 'handlebars');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use(session({
  saveUninitialized: true,
	secret: 'dashboard',
    resave: true
}));


app.use(passport.initialize());
app.use(passport.session());

app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));

app.use(flash());
app.use(function (req, res, next) {
  res.locals.success_msg = req.flash('success_msg');
  res.locals.error_msg = req.flash('error_msg');
  res.locals.error = req.flash('error');
  res.locals.user = req.user || null;
  next();
});

app.use('/', routes);
app.use('/users', users);
app.use('/api', services);

app.get('/auth/google', passport.authenticate('google', {scope: ['profile', 'email']}));
  app.get('/auth/google/callback', passport.authenticate('google', {
                                                        successRedirect: '/users/profile',
                                                        failureRedirect: '/users/profile' }));

  app.get('/auth/steam', passport.authenticate('steam', {
    failureRedirect: '/users/profile' }), function(req, res) {
    res.redirect('/users/profile');
  });
  app.get('/auth/steam/return', passport.authenticate('steam', {
    failureRedirect: '/users/profile' }), function(req, res) {
      res.redirect('/users/profile');
    });

  app.get('/auth/github',
  passport.authenticate('github', {scope: ['profile', 'email', 'photos']}));

  app.get('/auth/github/callback',
  passport.authenticate('github', { failureRedirect: '/users/profile' }),
  function(req, res) {
    // Successful authentication, redirect home.
    res.redirect('/users/profile');
  });

app.set('port', (process.env.PORT || 8080));
app.listen(app.get('port'),function(){
	console.log('Server started on port '+app.get('port'));
});