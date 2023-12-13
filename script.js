const game = document.querySelector(".game"); // Hela gamerutan
const questionText = document.querySelector(".question"); // Frågans text
const timer = document.querySelector(".time"); // Timern
const answerBox = document.querySelector(".answers"); // Lådan som håller svarsknapparna
const answerButtons = document.querySelectorAll(".alt"); // alla svarsknappar
let lives = 3;

const question1 = {
  question: "Hur många är vi?",
  answers: ["1", "2", "3", "4"],
  correctAnswer: "4",
};

const question2 = {
  question: "Sköldpaddor?",
  answers: ["1", "2", "3", "4"],
  correctAnswer: "4",
};

const questionArray = [];
questionArray.push(question1);
questionArray.push(question2);

console.log(questionArray[0].answers);
