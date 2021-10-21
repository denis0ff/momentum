import { state } from "./time-calendar.js";
import {
  updateLanguage,
  updateDisplayBlock,
  updateImageRadio,
} from "./settings.js";
import { updateTodo } from "./todo.js";
const nameInput = document.querySelector(".name");
const todoQuestion = document.querySelector("#todo-question");

const holderText = {
  en: `Enter Name`,
  ru: `Введите Имя`,
};

function showNameHolder() {
  nameInput.placeholder = `[${holderText[state.language]}]`;
}

function setLocalStorage() {
  localStorage.setItem("name", nameInput.value);
  localStorage.setItem("todo", todoQuestion.value);
  localStorage.setItem("state", JSON.stringify(state));
}

function getLocalStorage() {
  if (localStorage.getItem("name"))
    nameInput.value = localStorage.getItem("name");
  if (localStorage.getItem("todo"))
    todoQuestion.value = localStorage.getItem("todo");

  let getState = JSON.parse(localStorage.getItem("state"));
  for (let key in state) {
    state[key] = getState[key];
  }
  updateLanguage();
  updateDisplayBlock();
  updateImageRadio();
  updateTodo();
}

window.addEventListener("beforeunload", setLocalStorage);
window.addEventListener("load", getLocalStorage);

export { showNameHolder };
