var extendedForecast = false;

function YQLHttpGet(theUrl) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState==4 && xmlHttp.status==200) {
            y_result=JSON.parse(xmlHttp.responseText);
            var res="{\"forecast\": [";
            for (var ind in y_result.query.results.channel) {
                if (ind > 0)
                    res+=",";
                if (y_result.query.results.channel.hasOwnProperty(ind)){
                    var item;
                    if (extendedForecast) {
                        item = y_result.query.results.channel[ind].item;
                        res+=JSON.stringify(item.forecast);
                    } else {
                        item = y_result.query.results.channel.item;
                        res+=JSON.stringify(item.condition);
                    }
                }
            }
            res+="]}";
            alert(res);
            document.getElementById("result").innerHTML=res;
            
        }
    }
    xmlHttp.open( "GET", theUrl, true );
    xmlHttp.send( null );
}

function getWeatherCity(city, f) {
    var select = "item.condition";
    if (f) {
        select = "item.forecast";
    }
    extendedForecast = f;
    YQLHttpGet('https://query.yahooapis.com/v1/public/yql?q=select%20'+select+'%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+city+'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys');
}

function getWeatherCoords(coords, f) {
    latitude=coords.split(',')[0];
    longitude=coords.split(',')[1];
    var select = "item.condition";
    if (f) {
        select = "item.forecast";
    }
    extendedForecast = f;
    YQLHttpGet('https://query.yahooapis.com/v1/public/yql?q=select%20'+select+'%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.placefinder%20WHERE%20text%3D%22'+latitude+'%2C'+longitude+'%22%20and%20gflags%3D%22R%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys');
}