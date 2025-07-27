const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetButton = document.getElementById('reset');
let currentPlayer = 'X';
let board = Array(9).fill(null);

const winningCombinations = [
  [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
  [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
  [0, 4, 8], [2, 4, 6]             // Diagonals
];

// Handle cell click
cells.forEach((cell, index) => {
  cell.addEventListener('click', () => {
    if (!board[index] && !checkWinner()) {
      board[index] = currentPlayer;
      cell.textContent = currentPlayer;

      if (checkWinner()) {
        statusText.textContent = `Player ${currentPlayer} Wins!`;
      } else if (board.every(cell => cell)) {
        statusText.textContent = "It's a Draw!";
      } else {
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
        statusText.textContent = `Player ${currentPlayer}'s Turn`;
      }
    }
  });
});

function checkWinner() {
  return winningCombinations.some(combination =>
    combination.every(index => board[index] === currentPlayer)
  );
}

// Reset the game
resetButton.addEventListener('click', () => {
  board.fill(null);
  cells.forEach(cell => (cell.textContent = ''));
  currentPlayer = 'X';
  statusText.textContent = `Player X's Turn`;
});
