import { timer } from "./js/time-calendar.js";
import * as localStorage from "./js/name-input.js";
import * as slider from "./js/image-slider.js";
import * as player from "./js/player.js";
import getWeather from "./js/weather.js";
import getQuotes from "./js/day-quotes.js";
import * as settings from "./js/settings.js";


localStorage.getEvent;
localStorage.setEvent;

timer.updateTimer();

slider.setRandomBackground();

player.playAudio()

settings.showSettings()