var buttonStudy = document.querySelector("#study");
var buttonMeditate = document.querySelector("#meditate");
var buttonExercise = document.querySelector("#exercise");
var imageStudy = document.querySelector(".study-image");
var imageMeditate = document.querySelector(".meditate-image");
var imageExercise = document.querySelector(".exercise-image");
var imageStudyActive = document.querySelector(".study-active");
var imageMeditateActive = document.querySelector(".meditate-active");
var imageExerciseActive = document.querySelector(".exercise-active");

buttonMeditate.addEventListener("click", changeColorPurple);
buttonStudy.addEventListener("click", changeColorGreen);
buttonExercise.addEventListener("click", changeColorOrange);


//Need to make buttons only light up one at a time.
//Figure out border/text color problem.


function changeColorOrange(event) {
  // if (event.target.className === "exercise") {
    buttonExercise.classList.toggle('orange');
    imageExercise.classList.toggle('hidden');
    imageExerciseActive.classList.toggle('hidden');
    unselectButtons(imageStudy, imageStudyActive, buttonStudy, 'green')
    unselectButtons(imageMeditate, imageMeditateActive, buttonMeditate, 'purple')
  // }
}

function changeColorGreen() {
  // if (event.target.className === "study") {
    buttonStudy.classList.toggle('green');
    imageStudy.classList.toggle('hidden');
    imageStudyActive.classList.toggle('hidden');
    unselectButtons(imageExercise, imageExerciseActive, buttonExercise, 'orange')
    unselectButtons(imageMeditate, imageMeditateActive, buttonMeditate, 'purple')
  // }
}

function changeColorPurple(event) {
  // if (event.target.className === "meditate") {
    buttonMeditate.classList.toggle('purple');
    imageMeditateActive.classList.toggle('hidden');
    imageMeditate.classList.toggle('hidden');
    unselectButtons(imageStudy, imageStudyActive, buttonStudy, 'green')
    unselectButtons(imageExercise, imageExerciseActive, buttonExercise, 'orange')
    console.log("pants")
  // }
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
