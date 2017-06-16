
var canvas,
 	c, // c is the canvas' context 2D
	container,
	halfWidth = window.innerWidth /2,
	halfHeight = window.innerHeight /2,
	leftTouchID = -1,
	leftTouchPos = new Vector2(0,0),
	leftTouchStartPos = new Vector2(0,0),
	leftVector = new Vector2(0,0);


// setupCanvas();

var mouseX, mouseY,
	// is this running in a touch capable environment?
	touchable = 'createTouch' in document,
	touches = [], // array of touch vectors
	// ship = new ShipMoving(halfWidth, halfHeight)
	bullets = [],
	spareBullets = [];


// document.body.appendChild(ship.canvas);

setInterval(draw, 1000/35);

function draw(){
context2.clearRect(0,0,width, height);

  // if(touchable) {
  	document.addEventListener( 'touchstart', onTouchStart, false );
  	document.addEventListener( 'touchmove', onTouchMove, false );
  	document.addEventListener( 'touchend', onTouchEnd, false );
  	// window.onorientationchange = resetCanvas;
  	// window.onresize = resetCanvas;
    console.log('touchable');
  // } else {
  //
  // 	// canvas.addEventListener( 'mousemove', onMouseMove, false );
  // }
  for(var i=0; i<touches.length; i++) {

    var touch = touches[i];

    if(touch.identifier == leftTouchID){
      context2.beginPath();
      context2.strokeStyle = "cyan";
      context2.lineWidth = 6;
      context2.arc(leftTouchStartPos.x, leftTouchStartPos.y, 40,0,Math.PI*2,true);
      context2.stroke();
      context2.beginPath();
      context2.strokeStyle = "cyan";
      context2.lineWidth = 2;
      context2.arc(leftTouchStartPos.x, leftTouchStartPos.y, 60,0,Math.PI*2,true);
      context2.stroke();
      context2.beginPath();
      context2.strokeStyle = "cyan";
      context2.arc(leftTouchPos.x, leftTouchPos.y, 40, 0,Math.PI*2, true);
      context2.stroke();
      console.log("radi");
    } else {

      context2.beginPath();
      context2.fillStyle = "white";
      // context2.fillText("touch id : "+touch.identifier+" x:"+touch.clientX+" y:"+touch.clientY, touch.clientX+30, touch.clientY-30);

      context2.beginPath();
      context2.strokeStyle = "red";
      context2.lineWidth = "6";
      context2.arc(touch.clientX, touch.clientY, 40, 0, Math.PI*2, true);
      context2.stroke();
    }
  }
}
function makeBullet() {

	var bullet;

	if(spareBullets.length>0) {

		bullet = spareBullets.pop();
		bullet.reset(ship.pos.x, ship.pos.y, ship.angle);

	} else {

		// bullet = new Bullet(ship.pos.x, ship.pos.y, ship.angle);
		// bullets.push(bullet);

	}

	// bullet.vel.plusEq(ship.vel);


}

/*
 *	Touch event (e) properties :
 *	e.touches: 			Array of touch objects for every finger currently touching the screen
 *	e.targetTouches: 	Array of touch objects for every finger touching the screen that
 *						originally touched down on the DOM object the transmitted the event.
 *	e.changedTouches	Array of touch objects for touches that are changed for this event.
 *						I'm not sure if this would ever be a list of more than one, but would
 *						be bad to assume.
 *
 *	Touch objects :
 *
 *	identifier: An identifying number, unique to each touch event
 *	target: DOM object that broadcast the event
 *	clientX: X coordinate of touch relative to the viewport (excludes scroll offset)
 *	clientY: Y coordinate of touch relative to the viewport (excludes scroll offset)
 *	screenX: Relative to the screen
 *	screenY: Relative to the screen
 *	pageX: Relative to the full page (includes scrolling)
 *	pageY: Relative to the full page (includes scrolling)
 */

function onTouchStart(e) {

  gameStatus = 2;
  $("status").html("touching");
	for(var i = 0; i<e.changedTouches.length; i++){
		var touch =e.changedTouches[i];
		//console.log(leftTouchID + " "
		if((leftTouchID<0) && (touch.clientX<halfWidth))
		{
			leftTouchID = touch.identifier;
			leftTouchStartPos.reset(touch.clientX, touch.clientY);
			leftTouchPos.copyFrom(leftTouchStartPos);
			leftVector.reset(0,0);
			continue;
		} else {
      // mouseX = touch.clientX-document.getElementById("context").offsetLeft;
      // mouseY = touch.clientY-document.getElementById("context").offsetTop;
      // findMouseAngle();
      // shoot();
		}
	}
	touches = e.touches;
}

function onTouchMove(e) {
	 // Prevent the browser from doing its default thing (scroll, zoom)
	e.preventDefault();

	for(var i = 0; i<e.changedTouches.length; i++){
		var touch =e.changedTouches[i];
		if(leftTouchID == touch.identifier)
		{
			leftTouchPos.reset(touch.clientX, touch.clientY);
			leftVector.copyFrom(leftTouchPos);
			leftVector.minusEq(leftTouchStartPos);
			// document.getElementById("status").innerHTML=  leftVector.x +':'+leftVector.y;

			// break;
		}
  }

	touches = e.touches;

}

function onTouchEnd(e) {
  console.log("ge");
    keys = [];
   	touches = e.touches;

	for(var i = 0; i<e.changedTouches.length; i++){
		var touch =e.changedTouches[i];
		if(leftTouchID == touch.identifier)
		{
			leftTouchID = -1;
			leftVector.reset(0,0);
			break;
		} else {
        mouseX = touch.clientX-document.getElementById("context").offsetLeft;
        mouseY = touch.clientY-document.getElementById("context").offsetTop;
        findMouseAngle();
        shoot();
    }
	}

}

function onMouseMove(event) {

	mouseX = event.offsetX;
	mouseY = event.offsetY;
}


// function setupCanvas() {
//
// 	canvas = document.createElement( 'canvas' );
// 	c = canvas.getContext( '2d' );
// 	container = document.createElement( 'div' );
// 	container.className = "container";
//
// 	document.body.appendChild( container );
// 	container.appendChild(canvas);
//
// 	resetCanvas();
//
// 	c.strokeStyle = "#ffffff";
// 	c.lineWidth =2;
// }
