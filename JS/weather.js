var $weather = $('#display');
var $img = $('#img');
var $changeTemp = $('#btn');

function getCurrentWeather() {
    $.ajax({
        type: 'GET',
        url: "http://api.wunderground.com/api/d4d45ef6cba449be/geolookup/conditions/q/autoip.json",
        dataType: "jsonp",
        success: function(data) {
            storeData(data);
        }
    });
}

function getForecastWeather() {
    $.ajax({
        type: 'GET',
        url: "http://api.wunderground.com/api/d4d45ef6cba449be/geolookup/forecast/q/autoip.json",
        dataType: "jsonp",
        success: function(data) {
            console.log(data);
        }
    });
}

function storeData(data) {
    var temp_c = data['current_observation']['temp_c'];
    var location = data['location']['city'];
    var temp_f = data['current_observation']['temp_f'];
    var tempDisplay = temp_c;
    $weather.append('<p>Current Temperature: ' + tempDisplay + 'c <br>City: ' + location + '</p>');
    $changeTemp.click(function() {
        $weather.empty();
        showCurrent(temp_c, temp_f, location, tempDisplay);
    });
}

function showCurrent(temp_c, temp_f, location, tempDisplay) {
    if (tempDisplay == temp_c) {
        tempDisplay = temp_f;
        $weather.append('<p>Current Temperature: ' + tempDisplay + 'f <br>City: ' + location + '</p>');
    } else {
        tempDisplay = temp_c;
        $weather.append('<p>Current Temperature: ' + tempDisplay + 'c <br>City: ' + location + '</p>');
    }
    $changeTemp.click(function() {
        $weather.empty();
        showCurrent(temp_c, temp_f, location, tempDisplay);
    });
}

getCurrentWeather();
getForecastWeather();
