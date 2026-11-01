// Animal Symbols instead of Alphabets
const cardSymbols = ["🐶", "🐶", "🐱", "🐱", "🦊", "🦊", "🐸", "🐸", "🐼", "🐼", "🦁", "🦁"];

let flippedCards = [];
let matchedPairs = 0;
let moves = 0;
let lockBoard = false;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
  return array;
}

function initGame() {
  const grid = document.getElementById("memory-grid");
  grid.innerHTML = "";
  
  flippedCards = [];
  matchedPairs = 0;
  moves = 0;
  lockBoard = false;

  document.getElementById("move-count").innerText = moves;
  document.getElementById("match-count").innerText = matchedPairs;
  document.getElementById("status-msg").innerText = "Click any card to start!";

  document.getElementById("end-game-banner").classList.add("hidden");
  document.getElementById("manual-reset-btn").classList.remove("hidden");
  grid.classList.remove("hidden");

  const shuffledCards = shuffle([...cardSymbols]);

  shuffledCards.forEach((symbol, index) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.dataset.symbol = symbol;
    card.dataset.index = index;
    card.innerText = "❓";
    card.addEventListener("click", handleCardClick);
    grid.appendChild(card);
  });
}

function handleCardClick() {
  if (lockBoard) return;
  if (this.classList.contains("flipped") || this.classList.contains("matched")) return;

  this.classList.add("flipped");
  this.innerText = this.dataset.symbol;
  flippedCards.push(this);

  if (flippedCards.length === 2) {
    moves++;
    document.getElementById("move-count").innerText = moves;
    checkMatch();
  }
}

function checkMatch() {
  const [card1, card2] = flippedCards;

  if (card1.dataset.symbol === card2.dataset.symbol) {
    card1.classList.add("matched");
    card2.classList.add("matched");
    matchedPairs++;
    document.getElementById("match-count").innerText = matchedPairs;
    flippedCards = [];

    if (matchedPairs === 6) {
      showVictoryScreen();
    }
  } else {
    lockBoard = true;
    document.getElementById("status-msg").innerText = "Not a match! Try again.";
    setTimeout(() => {
      card1.classList.remove("flipped");
      card2.classList.remove("flipped");
      card1.innerText = "❓";
      card2.innerText = "❓";
      flippedCards = [];
      lockBoard = false;
      document.getElementById("status-msg").innerText = "Find matching pairs!";
    }, 800);
  }
}

function showVictoryScreen() {
  document.getElementById("status-msg").innerText = "Game Completed!";
  document.getElementById("end-game-sub").innerText = `Awesome memory! You completed the game in ${moves} moves.`;
  document.getElementById("end-game-banner").classList.remove("hidden");
  document.getElementById("manual-reset-btn").classList.add("hidden");
}

function resetGame() {
  initGame();
}

// Start game on load
initGame();