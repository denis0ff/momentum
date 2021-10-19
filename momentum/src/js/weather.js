
import { state } from "./time-calendar.js";
const weatherDiv = document.querySelector(".weather");
const city = weatherDiv.querySelector(".city");
const weatherError = weatherDiv.querySelector(".weather-error");
const weatherIcon = weatherDiv.querySelector(".weather-icon");
const temperature = weatherDiv.querySelector(".temperature");
const weatherDescription = weatherDiv.querySelector(".weather-description");
const wind = weatherDiv.querySelector(".wind");
const humidity = weatherDiv.querySelector(".humidity");

async function getWeather() {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city.value}&lang=${state.language}&appid=08f2a575dda978b9c539199e54df03b0&units=metric`;
  const res = await fetch(url);
  const data = await res.json();
  Promise.resolve().then(setWeather(data));
}

async function setWeather(data) {
  const lang = state.language;
  const error = {
    en: `Error! City not found for`,
    ru: `Ошибка! Не найдено совпадений для`,
  };
  const windSpeed = {
    en: `Wind speed`,
    ru: `Скорость ветра`,
  };
  const ms = {
    en: `m/s`,
    ru: `м/с`,
  };
  const humid = {
    en: `Humidity`,
    ru: `Влажность`,
  };
  if (data.cod !== 200) {
    weatherError.textContent = `${error[lang]} '${city.value}'!`;
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
    wind.textContent = `${windSpeed[lang]}: ${Math.round(data.wind.speed)} ${
      ms[lang]
    }`;
    humidity.textContent = `${humid[lang]}: ${Math.round(data.main.humidity)}%`;
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

export { getWeather };
