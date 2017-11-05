$(function(event) {
  console.log("Let the game beign! DOM is ready");

  //---------------------- GLOBAL VARIABLES ---------------------------//
  var $direction = 0;
  var $speed = 0;
  var $object = 0;
  var $init = 0; // inital size and conditions of the snake
  var $score = 0; // initial score
  var $insert = 0; // insert an item to the queue (to the snake)
  var $canvas = $('#canvas'); // get element by ID
  var $ctx = $("#canvas")[0].getContext('2d'); // this access the drawing content
  // var background = new Image();
  // background.src =

  //------ This gives me the shape and color of the snake
  if (canvas.getContext) {
    $ctx
  } else {
    alert ("Your current browser does not support canvas (the element where we built our game)");
  }

  //------- Initial function: position, color, speed, direction-----
  function init() {
    var grd = $ctx.createLinearGradient(50, 50, 100, 50);
    grd.addColorStop("0.25", "#094D92");
    grd.addColorStop("0.5", "#95E06C");
    grd.addColorStop("0.75", "#8AE9C1");
    grd.addColorStop("1", "#C3F73A");
    //This gives me the snake's initial position and path
    $ctx.beginPath();
    $ctx.lineCap="round";
    $ctx.moveTo(50,50);
    $ctx.lineTo(100, 50);
    $ctx.strokeStyle = grd;
    $ctx.lineWidth = 5;
    $ctx.stroke()
  }
  init();

  //----------------------INITAL FUNCTION --------------------------
//
//   function init() {
//     $speed = 0;
//     $direction = 'right';
//   }
//
//
//
//   //-------------------------- CHANGING DIRECTIONS WITH KEYBOARD ----------//
//
//   function getNewDirection (keyCode) {
//   var codes = {
//     37 : 'left',
//     38 : 'up',
//     39 : 'right',
//     40 : 'down'
//   };
//
//   if( typeof codes[ keyCode ] != 'undefined' ) {
//     var newDirection = codes[ keyCode ], changeDirection = true;
//     switch( direction ) {
//       case 'up' :
//         changeDirection = newDirection != 'down';
//         break;
//       case 'down' :
//         changeDirection = newDirection != 'up';
//         break;
//       case 'right' :
//         changeDirection = newDirection != 'left';
//         break;
//       case 'left' :
//         changeDirection = newDirection != 'right';
//         break;
//     }
//     direction = changeDirection ? newDirection : direction;
//   }
// }

//----------------------------------
























})
