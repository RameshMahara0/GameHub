let playerScore = 0;
let computerScore = 0;
let gameActive = true;
let isAnimating = false;

const choices = ["rock", "paper", "scissors"];
const symbols = {
  rock: "🪨",
  paper: "📄",
  scissors: "✂️"
};

function playRound(playerChoice) {
  if (!gameActive || isAnimating) return;

  isAnimating = true;
  disableChoiceButtons(true);

  const playerIcon = document.getElementById("player-choice");
  const computerIcon = document.getElementById("computer-choice");
  const playerBox = playerIcon.parentElement;
  const computerBox = computerIcon.parentElement;
  const statusMsg = document.getElementById("status-msg");

  // Step 1: Show initial fists and trigger shaking animation
  playerIcon.innerText = "✊";
  computerIcon.innerText = "✊";
  statusMsg.innerText = "Rock... Paper... Scissors...";
  statusMsg.style.color = "#d97706";

  playerIcon.classList.add("shake-player");
  computerIcon.classList.add("shake-computer");

  // Step 2: Reveal choices after 600ms animation finishes
  setTimeout(() => {
    playerIcon.classList.remove("shake-player");
    computerIcon.classList.remove("shake-computer");

    const computerChoice = choices[Math.floor(Math.random() * choices.length)];

    playerIcon.innerText = symbols[playerChoice];
    computerIcon.innerText = symbols[computerChoice];

    playerBox.classList.add("reveal");
    computerBox.classList.add("reveal");

    // Evaluate winner & update score
    if (playerChoice === computerChoice) {
      statusMsg.innerText = `It's a Tie! Both chose ${symbols[playerChoice]}`;
      statusMsg.style.color = "#d97706";
    } else if (
      (playerChoice === "rock" && computerChoice === "scissors") ||
      (playerChoice === "paper" && computerChoice === "rock") ||
      (playerChoice === "scissors" && computerChoice === "paper")
    ) {
      playerScore++;
      document.getElementById("player-score").innerText = playerScore;
      statusMsg.innerText = `Point Player! ${symbols[playerChoice]} beats ${symbols[computerChoice]}`;
      statusMsg.style.color = "#059669";
    } else {
      computerScore++;
      document.getElementById("computer-score").innerText = computerScore;
      statusMsg.innerText = `Point Computer! ${symbols[computerChoice]} beats ${symbols[playerChoice]}`;
      statusMsg.style.color = "#dc2626";
    }

    // Step 3: Check if match is over (Best of 3)
    const matchFinished = checkBestOfThree();

    // Step 4: Auto-reset choice icons after 1.4 seconds if match is still ongoing
    setTimeout(() => {
      playerBox.classList.remove("reveal");
      computerBox.classList.remove("reveal");

      if (!matchFinished) {
        playerIcon.innerText = "❓";
        computerIcon.innerText = "❓";
        statusMsg.innerText = "Select your next move:";
        statusMsg.style.color = "#d97706";
        disableChoiceButtons(false);
      }
      isAnimating = false;
    }, 1400);

  }, 600);
}

function disableChoiceButtons(disabled) {
  const buttons = document.querySelectorAll(".btn-choice");
  buttons.forEach(btn => btn.disabled = disabled);
}

function checkBestOfThree() {
  const endGameBanner = document.getElementById("end-game-banner");
  const endGameTitle = document.getElementById("end-game-title");
  const endGameSub = document.getElementById("end-game-sub");
  const choiceButtons = document.getElementById("choice-buttons");
  const manualResetBtn = document.getElementById("manual-reset-btn");

  if (playerScore === 2) {
    gameActive = false;
    endGameBanner.className = "end-game-banner win";
    endGameTitle.innerText = "🏆 Victory! You Won the Match!";
    endGameSub.innerText = "Great moves! You beat the computer 2 out of 3.";
    endGameBanner.classList.remove("hidden");
    choiceButtons.classList.add("hidden");
    manualResetBtn.classList.add("hidden");
    return true;
  } else if (computerScore === 2) {
    gameActive = false;
    endGameBanner.className = "end-game-banner lose";
    endGameTitle.innerText = "💥 Game Over! Computer Wins";
    endGameSub.innerText = "Don't give up! Try again and take your revenge.";
    endGameBanner.classList.remove("hidden");
    choiceButtons.classList.add("hidden");
    manualResetBtn.classList.add("hidden");
    return true;
  }
  return false;
}

function resetGame() {
  playerScore = 0;
  computerScore = 0;
  gameActive = true;
  isAnimating = false;

  document.getElementById("player-score").innerText = "0";
  document.getElementById("computer-score").innerText = "0";
  document.getElementById("player-choice").innerText = "❓";
  document.getElementById("computer-choice").innerText = "❓";
  
  const statusMsg = document.getElementById("status-msg");
  statusMsg.innerText = "First to 2 points wins! Select your move:";
  statusMsg.style.color = "#d97706";

  disableChoiceButtons(false);
  document.getElementById("end-game-banner").classList.add("hidden");
  document.getElementById("choice-buttons").classList.remove("hidden");
  document.getElementById("manual-reset-btn").classList.remove("hidden");
}