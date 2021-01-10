var buttonStudy = document.querySelector('#study');
var buttonMeditate = document.querySelector('#meditate');
var buttonExercise = document.querySelector('#exercise');
var buttonLog = document.querySelector('#logActivity');
var buttonNewActivity = document.querySelector('#newActivityButton');
var buttonStart = document.querySelector('#start');
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
var circlePurple = document.querySelector('.timer-meditate');
var circleOrange = document.querySelector('.timer-exercise');
var circleGreen = document.querySelector('.timer-study');
var newCard = document.querySelector('#pastActivitiesPage');
var notLog = document.querySelector('#noLog');
seconds.addEventListener('blur', secondsError);
minutes.addEventListener('blur', minuteError);
userAccomplish.addEventListener('blur', accomplishError);
categoryButtons.addEventListener('blur', catSelectionError);
buttonMeditate.addEventListener('click', changeColorPurple);
buttonStudy.addEventListener('click', changeColorGreen);
buttonExercise.addEventListener('click', changeColorOrange);
buttonStart.addEventListener('click', showActivity);
buttonLog.addEventListener('click', logTheActivity);
buttonNewActivity.addEventListener('click', goHome);

var currentActivity = '';
var previousActivities = [];

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


function clearInputs() {
  var allInputs = document.querySelectorAll('input');
  for (var i = 0; i < allInputs.length; i++) {
    allInputs[i].value = ""
    unselectButtons(imageStudy, imageStudyActive, buttonStudy, 'green');
    unselectButtons(imageMeditate, imageMeditateActive, buttonMeditate, 'purple');
    unselectButtons(imageExercise, imageExerciseActive, buttonExercise, 'orange');
  }
}

function changeCardColor() {
  var box1 = document.querySelector('#box1');
  var box2 = document.querySelector('#box2');
  var box3 = document.querySelector('#box3');
  var category = categoryButtonFinder();
  if (category === 'Exercise') {
    show([box3]);
  } else if (category === 'Study') {
    show([box1]);
  } else if (category === 'Meditate') {
    show([box2]);
  }
}

function addCard() {
  newCard.innerHTML = `
  <section id="pastActivitiesCard"class="new-card">
    <section class="new-card-text-box">
      <g class="card-category">${categoryButtonFinder()}</g>
      <g class="card-time">${minutes.value} MIN ${seconds.value} SECONDS</g>
      <g class="card-accomp">${userAccomplish.value}</g>
    </section>
    <section class="card-color-container">
      <section id="box1" class="card-color-tag-study hidden">
      </section>
      <section id="box2" class="card-color-tag-meditate hidden">
      </section>
      <section id="box3" class="card-color-tag-exercise hidden">
      </section>
    </section>
  </section>
  `;
}

function logTheActivity() {
    hide([clockForm])
    show([formNewActivity, buttonNewActivity]);
    addCard();
    changeCardColor();
    clearInputs();
}

function clock(accomp, min, sec) {
  show([clockForm]);
  clockTime.innerText = `${min}:${sec}`;
  clockAccomp.innerText = `${accomp}`;

}

function changeCircleColor(userCategory) {
  if (userCategory === 'Exercise') {
    show([circleOrange]);
  } else if (userCategory === 'Study') {
    show([circleGreen]);
  } else if (userCategory === 'Meditate') {
    show([circlePurple]);
  }
}


function showActivity() {
var userCategory = categoryButtonFinder();
var userDescription = userAccomplish.value;
var userMinutes = minutes.value;
var userSeconds = seconds.value;
  if (userCategory && userDescription && userMinutes && userSeconds) {
    hide([form]);
    currentActivity = new Activity(userCategory, userDescription, userMinutes, userSeconds)
    clock(userDescription, userMinutes, userSeconds);
    changeCircleColor(userCategory);
  } else {
    buttonError();
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

function catSelectionError(pressedButton) {
  var button = pressedButton;
  if (button === undefined || button.classList[1] === undefined) {
    categoryError.classList.remove('invisibility');
  } else if (!categoryError.classList.contains('invisibility')){
    categoryError.classList.add('invisibility');
  }

}

function activityFormError() {
  if (buttonExercise.classList[1] === undefined && buttonStudy.classList[1] === undefined && buttonMeditate.classList[1] === undefined) {
    categoryError.classList.remove('invisibility');
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

function accomplishErrorCheck(inputField, errorMessage) {
  if (inputField.value === '') {
    errorMessage.classList.remove('invisibility');
  } else if (inputField.value !== '') {
    errorMessage.classList.add('invisibility');
  }
}
