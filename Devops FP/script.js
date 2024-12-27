document.getElementById("generateBoard").addEventListener("click", createBoard);

let currentPlayer = "X";

function createBoard() {
    const boardSize = parseInt(document.getElementById("boardSize").value);
    const gameBoard = document.getElementById("gameBoard");
    const status = document.getElementById("status");

    gameBoard.innerHTML = ""; // Clear previous board
    status.textContent = `Player ${currentPlayer}'s Turn`;
    gameBoard.style.gridTemplateColumns = `repeat(${boardSize}, 1fr)`;

    // Create cells dynamically
    for (let i = 0; i < boardSize * boardSize; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = i; // Assign a unique index to each cell
        cell.addEventListener("click", () => makeMove(cell, boardSize));
        gameBoard.appendChild(cell);
    }

    closePopup(); // Close any existing popup
}

function makeMove(cell, boardSize) {
    if (!cell.classList.contains("taken")) {
        cell.textContent = currentPlayer;
        cell.classList.add("taken", currentPlayer === "X" ? "x" : "o");

        if (checkWin(boardSize)) {
            document.getElementById("status").textContent = `Player ${currentPlayer} Wins!`;
            highlightWinningLine(boardSize);
            showPopup(`Player ${currentPlayer} Wins!`);
            disableBoard();
        } else if (document.querySelectorAll(".cell.taken").length === boardSize * boardSize) {
            document.getElementById("status").textContent = "It's a Draw!";
            showPopup("It's a Draw!");
        } else {
            currentPlayer = currentPlayer === "X" ? "O" : "X";
            document.getElementById("status").textContent = `Player ${currentPlayer}'s Turn`;
        }
    }
}

function checkWin(boardSize) {
    const cells = document.querySelectorAll(".cell");
    let win = false;

    // Winning combinations
    let winningCombination = [];

    // Check rows
    for (let i = 0; i < boardSize; i++) {
        let row = [];
        for (let j = 0; j < boardSize; j++) {
            row.push(i * boardSize + j);
        }
        if (row.every((index) => cells[index].textContent === currentPlayer)) {
            win = true;
            winningCombination = row;
        }
    }

    // Check columns
    for (let i = 0; i < boardSize; i++) {
        let col = [];
        for (let j = 0; j < boardSize; j++) {
            col.push(j * boardSize + i);
        }
        if (col.every((index) => cells[index].textContent === currentPlayer)) {
            win = true;
            winningCombination = col;
        }
    }

    // Check diagonals
    let diag1 = [];
    let diag2 = [];
    for (let i = 0; i < boardSize; i++) {
        diag1.push(i * boardSize + i);
        diag2.push(i * boardSize + (boardSize - i - 1));
    }
    if (diag1.every((index) => cells[index].textContent === currentPlayer)) {
        win = true;
        winningCombination = diag1;
    }
    if (diag2.every((index) => cells[index].textContent === currentPlayer)) {
        win = true;
        winningCombination = diag2;
    }

    // Store the winning combination if a win is detected
    if (win) {
        document.querySelectorAll(".cell").forEach((cell) => {
            cell.dataset.winning = winningCombination.includes(parseInt(cell.dataset.index));
        });
    }

    return win;
}

function disableBoard() {
    document.querySelectorAll(".cell").forEach((cell) => cell.classList.add("taken"));
}

function highlightWinningLine(boardSize) {
    const gameBoard = document.getElementById("gameBoard");
    const winningCells = Array.from(document.querySelectorAll('.cell')).filter(
        (cell) => cell.dataset.winning === "true"
    );

    if (winningCells.length > 1) {
        const firstCell = winningCells[0];
        const lastCell = winningCells[winningCells.length - 1];

        const startRect = firstCell.getBoundingClientRect();
        const endRect = lastCell.getBoundingClientRect();
        const boardRect = gameBoard.getBoundingClientRect();

        const x1 = startRect.left - boardRect.left + startRect.width / 2;
        const y1 = startRect.top - boardRect.top + startRect.height / 2;
        const x2 = endRect.left - boardRect.left + endRect.width / 2;
        const y2 = endRect.top - boardRect.top + endRect.height / 2;

        const line = document.createElement("div");
        line.classList.add("winning-line");

        // Calculate the winning line's dimensions
        const length = Math.sqrt((x2 - x1) ** 2 + (y2 - y1) ** 2);
        const angle = Math.atan2(y2 - y1, x2 - x1) * (180 / Math.PI);

        line.style.width = `${length}px`;
        line.style.height = `5px`;
        line.style.transform = `rotate(${angle}deg)`;
        line.style.position = "absolute";
        line.style.top = `${y1}px`;
        line.style.left = `${x1}px`;
        line.style.transformOrigin = "0 50%";
        line.style.background = currentPlayer === "X" ? "#ff4444" : "#44ff44"; // Winning color based on player

        gameBoard.appendChild(line);
    }
}

// Show Popup
function showPopup(message) {
    const popup = document.getElementById("popup");
    const popupMessage = document.getElementById("popupMessage");

    popupMessage.textContent = message;
    popup.style.display = "flex"; // Show popup
}

// Close Popup
function closePopup() {
    const popup = document.getElementById("popup");
    popup.style.display = "none"; // Hide popup
}
