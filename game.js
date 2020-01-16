let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let started = false;

let level = 0;

// start game on key press 
$( document ).keydown(function() {
    if (!started) {
        nextSequence();
        started = true;
        $( "#level-title" ).html("Level " + level);
    };
});

// check which button is clicked
$( ".btn" ).click(function() {
    let userChosenColor = $( this ).attr( "id" );
    userClickedPattern.push(userChosenColor);
    playSound(userChosenColor);
    animatePress(userChosenColor);
    checkAnswer(userClickedPattern.length-1);
});

// check user's answer
function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence(); 
            }, 1000);
        };
    } else {
        $( "body" ).addClass("game-over");
        setTimeout(function() {
            $( "body" ).removeClass("game-over");
        }, 200);
        $( "#level-title" ).html("Game Over, Press Any Key to Restart");
        playSound("wrong");
        startOver();
        };
    };

// generate computer sequence
function nextSequence() {
    userClickedPattern = [];
    level++;
    $( "#level-title" ).html("Level " + level);
    let randomNumber = Math.floor(Math.random() * Math.floor(4));
    randomChosenColor = buttonColors[randomNumber];
    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);
    playSound(randomChosenColor);
    gamePattern.push(randomChosenColor);
};

// play sound for computer sequence and when button is clicked 
function playSound(name) {
    let audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
};

// animate button when pressed
function animatePress(currentColor) {
    $("#" + currentColor).addClass( "pressed" );
    setTimeout(function() {
        $("#" + currentColor).removeClass( "pressed" );
     }, 100 );
};

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}