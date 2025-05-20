window.addEventListener('load', () => {
    document.body.classList.add('fade-in');
});


const board = Array(9).fill(null);
let currentPlayer = 'X'; // X is user
let isGameOver = false;

const cells = document.querySelectorAll('.cell');
const turnIndicator = document.getElementById('turnIndicator');
const resultDisplay = document.getElementById('result');

cells.forEach(cell => {
    cell.addEventListener('click', () => {
        const index = cell.getAttribute('data-index');
        if (!isGameOver && board[index] === null) {
            makeMove(index, 'X');
            if (!isGameOver) setTimeout(botMove, 500);
        }
    });
});

function makeMove(index, player) {
    board[index] = player;
    cells[index].textContent = player;
    cells[index].classList.add('taken');
    if (checkWin(player)) {
        showResult(player === 'X' ? 'You Win!' : 'Bot Wins!');
        isGameOver = true;
    } else if (board.every(cell => cell)) {
        showResult("It's a Draw!");
        isGameOver = true;
    } else {
        currentPlayer = player === 'X' ? 'O' : 'X';
        updateTurnIndicator();
    }
}

function updateTurnIndicator() {
    turnIndicator.textContent = currentPlayer === 'X' ? "Your Turn (X)" : "Bot's Turn (O)";
}

function botMove() {
    const bestMove = getBestMove();
    if (bestMove !== null) {
        makeMove(bestMove, 'O');
    }
}

function getBestMove() {
    let bestScore = -Infinity;
    let move = null;
    for (let i = 0; i < board.length; i++) {
        if (board[i] === null) {
            board[i] = 'O';
            let score = minimax(board, 0, false);
            board[i] = null;
            if (score > bestScore) {
                bestScore = score;
                move = i;
            }
        }
    }
    return move;
}

function minimax(newBoard, depth, isMaximizing) {
    if (checkWin('O')) return 10 - depth;
    if (checkWin('X')) return depth - 10;
    if (newBoard.every(cell => cell !== null)) return 0;

    if (isMaximizing) {
        let bestScore = -Infinity;
        for (let i = 0; i < newBoard.length; i++) {
            if (newBoard[i] === null) {
                newBoard[i] = 'O';
                let score = minimax(newBoard, depth + 1, false);
                newBoard[i] = null;
                bestScore = Math.max(score, bestScore);
            }
        }
        return bestScore;
    } else {
        let bestScore = Infinity;
        for (let i = 0; i < newBoard.length; i++) {
            if (newBoard[i] === null) {
                newBoard[i] = 'X';
                let score = minimax(newBoard, depth + 1, true);
                newBoard[i] = null;
                bestScore = Math.min(score, bestScore);
            }
        }
        return bestScore;
    }
}


function checkWin(player) {
    const wins = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return wins.some(line => line.every(index => board[index] === player));
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
    turnIndicator.textContent = "Your Turn (X)";
    cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('taken');
    });
}
function handleClick(button) {
    button.classList.add('clicked');
    setTimeout(() => button.classList.remove('clicked'), 200);

    if (button.textContent === '1P') {
        document.querySelector('.mode-buttons').style.display = 'none';
        document.getElementById('mainContent').classList.remove('hidden');
        document.body.style.overflow = 'auto';
    } else {
        alert('2P Mode coming soon!');
    }
}
function goBackToMenu() {
    document.body.classList.remove('fade-in');
    document.body.classList.add('fade-out');
    setTimeout(() => {
        window.location.href = 'index.html';
    }, 800);
}

