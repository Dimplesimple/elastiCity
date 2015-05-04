function createCORSRequest(method, url) {
  var xhr = new XMLHttpRequest();
  if ("withCredentials" in xhr) {

    // Check if the XMLHttpRequest object has a "withCredentials" property.
    // "withCredentials" only exists on XMLHTTPRequest2 objects.
    xhr.open(method, url, true);

  } else if (typeof XDomainRequest != "undefined") {

    // Otherwise, check if XDomainRequest.
    // XDomainRequest only exists in IE, and is IE's way of making CORS requests.
    xhr = new XDomainRequest();
    xhr.open(method, url);

  } else {

    // Otherwise, CORS is not supported by the browser.
    xhr = null;
    alert('cors is not supported by the browser');

  }
  return xhr;
}


var getRedditPostsUsingCors = function(location) {
    var xhr = createCORSRequest('GET' , 'http://himal.cs-i.brandeis.edu:8082/?location='+location);
    alert(xhr.responseText);
    $('#redditResults').append(xhr.responseText);
    console.log(xhr.responseText);
    console.log(location);
};

var getRedditPosts = function(location) {
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    // var location = document.getElementById('city-search
    xmlHttp.open( "GET", 'http://himal.cs-i.brandeis.edu/elastiCity/reddit.php?location='+location, false );
    // xmlHttp.open( "GET", 'http://himal.cs-i.brandeis.edu:8082/?location='+location, true );
    xmlHttp.send( null );
    // $('#redditResults').append('<blockquote class="twitter-tweet">r/London updates on rioting [09 August 2011]</blockquote> <blockquote class="twitter-tweet">My dad whom has Alzheimers has gone missing in NW London</blockquote> <blockquote class="twitter-tweet">Missing grandfather in Kentish Town area London - please upvote for visibility! Help reddit!</blockquote> <blockquote class="twitter-tweet">Rules of London</blockquote> <blockquote class="twitter-tweet">Finally it is Spring in London!</blockquote> <blockquote class="twitter-tweet">As someone moving to London, what are thing I should NOT do?</blockquote> <blockquote class="twitter-tweet">London Independence Party: With the rest of the country confirmed luddites, would you support a LIP in throwing up the walls around the M25?</blockquote> <blockquote class="twitter-tweet">Things I love about London after just a week here.</blockquote> <blockquote class="twitter-tweet">London used "London Calling" by the Clash and the USA played "Born in the USA" by Bruce Springsteen to celebrate their respective Olympic teams. Dont they have any idea what those songs actually mean?</blockquote> <blockquote class="twitter-tweet">Was stuck in traffic as a passenger in a London black cab today.</blockquote> <blockquote class="twitter-tweet">Rules for Travelling on the London Underground</blockquote> <blockquote class="twitter-tweet">london getting eye wateringly expensibe</blockquote> <blockquote class="twitter-tweet">I have found the secret to cheap lunches in central London.</blockquote> <blockquote class="twitter-tweet">Redditors of London: How much do you earn and do you feel rich or poor? (Throwaways welcome!)</blockquote> <blockquote class="twitter-tweet">Looking for a flat in London</blockquote> <blockquote class="twitter-tweet">Lets make another database: you can only reccomend ONE restaurant in London (any kind of food) where one can eat for £20 or less. GO!</blockquote> <blockquote class="twitter-tweet">What are your favourite places to eat in London?</blockquote> <blockquote class="twitter-tweet">4x4 drivers of London: Why?</blockquote> <blockquote class="twitter-tweet">Any Skyrim redditors lose their phone on a train to London?</blockquote> <blockquote class="twitter-tweet">Hey /r/London, show everyone where you live on google maps</blockquote> <blockquote class="twitter-tweet">Were Failbetter Games, developers of Fallen London, Dragon Age: The Last Court and now Sunless Sea - ask us anything!</blockquote> <blockquote class="twitter-tweet">What is the best place to bury money in London?</blockquote> <blockquote class="twitter-tweet">Thank You London!</blockquote> <blockquote class="twitter-tweet">London Redditors - Whats it like to live in London?</blockquote> <blockquote class="twitter-tweet">Singletons of London, what are your living arrangements?</blockquote>');  
    $('#redditResults').append(xmlHttp.responseText);
    //$('#redditResults').append('<blockquote class="twitter-tweet">This is test</blockquote><blockquote class="twitter-tweet">This is test</blockquote><blockquote class="twitter-tweet">This is test</blockquote><blockquote class="twitter-tweet">This is test</blockquote><blockquote class="twitter-tweet">This is test</blockquote><blockquote class="twitter-tweet">This is test</blockquote><blockquote class="twitter-tweet">This is test</blockquote>');  

};







