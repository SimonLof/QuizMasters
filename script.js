import { GetRandomQuestions } from "./modules/questionModule.mjs";
const game = document.querySelector(".game"); // Hela gamerutan
const questionText = document.querySelector(".question"); // Frågans text
const timer = document.querySelector(".time"); // Timern
const answerBox = document.querySelector(".answers"); // Lådan som håller svarsknapparna
const answerButtons = document.querySelectorAll(".btn"); // alla svarsknappar
const heartShapedBox = document.querySelectorAll(".hearts"); // alla hjärtan
const scoreBoard = document.querySelector("#points"); // poängsiffrans behållare
const highsoreBoard = document.querySelector('#hiscore-points');
const starBoard = document.querySelector("#star");
const timeBar = document.querySelector(".time");
const menu = document.querySelector('.menu-container');
const quitButton = document.querySelector('.btn-quit');
const startButton = document.querySelector('.btn-start');
const menuText = document.querySelector('.menu-text');

const maxLives = 30;

let lives = 0;
let points = 0;
let myTimer;
let canClick = true;

let timeToAnswer = 1;
let randomizedQuestions = GetRandomQuestions();
let currentQuestion = randomizedQuestions[randomizedQuestions.length - 1];

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
  menuText.textContent = 'God jul!';
  questionText.textContent = 'QuizMasters!';
  answerButtons.forEach((b) => b.textContent = ' ');
  GameMenu();
}

function StartGame() {
  menu.style.display = 'none';
  UpdateHearts(true);
  UpdateScore(true);
  fillQuestion();
  canClick = true;
}

function GameMenu() {
  menu.style.display = 'flex';
  menuText.textContent = 'Du fick ' + points + " poäng.";
  canClick = false;
}

function DeathFunction() {
  SetHighSchore();
  GameMenu();
  randomizedQuestions = GetRandomQuestions();
  currentQuestion = randomizedQuestions[randomizedQuestions.length - 1];
}

function SetHighSchore() {
  const currentHighscore = JSON.parse(window.localStorage.getItem('highScore'));
  if (currentHighscore === null || points > currentHighscore) {
    window.localStorage.setItem('highScore', JSON.stringify(points));
  }
  highsoreBoard.innerHTML = currentHighscore;
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
  console.log('funkar');
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
      console.log(randInt);
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

function UpdateScore(reset = false) {
  if (reset) {
    points = 0;
  }
  else {
    starBoard.style.opacity = 0;
    setTimeout(comeBack, 250);
    points++;
    SetHighSchore();
  }
  scoreBoard.innerHTML = points;
}

function comeBack() {
  starBoard.style.opacity = 1;
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
