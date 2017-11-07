//------ This gives me the shape and color of the snake
// if (canvas.getContext) {
//   $ctx
// } else {
//   alert ("Your current browser does not support canvas (the element where we built our game)");
// }

//--------------------Change Direction--------------------
    // function getNewDirection (keyCode) {
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
    //       changeDirection = newDirection != 'down';
    //       break;
    //       case 'down' :
    //       changeDirection = newDirection != 'up';
    //       break;
    //       case 'right' :
    //       changeDirection = newDirection != 'left';
    //       break;
    //       case 'left' :
    //       changeDirection = newDirection != 'right';
    //       break;
    //     }
    //     direction = changeDirection ? newDirection : direction;
    //   }
    // }
  //----------------Horizontal movement -------------------
  // function horizontal() {
  //   var directionX = 0;
  //   window.requestAnimationFrame(function loop() {
  //     //during this loop, the direction of the snake will increase
  //     directionX += 1
  //     //this deletes the previous path as the snake moves
  //     $ctx.clearRect(0, 0, canvas.width, canvas.height)
  //     $ctx.fillStyle = grd
  //     $ctx.fillRect(x,0,150,30);
  //     // $ctx.fillCap="round";
  //     window.requestAnimationFrame(loop)
  //   })
  // }
  // horizontal();

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

//----------------------------------
