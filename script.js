import { GetRandomQuestions } from "./modules/questionModule.mjs";
const game = document.querySelector(".game"); // Hela gamerutan
const questionText = document.querySelector(".question"); // Frågans text
const timer = document.querySelector(".time"); // Timern
const answerBox = document.querySelector(".answers"); // Lådan som håller svarsknapparna
const answerButtons = document.querySelectorAll(".alt"); // alla svarsknappar
const heartShapedBox = document.querySelectorAll(".hearts"); // alla hjärtan
const scoreBoard = document.querySelector("#points"); // poängsiffrans behållare
const starBoard = document.querySelector('#star');
let lives = 3;
let points = 0;

// randomizedQuestions är den randomizerade ordningen på alla frågor.
let randomizedQuestions = GetRandomQuestions();
// currentQuestion är frågan man är på.
let currentQuestion = randomizedQuestions[randomizedQuestions.length - 1];

function AnswerQuestion() {
  // Gör just nu bara att man tar bort sista frågan i arrayen, och sätter currentQuestion till nästa fråga.
  // Här borde det kollas att det är rätt svar, m.m.
  randomizedQuestions.pop();
  currentQuestion = randomizedQuestions[randomizedQuestions.length - 1];
}

console.log(
  randomizedQuestions.length,
  currentQuestion.question,
  currentQuestion.answers,
  currentQuestion.correctAnswer
);


const palette = document.querySelector(".palette");
palette.addEventListener('click', () => {
  UpdateScore();
  UpdateHearts(true);
});
const logo = document.querySelector('#logo');
logo.addEventListener('click', () => {
UpdateHearts();
});


// uppdatera poängtavlan
function UpdateScore(){
  scoreBoard.innerHTML = ++points;
}

function UpdateHearts(reset=false){
  if (reset == true){
    lives = 3;
    heartShapedBox.forEach(element => {
      element.className = 'red';
    });
  }
  else {
    lives--;
    for (let i = 0; i < 3 - lives; i++){
      heartShapedBox[i].className = 'gray';
    }
  }
}