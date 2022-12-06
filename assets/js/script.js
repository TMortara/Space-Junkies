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



function getLaunches(launchesUrl){
    fetch(launchesUrl)
    .then(function(response){
        console.log(response);
        console.log(response.status);
        return response.json();
    })
    .then(function(data){
        console.log(data);
    })
}
getLaunches(launchesUrl);
function show(value) {
    document.querySelector(".text-box").value = value;
  }
  
  let dropdown = document.querySelector(".dropdown")
  dropdown.onclick = function() {
      dropdown.classList.toggle("active")
  }
