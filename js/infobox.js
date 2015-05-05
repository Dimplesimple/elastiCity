var getInfoboxData = function(location) {
    var xmlHttp = null;
    xmlHttp = new XMLHttpRequest();
    xmlHttp.open( "GET", 'http://himal.cs-i.brandeis.edu/elastiCity/infobox.php?location='+location, false );
    xmlHttp.send( null );
    $('#infoboxResults').append(xmlHttp.responseText);

};
