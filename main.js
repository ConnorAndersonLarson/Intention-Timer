var buttonStudy = document.querySelector('#study');
var buttonMeditate = document.querySelector('#meditate');
var buttonExercise = document.querySelector('#exercise');
var imageStudy = document.querySelector('.study-image');
var imageMeditate = document.querySelector('.meditate-image');
var imageExercise = document.querySelector('.exercise-image');
var imageStudyActive = document.querySelector('.study-active');
var imageMeditateActive = document.querySelector('.meditate-active');
var imageExerciseActive = document.querySelector('.exercise-active');
var userAccomplish = document.querySelector('#accomplish')
var seconds = document.querySelector('#seconds');
var minutes = document.querySelector('#minutes');
var buttonStart = document.querySelector('#start');
var form = document.querySelector('#activityForm');
var clockForm = document.querySelector('#clockForm');


buttonMeditate.addEventListener('click', changeColorPurple);
buttonStudy.addEventListener('click', changeColorGreen);
buttonExercise.addEventListener('click', changeColorOrange);
buttonStart.addEventListener('click', showActivity);

var currentActivity = ''
var button = '';

function clock(accomp, min, sec) {
  clockForm.innerHTML = `
  <div class="timer">
    <p class="accomp">${accomp}</p>
    <p class="min">${min}:${sec}</p>
    <p class="sec"></p>
  </div>
  `;
}
function showActivity() {
var userCategory = button;
var userDescription = userAccomplish.value;
var userMinutes = minutes.value;
var userSeconds = seconds.value;
  if(userCategory && userDescription && userMinutes && userSeconds){
    form.classList.add('hidden');
    currentActivity = new Activity(userCategory, userDescription, userMinutes, userSeconds)
    clock(userDescription, userMinutes, userSeconds)
  } else if (userCategory === '' || userDescription === '' || userMinutes === '' || userSeconds === '') {
    buttonError()
  }
}

function buttonError() {
  buttonStart.classList.toggle('backgroundColor')
  setTimeout(function(){ buttonStart.classList.toggle('activityError'); }, 150);
  setTimeout(function(){ buttonStart.classList.toggle('activityError'); buttonStart.classList.toggle('backgroundColor') }, 1700);
}

function changeColorOrange() {
    buttonExercise.classList.toggle('orange');
    imageExercise.classList.toggle('hidden');
    imageExerciseActive.classList.toggle('hidden');
    unselectButtons(imageStudy, imageStudyActive, buttonStudy, 'green');
    unselectButtons(imageMeditate, imageMeditateActive, buttonMeditate, 'purple');
    button = 'Meditate';
}

function changeColorGreen() {
    buttonStudy.classList.toggle('green');
    imageStudy.classList.toggle('hidden');
    imageStudyActive.classList.toggle('hidden');
    unselectButtons(imageExercise, imageExerciseActive, buttonExercise, 'orange')
    unselectButtons(imageMeditate, imageMeditateActive, buttonMeditate, 'purple')
    button = 'Study';
}

function changeColorPurple() {
    buttonMeditate.classList.toggle('purple');
    imageMeditateActive.classList.toggle('hidden');
    imageMeditate.classList.toggle('hidden');
    unselectButtons(imageExercise, imageExerciseActive, buttonExercise, 'orange')
    unselectButtons(imageStudy, imageStudyActive, buttonStudy, 'green')
    button = 'Exercise';
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

var minError = document.querySelector('#minutesError');
var secError = document.querySelector('#secondsError');
var accompError = document.querySelector('#accomplishError');

seconds.addEventListener('blur', secondsError);
minutes.addEventListener('blur', minuteError);
userAccomplish.addEventListener('blur', accomplishError);

function minuteError() {
  errorCheck(minutes, minError);
}

function secondsError() {
  errorCheck(seconds, secError);
}

function accomplishError() {
  accomplishErrorCheck(userAccomplish, accompError);
}

function errorCheck(inputField, errorMessage) {
  if (!parseInt(inputField.value) && parseInt(inputField.value) !== 0) {
    errorMessage.classList.remove('visibility');
  } else if (parseInt(inputField.value) && !errorMessage.classList.contains('visibility')) {
    errorMessage.classList.toggle('visibility');
  }
  if (inputField.value.length > 2 && inputField.id === 'seconds') {
    errorMessage.classList.remove('visibility');
  } else if (inputField.value.length === 1 && parseInt(inputField.value)) {
    inputField.value+=0;
    inputField.value=inputField.value.split('').reverse().join('');
  }
}

function accomplishErrorCheck(inputField, errorMessage) {
  if (inputField.value === '') {
    errorMessage.classList.remove('visibility');
  } else if (inputField.value !== '') {
    errorMessage.classList.add('visibility');
  }
}
