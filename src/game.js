// To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

import Board from './board.js';

class Game{
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._board = new Board(numberOfRows, numberOfColumns, numberOfBombs);
  }
  get board(){
    return this._board;
  }
  playMove(rowIndex, columnIndex){
    this.board.flipTile(rowIndex, columnIndex);

    //see if there is a bomb
    for(let i = 0; i < this.board.playerBoard.length; i++){
      for(let j = 0; j < this.board.playerBoard[0].length; j++){
        if(this.board.playerBoard[i][j] === 'B'){
          console.log('GAME OVER!');
          this.board.print('playerBoard');
          return true;
        }
      }
    }

    //see if the user won
    if(!this.board.hasSafeTiles()){
      console.log('You Won!');
      this.board.print('playerBoard');
      return true;
    }
    else{
      console.log('Current Board:')
      this.board.print('playerBoard');
      return false;
    }
  }
}
