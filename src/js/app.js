import { checkIsColliding } from "../js/lib/helpers/collisionHelper";
import { GetRandomHSLColor } from "../js/lib/helpers/colorHelper";

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');
// Create an audio context
const audioContext = new (window.AudioContext || window.webkitAudioContext)();
// Set canvas size
canvas.width = window.innerWidth;
canvas.height = window.innerHeight -525;
const WIDTH = canvas.width;
const HEIGHT = canvas.height;
const PRICE_INCREASE = 1.65;

let lastMousePosition = [24240, 2424240];

// Variables for animation
let lastTime = 0;
const friction = 0.05;
const entities = [];
let gold = 10;
let currentEntityPrice = 3.7;
let idCounter = -1;

const getId = () => {
  idCounter++;
  return idCounter;
}

class Entity {
  constructor(x, y) {
    this.name = 'Polygon';
    this.id = null;
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
      this.id = getId();
    };

    this.isColliding = () => {
      let isColliding = false;
      for (let i = 0; i < entities.length; i++) {
        const entity = entities[i];
        if (this.id != entity.id) {
          isColliding = checkIsColliding(this, entity);
          break;
        }
      }
      return isColliding;
    }
    this.update = () => {
      this.ageText = timeSince(this.born);
      this.age =  Math.floor((Date.now() - this.born) / 100);
      if (this.isColliding()) {
        this.velocityX *= -1;
      }
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
          let freqPerOctave = 440 / 12;
         
          // let penguin = Math.floor(WIDTH / freqPerWidth); 
          // playFrequency(220 +  currentTone * freqPerOctave, 0.025);
          GetRandomNote(this.x);

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
  for (let i = 0; i < 0; i++) {
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
    let entity = entities[i];
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
  entities.forEach(entity => isHovering(mouseX, mouseY, entity) ? canvas.style.cursor = "pointer" : canvas.style.cursor = "default"); 
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
    let entity = entities[i];
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

// create the context
const actx = new AudioContext();

function playNote(freq = 261.63, type = "sine", decay = 0.1) {
  // Create a new oscillator and audio graph for each keypress
  createOsc(freq, type, decay);
}

function createOsc(freq, type, decay) {
  
  // create oscillator, gain and compressor nodes
  let osc = actx.createOscillator();
  let vol = actx.createGain();
  let compressor = actx.createDynamicsCompressor();

  // set the supplied values
  osc.frequency.value = freq;
  osc.type = type;

  // set the volume value so that we do not overload the destination
  // when multiple voices are played simmultaneously
  vol.gain.value = 0.1;

  //create the audio graph
  osc.connect(vol).connect(compressor).connect(actx.destination);

  // ramp up to volume so that we minimise the
  // ugly "click" when the key is pressed
  vol.gain.exponentialRampToValueAtTime(
    vol.gain.value,
    actx.currentTime + 0.03
  );

  // ramp down to minimise the ugly click when the oscillator stops
  vol.gain.exponentialRampToValueAtTime(0.0001, actx.currentTime + decay);

  osc.start(actx.currentTime);
  osc.stop(actx.currentTime + decay + 0.03);
}

// Some musical note values:
const n = {
  // 'E0': 20.60,
  // 'F#0': 23.12,
  // 'G0': 24.50,
  // 'A0': 27.50,
  // 'B0': 30.87,
  // 'C#1': 34.65,
  // 'D1': 36.71,

  // 'E1': 41.20,
  // 'F#1': 46.25,
  // 'G1': 49.00,
  'A1': 55.00,
  // 'B1': 61.74,
  'C#2': 69.30,
  // 'D2': 73.42,

  // 'E2': 82.41,
  // 'F#2': 92.50,
  // 'G2': 98.00,
  // 'A2': 110.00,
  // 'B2': 123.47,
  // 'C#3': 138.59,
  // 'D3': 146.83,

  'E3': 164.81,
  'F#3': 185.00,
  // 'G3': 196.00,
  'A3': 220.00,
  // 'B3': 246.94,
  'C#4': 277.18,
  'D4': 293.66,

  'E4': 329.63,
  'F#4': 369.99,
  'G4': 392.00,
  'A4': 440.00,
  // 'B4': 493.88,
  // 'C#5': 554.37,
  'D5': 587.33,

  // 'E5': 659.25,
  // 'F#5': 739.99,
  // 'G5': 783.99,
  // 'A5': 880.00,
  // 'B5': 987.77,
  // 'C#6': 1108.73,
  // 'D6': 1174.66,

  // 'E6': 1318.51,
  // 'F#6': 1479.98,
  // 'G6': 1567.98,
  // 'A6': 1760.00,
  // 'B6': 1975.53,
  // 'C#7': 2217.46,
  // 'D7': 2349.32,
};

function GetRandomNote(x) {
  const notesKeyArray = Object.keys(n);
  const randomItemNo = Math.floor(Math.random() * notesKeyArray.length);
  let freqPerWidth = WIDTH / notesKeyArray.length;
  let currentTone = Math.floor(x / freqPerWidth);
  const freq = n[notesKeyArray[currentTone]];
  // playNote(freq);
  playNote(freq* 2, "sawtooth", 0.02);
  playNote(freq* 2.5, "square", 0.05);
}
// function keyDown(event) {
//   let key = event.key;

//   if (key === "1") playNote(C4);
//   if (key === "2") playNote(D4);
//   if (key === "3") playNote(E4);
//   if (key === "4") playNote(F4);
//   if (key === "5") playNote(G4);
//   if (key === "6") playNote(A5);
//   if (key === "7") playNote(B5);
//   if (key === "8") playNote(C5);
//   if (key === "9") playNote(D5);
//   if (key === "0") playNote(E5);

// }
// // Add event listener to the button to play sound at 440Hz for 1 second
// document.getElementById("playSound").addEventListener("click", function() {
//     playFrequency(440, 1); // A4 note, 440Hz
// });


// Start the animation


// Example usage:
const box1 = { x: 10, y: 10, width: 50, height: 50 };
const box2 = { x: 40, y: 40, width: 50, height: 50 };

if (checkIsColliding(box1, box2)) {
  console.log("The boxes are colliding!");
} else {
  console.log("The boxes are not colliding.");
}

start();