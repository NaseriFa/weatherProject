//alert("hello");

function refreshDate(date){
  let days =[
    "Sun",
    "Mon",
    "Tue",
    "Wed",
    "Thu",
    "Fri",
    "Sat"
  ];
  let day =days[date.getDay()];
  let currentDate = date.getDate();
  if(currentDate < 10){
    currentDate = `0${currentDate}`;
  };
  let month = date.getMonth() + 1;
  if(month < 10){
    month = `0${month}`;
  };
  
  let year = date.getFullYear();
  return `${day}, ${currentDate}.${month}.${year}`;

}
function refreshTime(time){
  let hours = time.getHours();
  let minutes = time.getMinutes();

  return `${hours}:${minutes}`;
}
function refreshInformation(response){
  console.log(response.data);
  //update Time and date
  let now = new Date((response.data.time) * 1000);
  console.log(now);
  let dateElement =document.querySelector(".date");
  dateElement.innerHTML = refreshDate(now);
  let timeElement = document.querySelector(".time");
  timeElement.innerHTML =refreshTime(now);

  //update the location
    let locationElements = document.querySelectorAll(".location");
    locationElements.forEach(el => {
      el.innerHTML = `${response.data.city}, ${response.data.country}`;
    });

    //update the temperature
    let temperatureElement = document.querySelector("#temperature");
    temperatureElement.innerHTML = Math.round(response.data.temperature.current);

    //update description
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.condition.description;
     console.log(response.data.condition.description);
     //update wind-speed
     let windSpeedElement = document.querySelector("#wind-speed");
     windSpeedElement.innerHTML = `${response.data.wind.speed} km/h`;
     console.log(response.data.wind.speed);
     //upadate humidity
     let humidityElement = document.querySelector("#humidity-value");
     humidityElement.innerHTML = `${response.data.temperature.humidity} %`;
     //update current-weather-icon
     let iconElement = document.querySelector("#icon");
     iconElement.innerHTML = `<img src="${response.data.condition.icon_url}" class="current-location-icon" />`;   
}
function searchCity(city){
  let apiKey = "8d54b800a79o3a3f274ta06a2117547b";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(refreshInformation);
  
}
function handelSubmit(event) {
  event.preventDefault();
  let searchBarElement = document.querySelector("#search-bar");
  let newCity = searchBarElement.value.trim();
  searchCity(newCity);
}

let formElement =document.querySelector(".search-input-form");
formElement.addEventListener("submit",handelSubmit);

searchCity("Paris");
