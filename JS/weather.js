$(function () {

  var $weather = $('#display');
  var $img = $('#img');

  $.ajax({
    type: 'GET',
    url: "http://api.wunderground.com/api/d4d45ef6cba449be/geolookup/conditions/q/autoip.json",
    dataType: "jsonp",
    success: function(data) {
      var temp_c = data['current_observation']['temp_c'];
      var location = data['location']['city'];
      var temp_f = data['current_observation']['temp_f'];
      var icon = data['current_observation']['icon_url'];
      var tempDisplay = temp_c;
      $weather.html('<p>Current Temperature: ' + tempDisplay + 'c <br>City: ' + location + '</p>');
      $img.html('<img src="' + icon + '"/>');
      $('#btn').click(function() {
        if(tempDisplay == temp_c) {
          tempDisplay = temp_f;
          $weather.html('<p>Current Temperature: ' + tempDisplay + 'f <br>City: ' + location + '</p>');
        }
        else {
          tempDisplay = temp_c;
          $weather.html('<p>Current Temperature: ' + tempDisplay + 'c <br>City: ' + location + '</p>');
        }
      });
    }
  });
});
