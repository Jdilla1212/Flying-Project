// modal proc on load workaround from https://stackoverflow.com/questions/40430576/how-i-can-open-a-materialize-modal-when-a-window-is-ready
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
    <p>observation_time:  : ${weatherstackData.current.observation_time} </p>
    <p>temperature:   : ${weatherstackData.current.temperature} </p>
    <p>visibility:  : ${weatherstackData.current.visibility} </p>
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

  // toast for visibility (we probably need an if/else if statement to get low, medium, high visibility responses)
  M.toast({ html: "Looks like visibility in your area is " + "???" });
});

var planet = document.getElementById("planet-name");
var planetDe = document.getElementById("planet-details");

function Getby(w) {
  let apiRequest;
  apiRequest = $.ajax({
    url: "https://api.le-systeme-solaire.net/rest/bodies/" + w,
    method: "GET",
  });
  // retuen the promise

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
  planetDe.innerHTML = `
    <p>Discovered by : ${info.discoveredBy} </p>
    <p>Discovery date : ${info.discoveryDate} </p>
    <p>Is it a planet : ${info.isPlanet} </p>
    <p>Moons: ${info.moons.length} </p>
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
