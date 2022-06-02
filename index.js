const searchBTN = document.getElementById("search-btn");
const locationInput = document.getElementById("location-input");
const temp_div = document.getElementById("temp_div");
const low_div = document.getElementById("low_div");
const high_div = document.getElementById("high_div");
const description_div = document.getElementById("description_div");
const icon_div = document.getElementById("icon_div");

//location.reload();

//Get Unique API URL
searchBTN.addEventListener("click", () => {
  const checkBox = document.getElementById("F").checked;
  let units = "imperial";
  if (checkBox === true) {
    units = "imperial";
  } else {
    units = "metric";
  }

  const api_URL =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    locationInput.value +
    "&units=" +
    units +
    "&appid=e9de49bf00010b0d5971840cafe13426";
  getWeather(api_URL);
});

locationInput.addEventListener("keyup", (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    searchBTN.click();
  }
});

// FETCH API DATA
async function getWeather(api_URL) {
  const response = await fetch(api_URL);
  const data = await response.json();
  weatherData(data);
}

//USE DATA IN DOM
function weatherData(data) {
  const icons = document.getElementById("icons");
  const icon = data.weather[0].icon;
  const current_temp = data.main.temp;
  const high_temp = data.main.temp_max;
  const low_temp = data.main.temp_min;
  const weather_description = data.weather[0].description;
  const location_title = document.getElementById("location-h2");

  const icon_url = "http://openweathermap.org/img/wn/" + icon + "@2x.png";

  function showData() {
    location_title.textContent = locationInput.value;
    temp_div.innerText = "Current:  " + current_temp;
    low_div.innerText = "Low:  " + low_temp;
    high_div.innerText = "High:  " + high_temp;
    description_div.innerText = "Weather:  " + weather_description;
    icons.src = icon_url;
  }
  showData();
}
