import { GetRandomQuestions } from "./modules/questionModule.mjs";
const game = document.querySelector(".game"); // Hela gamerutan
const questionText = document.querySelector(".question"); // Frågans text
const timer = document.querySelector(".time"); // Timern
const answerBox = document.querySelector(".answers"); // Lådan som håller svarsknapparna
const answerButtons = document.querySelectorAll(".btn"); // alla svarsknappar
const heartShapedBox = document.querySelectorAll(".hearts"); // alla hjärtan
const scoreBoard = document.querySelector("#points"); // poängsiffrans behållare
const starBoard = document.querySelector("#star");
const timeBar = document.querySelector(".time-bar");

let lives = 3;
let points = 0;
let myTimer;

let timeToAnswer = 5;
let randomizedQuestions = GetRandomQuestions();
let currentQuestion = randomizedQuestions[randomizedQuestions.length - 1];

// Sätt alla event listeners här.
answerButtons.forEach(button => {
  button.addEventListener('click', AnswerQuestion);
});

__main(); // Kör allt i main, därför att ha kod som körs på olika ställen lite randomly i dokumentet :((((((((((

function __main() {
  // Jag gjorde en main för jag lacka på javascript.
  UpdateHearts(true);
  fillQuestion();
  answerButtons.forEach(b => b.style.backgroundColor = '#559900');
}

function DeathFunction() {
  setTimeout(() => {
    UpdateHearts(true);
  }, 2000);
  SetHighSchore();
  UpdateScoreBoard(true);
  points = 0;
  // stoppa in lite mer saker som händer när man dör. Typ en meny.
}

function SetHighSchore() {
  const currentHighscore = JSON.parse(window.localStorage.getItem('highScore'));
  if (currentHighscore === null || points > currentHighscore) {
    window.localStorage.setItem('highScore', JSON.stringify(points));
  }
}

function AnswerQuestion(event) {
  if (event.target.textContent === currentQuestion.correctAnswer) {
    CorrectAnswer(event);
  }
  else {
    WrongAnswer(event);
  }
  NextQuestion();
}

function CorrectAnswer(event) {
  UpdateScoreBoard();
  updateButtonColor(event, 'green');
  console.log('funkar');
  clearInterval(myTimer);
}

function NextQuestion() {
  randomizedQuestions.pop();
  currentQuestion = randomizedQuestions[randomizedQuestions.length - 1];
  if (randomizedQuestions.length > 0) {
    setTimeout(() => {
      fillQuestion();
    }, 2000);
  }
  else { // Gå till menyn här
    console.log('Slut på frågor!');
  }
}

function WrongAnswer(event) {
  UpdateHearts();
  if (lives <= 0) {
    DeathFunction();
  }
  if (event) {
    updateButtonColor(event, 'red');
  }
  clearInterval(myTimer);
}

function updateButtonColor(event, bgColor) {
  event.target.style.backgroundColor = `${bgColor}`;
}

function fillQuestion() {
  answerButtons.forEach(b => b.style.backgroundColor = "#fff");
  StartTimer();
  questionText.textContent = currentQuestion.question;
  answerButtons[0].textContent = currentQuestion.answers[0];
  answerButtons[1].textContent = currentQuestion.answers[1];
  answerButtons[2].textContent = currentQuestion.answers[2];
  answerButtons[3].textContent = currentQuestion.answers[3];
}

function StartTimer() {
  let currentTime = timeToAnswer;
  myTimer = setInterval(() => {
    const newValue = `${(currentTime / timeToAnswer) * 100}`; // Få procent istället för att räkna på sekunder.
    timeBar.value = newValue;
    currentTime -= 1 / 60;
    if (currentTime <= 0) {
      WrongAnswer();
      NextQuestion();
    }
  }, 1000 / 60);
}
function UpdateScoreBoard(reset = false) {
  if (reset) {
    scoreBoard.innerHTML = 0;
  } else {
    scoreBoard.innerHTML = ++points;
  }
}

function UpdateHearts(reset = false) {
  if (reset == true) {
    lives = 3;
    heartShapedBox.forEach((element) => {
      element.className = "red";
    });
  } else {
    lives--;
    for (let i = 0; i < 3 - lives; i++) {
      heartShapedBox[i].className = "gray";
    }
  }
}
