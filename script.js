//#region Variabler
import { GetRandomQuestions } from "./modules/questionModule.mjs";
const mainWhiteSquare = document.querySelector('main');
const topBar = document.querySelector('.top-bar');
const game = document.querySelector(".game"); // Hela gamerutan
const questionText = document.querySelector(".question"); // Frågans text
const scoreBoard = document.querySelector("#points"); // poängsiffrans behållare
const highsoreBoard = document.querySelector('#hiscore-points');
const highScoreStar = document.querySelector('#heyscore-star');
const starBoard = document.querySelector("#star");
const timeBar = document.querySelector(".time");
const menu = document.querySelector('.menu-container');
const quitButton = document.querySelector('.btn-quit');
const startButton = document.querySelector('.btn-start');
const menuText = document.querySelector('.menu-text');
const menuGreeting = document.querySelector('.menu-greeting');
const logo = document.querySelector('#logo');
const lifeBox = document.querySelector('#life-container');
const faces = document.querySelector('#face-life');
const answerButtons = document.querySelectorAll(".btn"); // alla svarsknappar
const heartShapedBox = document.querySelectorAll(".hearts"); // alla hjärtan
const song = new Audio("sound/oe-ritschratsch.mp3");

const faceList = ['./images/faces/fullhealth.png', './images/faces/1dmg.png', './images/faces/2dmg.png', './images/faces/ded.png'];
const linkList = ['https://www.youtube.com/watch?v=bP_aR4jDTWM', 'https://youtu.be/h6DNdop6pD8', 'https://www.youtube.com/watch?v=PfYnvDL0Qcw&t=28s', 'https://www.youtube.com/watch?v=i8ju_10NkGY', 'https://www.youtube.com/watch?v=6tR5aDGcXPg'];
const quitLink = linkList[Math.floor(Math.random() * linkList.length)];
const maxLives = 3;
const timeToAnswer = 10;

let menuState = true;
let heartLives = true;
let lives = maxLives;
let points = 0;
let myTimer;
let canClick = true;
let currentlyPlayingSong = false;
let canPlaySong = false;

let randomizedQuestions = GetRandomQuestions();
let currentQuestion = randomizedQuestions[randomizedQuestions.length - 1];
const xmaxGreeting = ['God jul!', '¡Feliz Navidad!', 'Joyeux Noël!', 'Frohe Weihnachten!', 'Buon Natale!', 'Feliz Natal!', 'Crăciun Fericit!', 'Glædelig Jul!', 'Hyvää Joulua!', 'Gleðileg Jól!', 'Wesołych Świąt!', 'Vrolijk Kerstfeest!', 'Sretan Božić!', 'Veselé Vánoce!', 'Felicem Natalem Christi!', 'Nollaig Shona!', 'Merry Christmas!', 'Happy Holidays!'];
//#endregion

//#region event listeners
// Sätt alla event listeners här.
topBar.addEventListener('click', () => {
  if (menuState) {
    heartLives = !heartLives;
    if (heartLives) {
      faces.style.display = 'none';
      heartShapedBox.forEach(h => h.style.display = 'inline');
    } else {
      heartShapedBox.forEach(h => h.style.display = 'none');
      faces.style.display = 'inline';
      faces.src = `${faceList[faceList.length - 1 - lives]}`;
    }
  }
});
song.addEventListener('ended', () => { currentlyPlayingSong = false; });
song.addEventListener('canplaythrough', () => { canPlaySong = true; });
answerButtons.forEach(b => {
  b.addEventListener('click', AnswerQuestion);
});
quitButton.addEventListener('click', quit);
startButton.addEventListener('click', StartGame);
// Tryck på loggan för att testa border
logo.addEventListener('click', BorderStyleSwap);
menuGreeting.addEventListener('click', NewRandomGreeting);
//#endregion

__main(); // Kör allt i main, därför att ha kod som körs på olika ställen lite randomly i dokumentet :((((((((((

function __main() {
  TurnOffHoverEffect();
  SetHighScore();
  GameMenu(true);
}

//#region Menu stuff
function TurnOffHoverEffect() {
  answerButtons.forEach(b => updateButtonColor(b, 'white'));
}

function quit() {
  window.location.href = quitLink;
}

function GameMenu(firstTime = false) {
  menuState = true;
  NewRandomGreeting();
  menu.style.display = 'flex';
  if (!firstTime) {
    menuText.textContent = 'Du fick ' + points + " poäng.";
  }
  canClick = false;
}

function StartGame() {
  menu.style.display = 'none';
  UpdateHearts(true);
  UpdateScore(true);
  fillQuestion();
  canClick = true;
  menuState = false;
}

function NewRandomGreeting() {
  let randomGreeting = Math.floor(Math.random() * xmaxGreeting.length);
  while (menuGreeting.textContent === xmaxGreeting[randomGreeting]) {
    // gör att det inte blir samma greeting 2 gånger på raken.
    randomGreeting = Math.floor(Math.random() * xmaxGreeting.length);
  }
  menuGreeting.textContent = xmaxGreeting[randomGreeting];
}
//#endregion

function DeathFunction() {
  // reset the game
  SetHighScore();
  GameMenu();
  TurnOffHoverEffect();
  randomizedQuestions = GetRandomQuestions();
  currentQuestion = randomizedQuestions[randomizedQuestions.length - 1];
}

//#region Question stuff
function GetButtonWCorrectAnswer() {
  let result;
  answerButtons.forEach(b => {
    if (b.textContent === currentQuestion.correctAnswer) {
      result = b;
    }
  });
  return result;
}

function AnswerQuestion(event) {
  if (canClick) {
    canClick = false;
    TurnOffHoverEffect();
    if (event.target.textContent === currentQuestion.correctAnswer) {
      CorrectAnswer(event);
    }
    else {
      WrongAnswer(event);
    }
    if (lives > 0)
      NextQuestion();
    else {
      DeathFunction();
    }
  }
}

function NextQuestion() {
  randomizedQuestions.pop();
  if (randomizedQuestions.length > 0) {
    currentQuestion = randomizedQuestions[randomizedQuestions.length - 1];
    setTimeout(() => {
      fillQuestion();
      canClick = true;
    }, 2000);
  }
  else {
    DeathFunction();
    GameMenu();
    canClick = false;
  }
}

function CorrectAnswer(event) {
  UpdateScore();
  updateButtonColor(event.target, 'green');
  StopTimer();
}

function WrongAnswer(event) {
  UpdateHearts();
  StopTimer();
  if (event) {
    updateButtonColor(event.target, 'red');
  }
  updateButtonColor(GetButtonWCorrectAnswer(), 'lightgreen');
}

function updateButtonColor(button, bgColor = '') {
  button.style.backgroundColor = `${bgColor}`;
}

function fillQuestion() {
  answerButtons.forEach(b => updateButtonColor(b, ''));
  answerButtons.forEach(b => b.textContent = '');

  questionText.textContent = currentQuestion.question;

  currentQuestion.answers.forEach(a => {
    let randInt = Math.floor(Math.random() * 4);
    while (answerButtons[randInt].textContent !== '') {
      randInt = Math.floor(Math.random() * 4);
    }
    answerButtons[randInt].textContent = a;
  });
  StartTimer();
}
//#endregion

//#region Timer stuff
function StartTimer() {
  let currentTime = timeToAnswer;
  myTimer = setInterval(() => {
    const newValue = `${(currentTime / timeToAnswer) * 100}`;
    if (newValue > 60) {
      timeBar.style.backgroundColor = `green`;
    } else if (newValue > 30) {
      timeBar.style.backgroundColor = `orange`;
    } else {
      timeBar.style.backgroundColor = `red`;
    }
    timeBar.style.width = `${newValue}%`;
    currentTime -= 1 / 60;
    if (currentTime <= 0) {
      canClick = false;
      WrongAnswer();
      if (lives > 0) {
        NextQuestion();
      }
      else {
        DeathFunction();
      }
    }
  }, 1000 / 60);
}

function StopTimer() {
  clearInterval(myTimer);
}
//#endregion

//#region Score stuff
function SetHighScore() {
  let currentHighscore = JSON.parse(window.localStorage.getItem('highScore'));
  if (currentHighscore === null || points > currentHighscore) {
    window.localStorage.setItem('highScore', JSON.stringify(points));
    currentHighscore = points;
    highScoreStar.style.opacity = 0;
    setTimeout(() => { comeBack(highScoreStar); }, 250);
  }
  highsoreBoard.innerHTML = currentHighscore;
}

function UpdateScore(reset = false) {
  if (reset) {
    points = 0;
  }
  else {
    starBoard.style.opacity = 0;
    setTimeout(() => {
      comeBack(starBoard);
    }, 250);
    points++;
    SetHighScore();
  }
  if (points > 20)
    PlaySong();
  scoreBoard.innerHTML = points;
}

function PlaySong() {
  if (canPlaySong && !currentlyPlayingSong) {
    currentlyPlayingSong = true;
    song.play();
    song.volume = 0.5;
  }
}

function comeBack(element) {
  element.style.opacity = 1;
}
//#endregion

function UpdateHearts(reset = false) {
  if (reset === true) {
    lives = maxLives;
    if (heartLives) {
      heartShapedBox.forEach((element) => {
        element.className = "red";
      });
    } else {
      faces.src = `${faceList[faceList.length - 1 - lives]}`;
    }
  } else {
    lives--;
    if (heartLives) {
      for (let i = 0; i < 3 - lives; i++) {
        heartShapedBox[i].className = "gray";
      }
    } else {
      faces.src = `${faceList[faceList.length - 1 - lives]}`;
    }
  }
};

//#region border test
function BorderStyleSwap() {
  if (mainWhiteSquare.style.borderStyle === 'solid') {
    mainWhiteSquare.style.borderStyle = 'double';
    mainWhiteSquare.style.borderColor = 'green';
    mainWhiteSquare.style.borderWidth = '2px';
    mainWhiteSquare.style.borderRadius = '5%';
  } else {
    mainWhiteSquare.style.borderStyle = 'solid';
    mainWhiteSquare.style.borderColor = 'white';
    mainWhiteSquare.style.borderWidth = '2px';
    mainWhiteSquare.style.borderRadius = '0';
  }
}
//#endregion