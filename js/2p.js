window.addEventListener('load', () => {
    document.body.classList.add('fade-in');
});


const board = Array(9).fill(null);
let currentPlayer = 'X';
let isGameOver = false;

const cells = document.querySelectorAll('.cell');
const turnIndicator = document.getElementById('turnIndicator');
const resultDisplay = document.getElementById('result');

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');
        if (!isGameOver && board[index] === null) {
            makeMove(index, currentPlayer);
        }
    });
});

function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
    cells[index].classList.add('taken', player.toLowerCase());

    if (checkWin(player)) {
        showResult(`Player ${player === 'X' ? '1' : '2'} Wins!`);
        isGameOver = true;
    } else if (board.every(cell => cell !== null)) {
        showResult("It's a Draw!");
        isGameOver = true;
    } else {
        currentPlayer = player === 'X' ? 'O' : 'X';
        updateTurnIndicator();
    }
}

function updateTurnIndicator() {
    turnIndicator.textContent = currentPlayer === 'X' ? "Player 1's Turn (X)" : "Player 2's Turn (O)";
}

function checkWin(player) {
    const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return winPatterns.some(pattern =>
        pattern.every(index => board[index] === player)
    );
}

function showResult(message) {
    resultDisplay.textContent = message;
    turnIndicator.textContent = "";
}

function resetGame() {
    board.fill(null);
    isGameOver = false;
    currentPlayer = 'X';
    resultDisplay.textContent = "";
    updateTurnIndicator();
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('taken', 'x', 'o');
    });
}
function goBackToMenu() {
    document.body.classList.remove('fade-in');
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 800);
}
