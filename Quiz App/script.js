let questions = [];
let currentQuestion = 0;
let score = 0;
let timer;
let incorrectAnswers = []; // New array to track incorrect answers

async function fetchQuestions() {
  const response = await fetch('http://localhost:3001/api/questions');
  questions = await response.json();
}

function startQuiz() {
  document.getElementById('start-screen').classList.add('hidden');
  document.getElementById('quiz-screen').classList.remove('hidden');
  showQuestion();
}

function showQuestion() {
  if (currentQuestion >= questions.length) {
    endQuiz();
    return;
  }
  const q = questions[currentQuestion];
  document.getElementById('question').textContent = q.question;
  const optionsDiv = document.getElementById('options');
  optionsDiv.innerHTML = '';
  q.options.forEach(opt => {
    const btn = document.createElement('button');
    btn.classList.add('option-btn');
    btn.textContent = opt;
    btn.onclick = () => checkAnswer(opt, q.answer, btn);
    optionsDiv.appendChild(btn);
  });
  startTimer();
}

function startTimer() {
  const progress = document.getElementById('progress');
  progress.style.width = '100%';
  let timeLeft = 10;
  timer = setInterval(() => {
    timeLeft--;
    progress.style.width = (timeLeft / 10 * 100) + '%';
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function checkAnswer(selected, correct, btn) {
  clearInterval(timer);
  if (selected === correct) {
    score++;
    btn.classList.add('correct');
  } else {
    btn.classList.add('incorrect');
    incorrectAnswers.push({ question: questions[currentQuestion].question, userAnswer: selected, correctAnswer: correct }); // Store incorrect answer
  }
  document.getElementById('score').textContent = score;
  setTimeout(nextQuestion, 1000);
}

function nextQuestion() {
  currentQuestion++;
  showQuestion();
}

function endQuiz() {
  document.getElementById('quiz-screen').classList.add('hidden');
  document.getElementById('end-screen').classList.remove('hidden');
  const finalScore = document.getElementById('final-score');
  finalScore.textContent = `${score} / ${questions.length}`;
  const feedback = document.getElementById('feedback');
  if (score / questions.length >= 0.8) {
    feedback.textContent = 'Quiz Master! 🎉';
    confetti({ particleCount: 100, spread: 70 });
  } else {
    feedback.textContent = 'Good effort! Try again.';
  }
  // Display incorrect answers
  const incorrectList = document.getElementById('incorrect-list');
  if (incorrectAnswers.length > 0) {
    incorrectList.innerHTML = incorrectAnswers.map(item => 
      `<li>${item.question}<br>User: ${item.userAnswer}<br>Correct: ${item.correctAnswer}</li>`
    ).join('');
  } else {
    incorrectList.innerHTML = '<li>No incorrect answers! Great job!</li>';
  }
}

document.getElementById('start-btn').onclick = async () => {
  await fetchQuestions();
  startQuiz();
};

document.getElementById('restart-btn').onclick = () => {
  currentQuestion = 0;
  score = 0;
  timer = null;
  incorrectAnswers = []; // Reset incorrect answers
  document.getElementById('end-screen').classList.add('hidden');
  startQuiz();
};