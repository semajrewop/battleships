var hit_positions = [
  	[6,4]
];

var new_hit_positions = [
	[7,3],[7,4],[7,5],[8,3],[9,3],[9,4]
];

var remaining_ships = [
  ships.destroyer,
  ships.cruiser,
  ships.battleship,
  ships.hovercraft,
  ships.aircraft_carrier
];

var pd = new ProbabilityDistribution(hit_positions,remaining_ships);
var tpd = new TargetProbabilityDistribution(hit_positions,remaining_ships,new_hit_positions);
var tb = new TableBuilder('battleships',12,12,tpd.board,tpd.getMaxValue());
tb.build();
document.getElementById('battleships').innerHTML = tb.contents;