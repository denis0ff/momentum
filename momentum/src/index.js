import { timer as timer } from "./js/time-calendar.js";
import * as localStorage from "./js/name-input.js";
import * as slider from "./js/image-slider.js";
import getWeather from "./js/weather.js";

localStorage.getEvent;
localStorage.setEvent;

timer.updateTimer();

slider.randomBackground();
slider.slidePrev;
slider.slideNext;

getWeather()