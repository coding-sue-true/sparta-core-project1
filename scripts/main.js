$(function(event) {
  //this is the event listener to trigger the 'start game' button on the initial screen
  $('.btn').on("click", startGame);

	//------ Global Variables
	var $canvas = $("#canvas")[0];
	var $ctx = canvas.getContext("2d"); //this is how we acces the drawing content
	var $width = $("#canvas").width();
	var $height = $("#canvas").height();
	var $cellSize = 20;
	var $direction;
	var $foodElement;
	var $score = 0;
	var snakeBody; //this will be the body of the snake
  var speed;
  var backgroundMusic = new Audio('audio/backgroundsound.mp3');

  backgroundMusic.play();
  backgroundMusic.loop = true;

  //music player on and off
  $('#musicPlayer').on('click', function() {
    if (backgroundMusic.paused === false) {
      backgroundMusic.pause();
    } else {
      backgroundMusic.play();
    }
  });

	//this is the main function that makes the game run
	function startGame() {
		$('.firstScreen').css('visibility', 'hidden');
    $('.gameOverScreen').css('visibility', 'hidden');
    $('.gamePageScreen').show();
    $('.scoreScreen').css('visibility', 'visible');
		$direction = "right";
		snake();
		element();
    gameInterval();
    $cellSize = 20;
		$score = 0;
    speed = 180;
  }

  //how often my play function runs
  function gameInterval() {
    if(typeof game_loop != "undefined") {
      clearInterval(game_loop);
    }
    game_loop = setInterval(game, speed);
  }

  // increase of speed
  function checkScore() {
    if ($score === 3) {
      speed = 150;
    } else if ($score === 5) {
      speed = 120;
    } else if ($score === 7) {
      speed = 90;
    } else if ($score === 11) {
      speed = 75;
    } else if ($score === 16) {
      speed = 65;
    } else if ($score === 20) {
      speed = 50;
    } else if ($score === 23) {
      speed = 40;
    } else if ($score === 28) {
      speed = 20;
    } else if ($score === 35) {
      speed = 10;
    } else if ($score === 40) {
      speed = 5;
    }
  }

  //------- Snake x&y position randomly created
	function snake() {
		snakeBody = [];
		snakeBody.push({x: Math.round(Math.random()*($width-$cellSize)/$cellSize),
      y: Math.round(Math.random()*($height-$cellSize)/$cellSize)});
	}

  //------- Food x&y position randomly created
	function element() {
		$foodElement = {
			x: Math.round(Math.random()*($width-$cellSize)/$cellSize),
      y: Math.round(Math.random()*($height-$cellSize)/$cellSize)
    }
	}

	//-------Main game function -----
	function game() {
    checkScore();
    gameInterval();
		//CANVAS
		$ctx.fillStyle = 'white'; // inside part of canvas
		$ctx.fillRect(0, 0, $width, $height);
		$ctx.strokeStyle = 'black'; // canvas outline
		$ctx.strokeRect(0, 0, $width, $height);

		//This adds a cell to the snakeBody
		var horizontalSnakeBody = snakeBody[0].x;
		var verticalSnakeBody = snakeBody[0].y;

		//this establishes the direction of the snake and adds that information to the array, which is the increasing snake body
		if($direction == "right") {
			horizontalSnakeBody++;
		}	else if($direction == "left") {
			horizontalSnakeBody--;
		} else if($direction == "up") {
			verticalSnakeBody--;
		} else if($direction == "down") {
			verticalSnakeBody++;
		}

    //this checks all the borders of the canvas, if the snake touches any of these values, it dies
    if(horizontalSnakeBody == -1 || horizontalSnakeBody == $width/$cellSize || verticalSnakeBody == -1 || verticalSnakeBody == $height/$cellSize) {
			gameOver();
			return;
    }

		//this is how the snake eats the element, if snakes position matches with the element position, it will be added to snakes body and a new element will be created randomly by calling the food function
		if(horizontalSnakeBody == $foodElement.x && verticalSnakeBody == $foodElement.y) {
			var tail = {x: horizontalSnakeBody, y: verticalSnakeBody};
			$score++;
			//Creates new element
			element();
		} else {
			var tail = snakeBody.pop(); //removes the last cell unit
			tail.x = horizontalSnakeBody; tail.y = verticalSnakeBody;
		}
		snakeBody.unshift(tail); //puts back the tail as the first cell

    //this is how the body is increased everytime it eats an element
		for(var i = 0; i < snakeBody.length; i++) {
			var cellUnit = snakeBody[i];
			paint_cell(cellUnit.x, cellUnit.y);
		}
		//paint the food element
		paint_cell($foodElement.x, $foodElement.y);

    //printing the score
    $('.scoreScreen').find("p").html("<p>" + $score + "</p>");
	}

	//color for each cell
	function paint_cell(x, y) {
		$ctx.fillStyle = "#8BB174";
		$ctx.fillRect(x*$cellSize, y*$cellSize, $cellSize, $cellSize);
	}

  //------ Game Over -------------
  function gameOver(){
    $(".gameOverScreen").css("visibility", "visible");
    $(".gamePageScreen").hide();
    $(".gameOverScreen").find( "h3" ).html("<h3> You scored " + $score + " points! </h3>");
    $('.scoreScreen').css('visibility', 'hidden');
	  $('.btn').on("click", startGame);
  }

	//---------------Keyboard controls
	$(document).keydown(function(e){
		var key = e.which;
		if(key == "37") {
			$direction = "left";
		} else if(key == "38") {
			$direction = "up";
		} else if(key == "39") {
			$direction = "right";
		} else if(key == "40") {
			$direction = "down";
		}
    //this prevents the screen to scroll up or down while playing
		e.preventDefault();
	})
})
