var api = "api.openweathermap.org/data/2.5/weather?";
var key = "264176e7a08a5448d6a929a45b47a202";

var getLoc = $.getJSON("http://ipinfo.io/json?callback=JSON_CALLBACK");



$(document).ready(function() {
    $('.jumbotron').text(getLoc);
});