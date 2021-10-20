var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];
var level = 0;
var numberClicks = 0;
var check = true;

function nextSequence() {
  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern[gamePattern.length] = randomChosenColour;
  animated(randomChosenColour);
  level++;
  $("#level-title").html("Level " + level);
}

// For the start of the game
$(document).keydown(function () {
  // For the fresh key press after the page is loaded or after every mistake
  if (level === 0 || (level !== 0 && check === false)) {
      startOver();
  }
});

// Checking the pattern, and calling nextSequence if it's true
$(".btn").click(function (event) {
  numberClicks++;
  var userChosenColour = event.target.id;
  userClickedPattern[userClickedPattern.length] = userChosenColour;
  animated(userChosenColour); // Animation when the user click the button
  // Loop over the array to check for similarity
  for (var i = 0; i < numberClicks; i++) {
    // If wrong
    if (gamePattern[i] !== userClickedPattern[i]) {
      sounding("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass("game-over");
      }, 200);
      $("#level-title").html("Game Over, Press Any Key to Restart");
      check = false;
    }
    // If successful
    else {
      sounding(userChosenColour); // Call the sound function according to color
    }
  }
  // Apply condition after the whole level ends successfully
  if (numberClicks === gamePattern.length && check === true) {
    // Call the latest color, with added pause
    setTimeout(function() {
      nextSequence();
      numberClicks = 0;
    }, 500);
    // Reset the record of user's click pattern
    userClickedPattern = [];
  }
});

// Animation function
function animated(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}

// Sound function
function sounding(colorClass) {
  var sound = new Audio("sounds/" + colorClass + ".mp3");
  sound.play();
}

function startOver() {
  level = 0;
  gamePattern = [];
  userClickedPattern = [];
  numberClicks = 0;
  check = true;
  nextSequence();
}
