import { state } from "./time-calendar.js";

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
  localStorage.setItem("state", JSON.stringify("state"));
}

function getLocalStorage() {
  if (localStorage.getItem("name"))
    nameInput.value = localStorage.getItem("name");
  if (localStorage.getItem("state"))
    state = JSON.parse(localStorage.getItem("state"));
}

window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);

export { showNameHolder };
