$(function(event) {
  console.log("Let the game beign! DOM is ready");

  //---------------------- GLOBAL VARIABLES ---------------------------//
  canvas.width = window.screen.width;
  canvas.height = window.screen.height;
  var $canvas = $('#canvas'); // get element by ID
  var $ctx = $("#canvas")[0].getContext('2d'); // this access the drawing content
  // var $direction = 0;
  // var $speed = 10;
//   var s;
//   s = new snake();
//   //-----------Set Up Function ----------------
//   // function setup(){
//   //   createCanvas(600, 600);
//   //   s = new snake();
//   //
//   // }
//
//
//   //------------Draw Function
// function draw() {
//   background(51);
//   s.update();
//   s.show();
// }


  //------- SNAKE GRADIENT COLOR-----
  // var grd = $ctx.createLinearGradient(50, 50, 100, 50);
  // grd.addColorStop("0.25", "#094D92");
  // grd.addColorStop("0.5", "#95E06C");
  // grd.addColorStop("0.75", "#8AE9C1");
  // grd.addColorStop("1", "#C3F73A");

  //-------- SNAKE BODY -------------
  // function snake(){
  //   this.x = 0;
  //   this.y = 0;
  //   this.xspeed = 1;
  //   this.yspeed = 0;
  //
  //   this.update = function(){
  //     this.x = this.x + this.xspeed;
  //     this.y = this.y + this.yspeed;
  //   }
  //
  //   this.show = function() {
  //     fill(255);
  //     rect(this.x, this.y, 10, 10);
  //   }
  // }


  // ------------ X movement - right ---------

  var x = 0;
  var y = 0;
  var snakeLength = 300;
  var snakeWidth = 30;

  function movementXRight() {
    window.requestAnimationFrame(function loop(){
      x += 1;
      $ctx.clearRect(0,0,canvas.width, canvas.height)
      $ctx.fillStyle = 'white';
      $ctx.fillRect(x - snakeLength, -y, snakeLength, snakeWidth)
      window.requestAnimationFrame(loop) // search how to stop this
    })
  }
  movementXRight();
  //------------------- Y movement - down --------------
  function movementYDown() {
    // var y = 0;
    window.requestAnimationFrame(function loop(){
      y += 1;
      $ctx.clearRect(0,0,canvas.width, canvas.height)
      $ctx.fillStyle = 'white';
      $ctx.fillRect(x, y, snakeWidth, snakeLength)
      window.requestAnimationFrame(loop)
    })
  }
  // movementYDown();
  //------------------- X movement - left --------------
  function movementXLeft() {
    // var x = 0;
    window.requestAnimationFrame(function loop(){
      x += 1;
      $ctx.clearRect(0,0,canvas.width, canvas.height)
      $ctx.fillStyle = 'white';
      $ctx.fillRect(x, -y, snakeLength, snakeWidth)
      window.requestAnimationFrame(loop)
    })
  }
  // // movementXLeft();
  // //------------------- Y movement - up --------------
  function movementYUp() {
    // var y = 0;
    window.requestAnimationFrame(function loop(){
      y += 1;
      $ctx.clearRect(0,0,canvas.width, canvas.height)
      $ctx.fillStyle = 'white';
      $ctx.fillRect(-x, y, snakeWidth, snakeLength)
      window.requestAnimationFrame(loop)
    })
  }
  //movementYUp();
  //----------- CHANGING DIRECTIONS ---------------
  $(document).keydown(function(e) {
    switch(e.which) {
      case 37: // left
      console.log('37 key');
      movementXLeft();
      break;

      case 38: // up
      console.log('38 key');
      movementYUp();
      break;

      case 39: // right
      console.log('39 key');
      movementXRight();
      break;

      case 40: // down
      console.log('40 key');
      movementYDown();
      break;

      default: return; // exit this handler for other keys
    }
    e.preventDefault(); // prevent the default action (scroll / move caret)
  })















})
