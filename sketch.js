const cursor = document.querySelector('.cursor');

const nextButton = document.querySelector(".next-button");


const levelOne= document.querySelector(".level-one");
const levelTwo= document.querySelector(".level-two");
const levelThree= document.querySelector(".level-three");
const levelFour= document.querySelector(".level-four");

const uiLevel = document.querySelector(".ui-level");
const uiMessage = document.querySelector(".ui-message");

let currentLevel = 1;
const levels = [
  null,
  levelOne,
  levelTwo,
  levelThree,
  levelFour,
];
//
//
const collisionCheck = (value) => {
  if(value === "maze-border") alert ("game over...Try again.");
  if(value === "finish"){
    const level = levels[currentLevel];
    nextButton.style.opacity= 1;
    nextButton.style.pointerEvents= "all";
    level.style.pointerEvents = "none";
    nextButton.textContent = `level ${currentLevel + 1}`;

    if (!levels[currentLevel + 1]) {
      document.querySelector('body').style.backgroundImage = "url('assets/Finish line.jpg')";
      nextButton.textContent = "Restart";
      level.style.pointerEvents = "none";
      level.style.display = "none";
    }
  }
};

window.addEventListener("mousemove", (e) => {
  const check = e.target.classList.value;
  console.log(check)
  collisionCheck(check);
});


nextButton.addEventListener("click", () => {
  if (currentLevel >= levels.length - 1) {
    currentLevel = 0;
    document.querySelector('body').style.backgroundImage = "url('assets/background.jpg')";
  }

  currentLevel++;
  levels.forEach((level, index) => {
    if (level !== null) {
      if (index === currentLevel) {
        level.style.display = "block"
        level.style.pointerEvents = "";
      } else {
        level.style.pointerEvents = "none";
        level.style.display = "none";
      }
    }
  });
  nextButton.style.opacity= 0;
  nextButton.style.pointerEvents= "none";
  uiLevel.textContent= `level ${currentLevel}`;
  uiMessage.textContent = " continue!";
});
