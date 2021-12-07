let countdown = 0;
let seconds = 0;
let remaining =0;
let isBreak = true;
let isPaused = true;
// Elements
const pomodoroAppElement = document.getElementById("pomodoro-app");
const pomodoroCounterDisplayElement = document.getElementById("pomodoroCounterDisplay");
const pomodoroFormElement = document.getElementsByClassName("pomorodoForm")[0];
const minuteInputElement = document.getElementById("minutesInputText");
const secondInputElement = document.getElementById("secondsInputText");
//pomodoroErrorList 
const pomodoroListOfErrorsElement =document.getElementById("pomodoroErrorList");
const addPomodoroToListButton = document.getElementById("pomorodoForm-addBtn");
const pomodoroListElement = document.getElementById("PomodoroList");
const startOrPauseAPomodoroFromListButton = document.getElementById("pomorodoForm-StartPauseBtn");

// Start
startOrPauseAPomodoroFromListButton.addEventListener('click', () => {
    clearInterval(countdown);
    if (isPaused) {
        startCountdown();
        startOrPauseAPomodoroFromListButton.textContent = "Pause";
        isPaused = false;
    } else {
        remaining = seconds;
        startOrPauseAPomodoroFromListButton.textContent = "Continue";
        isPaused = true;
    }
})

function timer() {  
    seconds --;  if (seconds < 0) {    
        clearInterval(countdown);    
        alarm.currentTime = 0;    
        alarm.play();    
        seconds = (isBreak ? breakTime : workTime) * 60;    
        isBreak = !isBreak;  
    }
}

function startCountdown() {
    if (remaining != 0) {
      seconds = remaining;
    } else {
      seconds = minuteInputElement.textContent * 60;
      pomodoroCounterDisplayElement.textContent = "Keep Working";
    }
    countdown = setInterval(timer, 1000);
  }