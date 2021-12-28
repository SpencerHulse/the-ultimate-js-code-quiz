let questionCount = 0;
let startingSeconds = 99;
let countdownEl = document.getElementById("timer");

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

let mainEl = document.querySelector("main");

//function that handles all button presses to progress the quiz forward
let quizHandler = () => {
  //runs a check to ensure a button has been clicked
  if (buttonCheck() === false) {
    return;
  }

  //begins the timer when the first question is clicked
  if (questionCount === 0) {
    let interval = setInterval(updateCountdown, 1000);
  }

  //placeholder to ensure there is another question in the quiz
  if (questionCount === quizQuestions.length) {
    alert("Quiz Done Placeholder!");
    return;
  }

  //creates the next question
  createQuestion();

  //increases the question count
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

let createQuestion = () => {
  //removes the previous main elements so that a new question can be made
  while (mainEl.firstChild) {
    mainEl.removeChild(mainEl.firstChild);
  }

  let questionContainerEl = document.createElement("div");
  questionContainerEl.className = "question-container";

  let questionEl = document.createElement("h2");
  questionEl.textContent = quizQuestions[questionCount].question;
  questionEl.className = "question";

  questionContainerEl.appendChild(questionEl);

  for (let i = 0; i < quizQuestions[questionCount].answers.length; i++) {
    let answerEl = document.createElement("button");
    answerEl.className = "btn answer-btn";
    answerEl.textContent =
      i + 1 + ". " + quizQuestions[questionCount].answers[i];
    questionContainerEl.appendChild(answerEl);
  }

  mainEl.appendChild(questionContainerEl);
};

let updateCountdown = () => {
  countdownEl.innerHTML = startingSeconds;
  if (startingSeconds > 0) {
    startingSeconds--;
  } else {
    clearInterval(interval);
  }
};

document.querySelector("main").addEventListener("click", quizHandler);
