let countdown = 0;
let seconds = 15000;
let workTime
let isBreak = true;
let isPaused = true;
// Elements
const pomodoroAppElement = document.getElementById("pomodoro-app");
const timerDisplay = document.getElementById("pomodoroCounterDisplay");
const message = document.getElementById("pomodoroDescription");
const workMin = document.getElementById("minutesInputText");
const workSec = document.getElementById("secondsInputText");
//pomodoroErrorList 
const pomodoroListOfErrorsElement =document.getElementById("pomodoroErrorList");
const addBtn = document.getElementById("pomorodoForm-addBtn");
const pomodoroListElement = document.getElementById("PomodoroList");
const startBtn = document.getElementById("pomorodoForm-StartPauseBtn");
const alarm = document.createElement('audio'); // A bell sound will play when the timer reaches 0
alarm.setAttribute("src", "https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3");

// Start
startBtn.addEventListener('click', () => {
    clearInterval(countdown);
    isPaused = !isPaused;
    if (!isPaused) {
      countdown = setInterval(timer, 1000);
    }
  })

  function timer() {
    seconds --;
    if (seconds < 0) {
      clearInterval(countdown);
      alarm.currentTime = 0;
      alarm.play();
      seconds = (isBreak ? breakTime : workTime) * 60;
      isBreak = !isBreak;
      countdown = setInterval(timer, 1000);
    }
  }

  function countdownDisplay() {
    let minutes = Math.floor(seconds / 60);
    let remainderSeconds = seconds % 60;
    timerDisplay.textContent = `${minutes}:${remainderSeconds < 10 ? '0' : ''}${remainderSeconds}`;
  }

  function buttonDisplay() {
    if (isPaused && countdown === 0) {
      startBtn.textContent = "START";
    } else if (isPaused && countdown !== 0) {
      startBtn.textContent = "Continue"; 
    } else {
      startBtn.textContent = "Pause";
    }
  }

  