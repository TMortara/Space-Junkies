//Map Code
var map = L.map('map').setView([38.15114045856517, -97.92229780772017], 4);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);

//Map Blips
L.marker([35.65530134419738, -117.65712626555359]).addTo(map);
L.marker([22.10522723647042, -159.52710326974312]).addTo(map);
L.marker([31.371197118653374, -104.44918985423305]).addTo(map);
L.marker([32.99025566103608, -106.97542032307463]).addTo(map);
L.marker([34.75558064552297, -120.6224432627161]).addTo(map);
L.marker([37.83106950152952, -75.4913219080746]).addTo(map);
L.marker([28.583716994602874, -80.58272857727329]).addTo(map);
L.marker([57.43532716813497, -152.3395539107882]).addTo(map);
L.marker([28.607989631957835, -80.60382221033875]).addTo(map);
L.marker([25.996146341919793, -97.15445984398181]).addTo(map);


