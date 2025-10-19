const questions = [
  {
    question: "What is the capital of France?",
    options: ["Berlin", "Madrid", "Paris", "Rome"],
    answer: "Paris",
  },
  {
    question: "Who wrote 'Romeo and Juliet'?",
    options: ["Shakespeare", "Dickens", "Tolkien", "Austen"],
    answer: "Shakespeare",
  },
  {
    question: "Which planet is known as the Red Planet?",
    options: ["Venus", "Mars", "Jupiter", "Saturn"],
    answer: "Mars",
  },
  {
    question: "What is the capital city of Brazil?",
    options: ["Rio de Janeiro", "São Paulo", "Brasília", "Salvador"],
    answer: "Brasília",
  },
  {
    question: "Which element has the chemical symbol 'O'?",
    options: ["Gold", "Oxygen", "Osmium", "Oganesson"],
    answer: "Oxygen",
  },
  {
    question: "Who painted the Mona Lisa?",
    options: [
      "Vincent van Gogh",
      "Leonardo da Vinci",
      "Pablo Picasso",
      "Michelangelo",
    ],
    answer: "Leonardo da Vinci",
  },
  {
    question: "What is the largest ocean on Earth?",
    options: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    answer: "Pacific Ocean",
  },
  {
    question: "Which country hosted the 2016 Summer Olympics?",
    options: ["China", "Brazil", "Russia", "United States"],
    answer: "Brazil",
  },
  {
    question: "What is the main ingredient in guacamole?",
    options: ["Tomato", "Avocado", "Onion", "Pepper"],
    answer: "Avocado",
  },
  {
    question: "Which animal is known as the 'King of the Jungle'?",
    options: ["Elephant", "Lion", "Tiger", "Bear"],
    answer: "Lion",
  },
  {
    question: "What is the smallest country in the world by land area?",
    options: ["Monaco", "Nauru", "Vatican City", "San Marino"],
    answer: "Vatican City",
  },
  {
    question: "Which gas makes up the majority of Earth’s atmosphere?",
    options: ["Oxygen", "Carbon Dioxide", "Nitrogen", "Hydrogen"],
    answer: "Nitrogen",
  },
  {
    question: "Who wrote the play 'Hamlet'?",
    options: [
      "William Shakespeare",
      "Jane Austen",
      "Charles Dickens",
      "Mark Twain",
    ],
    answer: "William Shakespeare",
  },
  {
    question:
      "What is the primary source of energy for Earth’s climate system?",
    options: ["Geothermal Heat", "Wind", "The Sun", "Tides"],
    answer: "The Sun",
  },
];

let currentQuestion = 0;
let score = 0;
let incorrect = [];
let timer;

const startScreen = document.getElementById("start-screen");
const quizScreen = document.getElementById("quiz-screen");
const endScreen = document.getElementById("end-screen");
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const progressEl = document.getElementById("progress");
const timerFill = document.getElementById("timer-fill");
const finalScoreEl = document.getElementById("final-score");
const feedbackEl = document.getElementById("feedback");
const incorrectListEl = document.getElementById("incorrect-list");
const confettiCanvas = document.getElementById("confetti-canvas");
const ctx = confettiCanvas.getContext("2d");

confettiCanvas.width = window.innerWidth;
confettiCanvas.height = window.innerHeight;

document.getElementById("start-btn").addEventListener("click", startQuiz);
document.getElementById("restart-btn").addEventListener("click", restartQuiz);

function startQuiz() {
  startScreen.classList.add("hidden");
  quizScreen.classList.remove("hidden");
  loadQuestion();
}

function loadQuestion() {
  if (currentQuestion >= questions.length) {
    endQuiz();
    return;
  }

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach((opt, i) => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.onclick = () => selectOption(i);
    optionsEl.appendChild(btn);
  });

  progressEl.style.width = `${(currentQuestion / questions.length) * 100}%`;
  startTimer();
}

function startTimer() {
  timerFill.style.width = "100%";
  timer = setTimeout(nextQuestion, 10000); // 10 seconds per question
  let timeLeft = 10000;
  const interval = setInterval(() => {
    timeLeft -= 100;
    timerFill.style.width = `${(timeLeft / 10000) * 100}%`;
    if (timeLeft <= 0) clearInterval(interval);
  }, 100);
}

function selectOption(selected) {
  clearTimeout(timer);
  const q = questions[currentQuestion]; // Fixed: Define q here
  const correct = q.options.findIndex((opt) => opt === q.answer);
  const buttons = optionsEl.querySelectorAll("button");
  buttons.forEach((btn, i) => {
    if (i === correct) btn.classList.add("correct");
    if (i === selected && i !== correct) {
      btn.classList.add("incorrect");
      incorrect.push({ question: q.question, correct: q.answer });
    }
  });

  if (selected === correct) score++;
  document.getElementById("score").textContent = `Score: ${score}`;

  setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
  currentQuestion++;
  loadQuestion();
}

function endQuiz() {
  quizScreen.classList.add("hidden");
  endScreen.classList.remove("hidden");

  finalScoreEl.textContent = `${score}/${questions.length}`;
  const percentage = (score / questions.length) * 100;
  if (percentage >= 90) {
    feedbackEl.textContent = "Quiz Master!";
    startConfetti();
  } else if (percentage >= 70) {
    feedbackEl.textContent = "Good effort! Try again.";
  } else {
    feedbackEl.textContent = "Keep practicing!";
  }

  if (incorrect.length > 0) {
    incorrectListEl.innerHTML =
      "<h3>Incorrect Answers:</h3>" +
      incorrect
        .map((i) => `<p>${i.question} - Correct: ${i.correct}</p>`)
        .join("");
  }
}

function startConfetti() {
  const confetti = [];
  for (let i = 0; i < 100; i++) {
    confetti.push({
      x: Math.random() * confettiCanvas.width,
      y: Math.random() * confettiCanvas.height - confettiCanvas.height,
      color: `hsl(${Math.random() * 360}, 100%, 50%)`,
      speed: Math.random() * 5 + 2,
    });
  }

  function animate() {
    ctx.clearRect(0, 0, confettiCanvas.width, confettiCanvas.height);
    confetti.forEach((c) => {
      c.y += c.speed;
      if (c.y > confettiCanvas.height) c.y = -10;
      ctx.fillStyle = c.color;
      ctx.fillRect(c.x, c.y, 10, 10);
    });
    requestAnimationFrame(animate);
  }
  animate();
}

function restartQuiz() {
  currentQuestion = 0;
  score = 0;
  incorrect = [];
  endScreen.classList.add("hidden");
  startScreen.classList.remove("hidden");
}
