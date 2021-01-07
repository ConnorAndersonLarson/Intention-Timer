class Activity {
  constructor(obj){
    this.category = obj.category;
    this.description = obj.description;
    this.minutes = obj.minutes;
    this.seconds = obj.seconds;
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
