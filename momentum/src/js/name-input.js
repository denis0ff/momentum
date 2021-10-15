const nameInput = document.querySelector(".name");

function setLocalStorage() {
  localStorage.setItem("name", nameInput.value);
}

function getLocalStorage() {
  if (localStorage.getItem("name")) {
    nameInput.value = localStorage.getItem("name");
  }
}

const setEvent = window.addEventListener("beforeunload", setLocalStorage);
const getEvent = window.addEventListener("load", getLocalStorage);

export { setEvent, getEvent };
