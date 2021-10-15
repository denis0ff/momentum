import { getRandomNumber as getRandomNumber } from "./image-slider.js";

const quote = document.querySelector(".quote");
const author = document.querySelector(".author");
const btnChangeQuote = document.querySelector('.change-quote')

const quotes = "../assets/en-quotes.json";

async function getQuotes() {
  const res = await fetch(quotes);
  const data = await res.json();
  Promise.resolve().then(setQuote(data))
}

function setQuote(data) {
  const quoteNumber = getRandomNumber(0, data.quotes.length - 1);
  quote.textContent = `"${data.quotes[quoteNumber].quote}"`;
  author.textContent = data.quotes[quoteNumber].author;
}

window.addEventListener('onload', getQuotes)
btnChangeQuote.addEventListener('click', getQuotes)

export default getQuotes();
