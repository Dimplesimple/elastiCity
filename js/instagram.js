

var load = function(address){
	var geocoder = new google.maps.Geocoder();

	geocoder.geocode( { 'address': address}, function(results, status) {
		if (status == google.maps.GeocoderStatus.OK) {
			var lat = results[0].geometry.location.lat();
			var lng = results[0].geometry.location.lng();
			console.log("Latitiude:" + lat);
			console.log("Long:" + lng);

			get_location_id(lat,lng);
		} 
	}); 


}


var get_location_id = function() {

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
			for (loc in locations){
				var locId = parseInt(locations[loc]['id']);
				console.log(locId);
				var feed = new Instafeed({
					get: 'location',
			    		sortBy: 'most-liked',
					locationId: locId,
					clientId: '5557bf8c707f4d789c5cce12e28dd916'
				});
				
					feed.run();

			}
		}
	});
};







