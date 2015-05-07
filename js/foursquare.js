var oauth_token = 'FCA435RS4PUW2DEDZHICXYRPCCDITIJZ35OINI23ZILD1TFJ';
var v =  20150430;
var radius = 20000;
function getVenues(catId, lg, lt, callback){
	console.log(lg);
	var query = $.param({
		ll: lt+","+lg,
		v:v,
	    	oauth_token:oauth_token,
	    	categoryId: catId
	});
	var url = "https://api.foursquare.com/v2/venues/explore?";
	$.get(url+query, function(data){
		var venues = data['response']['groups'][0]['items'];
		for (venue in venues){
			console.log(venue);
			callback(venues[venue]['venue']['name']);
			//addVenueNode(venues[venue]['venue']['name'],category);
		}
	});

}

function getCategories(callback){
	var query_string = "https://api.foursquare.com/v2/venues/categories?" + $.param({oauth_token:oauth_token,v:v});
	$.get(query_string, function(data){
		// console.log(data);
		var cats = data['response']['categories'];
		for (cat in cats){
			var catName = cats[cat]['name'];
			var catId = cats[cat]['id'];
			callback(cats[cat]);
		}

	})

}

function extractCat(data){
	
}

function initalizeFoursquare(lt, lg){
	getCategories(function(data){
		addCategoryNode(data);
		getVenues(data);
	});
}



