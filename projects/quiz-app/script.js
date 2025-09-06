const quizData = [
  {
    question: "Which company provides telecom services in Ethiopia?",
    options: ["Ethio Telecom", "Vodafone", "MTN", "Orange"],
    answer: "Ethio Telecom"
  },
  {
    question: "What type of services does Ethio Telecom provide?",
    options: ["Mobile", "Internet", "Landline", "All of the above"],
    answer: "All of the above"
  },
  {
    question: "Which technology is used by Ethio Telecom for fiber-to-the-home?",
    options: ["FTTH", "ADSL", "Cable TV", "Satellite"],
    answer: "FTTH"
  },
  {
    question: "What does MSAN stand for in Ethio Telecom's network?",
    options: ["Multi-Service Access Node", "Mobile Service Access Network", "Main Server Access Node", "Multi-System Access Node"],
    answer: "Multi-Service Access Node"
  },
  {
    question: "Which generation of mobile networks introduced high-speed internet for smartphones?",
    options: ["2G", "3G", "4G", "5G"],
    answer: "3G"
  },
  {
    question: "Which mobile generation supports ultra-fast data, low latency, and IoT applications?",
    options: ["3G", "4G", "5G", "2G"],
    answer: "5G"
  },
  {
    question: "Which generation focused mainly on digital voice and SMS?",
    options: ["2G", "3G", "4G", "5G"],
    answer: "2G"
  },
  {
    question: "Which generation is commonly used today for mobile broadband and HD video streaming?",
    options: ["3G", "4G", "2G", "5G"],
    answer: "4G"
  }
];

let currentQuestion = 0;
let score = 0;

const quizContainer = document.getElementById("quiz-container");
const nextBtn = document.getElementById("next-btn");
const result = document.getElementById("result");
const progressBar = document.getElementById("progress-bar");

function loadQuestion() {
  quizContainer.innerHTML = "";
  const q = quizData[currentQuestion];

  // Update progress bar
  progressBar.style.width = `${((currentQuestion) / quizData.length) * 100}%`;

  // Question counter
  const counterEl = document.createElement("p");
  counterEl.textContent = `Question ${currentQuestion + 1} of ${quizData.length}`;
  counterEl.style.fontWeight = "bold";
  counterEl.style.marginBottom = "10px";
  quizContainer.appendChild(counterEl);

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
    li.classList.add("correct");
    score++;
  } else {
    li.classList.add("incorrect");
    Array.from(quizContainer.children).forEach(child => {
      if (child.tagName === "LI" && child.textContent === correctAnswer) {
        child.classList.add("correct");
      }
    });
  }

  setTimeout(() => {
    currentQuestion++;
    if (currentQuestion < quizData.length) {
      loadQuestion();
    } else {
      showResult();
    }
  }, 1000);
}

function showResult() {
  quizContainer.innerHTML = "";
  progressBar.style.width = `100%`;
  nextBtn.style.display = "none";

  const scoreEl = document.createElement("h3");
  scoreEl.textContent = `Quiz Finished! Your score: ${score}/${quizData.length}`;
  quizContainer.appendChild(scoreEl);

  const restartBtn = document.createElement("button");
  restartBtn.textContent = "Restart Quiz";
  restartBtn.style.marginTop = "20px";
  restartBtn.style.padding = "10px 20px";
  restartBtn.style.cursor = "pointer";
  restartBtn.onclick = restartQuiz;
  quizContainer.appendChild(restartBtn);
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  progressBar.style.width = "0%";
  nextBtn.style.display = "block";
  loadQuestion();
}

nextBtn.onclick = () => {
  loadQuestion();
  nextBtn.style.display = "none";
};

loadQuestion();
