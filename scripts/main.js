$(function(event) {
  console.log("Let the game beign! DOM is ready");

  //------- Global Variables ----------
  var $canvas = $('#canvas'); // get element by ID
  var $ctx = $("#canvas")[0].getContext('2d'); // this access the drawing content
  var $w = $('#canvas').width();
  var $h = $('#canvas').height();
  var $cw = 10;
  var $d = 'right';
  //------ canvas shape and color
  // $ctx.fillStyle = 'white';
  // $ctx.fillRect(0, 0, $w, $h);
  // $ctx.strokeStyle = "black";
  // $ctx.strokeRect(0, 0, $w, $h);


  //------- snake body ----------
  var snake_array;


  function create_snake() {
    var length = 5;
    snake_array = [];

    for (var i = length; i >= 0; i--) {
      snake_array.push({x: i, y: 0});
    }
  }
  create_snake();

  function paint() {
    $ctx.fillStyle = 'white';
    $ctx.fillRect(0, 0, $w, $h);
    $ctx.strokeStyle = "black";
    $ctx.strokeRect(0, 0, $w, $h);


    //this removes the snake tail and place it in front
    var nx = snake_array[0].x;
    var ny = snake_array[0].y;

    //snake direction
    if ($d === 'right') {
      nx++;
    } else if ($d === 'left') {
      nx--;
    } else if ($d === 'up') {
      ny--;
    } else if ($d === 'down') {
      ny++;
    }

    var tail = snake_array.pop(); // removes the last cell from the snake array
    tail.x = nx; tail.y = ny;
    snake_array.unshift(tail); // add the last cell back to the start of the snake array

    //this is the body of the snake
    for (var i = 0; i < snake_array.length; i++) {
      var c = snake_array[i];
      $ctx.fillStyle = 'blue';
      $ctx.fillRect(c.x*$cw, c.y*$cw, $cw, $cw);
      $ctx.strokeStyle = 'white'
      $ctx.strokeRect(c.x*$cw, c.y*$cw, $cw, $cw);
    }
  }

  //keyboard keys
  $(document).keydown(function(e){
    var key = e.which;
    if (key === '37' && $d != 'right') {
      $d = 'left';
    } else if (key === '38' && $d != 'down') {
      $d = 'up';
    } else if (key === '39' && $d != 'left') {
      $d = 'right';
    } else if (key === '40' && $d != 'up') {
      $d = 'down';
    }
  })

    //snake movement in milliseconds
    game_loop = setInterval(paint, 60);
  // paint();












})
