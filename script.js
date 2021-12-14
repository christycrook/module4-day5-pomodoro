// Elements
const pomodoroCounterDisplayElement = document.getElementById("pomodoroCounterDisplay");
const minuteInputElement = document.getElementById("minutesInputText");
const secondInputElement = document.getElementById("secondsInputText");
const addPomodoroToListButton = document.getElementById("pomorodoForm-addBtn");
const startOrPauseAPomodoroFromListButton = document.getElementById("pomorodoForm-StartPauseBtn");
let timer;
let totalMilliseconds;

minuteInputElement.addEventListener("keyup", inputFields);
secondInputElement.addEventListener("keyup", inputFields);
addPomodoroToListButton.addEventListener("click", addClick);
startOrPauseAPomodoroFromListButton.addEventListener("click", addClick);


function inputFields() {
  let minute = Number(minuteInputElement.value);
  let second = Number(secondInputElement.value);

  if (minute < 60 && minute >= 0 && second < 60 && second >= 0) {
    addPomodoroToListButton.disabled = false
  } else {
    addPomodoroToListButton.disabled = true
  };
};

function addClick() {
  let minute = Number(minuteInputElement.value);
  let second = Number(secondInputElement.value);

  const formatInput = populateFormatPomodoro(minute, second);
  minuteInputElement.value = formatInput[0];
  secondInputElement.value = formatInput[1];

  startOrPauseAPomodoroFromListButton.disabled = false;
};

function startOrPauseClick() {
  const btnState = startOrPauseAPomodoroFromListButton.getAttribute("start-pause-state");

  if (btnState == "start") startPomodoro();
  if (btnState == "pause") pausePomodoro();
};

function startPomodoro() {
  addPomodoroToListButton.disabled = true;
  startOrPauseAPomodoroFromListButton.setAttribute("start-pause-state", "pause");
  startOrPauseAPomodoroFromListButton.innerText = "pause";

  let timeArray = pomodoroCounterDisplayElement.innerText.split(":");
  let minute = Number(timeArray[0]);
  let second = Number(timeArray[1]);

  totalMilliseconds = minute * 60000 + second * 1000;

  timer = setInterval(pomodoroCountdown, 1000);
};

function pausePomodoro() {
  addPomodoroToListButton.disabled = false;
  startOrPauseAPomodoroFromListButton.setAttribute("start-pause-state", "start");
  startOrPauseAPomodoroFromListButton.innerText = "start";
  
  clearInterval(timer);
};

function pomodoroCountdown() {
  totalMilliseconds -= 1000;

  let minute = 0;
  let second = 0;

  if (totalMilliseconds >= 60000) {
    minute = parseInt(totalMilliseconds / 60000)
  };

  if (totalMilliseconds >= 1000) {
    second = (totalMilliseconds - minute * 60000) / 1000
  };

  populateFormatPomodoro(minute, second);

  if (totalMilliseconds == 0) pomodoroComplete();
 };

 function pomodoroComplete() {
  pausePomodoro();
  startOrPauseAPomodoroFromListButton.disabled = true;

  setTimeout(`alert("Time is up")`, 100);
 };

 function populateFormatPomodoro(minute, second) {
   let formatMinute = minute;
   let formatSecond = second;

   if (minute == 0) {
     formatMinute = "00"
   };

   if (minute < 10 && minute > 0) {
     formatMinute = "0" + minute
   };

   if (second < 10) {
     formatSecond = "0" + second
   };

   pomodoroCounterDisplayElement.innerText = `${formatMinute}:${formatSecond}`;
   return [formatMinute, formatSecond];
};
  