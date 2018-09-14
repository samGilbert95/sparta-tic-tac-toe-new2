document.addEventListener('DOMContentLoaded', () => {
// define tallys for X and O values
let tallyX = 0;
let tallyO = 0;
// Create Game Object
const game = new Object();
game.reset = document.getElementById('reset');
game.turn = true; // True for X , False of O
game.winCon = false;
game.playText = document.getElementsByClassName('playerTurn');
game.box = document.getElementsByTagName('td');
game.pressedBoxesX = [];  // Array of elements belonging to X player
game.pressedBoxesO = [];  // Array of elements belonging to X player
// Array of winning space combinations
game.winningCombos = ['[0,3,6]', '[1,4,7]', '[2,5,8]', '[0,1,2]', '[3,4,5]','[6,7,8]','[0,4,8]', '[2,4,6]'];
// Reset page
game.startOver = () =>{
  game.reset.addEventListener('click', (e) => {
    location.reload();
  })
}

 game.checkWin = () => {
   for (i=0; i<game.winningCombos.length; i++) {
     for (j=0; j<game.winningCombos[i].length; j++){
       if (game.pressedBoxesX.indexOf(game.winningCombos[j][i]) !== -1 && game.turn === false){
         tallyX ++;
         console.log(tallyX);
       } else if (game.pressedBoxesX.indexOf(game.winningCombos[j][i]) == -1 && game.turn === false) {
         tallyX = 0;
       }
       if (game.pressedBoxesO.indexOf(game.winningCombos[j][i]) !== -1 && game.turn === true){
         tallyO++;
         console.log(tallyO);
       } else if (game.pressedBoxesX.indexOf(game.winningCombos[j][i]) == -1 && game.turn === true) {
         tallyO = 0;
       }
     }
     if (tallyX === 3 || tallyO === 3){
       game.winCon = true;
       location.reload();
    }
   }
 };

// Function to allow addition of X and O to board. Add to Array of pressed buttons. Changes Player turn.
game.boardSet = () =>{
  // If player hasnt won game
  if (game.winCon === false) {
    // Add event listenrs for each element in the game table
    for (i = 0; i<game.box.length; i++) {
      game.box[i].addEventListener('click', (e) => {
        if (game.turn === true && e.target.className === '' ) {
          // Change table text to display X
          e.target.innerHTML = 'X';
          // Change class to initiate styling elements
          e.target.className = 'X';
          // Push value of the box to the list of selected elements
          game.pressedBoxesX.push(e.target.attributes[0].value);
          //console.log(game.pressedBoxesX);
          // Change player
          game.turn = !game.turn;
          // Change Text in H2
          game.playText[0].innerHTML = "It is O's turn";
          // Check if player has won
          game.checkWin();
        } else if (game.turn === false && e.target.className === ''){
          // Change table text to display X
          e.target.innerHTML = 'O';
          // Change class to initiate styling elements
          e.target.className = 'O';
          // Push value of the box to the list of selected elements
          game.pressedBoxesO.push(e.target.attributes[0].value);
          //console.log(game.pressedBoxesO);
          // Change player
          game.turn = !game.turn;
          // Change Text in H2
          game.playText[0].innerHTML = "It is X's turn";
          // Check if player has won
          game.checkWin();
        }
      });
    }
  }
}
// Call Obj Functions to innitiate program
game.startOver();
game.boardSet();
});
