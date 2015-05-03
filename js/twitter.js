var cb = new Codebird;
var key = "jtlS31wC95Xli3CZMO4OidTH1";
var secret = "iCy6evhz0lGnOjNMCTnkxN5y9Cuh86ndyGpkIAX23HPIFCEdr3";
cb.setConsumerKey(key, secret);

function getTweets(query){
	var params = {
		q: query
	};
	cb.__call(
			"search_tweets",
			params,
			function (reply) {
				console.log(reply);
				var tweets = reply['statuses']
				$('#feed').empty();
				for (tweet in tweets){
					$('#feed').append('<blockquote class="twitter-tweet">' + tweets[tweet]['text'] + "</blockquote>");	
				}
			}
		 );
}


