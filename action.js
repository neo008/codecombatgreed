// Destroy the ogre base within 180 seconds.
// Run over 4000 statements per call and chooseAction will run less often.
// Check out the green Guide button at the top for more info.
// All fighting units move at 5 m/s
// The peasants/peons move at 10 m/s
// Turns take 0.25 seconds
// Resources spawn every turn seconds with probabilities of 5% gem (5), 10% gold (3), 20% copper (1), and 65% silver (2)
// Coins spawn between (0, 0) and (85, 70)
// map x:0-85 y:0-70, center x:43, 35
// Peasants can gather gold; other units auto-attack the enemy base.
// You can only build one unit per frame, if you have enough gold.

function Situation() {
	this.warStarted = false;
	this.enemyIsNear = false;
	this.middleGame = false;
	this.lastGame = false;
};

Situation.prototype.update = function() {
	this.middleGame = this.now() > 60;
	this.lastGame = this.now() > 120;
	
	var enemySoliders = this.getEnemySoliders();
	var nearestEnemy = this.getNearest(enemySoliders);

	if (nearestEnemy !== undefined) {
		var closestDist = this.pos.distance(nearestEnemy.pos);
		this.enemyIsNear = closestDist < 30;
	}
};

// This code runs once per frame. Build units and command peasants!
Base.prototype.run = function() {

// forward declaration
this.buildUnit = function() {};
this.getEnemySoliders = function() {};
this.movePeasants = function() {};

var units = ['soldier', 'knight', 'librarian', 'griffin-rider', 'captain'];

if (this.situation === undefined) {
	this.situation = new Situation();
}

// situation changes every turn so we need to update
this.situation.update();

this.movePeasants();

this.buildUnit(this.situation);

/**
 * @return unit type that we want to build
 */
this.buildUnit = function(situation) {
	var type = 'peasant';
	if (situation.enemyIsNear || situation.middleGame) {
		// save money for later
		if (situation.lastGame || situation.enemyIsNear || situation.warStarted) {
			type = units[Math.floor(Math.random() * units.length)];
			if (!situation.warStarted) {
				this.say('war started!');
			}
			situation.warStarted = true;
		}
	}

	// build if we have enough gold
	if (type !== undefined) {
		if (this.gold >= this.buildables[type].goldCost)
			this.build(type);
	}
	
	return type;
}; // end buildUnit()

this.getEnemySoliders = function() {
    // this includes peon, not what we really want
    var enemies = this.getEnemies();
    var soliders = [];
    if (enemies !== undefined) {
        for (var i = 0; i < enemies.length; i++) {
            if (enemies[i].type !== "peon") {
                this.say(enemies[i].type);
                soliders.push(enemies[i]);
            }
        }
    }
    return soliders;
}; // end getEnemySoliders()

this.movePeasants = function() {
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
	
	// fair distrubion - segementize items into 9 square. peasants get nearest item base on its square

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
}; // end movePeasants()

}; // end Base.prototype.run