'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Board = exports.Board = function () {
  function Board(numberOfRows, numberOfColumns, numberOfBombs) {
    _classCallCheck(this, Board);

    this._numberOfBombs = numberOfBombs;
    this._numberOfTiles = numberOfRows * numberOfColumns;
    this._playerBoard = Board.generatePlayerBoard(numberOfRows, numberOfColumns);
    this._bombBoard = Board.genereateBombBoard(numberOfRows, numberOfColumns, numberOfBombs);
  }

  _createClass(Board, [{
    key: 'flipTile',
    value: function flipTile(rowIndex, columnIndex) {
      if (typeof this.playerBoard[rowIndex][columnIndex] === 'number') {
        console.log("This tile has already been flipped!");
      } else if (this.bombBoard[rowIndex][columnIndex] === 'B') {
        this.playerBoard[rowIndex][columnIndex] = 'B';
      } else {
        this._numberOfTiles--;
        this.playerBoard[rowIndex][columnIndex] = this.getNumberOfNeighborBombs(rowIndex, columnIndex);
      }
    }
  }, {
    key: 'getNumberOfNeighborBombs',
    value: function getNumberOfNeighborBombs(rowIndex, columnIndex) {
      var bombCount = 0;
      for (var i = rowIndex - 1; i <= rowIndex + 1; i++) {
        for (var j = columnIndex - 1; j <= columnIndex + 1; j++) {
          if (i < 0 || i >= this.bombBoard.length || j < 0 || j >= this.bombBoard[0].length) {
            continue;
          } else if (this.bombBoard[i][j] === 'B') {
            bombCount++;
          }
        }
      }
      return bombCount;
    }
  }, {
    key: 'hasSafeTiles',
    value: function hasSafeTiles() {
      return this._numberOfBombs !== this._numberOfTiles;
    }
  }, {
    key: 'print',
    value: function print(board) {
      this[board].map(function (row) {
        console.log(row.join(" | "));
      });
    }
  }, {
    key: 'playerBoard',
    get: function get() {
      return this._playerBoard;
    }
  }, {
    key: 'bombBoard',
    get: function get() {
      return this._bombBoard;
    }
  }], [{
    key: 'generatePlayerBoard',
    value: function generatePlayerBoard(numberOfRows, numberOfColumns) {
      var result = [];
      for (var i = 0; i < numberOfRows; i++) {
        var newRow = [];
        for (var j = 0; j < numberOfColumns; j++) {
          newRow.push(' ');
        }
        result.push(newRow);
      }
      return result;
    }
  }, {
    key: 'genereateBombBoard',
    value: function genereateBombBoard(numberOfRows, numberOfColumns, numberOfBombs) {
      var result = [];
      for (var i = 0; i < numberOfRows; i++) {
        var newRow = [];
        for (var j = 0; j < numberOfColumns; j++) {
          newRow.push(null);
        }
        result.push(newRow);
      }
      while (numberOfBombs > 0) {
        var row = Math.floor(Math.random() * numberOfRows);
        var col = Math.floor(Math.random() * numberOfColumns);
        if (result[row][col] === null) {
          result[row][col] = 'B';
          numberOfBombs--;
        }
      }
      return result;
    }
  }]);

  return Board;
}();