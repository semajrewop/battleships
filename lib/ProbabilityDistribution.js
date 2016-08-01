function ProbabilityDistribution(hit_positions,remaining_ships) {
  this.hit_positions = hit_positions;
  this._initBoard();
  this._initShips(remaining_ships);
}

ProbabilityDistribution.prototype = {
  _initBoard: function() {
    this.board = [];
    var k = 0;
    for (var i = 0; i < board_layout.length; i++) {
      for (var j = 0; j < board_layout[i].height; j++) {
        this.board[k] = Array(board_layout[i].width).fill(0);
        k++;
      }
    }
  },
  
  _initShips: function(remaining_ships) {
    remaining_ships.forEach(function(ship) {
      this._initShip(ship);
    }.bind(this));
  },
  
  _initShip: function(ship) {
    for (var i = 0; i < this.board.length; i++) {
      for (var j = 0; j < this.board[i].length; j++) {
        this._attemptPlace(i,j,ship);
      }
    }
  },
  
  _attemptPlace: function(i,j,ship) {
    for (var k = 0; k < ship.configs.length; k++) {
      if (this._canPlace(i,j,ship.configs[k])) {
        this._incrementValues(i,j,ship.configs[k]);
      }
    }
  },
  
  _canPlace: function(i,j,config) {
    var canPlace = true;
    for (var k = 0; k < config.length; k++) {
      canPlace &= this._positionAvailable(i+config[k][0],j+config[k][1]);
    }
    return canPlace;
  },
  
  _positionAvailable: function(i,j) {
    return i < this.board.length && j < this.board[i].length && !this._positionHit(i,j);
  },
  
  _positionHit: function(i,j) {
    for (var k = 0; k < this.hit_positions.length; k++) {
      if (this.hit_positions[k][0] === i && this.hit_positions[k][1] === j) {
        return true;
      }
    }
    return false;
  },
  
  _incrementValues: function(i,j,config) {
    for (var k = 0; k < config.length; k++) {
      this.board[i+config[k][0]][j+config[k][1]]++;
    }
  },
  
  getMaxValue: function() {
    var max = 0;
    for (var i = 0; i < this.board.length; i++) {
      for (var j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] > max) {
          max = this.board[i][j];
        }
      }
    }
    return max;
  }
};