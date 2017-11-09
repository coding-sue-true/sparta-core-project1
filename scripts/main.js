// $('body').css('display', 'none');
  $(function(event) {
    console.log("Let the game beign! DOM is ready");
    //this is the event listener to trigger the 'start game' button on the initial screen
    // $('body').fadeIn();
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
  	var snake_array; //this will be the body of the snake
    var speed;

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
  		$score = 0;
      speed = 180;
    }

    //how often my pain function runs
    function gameInterval() {
      if(typeof game_loop != "undefined") {
        clearInterval(game_loop);
      }
      game_loop = setInterval(paint, speed);
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
      }
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
      checkScore();
      gameInterval();
  		//CANVAS
  		$ctx.fillStyle = 'white'; // inside part of canvas
  		$ctx.fillRect(0, 0, $width, $height);
  		$ctx.strokeStyle = 'black'; // canvas outline
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
      if(horizontalSnakeBody == -1 || horizontalSnakeBody == 25 || verticalSnakeBody == -1 || verticalSnakeBody == 18 || snakeBodyCollision(horizontalSnakeBody, verticalSnakeBody, snake_array)) {
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
  			var tail = snake_array.pop(); //removes the last cell unit
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

      //printing the score
      $('.scoreScreen').find("p").html("<p>" + $score + "</p>");
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
  		  if(array[i].x == x && array[i].y == y){
  			  return true;
        } else {
          return false;
        }
  	  }
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
// setTimeout(function() {
//   $('body').fadeIn();
// }, 3000)
