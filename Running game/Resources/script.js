let score = 0,
  over = false,
  cross = false,
  paused = false;
let bestScore = localStorage.getItem("bestScore")
  ? parseInt(localStorage.getItem("bestScore"))
  : 0;
let timer = 0,
  timerId = null,
  autoRestartTimeout = null;

const gameov = new Audio("Resources/Audio/gameover.wav");
const jmp = new Audio("Resources/Audio/jump.wav");

const obs = document.getElementById("obs");
const obs_image = [
  "Resources/Obstacles/ob2.jpeg",
  "Resources/Obstacles/meet.png",
  "Resources/Obstacles/psd.png",
];

const score_cont = document.getElementById("score_cont");
const best_score_bar = document.getElementById("best_score_bar");
const best_score_text = document.getElementById("best_score_text");
const final_score = document.getElementById("final_score");
const timer_display = document.getElementById("timer");
const gameOver = document.getElementById("gameOver");
const auto_restart_msg = document.getElementById("auto_restart_msg");
const pauseBtn = document.getElementById("pauseBtn");
const helpBtn = document.getElementById("helpBtn");
const helpOverlay = document.getElementById("helpOverlay");
const finnImg = document.getElementById("fnn");

function updateBestScore(newScore) {
  if (newScore > bestScore) {
    bestScore = newScore;
    localStorage.setItem("bestScore", bestScore);
  }
  best_score_bar.textContent = "Best: " + bestScore;
  if (best_score_text) best_score_text.textContent = "Best Score: " + bestScore;
}

function Updatescore(score) {
  if (!over) score_cont.innerHTML = "Your Score: " + score;
}

function updateTimerDisplay() {
  timer_display.innerHTML = "Time: " + timer + "s";
}

function startTimer() {
  timerId = setInterval(() => {
    if (!paused && !over) {
      timer++;
      updateTimerDisplay();
    }
  }, 1000);
}

function stopTimer() {
  if (timerId) clearInterval(timerId);
}

function reset() {
  score = 0;
  timer = 0;
  cross = false;
  over = false;
  updateBestScore(bestScore);
  Updatescore(score);
  updateTimerDisplay();
  score_cont.style.visibility = "visible";
  gameOver.style.visibility = "hidden";

  // Restart obstacle animation if stopped
  const obstacle = document.querySelector(".obstacles");
  obstacle.classList.remove("obs-stop");
  obstacle.classList.add("animate-obs");

  startTimer();
}

function pauseGame() {
  paused = true;
  pauseBtn.textContent = "Resume";
  pauseBtn.classList.add("paused");
  document.querySelector(".obstacles").style.animationPlayState = "paused";
  document.querySelector(".finn").style.animationPlayState = "paused";
}

function resumeGame() {
  paused = false;
  pauseBtn.textContent = "Pause";
  pauseBtn.classList.remove("paused");
  document.querySelector(".obstacles").style.animationPlayState = "running";
  document.querySelector(".finn").style.animationPlayState = "running";
}

// Keyboard controls
document.onkeydown = function (e) {
  if ((e.keyCode == 38 || e.keyCode == 32) && !over && !paused) {
    const finn = document.querySelector(".finn");
    if (!finn.classList.contains("animateFinn")) {
      finn.classList.add("animateFinn");
      finnImg.src = "Resources/Character/still.png";
      jmp.play();
      setTimeout(() => {
        finn.classList.remove("animateFinn");
        finnImg.src = "Resources/Character/running.gif";
      }, 900);
    }
  } else if (e.key === "p" || e.key === "P") {
    if (paused) resumeGame();
    else pauseGame();
  } else if (e.key === "h" || e.key === "H") {
    toggleHelp();
  }
};

// Pause/Resume Button
pauseBtn.onclick = function () {
  if (paused) resumeGame();
  else pauseGame();
};

// Help Overlay
function toggleHelp() {
  if (helpOverlay.classList.contains("active")) {
    helpOverlay.classList.remove("active");
  } else {
    helpOverlay.classList.add("active");
  }
}
helpBtn.onclick = toggleHelp;

updateBestScore(bestScore);
Updatescore(score);
updateTimerDisplay();

// Obstacle randomizer
let obsRandomizer = setInterval(() => {
  if (over || paused) return;
  let random = Math.floor(Math.random() * 3);
  obs.src = obs_image[random];
}, 5000);

// Collision & Score loop
let mainInterval = setInterval(() => {
  if (over || paused) return;
  const finn = document.querySelector(".finn");
  const obstacle = document.querySelector(".obstacles");
  const fx = parseInt(
    window.getComputedStyle(finn, null).getPropertyValue("left"),
  );
  const fy = parseInt(
    window.getComputedStyle(finn, null).getPropertyValue("top"),
  );
  const ox = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("left"),
  );
  const oy = parseInt(
    window.getComputedStyle(obstacle, null).getPropertyValue("top"),
  );
  const offsetX = Math.abs(fx - ox);
  const offsetY = Math.abs(fy - oy);

  if (offsetX < 70 && offsetY < 130) {
    obstacle.classList.remove("animate-obs");
    obstacle.classList.add("obs-stop");
    finnImg.src = "Resources/Character/still.png";
    gameov.play();
    final_score.innerHTML =
      "Game Over <br><br>Your Score: " + score + "<br><br>";
    updateBestScore(score);
    score_cont.style.visibility = "hidden";
    gameOver.style.visibility = "visible";
    over = true;
    stopTimer();
    auto_restart_msg.textContent = "Restarting automatically in 5 seconds...";
    if (autoRestartTimeout) clearTimeout(autoRestartTimeout);
    autoRestartTimeout = setTimeout(() => {
      window.location.reload();
    }, 5000);
  } else if (!over && !paused) {
    cross = true;
    score += 1;
    Updatescore(score);
  }
}, 100);

startTimer();
