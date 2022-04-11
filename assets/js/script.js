var citySearchText = document.querySelector("#city-search-text");
// var citySearchForm = document.querySelector("#search-form");
var citySearchButton = document.querySelector("#search-button");
var bigForecast = document.querySelector("#today-forecast");
var fiveDayArea = document.querySelector("#five-day-forecast");

const searchHistory = [];

// const weatherApiUrl = "https://api.openweather.org";
const apiKey = "21e6cc9ea27c09ef65e174309fcb718d"

//add timezine for day.js
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

// search bar and submit button. when entered and clicked, begin other functions
var searchCityEntered = function(event){
    event.preventDefault();

var cityName = citySearchText.value.trim();
    
if (cityName) {
    getWeather(cityName);
    getFiveDay(cityName);
} else {
    alert("Please enter a city name");
    }
}

// fetch into open weather API to get data on the city entered by user
function getWeather() {
    //format the weather API key
    var apiUrl = "https://api.openweathermap.org/data/2.5/weather?q=" + city + "&units=imperial&appid=21e6cc9ea27c09ef65e174309fcb718d";

    fetch(apiUrl).then(function(response){
        if(response.ok){
            response.json().then(function(data){
                displayCurrentTemp(data);
            });
        }else{
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error){
        alert("unable to connect");
    })
}

// function to display the data we want from the api fetch
var displayCurrentTemp = function(data){
    
    var city = data.name;
    var icon = data.weather[0].icon;
    var temp = data.main.temp;
    var humidity = data.main.humidity;
    var windSpeed = data.wind.speed;
    var lat = data.coord.lat;
    var lon = data.coord.lon;

    cityContainerEl.textContent = "";

    var cityNameDisplay = document.createElement("h2");
    cityNameDisplay.className = "subtitle"
    cityNameDisplay.textContent = city;

    cityContainerEl.appendChild(cityNameDisplay);

    var weatherIcon = document.createElement("img");
    weatherIcon.src = "http://openweathermap.org/img/wn/" + icon + ".png";
    cityContainerEl.appendChild(weatherIcon);

    var cityTemp = document.createElement("p");
    cityTemp.textContent = "Temperature: " + temp + "°C";

    cityContainerEl.appendChild(cityTemp);

    var cityHumidity = document.createElement("p");
    cityHumidity.textContent = "Humidity: " + humidity+"%";

    cityContainerEl.appendChild(cityHumidity);

    var wind = document.createElement("p");
    wind.textContent = "Wind Speed: " + windSpeed +" m/s";

    cityContainerEl.appendChild(wind);

    getUVIndex(lat,lon);

};



function getFiveDay() {

}

//function to display search history
// function displaySearchHistory() {

// }


// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={apiKey}

citySearchButton.addEventListener("click", searchCityEntered);