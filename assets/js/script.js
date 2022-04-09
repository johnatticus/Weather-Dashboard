const searchHistory = [];
const weatherApiUrl = "https://api.openweather.org";
const apiKey = "21e6cc9ea27c09ef65e174309fcb718d"

// DOM elements
let searchForm
let searchInput
let todayBox
let forecastBox
let searchDisplayBox

//add timezine for day.js
dayjs.extend(window.dayjs_plugin_utc);
dayjs.extend(window.dayjs_plugin_timezone);

//function to display search history
function displaySearchHistory() {

}

