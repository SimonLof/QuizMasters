import allQuestionsOrdered from "../questions/qa.js";

export function getRandomQuestions(params) {
  for (let i = allQuestionsOrdered.length - 1; i > 0; i--) {
    const randIndex = Math.floor(Math.random() * (i + 1));
    const temp = allQuestionsOrdered[i];
    allQuestionsOrdered[i] = allQuestionsOrdered[randIndex];
    allQuestionsOrdered[randIndex] = temp;
  }
  return allQuestionsOrdered;
}
