function createWidget(type) {
	const steamAPIUrl = 'http://api.steampowered.com/';
	const steamPlayerService = 'IPlayerService/';
	const steamRecentlyPlayedGames = 'GetRecentlyPlayedGames/';
	const steamOwnedGames = 'GetOwnedGames/';
	const steamVersion = 'v0001/';
	const steamFormat = 'json';

	if (type == 'RecentlyPlayed' || type == 'GetGame') {
		$.ajax({
			url: '/api/steam/userInfo',
			method: 'GET',
			dataType: 'json',
			success: function(steamInfo) {
				var urlAPI;
				var config;
				if (type == 'RecentlyPlayed') {
					urlAPI = `${steamAPIUrl + steamPlayerService + steamRecentlyPlayedGames + steamVersion}?key=${steamInfo.key}&steamid=${steamInfo.id}&count=3&format=${steamFormat}`;
					config = {value: document.getElementById('indexGame').value};
				} else if (type == 'GetGame') {
					urlAPI = `${steamAPIUrl + steamPlayerService + steamOwnedGames + steamVersion}?key=${steamInfo.key}&steamid=${steamInfo.id}&include_appinfo=1&format=${steamFormat}`;
					config = {game: document.getElementById('gameName').value};
				}
				$.ajax({
					url: `/api/createWidget?type=${type}&url=${encodeURIComponent(urlAPI)}&config=${JSON.stringify(config)}`,
					method: 'POST',
					dataType: 'json',
					success: function() {
						addWidget(type, urlAPI, config);
					}
				});
			}
		});
	} else if (type == 'ChestTracker') {
		var tagPlayer = document.getElementById('clashChests').value;
		var urlAPI = `https://api.royaleapi.com/player/${tagPlayer}/chests`
		var settings = {
			url: urlAPI,
			method: "GET",
			headers: {
				auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTg4NiwiaWRlbiI6IjQwNzUwMDE4MDA5OTgyNTY3NSIsIm1kIjp7fSwidHMiOjE1NDAxMjU2NzM2ODB9.YhTTLB7dn6lUn9VacT0csSVZwWYqNswgrqzpoVy6t1w"
			},
			dataType: 'json',
			error: function(jq, status, text){
			}
		}
		$.ajax(settings).done(function (response) {
			$.ajax({
				url: `/api/createWidget?type=${type}&url=${encodeURIComponent(urlAPI)}&config={"value":"null"}`,
				method: 'POST',
				dataType: 'json',
				success: function() {
					addWidget(type, urlAPI, null);
				}
			});
		});
	}
	else if (type == 'ClanInfo') {
		var tagClan = document.getElementById('clashClan').value;
		var urlAPI = `https://api.royaleapi.com/clan/${tagClan}`
		var settings = {
			url: urlAPI,
			method: "GET",
			headers: {
				auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTg4NiwiaWRlbiI6IjQwNzUwMDE4MDA5OTgyNTY3NSIsIm1kIjp7fSwidHMiOjE1NDAxMjU2NzM2ODB9.YhTTLB7dn6lUn9VacT0csSVZwWYqNswgrqzpoVy6t1w"
			},
			dataType: 'json',
			error: function(jq, status, text){
			}
		}
		$.ajax(settings).done(function (response) {
			$.ajax({
				url: `/api/createWidget?type=${type}&url=${encodeURIComponent(urlAPI)}&config={"value":"null"}`,
				method: 'POST',
				dataType: 'json',
				success: function() {
					addWidget(type, urlAPI, null);
				}
			});
		});
	}
	else if (type == 'CER') {
		var apiKey = 'IXZDTXNXFX8BTU52'
		var from = document.getElementById('CERFrom').value;
		var to = document.getElementById('CERTo').value;
		var urlAPI = `https://www.alphavantage.co/query?function=CURRENCY_EXCHANGE_RATE&from_currency=${from}&to_currency=${to}&apikey=${apiKey}`
		var settings = {
			url: urlAPI,
			method: "GET",
			dataType: 'json',
			error: function(jq, status, text){
			}
		}
		$.ajax(settings).done(function (response) {
			$.ajax({
				url: `/api/createWidget?type=${type}&url=${encodeURIComponent(urlAPI)}&config={"value":"null"}`,
				method: 'POST',
				dataType: 'json',
				success: function() {
					addWidget(type, urlAPI, null);
				}
			});
		});
	}
};

function getWidgets() {
	if ($('.grid-stack-inner') && $('.grid-stack-inner').data('gridstack'))
		$('.grid-stack-inner').data('gridstack').removeAll();
	$.ajax({
		url: '/api/getWidgets',
		method: 'GET',
		dataType: 'json',
		success: function(data) {
			$.each(data.widgets, function(index, widget) {
				addWidget(widget.type, widget.url, widget.config);
			});
		}
	});
}

function addWidget(type, url, config) {
	if (type == 'ChestTracker' || type == 'ClanInfo') {
		$.ajax({
			headers: {
				auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTg4NiwiaWRlbiI6IjQwNzUwMDE4MDA5OTgyNTY3NSIsIm1kIjp7fSwidHMiOjE1NDAxMjU2NzM2ODB9.YhTTLB7dn6lUn9VacT0csSVZwWYqNswgrqzpoVy6t1w"
			},
			url: url,
			method: 'GET',
			dataType: 'json',
			success: function(data) {
				printData(type, data, config);
			},
			error: function(jq, status, text) {
			}
		});
	}
	else {
		$.ajax({
			url: url,
			method: 'GET',
			dataType: 'json',
			success: function(data) {
				printData(type, data, config);
			},
			error: function(jq, status, text) {
			}
		});
	}
}

function removeWidgets() {
	$.ajax({
		url: '/api/removeWidgets',
		method: 'GET',
		dataType: 'json',
		success: function() {
			getWidgets();
		}
	});
}

function printData(type, data, config) {
	$('.grid-stack-inner').gridstack(options);
	var grid_inner = $('.grid-stack-inner').data('gridstack');
	text = '<div class="grid-stack-item"><div class="grid-stack-item-content">';
	if (type == 'GetGame' && data.response && data.response.games) {
		var object = data.response.games.find(o => config.game === o.name)
		if (object)
			text += `<h2>${object.name}</h2><img src="http://media.steampowered.com/steamcommunity/public/images/apps/${object.appid}/${object.img_logo_url}.jpg"</img><br>Total hours played : ${object.playtime_forever / 60}h`;
		else
			text += `<h2>Game not Found</h2>`
	} else if (type == 'RecentlyPlayed' && data.response && data.response.games) {
		var index = config.value;
		if (data.response.games[index])
			text += `<h2>${data.response.games[index].name}</h2><img src="http://media.steampowered.com/steamcommunity/public/images/apps/${data.response.games[index].appid}/${data.response.games[index].img_logo_url}.jpg"</img><br>Total hours played in last 2 weeks : ${data.response.games[index].playtime_2weeks / 60}h`;
	} else if (type == 'ChestTracker' && data.upcoming) {
		for (i in data.upcoming) {
			if (data.upcoming[i] == 'silver')
				text += `<img src="https://royaleapi.github.io/cr-api-assets/chests/chest-silver.png"</img><br></br>`
			else if (data.upcoming[i] == 'gold')
				text += `<img src="https://royaleapi.github.io/cr-api-assets/chests/chest-gold.png"</img><br></br>`
			else if (data.upcoming[i] == 'giant')
				text += `<img src="https://royaleapi.github.io/cr-api-assets/chests/chest-giant.png"</img><br></br>`
			else if (data.upcoming[i] == 'epic')
				text += `<img src="https://royaleapi.github.io/cr-api-assets/chests/chest-epic.png"</img><br></br>`
			else if (data.upcoming[i] == 'legendary')
				text += `<img src="https://royaleapi.github.io/cr-api-assets/chests/chest-legendary.png"</img><br></br>`
			else if (data.upcoming[i] == 'magical')
				text += `<img src="https://royaleapi.github.io/cr-api-assets/chests/chest-magical.png"</img><br></br>`
			else if (data.upcoming[i] == 'superMagical')
				text += `<img src="https://royaleapi.github.io/cr-api-assets/chests/chest-supermagical.png"</img><br></br>`
		}
	}
	else if (type == 'ClanInfo' && data.name) {
		text += `<h2>${data.name}</h2>Score : ${data.score}<br></br>Description : ${data.description}<br></br>Total Donations : ${data.donations}<br></br>Total members : ${data.memberCount}<br></br>Required Score : ${data.requiredScore}<br></br>Type : ${data.type}<br></br>`
	}
	else if (type == 'CER' && data["Realtime Currency Exchange Rate"]) {
		text += `<h2>Realtime Currency Exchange Rate</h2>From currency code : ${data["Realtime Currency Exchange Rate"]["1. From_Currency Code"]}<br></br>From currency name : ${data["Realtime Currency Exchange Rate"]["2. From_Currency Name"]}<br></br>To currency code : ${data["Realtime Currency Exchange Rate"]["3. To_Currency Code"]}<br></br>To currency name : ${data["Realtime Currency Exchange Rate"]["4. To_Currency Name"]}<br></br>Exchange Rate : ${data["Realtime Currency Exchange Rate"]["5. Exchange Rate"]}<br></br>Last Refreshed : ${data["Realtime Currency Exchange Rate"]["6. Last Refreshed"]}<br></br>Time Zone : ${data["Realtime Currency Exchange Rate"]["7. Time Zone"]}<br></br>`
	}
	else
		text += '<h2>Error</h2>'
	text += '</div></div>';
	if (text) {
		var element = jQuery(text);
		grid_inner.addWidget(element, 0, 0, 4, 4, true);
	}
}