'use strict';

var cities;
//var i;

$(function() {
  console.log("document ready");
  loadFromLocalStorage();
  //  $('#addCity').click(addCity);
   $('#addCity').click(apiRequest);

});



function loadFromLocalStorage() {
  if(localStorage.cities === undefined) {
    localStorage.cities = '[]';
    console.log("hi");
  }
  cities = JSON.parse(localStorage.cities);
}

function saveToLocalStorage() {

  localStorage.cities = JSON.stringify(cities);
  //for(vat i =0; i<cities.length; i++){
//  $('#cities').append(cities.name);
//  $('#cities').append(cities.name.temp);
  //data.name.temp
//  data.name

}

function addCity(data) {
  var cities =[]
  var newData = JSON.stringify(data);
  cities.push(newData);

  localStorage.setItem("cities", cities)
  var newCity = data.name;
  console.log("newCity",newCity);
  var weather = data.weather;
  var description = data.weather[0].description;
  //var main = data.weather.main;
  //console.log("newCity",newCity)
  console.log("weather", weather);
  console.log("description", data.weather[0].description);
  console.log('localStorage.cities', localStorage.cities);
}



//  console.log('localStorage.cities', localStorage.cities);



function apiRequest() {
  var $city= $('#searchCity').val();
  var $key = '&appid=8365931f29739dcf36117fb90e77e6ba'
  var $url = 'http://api.openweathermap.org/data/2.5/weather?q=' + $city + $key
  console.log($city);

  $.ajax(`http://api.openweathermap.org/data/2.5/weather?q=${$city}${$key}`, {
      method: 'GET',
      url: $url,
      success: function(data) {
        if(data === undefined) return console.log("err")
          console.log("data:", data)
        addCity(data);
        loadFromLocalStorage();
        makeCard(data);
        //cities.push();
        /*
        console.log(data.wind.deg);
        var $div = $('<div>');
        var $name = $('<p>').text(data.name);
        console.log($name);
        var $temp =$('<p>').text(data.main.temp);
        console.log($temp);
        var $wind = $('<p>').text(data.wind.deg);
        console.log($wind);
        $div.append($name).append($temp).append($wind);
        $('#container').append($div);
        */

    }
  });
  $('#searchCity').val();
}
function makeCard(data){
  var $divCol = $('<div>');
  $divCol.addClass('col-sm-6 col-md-4');
  //var $ul = $('<ul>')
  var $divThumb = $('<div>');
  $divThumb.addClass('thumbnail');
  var $name = $('<p>').text("City: " + data.name);
  console.log($name);
  //$ul.append($name);
  var $main = $('<p>').text("Weather Condition: " + data.weather[0].main);
  //$ul.append($main);
  console.log($main);
  var $description = $('<p>').text("Synopsis: " + data.weather[0].description);
//  $ul.append($description);
  console.log($description);
  var $temp =$('<p>').text("Temperature(Kelvin): " + data.main.temp);
  console.log($temp);
  //$ul.append($temp);
  var $humidity = $('<p>').text("Humidity: " + data.main.humidity + "%" );
//  $ul.append($humidity);
  var $wind = $('<p>').text("Wind: " + data.wind.deg);
  console.log($wind);
  $divThumb.append($name).append($main).append($description).append($temp).append($humidity).append($wind);
  $divCol.append($divThumb);
  $('.row').append($divCol);
}
