let questionCount = 0;

let quizQuestions = [
  {
    question: "Which one is not a valid variable declaration in JavaScript?",
    answers: ["let", "for", "var", "const"],
    correct: "for",
  },
  {
    question: "Which of these is a falsy value?",
    answers: ["true", "null", "-42", "[ ]"],
    correct: "null",
  },
];

let mainE1 = document.querySelector("main");

let createQuestion = () => {
  //runs a check to ensure a button has been clicked
  if (buttonCheck() === false) {
    return;
  }

  if (questionCount === quizQuestions.length) {
    alert("Quiz Done Placeholder!");
    return;
  }

  while (mainE1.firstChild) {
    mainE1.removeChild(mainE1.firstChild);
  }

  let questionContainerE1 = document.createElement("div");
  questionContainerE1.className = "question-container";

  let questionE1 = document.createElement("h2");
  questionE1.textContent = quizQuestions[questionCount].question;
  questionE1.className = "question";

  questionContainerE1.appendChild(questionE1);

  for (let i = 0; i < quizQuestions[questionCount].answers.length; i++) {
    let answerE1 = document.createElement("button");
    answerE1.className = "btn answer-btn";
    answerE1.textContent =
      i + 1 + ". " + quizQuestions[questionCount].answers[i];
    questionContainerE1.appendChild(answerE1);
  }

  mainE1.appendChild(questionContainerE1);

  questionCount++;
};

let buttonCheck = () => {
  //ensures a button is being clicked
  if (
    event.target.className !== "btn start-btn" &&
    event.target.className !== "btn answer-btn"
  ) {
    //stops the function from continuing if a button is not clicked
    return false;
  }
};

document.querySelector("main").addEventListener("click", createQuestion);
/* let startQuiz = () => {
  document.querySelector(".quiz-intro").style.display = "none";
  createQuestion();
  questionCount++;
};

let createQuestion = () => {
  let questionContainerE1 = document.createElement("div");
  questionContainerE1.className = "question-container";

  let questionE1 = document.createElement("h2");
  questionE1.textContent = quizQuestions[questionCount].question;
  questionE1.className = "question";

  questionContainerE1.appendChild(questionE1);

  for (let i = 0; i < quizQuestions[questionCount].answers.length; i++) {
    let answerE1 = document.createElement("button");
    answerE1.className = "answer-btn";
    answerE1.id = "answer" + i;
    answerE1.textContent =
      i + 1 + ". " + quizQuestions[questionCount].answers[i];
    questionContainerE1.appendChild(answerE1);
  }

  mainE1.appendChild(questionContainerE1);
};

let nextQuestion = () => {
  if (questionCount < quizQuestions.length) {
    alert("It worked!");
  } else {
    alert("Quiz Over!");
  }
}; */

/* let answerE1= document.querySelector("#answer1")
undefined
console.log(answerE1)
VM20400:1 <button class=​"answer-btn" id=​"answer1">​2. for​</button>​
undefined
console.log(answerE1.textContent)
VM20537:1 2. for
undefined
answerE1.textContent = "2. " + "wow";
'2. wow'
console.log(answerE1.textContent)
VM20795:1 2. wow
undefined */
