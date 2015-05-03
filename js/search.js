var reset = function(){
	graphReset();
	initial();
}

var name;
var lg;
var lt;

var map = function(){
	drawMap(lg,lt);

};

var venues = function(){
	addCityNode(name);
	initalizeFoursquare();
};

var instagram = function(){
	get_location_id();
};

var twitter = function(){
	getTweets(name);
}
var start = function(data){
	$('#response').show();
	$('#header').height('20%');
	initializeGraph();
	
	name = data['name'];
	lg = data['lg'];
	lt = data['lt'];
	map();
	venues();
	instagram();
	twitter();
	
}

var initial = function(){setUpAutocomplete('city-search', start)};


initial();

