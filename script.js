// Elements
const pomodoroCounterDisplayElement = document.getElementById("pomodoroCounterDisplay");
const minuteInputElement = document.getElementById("minutesInputText");
const secondInputElement = document.getElementById("secondsInputText");
const addPomodoroToListButton = document.getElementById("pomorodoForm-addBtn");
const startOrPauseAPomodoroFromListButton = document.getElementById("pomorodoForm-StartPauseBtn");


minuteInputElement.addEventListener("keydown", inputFields);
secondInputElement.addEventListener("keydown", inputFields);
addPomodoroToListButton.addEventListener("click", addClick);
startOrPauseAPomodoroFromListButton.addEventListener("click", startPomodoro);

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

let timer = null;

 function startPomodoro() {
  addPomodoroToListButton.disabled = true;

  let minute = Number(minuteInputElement.value);
  let second = Number(secondInputElement.value);

  const formatInput = populateFormatPomodoro(minute, second);
  minuteInputElement.value = formatInput[0];
  secondInputElement.value = formatInput[1];

  if(minuteInputElement.value == 0 && secondInputElement.value == 0){
    minuteInputElement.value = 0;
    secondInputElement.value = 0;
  }else if (secondInputElement.value != 0){
    secondInputElement.value--;
  }else if (minuteInputElement.value != 0){
    secondInputElement.value = 59;
    minuteInputElement.value--;
  }
  return;
};

function startInterval(){
    timer = setInterval(function(){
      startPomodoro();
    },1000);
  }
  startInterval();

function stopTimer() {
  clearInterval(timer);
}
/*function pausePomodoro() {
  addPomodoroToListButton.disabled = false;
  startOrPauseAPomodoroFromListButton.setAttribute("start-pause-state", "start");
  startOrPauseAPomodoroFromListButton.innerText = "start";
  
};*/

/*function pomodoroCountdown() {
  milliseconds -= 1000;

  let minute = 0;
  let second = 0;

  if (milliseconds >= 60000) {
    minute = parseInt(milliseconds / 60000)
  };

  if (milliseconds >= 1000) {
    second = (milliseconds - minute * 60000) / 1000
  };

  populateFormatPomodoro(minute, second);

  if (milliseconds == 0) pomodoroComplete();
 };*/

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
  