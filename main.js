var currentActivity = '';
var previousActivities = [];

var buttonStudy = document.querySelector('#study');
var buttonMeditate = document.querySelector('#meditate');
var buttonExercise = document.querySelector('#exercise');
var buttonLog = document.querySelector('#logActivity');
var buttonNewActivity = document.querySelector('#newActivityButton');
var buttonStart = document.querySelector('#start');
var buttonStartText = document.querySelector("#startButtonText");
var imageStudy = document.querySelector('.study-image');
var imageMeditate = document.querySelector('.meditate-image');
var imageExercise = document.querySelector('.exercise-image');
var imageStudyActive = document.querySelector('.study-active');
var imageMeditateActive = document.querySelector('.meditate-active');
var imageExerciseActive = document.querySelector('.exercise-active');
var userAccomplish = document.querySelector('#accomplish');
var seconds = document.querySelector('#seconds');
var minutes = document.querySelector('#minutes');
var form = document.querySelector('#activityForm');
var clockForm = document.querySelector('#clockForm');
var formNewActivity = document.querySelector('#activateNew')
var categoryError = document.querySelector('#buttonError');
var minError = document.querySelector('#minutesError');
var secError = document.querySelector('#secondsError');
var accompError = document.querySelector('#accomplishError');
var categoryButtons = document.querySelector('.button-box');
var clockTime = document.querySelector('#clockTime');
var clockAccomp = document.querySelector('#clockAccomp');
// var circlePurple = document.querySelector('.timer-meditate');
// var circleOrange = document.querySelector('.timer-exercise');
// var circleGreen = document.querySelector('.timer-study');
var circleTime = document.querySelector('#baseTimerPath');
var backgroundCircle = document.querySelector('#backgroundCircle')
var newCard = document.querySelector('#pastActivitiesPage');
var noLog = document.querySelector('#noLog');
var startTimer = document.querySelector('#circleText');
var buttonLog = document.querySelector('#logActivity');
var startButton = document.querySelector("#startButtonText");
var allInputs = document.querySelectorAll('input');

window.addEventListener('load',loadActivities);
seconds.addEventListener('blur', secondsError);
minutes.addEventListener('blur', minuteError);
userAccomplish.addEventListener('blur', accomplishError);
categoryButtons.addEventListener('blur', catSelectionError);
buttonMeditate.addEventListener('click', changeColorPurple);
buttonStudy.addEventListener('click', changeColorGreen);
buttonExercise.addEventListener('click', changeColorOrange);
buttonStart.addEventListener('click', showActivity);
startTimer.addEventListener('click', starter);
buttonLog.addEventListener('click', pressLog);
buttonNewActivity.addEventListener('click', goHome);

function loadActivities() {
  if (localStorage.getItem('yourPastActivities') != null) {
    previousActivities = JSON.parse(localStorage.getItem('yourPastActivities'))
    for (var i = 0; i < previousActivities.length; i++) {
      currentActivity = JSON.parse(localStorage.getItem(previousActivities[i]));
      addCard();
    }
    hide([document.querySelector('#noLog')]);
    currentActivity = '';
  }
}

function categoryButtonFinder() {
  if (buttonExercise.classList[1] !== undefined) {
    return 'Exercise';
  } else if (buttonStudy.classList[1] !== undefined) {
    return 'Study';
  } else if (buttonMeditate.classList[1] !== undefined) {
    return 'Meditate';
  }
}

function changeColorOrange() {
    buttonExercise.classList.toggle('orange');
    toggle([imageExercise, imageExerciseActive]);
    unselectButtons(imageStudy, imageStudyActive, buttonStudy, 'green');
    unselectButtons(imageMeditate, imageMeditateActive, buttonMeditate, 'purple');
    catSelectionError(buttonExercise);
}

function changeColorGreen() {
    buttonStudy.classList.toggle('green');
    toggle([imageStudy, imageStudyActive]);
    unselectButtons(imageExercise, imageExerciseActive, buttonExercise, 'orange');
    unselectButtons(imageMeditate, imageMeditateActive, buttonMeditate, 'purple');
    catSelectionError(buttonStudy);
}

function changeColorPurple() {
    buttonMeditate.classList.toggle('purple');
    toggle([imageMeditateActive, imageMeditate]);
    unselectButtons(imageExercise, imageExerciseActive, buttonExercise, 'orange');
    unselectButtons(imageStudy, imageStudyActive, buttonStudy, 'green');
    catSelectionError(buttonMeditate);
}

function unselectButtons(selector1, selector2, border, color) {
  if (selector1.classList.contains('hidden')) {
    show([selector1]);
  }
  if (!selector2.classList.contains('hidden')) {
    toggle([selector2]);
  }
  if (border.classList.contains(color)) {
    border.classList.toggle(color);
  }
}

function catSelectionError(pressedButton) {
  if (pressedButton === undefined || pressedButton.classList[1] === undefined) {
    categoryError.classList.remove('invisibility');
  } else if (!categoryError.classList.contains('invisibility')) {
    categoryError.classList.add('invisibility');
  }
}

function showActivity() {
var userCategory = categoryButtonFinder();
var userDescription = userAccomplish.value;
var userMinutes = minutes.value;
var userSeconds = seconds.value;
  if (userCategory && userDescription && userMinutes && userSeconds) {
    currentActivity = new Activity(userCategory, userDescription, userMinutes, userSeconds)
    changeCircleColor(currentActivity.category);
    toggle([backgroundCircle]);
    toggle([circleTime]);
    clock(userDescription, userMinutes, userSeconds);
    hide([form]);
  } else {
    buttonError();
  }
}

function clock(accomp, min, sec) {
  show([clockForm]);
  clockTime.innerText = `${min}:${sec}`;
  clockAccomp.innerText = `${accomp}`;
}

function changeCircleColor(userCategory) {
  if (userCategory === 'Exercise') {
    circleTime.classList.toggle('timer-exercise');
  } else if (userCategory === 'Study') {
    circleTime.classList.toggle('timer-study');
  } else if (userCategory === 'Meditate') {
    circleTime.classList.toggle('timer-meditate');
  }
}

function starter() {
startTimer.removeEventListener('click', starter);
currentActivity.countdown();
}

function startToComplete() {
  startButton.innerText = 'COMPLETE!';
  showMessage();
  buttonLog.classList.remove('invisibility');
}

 function pressLog() {
   changeCircleColor(currentActivity.category);
   startTimer.addEventListener('click', starter);
   clockTime.classList.add('min');
   clockTime.classList.remove('inspiration');
   buttonLog.classList.add('invisibility');
   buttonStartText.innerText = 'START'
   saveActivities()
   logTheActivity();
}

function showMessage() {
  var category = categoryButtonFinder();
  var color = '';
  if(category === 'Study') {
    color = 'green';
  } else if (category === 'Meditate') {
    color = 'purple';
  } else if (category === 'Exercise') {
    color = 'orange';
  }
  clockTime.innerHTML= `<section class="message ${color}"> <h5>${messages[getRandomMessage(messages)]}</h5> </section>`;
  clockTime.classList.remove('min');
  clockTime.classList.add('inspiration');
}

function getRandomMessage(array) {
  return Math.floor(Math.random() * array.length);
}

function pressLog() {
  changeCircleColor(currentActivity.category);
  changeElements();
  saveActivities();
  logTheActivity();
}

function changeElements() {
  startTimer.addEventListener('click', starter);
  clockTime.classList.add('min');
  clockTime.classList.remove('inspiration');
  buttonLog.classList.add('invisibility');
  circleTime.classList.toggle('hidden')
  backgroundCircle.classList.toggle('hidden')

}

function saveActivities() {
  currentActivity.saveToStorage();
  previousActivities.push(currentActivity.id);
  var activityIDs = JSON.stringify(previousActivities);
  localStorage.setItem('yourPastActivities', activityIDs);
}

function logTheActivity() {
  if (!noLog.classList.contains('hidden')) {
    hide([noLog]);
  }
    hide([clockForm]);
    show([formNewActivity, buttonNewActivity]);
    addCard();
    clearInputs();
}

function addCard() {
  newCard.innerHTML += `
  <section id="pastActivitiesCard" class="new-card">
    <section class="new-card-text-box">
        <section class="text-box-baby">
          <g class="card-category">${currentActivity.category}</g>
          <g class="card-time">${currentActivity.minutes} MIN ${currentActivity.seconds} SECONDS</g>
        </section>
      <g class="card-accomp">${currentActivity.description}</g>
    </section>
    <section id="card-color" class="card-color-container">
      <section id="box1" class="card-color-tag-${currentActivity.category.toLowerCase()}">
      </section>
    </section>
  </section>
  `;
}

function clearInputs() {
  for (var i = 0; i < allInputs.length; i++) {
    allInputs[i].value = "";
    unselectButtons(imageStudy, imageStudyActive, buttonStudy, 'green');
    unselectButtons(imageMeditate, imageMeditateActive, buttonMeditate, 'purple');
    unselectButtons(imageExercise, imageExerciseActive, buttonExercise, 'orange');
  }
}

function buttonError() {
  buttonStart.classList.toggle('backgroundColor');
  setTimeout(function(){ buttonStart.classList.toggle('activityError'); }, 150);
  setTimeout(function(){ buttonStart.classList.toggle('activityError'); buttonStart.classList.toggle('backgroundColor') }, 1700);
  minuteError();
  secondsError();
  accomplishError();
  activityFormError();
}

function minuteError() {
  errorCheck(minutes, minError);
}

function secondsError() {
  errorCheck(seconds, secError);
}

function accomplishError() {
  accomplishErrorCheck(userAccomplish, accompError);
}

function activityFormError() {
  if (buttonExercise.classList[1] === undefined && buttonStudy.classList[1] === undefined && buttonMeditate.classList[1] === undefined) {
    categoryError.classList.remove('invisibility');
  }
}

function accomplishErrorCheck(inputField, errorMessage) {
  if (inputField.value === '') {
    errorMessage.classList.remove('invisibility');
  } else if (inputField.value !== '') {
    errorMessage.classList.add('invisibility');
  }
}

function errorCheck(inputField, errorMessage) {
  var input = parseInt(inputField.value);
  if (!input && input !== 0) {
    errorMessage.classList.remove('invisibility');
    inputField.value = "";
  } else if ((input || input === 0) && !errorMessage.classList.contains('invisibility')) {
    errorMessage.classList.toggle('invisibility');
  }
  if (input > 59 && inputField.id === 'seconds') {
    secondsCalc();
  } else if (input || inputField.value === '0') {
    inputField.value = input;
    inputField.value = inputField.value.padStart(2,0);
  }
}

function secondsCalc() {
  var totalSeconds = parseInt(seconds.value);
  minutes.value = (parseInt(minutes.value)|| parseInt('00')) + Math.floor(totalSeconds/60);
  seconds.value = totalSeconds % 60;
  errorCheck(seconds, secError);
  errorCheck(minutes, minError);
}

function hide(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.add('hidden');
  }
}

function show(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.remove('hidden');
  }
}

function toggle(elements) {
  for (var i = 0; i < elements.length; i++) {
    elements[i].classList.toggle('hidden');
  }
}

function goHome() {
  hide([buttonNewActivity, formNewActivity]);
  show([form]);
}
