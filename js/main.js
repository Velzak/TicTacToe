/*TODO
    -turns for each player
    -player movement, make the player have a "move" and attribute it to the current turn
    -
    --Dont allow an already used gameBoard to be overwritten
*/

//Creates a Gameboard for keeping the an array of 'X' and '0' as the game is played
// const GameBoard = (function () {
//   "use strict";

//   //Private variable for the gameboard player icon placement
//   let board = ["X", "O", "X", "O", "X", "O", "X", "O", "X"];
//   return { board };
// })();

// const Player = (icon) => {

//   const getIcon = () => icon;

//   return {getIcon};
// };

// //create players
// const player1 = Player('X');
// const player2 = Player("O");

// //Flow of the gameboard, decides whos 'turn' it is
// const game = (function () {
//     const turn = () => {

//     }
//     //Control the render of the Game Board, fills in array
//     const render = () => {
//         const button = document.querySelectorAll("button");
//         button.forEach((item) => {
//           console.log(GameBoard.board.length)
//             item.innerHTML = GameBoard.board[GameBoard.board.length - 1]
//         });
//       }
//       return {
//           render,
//       }
// })();
// game.render()

const game = () => {
  const statusUpdate = document.querySelector(".game-status");

  let gameActive = true;
  let currentPlayer = "X";
  let gameState = ["", "", "", "", "", "", "", "", ""];

  const winningMessage = () => `Player ${currentPlayer} has won!`;
  const drawMessage = () => `Game is a draw!`;
  const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

  statusUpdate.innerHTML = currentPlayerTurn();

  const handleCellPlayed = (clickedCell, clickedCellIndex) => {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    if (currentPlayer === 'X') {
      document.querySelectorAll('.cell')[clickedCellIndex].style.color = '#E27D60'
    } else {
      document.querySelectorAll('.cell')[clickedCellIndex].style.color = 'lightblue'
    }
  };

  const playerChange = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    statusUpdate.innerHTML = currentPlayerTurn()
  };


  const winningConiditons = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];

  const resultConfirm = () => {
    let roundWon = false;
    for (let i = 0; i <= 7; i++) {
      const winCondition = winningConiditons[i];
      let a = gameState[winCondition[0]];
      let b = gameState[winCondition[1]];
      let c = gameState[winCondition[2]];
      if (a === "" || b === "" || c === "") {
        continue;
      }
      if (a === b && b === c) {
        roundWon = true;
        break;
      }
    }
    if (roundWon) {
      statusUpdate.innerHTML = winningMessage();
      gameActive = false;
      return;
    }
    let roundDraw = !gameState.includes('')
    if (roundDraw) {
      statusUpdate.innerHTML = drawMessage()
      gameActive = false
      return
    }

    playerChange();
  };

  const cellClick = (event) => {
    const clickedCell = event.target;

    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell"));

    if (gameState[clickedCellIndex] !== "" || !gameActive) {
      return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    resultConfirm();
  };

  document.querySelectorAll(".cell").forEach((cell) => cell.addEventListener("click", cellClick));

  const restartGame = () => {
    gameActive = true
    currentPlayer = 'X'
    gameState = ["", "", "", "", "", "", "", "", ""];
    statusUpdate.innerHTML = currentPlayerTurn()
    document.querySelectorAll('.cell').forEach(cell => cell.innerHTML = '')
  };

  document.querySelector(".game-restart").addEventListener("click", restartGame);
};

game();
