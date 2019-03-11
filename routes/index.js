const express = require('express');
const router = express.Router();

router.get('/', ensureAuthenticated, function(req, res){
	res.render('index');
});

router.get('/about.json', function(req, res) {
	var time = (new Date).getTime();
	var ip = req.header('x-forwarded-for') || req.connection.remoteAddress;
	ip = ip.split(':')
	res.json({
		'client':{
			'host':ip[ip.length-1],
		},
		'server':{
			'current_time':time,
			'services':[{
				'name':'weather',
				'widgets':[{
					'name':'weather_city',
					'params':[{
						'name':'search',
						'type':'string'
					}]
				}]
			},
			{
				'name':'steam',
				'widgets':[{
					'name':'recently_played_games',
					'params':[{
						'name':'index',
						'type':'integer'
					}]
				},
				{
					'name':'get_game',
					'params':[{
						'name':'name',
						'type':'string'
					}]
				}]
			},
			{
				'name':'clash_royale',
				'widgets':[{
					'name':'upcoming_chests',
					'params':[{
						'name':'tag',
						'type':'string'
					}]
				},
				{
					'name':'clan',
					'params':[{
						'name':'tag',
						'type':'string'
					}]
				}]
			},
			{
				'name':'exchange_rate',
				'widgets':[{
					'name':'compare_currency',
					'params':[{
						'name':'from',
						'type':'string'
					},
					{
						'name':'to',
						'type':'string'
					}]
				}]
			},
			{
				'name':'google',
				'widgets':[]
			},
			{
				'name':'github',
				'widgets':[]
			}]
		}

	});
});

function ensureAuthenticated(req, res, next){
	if(req.isAuthenticated()){
		return next();
	} else {
		req.flash('error_msg','You are not logged in');
		res.redirect('/users/login');
	}
}

module.exports = router;