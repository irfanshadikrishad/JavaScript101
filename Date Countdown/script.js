let interval;
let targetDate;

async function getCurrentTime() {
  const response = await fetch('http://localhost:3000/api/current-time');
  const data = await response.json();
  return data.currentTime;
}

async function startCountdown() {
  const dateInput = document.getElementById('target-date').value;
  if (!dateInput) return alert('Select a date!');
  targetDate = new Date(dateInput).getTime();
  document.getElementById('start-btn').classList.add('hidden');
  document.getElementById('countdown').classList.remove('hidden');
  interval = setInterval(updateCountdown, 1000);
}

async function updateCountdown() {
  const now = await getCurrentTime();
  const distance = targetDate - now;
  if (distance < 0) {
    clearInterval(interval);
    document.getElementById('countdown').classList.add('hidden');
    document.getElementById('message').classList.remove('hidden');
    confetti({ particleCount: 200, spread: 100 });
    return;
  }
  const days = Math.floor(distance / (1000 * 60 * 60 * 24));
  const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((distance % (1000 * 60)) / 1000);
  document.getElementById('days').textContent = days.toString().padStart(2, '0');
  document.getElementById('hours').textContent = hours.toString().padStart(2, '0');
  document.getElementById('minutes').textContent = minutes.toString().padStart(2, '0');
  document.getElementById('seconds').textContent = seconds.toString().padStart(2, '0');
}

document.getElementById('start-btn').onclick = startCountdown;