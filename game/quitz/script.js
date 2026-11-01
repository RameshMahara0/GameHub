const questions = [
  {
    question: "What does HTML stand for?",
    options: [
      "Hyper Text Markup Language",
      "High Tech Multi Language",
      "Hyper Transfer Mode Language",
      "Home Tool Markup Language"
    ],
    answer: 0
  },
  {
    question: "Which programming language is primarily used for client-side web styling?",
    options: ["Python", "CSS", "Java", "SQL"],
    answer: 1
  },
  {
    question: "What is the correct syntax to print a message in JavaScript console?",
    options: ["print('Hello')", "console.print('Hello')", "console.log('Hello')", "echo('Hello')"],
    answer: 2
  },
  {
    question: "Which data structure uses LIFO (Last In First Out)?",
    options: ["Queue", "Array", "Stack", "Linked List"],
    answer: 2
  },
  {
    question: "What keyword is used to declare a block-scoped variable in JavaScript?",
    options: ["var", "let", "def", "string"],
    answer: 1
  }
];

let currentQuestionIndex = 0;
let score = 0;
let answerSelected = false;

function initQuiz() {
  currentQuestionIndex = 0;
  score = 0;
  answerSelected = false;

  document.getElementById("total-questions").innerText = questions.length;
  document.getElementById("quiz-score").innerText = score;
  document.getElementById("quiz-container").classList.remove("hidden");
  document.getElementById("result-container").classList.add("hidden");

  loadQuestion();
}

function loadQuestion() {
  answerSelected = false;
  const currentQ = questions[currentQuestionIndex];

  document.getElementById("question-number").innerText = currentQuestionIndex + 1;
  document.getElementById("question-text").innerText = currentQ.question;
  document.getElementById("feedback-msg").innerText = "";
  document.getElementById("next-btn").classList.add("hidden");

  const optionsContainer = document.getElementById("options-container");
  optionsContainer.innerHTML = "";

  currentQ.options.forEach((option, index) => {
    const button = document.createElement("button");
    button.classList.add("option-btn");
    button.innerText = option;
    button.addEventListener("click", () => selectOption(index, button));
    optionsContainer.appendChild(button);
  });
}

function selectOption(selectedIndex, selectedBtn) {
  if (answerSelected) return;
  answerSelected = true;

  const currentQ = questions[currentQuestionIndex];
  const allOptionBtns = document.querySelectorAll(".option-btn");

  if (selectedIndex === currentQ.answer) {
    selectedBtn.classList.add("correct");
    score++;
    document.getElementById("quiz-score").innerText = score;
    document.getElementById("feedback-msg").innerText = "Correct Answer!";
    document.getElementById("feedback-msg").style.color = "#10b981";
  } else {
    selectedBtn.classList.add("wrong");
    allOptionBtns[currentQ.answer].classList.add("correct");
    document.getElementById("feedback-msg").innerText = "Wrong Answer!";
    document.getElementById("feedback-msg").style.color = "#ef4444";
  }

  document.getElementById("next-btn").classList.remove("hidden");
}

function nextQuestion() {
  currentQuestionIndex++;

  if (currentQuestionIndex < questions.length) {
    loadQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById("quiz-container").classList.add("hidden");
  document.getElementById("result-container").classList.remove("hidden");
  document.getElementById("final-score-text").innerText = `You scored ${score} out of ${questions.length}!`;
}

function restartQuiz() {
  initQuiz();
}

// Start quiz on load
initQuiz();