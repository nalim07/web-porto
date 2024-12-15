// Navbar fixed
window.onscroll = function () {
  const header = document.querySelector('header');
  const fixedNav = header.offsetTop;

  if (window.scrollY > fixedNav) {
    header.classList.add('navbar-fixed');
  } else {
    header.classList.remove('navbar-fixed');
  }
};

// Hamburger
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

hamburger.addEventListener('click', function () {
  hamburger.classList.toggle('hamburger-active');
  navMenu.classList.toggle('hidden');
});

// Dino and Obstacle
const dino = document.getElementById("dino");
const obstacle = document.getElementById("obstacle");
const scoreDisplay = document.getElementById("score");
const tryAgainButton = document.getElementById("try-again");

let isJumping = false;
let score = 0;
let gameOver = false;
let obstacleInterval; // Untuk menyimpan interval rintangan

// Dino Jump Function
function jump() {
  if (isJumping || gameOver) return;
  isJumping = true;
  let position = 0;

  const upInterval = setInterval(() => {
    if (position >= 150) {
      clearInterval(upInterval);

      const downInterval = setInterval(() => {
        if (position <= 0) {
          clearInterval(downInterval);
          isJumping = false;
        }
        position -= 5;
        dino.style.bottom = position + "px";
      }, 10);
    }
    position += 5;
    dino.style.bottom = position + "px";
  }, 10);
}

// Move Obstacle
function moveObstacle() {
  let obstaclePosition = 1000;

  obstacle.style.left = obstaclePosition + "px";
  obstacleInterval = setInterval(() => {
    if (obstaclePosition < 0) {
      obstaclePosition = 1000;
      score++;
      scoreDisplay.textContent = `Score: ${score}`;
    }

    // Deteksi tabrakan
    if (
      obstaclePosition > 50 &&
      obstaclePosition < 90 &&
      parseInt(dino.style.bottom) < 40
    ) {
      gameOver = true;
      clearInterval(obstacleInterval);
      alert("Game Over!");
      tryAgainButton.style.display = "block"; // Tampilkan tombol Try Again
    }

    if (!gameOver) {
      obstaclePosition -= 5;
      obstacle.style.left = obstaclePosition + "px";
    }
  }, 20);
}

// Reset Game
function resetGame() {
  score = 0;
  gameOver = false;
  dino.style.bottom = "0px";
  obstacle.style.left = "1000px";
  scoreDisplay.textContent = "Score: 0";
  tryAgainButton.style.display = "none";

  moveObstacle(); // Mulai ulang pergerakan rintangan
}

// Event Listener
document.addEventListener("keydown", jump);
tryAgainButton.addEventListener("click", resetGame);

moveObstacle(); // Memulai permainan pertama kali


