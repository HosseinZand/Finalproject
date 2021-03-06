let borderhit = 0;
let mySound;

function preload() {
  soundFormats('mp3');
  mySound = loadSound('assets/bensound-epic');
}

function setup() {
  let cnv = createCanvas(80, 50);
  cnv.mousePressed(canvasPressed);
  background(220,0,0);
  text('Play Music', 10, 20);
}

function canvasPressed()   {
  if (!mySound.isPlaying()){
      mySound.play();
  } else {
    mySound.pause();
  }
}
borderhit = ''
const cursor = document.querySelector('.cursor');

const nextButton = document.querySelector(".next-button");

const uiLevel = document.querySelector(".ui-level");
const uiMessage = document.querySelector(".ui-message");

let currentLevel = 1;
const levels = [
  null,
  document.querySelector(".level-one"),
  document.querySelector(".level-two"),
  document.querySelector(".level-three"),
  document.querySelector(".level-four"),
  document.querySelector(".level-five"),
  document.querySelector(".level-six"),
];

const gameOver = () => {
  alert ("game over...Try again.");
};

const enableNext = () => {
  nextButton.style.opacity= 1;
  nextButton.style.pointerEvents= "all";
  nextButton.textContent = `level ${currentLevel + 1}`;
}

const disableNext = () => {
  nextButton.style.opacity= 0;
  nextButton.style.pointerEvents= "none";
}

const userWon = () => {
  return !levels[currentLevel + 1];
}

const disableBorderEvents = (level) => {
  level.style.pointerEvents = "none";
}

const showVictoryPage = (level) => {
  document.querySelector('#repo_link').style.display = "block";

  let asset = '';

  if (borderhit < 3) {
    asset = 'Finish line.jpg';
  } else if (borderhit >= 3 && borderhit < 6) {
    asset = 'Finish line wounded.jpg';
  } else {
    asset = 'Finish line died.jpg';
  }

  document.querySelector('body').style.backgroundImage = `url('assets/${asset}')`;
  nextButton.textContent = "Restart";
  level.style.display = "none";
}

const finish = () => {
  const level = levels[currentLevel];
  enableNext();
  disableBorderEvents(level);

  if (userWon()) {
    showVictoryPage(level);
  }
};

const collisionCheck = (value) => {
  switch (value) {
    case "maze-border":
      borderhit++;
      gameOver();
      break;
    case "finish":
      finish();
      break;
    default:
      break;
  }
};

window.addEventListener("mousemove", (e) => {
  const check = e.target.classList.value;
  collisionCheck(check);
});

const restartIfNeeded = () => {
  if (currentLevel >= levels.length - 1) {
    currentLevel = 0;
    document.querySelector('body').style.backgroundImage = "url('assets/background.jpg')";
    document.querySelector('#repo_link').style.display = "none";
  }
};

const disableLevel = (level) => {
  disableBorderEvents(level);
  level.style.display = "none";
}

const enableLevel = (level) => {
  level.style.display = "block"
  level.style.pointerEvents = "";
}

const loadNextLevel = () => {
  currentLevel++;
  levels.forEach((level, index) => {
    switch (level) {
      case levels[currentLevel]:
        enableLevel(level);
        break;
      case null:
        console.error('Level ' + index + ' does not exist!');
        break;
      default:
        disableLevel(level);
        break;
    }
  });
};

nextButton.addEventListener("click", () => {
  restartIfNeeded();
  loadNextLevel();
  disableNext();
  uiLevel.textContent= `level ${currentLevel}`;
  uiMessage.textContent = " continue!";
});
