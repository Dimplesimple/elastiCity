function RedditResult(location)
{
    // get the data from the reddit
    // returns the output in the json format
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'http://www.reddit.com/search.json?q='+location, false );
    xmlHttp.send( null );
    return xmlHttp.responseText; 
}
