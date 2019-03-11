const express = require('express');
const router = express.Router();
const configAuth = require('../auth');
var Widget = require('../models/widget');
var User = require('../models/user');

router.get('/steam/userInfo', function(req, res) {
  if (req.user && req.user.steam) {
    res.json({id: req.user.steam.id,
    key: configAuth.steamAuth.api,
    name: req.user.steam.displayName});
  } else {
    res.send({error: "You are not logged."});
  }
});

router.get('/weatherWidget', function(req, res) {
  res.render('weather');
});

router.post('/createWidget', function(req, res) {
  if (!req.user) {
    res.send({error: "You are not logged in."});
  }
  var data = req.query;
  var newWidget = new Widget({
    type: data.type,
    url: data.url,
    config: JSON.parse(data.config)
  });
  User.findOne({'username': req.user.username}, function(err, user) {
    if (err) throw err;
      if (user) {
	req.user.widgets.push(newWidget);
	req.user.save(function(err) {
	  if (err)
	    throw err;
	});
      }
  });
  res.send({});
});

router.get('/getWidgets', function(req, res) {
	if (!req.user) {
		res.send({error: "You are not logged in."});
	}
	res.json({widgets: req.user.widgets});
});

router.get('/removeWidgets', function(req, res) {
	if (!req.user) {
		res.send({error: "You are not logged in."});
	}
	req.user.widgets = [];
	req.user.save(function(err) {
		if (err)
			throw err;
	});
	res.send({});
});

module.exports = router;