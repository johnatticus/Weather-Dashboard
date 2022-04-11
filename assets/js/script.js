var citySearchText = document.querySelector("#city-search-text");
var citySearchForm = document.querySelector("#search-form");

const searchHistory = [];

// const weatherApiUrl = "https://api.openweather.org";
const apiKey = "21e6cc9ea27c09ef65e174309fcb718d"

//add timezine for day.js
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

var searchCityEntered = function(event){
    event.preventDefault();

    var cityName = citySearchText.value.trim();
    
    if(cityName){
        getCityWeather(cityName);
        getCityFiveDayForecast(cityName);
    }else{
        alert("Please enter a city name");
    }
    
}

//function to display search history
// function displaySearchHistory() {

// }


// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={apiKey}

citySearchForm.addEventListener("click", searchCityEntered);