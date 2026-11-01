let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = true;
let isAiMode = false;

function changeTTTMode(mode) {
  isAiMode = (mode === "ai");
  resetTTT();
}

function handleTTTClick(index) {
  if (board[index] !== "" || !gameActive) return;

  makeMove(index, currentPlayer);

  if (gameActive && isAiMode && currentPlayer === "O") {
    setTimeout(makeAIMove, 300);
  }
}

function makeMove(index, player) {
  board[index] = player;
  document.getElementById(`cell-${index}`).innerText = player;

  const winCombo = checkWin();

  if (winCombo) {
    gameActive = false;
    highlightWinningCells(winCombo);
    showEndGameCelebration(player);
    return;
  }

  if (board.every(cell => cell !== "")) {
    gameActive = false;
    showDrawScreen();
    return;
  }

  currentPlayer = currentPlayer === "X" ? "O" : "X";
  document.getElementById("ttt-status").innerText = `Player ${currentPlayer}'s Turn`;
}

function makeAIMove() {
  const emptyIndices = board
    .map((val, idx) => val === "" ? idx : null)
    .filter(val => val !== null);

  if (emptyIndices.length > 0 && gameActive) {
    const randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
    makeMove(randomIndex, "O");
  }
}

function checkWin() {
  const winConditions = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
  ];

  for (let condition of winConditions) {
    if (condition.every(index => board[index] === currentPlayer)) {
      return condition; // Return array of winning cell indices
    }
  }
  return null;
}

function highlightWinningCells(winCombo) {
  winCombo.forEach(index => {
    document.getElementById(`cell-${index}`).classList.add("winning-cell");
  });
}

function showEndGameCelebration(winner) {
  const banner = document.getElementById("end-game-banner");
  const title = document.getElementById("end-game-title");
  const sub = document.getElementById("end-game-sub");
  const statusMsg = document.getElementById("ttt-status");
  const manualResetBtn = document.getElementById("manual-reset-btn");

  statusMsg.innerText = `Game Over!`;

  if (isAiMode) {
    if (winner === "X") {
      banner.className = "end-game-banner win";
      title.innerText = "🏆 Victory! You Won!";
      sub.innerText = "Awesome job! You defeated the computer.";
    } else {
      banner.className = "end-game-banner lose";
      title.innerText = "💥 Game Over! Computer Wins";
      sub.innerText = "Don't worry, try again and take the win!";
    }
  } else {
    banner.className = "end-game-banner win";
    title.innerText = `🎉 Player ${winner} Wins!`;
    sub.innerText = `Congratulations to Player ${winner}!`;
  }

  banner.classList.remove("hidden");
  manualResetBtn.classList.add("hidden");
}

function showDrawScreen() {
  const banner = document.getElementById("end-game-banner");
  const title = document.getElementById("end-game-title");
  const sub = document.getElementById("end-game-sub");
  const statusMsg = document.getElementById("ttt-status");
  const manualResetBtn = document.getElementById("manual-reset-btn");

  statusMsg.innerText = "Game Over!";
  banner.className = "end-game-banner draw";
  title.innerText = "🤝 It's a Draw!";
  sub.innerText = "Well played by both sides! Try another round.";

  banner.classList.remove("hidden");
  manualResetBtn.classList.add("hidden");
}

function resetTTT() {
  board = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;

  document.getElementById("ttt-status").innerText = "Player X's Turn";
  document.getElementById("end-game-banner").classList.add("hidden");
  document.getElementById("manual-reset-btn").classList.remove("hidden");

  for (let i = 0; i < 9; i++) {
    const cell = document.getElementById(`cell-${i}`);
    cell.innerText = "";
    cell.classList.remove("winning-cell");
  }
}