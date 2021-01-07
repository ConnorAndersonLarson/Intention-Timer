var buttonStudy = document.querySelector(".study");
var buttonMeditate = document.querySelector(".meditate");
var buttonExercise = document.querySelector(".exercise");
var imageStudy = document.querySelector(".study-image");
var imageMeditate = document.querySelector(".meditate-image");
var imageExercise = document.querySelector(".exercise-image");
var imageStudyActive = document.querySelector(".study-active");
var imageMeditateActive = document.querySelector(".meditate-active");
var imageExerciseActive = document.querySelector(".exercise-active");

buttonMeditate.addEventListener("click", changeColor);
buttonStudy.addEventListener("click", changeColor);
buttonExercise.addEventListener("click", changeColor);

// function changeColorPurple() {
//   buttonMeditate.classList.toggle('green');
//   imageMeditateActive.classList.toggle('hidden');
//   imageMeditate.classList.toggle('hidden');
//   console.log("pants")
// }

function changeColor() {
  if (event.target.className === ".study") {
    buttonStudy.classList.toggle(".green");
    imageStudy.classList.toggle("hidden");
    imageStudyActive.classList.toggle("hidden");
  } else if (event.target.className === ".meditate"); {
    buttonMeditate.classList.toggle(".purple");
    imageMeditateActive.classList.toggle('hidden');
    imageMeditate.classList.toggle('hidden');
  } else if (event.target.className === ".exercise") {
    buttonExercise.classList.toggle(".orange");
    imageExercise.classList.toggle("hidden");
    imageExerciseActive.classList.toggle("hidden");
  }
}
