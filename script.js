let gameOver = 0;
function GameBoard() {
  const row = 3;
  const cols = 3;
  const board = [];
  const boxContainer = document.getElementById("boxContainer");
  boxContainer.style.display = "flex";
  for (let i = 0; i < row; i++) {
    board[i] = [];
    const row = document.createElement("div");
    for (let j = 0; j < cols; j++) {
      const col = document.createElement("div");
      col.style.width = 425 / 3 + "px";
      col.style.height = 425 / 3 + "px";
      col.style.backgroundColor = "white";
      col.style.border = "none";
      col.style.display = "flex";
      col.style.alignItems = "center";
      col.style.justifyContent = "center";
      col.style.fontSize = "2rem";
      col.classList.add("cell");
      col.id = j + "" + i;
      if (i < 2) {
        col.style.borderRight = "2px solid black";
      }
      if (j < 2) {
        col.style.borderBottom = "2px solid black";
      }
      board[i].push(Cell());
      board[i][j].setChoice("");
      row.append(col);
    }
    boxContainer.append(row);
  }
  const resetBoard = () => {
    board.forEach((element) => {
      board.pop();
    });
  };
  const getBoard = () => {
    return { board, row, cols };
  };
  const addValue = (row, column, player) => {
    flag = 0;
    if (board[row][column].getChoice() == "" && player.token == 1) {
      board[row][column].setChoice("X");
      board[row][column].setPlayer(player);
      flag = 1;
      return;
    }
    if (board[row][column].getChoice() == "" && player.token == 2) {
      board[row][column].setChoice("O");
      board[row][column].setPlayer(player);
      flag = 1;
      return;
    }
    if (
      board[row][column].getChoice() == "X" ||
      board[row][column].getChoice() == "O"
    ) {
      alert("That spot was already filled! Please choose another one!");
      return flag;
    }
    return flag;
  };

  function Cell() {
    let cell = {};
    const setPlayer = (player) => {
      cell.player = player;
    };
    const setChoice = (value) => {
      cell.choice = value;
    };
    const getChoice = () => cell.choice;
    return { setPlayer, setChoice, getChoice };
  }
  return { addValue, getBoard, resetBoard };
}

function gameController() {
  const playerOne = "Player 1";
  const playerTwo = "Player 2";
  const gameBoard = GameBoard();
  const turn = document.getElementById("turn");
  const cells = document.querySelectorAll("div[class = 'cell']");
  const players = [
    {
      player: playerOne,
      token: 1,
    },
    {
      player: playerTwo,
      token: 2,
    },
  ];
  let activePlayer = players[0];
  const switchPlayers = () => {
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  };
  const findWinner = () => {
    const board = gameBoard.getBoard();
    let winner = "";
    for (let i = 0; i < board.row; i++) {
      for (let j = 0; j < board.cols; j++) {
        if (
          (board.board[i][0].getChoice() == "X" &&
            board.board[i][1].getChoice() == "X" &&
            board.board[i][2].getChoice() == "X") ||
          (board.board[0][i].getChoice() == "X" &&
            board.board[1][i].getChoice() == "X" &&
            board.board[2][i].getChoice() == "X") ||
          (board.board[0][2].getChoice() == "X" &&
            board.board[1][1].getChoice() == "X" &&
            board.board[2][0].getChoice() == "X") ||
          (board.board[0][0].getChoice() == "X" &&
            board.board[1][1].getChoice() == "X" &&
            board.board[2][2].getChoice() == "X")
        ) {
          winner = "Player 1";
        } else if (
          (board.board[i][0].getChoice() == "O" &&
            board.board[i][1].getChoice() == "O" &&
            board.board[i][2].getChoice() == "O") ||
          (board.board[0][i].getChoice() == "O" &&
            board.board[1][i].getChoice() == "O" &&
            board.board[2][i].getChoice() == "O") ||
          (board.board[0][2].getChoice() == "O" &&
            board.board[1][1].getChoice() == "O" &&
            board.board[2][0].getChoice() == "O") ||
          (board.board[0][0].getChoice() == "O" &&
            board.board[1][1].getChoice() == "O" &&
            board.board[2][2].getChoice() == "O")
        ) {
          winner = "Player 2";
        }
      }
    }
    return winner;
  };

  const checkTie = () => {
    const myBoard = gameBoard.getBoard();
    let count = 0;
    for (let i = 0; i < myBoard.row; i++) {
      for (let j = 0; j < myBoard.cols; j++) {
        if (myBoard.board[i][j].getChoice() != "") {
          count++;
        }
      }
    }
    if (count == 9) {
      return true;
    }
    return false;
  };

  if (gameOver !== 1) {
    cells.forEach((cell) => {
      cell.addEventListener("click", (event) => {
        if (gameOver === 1) {
          alert("Game Over! Restart the game to play again!");
          return;
        }
        playRound(event.target.id[0], event.target.id[1]);
        if (
          activePlayer.token === 1 &&
          gameOver === 0 &&
          event.target.textContent !== "O"
        ) {
          cell.textContent = "X";
        }
        if (
          activePlayer.token === 2 &&
          gameOver === 0 &&
          event.target.textContent !== "X"
        ) {
          cell.textContent = "O";
        }
        if (findWinner() !== "") {
          turn.textContent = findWinner() + " Won";
          gameOver = 1;
        }
        if (checkTie() === true && gameOver !== 1) {
          turn.textContent = "It's a tie!";
          gameOver = 1;
        }
      });
    });
  }

  const playRound = (row, col) => {
    flag = gameBoard.addValue(row, col, activePlayer);
    if (flag != 0) {
      switchPlayers();
    }
    getActivePlayer();
  };
  const getActivePlayer = () => {
    turn.textContent = "Player " + activePlayer.token + "'s turn";
    return activePlayer;
  };
  return { playRound, getActivePlayer };
}

const startGame = () => {
  const game = gameController();
  game.getActivePlayer();
  gameOver = 0;
};

startGame();

const restartButton = document.getElementById("restart");
const gameBox = document.getElementById("gameBoard");
restartButton.addEventListener("click", () => {
  gameBox.removeChild(gameBox.firstElementChild);
  const boxContainer = document.createElement("div");
  boxContainer.id = "boxContainer";
  gameBox.appendChild(boxContainer);
  startGame();
});