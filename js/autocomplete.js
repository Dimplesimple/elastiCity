function setUpAutocomplete(dom, callback){
	var input = document.getElementById(dom);
	var options = {types: ['(cities)']};
	autocomplete = new google.maps.places.Autocomplete(input, options);
	google.maps.event.addListener(autocomplete, 'place_changed', function(){
		var data = autocomplete.getPlace();
		var name = data['name'];
		var geo = data['geometry']['location'];
		callback({name:data['name'],
			lg:geo['C'],
			lt:geo['j']});
	});
}

