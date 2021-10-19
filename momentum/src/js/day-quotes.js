import { getRandomNumber as getRandomNumber } from "./image-slider.js";
import { state } from "./time-calendar.js";

const quoteDiv = document.querySelector(".quote-container");
const quote = quoteDiv.querySelector(".quote");
const author = quoteDiv.querySelector(".author");
const btnChangeQuote = document.querySelector(".change-quote");

async function getQuotes() {
  const quotes = `../assets/${state.language}-quotes.json`;
  const res = await fetch(quotes);
  const data = await res.json();
  const quoteNumber = getRandomNumber(0, data.quotes.length - 1);
  quote.textContent = `"${data.quotes[quoteNumber].quote}"`;
  author.textContent = data.quotes[quoteNumber].author;
}

window.addEventListener("onload", getQuotes);
btnChangeQuote.addEventListener("click", getQuotes);

export { getQuotes };
