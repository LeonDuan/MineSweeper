'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }(); // To play Minesweeper, we will create instances of MineSweeperGame in command line.
// For example:
// In the command line, navigate to the lib directory and run `node`
// Run `.load game.js` to load the contents of this file.
// Then create a Game instance and run commands like so:
// let game = new Game(3, 3, 3);
// game.playMove(0, 1);
// game.playMove(1, 2);
// When done run `.exit`

var _board = require('./board.js');

var _board2 = _interopRequireDefault(_board);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Game = function () {
  function Game(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Game);

    this._board = new _board2.default(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Game, [{
    key: 'playMove',
    value: function playMove(rowIndex, columnIndex) {
      this.board.flipTile(rowIndex, columnIndex);

      //see if there is a bomb
      for (var i = 0; i < this.board.playerBoard.length; i++) {
        for (var j = 0; j < this.board.playerBoard[0].length; j++) {
          if (this.board.playerBoard[i][j] === 'B') {
            console.log('GAME OVER!');
            this.board.print('playerBoard');
            return true;
          }
        }
      }

      //see if the user won
      if (!this.board.hasSafeTiles()) {
        console.log('You Won!');
        this.board.print('playerBoard');
        return true;
      } else {
        console.log('Current Board:');
        this.board.print('playerBoard');
        return false;
      }
    }
  }, {
    key: 'board',
    get: function get() {
      return this._board;
    }
  }]);

  return Game;
}();