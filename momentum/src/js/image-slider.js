
const body = document.querySelector("body");
const btnPrev = document.querySelector(".slide-prev");
const btnNext = document.querySelector(".slide-next");
const greeting = document.querySelector(".greeting");

const min = 1;
const max = 20;
const img = new Image();
const timeOfDay = greeting.textContent.slice(5);

let randomNumber = getRandomNumber(min, max);

function getRandomNumber(min, max) {
  const rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function setRandomBackground() {
  if (randomNumber > 0 && randomNumber < 10) randomNumber = `0${randomNumber}`;
  if (!timeOfDay) return
  img.src = `https://raw.githubusercontent.com/rolling-scopes-school/stage1-tasks/assets/images/${timeOfDay}/${randomNumber}.jpg`;
  img.onload = () => {
    body.style.backgroundImage = `url('${img.currentSrc}')`;
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

const slidePrev = btnPrev.addEventListener("click", getSlidePrev);
const slideNext = btnNext.addEventListener("click", getSlideNext);

export {
  setRandomBackground as randomBackground,
  getRandomNumber as getRandomNumber
};
