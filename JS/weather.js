var $weather = $('#display');
var $img = $('#img');
var $changeTemp = $('#btn');
var $showForecast = $('#forecastBtn');

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
            storeForecast(data);
        }
    });
}

function storeData(data) {
    var temp_c = data['current_observation']['temp_c'];
    var location = data['location']['city'];
    var temp_f = data['current_observation']['temp_f'];
    var tempDisplay = temp_c;
    $weather.append('<div class="result"><p>Current Temperature: ' + tempDisplay + 'c <br>City: ' + location + '</p></div>');
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

function storeForecast(data) {
  var forecast = data['forecast']['simpleforecast']['forecastday'];
  console.log(forecast);
  var condition = [];
  var forecastDay = [];
  var low_c = [];
  var low_f = [];
  var high_c = [];
  var high_f = [];
  for(var i = 0; i < forecast.length; i++) {
    condition.push(forecast[i]['conditions']);
    forecastDay.push(forecast[i]['date']['weekday_short']);
    low_c.push(forecast[i]['low']['celsius']);
    low_f.push(forecast[i]['low']['fahrenheit']);
    high_c.push(forecast[i]['high']['celsius']);
    high_f.push(forecast[i]['high']['fahrenheit']);
  }
  for(var i = 0; i < condition.length; i++) {
    $weather.append('<div class="result"><p>' + forecastDay[i] + '<br>' + condition[i] + '<br>Low temp of ' + low_c[i] + 'c<br>High temp of ' + high_c[i] + 'c</p></div>');
  }
}

function toggleDisplay() {
  var setDisplay = 'current';
  console.log(setDisplay);
  $showForecast.click(function() {
    if(setDisplay == 'current') {
      $weather.empty();
      setDisplay = 'forecast';
      getForecastWeather();
    }
    else if(setDisplay == 'forecast') {
      $weather.empty();
      setDisplay = 'current';
      getCurrentWeather();
    }
  });
}

getCurrentWeather();
toggleDisplay();
