const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight -625;
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const PRICE_INCREASE = 1.65;

let lastMousePosition = [24240, 2424240];

// Variables for animation
let lastTime = 0;
const friction = 0.03;
const entities = [];
let gold = 0;
let currentEntityPrice = 6;

class Entity {
  constructor(x, y) {
    this.name = 'Polygon';
    this.width = 25;
    this.height = 25;
    this.x = x || 0;
    this.y = y || 0;
    this.velocityX = Math.random() * 2 - 1;
    this.velocityY = 0;
    this.color = GetRandomHSLColor();
    this.border = 2;
    this.bilboard = { x: 20, y: -20, w: 140, h: 70, padding: 10 };
    this.born = Date.now();
    this.bounces = 0;
    this.goldPerBounce = randomRange(2, 4); 
    this.goldEarned = 0;

    this.start = function () {
      currentEntityPrice = Math.floor(currentEntityPrice * PRICE_INCREASE * PRICE_INCREASE);
    };

    this.update = () => {
      this.ageText = timeSince(this.born);
      this.age =  Math.floor((Date.now() - this.born) / 100);
      if (isHovering(lastMousePosition[0], lastMousePosition[1], this)) {
        this.isHovered = true;
        canvas.style.cursor = "pointer"; // Change cursor on hover
      } else {
        this.isHovered = false;
        canvas.style.cursor = "default"; // Default cursor
      }

      if (!this.isHovered || this.age < 3) {
        // Physics
        this.velocityY += 0.3;

        if (this.velocityY > 0) {
          this.velocityY -= friction;
        } else {
          this.velocityY == friction;
        }
          // x, y, width, height
        if (this.y >= HEIGHT - this.height || this.y < -1 ) {
          this.velocityY *= -1;
          this.bounces += 1;
          this.goldEarned += Math.floor(1 * this.goldPerBounce);
          gold += Math.floor(1 * this.goldPerBounce);
        }

        if (this.x >= WIDTH - this.width || this.x < -1 ) {
          this.velocityX *= -1;
          this.bounces += 1;
          this.goldEarned += Math.floor(1 * this.goldPerBounce);
          gold += Math.floor(1 * this.goldPerBounce);
        }

        this.y += this.velocityY;
        this.x += this.velocityX;
      }
    }

    this.render = () => {
      ctx.fillStyle = this.color;
      ctx.fillRect(this.x, this.y, this.width, this.height);

      
      if (!this.isHovered && this.border > 0) {
        ctx.fillStyle = "#070808";
        ctx.fillRect(this.x + this.border, this.y + this.border, this.width - this.border * 2, this.height - this.border * 2);
      }

      if (this.isHovered) {
        ctx.fillStyle = "#fff";
        
        // Builboard 
        ctx.fillRect(this.x + this.width + this.bilboard.x, this.y + this.bilboard.y, this.bilboard.w, this.bilboard.h);
      
        // Age
        ctx.fillStyle = "#070808";
        ctx.font = "14px JetBrains Mono";
        ctx.fillText(`Age: ${this.ageText}`, this.x + this.width + this.bilboard.x + this.bilboard.padding , this.y + this.bilboard.y + this.bilboard.padding + 10);

        // Bounces
        ctx.fillStyle = "#070808";
        ctx.font = "14px JetBrains Mono";
        ctx.fillText(`Bounces: ${this.bounces}`, this.x + this.width + this.bilboard.x + this.bilboard.padding , this.y + this.bilboard.y + this.bilboard.padding + 30);

        // Bounces
        ctx.fillStyle = "#070808";
        ctx.font = "14px JetBrains Mono";
        ctx.fillText(`Gold earned: ${this.goldEarned}`, this.x + this.width + this.bilboard.x + this.bilboard.padding , this.y + this.bilboard.y + this.bilboard.padding + 50);
      }
    }
  }


}

// Start function
function start() {
  // Initialize any state or variables
  // Start the animation loop
  for (let i = 0; i < 1; i++) {
    entities[i] = new Entity();
    entities[i].start();
  }
  requestAnimationFrame(mainLoop);
}

// Update function
function update(deltaTime) {
  // Update the state of the animation
  // Example: move a shape, update position, etc.
  for (let i = 0; i < entities.length; i++) {
    entity = entities[i];
    entity.update();
  }
}

function randomRange(min, max) {
  return Math.random() * (max - min) + min;
}

canvas.addEventListener("click", function(event) {
  console.log('asfasf');
  var rect = canvas.getBoundingClientRect();
  var x = event.clientX - rect.left  - 15;
  var y = event.clientY - rect.top - 15;
  console.log('asfasf',x, y);
  if (gold >= currentEntityPrice) {
    gold -= currentEntityPrice;
    const entity = new Entity(x, y);
    entity.start();
    entities.push(entity);
    entities[i].start();
  } else {
    console.log("No mani");
  }
  console.log('entities',entities);
  
});

canvas.addEventListener("mousemove", function(event) {
  const rectBounds = canvas.getBoundingClientRect();
  const mouseX = event.clientX - rectBounds.left;
  const mouseY = event.clientY - rectBounds.top;
  lastMousePosition = [mouseX, mouseY];
});

// Render function
function render() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  // Draw your scene
  // Example: draw a circle
  ctx.beginPath();
  ctx.fillStyle = "#1f1f1e";
  ctx.fillRect(0, HEIGHT - 1, WIDTH, 1);
  
  // Gold UI
   ctx.fillStyle = "#fff";
   ctx.font = "14px JetBrains Mono";
   ctx.fillText(`Gold:`, 20, 30);
   ctx.fillStyle = "gold";
   ctx.fillText(`${gold}`, 67, 30);
  
    // Current Entity price UI
    ctx.fillStyle = "#fff";
    ctx.font = "14px JetBrains Mono";
    ctx.fillText(`Entity Price:`, 20, 50);
    ctx.fillStyle = gold >= currentEntityPrice ? "green" : "red";
    ctx.fillText(`${currentEntityPrice}`, 130, 50);
  
   for (let i = 0; i < entities.length; i++) {
    entity = entities[i];
    entity.render();
  }
  ctx.fill();
}

function isHovering(x, y, entity) {
  return x >= entity.x && x <= entity.x + entity.width &&
         y >= entity.y && y <= entity.y + entity.height;
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
function GetRandomHSLColor() {
  const hueMinMax = [15, 75];
  const saturationMinMax = [34, 55];
  const lightnessMinMax = [44, 85];
  const alphaMinMax = [1, 1];

  const h = Math.floor(Math.random() * (hueMinMax[1] - hueMinMax[0] + 1) + hueMinMax[0]);
  const s = Math.floor(Math.random() * (saturationMinMax[1] - saturationMinMax[0] + 1) + saturationMinMax[0]);
  const l = Math.floor(Math.random() * (lightnessMinMax[1] - lightnessMinMax[0] + 1) + lightnessMinMax[0]);
  const a = Math.floor(Math.random() * (alphaMinMax[1] - alphaMinMax[0] + 1) + alphaMinMax[0]);

  const value = `hsl(${h}deg ${s}% ${l}% / ${a})`;

  console.log(value);
  return value;  
}

function timeSince(date) {
  const now = new Date();
  const difference = now - date; // Difference in milliseconds

  const seconds = Math.floor(difference / 1000);
  const minutes = Math.floor(seconds / 60);
  const hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);
  const months = Math.floor(days / 30.44); // Approximation
  const years = Math.floor(days / 365.25); // Approximation

  if (years > 0) {
      return `${years} year${years === 1 ? '' : 's'}`;
  } else if (months > 0) {
      return `${months} month${months === 1 ? '' : 's'}`;
  } else if (days > 0) {
      return `${days} day${days === 1 ? '' : 's'}`;
  } else if (hours > 0) {
      return `${hours} hour${hours === 1 ? '' : 's'}`;
  } else if (minutes > 0) {
      return `${minutes} minute${minutes === 1 ? '' : 's'}`;
  } else {
      return `${seconds} second${seconds === 1 ? '' : 's'}`;
  }
}
// Start the animation
start();