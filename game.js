let userClickedPattern = [];
let gamePattern = [];
let buttonColours = ["red", "blue", "green", "yellow"];
let level = 0
let start = false;

function startOver() {
    gamePattern = [];
    level = 0
    start = false;
}



jQuery(document).on("keydown", function() {
    if (!start) {
        nextSequence();
        start = true;
    }
    
})


jQuery(".btn").click(function () {
    let lastElement = userClickedPattern.length - 1;
    let userChosenColour = this.id;
    userClickedPattern.push(userChosenColour);


    animatePress(userChosenColour);
    checkAnswer(lastElement);

    playAudio(userChosenColour);
})


function nextSequence() {
    userClickedPattern = [];
    

    let randomNumber = Math.floor(Math.random() * 4);
    let randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    let idSelect = "#" + randomChosenColour;

    level += 1;
    jQuery("h1").text("Level "+ level)
    

    
    jQuery("#"+randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

    playAudio(randomChosenColour);

}


function playAudio(name) {
    let soundUrl = name + ".mp3";
    let audio = new Audio("./sounds/"+soundUrl);
    audio.play();
}

function animatePress(currentColour) {
    let elementID = "#" + currentColour;
    let self = jQuery(elementID);
    self.addClass("pressed")
    setTimeout(function(){
        self.removeClass("pressed");
    }, 100);
}




function checkAnswer(currentLevel) {
    if (userClickedPattern[currentLevel] === gamePattern[currentLevel]) {

        if (userClickedPattern.length === gamePattern.length) {
            setTimeout(function() {
                nextSequence();
            }, 1000)
        }
    } else {
        console.log("wrong");
        let wrong = new Audio("./sounds/wrong.mp3");
        wrong.play();

        let body = jQuery("body");
        body.addClass("game-over");

        setTimeout(function() {
            body.removeClass("game-over");
        }, 200)

        jQuery("h1").text("Game Over, Press Any Key to Restart");
        startOver();
    }
}


