//Map Code
var map = L.map('map').setView([38.15114045856517, -97.92229780772017], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Map Blips

var coordinates = [
    [35.65530134419738, -117.65712626555359],
    [22.10522723647042, -159.52710326974312],
    [31.371197118653374, -104.44918985423305],
    [32.99025566103608, -106.97542032307463],
    [34.75558064552297, -120.6224432627161],
    [37.83106950152952, -75.4913219080746],
    [28.583716994602874, -80.58272857727329],
    [57.43532716813497, -152.3395539107882],
    [28.607989631957835, -80.60382221033875],
    [25.996146341919793, -97.15445984398181],
];

var locations = [
    'Naval Air Weapons Station China Lake, USA',
    'LP-41, Kauai, USA',
    'West Texas Suborbital Launch Site, Corn Ranch, USA',
    'Vertical Launch Area, Spaceport America, NM, USA',
    'Space Launch Complex 2,Vandenberg SFB, CA, USA',
    'Launch Pad 0-A, Wallops Island, Virginia, USA',
    'Launch Complex 41, Kennedy Space Center, FL, USA',
    'Pacific Spaceport Complex, Alaska, USA',
    'Launch Pad 39A, Kennedy Space Center, FL, USA',
    'Orbital Launch Pad 1, Boca Chica State Park, TX, USA',
];

for (var i = 0; i < coordinates.length; i++) {
    L.marker(coordinates[i]).bindPopup(locations[i]).addTo(map);
}







//local storage


//render local storage

//API for rocketlive API
var launchesUrl = "https://fdo.rocketlaunch.live/json/launches/next/5";
var launchContainerEl = document.getElementById("launch-container");

function renderLaunchCard(launchData) {
    var launchCardEl = document.createElement("div"); 
    launchCardEl.setAttribute("id", "launchCard");

    var estimatedLaunchDate = new Date(launchData.sort_date * 1000).toLocaleDateString("en-US");
    var launchDateEl = document.createElement("p");
    launchDateEl.textContent = estimatedLaunchDate;

    var locationName = launchData.pad.location.name;
    var locationState = launchData.pad.location.statename;
    var locationEl = document.createElement("p");
    locationEl.textContent = "Location: " + locationName + ", " + locationState;

    var launchDescription = launchData.launch_description;
    var launchDescriptionEl = document.createElement("p");
    launchDescriptionEl.textContent = "Launch Description: " + launchDescription;

    var launchProvider = launchData.provider.name;
    var launchProviderEl = document.createElement("p");
    launchProviderEl.textContent = "Launch Provider: " + launchProvider;

    var vehicleName = launchData.vehicle.name;
    var vehicleNameEl = document.createElement("p");
    vehicleNameEl.textContent = "Vehicle Name: " + vehicleName;

    var weatherHeadingEl = document.createElement("h3");
    weatherHeadingEl.textContent = "Weather";

    var weatherCondition = launchData.weather_condition;
    var weatherConditionEl = document.createElement("p");
    weatherConditionEl.textContent = "Weather Condition: " + weatherCondition;
  
    var temp = launchData.weather_temp;
    var tempEl = document.createElement("p");
    tempEl.textContent = "Temperature: " + (Math.floor(temp)) + "°F";

    var windSpeed = launchData.weather_wind_mph;
    var windSpeedEl = document.createElement("p");
    windSpeedEl.textContent = "Wind Speed: " + windSpeed + " mph";

    launchCardEl.append(launchDateEl, locationEl, launchDescriptionEl, launchProviderEl, vehicleNameEl, weatherHeadingEl, weatherConditionEl, tempEl, windSpeedEl);
    launchContainerEl.append(launchCardEl);
}

function getLaunches(launchesUrl){
    fetch(launchesUrl)
    .then(function(response){
        // console.log(response);
        console.log(response.status);
        return response.json();
    })
    .then(function(data){
        console.log(data);
        // clearLaunchContainer();
        // renderLaunchCard();
        for (var i = 0; i < data.result.length; i++) {
            console.log(data.result[i]);
            renderLaunchCard(data.result[i]);
        }
            // console.log(renderLaunchCard);
    })
}
getLaunches(launchesUrl); //add document.ready()

function show(value) {
    document.querySelector(".text-box").value = value;
    selectedCoordinateLocationIndex = value.getAttribute("data-coordinate-index-location");
    console.log(selectedCoordinateLocationIndex);
    console.log(coordinates[selectedCoordinateLocationIndex]);
    getForecast(coordinates[selectedCoordinateLocationIndex][0], coordinates[selectedCoordinateLocationIndex][1]);
  }
// function gotoLink(link) {
//     console.log(link.value);
//     location.href = '\launchresults.html'
// };
  
//   let dropdown = document.querySelector(".dropdown")
//   dropdown.onclick = function() {
//       dropdown.classList.toggle("active")
//       var locationSelectEl = document.getElementById("locations");
//       var locationsValue = locationSelectEl.value;
//       var locationsText = locationSelectEl.options[locationSelectEl.selectedIndex].text;
//       console.log(locationsText);
//   }



var createButtonEl = document.getElementById("button");

createButtonEl.addEventListener("click", function() {
    handleFormSubmit();
});

function handleFormSubmit(event) {
    // event.preventDefault();
    var locationSelectEl = document.getElementById("locations");
    var locationsValue = locationSelectEl.value;
    var locationsText = locationSelectEl.options[locationSelectEl.selectedIndex].text;
    console.log(locationsText);
    var dateInputEl = document.getElementById("date-input");
    // dateInputEl = 
};

//16 day weather forecast for results 
var apiKey = "c7f3d71450efdca51fea8035a42258bd";
var forecastContainerEl = document.querySelector("#forecast-container");
var forecastCardContainerEl = document.querySelector("#forecast-card-container");
var selectedCoordinateLocationIndex;


// function saveToStorage() {
//     var history = localStorage.setItem("user-input", JSON.stringify())
// }

function getForecast(lat, lon) {
    var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    fetch(url).then(function(respone){
        return respone.json();
    })
    .then(function(data){
        console.log(data);  
        // renderForecastContainer(); 
        for (var i = 0; i < data.list.length; i++) {
            var hour = new Date(data.list[i].dt * 1000).getUTCHours(); 
            if (hour === 12) {
                console.log(data.list[i]);
        //         // renderForecastCard(data.list[i]);
            }
        }
    }) 
}






