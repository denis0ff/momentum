import { timer as timer } from "../js/time-calendar.js";

const body = document.querySelector("body");
const btnPrev = document.querySelector(".slide-prev");
const btnNext = document.querySelector(".slide-next");

const min = 10;
const max = 20;
let randomNumber = getRandomNumber(min, max);

function getRandomNumber(min, max) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function setRandomBackground() {
  const timeOfDay = timer.greetingOutput;
  const img = new Image();
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNumber}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url('${img.currentSrc}')`;
  };
}

function getSlidePrev() {
  randomNumber === min ? (randomNumber = max) : randomNumber--;
  setRandomBackground();
}

function getSlideNext() {
  randomNumber === max ? (randomNumber = min) : randomNumber++;
  setRandomBackground();
}

const slidePrev = btnPrev.addEventListener("click", getSlidePrev);
const slideNext = btnNext.addEventListener("click", getSlideNext);

export {
  setRandomBackground as randomBackground,
  slidePrev as slidePrev,
  slideNext as slideNext,
};
