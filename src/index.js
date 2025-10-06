function refreshDate(date) {
  const days = [
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];
  const day = days[date.getDay()];
  let currentDate = date.getDate();
  if (currentDate < 10) {
    currentDate = `0${currentDate}`;
  }
  let month = date.getMonth() + 1;
  if (month < 10) {
    month = `0${month}`;
  }

  const year = date.getFullYear();
  return `${day}, ${currentDate}.${month}.${year}`;
}

function refreshTime(time) {
  let hours = time.getHours();
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function refreshInformation(response) {
  // console.log(response.data);

  // Update time and date
  const now = new Date(response.data.time * 1000);
  const dateElement = document.querySelector(".date");
  dateElement.innerHTML = refreshDate(now);

  const timeElement = document.querySelector(".time");
  timeElement.innerHTML = refreshTime(now);

  // Update the location
  const locationElements = document.querySelectorAll(".location");
  locationElements.forEach(el => {
    el.innerHTML = `${response.data.city}, ${response.data.country}`;
  });

  // Update temperature
  const temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = Math.round(response.data.temperature.current);

  // Update description
  const descriptionElement = document.querySelector("#description");
  descriptionElement.innerHTML = response.data.condition.description;

  // Update wind speed
  const windSpeedElement = document.querySelector("#wind-speed");
  windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;

  // Update humidity
  const humidityElement = document.querySelector("#humidity-value");
  humidityElement.innerHTML = `${response.data.temperature.humidity}%`;

  // Update current weather icon
  const iconElement = document.querySelector("#icon");
  iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-location-icon" />`;

  // Get forecast data
  getForecast(response.data.city);
}

function searchCity(city) {
  const apiKey = "8d54b800a79o3a3f274ta06a2117547b";
  const apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshInformation);
}

function handleSubmit(event) {
  event.preventDefault();
  const searchBarElement = document.querySelector("#search-bar");
  const newCity = searchBarElement.value.trim();
  searchCity(newCity);
}

function formatForecastDay(timestamp) {
  const date = new Date(timestamp * 1000);
  const days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[date.getDay()];
}

function getForecast(city) {
  const apiKey = "8d54b800a79o3a3f274ta06a2117547b";
  const apiUrl = `https://api.shecodes.io/weather/v1/forecast?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayForecast);
}

function displayForecast(response) {
  // console.log(response.data);

  const days = response.data.daily;
  const forecastContentBox = document.querySelector(".forecast-weather-box");
  let forecastElement = "";

  days.forEach(function (day, index) {
    // Skip today, show the next 6 days
    if (index > 0 && index < 7) {
      forecastElement += `
        <div class="weather-forecast-day">
          <div class="weather-forecast-date">
            ${formatForecastDay(day.time)}
          </div>
          <div class="forecast-weather-description">${day.condition.description}</div>
          <div class="weather-forecast-temperatures">
            <div class="weather-forecast-temperature"><strong>${Math.round(day.temperature.maximum)}°</strong></div>
            <div><img src="${day.condition.icon_url}" class="weather-forecast-icon" /></div>
            <div class="weather-forecast-temperature">${Math.round(day.temperature.minimum)}°</div>
          </div>
        </div>`;
    }
  });

  forecastContentBox.innerHTML = forecastElement;
}

const formElement = document.querySelector(".search-input-form");
formElement.addEventListener("submit", handleSubmit);

searchCity("Paris");
