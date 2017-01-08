var gTimer = {secondsLapsed: 0, timerIntervalID: 0};
window.onload = function () {

	var answer = document.getElementById("answer");
	answer.onkeyup = function () {
	    logTime();
	    timer();
	}
	var continueButton = document.getElementById("continueButton");
	continueButton.onclick = function () {
	    logTime();
	    clearInterval(gTimer.timerIntervalID);
	    console.log(gTimer.secondsLapsed);
	}
}

function logTime() {

    //Getting user's current date and time.
    var currentTime = new Date();
    //console.log(currentTime);

    var hours = currentTime.getHours();
    var minutes = currentTime.getMinutes();
    var seconds = currentTime.getSeconds();

    //Adds a 0 in front of the miutes if minutes are from 0 - 9.
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    //Adds a 0 in front of the seconds if minutes are from 0 - 9.
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    //Adding a suffix based on if it's morning or afternoon time.
    var suffix = (hours >= 12) ? "PM" : "AM";

    //Displaying user's current time.
    var startTime = hours + ":" + minutes + ":" + seconds + " " + suffix;
    console.log(startTime);

    answer.onkeyup = null;
}


function addTime() {
    gTimer.secondsLapsed++;
    console.log(gTimer.secondsLapsed);
}

function timer() {
    gTimer.timerIntervalID = setInterval(addTime, 1000);
    
}
