import { timer } from "./js/time-calendar.js";
import { showNameHolder } from "./js/name-input.js";
import * as slider from "./js/image-slider.js";
import * as player from "./js/player.js";
import { getWeather } from "./js/weather.js";
import { getQuotes } from "./js/day-quotes.js";
import { showSettings } from "./js/settings.js";
import { updateTodo } from "./js/todo.js";

showNameHolder();

timer.updateTimer();
getWeather();
getQuotes();
slider.setRandomBackground();

player.playAudio();

showSettings();

