//Create a Gameboard object that will encapsulate a gameboard array. 
//Players will be created through a constructor 

//Creates a Gameboard for keeping the an array of 'X' and '0' as the game is played 
const GameBoard = (function() {
    'use strict';
    
    //Private variable for the gameboard player icon placement
    let gameBoard = ['X', '0', 'X', '0', 'X', '0', 'X', '0', 'X']
    const getGameBoard = () => gameBoard
    return {getGameBoard}
})();

function Player(name, icon){
    const getName = () => name;
    const getIcon = () => icon;
}

const gameFlow = (function() {

})()

//Control the render of the Game Board, fills in array
function render(){
    let button = document.querySelectorAll('button')
    console.log(button)
    button.addEventListener('click', (e) => {
        e.target.innerHTML = 'X'
    })
}
render()

