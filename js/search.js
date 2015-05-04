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

function show(ele){
	
	$(ele).siblings().fadeOut(300, function(){$(ele).fadeIn(300);});
}
var venues = function(){
	show('#searchNetwork');
	addCityNode(name);
	initalizeFoursquare();
};

var instagram = function(){
	show('#instafeed');
	fetchPhotos();
};

var twitter = function(){
	show('#feed');
	getTweets(name);
};

var reddit = function(){
	show('#redditResults');
	getRedditPosts(name);
};
var start = function(data){
	$('#header').height('20%');
	initializeGraph();
	name = data['name'];
	lg = data['lg'];
	lt = data['lt'];
	//map();
	
	// venues();
	$('#photos').click(function(){
		instagram();	
	});
	$('#graph').click(function(){
		venues();	
	});
	$('#twitter').click(function(){
		twitter();	
	});
	$('#reddit').click(function(){
		reddit();	
	});
    
    reddit();
	// instagram();
	//
	
}


var initial = function(){setUpAutocomplete('city-search', start)};

initial();


$('#city-search').keyup(function(){
	clearLanding();
});

function clearLanding(){

	$('#search-space').removeClass('vertical-center');
	$('#search-space').addClass('form-group-top');
	$('.top').hide();
	$('.bottom').fadeIn(300);
	$('#result').fadeIn(300);
	

}





