
//game object allows for all variables to be private
const game = () => {
  const statusUpdate = document.querySelector(".game-status");

  //inital game settings, gameActive is the setting of if the game is in play or not 
  let gameActive = true;

  //current player starts as X every time, can be changed to an object if further development allowed.
  let currentPlayer = "X";

  //array of the "cells" used as a gameboard
  let gameState = ["", "", "", "", "", "", "", "", ""];

  const winningMessage = () => `Player ${currentPlayer} has won!`;
  const drawMessage = () => `Game is a draw!`;
  const currentPlayerTurn = () => `It's ${currentPlayer}'s turn`;

  statusUpdate.innerHTML = currentPlayerTurn();

  //Every time a cell is clicked by the player, changes the cell innerHTML to the correct player clicked, as well as changing the color
  const handleCellPlayed = (clickedCell, clickedCellIndex) => {
    gameState[clickedCellIndex] = currentPlayer;
    clickedCell.innerHTML = currentPlayer;
    if (currentPlayer === 'X') {
      document.querySelectorAll('.cell')[clickedCellIndex].style.color = '#E27D60'
    } else {
      document.querySelectorAll('.cell')[clickedCellIndex].style.color = 'lightblue'
    }
  };


  //changes currentPlayer to allow for player to change from X to O
  const playerChange = () => {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X'
    statusUpdate.innerHTML = currentPlayerTurn()
  };

  //winning conditions based on the gameState array positions
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

  //checks if the player has won based on winningConditions array, also checks for a draw, otherwise changes players
  const resultConfirm = () => {
    let roundWon = false;

    //checks through every variation of the winning conditions to see if the array has the correct conditions.
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
    //if the round has not been won, and the gameboard is filled, go ahead and end the game
    let roundDraw = !gameState.includes('')
    if (roundDraw) {
      statusUpdate.innerHTML = drawMessage()
      gameActive = false
      return
    }
    //if none of the other conditions are met, continue the game
    playerChange();
  };

  //allows for a "cell" to be registed by a click by the event clicked
  const cellClick = (event) => {
    const clickedCell = event.target;

    const clickedCellIndex = parseInt(clickedCell.getAttribute("data-cell"));

    //if the current cell has been clicked or the gamestate is not active, do not change the cell
    if (gameState[clickedCellIndex] !== "" || !gameActive) {
      return;
    }

    handleCellPlayed(clickedCell, clickedCellIndex);
    resultConfirm();
  };

  document.querySelectorAll(".cell").forEach((cell) => cell.addEventListener("click", cellClick));

  //after a game is won, click the restart game button to reset the variables for a new fresh game.
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
