$(function(event) {
  console.log("Let the game beign! DOM is ready");

	$('.btn').on("click", init);
	//------ Global Variables -------------------
	var $canvas = $("#canvas")[0];
	var $ctx = canvas.getContext("2d"); //this is how we acces the drawing content
	var $width = $("#canvas").width();
	var $height = $("#canvas").height();
	var $cellWidth = 20;
	var $direction;
	var $food;
	var $score;
	// var $speed;
	var snake_array; //this will be the body of the snake


	//-----------------this is the main function that makes the game run
	function init() {
		$('#canvas').css('visibility', 'visible');
		$direction = "right";
		create_snake();
		create_food();
		$score = 0;

		//Lets move the snake now using a timer which will trigger the paint function
		if(typeof game_loop != "undefined") {
			clearInterval(game_loop);
		}
		game_loop = setInterval(paint, 180);
	}



	function create_snake() {
		// var length = 5;
		snake_array = [];
		// for(var i = length; i>=0; i--) {
			snake_array.push({x: Math.round(Math.random()*($width-$cellWidth)/$cellWidth), y: Math.round(Math.random()*($height-$cellWidth)/$cellWidth)});
			//This will create a horizontal snake starting from the top left
			// snake_array.push({x: i, y:0});
		// }
	}

	function create_food() {
		$food = {
			x: Math.round(Math.random()*($width-$cellWidth)/$cellWidth), //This will create a cell with x/y between 0-44
			y: Math.round(Math.random()*($height-$cellWidth)/$cellWidth), //Because there are 45(450/10) positions accross the rows and columns
		};
	}

	//------------------------Canvas and Snake Colors ----------------------
	function paint() {
		//CANVAS
		$ctx.fillStyle = "white";
		$ctx.fillRect(0, 0, $width, $height);
		$ctx.strokeStyle = "black";
		$ctx.strokeRect(0, 0, $width, $height);

		//This adds a cell to the snake_array
		var horizontalSnakeBody = snake_array[0].x;
		var verticalSnakeBody = snake_array[0].y;

		//Lets add proper direction based movement now
		if($direction == "right") {
			horizontalSnakeBody++;
		}	else if($direction == "left") {
			horizontalSnakeBody--;
		} else if($direction == "up") {
			verticalSnakeBody--;
		} else if($direction == "down") {
			verticalSnakeBody++;
		}
		//Lets add the game over clauses now
		//This will restart the game if the snake hits the wall
		//Lets add the code for body collision
		//Now if the head of the snake bumps into its body, the game will restart
		// debugger

		if(horizontalSnakeBody == -1 || horizontalSnakeBody == $width/$cellWidth || verticalSnakeBody == -1 || verticalSnakeBody == $height/$cellWidth || check_collision(horizontalSnakeBody, verticalSnakeBody, snake_array)) {
		// if(horizontalSnakeBody == 0 || horizontalSnakeBody == $height || verticalSnakeBody == 0 || verticalSnakeBody == $width || check_collision(horizontalSnakeBody, verticalSnakeBody, snake_array)) {
			init();
			return;
		}
		// 	var newGame = prompt ("Game Over! You scored " + $score + "\n Do you want to play again?")
		//     if (newGame === 'yes') {
		//       init();
		//       return;
		//     } else {
		//       alert ('Thank you for playing!')
		// 			// break;
		//     }
		// 	return;
		// }
		//Lets write the code to make the snake eat the food
		//The logic is simple
		//If the new head position matches with that of the food,
		//Create a new head instead of moving the tail
		if(horizontalSnakeBody == $food.x && verticalSnakeBody == $food.y) {
			var tail = {x: horizontalSnakeBody, y: verticalSnakeBody};
			$score++;
			//Create new food
			create_food();
		} else {
			var tail = snake_array.pop(); //pops out the last cell
			tail.x = horizontalSnakeBody; tail.y = verticalSnakeBody;
		}
		snake_array.unshift(tail); //puts back the tail as the first cell

		for(var i = 0; i < snake_array.length; i++) {
			var cellUnit = snake_array[i];
			//Lets paint 10px wide cells
			paint_cell(cellUnit.x, cellUnit.y);
		}

		//Lets paint the food
		paint_cell($food.x, $food.y);
		//Lets paint the score
		var score_text = "Score: " + $score;
		$ctx.fillText(score_text, 5, $height-5);
	}

	//Lets first create a generic function to paint cells
	function paint_cell(x, y) {
		$ctx.fillStyle = "#8BB174";
		$ctx.fillRect(x*$cellWidth, y*$cellWidth, $cellWidth, $cellWidth);
		// $ctx.strokeStyle = "white";
		// $ctx.strokeRect(x*$cellWidth, y*$cellWidth, $cellWidth, $cellWidth);
	}

	function check_collision(x, y, array) {
		//This function will check if the provided x/y coordinates exist
		//in an array of cells or not
		for(var i = 0; i < array.length; i++) {
			if(array[i].x == x && array[i].y == y)
			 return true;
		}
		return false;
	}

	//---------------Keyboard controls now
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
		e.preventDefault();
	})







})
