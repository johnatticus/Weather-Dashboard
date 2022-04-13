// variables to traverse DOM
var citySearchText = document.querySelector("#city-search-text");
var citySearchButton = document.querySelector("#search-button");
var bigForecast = document.querySelector("#today-forecast");
var fiveDayArea = document.querySelector("#five-day-deck");
var forecastContainer = document.querySelector("#forecast-area")

const apiKey = "21e6cc9ea27c09ef65e174309fcb718d"

// add timezine for day.js
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

// get the text input from user and turn into a var
// if nothing entered, present an alert
// if city entered, go to next function
var searchCityEntered = function(event){
    event.preventDefault();

var cityName = citySearchText.value.trim();
    
if (cityName) {
    getLatLon(cityName);
    // getFiveDay(cityName);
} else {
    alert("Please enter a city name");
    }

}

// fetch to api to get lat and lon for city entered.
// once that data is fetched, move to next function
// error coding present in case a non city name is entered but it is work in progress
function getLatLon(cityName) {
    console.log(cityName)
    if(cityName) {
    fetch(`https://floating-headland-95050.herokuapp.com/http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=21e6cc9ea27c09ef65e174309fcb718d`)
    .then(function(res) {
      return res.json()
    })
    .then(function(data) {
        console.log(data);
        weatherData(data)
    })
} else {
    alert("Error: " + response.statusTest)
}
}

// function that takes the lat and lon and fetches weather information from one call api
// pushes that data to the next function
function weatherData(data) {
    var latitude = data[0].lat
    var longitude = data[0].lon
    console.log(latitude)
    console.log(longitude);
      fetch(`https://floating-headland-95050.herokuapp.com/https://api.openweathermap.org/data/2.5/onecall?appid=21e6cc9ea27c09ef65e174309fcb718d&lat=${latitude}&lon=${longitude}&units=imperial`)
      .then(function(res) {
        return res.json()
      })
      .then(function(data) {
          console.log(data);
          displayCurrentTemp(data);
          getFiveDay(data);
      })
}

// function to go into data and get the info needed
// pushes that data to the HTML for the daily forecast
// city name is currently work in progress as well as date
var displayCurrentTemp = function(data){
    console.log(data.daily)
    var city = data.name;
    var icon = data.current.weather[0].icon;
    var temp = data.current.temp;
    var humidity = data.current.humidity;
    var windSpeed = data.current.wind_speed;
    var uvi = data.current.uvi;
    var dT = data.current.dt;
    console.log(dT)
    // var lat = data.coord.lat;
    // var lon = data.coord.lon;

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

    var todayUV = document.createElement("div");
    
    // if statements to change the text color of UV based on UV index colors
    if (uvi <= 2) {
        todayUV.className = "card-body low"
        todayUV.textContent = "UV rating: " + uvi;
        todayWeatherCard.appendChild(todayUV);
    }

    if (uvi > 2 && uvi <= 5) {
        todayUV.className = "card-body moderate"
        todayUV.textContent = "UV rating: " + uvi;
        todayWeatherCard.appendChild(todayUV);
    }
    
    if (uvi > 5 && uvi <= 7) {
        todayUV.className = "card-body high"
        todayUV.textContent = "UV rating: " + uvi;
        todayWeatherCard.appendChild(todayUV);
    }

    if (uvi > 7 && uvi <= 10) {
        todayUV.className = "card-body veryhigh"
        todayUV.textContent = "UV rating: " + uvi;
        todayWeatherCard.appendChild(todayUV);
    }

    if (uvi > 10) {
        todayUV.className = "card-body extreme"
        todayUV.textContent = "UV rating: " + uvi;
        todayWeatherCard.appendChild(todayUV);
    }
};






// function to get 5 day forecast
// work in progress
var getFiveDay = function(data) {

    var icon = data.daily[0].weather[0].icon;
    var temp = data.daily[0].temp.day;
    var humidity = data.daily[0].humidity;
    var windSpeed = data.daily[0].wind_speed;
console.log(temp)

fiveDayArea.textContent = "";

    for (let i = 1; i < 6; i++) {
    var fiveDayCard = document.createElement("div")
    fiveDayCard.className = "card"

    var cityNameText = document.createElement("h4");
    cityNameText.className = "card-header bg-primary text-white";

    fiveDayArea.appendChild(fiveDayCard);
    fiveDayCard.appendChild(cityNameText);


    var weatherIcon = document.createElement("img");
    weatherIcon.src = "http://openweathermap.org/img/wn/" + icon + ".png";
    fiveDayCard.appendChild(weatherIcon);

    var todayTemp = document.createElement("div");
    todayTemp.className = "card-body";
    todayTemp.textContent = "Temperature: " + temp + "°F";

    fiveDayCard.appendChild(todayTemp);

    var todayHumidity = document.createElement("div");
    todayHumidity.className = "card-body";
    todayHumidity.textContent = "Humidity: " + humidity+"%";

    fiveDayCard.appendChild(todayHumidity);

    var todayWind = document.createElement("div");
    todayWind.className = "card-body";
    todayWind.textContent = "Wind Speed: " + windSpeed +" m/s";

    fiveDayCard.appendChild(todayWind);
}
}
// function to display search history
// work in progress
function displaySearchHistory() {

}

// listen for click on search button
citySearchButton.addEventListener("click", searchCityEntered);