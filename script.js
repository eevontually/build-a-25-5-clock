const TWENTYFIVE_MINUTES = 25 * 60;
const FIVE_MINUTES = 5 * 60;
let breakLength = 5 * 60;
let sessionLength = 25 * 60;
let isSessionMode = true;
let sessionTimer;
let breakTimer;

const breakDecrementEle = document.getElementById("break-decrement");
const breakLengthEle = document.getElementById("break-length");
const breakIncrementEle = document.getElementById("break-increment");
const sessionDecrementEle = document.getElementById("session-decrement");
const sessionLengthEle = document.getElementById("session-length");
const sessionIncrementEle = document.getElementById("session-increment");
const timerMinutes = document.getElementById("timer-minutes");
const timerSeconds = document.getElementById("timer-seconds");
const startButton = document.getElementById("start_stop");
const pauseButton = document.getElementById("start_stop_pause");
const resetButton = document.getElementById("reset");
const sessionTitle = document.getElementById("timer-label");

reset();

function updateUITimer(length) { 
  if(Math.floor(length / 60).toString().length === 1) {
    timerMinutes.textContent = "0" + Math.floor(length / 60);
} else {
    timerMinutes.textContent = Math.floor(length / 60);
} 

  if((length % 60).toString().length === 1){
    timerSeconds.textContent = "0" + (length % 60);
}  else {
    timerSeconds.textContent = length % 60;
  }
}

function reset(){
  isSessionMode = true;
  breakLength = FIVE_MINUTES;
  sessionLength = TWENTYFIVE_MINUTES;
  //breakLength = 3;
  //sessionLength = 3;
  breakLengthEle.textContent = FIVE_MINUTES / 60;
  sessionLengthEle.textContent = TWENTYFIVE_MINUTES / 60;
  //breakLengthEle.textContent = 0;
  //sessionLengthEle.textContent = 0;
  clearInterval(sessionTimer);
  timerMinutes.textContent = "25";
  timerSeconds.textContent = "00";
}

function startBreak() {
     clearInterval(sessionTimer);
     isSessionMode = false;
     sessionTitle.textContent = "Break";
     breakTimer = setInterval(() => {
       breakLength -= 1;
       updateUITimer(breakLength);
       
       if(breakLength === 0){
         sessionLength = parseInt(sessionLengthEle.textContent, 10) * 60;;
         updateUITimer(sessionLength);
         startSession();
      }
     }, 1000);
   }
  
  function startSession(){
     clearInterval(breakTimer);
     isSessionMode = true;
     sessionTitle.textContent = "Session";
     
    sessionTimer = setInterval( () => {
    sessionLength -= 1;
    updateUITimer(sessionLength);
      
      if(sessionLength === 0){
        breakLength = parseInt(breakLengthEle.textContent, 10) * 60;
        updateUITimer(breakLength);
        startBreak();
      }      
    }, 1000);
}

startButton.addEventListener("click", () => {
 if (isSessionMode) {
   startSession();
 } else {
   startBreak();
}                          
});

pauseButton.addEventListener("click", () => {
  if (isSessionMode) {
    clearInterval(sessionTimer);
 }
});

resetButton.addEventListener("click", () => {
  reset();
});

breakDecrementEle.addEventListener("click", () => {
  if (breakLength -60 === 0) {
   return;
  }
  breakLength -= 60;
  breakLengthEle.textContent = breakLength / 60;
});

breakIncrementEle.addEventListener("click", () => {
  breakLength += 60;
  breakLengthEle.textContent = breakLength / 60;
});

sessionDecrementEle.addEventListener("click", () => {
  if (sessionLength -60 === 0) {
  return;
  }
  sessionLength -= 60;
  sessionLengthEle.textContent = sessionLength / 60;
  if (isSessionMode){
    timerMinutes.textContent = sessionLength / 60;
}
});

sessionIncrementEle.addEventListener("click", () => {
  sessionLength += 60;
  sessionLengthEle.textContent = sessionLength / 60;
  if (isSessionMode){
    timerMinutes.textContent = sessionLength / 60;
}
});