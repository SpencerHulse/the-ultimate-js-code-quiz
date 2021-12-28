let quizQuestions = [
  {
    question: "Which one is not a valid variable declaration in JavaScript?",
    answers: ["let", "for", "var", "const"],
    correct: "for",
  },
];

let mainE1 = document.querySelector("main");

document.querySelector(".start-btn").addEventListener("click", function () {
  document.querySelector(".quiz-intro").style.display = "none";
  let questionContainerE1 = document.createElement("div");
  questionContainerE1.className = "question-container";

  let questionE1 = document.createElement("h2");
  questionE1.textContent = quizQuestions[0].question;
  questionE1.className = "question";

  questionContainerE1.appendChild(questionE1);

  for (let i = 0; i < quizQuestions[0].answers.length; i++) {
    let answerE1 = document.createElement("button");
    answerE1.className = "answer-btn";
    answerE1.textContent = i + 1 + ". " + quizQuestions[0].answers[i];
    questionContainerE1.appendChild(answerE1);
  }

  mainE1.appendChild(questionContainerE1);
});
