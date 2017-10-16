//decalre some global variables
var api = "https://fcc-weather-api.glitch.me/api/current?lat=";
var lat;
var long;
var currentTemp;
var far;

$(document).ready(function() { //on document load
  if (navigator.geolocation) { //if geolocation allowed
    navigator.geolocation.getCurrentPosition(function(position) { 
      var lat = position.coords.latitude; //store lat position
      var long = position.coords.longitude; //store long position
      getInfo(lat, long); //call getInfo function
    });
  } else {
    console.log("geolocation not supported"); //if not supported
  }
});

//function to get all the data and use it on the screen
function getInfo(lat, long) { //pass lat and long thrugh function
  var urlstring = api + lat + "&&lon=" + long; //decalre url variable to get location
  $.ajax({
    url: urlstring, //use this url
    success: function(data) { //successfull
      var icon = '"' + data.weather[0].icon + '"'; //this is the built in icons on API
      var overView = data.weather[0].main; //overview from object
      var desc = data.weather[0].description; //decirption
      //needed to use 2 variables. One for rounded and one for working out far conversion. Kept getting NAN when trying to use currentTemp rounded with Far
      var currentTemp = data.main.temp;
      var currentTempRounded = Math.round(currentTemp) + String.fromCharCode(176) + "C";
      var far = currentTemp * (9 / 5) + 32;
      var farRounded = Math.round(far) + String.fromCharCode(176) + "F";
      var name = data.name;
      //Put data in span locations....
      $("#icon").append("<image src=" + icon + "</image>");
      $("#location").text(name);
      $("#temp").text(currentTempRounded);
      $("#over").text(overView);
      $("#script").text(desc);
      //call the function to change the temp on click
      changeTemps(currentTempRounded, farRounded);
    }
  });
}
//Function to adjust the temperatures onclick
function changeTemps(arg1, arg2) {
$("#temp").click(function() {
  if ($("#temp").text() == arg1){
  $("#temp").text(arg2);}
  else{
    $("#temp").text(arg1);
  }

 });
}