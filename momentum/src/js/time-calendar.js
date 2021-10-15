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
    this.greetingOutput
  }
  showTime(dateNow) {
    const currentTime = dateNow.toLocaleTimeString("ru-RU",this.timeOptions);
    time.textContent = currentTime;
  }
  showDate(dateNow) {
    const currentDate = dateNow.toLocaleDateString("en-US", this.dateOptions);
    date.textContent = currentDate;
  }
  showGreeting(dateNow) {
    const hours = dateNow.getHours();
    hours >= 0 && hours < 6
      ? (this.greetingOutput = this.greetingText[0])
      : hours >= 6 && hours < 12
      ? (this.greetingOutput = this.greetingText[1])
      : hours >= 12 && hours < 18
      ? (this.greetingOutput = this.greetingText[2])
      : hours >= 18 && hours < 24
      ? (this.greetingOutput = this.greetingText[3])
      : greetingOutput;
    if (this.greetingOutput) greeting.textContent = 'Good ' + this.greetingOutput;
  }
  updateTimer() {
    const dateNow = new Date();
    this.showTime(dateNow);
    this.showDate(dateNow);
    this.showGreeting(dateNow);
    setTimeout(this.updateTimer.bind(this), 1000);
  }
}

const timer = new Timer()

export { timer as timer };

