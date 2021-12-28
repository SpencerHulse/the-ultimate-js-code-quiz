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
];

//function that handles all button presses to progress the quiz forward
let quizHandler = (event) => {
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
    console.log("correct!");
    correctAnswers++;
    correctAudio.play();
  } else {
    console.log("incorrect!");
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
  highScoreEl.className = "high-score";
  highScoreEl.textContent = "Your Final Score: " + score;
  mainEl.appendChild(highScoreEl);

  let saveScoreEl = document.createElement("p");
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
  scoreSubmitEl.className = "btn";
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
      highScores[i].initials +
      " — " +
      highScores[i].score +
      " — " +
      highScores[i].accuracy +
      "% Accuracy";
    mainEl.appendChild(highScoreEl);
  }
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
