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

  }

  markComplete() {

  }

  saveToStorage() {
    
  }

}

module.exports = Activity;
