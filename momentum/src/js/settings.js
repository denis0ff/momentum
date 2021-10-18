import { setRandomBackground, getRandomNumber } from "./image-slider.js";

const settings = document.querySelector(".settings-container");
const buttonShowHide = settings.querySelector(".settings-button");
const settingsDiv = settings.querySelector(".settings-panel");
const imagesToggles = settings.querySelectorAll(".images-source>input");
const selectImageTag = document.getElementById("apiTag");
const optionsOfImageTag = selectImageTag.querySelectorAll("option");

const state = {
  language: "en",
  photoSource: "github",
  blocks: [
    "time",
    "date",
    "greeting",
    "quote",
    "weather",
    "audio" /*, 'todolist'*/,
  ],
  tag: "native",
  tagUrl: "",
};

function showSettings() {
  settingsDiv.classList.toggle("show");
}

function updateImageRadio(e) {
  const photoSource = e.target.value;
  state.photoSource = photoSource;
  showHideTag(photoSource);
}

function showHideTag(photoSource) {
  selectImageTag.classList.remove("show");
  if (photoSource !== "github") {
    selectImageTag.classList.add("show");
  }
  updateApiTag();
}

function updateApiTag() {
  for (let option of optionsOfImageTag) {
    if (option.selected) {
      state.tag = option.value;
    }
  }
  setRandomBackground();
}

async function getLinkToImage() {
  let url;

  if (state.photoSource == "unsplash") {
    url = `https://api.unsplash.com/photos/random?orientation=landscape&query=${state.tag}&client_id=Uh_vG0n7c8ChoTKsCq5Yc_5GtiySV34AsiJIDztdpqQ`;
    const res = await fetch(url);
    const data = await res.json();
    Promise.resolve().then((state.tagUrl = data.urls.regular));
  }
  if (state.photoSource == "flickr") {
    url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=a50e4730a02dc168ff6aec60014c330e&tags=${state.tag}&extras=url_l&format=json&nojsoncallback=1`;
    const res = await fetch(url);
    const data = await res.json();
    let number = getRandomNumber(0, 100);
    Promise.resolve().then((state.tagUrl = data.photos.photo[number].url_l));
  }
}

buttonShowHide.addEventListener("click", showSettings);
imagesToggles.forEach((toggle) =>
  toggle.addEventListener("change", updateImageRadio)
);
selectImageTag.addEventListener("change", updateApiTag);
export { showSettings, getLinkToImage, state };
