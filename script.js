const dino = document.getElementById("dino");
const cactus = document.getElementById("cactus");
const scoreText = document.getElementById("score");
const highScoreText = document.getElementById("highScore");
const gameOverScreen = document.getElementById("gameOver");

const jumpSound = document.getElementById("jumpSound");
const hitSound = document.getElementById("hitSound");

let score = 0;
let highScore = localStorage.getItem("highScore") || 0;
let isGameOver = false;

highScoreText.innerText = "High Score: " + highScore;

// Lompat
document.addEventListener("keydown", function(event) {
  if (event.code === "Space" && !isGameOver) {
    jump();
  }
});

function jump() {
  if (dino.classList != "jump") {
    dino.classList.add("jump");
    jumpSound.play();

    setTimeout(function() {
      dino.classList.remove("jump");
    }, 500);
  }
}

// Game loop
let gameLoop = setInterval(function() {
  if (isGameOver) return;

  score++;
  scoreText.innerText = "Score: " + score;

  // 🔥 speed naik ikut score
  let speed = Math.max(0.8, 2 - score / 500);
  cactus.style.animation = `move ${speed}s infinite linear`;

  let dinoBottom = parseInt(window.getComputedStyle(dino).getPropertyValue("bottom"));
  let cactusRight = parseInt(window.getComputedStyle(cactus).getPropertyValue("right"));

  // collision
  if (cactusRight > 430 && cactusRight < 480 && dinoBottom < 40) {
    gameOver();
  }
}, 100);

function gameOver() {
  isGameOver = true;
  cactus.style.animation = "none";
  gameOverScreen.style.display = "block";
  hitSound.play();

  // high score save
  if (score > highScore) {
    highScore = score;
    localStorage.setItem("highScore", highScore);
  }
}

function restart() {
  location.reload();
}
