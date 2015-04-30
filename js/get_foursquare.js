function httpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState==4 && xmlHttp.status==200) {
            foursquareResponse=xmlHttp.responseText;
            document.getElementById("result").innerHTML=foursquareResponse;
        }
    }
    xmlHttp.open( "GET", theUrl, true );
    xmlHttp.send( null );
}

/*
LIST OF USEFUL ITEMS PROVIDED BY EXPLORE API
-----------------------------------------------
NAME OF PLACE
response.groups.items[i].venue.name
CATEGORIES NAME
response.groups.items[i].venue.categories[j].name
STATS
response.groups.items[i].venue.stats.checkinsCount
response.groups.items[i].venue.stats.usersCount
response.groups.items[i].venue.stats.tipCount
PRICE
response.groups.items[i].venue.price.message
RATING
response.groups.items[i].venue.rating
HERE NOW
response.groups.items[i].venue.hereNow.count
TIPS
response.groups.items[i].tips[j].text // what people say about this venue
response.groups.items[i].tips[j].likes.count
*/
/*
The categories can be one of:
food, drinks, coffee, shops, arts, outdoors, sights, trending or specials, nextVenues (venues frequently visited after a given venue), or topPicks (a mix of recommendations generated without a query from the user). 
*/
function getVenues(city, categories) {
    // radius in meters
    var radius=2000;
    oauthtoken='FCA435RS4PUW2DEDZHICXYRPCCDITIJZ35OINI23ZILD1TFJ';
    v=20150430;
    httpGet('https://api.foursquare.com/v2/venues/explore?near='+city+'&radius='+radius+'&section='+categories+'&oauth_token='+oauthtoken+'&v='+v);
}