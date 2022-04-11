const searchHistory = [];
// const weatherApiUrl = "https://api.openweather.org";
const apiKey = "21e6cc9ea27c09ef65e174309fcb718d"

// DOM elements
let searchForm = document.querySelector("#search-form");
let searchInput = document.querySelector("#search-form");
let todayBox = document.querySelector("#weather-result");
let forecastBox = document.querySelector("#five-day-forecast");
let searchDisplayBox = document.querySelector("#search-display");

//add timezine for day.js
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

//function to display search history
function displaySearchHistory() {

}

var weatherApiUrl = `http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid=${apiKey}`;

function weatherData() {
    fetch(weatherApiUrl)
    .then(function(res) {
      return res.json()        
    })
    .then(function(data) {
        console.log(data);
    })
}

weatherData();

// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={apiKey}