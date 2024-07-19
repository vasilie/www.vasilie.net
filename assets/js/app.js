const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight -225;
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
// Variables for animation
let lastTime = 0;
const friction = 0.03;
const entities = [];

class Entity {
  constructor(x, y) {
    this.name = 'Polygon';
    this.width = 30;
    this.height = 30;
    this.x = x || 0;
    this.y = y || 0;
    this.velocityX = Math.random() * 2 - 1;
    this.velocityY =0;
    this.color = GetRandomColor();
  }
}

// Start function
function start() {
  // Initialize any state or variables
  // Start the animation loop
  for (let i = 0; i < 10; i++) {
    entities[i] = new Entity();
  }
  requestAnimationFrame(mainLoop);
}

// Update function
function update(deltaTime) {
  // Update the state of the animation
  // Example: move a shape, update position, etc.
  for (let i = 0; i <  entities.length; i++) {
    object = entities[i];
    object.velocityY += 0.3;

    if (object.velocityY > 0) {
      object.velocityY -= friction;
    } else {
      object.velocityY == friction;
    }
      // x, y, width, height
    if (object.y >= HEIGHT - object.height || object.y < -1 ) {
      object.velocityY *= -1;
    }

    if (object.x >= WIDTH - object.width || object.x < -1 ) {
      object.velocityX *= -1;
    }

    object.y += object.velocityY;
    object.x += object.velocityX;
  }
}

canvas.addEventListener("click", function(event) {
  console.log('asfasf');
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left  - 15;
  var y = event.clientY - rect.top - 15;
  console.log('asfasf',x, y);
  entities.push(new Entity(x, y));
  console.log('entities',entities);
})

// Render function
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw your scene
  // Example: draw a circle
  ctx.beginPath();
  for (let i = 0; i < entities.length; i++) {
    object = entities[i];
    ctx.fillStyle = object.color;
    ctx.fillRect(object.x, object.y, object.width, object.height); // x, y, width, height
  }
  ctx.fillStyle = "red";
  
  ctx.fill();
}

// Main loop
function mainLoop(timestamp) {
  const deltaTime = timestamp - lastTime;
  lastTime = timestamp;

  // Update and render the scene
  update(deltaTime);
  render();

  // Request the next frame
  requestAnimationFrame(mainLoop);
}

function GetRandomColor() {
  const r = Math.floor(Math.random() * 255);
  const g = Math.floor(Math.random() * 255);
  const b = Math.floor(Math.random() * 255);
  const a = 1;
  return `rgba(${r},${g}, ${b}, ${a})`;  
}

// Start the animation
start();