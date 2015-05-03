var reset = function(){
	graphReset();
	initial();
}

var name;
var lg;
var lt;

var venues = function(){
	addCityNode(name);
	initalizeFoursquare();
	$("#searchNetwork").show();
	$( "#city-search" ).change(reset);
};

var instagram = function(){
	get_location_id();
};

var start = function(data){
	$('#navlist').show();
	$('#instagram').show();
	$('#venues').show();
	$("#infobox").show();

	$('#title').hide();
	$('#logo').hide();
	$('#header').height('20%');

	name = data['name'];
	lg = data['lg'];
	lt = data['lt'];
	venues();
	instagram();


	
}

var initial = function(){setUpAutocomplete('city-search', start)};


initial();

