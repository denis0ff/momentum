import { state } from "./time-calendar.js";
import {
  updateLanguage,
  updateDisplayBlock,
  updateImageRadio,
} from "./settings.js";

const nameInput = document.querySelector(".name");

const holderText = {
  en: `Enter Name`,
  ru: `Введите Имя`,
};

function showNameHolder() {
  nameInput.placeholder = `[${holderText[state.language]}]`;
}

function setLocalStorage() {
  localStorage.setItem("name", nameInput.value);
  localStorage.setItem("state", JSON.stringify(state));
}

function getLocalStorage() {
  if (localStorage.getItem("name"))
    nameInput.value = localStorage.getItem("name");

  let getState = JSON.parse(localStorage.getItem("state"));
  for (let key in state) {
    state[key] = getState[key];
  }
  updateLanguage();
  updateDisplayBlock();
  updateImageRadio();
}

window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);

export { showNameHolder };
