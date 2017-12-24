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


class Board {
  constructor(numberOfRows, numberOfColumns, numberOfBombs){
    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.genereateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }
  get playerBoard(){
    return this._playerBoard;
  }
  get bombBoard(){
    return this._bombBoard;
  }


  flipTile(rowIndex, columnIndex){
    if(typeof(this.playerBoard[rowIndex][columnIndex]) === 'number'){
      console.log("This tile has already been flipped!");
    }else if(this.bombBoard[rowIndex][columnIndex] === 'B'){
      this.playerBoard[rowIndex][columnIndex] = 'B';
    }
    else{
      this._numberOfTiles --;
      this.playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
    }
  }

  getNumberOfNeighborBombs(rowIndex, columnIndex){
    let bombCount = 0;
    for(let i = rowIndex - 1; i <= rowIndex + 1; i ++){
      for(let j = columnIndex - 1; j <= columnIndex + 1; j++){
        if(i < 0 || i >= this.bombBoard.length || j < 0 || j >= this.bombBoard[0].length){
          continue;
        }
        else if (this.bombBoard[i][j] === 'B'){
          bombCount ++;
        }
      }
    }
    return bombCount;
  }

  hasSafeTiles(){
    return (this._numberOfBombs !== this._numberOfTiles);
  }

  print(board){
    this[board].map(function(row){
      console.log(row.join(" | "));
    });
  }

  static generatePlayerBoard(numberOfRows, numberOfColumns){
    let result = [];
    for(let i = 0; i < numberOfRows; i++){
      let newRow = []
      for(let j = 0; j < numberOfColumns; j++){
        newRow.push(' ');
      }
      result.push(newRow);
    }
    return result;
  }

  static genereateBombBoard(numberOfRows, numberOfColumns, numberOfBombs){
    let result = [];
    for(let i = 0; i < numberOfRows; i++){
      let newRow = []
      for(let j = 0; j < numberOfColumns; j++){
        newRow.push(null);
      }
      result.push(newRow);
    }
    while(numberOfBombs > 0){
      let row = Math.floor(Math.random() * numberOfRows);
      let col = Math.floor(Math.random() * numberOfColumns);
      if (result[row][col] === null){
        result[row][col] = 'B';
        numberOfBombs--;
      }
    }
    return result;
  }

}


const g = new Game(3,3,3);
g.board.print('playerBoard');
g.board.print('bombBoard');


g.playMove(2,0);
