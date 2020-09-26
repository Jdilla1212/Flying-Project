// modal proc on load workaround from https://stackoverflow.com/questions/40430576/how-i-can-open-a-materialize-modal-when-a-window-is-ready since vue blocks a lot of functionality without installing/importing
$(document).ready(() => {
  $("#modal").modal();
  $("#modal").modal("open");
});

//style.displya=nonn & block
// class css show & hide
//class list.add / remove
var apikey = "f4055f6252cce130567e326c10c2cb16";
// let city = "";
function weatherApi(lat, lon) {
  $.ajax({
    url: "http://api.weatherstack.com/current?query=" + lat + "," + lon,
    data: {
      access_key: apikey,
    },
    dataType: "json",
    // city & c
    success: function (data) {
      apiData(data);
    },
  });
}

var location;
var locationName = document.getElementById("locationName");
var dateName = document.getElementById("locationDate");

function apiData(weatherstackData) {
  locationName.textContent = weatherstackData.location.name;
  locationDate.innerHTML = `
    <p>The current temperature for your location is: ${weatherstackData.current.temperature}°C </p>
    <div style="display: flex;align-items: center;">
      <span style="margin-right:10px">${weatherstackData.current.weather_descriptions}</span>
      <img  src=${weatherstackData.current.weather_icons[0]}>
    </div>
    <p>The current visibility for your location is: ${weatherstackData.current.visibility} km</p>
    `;
}

// hides the weather card and google map from the start
$("#weather-row").hide();
$("#map").hide();
$(".planet-info").hide();

// when you click the map button, hide the weather info and show the map
$("#btnMap").on("click", () => {
  $("#weather-row").hide();
  $("#map").show();
});

// when you click the weather button, hide the map and show weather info
$("#btnWeather").on("click", () => {
  $("#map").hide();
  $("#weather-row").show();

});

var planet = document.getElementById("planet-name");
var planetDe = document.getElementById("planet-details");

function Getby(w) {
  let apiRequest;
  apiRequest = $.ajax({
    url: "https://api.le-systeme-solaire.net/rest/bodies/" + w,
    method: "GET",
  });
  // return the promise

  return apiRequest;
}
//JQuery
$("#search").on("change submit", getApiData);

function getApiData(e) {
  e.preventDefault();
  console.log(e);

  let data;
  data = e.target.value;
  // no name for arrow funtion result => {
  //     result = result *2;
  //     return reslut
  // }
  // function (result) {
  //     result = result *2;
  //     return reslut
  // }
  Getby(data).done((result) => {
    console.log(result, result.englishName);
    display(result);
  });
}
function display(info) {
  //englishName
  planet.textContent = info.englishName;


  const moons=info.moons ? info.moons.length : 0
  planetDe.innerHTML = `
    <p> ${info.englishName} was discovered in ${info.discoveryDate} by ${info.discoveredBy}. It has ${moons} moons, with a gravitational pull of ${info.gravity} m/s^2. The estimated mass of ${info.englishName} is ${info.mass.massValue} x 10^${info.mass.massExponent} kg. For reference, compare that to the Sun, which has a gravitational pull of 274 m/s^2 and a mass of 1.989 x 10^30 kg.
    `;

  // show planet info cards
  $(".planet-info").show();
}

////no let
var gx, infoWindow;

function initMap() {
  gx = new google.maps.Map(document.getElementById("map"), {
    center: {
      lat: -34.397,
      lng: 150.644,
    },
    zoom: 6,
  });
  infoWindow = new google.maps.InfoWindow(); // Try HTML5 geolocation.
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        console.log(position);
        const pos = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        weatherApi(pos.lat, pos.lng);
        console.log(pos);
        infoWindow.setPosition(pos);
        infoWindow.setContent("Location found.");

        infoWindow.open(gx);
        gx.setCenter(pos);
      },
      () => {
        handleLocationError(true, infoWindow, gx.getCenter());
      }
    );
  } else {
    // Browser doesn't support Geolocation

    handleLocationError(false, infoWindow, gx.getCenter());
  }
}

function handleLocationError(browserHasGeolocation, infoWindow, pos) {
  infoWindow.setPosition(pos);
  infoWindow.setContent(
    browserHasGeolocation
      ? "Error: The Geolocation service failed."
      : "Error: Your browser doesn't support geolocation."
  );
  infoWindow.open(gx);
}
