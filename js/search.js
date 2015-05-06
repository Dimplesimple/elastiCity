var reset = function(){
	graphReset();
	// initial();
}

var name;
var lg;
var lt;

// var map = function(){
// 	drawMap(lg,lt);

// };

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
// var yelp = function(){
// 	show('#yelpResults');
//     $("#yelpResults").append('<div style="background-color: black; opacity: 0.6; color: white; text-align: center;"><h1>' + name + ' </h1><br /><br />' )
// 	var foodType = new Array("Mexican", "Chinese", "European",
// 		"American","Indian","African","Korean","Japanese");
// 	var i;
// 	for (i = 0; i < foodType.length; i++) { 
// 		getYelp(name,foodType[i]);
// 	}
// };
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
	// name = data['name'];
	// lg = data['lg'];
	// lt = data['lt'];
    name = document.getElementById('city2').value; 
    lt = document.getElementById('cityLat').value;
    lg = document.getElementById('cityLng').value;
	// console.log(lg);
	// console.log(name);
	// console.log(lt);
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
	// $('#yelp').click(function(){
		// yelp();	
	// });
	$('#infobox').click(function(){
		infobox();	
	});
    
    // reddit();
	// instagram();
	//
	
}

var initial = function(){setUpAutocomplete('city-search', start)};

initial();

// start();
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





