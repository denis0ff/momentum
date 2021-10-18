import { getLinkToImage, state } from "./settings";
import { timer } from "./time-calendar.js";

const body = document.querySelector("body");
const btnPrev = document.querySelector(".slide-prev");
const btnNext = document.querySelector(".slide-next");

const min = 1;
const max = 20;
const img = new Image();
const imageTimeArr = ["night", "morning", "afternoon", "evening"];
const index = timer.arrNumber;

let randomNumber = getRandomNumber(min, max);

function getRandomNumber(min, max) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

async function setRandomBackground() {
  if (state.photoSource == "github") {
    if (randomNumber > 0 && randomNumber < 10)
      if (typeof randomNumber !== 'string')
      randomNumber = `0${randomNumber}`;
    img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${imageTimeArr[index]}/${randomNumber}.jpg`;
  } else {
    await getLinkToImage();
    img.src = state.tagUrl;
  }
  img.onload = () => {
    body.style.backgroundImage = `url('${img.src}')`;
  };
}

function getSlidePrev() {
  randomNumber == min ? (randomNumber = max) : randomNumber--;
  setRandomBackground();
}

function getSlideNext() {
  randomNumber == max ? (randomNumber = min) : randomNumber++;
  setRandomBackground();
}

btnPrev.addEventListener("click", getSlidePrev);
btnNext.addEventListener("click", getSlideNext);

export { setRandomBackground, getRandomNumber };
