import { setRandomBackground, getRandomNumber } from "./image-slider.js";
import { getQuotes } from "./day-quotes.js";
import { getWeather } from "./weather.js";
import { state } from "./time-calendar.js";
import { showNameHolder } from "./name-input.js";
const settings = document.querySelector(".settings-container");
const buttonShowHide = settings.querySelector(".settings-button");
const settingsDiv = settings.querySelector(".settings-panel");
const imagesToggles = settings.querySelectorAll(".images-source>input");
const selectImageTag = document.getElementById("api-tag");
const optionsOfImageTag = selectImageTag.querySelectorAll("option");
const languageToggles = settings.querySelectorAll(".language-source>input");

const menuItems = settings.querySelectorAll(".menu-item");
const blockLabels = settings.querySelectorAll(".block-item>label");
const blockItems = settings.querySelectorAll(".block-item>input");

const menu = {
  en: ["Images source", "Language", "Display elements"],
  ru: ["Источник изображения", "Язык", "Отобразить элементы"],
};

const blocks = {
  en: ["Time", "Date", "Greeting", "Quotes", "Weather", "Audio-player"],
  ru: ["Время", "Дата", "Приветствие", "Цитаты", "Погода", "Аудио-плеер"],
};

function showSettings() {
  settingsDiv.classList.toggle("show");
}

function updateImageRadio(e) {
  const photoSource = e.target.value;
  state.photoSource = photoSource;
  showHideTag(photoSource);
}

function showHideTag(photoSource) {
  selectImageTag.classList.remove("show");
  if (photoSource !== "github") {
    selectImageTag.classList.add("show");
  }
  updateApiTag();
}

function updateApiTag() {
  for (let option of optionsOfImageTag) {
    if (option.selected) {
      state.tag = option.value;
    }
  }
  setRandomBackground();
}

async function getLinkToImage() {
  let url;

  if (state.photoSource == "unsplash") {
    url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${state.tag}&client_id=Uh_vG0n7c8ChoTKsCq5Yc_5GtiySV34AsiJIDztdpqQ`;
    const res = await fetch(url);
    const data = await res.json();
    Promise.resolve().then((state.tagUrl = data.urls.regular));
  }
  if (state.photoSource == "flickr") {
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=a50e4730a02dc168ff6aec60014c330e&tags=${state.tag}&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    let number = getRandomNumber(0, 100);
    Promise.resolve().then((state.tagUrl = data.photos.photo[number].url_l));
  }
}

function updateLanguage(e) {
  state.language = e.target.value;
  getQuotes();
  getWeather();
  showNameHolder();
  updateLangSettings();
  updateLangBlock()
}

function updateLangSettings() {
  for (let i = 0; i < menu[state.language].length; i++) {
    menuItems[i].textContent = menu[state.language][i];
  }
}

function updateLangBlock() {
  for (let i = 0; i < blocks[state.language].length; i++) {
    blockLabels[i].textContent = blocks[state.language][i];
  }
}

function updateDisplayBlock(e) {
  const blockName = e.target.value;
  const block = document.querySelector(`.${blockName}`)
  state[blockName] = !state[blockName];
  block.classList.toggle("hide");
}

buttonShowHide.addEventListener("click", showSettings);
imagesToggles.forEach((toggle) =>
  toggle.addEventListener("change", updateImageRadio)
);
languageToggles.forEach((toggle) =>
  toggle.addEventListener("change", updateLanguage)
);

blockItems.forEach((checkbox) =>
  checkbox.addEventListener("change", updateDisplayBlock)
);
selectImageTag.addEventListener("change", updateApiTag);

export { showSettings, getLinkToImage };
