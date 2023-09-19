document.addEventListener('DOMContentLoaded', () => {
  const cells = Array.from(document.querySelectorAll('.cell'));
  const status = document.getElementById('status');

  let currentPlayer = 'X';
  let gameActive = true;
  let gameState = ['', '', '', '', '', '', '', '', ''];
  const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];

  const handleCellClick = (e) => {
    const cell = e.target;
    const cellIndex = cells.indexOf(cell);

    if (gameState[cellIndex] !== '' || !gameActive) {
      return;
    }

    gameState[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);

    checkResult();
    togglePlayer();
  };

  const checkResult = () => {
    let roundWon = false;
    let winningPlayer = '';
  
    for (let i = 0; i < winningCombinations.length; i++) {
      const [a, b, c] = winningCombinations[i];
      const combination = [gameState[a], gameState[b], gameState[c]];
  
      if (combination.every((cell) => cell === currentPlayer)) {
        roundWon = true;
        winningPlayer = currentPlayer;
        break;
      }
    }
  
    if (roundWon) {
      status.textContent = `Player ${winningPlayer} wins!`;
      gameActive = false;
      return;
    }
  
    if (gameState.every((cell) => cell !== '')) {
      status.textContent = "It's a draw!";
      gameActive = false;
      return;
    }
  
  };
  

  const togglePlayer = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    status.textContent = `Player ${currentPlayer}'s turn`;
  };

  const handleRestart = () => {
    currentPlayer = 'X';
    gameActive = true;
    gameState = ['', '', '', '', '', '', '', '', ''];
    status.textContent = `Player ${currentPlayer}'s turn`;

    cells.forEach((cell) => {
      cell.textContent = '';
      cell.classList.remove('X');
      cell.classList.remove('O');
    });
  };

  cells.forEach((cell) => {
    cell.addEventListener('click', handleCellClick);
  });

  document.getElementById('restart-btn').addEventListener('click', handleRestart);

  // Set initial status message after a brief delay
  setTimeout(() => {
    status.textContent = `Player ${currentPlayer}'s turn`;
  }, 500);
});
