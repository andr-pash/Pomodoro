var breakTime;
var sessionTime;
var run;
var time;
var counter;
var timeleft;

var audio_finished = new Audio("mp3/finished.m4a");
var audio_new = new Audio("mp3/new_session_1.mp3");


//convert time set to time object
function Hms(mlseconds) {

    var hh = Math.floor(mlseconds / (1000 * 60 * 60));
    var mm = Math.floor((mlseconds - (hh * 1000 * 60 * 60)) / (1000 * 60));
    var ss = Math.floor(((mlseconds - (((mm * 1000 * 60) + (hh * 1000 * 60 * 60)))) / 1000));


    hh = hh.toString();
    mm = mm.toString();
    ss = ss.toString();


    if (hh.length < 2) {
        hh = "0" + hh;
    }

    if (mm.length < 2) {
        mm = "0" + mm;
    }

    if (ss.length < 2) {
        ss = "0" + ss;
    }

    this.hh = hh;
    this.mm = mm;
    this.ss = ss;


}



function sessionCountdown() {
    time = Number($("#sessiontime").text()) * 1000 * 60;
    document.getElementById("overlay-box").style.backgroundColor = "#5c924d";
    $("#msg-text").text("Let's get to work!");
    counter = setInterval(decreaseTime, 1000);
}

function breakCountdown() {
    time = Number($("#breaktime").text()) * 1000 * 60;
    document.getElementById("overlay-box").style.backgroundColor = "#8e3333";
    $("#msg-text").text("You deserve this!");
    counter = setInterval(decreaseTime, 1000);
}

function decreaseTime() {
    
    //don't forget to delete *60 before deployment
    time = time - 1000;
    timeleft = new Hms(time);
    $("#hh").text(timeleft.hh);
    $("#mm").text(timeleft.mm);
    $("#ss").text(timeleft.ss);
    if (time === 0 && run === true) {
        run = false;
        clearInterval(counter);
        audio_finished.play();
        breakCountdown();

    } else if (time === 0 && run === false) {
        run = true;
        clearInterval(counter);
        audio_new.play();
        sessionCountdown();
        
    }
}





// open/close overlay
$("#start").click(function () {
    $("#overlay").addClass("open");
});

$("#close").click(function () {
    $("#overlay").removeClass("open");
    clearInterval(counter);
});


// set times
$("#plus-break").click(function () {
    breakTime = Number($("#breaktime").text()) + 1;
    $("#breaktime").text(breakTime);
});

$("#minus-break").click(function () {
    breakTime = Number($("#breaktime").text()) - 1;
    $("#breaktime").text(breakTime);
});

$("#plus-session").click(function () {
    sessionTime = Number($("#sessiontime").text()) + 1;
    $("#sessiontime").text(sessionTime);
});

$("#minus-session").click(function () {
    sessionTime = Number($("#sessiontime").text()) - 1;
    time = sessionTime * 1000 * 60;
    $("#sessiontime").text(sessionTime);
});

// start timer

$("#start").click(function () {
    sessionCountdown();
    run = true;
});
