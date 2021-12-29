//array that holds objects containing questions, answers, and the correct answer
const quizQuestions = [
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
      "function test( ) { }",
      "let test = function( ) { }",
      "let test = ( ) => { }",
      "function = test( ) { }",
    ],
    correct: "4. function = test( ) { }",
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

//determines the length of the quiz based on the number of questions
const startingSeconds = quizQuestions.length * 10 - 1;
let countdownTimer = startingSeconds;

//array to store high scores for localStorage
let highScores = [];

//keeps track of how many questions have been answered
let questionCount = 0;
//keeps track of stats for high scores
let score = 0;
let correctAnswers = 0;

//querySelector variables
//timer
let countdownEl = document.querySelector("#timer");
//start page
let quizIntroEl = document.querySelector("#quiz-intro");
//dealing with the questions
let quizQuestionsSectionEl = document.querySelector("#quiz-questions");
let questionEl = document.querySelector("#question");
let answersContainerEl = document.querySelector("#answers-container");
//dealing with high scores screen
let highScoreScreenEl = document.querySelector("#high-score-screen");
let highScoreListEl = document.querySelector("#high-scores-list");
//dealing with high score form
let highScoreEl = document.querySelector("#score-form-title");
let scoreSubmitEl = document.querySelector("#score-submit");

//audio variables to play sounds when an answer is correct or incorrect
let correctAudio = new Audio("./assets/audio/correct.wav");
let incorrectAudio = new Audio("./assets/audio/incorrect.wav");

//starts the quiz
let startQuiz = () => {
  //hides the intro div and displays the question section
  quizIntroEl.style.display = "none";
  quizQuestionsSectionEl.style.display = "block";
  //resets quiz stats
  questionCount = 0;
  score = 0;
  correctAnswers = 0;
  //starts the timer
  quizTimer();
  //creates the first question
  createQuestion();
};

//handles answer buttons presses to progress the quiz forward
let quizHandler = (event) => {
  //ensures a created button is clicked before proceeding
  if (event.target.className !== "btn answer-btn") {
    return false;
  }

  //check whether the answer is correct
  if (questionCount > 0) {
    checkAnswer(event.target.textContent);
  }

  //ensures there is another question in the quiz
  if (questionCount === quizQuestions.length) {
    //one final increase to stop timer
    questionCount++;
    //ensures the seconds stops at the one it is clicked on
    countdownTimer = Math.floor(countdownTimer) + 1;
    //gets score at time of completion
    score = countdownTimer;
    //end of quiz
    gameOver();
    return;
  }

  //creates the next question
  createQuestion();
  //increases the question count
  questionCount++;
};

//creates each question
let createQuestion = () => {
  //sets the question text
  questionEl.textContent = quizQuestions[questionCount].question;

  //removes previous buttons to allow the number of responses to be different
  while (answersContainerEl.firstChild) {
    answersContainerEl.removeChild(answersContainerEl.firstChild);
  }

  //creates the proper number of buttons with answers
  for (let i = 0; i < quizQuestions[questionCount].answers.length; i++) {
    let answerEl = document.createElement("button");
    answerEl.className = "btn answer-btn";
    answerEl.textContent =
      i + 1 + ". " + quizQuestions[questionCount].answers[i];
    answersContainerEl.appendChild(answerEl);
  }
};

//checks if an answer is correct
let checkAnswer = (answer) => {
  //plays an appropriate sound and gives a penalty if wrong
  if (answer === quizQuestions[questionCount - 1].correct) {
    correctAnswers++;
    correctAudio.play();
  }
  //lowers remaining time on wrong answer
  else {
    countdownTimer -= 5;
    incorrectAudio.play();
    //prevents negative numbers
    if (countdownTimer < 0) {
      countdownTimer = 0;
    }
  }
};

//quiz timer
let quizTimer = () => {
  //has the timer go down each second
  let interval = setInterval(function () {
    //displays the changing time on the page
    countdownEl.innerHTML = countdownTimer;
    //the countdown timer keeps going while there is time and questions left
    if (countdownTimer > 0 && questionCount <= quizQuestions.length) {
      countdownTimer--;
      //stops and resets the timer when view high scores is clicked
      if (highScoreScreenEl.style.display === "block") {
        clearInterval(interval);
        countdownTimer = startingSeconds;
        countdownEl.innerHTML = 100;
      }
    }
    //ends the game when the time runs out or all questions are answered
    else {
      clearInterval(interval);
      gameOver();
    }
  }, 1000);
};

//ends the quiz if time runs out or the questions are all answered
let gameOver = () => {
  //hides question section and displays form section
  quizQuestionsSectionEl.style.display = "none";
  scoreSubmitEl.style.display = "block";
  //displays the current high score to be saved
  highScoreEl.textContent = "Your Final Score: " + score;
};

//handles the user input on score
let scoreFormHandler = (event) => {
  //prevents the page from refreshing
  event.preventDefault();
  //gets the initials for storage
  let scoreInitialsInput = document.querySelector(
    "input[name='initials']"
  ).value;

  //ensures something is entered in the input
  if (!scoreInitialsInput) {
    alert("You need to put in your initials!");
    return false;
  }

  //gets the accuracy
  let accuracy = (correctAnswers * 100) / quizQuestions.length;

  //creates an object to store the data
  let highScoreObj = {
    initials: scoreInitialsInput,
    score: score,
    accuracy: accuracy,
  };

  //pushes the object to the highScores array
  highScores.push(highScoreObj);

  //sorts the objects in the highScores array by highest score
  highScores.sort(function (x, y) {
    return y.score - x.score;
  });

  //only takes the five highest scores
  highScores = highScores.slice(0, 5);

  //saves and loads the new high scores
  saveScores();
  loadScores();

  //launches the high scores screen
  highScoreScreen();
};

//navigates to the high score screen
let highScoreScreen = () => {
  //handles hiding all other sections and displaying the high scorces screen
  quizIntroEl.style.display = "none";
  quizQuestionsSectionEl.style.display = "none";
  scoreSubmitEl.style.display = "none";
  highScoreScreenEl.style.display = "block";
};

//navigates from high score screen to the quiz intro
let mainMenu = () => {
  //hides high scores and opens the start screen
  quizIntroEl.style.display = "block";
  highScoreScreenEl.style.display = "none";
};

//resets scores
let resetScores = () => {
  highScores = [];
  saveScores();
  loadScores();
  highScoreScreen();
};

//saves the high scores to local storage
let saveScores = () => {
  //converts the array and objects inside into a string
  localStorage.setItem("scores", JSON.stringify(highScores));
};

//loads the high scores from local storage
let loadScores = () => {
  //retrieves local storage data
  let savedScores = localStorage.getItem("scores");
  //prevents loading if there are no saved scores
  if (!savedScores) {
    return false;
  }
  //turns stringified content to an accessible object
  savedScores = JSON.parse(savedScores);
  //puts the high scores into the highScores array
  highScores = savedScores;
  //creates the high score list
  createHighScoreList();
};

//creates a high score list using the high scores
let createHighScoreList = () => {
  //deletes old score list
  while (highScoreListEl.firstChild) {
    highScoreListEl.removeChild(highScoreListEl.firstChild);
  }
  //loops through the highScores array and creates an updated score list
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
    highScoreListEl.appendChild(highScoreEl);
  }
};

//runs startQuiz when the start button is clicked
document.querySelector("#start-button").addEventListener("click", startQuiz);
//runs mainMenu when the main menu button is clicked
document.querySelector("#main-menu-button").addEventListener("click", mainMenu);
//runs resetScores when the reset scores button is clicked
document
  .querySelector("#reset-scores-button")
  .addEventListener("click", resetScores);
//runs quizHandler when a quiz answer button is clicked
document
  .querySelector("#quiz-questions")
  .addEventListener("click", quizHandler);
//runs scoreFormHandler when a score is submitted
document
  .querySelector("#score-submit")
  .addEventListener("submit", scoreFormHandler);
//runs highScoreScreen when the view scores element is clicked
document
  .querySelector("#view-scores")
  .addEventListener("click", highScoreScreen);
//loads the scores in local storage upon page load
loadScores();
