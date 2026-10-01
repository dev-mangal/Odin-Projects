const Gameboard = (() => {
    const board = Array(9).fill("");
    const winningCombinations = [
        [0,1,2],
        [3,4,5],
        [6,7,8],
        [0,3,6],
        [1,4,7],
        [2,5,8],
        [0,4,8],
        [2,4,6],
    ];

    const checkWinner = () => {
        //.some takes each element [a,b,c] from the array, and checks the conditions and accordingly returns true or false
        return winningCombinations.some(([a,b,c]) => 
            board[a] !== "" &&
            board[a] === board[b] &&
            board[b] === board[c]
        );
    };

    const placeMarker = (index, marker) => {
        if(board[index] !== "") return false;
        else board[index] = marker;
        return true;
    };

    const reset = () => {
        board.fill("");
    };

    return {board, checkWinner, placeMarker, reset};
})();

//now our gameboard object contains the board, and checks the winner, gamecontroller controls the turns on the board, and display controller changes the display
//player objects
const Player = (name, marker) => {
    const getName = () => name;
    const getMarker = () => marker;

    return {getName, getMarker};
};

const GameController = (() => {
    let player1;
    let player2;
    let activePlayer;
    let gameOver = false;
    let gameStarted = false;
    let result = null;

    const getResult = () => result;

    const getActivePlayerName = () => {
        return activePlayer ? activePlayer.getName() : "";
    };

    const startGame = (name1, name2) => {
        player1 = Player(name1, "X");
        player2 = Player(name2, "O");

        activePlayer = player1;
        gameOver = false;
        gameStarted = true;
        result = null;

        Gameboard.reset();
    };

    const switchPlayer = () => {
        activePlayer =
            activePlayer === player1 ? player2 : player1;
    };

    const isTie = () => {
        return Gameboard.board.every(cell => cell !== "");
    };

    const playRound = (index) => {
        if (!gameStarted || gameOver) return false;

        const marker = activePlayer.getMarker();

        if (!Gameboard.placeMarker(index, marker)) {
            return false;
        }

        if (Gameboard.checkWinner()) {
            gameOver = true;
            result = activePlayer.getName();
        } else if (isTie()) {
            gameOver = true;
            result = "tie";
        } else {
            switchPlayer();
        }

        return true;
    };

    const resetGame = () => {
        Gameboard.reset();

        player1 = null;
        player2 = null;
        activePlayer = null;

        gameOver = false;
        gameStarted = false;
        result = null;
    };

    return {startGame, playRound, getResult, getActivePlayerName, resetGame};
})();

const DisplayController = (() => {
    const playerForm = document.querySelector(".player-form");
    const player1Input = document.querySelector("#player1");
    const player2Input = document.querySelector("#player2");
    const startButton = document.querySelector("#start-button");
    const gameStatus = document.querySelector("#game-status");
    const cells = document.querySelectorAll(".cell");

    const render = () => {
        cells.forEach((cell, index) => {
            cell.textContent = Gameboard.board[index];
        });
        const result = GameController.getResult();

        if (result === "tie") {
            gameStatus.textContent = "It's a tie!";
        } else if (result) {
            gameStatus.textContent = `${result} wins!`;
        } else if (GameController.getActivePlayerName()) {
            gameStatus.textContent =
                `${GameController.getActivePlayerName()}'s turn`;
        } else {
            gameStatus.textContent =
                "Enter both names to start playing.";
        }
    };

    playerForm.addEventListener("submit", (event) => {
        event.preventDefault();

        const name1 = player1Input.value.trim();
        const name2 = player2Input.value.trim();

        if (!name1 || !name2) return;

        GameController.startGame(name1, name2);

        startButton.textContent = "Restart Game";

        render();
    });

    cells.forEach((cell) => {
        cell.addEventListener("click", () => {
            const index = Number(cell.dataset.index);

            const movePlayed = GameController.playRound(index);

            if (movePlayed) {
                render();
            }
        });
    });
    render();
})();