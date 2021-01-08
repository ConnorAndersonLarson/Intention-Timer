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

buttonMeditate.addEventListener('click', changeColorPurple);
buttonStudy.addEventListener('click', changeColorGreen);
buttonExercise.addEventListener('click', changeColorOrange);
buttonStart.addEventListener('click', showActivity);


var button = '';

function showActivity() {
checkInputs();
form.classList.add('hidden');
var inputValues = checkImputs;
var userCategory = button;
var userDescription = userAccomplish.value;
var userMinutes = minutes.value;
var userSeconds = seconds.value;
var currentActivity = new Activity(userCategory, userDescription, userMinutes, userSeconds)
console.log(currentActivity)
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
  errorCheck(userAccomplish, accompError);
}

function errorCheck(inputField, errorMessage) {
  if (!parseInt(inputField.value)) {
    errorMessage.classList.remove('visibility');
  } else if (parseInt(inputField.value) && !errorMessage.classList.contains('visibility')) {
    errorMessage.classList.toggle('visibility');
  } else if (accomplishError = "") {
    errorMessage.classList.toggle('visibility');
  }
}





// function changeColor(event) {
//   if (event.target.className === "study") {
//     buttonStudy.classList.toggle("green");
//     imageStudy.classList.toggle("hidden");
//     imageStudyActive.classList.toggle("hidden");
//   } else if (event.target.className === "meditate") {
//     buttonMeditate.classList.toggle("purple");
//     imageMeditateActive.classList.toggle('hidden');
//     imageMeditate.classList.toggle('hidden');
//   } else if (event.target.className === "exercise") {
//     buttonExercise.classList.toggle("orange");
//     imageExercise.classList.toggle("hidden");
//     imageExerciseActive.classList.toggle("hidden");
//   } else {
//   }
// }
