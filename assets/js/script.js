var citySearchText = document.querySelector("#city-search-text");
// var citySearchForm = document.querySelector("#search-form");
var citySearchButton = document.querySelector("#search-button");
var bigForecast = document.querySelector("#today-forecast");
var fiveDayArea = document.querySelector("#five-day-forecast");
var forecastContainer = document.querySelector("#forecast-area")

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
    console.log(cityName)

}

// fetch into open weather API to get data on the city entered by user
function getWeather(city) {
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

    console.log(temp)

    forecastContainer.textContent = "";

    var todayWeatherCard = document.createElement("div")
    todayWeatherCard.className = "card"

    var cityNameText = document.createElement("h4");
    cityNameText.className = "card-header bg-info text-white";
    cityNameText.textContent = city;

    forecastContainer.appendChild(todayWeatherCard);
    todayWeatherCard.appendChild(cityNameText);


    var weatherIcon = document.createElement("img");
    weatherIcon.src = "http://openweathermap.org/img/wn/" + icon + ".png";
    todayWeatherCard.appendChild(weatherIcon);

    var todayTemp = document.createElement("div");
    todayTemp.className = "card-body";
    todayTemp.textContent = "Temperature: " + temp + "°F";

    todayWeatherCard.appendChild(todayTemp);

    var todayHumidity = document.createElement("div");
    todayHumidity.className = "card-body";
    todayHumidity.textContent = "Humidity: " + humidity+"%";

    todayWeatherCard.appendChild(todayHumidity);

    var todayWind = document.createElement("div");
    todayWind.className = "card-body";
    todayWind.textContent = "Wind Speed: " + windSpeed +" m/s";

    todayWeatherCard.appendChild(todayWind);
};


function getFiveDay() {

}

//function to display search history
// function displaySearchHistory() {

// }


// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={apiKey}

citySearchButton.addEventListener("click", searchCityEntered);