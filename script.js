import { GetRandomQuestions } from "./modules/questionModule.mjs";
const game = document.querySelector(".game"); // Hela gamerutan
const questionText = document.querySelector(".question"); // Frågans text
const timer = document.querySelector(".time"); // Timern
const answerBox = document.querySelector(".answers"); // Lådan som håller svarsknapparna
const answerButtons = document.querySelectorAll(".alt"); // alla svarsknappar
const timeBar = document.querySelector(".time-bar");
let lives = 3;

let timeToAnswer = 20;
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
console.log(timeBar);
function StartTimer() {
  let currentTime = timeToAnswer;
  // Stoppa timern när man svarat på frågan.
  const myTimer = setInterval(() => {
    const newValue = `${(currentTime / timeToAnswer) * 100}`; // Få procent istället för att räkna på sekunder.
    console.log(newValue);
    timeBar.value = newValue;
    currentTime -= 1 / 60;
    if (currentTime <= 0) {
      clearInterval(myTimer);
      PlayerTimeOut();
      alert(":(((((((((((");
    }
  }, 1000 / 60);
}
StartTimer();
function PlayerTimeOut() {
  // det som händer när man inte svarar i tid.
}
