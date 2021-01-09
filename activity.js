class Activity {
  constructor(category, description, minutes, seconds){
    this.category = category;
    this.description = description;
    this.minutes = minutes;
    this.seconds = seconds;
    this.completed = false;
    this.id = Date.now();
  }

  countdown() {
    //use minutes and seconds attributes to set starting point of timer
  }

  markComplete() {
    this.completed = true;
  }

  saveToStorage() {

  }

}

// module.exports = Activity;
