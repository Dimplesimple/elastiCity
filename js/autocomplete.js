function setUpAutocomplete(dom, callback){
var input = document.getElementById(dom);
var options = {types: ['(cities)']};
autocomplete = new google.maps.places.Autocomplete(input, options);
google.maps.event.addListener(autocomplete, 'place_changed', function(){
	var data = autocomplete.getPlace();
	var name = data['name'];
	var geo = data['geometry']['location'];
    document.getElementById('city2').value = data.name;
    document.getElementById('cityLat').value = data.geometry.location.lat();
    document.getElementById('cityLng').value = data.geometry.location.lng();
	callback({name:data['name'],
		lg:geo['A'],
		lt:geo['F']})
});
}

