let buttonColours = ["green","red","yellow","blue"];
let gamePattern = [];
let userClickedPattern = [];
let level = 0;
let started = false;

$(".btn").click(function(){
  let userChoseColour = this.id;
  userClickedPattern.push(userChoseColour);
  playSound(userChoseColour);
  animatePress(userChoseColour);
  checkAnswer(userClickedPattern.length-1);
})


$(document).keypress(function() {
  if (!started) {
    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;
  }
});

function nextSequence () {
  userClickedPattern = [];

  level++;
  $("h1").text("Level "+level);

  let randomNumber = Math.floor(Math.random()*4);
  let randomChoseColour = buttonColours[randomNumber];
  gamePattern.push(randomChoseColour);
  $("#"+randomChoseColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChoseColour);

}

function playSound (name) {
  audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) {
  $("."+currentColour).addClass("pressed");
  setTimeout(function(){
    $(".btn").removeClass("pressed");
  },100);

}

function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

      //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
      if (userClickedPattern.length === gamePattern.length){

        //5. Call nextSequence() after a 1000 millisecond delay.
        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      let wrongSOund = "wrong";
      playSound(wrongSOund);
      $("body").addClass("game-over");
      setTimeout(function(){
        $("body").removeClass("game-over");
        $("h1").text("Game Over, Press Any Key to Restart");
      }, 200);
      startOver();
    }
}

function startOver () {
  level = 0;
  gamePattern = [];
  started = false;
}
