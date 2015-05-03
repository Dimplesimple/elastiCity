var oauth_token = 'FCA435RS4PUW2DEDZHICXYRPCCDITIJZ35OINI23ZILD1TFJ';
var v =  20150430;
var radius = 20000;
function getVenues(category){
	var query = $.param({
		ll: lg+","+lt,
		v:v,
	    oauth_token:oauth_token,
		section: category
	});
	var url = "https://api.foursquare.com/v2/venues/explore?";
	$.get(url+query, function(data){
		var venues = data['response']['groups'][0]['items'];
		for (venue in venues){
			addVenueNode(venues[venue]['venue']['name'],category);
		}
	});

}

function getCategories(callback){
	var query_string = "https://api.foursquare.com/v2/venues/categories?" + $.param({oauth_token:oauth_token,v:v});
	$.get(query_string, function(data){
		console.log(data);
		var cats = data['response']['categories'];
		for (cat in cats){
			var catName = cats[cat]['name'];
			addCategoryNode(catName);
			getVenues(catName);

		}

	})

}

function initalizeFoursquare(){
	getCategories(function(data){
		addCategoryNode(data);
		getVenues(data);
	});
}



