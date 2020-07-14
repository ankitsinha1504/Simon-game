gamePattern = [];
userClickedPattern = [];
buttonColours = ["red","blue","green", "yellow"];

var level = 0;
var start = false;

$(document).on("keydown", function() {
  if(!start){
    start = true;
    nextSequence();

  }
})

function nextSequence() {
  userClickedPattern = [];
  level++;
  $("h1").text("Level " + level);
  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);


  $("#" + randomChosenColour).fadeOut(100).fadeIn(100).fadeOut(100).fadeIn(100);

  playSound(randomChosenColour);
}


$(".btn").on("click", function() {
  var userChosenColour = this.id;
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length - 1);
});

function playSound(colour) {
  var audio = new Audio("sounds/" + colour + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass("pressed");
  }, 100);
}

function checkAnswer(currentClicked) {
  if(userClickedPattern[currentClicked] === gamePattern[currentClicked]){
    if(userClickedPattern.length === gamePattern.length)
    {
      console.log("Success");
      setTimeout(function() {
          nextSequence();
      }, 1000);
    }
  }
  else {
    console.log("Wrong");
    gameOver();
  }
}
 function gameOver() {
   var over = "wrong";
   playSound(over);
   $("body").addClass("game-over");
   setTimeout(function() {
     $("body").removeClass("game-over");
   }, 500);
   level = 0;
   start = false;
   $("h1").text("Game Over ! Press Any Key To Restart !");
   gamePattern = [];
 }
