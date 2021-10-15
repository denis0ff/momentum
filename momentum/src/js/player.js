import playList from "../js/play-list.js";

const player = document.querySelector(".player");
const playButton = player.querySelector(".play");
const prevButton = player.querySelector(".play-prev");
const nextButton = player.querySelector(".play-next");
const songName = player.querySelector(".song-name");
const muteButton = player.querySelector(".mute-toggle");
const progress = player.querySelector(".progress");
const soundLevel = player.querySelector(".sound-level");
const playerTime = player.querySelectorAll(".player-time");
const playListContainer = player.querySelector(".play-list");
const audio = new Audio();

let isPause = false;
let playNum = 0;

function updateSrc() {
  audio.src = playList[playNum].src;
}

function initPlayList() {
  playList.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("play-item");
    li.textContent = `${item.title}`;
    playListContainer.append(li);
  });
}

function playAudio() {
  if (isPause) {
    audio.play();
  } else {
    audio.pause();
  }
  isPause = !isPause;
  audio.currentTime = 0;
  updateActive();
}

function toggleBtn() {
  if (isPause) {
    playButton.classList.remove("play");
    playButton.classList.add("pause");
  } else {
    playButton.classList.remove("pause");
    playButton.classList.add("play");
  }
  playAudio();
}

function updateActive() {
  const items = getItemList();
  items.forEach((item) => item?.classList.remove("item-active"));
  items[playNum]?.classList.add("item-active");
}

function getItemList() {
  return playListContainer.querySelectorAll(".play-item");
}

function buttonMoveTo(e) {
  let moveTo = 0;
  const buttonType = e.srcElement.classList.value;
  if (buttonType.includes("play-next")) moveTo = 1;
  if (buttonType.includes("play-prev")) moveTo = -1;
  slideList(moveTo);
}

function slideList(moveTo) {
  const items = getItemList();
  if (moveTo === 1) playNum < items.length - 1 ? playNum++ : (playNum = 0);
  else if (moveTo === -1)
    playNum > 0 ? playNum-- : (playNum = items.length - 1);
  slidePlay();
}

function slidePlay() {
  playButton.classList.remove("play");
  playButton.classList.add("pause");
  audio.pause();
  updateSrc();
  audio.play();
  updateActive();
  isPause = false;
}


playButton.addEventListener("click", toggleBtn);
prevButton.addEventListener("click", buttonMoveTo);
nextButton.addEventListener("click", buttonMoveTo);
window.addEventListener("load", initPlayList);
window.addEventListener("load", updateSrc);

export { playAudio };
