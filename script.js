import { GetRandomQuestions } from "./modules/questionModule.mjs";
const game = document.querySelector(".game"); // Hela gamerutan
const questionText = document.querySelector(".question"); // Frågans text
const timer = document.querySelector(".time"); // Timern
const answerBox = document.querySelector(".answers"); // Lådan som håller svarsknapparna
const answerButtons = document.querySelectorAll(".alt"); // alla svarsknappar

let lives = 3;
let points = 0;
let userAnswer;

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
  answerButtons[0].textContent = currentQuestion.answers[0];
  answerButtons[1].textContent = currentQuestion.answers[1];
  answerButtons[2].textContent = currentQuestion.answers[2];
  answerButtons[3].textContent = currentQuestion.answers[3];
}

console.log(
  randomizedQuestions.length,
  currentQuestion.question,
  currentQuestion.answers,
  currentQuestion.correctAnswer
);

fillQuestion();

answerButtons[0].addEventListener('click', () => {
  userAnswer = answerButtons[0].textContent;
  if (userAnswer === currentQuestion.correctAnswer) {
    points ++;
    //ändra färg på knapparna
    console.log('funkar');
    fillQuestion();
  }
  else {
    lives --;
    //ändra färg på knapparna
    fillQuestion();
  }
})

answerButtons[1].addEventListener('click', () => {
  userAnswer = answerButtons[1].textContent;
  if (userAnswer === currentQuestion.correctAnswer) {
    points ++;
    //ändra färg på knapparna
    console.log('funkar');
    fillQuestion();
  }
  else {
    lives --;
    //ändra färg på knapparna
    fillQuestion();
  }
})

answerButtons[2].addEventListener('click', () => {
  userAnswer = answerButtons[2].textContent;
  if (userAnswer === currentQuestion.correctAnswer) {
    points ++;
    //ändra färg på knapparna
    console.log('funkar');
    fillQuestion();
  }
  else {
    lives --;
    //ändra färg på knapparna
    fillQuestion();
  }
})

answerButtons[3].addEventListener('click', () => {
  userAnswer = answerButtons[3].textContent;
  if (userAnswer === currentQuestion.correctAnswer) {
    points ++;
    //ändra färg på knapparna
    console.log('funkar');
    fillQuestion();
  }
  else {
    lives --;
    //ändra färg på knapparna
    fillQuestion();
  }
})