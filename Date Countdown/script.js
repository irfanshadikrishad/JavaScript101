const dateInput = document.getElementById("date-input");
const startBtn = document.getElementById("start-btn");
const daysEl = document.getElementById("days");
const hoursEl = document.getElementById("hours");
const minutesEl = document.getElementById("minutes");
const secondsEl = document.getElementById("seconds");

startBtn.addEventListener("click", startCountdown);

function startCountdown() {
  const targetDateStr = dateInput.value; // YYYY-MM-DD from input
  if (!targetDateStr) return;

  // Parse to dd-mm-yyyy for display, but use Date object
  const [year, month, day] = targetDateStr.split("-");
  const targetDate = new Date(year, month - 1, day);

  if (targetDate < new Date()) {
    alert("Date must be in the future!");
    return;
  }

  updateCountdown(targetDate);
  setInterval(() => updateCountdown(targetDate), 1000);
}

function updateCountdown(target) {
  const now = new Date();
  const diff = target - now;

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / 1000 / 60) % 60);
  const seconds = Math.floor((diff / 1000) % 60);

  daysEl.textContent = String(days).padStart(2, "0");
  hoursEl.textContent = String(hours).padStart(2, "0");
  minutesEl.textContent = String(minutes).padStart(2, "0");
  secondsEl.textContent = String(seconds).padStart(2, "0");
}
