let timerInterval;
let totalTime = 25 * 60; // 25 minutes in seconds
let timeLeft = totalTime;
let isPaused = true;

function updateTimerDisplay() {
  let timerDisplay = document.getElementById('timeDisplay');
  let minutes = Math.floor(timeLeft / 60);
  let seconds = timeLeft % 60;
  timerDisplay.textContent = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  
  let circle = document.querySelector('.progress-ring__circle');
  let radius = circle.r.baseVal.value;
  let circumference = radius * 2 * Math.PI;
  let offset = circumference * (1 - timeLeft / totalTime);
  circle.style.strokeDasharray = `${circumference} ${circumference}`;
  circle.style.strokeDashoffset = offset;
}

function startTimer() {
  if (isPaused) {
    timerInterval = setInterval(() => {
      if (!isPaused) {
        if (timeLeft === 0) {
          clearInterval(timerInterval);
          alert('Pomodoro session complete!');
          isPaused = true;
          timerInterval = null;
          timeLeft = totalTime;
          updateTimerDisplay();
        } else {
          timeLeft--;
          updateTimerDisplay();
        }
      }
    }, 1000);
    isPaused = false;
  }
}

function resetTimer() {
  clearInterval(timerInterval);
  totalTime = parseInt(document.getElementById('sessionLength').value, 10) * 60;
  timeLeft = totalTime;
  isPaused = true;
  timerInterval = null;
  updateTimerDisplay();
}

document.getElementById('startBtn').addEventListener('click', startTimer);
document.getElementById('resetBtn').addEventListener('click', resetTimer);

window.onload = updateTimerDisplay;
