module.exports = {
	'googleAuth' : {
		'clientID': '815537453384-qcud3sasogm23qqggh3e8o9p02fcuqpp.apps.googleusercontent.com',
		'clientSecret': 'iOPsEhKSV7-OeSgE9frbE5pg',
		'callbackURL': 'http://localhost:8080/auth/google/callback'
	},
	'steamAuth' : {
		'api': 'F8A88B53346405184BA063443352ED11',
		'realm': 'http://localhost:8080/',
		'callbackURL': 'http://localhost:8080/auth/steam/return'
	},
	'githubAuth' : {
		'clientId': 'b3c4f197c0de55439623',
		'clientSecret': 'a201e87b93f89c0720fbe5e14f8aa813c2ac2134',
		'callbackURL': 'http://localhost:8080/auth/github/callback',
		'profileFields'   : ['emails']
	}
}