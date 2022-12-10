//Global Variables
var createButtonEl = document.getElementById("create-button");

//Rocket Launch API
var launchesUrl = "https://fdo.rocketlaunch.live/json/launches/next/5";
var launchContainerEl = document.getElementById("launch-container");

//5 day weather forecast for results 
var apiKey = "c7f3d71450efdca51fea8035a42258bd";
var forecastContainerEl = document.querySelector("#forecast-container");
var forecastCardContainerEl = document.querySelector("#forecast-card-container");

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
//API for rocketlive API
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

//call Rocket Launch Live API call
function getLaunches(launchesUrl){
    fetch(launchesUrl)
    .then(function(response){
        console.log(response.status);
        return response.json();
    })
    .then(function(data){
        console.log(data);
        for (var i = 0; i < data.result.length; i++) {
            console.log(data.result[i]);
            renderLaunchCard(data.result[i]);
        }
    })
}
getLaunches(launchesUrl); 
  
// On Create Button, Location and Date is Stored on Local Storge

function handleFormSubmit(event) {
    // Stores The Value of Location to localStorage
    var locationSelectEl = document.getElementById("locations");
    var locationsText = locationSelectEl.options[locationSelectEl.selectedIndex].text;
    var selectedLocationValue = locationSelectEl.value;
    localStorage.setItem("locations", locationsText);
    console.log(selectedLocationValue);
    console.log(coordinates[selectedLocationValue]);
    
    //Stores The Value of Date to localStorage
    var dateInputEl = document.getElementById("date-input");
    var dateInputValue = dateInputEl.value;
    localStorage.setItem("date", dateInputValue);
    localStorage.setItem("longitude", coordinates[selectedLocationValue][0]);
    localStorage.setItem("latitude", coordinates[selectedLocationValue][1]);
    
    var launchNameEl = document.getElementById("launch-name").value.trim();
    localStorage.setItem("launch-name", launchNameEl);

    console.log(localStorage.getItem("locations")); 
    console.log(localStorage.getItem("date")); 
};

//clicking create button
createButtonEl.addEventListener("click", function() {
    handleFormSubmit();
    
});

// open modal function
const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};
// open modal event
openModalBtn.addEventListener("click", openModal);

okClick.addEventListener("click", open(URL="./launchresults.html"))



