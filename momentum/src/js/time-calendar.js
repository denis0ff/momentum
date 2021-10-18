const time = document.querySelector(".time");
const date = document.querySelector(".date");
const greeting = document.querySelector(".greeting");

class Timer {
  constructor() {
    this.dateOptions = {
      weekday: "long",
      month: "long",
      day: "numeric",
      timeZone: "EET",
    };
    this.timeOptions = {
      timeZone: "EET",
    };
    this.greetingText = ["night", "morning", "afternoon", "evening"];
    this.greetingOutput;
    this.arrNumber = 0;
  }
  showTime(dateNow) {
    const currentTime = dateNow.toLocaleTimeString("ru-RU", this.timeOptions);
    time.textContent = currentTime;
  }
  showDate(dateNow) {
    const currentDate = dateNow.toLocaleDateString("en-US", this.dateOptions);
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
    this.greetingOutput = this.greetingText[this.arrNumber];
    greeting.textContent = "Good " + this.greetingOutput;
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

export { timer };
