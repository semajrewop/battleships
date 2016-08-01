function TargetProbabilityDistribution(old_hit_positions,remaining_ships,new_hit_positions) {
	this.hit_positions = hit_positions;
	this.new_hit_positions = new_hit_positions;
	this._initBoard();
	this._initShips(remaining_ships);
};

TargetProbabilityDistribution.prototype = {
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
  		for (var i = 0; i < this.new_hit_positions.length; i++) {
  			console.log(this.new_hit_positions[i]);
  			this._attemptPlace(this.new_hit_positions[i][0],this.new_hit_positions[i][1],ship);
  		}
  	},

  	_attemptPlace: function(i,j,ship) {
  		var placements = this._getPlacements(ship.configs);
  		console.log(placements);
  		for (var k = 0; k < placements.length; k++) {
  			if (this._canPlace(i,j,placements[k])) {
  				console.log('can place');
  				this._incrementValues(i,j,placements[k]);
  			}
  		}
  	},

  	_getPlacements: function(configs) {
  		var placements = [];
  		for (var i = 0; i < configs.length; i++) {
  			var placement = this._getPlacement(configs[i]);
  			placements = placements.concat(this._getPlacement(configs[i]));
  		}
  		return placements;
  	},

  	_getPlacement: function(config) {
  		var placement = [];
  		for (var i = 0; i < config.length; i++) {
  			placement.push(this._normalise(config[i],config));
  		}
  		return placement;
  	},

  	_normalise: function(point,config) {
  		var new_config = []
  		for (var i = 0; i < config.length; i++) {
  			new_config.push([config[i][0]-point[0],config[i][1]-point[1]]);
  		}
  		console.log(new_config);
  		return new_config;
  	},

  	_canPlace: function(i,j,config) {
    	var canPlace = true;
    	for (var k = 0; k < config.length; k++) {
      		canPlace &= this._positionAvailable(i+config[k][0],j+config[k][1]);
    	}
		return canPlace;
  	},

  	_positionAvailable: function(i,j) {
    	return (0 <= i && i < this.board.length) && (0 <= j && j < this.board[i].length) && !this._positionHit(i,j);
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