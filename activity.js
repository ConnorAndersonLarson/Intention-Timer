class Activity {
  constructor(category, description, minutes, seconds) {
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.completed = false;
    this.id = Date.now();
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
    startTimer.removeEventListener('click', starter);
    var that = this;
    var interval = setInterval(function() {
        that.stopwatch += 1;
        that.remainingTime = that.timeLimit - that.stopwatch;
        clockTime.innerText = that.formatClock();
        if (that.stopwatch > that.timeLimit) {
          clearInterval(interval);
          clockTime.innerText = '00:00';
          buttonLog.classList.remove('invisibility');
          that.markComplete();
        }
    }, 1000);
  }

  markComplete() {
    this.completed = true;
  }

  saveToStorage() {

  }

}

// module.exports = Activity;
