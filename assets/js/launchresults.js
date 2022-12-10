//5 day weather forecast for results 
var apiKey = "c7f3d71450efdca51fea8035a42258bd";
var forecastContainerEl = document.querySelector("#forecast-container");
var forecastCardContainerEl = document.querySelector("#forecast-card-container");

var inputContainerEl = document.getElementById("input-results");
var forecastLocationEl = document.getElementById("forecast-location");
var launchNameInput = localStorage.getItem("launch-name");
var locationUserInput = localStorage.getItem("locations");
var dateUserInput = localStorage.getItem("date");
var longitude = localStorage.getItem("longitude");
var latitude = localStorage.getItem("latitude");


//render user inputs
function renderUserInputs() {
    inputContainerEl.innerHTML = "";
    
    var launchNameEl = document.createElement("h3");
    launchNameEl.textContent = launchNameInput + " Launch Details";

    var locationEl = document.createElement("p");
    locationEl.textContent = "Launch Location: " + locationUserInput;

    var dateEl = document.createElement("p");
    dateEl.textContent = "Launch Date: " + dateUserInput;

    inputContainerEl.append(launchNameEl, locationEl, dateEl);

    var forecastLocationHeadingEl = document.createElement("h2");
    forecastLocationHeadingEl.textContent = "5-Day Forecast for " + locationUserInput;
    
    forecastLocationEl.append(forecastLocationHeadingEl);
}

renderUserInputs();

//create forecast cards
function renderForecastCard(forecastData) {

    var forecastCardEl = document.createElement("div");
    forecastCardEl.setAttribute("class", "col-2");

    var forecastDate = new Date(forecastData.dt * 1000).toLocaleDateString("en-US");
    var forecastDateEl = document.createElement("h4");
    forecastDateEl.textContent = forecastDate;

    var icon = forecastData.weather[0].icon;
    var iconEl = document.createElement("img");
    iconEl.setAttribute("src", "https://www.openweathermap.org/img/wn/" + icon + ".png");

    var forecastTemp = forecastData.main.temp;
    var forecastTempEl = document.createElement("p");
    forecastTempEl.textContent = "Temperature: " + (Math.floor(forecastTemp)) + "°F";

    var forecastHumidity = forecastData.main.humidity;
    var forecastHumidityEl = document.createElement("p");
    forecastHumidityEl.textContent = "Humidity: " + forecastHumidity + "%";

    var forecastWindSpeed = forecastData.wind.speed;
    var forecastWindSpeedEl = document.createElement("p");
    forecastWindSpeedEl.textContent = "Wind Speed: " + forecastWindSpeed + " mph";

    forecastCardEl.append(forecastDateEl, iconEl, forecastTempEl, forecastHumidityEl, forecastWindSpeedEl);
    forecastCardContainerEl.append(forecastCardEl);
    forecastContainerEl.append(forecastCardContainerEl);
}

//5 day forecast for launch location
function getForecast(lat, lon) {
    var url = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;
    fetch(url).then(function(respone){
        return respone.json();
    })
    .then(function(data){
        console.log(data);  
        for (var i = 0; i < data.list.length; i++) {
            var hour = new Date(data.list[i].dt * 1000).getUTCHours(); 
            if (hour === 12) {
                console.log(data.list[i]);
                renderForecastCard(data.list[i]);
            }
        }
    }) 
}

getForecast(longitude, latitude);

var endDate = new Date(dateUserInput)
var second = 1000;
var minute = second * 60;
var hour = minute * 60;
var day = hour * 24;
var countdownTimer;

function countdownClock() {
    var present = new Date();
    var difference = endDate - present;

    if (difference < 0) {
        clearInterval(countdownTimer);
        document.getElementById("countdown").innerHTML = "Your Launch is in the Past.  Create a new Launch now!";
        return;
    }
    var days = Math.floor(difference / day);
    var hours = Math.floor((difference % day) / hour);
    var minutes = Math.floor((difference % hour) / minute);
    var seconds = Math.floor((difference % minute) / second);

    document.getElementById("countdown").innerHTML = days + " days " + hours + " hours " + minutes + " minutes " + seconds + " seconds"; 
}

countdownTimer = setInterval(countdownClock, 1000); 