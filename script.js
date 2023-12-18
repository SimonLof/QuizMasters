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
let canClick = true;

let timeToAnswer = 5;
let randomizedQuestions = GetRandomQuestions();
let currentQuestion = randomizedQuestions[randomizedQuestions.length - 1];

// Sätt alla event listeners här.
answerButtons.forEach(b => {
  b.addEventListener('click', AnswerQuestion);
});


__main(); // Kör allt i main, därför att ha kod som körs på olika ställen lite randomly i dokumentet :((((((((((

function __main() {
  // Jag gjorde en main för jag lacka på javascript.
  UpdateHearts(true);
  fillQuestion();
}

function DeathFunction() {
  setTimeout(() => {
    UpdateHearts(true);
  }, 2000);
  SetHighSchore();
  UpdateScore(true);
  // stoppa in lite mer saker som händer när man dör. Typ en meny.
}

function SetHighSchore() {
  const currentHighscore = JSON.parse(window.localStorage.getItem('highScore'));
  if (currentHighscore === null || points > currentHighscore) {
    window.localStorage.setItem('highScore', JSON.stringify(points));
  }
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
    NextQuestion();
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
  else { // Gå till menyn här
    console.log('Slut på frågor!');
    alert('slut på frågor. Gå till menyn!');
    canClick = true;
  }
}

function CorrectAnswer(event) {
  UpdateScore();
  updateButtonColor(event.target, 'green');
  console.log('funkar');
  clearInterval(myTimer);
}

function WrongAnswer(event) {
  UpdateHearts();
  if (lives <= 0) {
    DeathFunction();
  }
  if (event) {
    updateButtonColor(event.target, 'red');
  } else console.log('timeout');
  updateButtonColor(GetButtonWCorrectAnswer(), 'lightgreen');
  clearInterval(myTimer);
}

function updateButtonColor(button, bgColor) {
  button.style.backgroundColor = `${bgColor}`;
}

function fillQuestion() {
  answerButtons.forEach(b => updateButtonColor(b, '#fff'));
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
    // kod för att sätta rätt färg på progressBar när den är gjord i div.
    // >60 grön, > 30 orange, <30 röd
    timeBar.value = newValue;
    currentTime -= 1 / 60;
    if (currentTime <= 0) {
      WrongAnswer();
      NextQuestion();
    }
  }, 1000 / 60);
}

function UpdateScore(reset = false) {
  // Kan nu resettas med en true i callen. Consistent med hur liven funkar.
  if (reset) {
    points = 0;
  }
  else {
    starBoard.focus();
  	setTimeout(focusAway, 50);
    points++;
  }
  scoreBoard.innerHTML = points;
}

function focusAway() {
  scoreBoard.focus();
}

function UpdateHearts(reset = false) {
  if (reset === true) {
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
};
