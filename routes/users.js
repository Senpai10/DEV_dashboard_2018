const express = require('express');
const router = express.Router();
const passport = require('passport');
var LocalStrategy = require('passport-local').Strategy;
var GoogleStrategy = require('passport-google-oauth').OAuth2Strategy;
var SteamStrategy = require('passport-steam').Strategy;
var GitHubStrategy = require('passport-github').Strategy;
var configAuth = require('../auth');

var User = require('../models/user');

router.get('/register', function(req, res) {
  res.render('register');
});

router.get('/login', function(req, res) {
  res.render('login');
});

router.get('/profile', function(req, res) {
  res.render('profile');
});

router.post('/register', function(req, res) {
  var name = req.body.name;
  var email = req.body.email;
  var username = req.body.username;
  var password = req.body.password;
  var password2 = req.body.password2;

  req.checkBody('name', 'Name is required').notEmpty();
  req.checkBody('email', 'Email is required').notEmpty();
  req.checkBody('email', 'Email is not valid').isEmail();
  req.checkBody('username', 'Username is required').notEmpty();
  req.checkBody('password', 'Password is required').notEmpty();
  req.checkBody('password2', 'Passwords do not match').equals(req.body.password);
var errors = req.validationErrors();

	if(errors){
		res.render('register',{
			errors:errors
		});
	} else {
		var newUser = new User({
			name: name,
			email: email,
			username: username,
			password: password
		});
	 User.createUser(newUser, function(err, user){
      if(err) throw err;
    });

    req.flash('success_msg', 'You are registered and can now login');

    res.redirect('/users/login');
  }
});

passport.use (new LocalStrategy(
  function(username, password, done) {
    User.getUserByUsername(username, function(err, user) {
      if (err) throw err;
      if (!user) {
        return done(null, false, {message: 'Unknown User'});
      }

      User.comparePassword(password, user.password, function(err, isMatch){
        if (err) throw err;
        if (isMatch) {
          return done(null, user);
        } else {
          return done(null, false, {message: 'Invalid password'});
        }
      });
    });
  }));

  passport.use(new GoogleStrategy({
  clientID: configAuth.googleAuth.clientID,
  clientSecret: configAuth.googleAuth.clientSecret,
  callbackURL: configAuth.googleAuth.callbackURL,
  passReqToCallback: true
  },
  function(req, accessToken, refreshToken, profile, done) {
    process.nextTick(function(){
        User.findOne({'username': req.user.username}, function(err, user){
	if(err)
	  return done(err);
	if(user) {
	  req.user.google.id = profile.id;
	  req.user.google.token = accessToken;
	  req.user.google.name = profile.displayName;
	  req.user.google.email = profile.emails[0].value;
	  req.user.save(function(err){
	  if(err)
	    throw err;
	    return done(null, req.user);
	  })
            }
            else {
              return done(null, user);
            }
	    		});
	    	});
	    }
	));

	passport.use(new SteamStrategy({
    returnURL: configAuth.steamAuth.callbackURL,
    realm: configAuth.steamAuth.realm,
		apiKey: configAuth.steamAuth.api,
		passReqToCallback: true
  },
  function(req, identifier, profile, done) {
	process.nextTick(function(){
    		User.findOne({'username': req.user.username}, function (err, user) {
			if(err)
				return done(err);
			if(user) {
				req.user.steam.id = profile.id;
				req.user.steam.displayName = profile.displayName;
				req.user.steam.photos = profile.photos[2].value;
				req.user.save(function(err){
				if(err)
					throw err;
				return done(null, req.user);
				})
        		} else {
        	      		return done(null, user);
        	    	}
		});
	});
   }
));

passport.use(new GitHubStrategy({
  clientID: configAuth.githubAuth.clientId,
  clientSecret: configAuth.githubAuth.clientSecret,
  callbackURL: configAuth.githubAuth.callbackURL,
  profileFields: configAuth.githubAuth.profileFields,
  passReqToCallback: true
},
function(req, accessToken, refreshToken, profile, done) {
  process.nextTick(function(){
    User.findOne({'username': req.user.username}, function (err, user) {
      if(err)
        return done(err);
      if(user) {
            req.user.github.id = profile.id;
            req.user.github.username = profile.username;
            req.user.github.displayName = profile.displayName;
            req.user.github.email = profile.emails[0].value;
            req.user.github.profile = profile.profileUrl;
            req.user.github.photos = profile.photos[0].value;
            req.user.save(function(err){
              if(err)
                throw err;
              return done(null, req.user);
            })
          }
          else {
            return done(null, user);
          }
        });
      });
    }
));

passport.serializeUser(function(user, done){
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  User.findById(id, function(err, user) {
    done(err, user);
  });
});
router.post(
  '/login',
  passport.authenticate(
    'local',
    {
      successRedirect: '/',
      failureRedirect: '/users/login',
      failureFlash: true
    }),
  function(req, res) {
    res.redirect('/');
  });

router.get('/logout', function(req, res){
  req.logout();
  req.flash('success_msg', 'You are logged out');
  res.redirect('/users/login');
});

module.exports = router;