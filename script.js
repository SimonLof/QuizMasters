import { GetRandomQuestions } from "./modules/questionModule.mjs";
const game = document.querySelector(".game"); // Hela gamerutan
const questionText = document.querySelector(".question"); // Frågans text
const answerButtons = document.querySelectorAll(".btn"); // alla svarsknappar
const heartShapedBox = document.querySelectorAll(".hearts"); // alla hjärtan
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

const maxLives = 3;
const timeToAnswer = 10;

let lives = maxLives;
let points = 0;
let myTimer;
let canClick = true;

let randomizedQuestions = GetRandomQuestions();
let currentQuestion = randomizedQuestions[randomizedQuestions.length - 1];

const xmaxGreeting = ['God jul!', '¡Feliz Navidad!', 'Joyeux Noël!', 'Frohe Weihnachten!', 'Buon Natale!', 'Feliz Natal!', 'Crăciun Fericit!', 'Glædelig Jul!', 'Hyvää Joulua!', 'Gleðileg Jól!', 'Wesołych Świąt!', 'Vrolijk Kerstfeest!', 'Sretan Božić!', 'Veselé Vánoce!', 'Felicem Natalem Christi!', 'Nollaig Shona!', 'Merry Christmas!', 'Happy Holidays!'];

// Sätt alla event listeners här.
answerButtons.forEach(b => {
  b.addEventListener('click', AnswerQuestion);
});
quitButton.addEventListener('click', quit);
startButton.addEventListener('click', StartGame);

function quit() {
  window.location.href = 'https://nackademin.se';
}

__main(); // Kör allt i main, därför att ha kod som körs på olika ställen lite randomly i dokumentet :((((((((((

function __main() {
  SetHighScore();
  GameMenu(true);
}



function StartGame() {
  menu.style.display = 'none';
  UpdateHearts(true);
  UpdateScore(true);
  fillQuestion();
  canClick = true;
}

function GameMenu(firstTime = false) {
  let randomGreeting = Math.floor(Math.random() * xmaxGreeting.length);
  menuGreeting.textContent = xmaxGreeting[randomGreeting];
  menu.style.display = 'flex';
  if (!firstTime) {
    menuText.textContent = 'Du fick ' + points + " poäng.";
  }
  canClick = false;
}

function DeathFunction() {
  SetHighScore();
  GameMenu();
  randomizedQuestions = GetRandomQuestions();
  currentQuestion = randomizedQuestions[randomizedQuestions.length - 1];
}

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
  currentQuestion = randomizedQuestions[randomizedQuestions.length - 1];
  if (randomizedQuestions.length > 0) {
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
  StartTimer();
  questionText.textContent = currentQuestion.question;
  answerButtons.forEach(b => b.textContent = '');
  currentQuestion.answers.forEach(a => {
    let randInt = Math.floor(Math.random() * 4);
    while (answerButtons[randInt].textContent !== '') {
      randInt = Math.floor(Math.random() * 4);
    }
    answerButtons[randInt].textContent = a;
  });
}

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
    setTimeout(() => { comeBack(starBoard); }, 250);
    points++;
    SetHighScore();
  }
  scoreBoard.innerHTML = points;
}

function comeBack(element) {
  element.style.opacity = 1;
}

function UpdateHearts(reset = false) {
  if (reset === true) {
    lives = maxLives;
    heartShapedBox.forEach((element) => {
      element.className = "red";
    });
  } else {
    lives--;
    for (let i = 0; i < 3 - lives; i++) {
      heartShapedBox[i].className = "gray";
    }
  }
};
