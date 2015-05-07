$('#search').keyup(function(){
	clearLanding();
});


setUpAutocomplete('search', function(data){
	var name = data['name'];
	var lg = data['lg'];
	var lt = data['lt'];
	console.log(lg);
	load(name,lg,lt);
});

function clearLanding(){
	$('#search').removeClass('vertical-center');
	$('.top').hide();
	$('.bottom').fadeIn(300);
	$('#result').fadeIn(300);
}

function bottom(){
	$.get('menu.html', function(data){$('#menu').append(data)});
}
/*

function show(ele){
	
	$(ele).siblings().fadeOut(300, function(){$(ele).fadeIn(300);});
}
var venues = function(lt, lg){
	show('#searchNetwork');
	addCityNode(name);
	initalizeFoursquare(lt, lg);
};

var instagram = function(){
	show('#instafeed');
	fetchPhotos();
};

var twitter = function(){
	show('#feed');
	getTweets(name);
};

var wiki = function(){
	show('#wikiResults');
	getWikiData(name);
};
var yelp = function(){
	show('#yelpResults');
	var foodType = new Array("Mexican", "Chinese", "European",
		"American","Indian","African","Korean","Japanese");
	var i;
	for (i = 0; i < foodType.length; i++) { 
		getYelp(name,foodType[i]);
	}
};
var reddit = function(){
	show('#redditResults');
	getRedditPosts(name);
};
var infobox = function(){
	show('#infoboxResults');
	getInfoboxData(name);
};
var start = function(){
	$('#header').height('20%');
	initializeGraph();
    name = document.getElementById('city2').value; 
    lt = document.getElementById('cityLat').value;
    lg = document.getElementById('cityLng').value;
    generateThumb(lt,lg);
    document.getElementById('weather-thumb').style.display='block';
	// map();
	
	venues(lg, lt);
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
	$('#wiki').click(function(){
		wiki();	
	});
	$('#yelp').click(function(){
		yelp();	
	});
	$('#infobox').click(function(){
		infobox();	
	});
    
	
}

var initial = function(){setUpAutocomplete('city-search', start)};

initial();

$('#city-search').keyup(function(){
	clearLanding();
});


*/





