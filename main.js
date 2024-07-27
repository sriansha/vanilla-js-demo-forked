const container = document.getElementById("container");
const ballCount = 10; // Number of balls
const balls = [];
const backgroundMusic = document.getElementById("background-music");

// Play background music
backgroundMusic.play();

function getRandomVelocity() {
  const speed = Math.random() * 4 + 2; // Random speed between 2 and 6
  return Math.random() < 0.5 ? -speed : speed; // Random direction
}

function createBall() {
  const ball = document.createElement("img");
  ball.src = "balls.jpeg"; // Replace with the actual image path
  ball.className = "ball";
  ball.loading = "lazy";
  container.appendChild(ball);

  const ballObj = {
    element: ball,
    posX: Math.random() * (container.offsetWidth - ball.offsetWidth),
    posY: Math.random() * (container.offsetHeight - ball.offsetHeight),
    velX: getRandomVelocity(),
    velY: getRandomVelocity(),
    width: ball.offsetWidth,
    height: ball.offsetHeight,
  };

  balls.push(ballObj);
}

function updateBall(ball) {
  ball.posX += ball.velX;
  ball.posY += ball.velY;

  if (ball.posX + ball.width >= container.offsetWidth || ball.posX <= 0) {
    ball.velX = getRandomVelocity();
    ball.posX = ball.posX <= 0 ? 0 : container.offsetWidth - ball.width; // Prevent out-of-bounds
  }

  if (ball.posY + ball.height >= container.offsetHeight || ball.posY <= 0) {
    ball.velY = getRandomVelocity();
    ball.posY = ball.posY <= 0 ? 0 : container.offsetHeight - ball.height; // Prevent out-of-bounds
  }

  ball.element.style.left = `${ball.posX}px`;
  ball.element.style.top = `${ball.posY}px`;
}

function update() {
  balls.forEach(updateBall);
  requestAnimationFrame(update);
}

// Create multiple balls
for (let i = 0; i < ballCount; i++) {
  createBall();
}

update();
