const quizData = [
  {
    question: "What is the capital of France?",
    options: ["London", "Berlin", "Paris", "Madrid"],
    answer: "Paris"
  },
  {
    question: "Which language runs in the browser?",
    options: ["Python", "JavaScript", "C++", "Java"],
    answer: "JavaScript"
  },
  {
    question: "Which company developed React?",
    options: ["Google", "Facebook", "Microsoft", "Apple"],
    answer: "Facebook"
  }
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById("quiz-container");
const nextBtn = document.getElementById("next-btn");
const result = document.getElementById("result");

function loadQuestion() {
  quizContainer.innerHTML = "";
  const q = quizData[currentQuestion];
  const questionEl = document.createElement("h3");
  questionEl.textContent = q.question;
  quizContainer.appendChild(questionEl);

  q.options.forEach(option => {
    const li = document.createElement("li");
    li.textContent = option;
    li.onclick = () => selectOption(li, q.answer);
    quizContainer.appendChild(li);
  });
}

function selectOption(li, correctAnswer) {
  if (li.textContent === correctAnswer) {
    score++;
  }
  currentQuestion++;
  if (currentQuestion < quizData.length) {
    loadQuestion();
  } else {
    quizContainer.innerHTML = "";
    nextBtn.style.display = "none";
    result.textContent = `Quiz Finished! Your score: ${score}/${quizData.length}`;
  }
}

nextBtn.onclick = () => {
  loadQuestion();
  nextBtn.style.display = "none";
};

loadQuestion();
