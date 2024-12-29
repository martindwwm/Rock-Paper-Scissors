let score = JSON.parse(localStorage.getItem("score")) || {
  wins: 0,
  losses: 0,
  ties: 0,
};

updateScore();

// Button rock paper scissors
const btnRock = document.getElementById("js-btn-rock");
const btnPaper = document.getElementById("js-btn-paper");
const btnScissors = document.getElementById("js-btn-scissors");
const btnResetScore = document.getElementById("js-reset-score");
const btnAutoPlay = document.querySelector(".js-auto-play-button");

document.body.addEventListener("keydown", (event) => {
  if (event.key === "r") {
    playGames("rock");
  } else if (event.key === "p") {
    playGames("paper");
  } else if (event.key === "s") {
    playGames("scissors");
  }
});

btnRock?.addEventListener("click", () => {
  playGames("rock");
});

btnPaper?.addEventListener("click", () => {
  playGames("paper");
});

btnScissors?.addEventListener("click", () => {
  playGames("scissors");
});

btnResetScore?.addEventListener("click", () => {
  score.wins = 0;
  score.losses = 0;
  score.ties = 0;
  localStorage.removeItem("score");
  updateScore();
});

btnAutoPlay?.addEventListener("click", () => {
  autoPlay();
});

let isAutoPlaying = false;
let intervalId;

function autoPlay() {
  if (!isAutoPlaying) {
    intervalId = setInterval(function () {
      const playerMove = pickComputerMove();
      playGames(playerMove);
    }, 1000);

    if (btnAutoPlay) {
      btnAutoPlay.innerHTML = "Stop playing";
    }
    isAutoPlaying = true;
  } else {
    clearInterval(intervalId);

    if (btnAutoPlay) {
      btnAutoPlay.innerHTML = "Auto Play";
    }
    isAutoPlaying = false;
  }
}

// Play games
function playGames(playerMove) {
  const computerMove = pickComputerMove();
  let result = "";
  // Rock
  if (playerMove === "rock") {
    if (computerMove === "rock") {
      result = "Tie.";
    } else if (computerMove === "paper") {
      result = "You lose.";
    } else if (computerMove === "scissors") {
      result = "You win.";
    }
    // Paper
  } else if (playerMove === "paper") {
    if (computerMove === "rock") {
      result = "You win.";
    } else if (computerMove === "paper") {
      result = "Tie.";
    } else if (computerMove === "scissors") {
      result = "You lose.";
    }
    // scissors
  } else if (playerMove === "scissors") {
    if (computerMove === "rock") {
      result = "You lose.";
    } else if (computerMove === "paper") {
      result = "You win.";
    } else if (computerMove === "scissors") {
      result = "Tie.";
    }
  }

  // score
  if (result === "You win.") {
    score.wins++;
  } else if (result === "You lose.") {
    score.losses++;
  } else if (result === "Tie.") {
    score.ties++;
  }

  // Storage Score
  localStorage.setItem("score", JSON.stringify(score));

  updateScore();

  // result
  const displayResult = document.querySelector(".js-result");
  if (displayResult) {
    displayResult.innerHTML = `${result}`;
  }

  const displayMoves = document.querySelector(".js-moves");
  if (displayMoves) {
    displayMoves.innerHTML = `You
          <img
            src="assets/medias/images/${playerMove}-emoji.png"
            class="move-icon"
            alt="rock-emoji"
          />
          <img
            src="assets/medias/images/${computerMove}-emoji.png"
            class="move-icon"
            alt="scissors-emoji"
          />
          Computer`;
  }
}

function pickComputerMove() {
  const randomNumber = Math.random();
  let computerMove = "";

  if (randomNumber >= 0 && randomNumber < 1 / 3) {
    computerMove = "rock";
  } else if (randomNumber >= 1 / 3 && randomNumber < 2 / 3) {
    computerMove = "paper";
  } else if (randomNumber >= 2 / 3 && randomNumber < 1) {
    computerMove = "scissors";
  }
  return computerMove;
}

function updateScore() {
  const displayScore = document.querySelector(".js-score");
  if (displayScore) {
    displayScore.innerHTML = `Wins: ${score.wins}, Losses: ${score.losses}, Ties: ${score.ties}`;
  }
}
