const player = document.getElementById("player");
const scoreElement = document.getElementById("score");
const gameOverElement = document.getElementById("game-over");
const gameContainer = document.getElementById("game-container");
const blocksContainer = document.getElementById("blocks");

let playerPosX = 175;
let score = 0;
let gameOver = false;
let blocks = [];
let speed = 2;

document.addEventListener("keydown", movePlayer);

function movePlayer(event) {
  if (gameOver) return;

  if (event.key === "ArrowLeft" && playerPosX > 0) {
    playerPosX -= 15;
  }
  if (event.key === "ArrowRight" && playerPosX < gameContainer.offsetWidth - player.offsetWidth) {
    playerPosX += 15;
  }

  player.style.left = playerPosX + "px";
}

function createBlock() {
  const block = document.createElement("div");
  block.classList.add("block");
  block.style.position = "absolute";
  block.style.width = "50px";
  block.style.height = "50px";
  block.style.backgroundColor = "#4caf50";
  block.style.borderRadius = "10px";
  block.style.left = `${Math.random() * (gameContainer.offsetWidth - 50)}px`;
  block.style.top = "0px";
  blocksContainer.appendChild(block);
  blocks.push(block);
}

function moveBlocks() {
  for (let i = 0; i < blocks.length; i++) {
    const block = blocks[i];
    const blockPosY = parseInt(block.style.top.replace("px", ""));
    block.style.top = blockPosY + speed + "px";

    // Check if the block falls out of the screen
    if (blockPosY > gameContainer.offsetHeight) {
      gameOver = true;
      gameOverElement.style.display = "block";
    }

    // Check if the player catches the block
    if (
      blockPosY + 50 >= gameContainer.offsetHeight - 70 &&
      playerPosX < parseInt(block.style.left.replace("px", "")) + 50 &&
      playerPosX + 50 > parseInt(block.style.left.replace("px", ""))
    ) {
      score += 10;
      scoreElement.textContent = "Score: " + score;
      blocksContainer.removeChild(block);
      blocks.splice(i, 1);
    }
  }
}

function gameLoop() {
  if (gameOver) return;

  createBlock();
  moveBlocks();
  setTimeout(gameLoop, 1000 / 60); // 60 FPS
}

gameLoop();
