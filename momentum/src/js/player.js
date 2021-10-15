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
const playListContainer = player.querySelector('.play-list')
const audio = new Audio();

let isPause = false;
let playNum = 0;

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
    audio.src = playList[playNum].src;
    audio.play();
  } else {
    audio.pause();
  }
  isPause = !isPause;
  audio.currentTime = 0;
}

function toggleBtn() {
  // audio.paused  ? playButton.classList.toggle('play') : playButton.classList.toggle('pause')
  if (isPause) {
    playButton.classList.remove("pause");
    playButton.classList.add("play");
  } else {
    playButton.classList.remove("play");
    playButton.classList.add("pause");
  }
  playAudio();
}

playButton.addEventListener("click", toggleBtn);
window.addEventListener('load', initPlayList)

export { playAudio as playAudio };
