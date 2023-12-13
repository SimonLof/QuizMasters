import allQuestionsOrdered from "../questions/qa.json" assert { type: "json" };
let randomQuestionOrder = [];

export function GetRandomQuestions(params) {
  for (let i = 0; i < allQuestionsOrdered.length; i++) {
    let randIndex = Math.floor(Math.random() * allQuestionsOrdered.length);
    while (randomQuestionOrder.includes(allQuestionsOrdered[randIndex])) {
      randIndex = Math.floor(Math.random() * allQuestionsOrdered.length);
    }
    randomQuestionOrder.push(allQuestionsOrdered[randIndex]);
  }
  return randomQuestionOrder;
}
