Elasticity
=========
Iterim Project Report 4/20/2015
------------

###Team Members
- Aaditya Prakash,
- Dimokritos Stamatakis,
- Eden Zik,
- Zhenyu Han 
	
###Our Goal
Travel sites like TripAdvisor and others, although very useful for user reviews and expert content, have recently become dated in light of the lightning speed social based update. 

Many base their travel decisions not on the opinions of experts and strangers, but rather of their “internet friends” and people who they are not in immediate proximity with. 

This is a significant shortcoming of the current solution, as there can be just so many either experts or strangers who post dedicated reviews of travel locations in a city with the intent of strangers reading them. However, peo- ple on social media are very engaged with their traveling and often share their adventures (sometimes excessively!) with their friends and followers.

We aim to create a social travel planning workflow service that can guide users in making better travel decisions on a city basis. Using elasticsearch and a user facing, response UI, we intend to create a reasonably useable service that can serve as a proof of concept for the usage of elastic- search in social applications and assist in decision making - in this case for a vacation.

###Data Sources
1. [Twitter](https://dev.twitter.com/overview/documentation)
2. [Instagram](https://instagram.com/developer/)
3. [Yahoo Weather](https://developer.yahoo.com/weather/)
4. [Wikitravel](http://wikitravel.org/en/Main_Page)
5. [Yelp](https://www.yelp.com/developers/documentation)
6. [Freebase](https://developers.google.com/freebase/)
7. [Reddit](https://www.reddit.com/dev/api)
7. [DBPedia](http://wiki.dbpedia.org/Lookup)
7. ~~Facebook~~ (Denied)
8. [CIA World Factbook](https://www.cia.gov/library/publications/the-world-factbook/)

###Current Progress
We have completed creating programs and retrieve and process data from our sources, frequntly adjusting the script as new side cases arise. We have settled on the data set and at this point will only eliminate data sources that will prove not useful - but not add more.

We hope to set up elasticsearch clusters as soon as the mappings are finalized for each data source. These clusters will be hosted on Amazon EC2 or a similar service. Currently considering [QBox](https://qbox.io/signup), which offers free beginners credit and will surely suffice for our use.

Our technology stack had gone some rapid changes from our initial vision - we are planning to use a service oriented architecture based on the segmentation of each of the followig componenets:

1. The elasticsearch cluster
2. The scrapers/parsers/API scripts to connect to our sources
3. The front end

Each of the three above services will run seperatly, with almost all application level logic existing in the front end - and written in JavaScript. This can utilizies ElasticSearch's RESTful properties while relieing in no part on a server (besides the search cluster) - making it scalable and the maintinance trivial.

###Interaction

####Yelp
	A user's interaction with the Yelp API is by responding to "like" queries from the user. We support almost all of the Yelp API mappings in our project. The first is just input the name of the city and it will output the top 10 best restaurants in this city according to the Yelp ranking system. If the users want a specific kind of food in a specific city, we will show top 10 restaurant with this specific type of food. The information of this restaurant may include the working hours, phone number, pictures, address and some other related information.
	
####Freebase
	As with Yelp, we utilize Freebase to maximize the relevance of the results. All the search results are based on the city name that user input and retrieved from Freebase. For example, if you input “Boston”, then, most well-known attractions in Boston will pop up and we also provide links for user to check out the attractions. Along with the attractions, the GEO information consisted of the latitude and longitude will also provide for weather query purpose and also for checking the cities around the user input city purpose.
	
####Weather
	We have completed the APIs for gathering weather information from Yahoo Weather based on location, in the same format as the collected city data. We also have access to the Foursquare API and we are able to gather information about sightseeing, arts and outdoor activities. Those APIs will help us filter the results based on interests and real-time conditions. The next step is to design the elasticSearch schema for the more “static” data that we will keep for the basic locations.
	
####Country and City Data + Activitives
	We have completed a filtering and integration of the city data. Both Country data and city data is amalgamation from multiple sources, they return various information useful to a travel planner, like things to see, things to do, ways to get there, nearby places etc. One of sources of data is wikitravel, and their API was broken (out of maintenance) and thus data was obtained using scraping the html pages. 
	
	When returning the consolidated result for the City and Country, Elastic search turned out to be much slower (5x) than fetching the data using Python standalone. This is because ES query was just retrieving the matching docs and the data was fetched from docs (because snippets are not sufficient for consolidated output), and thus our code returns result optimally from ES when filters are used and from flat-file when country/city is used. 
	
	Challenging part is to figure out, how to group the things to see/do based on interests. We are still working on that, since there is no standard corpora which ties interests and hobbies with activities and places.
	
####Twitter
	Althugh the input from Twitter is plentiful, it is nontrivial to determine which of the tweets are most relevant to a traveler in the city versus simply conversations regarding the city or other location. One of our favorite ways to deal with this is by utilizing Geographical metadata, in order to maximize the chances the person tweeting about the city is actually there currently (or there as of the time of the tweet).

	We have considered simply ranking all tweets talking about a practiuclar city by the presence of the city name, or attraction from that city, in the tweet. By corrolating this data with the data gathered from Freebase and other sources, we can actually get a pretty good idea of these locations. Once this is decided upon, filtering the dataset will be easy.
	
####Instagram
	Instagram proves more difficult - as it is harder to use their API without a specific user's account. We will keep exploring this venture, or otherwise just use Twitter as it also provides photos. We want to be able to see "the world's" photos, rather than a practiucalr user's followers, as they are much less likely to have photos relevant to the location.
	
####User Interface
	Google revoluationzed the web by introducing a clutter free interface for search. We beleive this simplicty will be good for us as well. 
	
	Our application thus far includes a simple search bar which populates the bottom half with results as soon as a user types a query. These results will be segmented by source, and will stream as long as the user is on the page. We beleive this can give the user the most information at the least cost, without having to click even a single time. Note the above is a prototype, and subject to change.
	
Click [Here](https://www.dropbox.com/s/sh6rd8eml0rdeq7/Screenshot%202015-04-20%2002.55.11.png?dl=0) for a screenshot of our landing page.


	


