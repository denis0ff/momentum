const city = document.querySelector(".city");
const weatherError = document.querySelector(".weather-error");
const weatherIcon = document.querySelector(".weather-icon");
const temperature = document.querySelector(".temperature");
const weatherDescription = document.querySelector(".weather-description");
const wind = document.querySelector(".wind");
const humidity = document.querySelector(".humidity");

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=en&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  Promise.resolve().then(setWeather(data));
}

function setWeather(data) {
  if (data.cod !== 200) {
    weatherError.textContent = `Error! city not found for '${city.value}'!`;
    weatherIcon.className = "";
    temperature.textContent = ``;
    weatherDescription.textContent = ``;
    wind.textContent = ``;
    humidity.textContent = ``;
  } else {
    weatherError.textContent = ``;
    weatherIcon.className = "weather-icon owf";
    weatherIcon.classList.add(`owf-${data.weather[0].id}`);
    temperature.textContent = `${Math.round(data.main.temp)}°C`;
    weatherDescription.textContent = data.weather[0].description;
    wind.textContent = `Wind speed: ${Math.round(data.wind.speed)} m/s`;
    humidity.textContent = `Humidity: ${Math.round(data.main.humidity)}%`;
  }
}

function setLocalStorage() {
  localStorage.setItem("city", city.value);
}

function getLocalStorage() {
  if (localStorage.getItem("city")) {
    city.value = localStorage.getItem("city");
    getWeather();
  }
}

city.addEventListener("change", getWeather);

window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);

export default getWeather();
