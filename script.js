// Create canvas for mouse trail effect
const canvas = document.createElement('canvas');
canvas.id = 'trail-canvas';
canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.pointerEvents = 'none';
canvas.style.zIndex = '-1';
document.body.appendChild(canvas);

const ctx = canvas.getContext('2d');

// Set canvas to window size
function resizeCanvas() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener('resize', resizeCanvas);

// Mouse trail variables
let mouseX = 0;
let mouseY = 0;
const particles = [];

// Particle class for the trail effect
class Particle {
  constructor(x, y) {
    this.x = x + (Math.random() - 0.5) * 20;
    this.y = y + (Math.random() - 0.5) * 20;
    this.size = Math.random() * 15 + 5;
    this.opacity = 0.6;
    this.vx = (Math.random() - 0.5) * 2;
    this.vy = (Math.random() - 0.5) * 2;
  }

  update() {
    this.x += this.vx;
    this.y += this.vy;
    this.opacity -= 0.02;
    this.size *= 0.95;
  }

  draw() {
    ctx.fillStyle = `rgba(255, 222, 248, ${this.opacity})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fill();
  }
}

// Track mouse position
document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // Create new particles at mouse position
  for (let i = 0; i < 2; i++) {
    particles.push(new Particle(mouseX, mouseY));
  }
});

// Animation loop
function animate() {
  // Clear canvas with semi-transparent background for trail effect
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Update and draw particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].update();
    particles[i].draw();

    // Remove particles that are fully transparent
    if (particles[i].opacity <= 0) {
      particles.splice(i, 1);
    }
  }

  requestAnimationFrame(animate);
}

animate();
