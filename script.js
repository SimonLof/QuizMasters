import { GetRandomQuestions } from "./modules/questionModule.mjs";
const game = document.querySelector(".game"); // Hela gamerutan
const questionText = document.querySelector(".question"); // Frågans text
const timer = document.querySelector(".time"); // Timern
const answerBox = document.querySelector(".answers"); // Lådan som håller svarsknapparna
const answerButtons = document.querySelectorAll(".alt"); // alla svarsknappar

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

function fillQuestion() {
  questionText.textContent = currentQuestion.question;
  
}

console.log(
  currentQuestion.question,
  currentQuestion.alternatives,
  currentQuestion.correctAnswer
);
