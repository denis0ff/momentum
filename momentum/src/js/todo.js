import { getRandomNumber } from "./image-slider.js";
import { state } from "./time-calendar";

const todo = document.querySelector(".todo__list");
const todoNull = todo.querySelector(".todo-null");
const todoQuestion = todoNull.querySelector("#todo-question");
const todoQuestionTitle = todoNull.querySelector(".todo-question");

const todoContent = todo.querySelector(".todo-content");
const todoTitle = todo.querySelector(".todo-title");
const todoCheck = todoContent.querySelector(".todo-check");
const todoText = todoContent.querySelector(".todo-text");
const todoDots = todoContent.querySelector(".todo-dots");
const todoOptions = todoContent.querySelector(".todo-options");
const todoCompleteText = todoContent.querySelector(".todo-complete");
const todoEdit = todoContent.querySelector(".todo-edit");
const todoClear = todoContent.querySelector(".todo-clear");
const todoNew = todoContent.querySelector(".todo-new");

const completeText = {
  en: ["Good job!", "Nice.", "Great work!", "Way to go!"],
  ru: ["Ты лучший.", "Отлично!", "Хорошая работа!", "Класс!"],
};

const todoTranslite = {
  en: ["What is your main focus for today?", "TODAY", 'Edit', 'Clear', 'New'],
  ru: ["На чем сконцентрируемся сегодня?", "СЕГОДНЯ", 'Изменить', 'Очистить', 'Новый']
}

function updateTodoLang() {
  todoQuestionTitle.textContent = todoTranslite[state.language][0];
  todoTitle.textContent = todoTranslite[state.language][1];
  todoEdit.textContent = todoTranslite[state.language][2];
  todoClear.textContent = todoTranslite[state.language][3];
  todoNew.textContent = todoTranslite[state.language][4];
}


function updateTodo() {
  if (todoQuestion.value) {
    let shortTodo = todoQuestion.value
    const maxLeng = document.documentElement.clientWidth / 30
    console.log(maxLeng);
    if (shortTodo.length > maxLeng) {
      shortTodo = shortTodo.slice(0, maxLeng - 4) + '...'
    }
    todoText.textContent = shortTodo;
    toggleTodoBar(true);
  }
}

function toggleTodoBar(flag) {
  if (flag) {
    todoNull.classList.toggle("hide");
    setTimeout(() => {
      todoContent.classList.toggle("hide");
    }, 1000);
  } else {
    todoContent.classList.toggle("hide");
    setTimeout(() => {
      todoNull.classList.toggle("hide");
    }, 1500);
  }
}

function showTodoOptions() {
  todoOptions.classList.toggle("hide");
}

async function updateTodoStatus() {
  todoCheck.classList.toggle("complete");
  todoText.classList.toggle("complete");
  todoOptions.classList.add("hide");
  todoEdit.classList.toggle("not-display");
  todoNew.classList.toggle("not-display");
  showSuccess();
}

async function showSuccess() {
  if (todoCheck.classList.contains("complete")) {
    todoCompleteText.classList.toggle("hide");
    const index = getRandomNumber(0, 3);
    todoCompleteText.textContent = completeText[state.language][index];
    setTimeout(() => {
      todoCompleteText.classList.toggle("hide");
    }, 1000);
  }
}

function editTodo() {
  toggleTodoBar(false);
}

function clearTodo() {
  todoQuestion.value = "";
  toggleTodoBar(false);
}

todoQuestion.addEventListener("change", updateTodo);
todoCheck.addEventListener("click", updateTodoStatus);
todoDots.addEventListener("click", showTodoOptions);
todoEdit.addEventListener("click", editTodo);
todoClear.addEventListener("click", clearTodo);
todoNew.addEventListener("click", clearTodo);

export { updateTodoLang, updateTodo };
