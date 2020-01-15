let buttonColors = ["red", "blue", "green", "yellow"];

let gamePattern = [];

let userClickedPattern = [];

let started = false;

let level = 0;

// generate computer sequence
function nextSequence() {
    level++;

    $( "#level-title" ).html("Level " + level);

    let randomNumber = Math.floor(Math.random() * Math.floor(4));

    randomChosenColor = buttonColors[randomNumber];

    $("#" + randomChosenColor).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColor);

    gamePattern.push(randomChosenColor);

};

// check which button is clicked
$( ".btn" ).click(function() {

    let userChosenColor = $( this ).attr( "id" );

    userClickedPattern.push(userChosenColor);

    playSound(userChosenColor);

    animatePress(userChosenColor);

    checkAnswer(level);

    console.log("Index for check answer is " + level);


});

// play sound for computer sequence and when button is clicked 
function playSound(name) {

    let audio = new Audio("sounds/" + name + ".mp3");

    audio.play();

};

// animate button when pressed
function animatePress(currentColor) {

    $("#" + currentColor).addClass( "pressed" );

    setTimeout(function() {
        $("#" + currentColor).removeClass( "pressed" ), 100 });
};

$( document ).keydown(function() {

    if (!started) {

        nextSequence();

        started = true;

        $( "#level-title" ).html("Level " + level);

    };
});

// check user's answer
function checkAnswer(currentLevel) {

    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {
        console.log(gamePattern);
        console.log(userClickedPattern);

        if (userClickedPattern.length === currentLevel) {

            setTimeout(function() {

                nextSequence(), 1000

            });

            userClickedPattern = [];

        };

    } else {
        console.log("wrong");
    };
};