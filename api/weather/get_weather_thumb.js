

function generateThumb(lt, lg){
    var res_str = getWeatherCoords(lt+","+lg,false);
    var res = JSON.parse(res_str);
    var forecast = res.forecast[0];
    console.log(forecast);
    code = forecast.code;
    img_thumb = '../../images/weather/'+code+'.png';
    temp = forecast.temp;
    res = '<div>';
    res+='<img style=\"width:30px; height:auto \" src=\''+img_thumb+'\' >';
    res+=temp+' F';
    res+='</div>';
    document.getElementById('result').innerHTML+=res
}