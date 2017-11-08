$(function(event) {
  console.log("Let the game beign! DOM is ready");
  //this is the event listener to trigger the 'start game' button on the initial screen
	$('.btn').on("click", startGame);

  // function zIndex() {
  //   document.getElementsByClassName("gamePage").style.zIndex = "1";
  // }

	//------ Global Variables
	var $canvas = $("#canvas")[0];
	var $ctx = canvas.getContext("2d"); //this is how we acces the drawing content
	var $width = $("#canvas").width();
	var $height = $("#canvas").height();
	var $cellSize = 20;
	var $direction;
	var $foodElement;
	var $score;
	var snake_array; //this will be the body of the snake

	//this is the main function that makes the game run
	function startGame() {
		// $('#canvas').css('visibility', 'visible');
		$direction = "right";
		snake();
		element();
		$score = 0;

		//game_loop is set so we can restart the game always in the same conditions, with the initial snake speed of 180ms
		if(typeof game_loop != "undefined") {
			clearInterval(game_loop);
		}
    game_loop = setInterval(paint, 180);
	}

  //------- Snake x&y position randomly created
	function snake() {
		snake_array = [];
		snake_array.push({x: Math.round(Math.random()*($width-$cellSize)/$cellSize), y: Math.round(Math.random()*($height-$cellSize)/$cellSize)});
	}

  //------- Food x&y position randomly created
	function element() {
		$foodElement = {
			x: Math.round(Math.random()*($width-$cellSize)/$cellSize), y: Math.round(Math.random()*($height-$cellSize)/$cellSize)
    }
	}

	//------------------------Canvas and Snake Colors ----------------------
	function paint() {
		//CANVAS
		$ctx.fillStyle = "white"; // inside part of canvas
		$ctx.fillRect(0, 0, $width, $height);
		$ctx.strokeStyle = "black"; // canvas outline
		$ctx.strokeRect(0, 0, $width, $height);

		//This adds a cell to the snake_array
		var horizontalSnakeBody = snake_array[0].x;
		var verticalSnakeBody = snake_array[0].y;

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

    //this checks all the borders of the canvas, if the snake touches any of these values, or if it goes against itself, Game over
    //x = 0 & 25 , y = 0 & -18
    //this was calculated based on the total width of canvas divided by cell width, same logic for height values
		if(horizontalSnakeBody == 0 || horizontalSnakeBody == 25 || verticalSnakeBody == 0 || verticalSnakeBody == -18 || snakeBodyCollision(horizontalSnakeBody, verticalSnakeBody, snake_array)) {
      alert ('Game over! You scored ' + $score + ' points! Play again?')
			startGame();
			return;
		}

		//this is how the snake eats the element, if snakes position matches with the element position, it will be added to snakes body and a new element will be created randomly by calling the food function
		if(horizontalSnakeBody == $foodElement.x && verticalSnakeBody == $foodElement.y) {
			var tail = {x: horizontalSnakeBody, y: verticalSnakeBody};
			$score++;
			//Creates new element
			element();
		} else {
			var tail = snake_array.pop(); //pops out the last cell
			tail.x = horizontalSnakeBody; tail.y = verticalSnakeBody;
		}
		snake_array.unshift(tail); //puts back the tail as the first cell

    //this is how the body is increased everytime it eats an element
		for(var i = 0; i < snake_array.length; i++) {
			var cellUnit = snake_array[i];
			paint_cell(cellUnit.x, cellUnit.y);
		}
		//paint the food element
		paint_cell($foodElement.x, $foodElement.y);

		//score box
		var score_text = "Score: " + $score;
		$ctx.fillText(score_text, 5, $height-5);
	}

	//color for each cell
	function paint_cell(x, y) {
		$ctx.fillStyle = "#8BB174";
		$ctx.fillRect(x*$cellSize, y*$cellSize, $cellSize, $cellSize);
	}

  //this is how the snake dies if it goes against itself, it looks for the current x,y values in the snake_array
  //this function will be triggered at the game over if statement
	function snakeBodyCollision(x, y, array) {
		for(var i = 0; i < array.length; i++) {
			if(array[i].x == x && array[i].y == y)
			 return true;
		}
		return false;
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
