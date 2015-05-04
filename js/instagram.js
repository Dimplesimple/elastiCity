var fetchPhotos = function() {

	var query_params = {
		client_id : "5557bf8c707f4d789c5cce12e28dd916",
		lat : lg,
		lng: lt
	};
	var query_string = "https://api.instagram.com/v1/locations/search?" + $.param(query_params);

	$.ajax({
		type: "GET",
		dataType: "jsonp",
		cache: false,
		url: query_string,
		success: function(data) {
			$('#instafeed').empty();
			console.log(data);
			var locations = data['data'];
			var feeds = [];
			for (loc in locations){
				var locId = parseInt(locations[loc]['id']);
				console.log(locId);
				feeds.push(new Instafeed({
					get: 'location',
			    		sortBy: 'most-liked',
					locationId: locId,
					clientId: '5557bf8c707f4d789c5cce12e28dd916'
				}));
			}
			for (feed in feeds){
				feeds[feed].run();
			}
		}
	});
};







