//Set a global time capture object.
var gTimer = { startTime: 0, endTime: 0, timeLapsed: 0 };

window.onload = function () {

    var answer = document.getElementById("answer");
    answer.onkeyup = function () {
        //Grab the start time on key up.
        gTimer.startTime = new Date();

        //Unbind onkeyup from triggering anything else after one key.
        answer.onkeyup = null;
    }
    var continueButton = document.getElementById("continueButton");
    continueButton.onclick = function () {
        //Grab the end time on button click.
        gTimer.endTime = new Date();
        gTimer.timeLapsed = calculateLapsedTime();

        //Convert the start time to a string to store as a final value in the gTimer object.
        gTimer.startTime = convertTimeToString(gTimer.startTime, true);

        //Convert the end time to a string to store as a final value in the gTimer object.
        gTimer.endTime = convertTimeToString(gTimer.endTime, true);

        //Unbind onclick from triggering anything else after one click.
        continueButton.onclick = null;
    }
}

function calculateLapsedTime() {
    //Create start time and end time objects that will keep track of the date passed to split hours, minutes, and seconds for the math to follow.
    var startTime = { hours: gTimer.startTime.getHours(), minutes: gTimer.startTime.getMinutes(), seconds: gTimer.startTime.getSeconds() };
    var endTime = { hours: gTimer.endTime.getHours(), minutes: gTimer.endTime.getMinutes(), seconds: gTimer.endTime.getSeconds() };

    if (startTime.seconds > endTime.seconds) {
        endTime.seconds += 60;
        endTime.minutes--;
    }
    var lapsedTimeSeconds = endTime.seconds - startTime.seconds;

    if (startTime.minutes > endTime.minutes) {
        endTime.minutes+= 60;
        endTime.hours--;
    }
    var lapsedTimeMinutes = endTime.minutes - startTime.minutes;

    var lapsedTimeHours = endTime.hours - startTime.hours;

    var result = new Date();
    result.setHours(lapsedTimeHours);
    result.setMinutes(lapsedTimeMinutes);
    result.setSeconds(lapsedTimeSeconds);

    return convertTimeToString(result, false);
}


function convertTimeToString(time, useSuffix) {

    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();

    //Adds a 0 in front of the miutes if minutes are from 0 - 9.
    if (minutes < 10) {
        minutes = "0" + minutes;
    }
    //Adds a 0 in front of the seconds if minutes are from 0 - 9.
    if (seconds < 10) {
        seconds = "0" + seconds;
    }

    //Displaying user's current time.
    var timeString = hours + ":" + minutes + ":" + seconds;

    //Adding a suffix based on if it's morning or afternoon time.
    if(useSuffix){
        var suffix = (hours >= 12) ? "PM" : "AM";
        timeString = timeString +  " " + suffix;
    }
    
    console.log(timeString);

    return timeString;
}

