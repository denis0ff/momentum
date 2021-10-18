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
const smallPlayBtn = player.querySelectorAll(".play-item-button");

let isPause = false;
let playNum = 0;
let playListLength = 0;

const audio = new Audio();
audio.volume = 0.5;
audio.src = playList[playNum].src;

function updateSrc() {
  let originalSrc;
  let newSrc;
  if (audio.src) {
    let regEx = /[A-Z]+\b/gi;

    let arrOfSrc = audio.src.toString().split("/");
    let nameSrc = arrOfSrc[arrOfSrc.length - 1];
    originalSrc = nameSrc.match(regEx).join(" ");

    let arrofNewSrc = playList[playNum].src.split("/");
    let nameNewSrc = arrofNewSrc[arrofNewSrc.length - 1];
    newSrc = nameNewSrc.match(regEx).join(" ");
  }
  if (originalSrc !== newSrc) audio.src = playList[playNum].src;
}

function initPlayList() {
  let index = 0;
  playList.forEach((item) => {
    const li = document.createElement("li");
    li.classList.add("play-item");
    li.textContent = `${item.title}`;
    playListContainer.append(li);
    const liBtn = document.createElement("button");
    liBtn.classList.add("play");
    liBtn.classList.add("player-icon");
    liBtn.classList.add("play-item-button");
    liBtn.dataset.index = index;
    index++;
    li.append(liBtn);
    liBtn.addEventListener("click", playOnSmallButton);
    playListLength++;
  });
}

function playAudio() {
  if (isPause) {
    audio.play();
  } else {
    audio.pause();
  }
  isPause = !isPause;
  toggleSmallButtons();
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
  if (moveTo === 1) playNum < playListLength - 1 ? playNum++ : (playNum = 0);
  else if (moveTo === -1)
    playNum > 0 ? playNum-- : (playNum = playListLength - 1);
  slidePlay();
}

function slidePlay(button) {
  let currentButton;
  playButton.classList.remove("play");
  playButton.classList.add("pause");
  toggleSmallButtons();
  audio.pause();
  updateSrc();
  audio.play();
  updateActive();
  isPause = false;
}

function autoProgressUpdate() {
  if (isNaN(audio.duration)) return;
  progress.value = (audio.currentTime / audio.duration) * 100;
  playerTime[0].textContent = convertTime(audio.currentTime);
  playerTime[1].textContent = convertTime(audio.duration);
  progressLineUpdate();
}

function convertTime(time) {
  let mins = Math.floor(time / 60);
  if (mins < 10) {
    mins = "0" + String(mins);
  }
  let secs = Math.floor(time % 60);
  if (secs < 10) {
    secs = "0" + String(secs);
  }

  return mins + ":" + secs;
}

function progressLineUpdate() {
  progress.style.background = `linear-gradient(to right, #fff 0%, #fff ${progress.value}%, #C4C4C4 ${progress.value}%, #C4C4C4 100%)`;
}

function infoUpdate() {
  let arrOfSrc = audio.src.toString().split("/");
  let name = arrOfSrc[arrOfSrc.length - 1];
  let regEx = /[A-Z]+\b/gi;
  songName.textContent = name.match(regEx).join(" ");
  autoProgressUpdate();
}

function toggleSound() {
  if (audio.muted) {
    audio.muted = !audio.muted;
    soundLevel.value = 0.05;
    audio["volume"] = 0.05;
    updateSoundButton();
    soundLevelLineUpdate();
  } else {
    audio.muted = !audio.muted;
    soundLevel.value = 0;
    audio["volume"] = 0;
    updateSoundButton();
    soundLevelLineUpdate();
  }
}

function updateSoundButton() {
  const icon = !audio.muted ? "volume.svg" : "volume-mute.svg";
  muteButton.style.backgroundImage = `url(../assets/svg/${icon})`;
}

function handleSoundLevelUpdate() {
  audio.volume = this.value;
  if (this.value < 0.05) {
    audio.muted = true;
    updateSoundButton();
  } else {
    audio.muted = false;
    updateSoundButton();
  }
}

function soundLevelLineUpdate() {
  const value = soundLevel.value * 100;
  soundLevel.style.background = `linear-gradient(to right, #fff 0%, #fff ${value}%, #C4C4C4 ${value}%, #C4C4C4 100%)`;
}

function playOnSmallButton(e) {
  const buttons = document.querySelectorAll(".play-item-button");
  playNum = this.dataset.index;
  slidePlay(e.target);
  buttons.forEach((button) => {
    button.classList.remove("pause");
    button.classList.add("play");
    if (button.dataset.index == playNum) {
      if (isPause) {
        button.classList.remove("pause");
        button.classList.add("play");
      } else {
        button.classList.remove("play");
        button.classList.add("pause");
      }
      // isPause = !isPause;
    }
  });
}

function toggleSmallButtons() {
  const buttons = document.querySelectorAll(".play-item-button");
  buttons.forEach((button) => {
    button.classList.remove("pause");
    button.classList.add("play");
    if (button.dataset.index == playNum) {
      if (isPause) {
        button.classList.remove("pause");
        button.classList.add("play");
      } else {
        button.classList.remove("play");
        button.classList.add("pause");
      }
    }
  });
}

function handleProgressUpdate() {
  audio.currentTime = (this.value * audio.duration) / 100;
}

function autoPlay() {
  console.log(playListLength, playNum);
  if (playNum == playListLength - 1) playNum = 0;
  else playNum++;
  updateSrc();
  updateActive();
  audio.play();
  toggleSmallButtons();
}

playButton.addEventListener("click", toggleBtn);
prevButton.addEventListener("click", buttonMoveTo);
nextButton.addEventListener("click", buttonMoveTo);
muteButton.addEventListener("click", updateSoundButton);
muteButton.addEventListener("click", toggleSound);
window.addEventListener("load", initPlayList);
audio.addEventListener("timeupdate", autoProgressUpdate);
audio.addEventListener("durationchange", infoUpdate);
audio.addEventListener("ended", autoPlay);
soundLevel.addEventListener("change", handleSoundLevelUpdate);
soundLevel.addEventListener("mousemove", handleSoundLevelUpdate);
soundLevel.addEventListener("input", soundLevelLineUpdate);
progress.addEventListener("input", handleProgressUpdate);

export { playAudio };
