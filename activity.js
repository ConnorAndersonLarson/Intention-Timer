class Activity {
  constructor(category, description, minutes, seconds) {
    this.id = Date.now();
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.completed = false;
    this.timerInterval = null;
    this.stopwatch = 0;
    this.timeLimit = parseInt(seconds) + (parseInt(minutes) * 60);
    this.remainingTime = this.timeLimit;
  }


  formatClock() {
    var minutes = Math.floor(this.remainingTime / 60);
    var seconds = this.remainingTime % 60;
    if (seconds < 10) {
      seconds = '0' + seconds;
    }
    if (minutes < 10) {
      minutes = '0' + minutes;
    }
    return `${minutes}:${seconds}`;
  };

  countdown() {
    var that = this;
    var interval = setInterval(function() {
        that.stopwatch += 1;
        that.remainingTime = that.timeLimit - that.stopwatch;
        clockTime.innerText = that.formatClock();
        that.circleCountdown(220)
        if (that.stopwatch > that.timeLimit) {
          clearInterval(interval);
          that.circleCountUp()
          clockTime.innerText = '00:00';
          that.markComplete();
          startToComplete();
        }
    }, 1000);
  }

  circleCountdown(circleLength) {
    var circleTimer = `${((this.remainingTime/this.timeLimit) * 220).toFixed(0)} ${circleLength}`;
    circleTime.setAttribute("stroke-dasharray", circleTimer);
  }

  circleCountUp() {
    var that = this;
    var timehold = this.stopwatch
    var limitHold = this.timeLimit
    var circleInterval = setInterval(function() {
      that.stopwatch -= 1;
      that.remainingTime = that.timeLimit - that.stopwatch;
      that.circleCountdown(73.3)
      if (that.stopwatch === 0) {
        clearInterval(circleInterval);
        this.stopwatch = timehold;
        this.timeLimit = limitHold
      }
    }, 100)
  }

  markComplete() {
    this.completed = true;
  }

  saveToStorage() {
    var savedActivity = JSON.stringify(this);
    localStorage.setItem(this.id, savedActivity);
  }


}
