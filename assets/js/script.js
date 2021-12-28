let questionCount = 0;
let startingSeconds = 99;
let score = 0;
let correctAnswers = 0;
let highScores = [];

let countdownEl = document.getElementById("timer");
let mainEl = document.querySelector("main");

let correctAudio = new Audio("./assets/audio/correct.wav");
let incorrectAudio = new Audio("./assets/audio/incorrect.wav");

//array that holds objects containing questions, answers, and the correct answer
let quizQuestions = [
  {
    question: "Which one is not a valid variable declaration in JavaScript?",
    answers: ["let", "for", "var", "const"],
    correct: "2. for",
  },
  {
    question: "Which of these is a falsy value?",
    answers: ["true", "null", "-42", "[ ]"],
    correct: "2. null",
  },
  {
    question: "Which HTML element holds JavaScript?",
    answers: ["link", "head", "meta", "script"],
    correct: "4. script",
  },
  {
    question: "Which one of these allows you to edit the content of an element",
    answers: ["innerText", "textChange", "textContent", "changeTextContent"],
    correct: "3. textContent",
  },
  {
    question: "The external JavaScript file needs to contain a <script> tag.",
    answers: ["true", "false"],
    correct: "2. false",
  },
  {
    question: "Which of these methods will not make a proper function?",
    answers: [
      "function test() {}",
      "let test = function() {}",
      "let test = () => {}",
      "function = test() {}",
    ],
    correct: "4. function = test() {}",
  },
  {
    question: "Which one of these does not test if two things are equal?",
    answers: ["=", "==", "==="],
    correct: "1. =",
  },
  {
    question: "Which would you not see at the start of a for loop?",
    answers: ["let i = 0", "i <= 10", "i++", "i.length"],
    correct: "4. i.length",
  },
  {
    question:
      "You can access arrays with both dot notation and bracket notation.",
    answers: ["true", "false"],
    correct: "1. true",
  },
  {
    question: "What do you use if you want a random number?",
    answers: ["Math.floor", "Math.random", "Math.chance", "Math.between"],
    correct: "2. Math.random",
  },
];

//function that handles all button presses to progress the quiz forward
let quizHandler = (event) => {
  if (event.target.className === "btn high-score-btn main-menu") {
    window.location.reload();
  }

  if (event.target.className === "btn high-score-btn reset-scores") {
    highScores = [];
    saveTasks();
    highScoreScreen();
  }

  //runs a check to ensure a button has been clicked
  if (buttonCheck() === false) {
    return;
  }

  //begins the timer when the first question is clicked
  if (questionCount === 0) {
    quizTimer();
  }

  //check answer
  if (questionCount > 0) {
    checkAnswer(event.target.textContent);
  }

  //ensures there is another question in the quiz
  if (questionCount === quizQuestions.length) {
    //one final increase to stop timer
    questionCount++;
    //ensures the seconds stops at the one it is clicked on
    startingSeconds = Math.floor(startingSeconds) + 1;
    //gets score at time of completion
    score = startingSeconds;
    //end of quiz
    gameOver();
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

let checkAnswer = (answer) => {
  if (answer === quizQuestions[questionCount - 1].correct) {
    correctAnswers++;
    correctAudio.play();
  } else {
    startingSeconds -= 5;
    incorrectAudio.play();
  }
};

let quizTimer = () => {
  let interval = setInterval(function () {
    countdownEl.innerHTML = startingSeconds;
    if (startingSeconds > 0 && questionCount <= quizQuestions.length) {
      startingSeconds--;
    } else {
      clearInterval(interval);
      gameOver();
    }
  }, 1000);
};

let gameOver = () => {
  while (mainEl.firstChild) {
    mainEl.removeChild(mainEl.firstChild);
  }

  let highScoreEl = document.createElement("h2");
  highScoreEl.className = "score-form-title";
  highScoreEl.textContent = "Your Final Score: " + score;
  mainEl.appendChild(highScoreEl);

  let saveScoreEl = document.createElement("p");
  saveScoreEl.className = "score-form-instructions";
  saveScoreEl.textContent = "Enter your initials below and save your score!";
  mainEl.appendChild(saveScoreEl);

  let scoreFormEl = document.createElement("form");
  scoreFormEl.className = "submit-form";

  let scoreInputEl = document.createElement("input");
  scoreInputEl.setAttribute("type", "text");
  scoreInputEl.setAttribute("name", "initials");
  scoreInputEl.setAttribute("placeholder", "Enter Initials");
  scoreFormEl.appendChild(scoreInputEl);

  let scoreSubmitEl = document.createElement("button");
  scoreSubmitEl.className = "btn score-submit-btn";
  scoreSubmitEl.id = "submit-score";
  scoreSubmitEl.textContent = "Submit Score";
  scoreFormEl.appendChild(scoreSubmitEl);

  mainEl.appendChild(scoreFormEl);
};

let scoreFormHandler = (event) => {
  event.preventDefault();
  let scoreInitialsInput = document.querySelector(
    "input[name='initials']"
  ).value;

  if (!scoreInitialsInput) {
    alert("You need to put in your initials!");
    return false;
  }

  let accuracy = (correctAnswers * 100) / quizQuestions.length;

  let highScoreObj = {
    initials: scoreInitialsInput,
    score: score,
    accuracy: accuracy,
  };

  highScores.push(highScoreObj);

  highScores.sort(function (x, y) {
    return y.score - x.score;
  });

  highScores = highScores.slice(0, 5);

  saveTasks();

  highScoreScreen();
};

let highScoreScreen = () => {
  while (mainEl.firstChild) {
    mainEl.removeChild(mainEl.firstChild);
  }

  let highScoreTitleEl = document.createElement("h2");
  highScoreTitleEl.className = "high-scores-title";
  highScoreTitleEl.textContent = "High Scores";
  mainEl.appendChild(highScoreTitleEl);

  for (let i = 0; i < highScores.length; i++) {
    let highScoreEl = document.createElement("p");
    highScoreEl.className = "high-score";
    highScoreEl.textContent =
      [i + 1] +
      ". " +
      highScores[i].initials +
      " — " +
      highScores[i].score +
      " — " +
      highScores[i].accuracy +
      "% Accuracy";
    mainEl.appendChild(highScoreEl);
  }

  let playAgainEl = document.createElement("button");
  playAgainEl.className = "btn high-score-btn main-menu";
  playAgainEl.textContent = "Main Menu";
  mainEl.appendChild(playAgainEl);

  let resetScoresEl = document.createElement("button");
  resetScoresEl.className = "btn high-score-btn reset-scores";
  resetScoresEl.textContent = "Reset Scores";
  mainEl.appendChild(resetScoresEl);
};

let saveTasks = () => {
  localStorage.setItem("scores", JSON.stringify(highScores));
};

let loadTasks = () => {
  let savedScores = localStorage.getItem("scores");

  if (!savedScores) {
    return false;
  }

  savedScores = JSON.parse(savedScores);

  highScores = savedScores;
};

document.querySelector("main").addEventListener("click", quizHandler);
document.querySelector("main").addEventListener("submit", scoreFormHandler);
document
  .querySelector("#view-scores")
  .addEventListener("click", highScoreScreen);
loadTasks();
