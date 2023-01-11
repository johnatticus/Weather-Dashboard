var searchStorage = [];

// variables to traverse DOM
var citySearchText = document.querySelector("#city-search-text");
var citySearchForm = document.querySelector("#search-form");
var bigForecast = document.querySelector("#today-forecast");
var fiveDayArea = document.querySelector("#five-day-deck");
var forecastContainer = document.querySelector("#forecast-area");
var searchHistoryContainer = document.querySelector('#history');

var apiKey = "21e6cc9ea27c09ef65e174309fcb718d";

// add timezine for day.js
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

// function to display search history
// work in progress
function displaySearchHistory() {
    searchHistoryContainer.innerHTML = "";
  
    // Start at end of history array and count down to show the most recent at the top.
    for (var i = searchStorage.length - 1; i >= 0; i--) {
      var btn = document.createElement("button");
      btn.setAttribute("type", "button");
      btn.setAttribute("aria-controls", "today forecast");
      btn.classList.add("btn", "btn-block", "btn-secondary", "mt-2", "mb-2");
  
      // `data-search` allows access to city name when click handler is invoked
      btn.setAttribute("data-search", searchStorage[i]);
      btn.textContent = searchStorage[i];
      searchHistoryContainer.append(btn);
    }
  }

  // Function to update history in local storage then updates displayed history.
function appendToHistory(cityName) {
    // If there is no search term return the function
    if (searchStorage.indexOf(cityName) !== -1) {
      return;
    }
    searchStorage.push(cityName);
  
    localStorage.setItem("city-search-history", JSON.stringify(searchStorage));
    displaySearchHistory();
  }
  
  // Function to get search history from local storage
  function initSearchHistory() {
    var storedHistory = localStorage.getItem("city-search-history");
    if (storedHistory) {
      searchStorage = JSON.parse(storedHistory);
    }
    displaySearchHistory();
  }

// get the text input from user and turn into a var
// if nothing entered, present an alert
// if city entered, go to next function
var searchCityEntered = function (event) {
  event.preventDefault();

  var cityName = citySearchText.value.trim();

  if (cityName) {
    getLatLon(cityName);
    citySearchText.value = '';
    // getFiveDay(cityName);
  } else {
    alert("Please enter a city name");
  }
};

// fetch to api to get lat and lon for city entered.
// once that data is fetched, move to next function
// error coding present in case a non city name is entered but it is work in progress
function getLatLon(cityName) {
  console.log(cityName);
  if (cityName) {
    fetch(
      `http://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${apiKey}`
    )
      .then(function (res) {
        return res.json();
      })
      .then(function (data) {
        console.log(data);
        weatherData(data);
        appendToHistory(cityName);
      });
  } else {
    alert("Error: " + response.statusTest);
  }
}

// function that takes the lat and lon and fetches weather information from one call api
// pushes that data to the next function
function weatherData(data) {
  var city = data[0].name;
  var latitude = data[0].lat;
  var longitude = data[0].lon;
  console.log(latitude);
  console.log(longitude);
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?appid=${apiKey}&lat=${latitude}&lon=${longitude}&units=imperial`
  )
    .then(function (res) {
      return res.json();
    })
    .then(function (data) {
      console.log(data);
      displayCurrentTemp(city, data);
      getFiveDay(data);
    });
}

// function to go into data and get the info needed
// pushes that data to the HTML for the daily forecast
// city name is currently work in progress as well as date
var displayCurrentTemp = function (city, data) {
  timezone = data.timezone;
  var date = dayjs().tz(timezone).format("M/D/YYYY");
  //   console.log(data);
  //   console.log(data.daily);
  var icon = data.current.weather[0].icon;
  var temp = data.current.temp;
  var humidity = data.current.humidity;
  var windSpeed = data.current.wind_speed;
  var uvi = data.current.uvi;
  //   console.log(temp);
  forecastContainer.innerHTML = "";

  var todayWeatherCard = document.createElement("div");
  todayWeatherCard.className = "card";

  var cityNameText = document.createElement("h4");
  cityNameText.className = "card-header bg-primary text-white";
  cityNameText.textContent = `${city} ${date}`;

  var todayWeatherCardBody = document.createElement("div");
  todayWeatherCardBody.className = "card-body";

  var weatherIcon = document.createElement("img");
  weatherIcon.src = "http://openweathermap.org/img/wn/" + icon + ".png";
  //   todayWeatherCard.appendChild(weatherIcon);

  var todayTemp = document.createElement("p");
  todayTemp.className = "card-text";
  todayTemp.textContent = "Temperature: " + temp + "°F";

  //   todayWeatherCard.appendChild(todayTemp);

  var todayHumidity = document.createElement("p");
  todayHumidity.className = "card-text";
  todayHumidity.textContent = "Humidity: " + humidity + "%";

  //   todayWeatherCard.appendChild(todayHumidity);

  var todayWind = document.createElement("p");
  todayWind.className = "card-text";
  todayWind.textContent = "Wind Speed: " + windSpeed + " m/s";

  //   todayWeatherCard.appendChild(todayWind);

  var todayUV = document.createElement("p");

  forecastContainer.appendChild(todayWeatherCard);
  todayWeatherCard.appendChild(cityNameText);
  todayWeatherCard.appendChild(todayWeatherCardBody);
  todayWeatherCardBody.append(weatherIcon, todayTemp, todayHumidity, todayWind);

  // if statements to change the text color of UV based on UV index colors
  if (uvi <= 2) {
    todayUV.className = "card-text low";
    todayUV.textContent = "UV rating: " + uvi;
    todayWeatherCardBody.appendChild(todayUV);
  }

  if (uvi > 2 && uvi <= 5) {
    todayUV.className = "card-text moderate";
    todayUV.textContent = "UV rating: " + uvi;
    todayWeatherCardBody.appendChild(todayUV);
  }

  if (uvi > 5 && uvi <= 7) {
    todayUV.className = "card-text high";
    todayUV.textContent = "UV rating: " + uvi;
    todayWeatherCardBody.appendChild(todayUV);
  }

  if (uvi > 7 && uvi <= 10) {
    todayUV.className = "card-text veryhigh";
    todayUV.textContent = "UV rating: " + uvi;
    todayWeatherCardBody.appendChild(todayUV);
  }

  if (uvi > 10) {
    todayUV.className = "card-text extreme";
    todayUV.textContent = "UV rating: " + uvi;
    todayWeatherCardBody.appendChild(todayUV);
  }
};

// function to get 5 day forecast
// work in progress. for loop works, needs the date added
var getFiveDay = function (data) {
  console.log(data);
  var timezone = data.timezone;
  // var date = dayjs().tz(timezone).format('M/D/YYYY');
  var days = data.daily;
  fiveDayArea.textContent = "";

  for (let i = 1; i < days.length; i++) {
    var dt = data.daily[i].dt;
    var icon = data.daily[i].weather[0].icon;
    var temp = data.daily[i].temp.day;
    var humidity = data.daily[i].humidity;
    var windSpeed = data.daily[i].wind_speed;
    console.log(temp);
    console.log(days);

    var fiveDayCard = document.createElement("div");
    fiveDayCard.className = "card";

    var fiveDayCardBody = document.createElement("div");
    fiveDayCardBody.className = "card-body";

    var fiveDayDate = document.createElement("div");
    fiveDayDate.className = "card-header bg-primary text-white";
    fiveDayDate.textContent = dayjs.unix(dt).tz(timezone).format("MM/DD/YYYY");

    var weatherIcon = document.createElement("img");
    weatherIcon.src = "http://openweathermap.org/img/wn/" + icon + ".png";

    var fiveDayTemp = document.createElement("p");
    fiveDayTemp.className = "card-text";
    fiveDayTemp.textContent = "Temperature: " + temp + "°F";

    var fiveDayHumidity = document.createElement("p");
    fiveDayHumidity.className = "card-text";
    fiveDayHumidity.textContent = "Humidity: " + humidity + "%";

    var fiveDayWind = document.createElement("p");
    fiveDayWind.className = "card-text";
    fiveDayWind.textContent = "Wind Speed: " + windSpeed + " m/s";

    fiveDayArea.appendChild(fiveDayCard);
    fiveDayCard.appendChild(fiveDayDate);
    fiveDayCard.appendChild(fiveDayCardBody);
    fiveDayCardBody.append(
      weatherIcon,
      fiveDayTemp,
      fiveDayHumidity,
      fiveDayWind
    );

    if (i > 4) {
      break;
    }
  }
};

function searchStorageClick(e) {
    // Don't do search if current elements is not a search history button
    if (!e.target.matches('.btn-secondary')) {
      return;
    }
  
    var btn = e.target;
    var search = btn.getAttribute('data-search');
    getLatLon(search);
  }

initSearchHistory();

// listen for click on search button
citySearchForm.addEventListener("submit", searchCityEntered);
searchHistoryContainer.addEventListener("click", searchStorageClick)
