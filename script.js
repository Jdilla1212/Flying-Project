//style.displya=nonn & block 
// class css show & hide 
//class list.add / remove
var apikey = "f4055f6252cce130567e326c10c2cb16"

function apiCall(city) {

    $.ajax({
        url: 'http://api.weatherstack.com/current',
        data: {
            access_key: apikey,
            query: city
        },
        dataType: 'json',
        // city & c 
        success: function (data) {
            apiData(data)
        }
    });
}

var location;
var locationName = document.getElementById("locationName")
var dateName = document.getElementById("locationDate")

function apiData(datapi) {

    locationName.textContent = datapi.location.name;
    locationDate.innerHTML = `
    <p>observation_time:  : ${datapi.current.observation_time} </p>
    <p>temperature:   : ${datapi.current.temperature} </p>
    <p>visibility:  : ${datapi.current.visibility} </p>
    `

}

// hides the weather card and google map from the start
$("#weather-row").hide();
$("#map").hide();

// when you click the map button, hide the weather info and show the map
$("#btnMap").on("click", () => {
    $("#weather-row").hide();
    $("#map").show()
})

// when you click the weather button, hide the map and show weather info
$("#btnWeather").on("click", () => {
    $("#map").hide();
    $("#weather-row").show()
})

var plant = document.getElementById("plant-name")
var plantDe = document.getElementById("plant-details")

function Getby(w) {
    let apiRequest;
    apiRequest = $.ajax({
        url: "https://api.le-systeme-solaire.net/rest/bodies/" + w,
        method: "GET"
    });
    // retuen the promise 

    return apiRequest
}
//JQuery 
$("#search").on("change submit", getApiData)

function getApiData(e) {
    e.preventDefault()
    console.log(e)

    let data;
    data = e.target.value
    // no name for arrow funtion result => {
    //     result = result *2;
    //     return reslut
    // }
    // function (result) {
    //     result = result *2;
    //     return reslut
    // }
    Getby(data).done(result => {

        console.log(result, result.englishName);
        display(result);
    })

}
function display(info) {
    //englishName
    plant.textContent = info.englishName;
    plantDe.innerHTML = `
    <p>discovered By : ${info.discoveredBy} </p>
    <p>discovery Date : ${info.discoveryDate} </p>
    <p>Is it a planet : ${info.isPlanet} </p>
    <p>moons:- ${info.moons.length} </p>
    `
}



////no let
var gx, infoWindow;

function initMap() {
    gx = new google.maps.Map(document.getElementById("map"), {

        center: {
            lat: -34.397,
            lng: 150.644
        },
        zoom: 6
    });
    infoWindow = new google.maps.InfoWindow(); // Try HTML5 geolocation.
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            position => {
                const pos = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
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
        browserHasGeolocation ?

            "Error: The Geolocation service failed." :
            "Error: Your browser doesn't support geolocation."
    );
    infoWindow.open(gx

    );
}

