var buttonStudy = document.querySelector('#study');
var buttonMeditate = document.querySelector('#meditate');
var buttonExercise = document.querySelector('#exercise');
var imageStudy = document.querySelector('.study-image');
var imageMeditate = document.querySelector('.meditate-image');
var imageExercise = document.querySelector('.exercise-image');
var imageStudyActive = document.querySelector('.study-active');
var imageMeditateActive = document.querySelector('.meditate-active');
var imageExerciseActive = document.querySelector('.exercise-active');
var userAccomplish = document.querySelector('#accomplish');
var seconds = document.querySelector('#seconds');
var minutes = document.querySelector('#minutes');
var buttonStart = document.querySelector('#start');
var form = document.querySelector('#activityForm');
var clockForm = document.querySelector('#clockForm');
var categoryError = document.querySelector('#buttonError');
var minError = document.querySelector('#minutesError');
var secError = document.querySelector('#secondsError');
var accompError = document.querySelector('#accomplishError');
var categoryButtons = document.querySelector('.button-box');

seconds.addEventListener('blur', secondsError);
minutes.addEventListener('blur', minuteError);
userAccomplish.addEventListener('blur', accomplishError);
categoryButtons.addEventListener('blur', catSelectionError);
buttonMeditate.addEventListener('click', changeColorPurple);
buttonStudy.addEventListener('click', changeColorGreen);
buttonExercise.addEventListener('click', changeColorOrange);
buttonStart.addEventListener('click', showActivity);

var currentActivity = '';
var previousActivities = [];


function clock(accomp, min, sec) {
  clockForm.innerHTML = `
  <div class="timer">
    <!-- <div class="accomp-box"> -->
    <p class="accomp">${accomp}</p>
    <!-- </div> -->
    <p class="min">${min}:${sec}</p>
    <svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
    <g class="base-timer__circle">
    <circle class="base-timer__path-elapsed" cx="50" cy="50" r="35" />
    </g>
    </svg>
    <span id="circleText" class="inner-circle">
      <p>START</p>
    </span>
    <div class="log-box">
      <button id="logActivity" class="log">LOG ACTIVITY</Button>
    </div>
  </div>
  `;
}

function showActivity() {
var userCategory = categoryButtonFinder();
var userDescription = userAccomplish.value;
var userMinutes = minutes.value;
var userSeconds = seconds.value;
  if (userCategory && userDescription && userMinutes && userSeconds) {
    form.classList.add('hidden');
    currentActivity = new Activity(userCategory, userDescription, userMinutes, userSeconds)
    clock(userDescription, userMinutes, userSeconds)
  } else {
    buttonError();
  }
}

function categoryButtonFinder() {
  if (buttonExercise.classList[1] !== undefined) {
    return 'Exercise';
  } else if (buttonStudy.classList[1] !== undefined) {
    return 'Study';
  } else if (buttonMeditate.classList[1] === undefined) {
    return 'Meditate';
  }
}

function changeColorOrange() {
    buttonExercise.classList.toggle('orange');
    imageExercise.classList.toggle('hidden');
    imageExerciseActive.classList.toggle('hidden');
    unselectButtons(imageStudy, imageStudyActive, buttonStudy, 'green');
    unselectButtons(imageMeditate, imageMeditateActive, buttonMeditate, 'purple');
    catSelectionError(buttonExercise);
}

function changeColorGreen() {
    buttonStudy.classList.toggle('green');
    imageStudy.classList.toggle('hidden');
    imageStudyActive.classList.toggle('hidden');
    unselectButtons(imageExercise, imageExerciseActive, buttonExercise, 'orange');
    unselectButtons(imageMeditate, imageMeditateActive, buttonMeditate, 'purple');
    catSelectionError(buttonStudy);
}

function changeColorPurple() {
    buttonMeditate.classList.toggle('purple');
    imageMeditateActive.classList.toggle('hidden');
    imageMeditate.classList.toggle('hidden');
    unselectButtons(imageExercise, imageExerciseActive, buttonExercise, 'orange');
    unselectButtons(imageStudy, imageStudyActive, buttonStudy, 'green');
    catSelectionError(buttonMeditate);
}

function unselectButtons(selector1, selector2, border, color) {
  if (selector1.classList.contains('hidden')) {
    selector1.classList.remove('hidden');
  }
  if (!selector2.classList.contains('hidden')) {
    selector2.classList.toggle('hidden');
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
