const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const restartBtn = document.getElementById('restart');

let board = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;
let currentPlayer = "X"; // Human is always "X", Computer is "O"

const winCombos = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // cols
  [0, 4, 8], [2, 4, 6]             // diagonals
];

cells.forEach(cell => cell.addEventListener('click', playerMove));
restartBtn.addEventListener('click', resetGame);

function playerMove(e) {
  const index = e.target.dataset.index;

  if (board[index] !== "" || !gameActive) return;

  board[index] = "X";
  e.target.textContent = "X";
  e.target.classList.add("taken");

  if (checkWin("X")) {
    statusText.textContent = "You Win!";
    gameActive = false;
    return;
  }

  if (isDraw()) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  statusText.textContent = "Computer's Turn (O)";
  setTimeout(computerMove, 500); // slight delay for realism
}

function computerMove() {
  if (!gameActive) return;

  // Simple AI: pick first empty cell
  let emptyIndices = board.map((val, idx) => val === "" ? idx : null).filter(val => val !== null);
  if (emptyIndices.length === 0) return;

  let randomIndex = emptyIndices[Math.floor(Math.random() * emptyIndices.length)];
  board[randomIndex] = "O";

  const cell = document.querySelector(`.cell[data-index='${randomIndex}']`);
  cell.textContent = "O";
  cell.classList.add("taken");

  if (checkWin("O")) {
    statusText.textContent = "Computer Wins!";
    gameActive = false;
    return;
  }

  if (isDraw()) {
    statusText.textContent = "It's a Draw!";
    gameActive = false;
    return;
  }

  statusText.textContent = "Your Turn (X)";
}

function checkWin(player) {
  return winCombos.some(combo => {
    return combo.every(index => board[index] === player);
  });
}

function isDraw() {
  return board.every(cell => cell !== "");
}

function resetGame() {
  board = ["", "", "", "", "", "", "", "", ""];
  gameActive = true;
  currentPlayer = "X";
  statusText.textContent = "Your Turn (X)";
  cells.forEach(cell => {
    cell.textContent = "";
    cell.classList.remove("taken");
  });
}
