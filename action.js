Base.prototype.run = function() {

// This code runs once per frame. Build units and command peasants!
// Destroy the ogre base within 180 seconds.
// Run over 4000 statements per call and chooseAction will run less often.
// Check out the green Guide button at the top for more info.

if (this.warStarted === undefined) {
    this.warStarted = false;
}

// x:0-90 y:0-70
// locations of predicted peasont
var peasontBestLocations;
switch (this.getByType("peasant").length) {
    case 1: peasontBestLocations = [[45, 35]]; break;
    case 2: peasontBestLocations = [[10,60], [80,10]]; break;
    case 3: peasontBestLocations = [[10,60], [80,10], [45, 35]]; break;
    case 4: peasontBestLocations = [[10,60], [80,10], [55, 45], [35, 30]]; break;
    case 5: peasontBestLocations = [[10,60], [80,10], [60, 50], [45, 35], [30,25]]; break;     
    case 6: peasontBestLocations = [[10,60], [80,10], [55, 60], [75, 40], [45,15], [15,35]]; break;
} // switch

var peasants = this.getByType('peasant');
for (var peasantIndex = 0; peasantIndex < peasants.length; peasantIndex++) {
    var peasant = peasants[peasantIndex];
    var items = this.getItems();
    // filter out items that are close to other peasants
    // or
    // increase vector of item by other peasant's vector
    
    
    // decide whether he should go for higher value item
	if (peasant !== undefined) {
		var item = peasant.getNearest(items);
		if (item) {
			this.command(peasant, 'move', item.pos);
		}
	}
} // for


/////// 2. Decide which unit to build this frame. ///////
// Peasants can gather gold; other units auto-attack the enemy base.
// You can only build one unit per frame, if you have enough gold.
var enemies = this.getEnemies();
var nearestEnemy = this.getNearest(enemies);
var enemyIsNear = false;
if (nearestEnemy !== undefined) {
	var closestDist = this.pos.distance(nearestEnemy.pos);
} else {
	enemyIsNear = closestDist < 10;
}

var middleGame = this.now() > 60;
var lastGame = this.now() > 120;
var units = ['soldier', 'knight', 'librarian', 'griffin-rider', 'captain'];

var type;
if (!enemyIsNear && !middleGame) {
    type = 'peasant';
} else {
    // save money for later
    if (lastGame || enemyIsNear) {
        type = units[Math.floor(Math.random() * units.length)];
    }
}

if (type !== undefined) {
    if (this.gold >= this.buildables[type].goldCost)
        this.build(type);
}
}; // function run ends
