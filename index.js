


const refs = {
  clock: document.getElementById('#timer-1'),
  days: document.querySelector('[data-value="days"]'),
  hours: document.querySelector('[data-value="hours"]'),
  minutes: document.querySelector('[data-value="mins"]'),
  seconds: document.querySelector('[data-value="secs"]'),
}

class CountdownTimer {
  constructor({ selector, targetDate, onTick}) {
    this.selector = selector;
    this.targetDate = targetDate;
    this.timerId = null;
    this.onTick = onTick;

  }

  startTimer = () => {
    this.timerId = setInterval(() => {
      const currentTime = Date.now();
      const startTime= this.targetDate
      const deltaTime = startTime- currentTime;
      const time = this.getTimeComponents(deltaTime);
      this.onTick(time);
    }, 1000);
  }

  getTimeComponents(time) {
    const days = this.pad(Math.floor(time / (1000 * 60 * 60 * 24)));
    const hours = this.pad(Math.floor((time % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)));
    const mins = this.pad(Math.floor((time % (1000 * 60 * 60)) / (1000 * 60)));
    const secs = this.pad(Math.floor((time % (1000 * 60)) / 1000));

    return { days, hours, mins, secs };
  }
  pad(value) {
    return String(value).padStart(2, 0);
  }

}


const countDownTimer = new CountdownTimer({
  selector: '#timer-1',
  targetDate: new Date('Jul 17, 2021'),
  onTick: updateClockface,
});

function updateClockface({ days ='00', hours = '00', mins ='00', secs='00' }) {
  refs.days.textContent = `${days}`;
  refs.hours.textContent = `${hours}`;
  refs.minutes.textContent = `${mins}`;
  refs.seconds.textContent = `${secs}`;
}
