const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greeting = document.querySelector(".greeting");

const state = {
  language: "en",
  photoSource: "github",
  time: true,
  date: true,
  greeting__wr: true,
  quote__wr: true,
  weather: true,
  player: true,
  todo__list: true,
  todo: '',
  tag: "native",
  tagUrl: "",
};

class Timer {
  constructor() {
    this.timeFormat = {
      en: `en-US`,
      ru: `ru-RU`,
    };
    this.dateOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: "EET",
    };
    this.timeOptions = {
      timeZone: "EET",
    };
    this.greetingText = {
      en: ["night", "morning", "afternoon", "evening"],
      ru: ["ночи", "утро", "день", "вечер"],
    };
    this.mixed = {
      en: ["Good", "Good", "Good", "Good"],
      ru: ["Доброй", "Доброе", "Добрый", "Добрый"],
    };
    this.greetingOutput;
    this.arrNumber = 0;
  }
  showTime(dateNow) {
    const currentTime = dateNow.toLocaleTimeString(`ru-RU`, this.timeOptions);
    time.textContent = currentTime;
  }
  showDate(dateNow) {
    const currentDate = dateNow.toLocaleDateString(
      this.timeFormat[state.language],
      this.dateOptions
    );
    date.textContent = currentDate;
  }
  showGreeting(dateNow) {
    const hours = dateNow.getHours();
    hours >= 0 && hours < 6
      ? (this.arrNumber = 0)
      : hours >= 6 && hours < 12
      ? (this.arrNumber = 1)
      : hours >= 12 && hours < 18
      ? (this.arrNumber = 2)
      : hours >= 18 && hours < 24
      ? (this.arrNumber = 3)
      : greetingOutput;
    this.greetingOutput = this.greetingText[state.language][this.arrNumber];
    greeting.textContent = `${this.mixed[state.language][this.arrNumber]} ${
      this.greetingOutput
    }`;
  }
  updateTimer() {
    const dateNow = new Date();
    this.showTime(dateNow);
    this.showDate(dateNow);
    this.showGreeting(dateNow);
    setTimeout(this.updateTimer.bind(this), 1000);
  }
}

const timer = new Timer();

export { timer, state };
