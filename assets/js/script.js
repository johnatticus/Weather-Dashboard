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

// 
var searchCityEntered = function(event){
    event.preventDefault();

var cityName = citySearchText.value.trim();
    
if (cityName) {
    getWeather(cityName);
    getFiveDay(cityName);
} else {
    alert("Please enter a city name");
    }
    // console.log(cityName)
}

function getWeather(cityName) {
    var geoAPI = "https://api.openweathermap.org/data/2.5/weather?q=" + cityName + "&units=imperial&appid=21e6cc9ea27c09ef65e174309fcb718d";

    fetch(geoAPI).then(function(response){
        if(response.ok){
            response.json().then(function(APIdata){
                displayCurrentTemp(APIdata);
                console.log(response)
            });
        }else{
            alert("Error: " + response.statusText);
        }
    })
    .catch(function(error){
        alert("unable to connect");
    })
}

var displayCurrentTemp = function(APIdata){
    
    var city = APIdata.name;
    var icon = APIdata.weather[0].icon;
    var temp = APIdata.main.temp;
    var humidity = APIdata.main.humidity;
    var windSpeed = APIdata.wind.speed;
    var lat = APIdata.coord.lat;
    var lon = APIdata.coord.lon;
    // var UV = data.current.uvi;

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

    // var todayUV = document.createElement("div");
    // todayUV.textContent = "UV rating: " + data.current.uvi;

    // todayWeatherCard.appendChild(todayUV);
};


function getFiveDay() {

}

//function to display search history
// function displaySearchHistory() {

// }


// http://api.openweathermap.org/geo/1.0/direct?q=London&limit=5&appid={apiKey}

citySearchButton.addEventListener("click", searchCityEntered);