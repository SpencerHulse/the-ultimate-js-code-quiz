let questionCount = 0;
let startingSeconds = 99;
let score = 0;

let countdownEl = document.getElementById("timer");
let mainEl = document.querySelector("main");

//array that holds objects containing questions, answers, and the correct answer
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

//function that handles all button presses to progress the quiz forward
let quizHandler = () => {
  //runs a check to ensure a button has been clicked
  if (buttonCheck() === false) {
    return;
  }

  //begins the timer when the first question is clicked
  if (questionCount === 0) {
    quizTimer();
  }

  //ensures there is another question in the quiz
  if (questionCount === quizQuestions.length) {
    //gets score at time of completion
    score = countdownEl.textContent;
    //one final increase to stop timer
    questionCount++;
    //ensures the seconds stops at the one it is clicked on
    startingSeconds = Math.floor(startingSeconds) + 1;
    //placeholder for end of quiz
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

let quizTimer = () => {
  let interval = setInterval(function () {
    countdownEl.innerHTML = startingSeconds;
    if (startingSeconds > 0 && questionCount <= quizQuestions.length) {
      startingSeconds--;
    } else {
      clearInterval(interval);
    }
  }, 1000);
};

document.querySelector("main").addEventListener("click", quizHandler);
