var extendedForecast = false;

function YQLHttpGet(theUrl, thumb) {
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState==4 && xmlHttp.status==200) {
            y_result=JSON.parse(xmlHttp.responseText);
            var res_str="{\"forecast\": [";
            for (var ind in y_result.query.results.channel) {
                if (ind > 0)
                    res_str+=",";
                if (y_result.query.results.channel.hasOwnProperty(ind)){
                    var item;
                    if (extendedForecast) {
                        item = y_result.query.results.channel[ind].item;
                        res_str+=JSON.stringify(item.forecast);
                    } else {
                        item = y_result.query.results.channel.item;
                        res_str+=JSON.stringify(item.condition);
                    }
                }
            }
            res_str+="]}";
            if(thumb){
                var res = JSON.parse(res_str);
                var forecast = res.forecast[0];
                console.log(forecast);
                code = forecast.code;
                img_thumb = 'images/weather/'+code+'.png';
                temp = forecast.temp;
                res = '<div>';
                res+='<img style=\"width:30px; height:auto \" src=\''+img_thumb+'\' >';
                res+=temp+' F';
                res+='</div>';
            }
            document.getElementById("weather-thumb").innerHTML=res;
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
    return YQLHttpGet('https://query.yahooapis.com/v1/public/yql?q=select%20'+select+'%20from%20weather.forecast%20where%20woeid%20in%20(select%20woeid%20from%20geo.places(1)%20where%20text%3D%22'+city+'%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', false);
}

function getWeatherCoords(coords, f) {
    latitude=coords.split(',')[0];
    longitude=coords.split(',')[1];
    var select = "item.condition";
    if (f) {
        select = "item.forecast";
    }
    extendedForecast = f;
    return YQLHttpGet('https://query.yahooapis.com/v1/public/yql?q=select%20'+select+'%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.placefinder%20WHERE%20text%3D%22'+latitude+'%2C'+longitude+'%22%20and%20gflags%3D%22R%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', false);
}

function generateThumb(lt, lg){
    extendedForecast = false;
    return YQLHttpGet('https://query.yahooapis.com/v1/public/yql?q=select%20item.condition%20from%20weather.forecast%20where%20woeid%20in%20(SELECT%20woeid%20FROM%20geo.placefinder%20WHERE%20text%3D%22'+lt+'%2C'+lg+'%22%20and%20gflags%3D%22R%22)&format=json&env=store%3A%2F%2Fdatatables.org%2Falltableswithkeys', true);
}